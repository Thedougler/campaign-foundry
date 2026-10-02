import { constants } from "node:fs";
import { chmod, lstat, link, mkdir, open, readFile, realpath, readdir, unlink, writeFile } from "node:fs/promises";
import { execFile as execFileCallback } from "node:child_process";
import { lookup } from "node:dns/promises";
import { request as httpsRequest } from "node:https";
import { Readable } from "node:stream";
import { checkServerIdentity } from "node:tls";
import { randomBytes } from "node:crypto";
import { isIP } from "node:net";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import YAML from "./yaml.ts";
import { evalRunFromWorld } from "./workspaces.ts";

const evaluatorTreeNames = new Set(["evals", "answers", "answer", "graders", "grader", "grades", "snapshots", ".snapshots"]);
const protectedFileName = /(?:^|[._-])(?:answers?|grader|grades?|rubric)(?:[._-]|$)/iu;
const MAX_READ_BYTES = 5 * 1024 * 1024;
const MAX_RESULT_LINES = 200;
const ROOT_COLLECTIONS = ["wiki", "raw", "archive"] as const;

const LOG_OPERATIONS = new Set(["create", "ingest", "prep", "push", "audit", "pull", "query"]);

type Collection = (typeof ROOT_COLLECTIONS)[number];
type JsonSchema = Record<string, unknown>;
type ToolHandler = (input: Record<string, unknown>) => Promise<unknown>;
export type RunnerToolRegistrar = (handler: ToolHandler, options: { name: string; description: string; parameters: JsonSchema }) => unknown;

export interface RunnerPreparedWorkspace {
	root: string;
	runnerInput: string;
	caseId: string;
	case: { prompt: string };
	qmd: { mode: "live-read-only"; index: string };
}

export interface RunnerToolOptions {
	targetSkillRoot: string;
	skillRoot?: string;
	network?: { https: boolean; search: boolean };
}

interface Descriptor {
	caseId: string;
	prompt: string;
	startHere: string[];
	replaySources: Array<{ input: string; archiveDestination: string }>;
	outputPaths: { workspace: string; wiki: string; raw: string; archive: string; output: string };
}

interface RootAccess {
	path: string;
	kind: "workspace" | "source" | "template" | "skill";
	writable: boolean;
}

interface Grant {
	schemaVersion: 1;
	token: string;
	capabilityNames: string[];
	sessionRoot: string;
	runId: string;
	worldRoot: string;
	controlRoot: string;
	repositoryRoot: string;
	targetSkillRoot: string;
	targetSkillName: string;
	skillRoot?: string;
	network: { https: boolean; search: boolean };
}

interface SafeTarget {
	path: string;
	root: string;
	writable: boolean;
	info?: Awaited<ReturnType<typeof lstat>>;
}

interface ExecResult {
	stdout: string;
	stderr: string;
	exitCode: number | null;
	error?: string;
}

function record(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isInside(parent: string, candidate: string): boolean {
	const path = relative(parent, candidate);
	return path === "" || (path !== ".." && !path.startsWith(`..${sep}`) && !isAbsolute(path));
}

function rejectPath(message = "Path is outside the Runner grant or names protected evaluator data"): never {
	throw new Error(message);
}

function assertSafePathText(input: string): void {
	if (!input || input.includes("\0") || input.includes("\\") || input.includes(":")) rejectPath();
	if (/^[a-z][a-z\d+.-]*:\/\//iu.test(input)) rejectPath("URI schemes are not available to Runner file capabilities");
	const pathText = isAbsolute(input) ? input.slice(1) : input;
	if (pathText.split(/[\\/]/u).some((part) => part === ".." || part === ".")) rejectPath("Path traversal is not available to Runner file capabilities");
}

function isPrivateControlPath(path: string): boolean {
	const parts = resolve(path).split(sep).filter(Boolean);
	for (let i = 0; i < parts.length - 1; i++) {
		if (parts[i]?.startsWith("campaign-foundry-eval-") && parts[i + 1] === "control") return true;
	}
	return false;
}

function assertNoEvaluatorTree(path: string, allowedSkillRoot?: string): void {
	if (isPrivateControlPath(path)) rejectPath();
	const parts = resolve(path).split(sep).filter(Boolean);
	for (let i = 0; i < parts.length; i++) {
		const part = parts[i]!.toLowerCase();
		if (evaluatorTreeNames.has(part)) {
			const allowedRoot = allowedSkillRoot && isInside(allowedSkillRoot, resolve(path));
			if (!allowedRoot || part === "evals" || part === "answers" || part === "answer" || part === "grader" || part === "graders" || part === "grades" || part === "snapshots" || part === ".snapshots") rejectPath();
		}
	}
	if (protectedFileName.test(basename(path))) rejectPath();
}

async function realDirectory(path: string, label: string): Promise<string> {
	const resolved = resolve(path);
	const info = await lstat(resolved);
	if (info.isSymbolicLink() || !info.isDirectory()) throw new Error(`${label} must be a canonical real directory`);
	return await realpath(resolved);
}

async function assertNoLinksFrom(root: string, target: string, allowMissing: boolean): Promise<Awaited<ReturnType<typeof lstat>> | undefined> {
	if (!isInside(root, target)) rejectPath();
	const rel = relative(root, target);
	const parts = rel === "" ? [] : rel.split(sep);
	let current = root;
	let info = await lstat(root);
	if (info.isSymbolicLink() || !info.isDirectory()) rejectPath();
	for (let index = 0; index < parts.length; index++) {
		current = join(current, parts[index]!);
		try {
			info = await lstat(current);
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code === "ENOENT" && allowMissing) return undefined;
			throw error;
		}
		if (info.isSymbolicLink()) rejectPath("Symbolic links are not available to Runner capabilities");
		if (index < parts.length - 1 && !info.isDirectory()) rejectPath();
	}
	if (info.isFile() && info.nlink !== 1) rejectPath("Hard-linked files are not available to Runner capabilities");
	if (!info.isFile() && !info.isDirectory()) rejectPath("Special files are not available to Runner capabilities");
	return info;
}

async function canonicalAllowedRoots(grant: Grant): Promise<RootAccess[]> {
	const roots: RootAccess[] = [{ path: grant.worldRoot, kind: "workspace", writable: true }];
	for (const collection of ROOT_COLLECTIONS) {
		roots.push({ path: join(grant.repositoryRoot, collection), kind: "source", writable: false });
	}
	roots.push({ path: join(grant.repositoryRoot, "wiki", "templates"), kind: "template", writable: false });
	for (const catalog of [join(grant.repositoryRoot, ".agents", "skills"), join(grant.repositoryRoot, ".omp", "skills")]) {
		try {
			const entries = await readdir(catalog, { withFileTypes: true });
			for (const entry of entries) {
				if (!entry.isDirectory() || entry.name === grant.targetSkillName) continue;
				const candidate = join(catalog, entry.name);
				const canonical = await realpath(candidate).catch(() => "");
				if (canonical && canonical === candidate) roots.push({ path: canonical, kind: "skill", writable: false });
			}
		} catch {
			// A missing skill catalogue does not grant access to arbitrary paths.
		}
	}
	if (grant.skillRoot) roots.push({ path: grant.skillRoot, kind: "skill", writable: false });
	return roots.sort((a, b) => b.path.length - a.path.length);
}

async function resolveSkillUri(input: string, grant: Grant): Promise<string> {
	const match = input.match(/^skill:\/\/([^/]+)(?:\/(.*))?$/u);
	if (!match) rejectPath("Only the installed skill:// catalogue scheme is supported");
	let skillName: string;
	let relativePath: string;
	try {
		skillName = decodeURIComponent(match[1]!);
		relativePath = decodeURIComponent(match[2] ?? "") || "SKILL.md";
	} catch {
		rejectPath("The skill URI contains invalid percent-encoding");
	}
	if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/u.test(skillName)) rejectPath();
	assertSafePathText(relativePath);
	if (skillName === grant.targetSkillName) {
		if (!grant.skillRoot) rejectPath("The target skill is denied for this no-skill baseline");
		return join(grant.skillRoot, ...relativePath.split("/"));
	}
	for (const catalog of [join(grant.repositoryRoot, ".agents", "skills"), join(grant.repositoryRoot, ".omp", "skills")]) {
		const root = join(catalog, skillName);
		try {
			const canonical = await realpath(root);
			if (canonical !== root) continue;
			return join(root, ...relativePath.split("/"));
		} catch {
			// Try the other installed catalogue.
		}
	}
	rejectPath("The requested skill is not in the installed catalogue");
}

async function resolveTarget(input: unknown, worldRoot: string, grant: Grant, writable: boolean, expectDirectory = false): Promise<SafeTarget> {
	if (typeof input !== "string") rejectPath();
	let requested = input;
	if (requested.startsWith("skill://")) {
		if (writable) rejectPath("Skill references are read-only");
		requested = await resolveSkillUri(requested, grant);
	} else {
		assertSafePathText(requested);
	}
	const absolute = resolve(isAbsolute(requested) ? requested : join(worldRoot, requested));
	assertNoEvaluatorTree(absolute, grant.skillRoot);
	const roots = await canonicalAllowedRoots(grant);
	const root = roots.find((candidate) => isInside(candidate.path, absolute));
	if (!root || (writable && (!root.writable || root.kind !== "workspace"))) rejectPath();
	const info = await assertNoLinksFrom(root.path, absolute, writable);
	if (!info && !writable) rejectPath("The requested source file does not exist");
	if (info && expectDirectory && !info.isDirectory()) rejectPath("The requested search root is not a directory");
	if (info && !expectDirectory && !info.isFile()) rejectPath("The requested path is not a regular file");
	if (absolute === join(worldRoot, ".eval", "runner-input.json") && writable) rejectPath("The prepared Runner descriptor is immutable");
	return { path: absolute, root: root.path, writable: root.writable, ...(info ? { info } : {}) };
}

function relativePosix(root: string, path: string): string {
	return relative(root, path).split(sep).join("/");
}

function globRegex(pattern: string): RegExp {
	const escaped = pattern.replace(/[.+^${}()|[\]\\]/gu, "\\$&").replaceAll("**", "\u0000").replaceAll("*", "[^/]*").replaceAll("?", "[^/]").replaceAll("\u0000", ".*");
	return new RegExp(`^${escaped}$`, "u");
}

async function listFiles(root: string, grant: Grant): Promise<string[]> {
	const rootTarget = await resolveTarget(root, grant.worldRoot, grant, false, true);
	const files: string[] = [];
	const visit = async (directory: string): Promise<void> => {
		for (const entry of await readdir(directory, { withFileTypes: true })) {
			const path = join(directory, entry.name);
			try {
				assertNoEvaluatorTree(path, grant.skillRoot);
				const target = await resolveTarget(path, grant.worldRoot, grant, false, entry.isDirectory());
				if (target.info?.isDirectory()) await visit(path);
				else if (target.info?.isFile()) files.push(path);
			} catch {
				// Search results are filtered before file contents are opened or returned.
			}
		}
	};
	await visit(rootTarget.path);
	return files.sort((a, b) => a.localeCompare(b));
}

async function readTextFile(target: SafeTarget, startLine = 1, lineCount = 400): Promise<string> {
	if (!target.info || target.info.size > MAX_READ_BYTES) throw new Error("File is missing or exceeds the 5 MiB Runner read limit");
	const text = await readFile(target.path, "utf8");
	const lines = text.split(/\r?\n/u);
	const start = Math.max(1, Math.floor(startLine));
	const count = Math.min(2000, Math.max(1, Math.floor(lineCount)));
	return lines.slice(start - 1, start - 1 + count).map((line, index) => `${start + index}: ${line}`).join("\n");
}

async function validateDestination(input: unknown, grant: Grant, allowMissing: boolean): Promise<SafeTarget> {
	if (typeof input !== "string") rejectPath();
	assertSafePathText(input);
	const absolute = resolve(isAbsolute(input) ? input : join(grant.worldRoot, input));
	assertNoEvaluatorTree(absolute, grant.skillRoot);
	if (absolute === join(grant.worldRoot, ".eval", "runner-input.json")) rejectPath("The prepared Runner descriptor is immutable");
	const relativePath = relative(grant.worldRoot, absolute).split(sep);
	if (relativePath[0] === ".eval" && absolute !== join(grant.worldRoot, ".eval", "output.md")) {
		rejectPath("Only .eval/output.md is writable in the Runner-private evaluation directory");
	}
	if (!isInside(grant.worldRoot, absolute)) rejectPath();
	const info = await assertNoLinksFrom(grant.worldRoot, absolute, allowMissing);
	if (info && !info.isFile()) rejectPath("Writes may target regular files only");
	return { path: absolute, root: grant.worldRoot, writable: true, ...(info ? { info } : {}) };
}

async function writeInsideWorld(input: unknown, contentInput: unknown, grant: Grant): Promise<{ path: string; bytes: number }> {
	if (typeof contentInput !== "string") throw new Error("File content must be text");
	const target = await validateDestination(input, grant, true);
	await mkdir(dirname(target.path), { recursive: true });
	await assertNoLinksFrom(grant.worldRoot, dirname(target.path), false);
	let handle;
	try {
		handle = await open(target.path, constants.O_WRONLY | (constants.O_NOFOLLOW ?? 0));
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
		handle = await open(target.path, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | (constants.O_NOFOLLOW ?? 0), 0o600);
	}
	try {
		const info = await handle.stat();
		if (!info.isFile() || info.nlink !== 1) rejectPath("Only independent regular files may be written");
		await handle.truncate(0);
		await handle.writeFile(contentInput, "utf8");
		return { path: relativePosix(grant.worldRoot, target.path), bytes: Buffer.byteLength(contentInput, "utf8") };
	} finally {
		await handle.close();
	}
}

async function runExecFile(file: string, args: string[], cwd: string, env: NodeJS.ProcessEnv, timeout = 120_000): Promise<ExecResult> {
	return await new Promise((resolveResult) => {
		execFileCallback(file, args, { cwd, env, shell: false, encoding: "utf8", timeout, maxBuffer: 16 * 1024 * 1024 }, (error, stdout, stderr) => {
			const code = error && typeof error.code === "number" ? error.code : error ? null : 0;
			resolveResult({
				stdout: stdout ?? "",
				stderr: stderr ?? "",
				exitCode: code,
				...(error ? { error: error.message } : {}),
			});
		});
	});
}

function commandEnv(repositoryRoot: string, qmd = false): NodeJS.ProcessEnv {
	const env: NodeJS.ProcessEnv = { ...process.env, PWD: repositoryRoot };
	if (qmd) {
		delete env.QMD_CONFIG_DIR;
		delete env.QMD_INDEX;
	}
	return env;
}

async function writeReport(reportPath: unknown, result: ExecResult, grant: Grant): Promise<void> {
	if (reportPath === undefined) return;
	const target = await validateDestination(reportPath, grant, true);
	await mkdir(dirname(target.path), { recursive: true });
	await assertNoLinksFrom(grant.worldRoot, dirname(target.path), false);
	await writeInsideWorld(relativePosix(grant.worldRoot, target.path), result.stdout, grant);
}

function resultObject(result: ExecResult): ExecResult {
	return { stdout: result.stdout, stderr: result.stderr, exitCode: result.exitCode, ...(result.error ? { error: result.error } : {}) };
}

async function validateLiveQmd(prepared: RunnerPreparedWorkspace, worldRoot: string): Promise<{ repositoryRoot: string; qmdEnv: NodeJS.ProcessEnv }> {
	if (prepared.qmd?.mode !== "live-read-only" || typeof prepared.qmd.index !== "string" || !isAbsolute(prepared.qmd.index)) {
		throw new Error("Runner preparation must provide the existing live-read-only QMD index");
	}
	const indexPath = resolve(prepared.qmd.index);
	if (basename(dirname(indexPath)) !== ".qmd" || basename(indexPath) !== "index.sqlite") throw new Error("The QMD index must be the real project's .qmd/index.sqlite");
	const indexInfo = await lstat(indexPath);
	if (indexInfo.isSymbolicLink() || !indexInfo.isFile() || indexInfo.nlink !== 1) throw new Error("The existing QMD index must be an independent regular file");
	const index = await realpath(indexPath);
	const repositoryRoot = await realDirectory(dirname(dirname(index)), "QMD repository root");
	if (isInside(worldRoot, repositoryRoot) || isInside(repositoryRoot, worldRoot)) throw new Error("The live QMD repository must be separate from the Runner workspace");
	if (isPrivateControlPath(repositoryRoot)) throw new Error("The existing QMD index cannot be inside private evaluation storage");
	const qmdDirectory = join(repositoryRoot, ".qmd");
	const qmdDirectoryInfo = await lstat(qmdDirectory);
	if (qmdDirectoryInfo.isSymbolicLink() || !qmdDirectoryInfo.isDirectory()) throw new Error("The live QMD .qmd directory must be a real project directory");
	await assertNoLinksFrom(repositoryRoot, index, false);
	const configPath = join(repositoryRoot, ".qmd", "index.yml");
	const configInfo = await lstat(configPath);
	if (configInfo.isSymbolicLink() || !configInfo.isFile() || configInfo.nlink !== 1) throw new Error("The live QMD configuration must be an independent regular file");
	const config: unknown = YAML.parse(await readFile(configPath, "utf8"));
	if (!record(config) || !record(config.collections)) throw new Error("The live QMD config has no collections mapping");
	const collectionNames = Object.keys(config.collections).sort();
	if (collectionNames.join(",") !== [...ROOT_COLLECTIONS].sort().join(",")) throw new Error("The live QMD config must contain only wiki, raw, and archive collections");
	for (const collection of ROOT_COLLECTIONS) {
		const entry = config.collections[collection];
		if (!record(entry) || entry.path !== collection) throw new Error(`The live QMD ${collection} collection must point to the canonical repository ${collection}/ tree`);
		await realDirectory(join(repositoryRoot, collection), `Live ${collection} root`);
	}
	return { repositoryRoot, qmdEnv: commandEnv(repositoryRoot, true) };
}


function validateAssignedSkillRoot(skillRoot: string, targetSkillRoot: string, sessionRoot: string, targetSkillName: string): void {
	if (basename(skillRoot) !== targetSkillName) throw new Error("Assigned skill root must identify the target skill");
	if (skillRoot !== targetSkillRoot && !isInside(join(sessionRoot, "authoring", targetSkillName), skillRoot)) {
		throw new Error("A non-live target skill assignment must be under this Session's authoring snapshot root");
	}
}

async function assertGrantFile(grantPath: string, token: string): Promise<Grant> {
	if (!isAbsolute(grantPath) || !/^[A-Za-z0-9_-]{32,}$/u.test(token)) throw new Error("Invalid Runner grant credentials");
	if (!isPrivateControlPath(grantPath)) throw new Error("Runner grant is not in a private control root");
	const pathInfo = await lstat(grantPath);
	if (pathInfo.isSymbolicLink() || !pathInfo.isFile() || pathInfo.nlink !== 1 || (Number(pathInfo.mode) & 0o077) !== 0) throw new Error("Runner grant must be an owner-only regular file");
	if (await realpath(grantPath) !== grantPath) throw new Error("Runner grant path is not canonical");
	let parsed: unknown;
	try {
		parsed = JSON.parse(await readFile(grantPath, "utf8"));
	} catch {
		throw new Error("Runner grant could not be read");
	}
	if (!record(parsed)) throw new Error("Runner grant has an invalid private record");
	const capabilities = parsed.capabilityNames;
	const sessionRoot = parsed.sessionRoot;
	const runId = parsed.runId;
	const worldRoot = parsed.worldRoot;
	const controlRoot = parsed.controlRoot;
	const repositoryRoot = parsed.repositoryRoot;
	const targetSkillRoot = parsed.targetSkillRoot;
	const targetSkillName = parsed.targetSkillName;
	const skillRoot = parsed.skillRoot;
	const network = parsed.network;
	if (parsed.schemaVersion !== 1 || parsed.token !== token || !Array.isArray(capabilities)
		|| !capabilities.every((name: unknown): name is string => typeof name === "string" && /^cf_eval_[a-f0-9]{16}_[a-z_]+$/u.test(name))
		|| typeof sessionRoot !== "string" || !isAbsolute(sessionRoot) || typeof runId !== "string"
		|| typeof worldRoot !== "string" || !isAbsolute(worldRoot) || typeof controlRoot !== "string" || !isAbsolute(controlRoot)
		|| typeof repositoryRoot !== "string" || !isAbsolute(repositoryRoot) || typeof targetSkillRoot !== "string" || !isAbsolute(targetSkillRoot)
		|| typeof targetSkillName !== "string" || (skillRoot !== undefined && (typeof skillRoot !== "string" || !isAbsolute(skillRoot)))
		|| !record(network) || typeof network.https !== "boolean" || typeof network.search !== "boolean") {
		throw new Error("Runner grant has an invalid private record");
	}
	const world = await evalRunFromWorld(worldRoot);
	if (world.sessionRoot !== sessionRoot || world.runId !== runId
		|| resolve(controlRoot) !== join(world.sessionRoot, "control", world.runId)
		|| resolve(grantPath) !== join(controlRoot, "runner-grant.json")) throw new Error("Runner grant does not match its validated World/control layout");
	await realDirectory(controlRoot, "Runner private control root");
	if (await realDirectory(repositoryRoot, "Runner live repository") !== repositoryRoot) throw new Error("Runner live repository root is not canonical");
	if (await realDirectory(targetSkillRoot, "Target skill root") !== targetSkillRoot || basename(targetSkillRoot) !== targetSkillName) throw new Error("Runner grant has an invalid target skill identity");
	if (typeof skillRoot === "string") {
		if (await realDirectory(skillRoot, "Assigned skill snapshot") !== skillRoot) throw new Error("Assigned skill snapshot is not canonical");
		validateAssignedSkillRoot(skillRoot, targetSkillRoot, sessionRoot, targetSkillName);
	}
	return {
		schemaVersion: 1,
		token,
		capabilityNames: capabilities,
		sessionRoot,
		runId,
		worldRoot,
		controlRoot,
		repositoryRoot,
		targetSkillRoot,
		targetSkillName,
		...(typeof skillRoot === "string" ? { skillRoot } : {}),
		network: { https: network.https, search: network.search },
	};
}

export async function verifyEvalRunnerGrant(grantPath: string, token: string): Promise<Grant> {
	return await assertGrantFile(grantPath, token);
}

function schema(properties: Record<string, unknown>, required: string[] = []): JsonSchema {
	return { type: "object", properties, required, additionalProperties: false };
}

function stringSchema(description: string): JsonSchema {
	return { type: "string", description };
}

function boundedInteger(input: Record<string, unknown>, key: string, fallback: number, minimum: number, maximum: number): number {
	const value = input[key];
	if (value === undefined) return fallback;
	if (typeof value !== "number" || !Number.isSafeInteger(value) || value < minimum || value > maximum) {
		throw new Error(`${key} must be an integer from ${minimum} through ${maximum}`);
	}
	return value;
}

function isCanonicalSourcePath(path: string, repositoryRoot: string): { collection: Collection; relative: string } | null {
	const absolute = resolve(path);
	for (const collection of ROOT_COLLECTIONS) {
		const root = join(repositoryRoot, collection);
		if (isInside(root, absolute) && absolute !== root) return { collection, relative: relative(root, absolute).split(sep).join("/") };
	}
	return null;
}

async function mapQmdSource(livePath: string, worldRoot: string, repositoryRoot: string, grant: Grant): Promise<{ liveSource: string; scratchPath: string }> {
	await resolveTarget(livePath, worldRoot, grant, false);
	const source = isCanonicalSourcePath(livePath, repositoryRoot);
	if (!source) rejectPath("QMD retrieval is limited to live Wiki, Raw, and Archive sources");
	const scratchPath = join(worldRoot, source.collection, ...source.relative.split("/"));
	await resolveTarget(scratchPath, worldRoot, grant, false);
	return { liveSource: `${source.collection}/${source.relative}`, scratchPath: `${source.collection}/${source.relative}` };
}

function qmdRefToLivePath(reference: string, repositoryRoot: string): string {
	if (/^#[a-f\d]{4,32}$/iu.test(reference)) return reference;
	if (reference.startsWith("qmd://")) {
		const match = reference.match(/^qmd:\/\/(wiki|raw|archive)\/(.+)$/u);
		if (!match) rejectPath("QMD references must identify wiki, raw, or archive source documents");
		assertSafePathText(match[2]!);
		return join(repositoryRoot, match[1]!, ...match[2]!.split("/"));
	}
	assertSafePathText(reference);
	if (isAbsolute(reference)) {
		if (!isCanonicalSourcePath(reference, repositoryRoot)) rejectPath("QMD retrieval is limited to live Wiki, Raw, and Archive sources");
		return resolve(reference);
	}
	const match = reference.match(/^(wiki|raw|archive)\/(.+)$/u);
	if (!match) rejectPath("QMD retrieval is limited to wiki/, raw/, or archive/ paths and document IDs");
	return join(repositoryRoot, match[1]!, ...match[2]!.split("/"));
}


async function readPublicDescriptor(prepared: RunnerPreparedWorkspace, worldRoot: string): Promise<Descriptor> {
	const expectedPath = join(worldRoot, ".eval", "runner-input.json");
	if (resolve(prepared.runnerInput) !== expectedPath) throw new Error("Preparation runnerInput must be $W/.eval/runner-input.json");
	const info = await assertNoLinksFrom(worldRoot, expectedPath, false);
	if (!info?.isFile() || info.nlink !== 1 || (Number(info.mode) & 0o222) !== 0) throw new Error("The Runner descriptor must be an immutable independent regular file");
	let value: unknown;
	try {
		value = JSON.parse(await readFile(expectedPath, "utf8"));
	} catch {
		throw new Error("The Runner descriptor is invalid JSON");
	}
	if (!record(value)) throw new Error("The Runner descriptor must be a JSON object");
	const caseId = value.caseId;
	const prompt = value.prompt;
	const sourcePaths = value.startHere;
	const rawReplaySources = value.replaySources;
	const rawOutputs = value.outputPaths;
	if (typeof caseId !== "string" || caseId !== prepared.caseId || typeof prompt !== "string" || prompt !== prepared.case.prompt
		|| !Array.isArray(sourcePaths) || !sourcePaths.every((path: unknown): path is string => typeof path === "string")
		|| !Array.isArray(rawReplaySources) || !record(rawOutputs)) throw new Error("The Runner descriptor does not match the prepared case");
	const outputs = rawOutputs;
	const workspace = outputs.workspace;
	const wiki = outputs.wiki;
	const raw = outputs.raw;
	const archive = outputs.archive;
	const output = outputs.output;
	if (workspace !== worldRoot || wiki !== join(worldRoot, "wiki") || raw !== join(worldRoot, "raw")
		|| archive !== join(worldRoot, "archive") || output !== join(worldRoot, ".eval", "output.md")) throw new Error("The Runner descriptor output paths do not match its assigned World");
	for (const collectionRoot of [wiki, raw, archive]) {
		const rootInfo = await assertNoLinksFrom(worldRoot, collectionRoot, false);
		if (!rootInfo?.isDirectory()) throw new Error("Runner descriptor source roots must be independent World directories");
	}
	const outputInfo = await assertNoLinksFrom(worldRoot, output, true);
	if (outputInfo && !outputInfo.isFile()) throw new Error("Runner output path must be a regular file or a missing path");
	const startHere: string[] = [];
	for (const path of sourcePaths) {
		assertSafePathText(path);
		if (isAbsolute(path) || path.startsWith("wiki/")) rejectPath("Start-here source paths must be Wiki-relative");
		const sourcePath = resolve(wiki, path);
		if (!isInside(wiki, sourcePath)) rejectPath();
		const sourceInfo = await assertNoLinksFrom(worldRoot, sourcePath, false);
		if (!sourceInfo?.isFile()) throw new Error("Each start-here source must be an independent World Wiki file");
		startHere.push(path);
	}
	const replaySources: Descriptor["replaySources"] = [];
	for (const source of rawReplaySources) {
		if (!record(source) || typeof source.input !== "string" || typeof source.archiveDestination !== "string") throw new Error("Runner descriptor replay entries are invalid");
		assertSafePathText(source.input);
		assertSafePathText(source.archiveDestination);
		if (!source.input.startsWith("raw/") || !source.archiveDestination.startsWith("archive/")) throw new Error("Runner replay inputs and Archive destinations must use the assigned Raw and Archive trees");
		const sourcePath = resolve(worldRoot, source.input);
		const destinationPath = resolve(worldRoot, source.archiveDestination);
		if (!isInside(worldRoot, sourcePath) || !isInside(worldRoot, destinationPath)) rejectPath();
		const sourceInfo = await assertNoLinksFrom(worldRoot, sourcePath, false);
		if (!sourceInfo?.isFile()) throw new Error("Each assigned replay source must be an independent Raw file");
		const destinationInfo = await assertNoLinksFrom(worldRoot, destinationPath, true);
		if (destinationInfo) throw new Error("Each assigned Archive destination must be unused");
		replaySources.push({ input: source.input, archiveDestination: source.archiveDestination });
	}
	if (Object.keys(value).sort().join(",") !== ["caseId", "outputPaths", "prompt", "replaySources", "startHere"].sort().join(",")) throw new Error("Runner descriptor contains fields outside the safe public projection");
	if (Object.keys(outputs).sort().join(",") !== ["archive", "output", "raw", "wiki", "workspace"].sort().join(",")) throw new Error("Runner descriptor outputPaths contain unexpected fields");
	return { caseId, prompt, startHere, replaySources, outputPaths: { workspace, wiki, raw, archive, output } };
}

function isPrivateUrlPath(url: URL): boolean {
	let path = url.pathname;
	try { path = decodeURIComponent(path); } catch { return true; }
	return /campaign-foundry-eval-[^/]+\/control(?:\/|$)/u.test(path) || path.split("/").some((part) => part === ".." || part === ".");
}

function ipv6Groups(address: string): number[] | null {
	let value = address.toLowerCase();
	if (value.includes("%")) return null;
	if (value.includes(".")) {
		const separator = value.lastIndexOf(":");
		const ipv4 = value.slice(separator + 1);
		if (isIP(ipv4) !== 4) return null;
		const octets = ipv4.split(".").map(Number);
		value = `${value.slice(0, separator)}:${((octets[0]! << 8) | octets[1]!).toString(16)}:${((octets[2]! << 8) | octets[3]!).toString(16)}`;
	}
	const halves = value.split("::");
	if (halves.length > 2) return null;
	const left = halves[0] ? halves[0].split(":").map((part) => Number.parseInt(part, 16)) : [];
	const right = halves.length === 2 && halves[1] ? halves[1].split(":").map((part) => Number.parseInt(part, 16)) : [];
	const zeroCount = 8 - left.length - right.length;
	if (zeroCount < (halves.length === 2 ? 1 : 0) || (halves.length === 1 && zeroCount !== 0)) return null;
	const groups = [...left, ...Array<number>(zeroCount).fill(0), ...right];
	return groups.length === 8 && groups.every((part) => Number.isInteger(part) && part >= 0 && part <= 0xffff) ? groups : null;
}

function privateAddress(address: string): boolean {
	const ipVersion = isIP(address);
	if (ipVersion === 4) {
		const [a = 0, b = 0, c = 0] = address.split(".").map(Number);
		return a === 0 || a === 10 || a === 127 || (a === 100 && b! >= 64 && b! <= 127)
			|| (a === 169 && b === 254) || (a === 172 && b! >= 16 && b! <= 31)
			|| (a === 192 && (b === 168 || (b === 0 && c! <= 2) || (b === 88 && c === 99) || (b === 0 && c === 0)))
			|| (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100)))
			|| (a === 203 && b === 0 && c === 113) || a! >= 224;
	}
	if (ipVersion !== 6) return true;
	const groups = ipv6Groups(address);
	if (!groups) return true;
	if (groups.slice(0, 5).every((part) => part === 0) && groups[5] === 0xffff) {
		const embedded = `${groups[6]! >>> 8}.${groups[6]! & 0xff}.${groups[7]! >>> 8}.${groups[7]! & 0xff}`;
		return privateAddress(embedded);
	}
	const first = groups[0]!;
	return groups.every((part) => part === 0) || first < 0x2000 || first > 0x3fff || first === 0x2002 || (groups[0] === 0x2001 && groups[1] === 0);
}

async function validateExternalHttps(urlText: string): Promise<{ url: URL; address: string; hostname: string }> {
	let url: URL;
	try { url = new URL(urlText); } catch { throw new Error("Expected an absolute HTTPS URL"); }
	if (url.protocol !== "https:" || url.username || url.password || (url.port && url.port !== "443") || isPrivateUrlPath(url)) throw new Error("Only public read-only HTTPS URLs are available");
	const hostname = url.hostname.replace(/^\[|\]$/gu, "").toLowerCase();
	if (hostname === "localhost" || hostname.endsWith(".localhost") || hostname.endsWith(".local")) throw new Error("Private and local network hosts are not available");
	const addresses = isIP(hostname) ? [{ address: hostname }] : await lookup(hostname, { all: true, verbatim: true });
	if (addresses.length === 0 || addresses.some(({ address }) => privateAddress(address))) throw new Error("Private and local network hosts are not available");
	return { url, hostname, address: addresses[0]!.address };
}


async function readLimitedBody(body: ReadableStream<Uint8Array> | null, maxBytes: number): Promise<string> {
	if (!body) return "";
	const reader = body.getReader();
	const chunks: Buffer[] = [];
	let totalBytes = 0;
	try {
		while (totalBytes < maxBytes) {
			const { done, value } = await reader.read();
			if (done || !value) break;
			const remaining = maxBytes - totalBytes;
			const chunk = value.byteLength > remaining ? value.subarray(0, remaining) : value;
			chunks.push(Buffer.from(chunk));
			totalBytes += chunk.byteLength;
			if (chunk.byteLength !== value.byteLength) break;
		}
		if (totalBytes >= maxBytes) await reader.cancel();
		return Buffer.concat(chunks, totalBytes).toString("utf8");
	} finally {
		reader.releaseLock();
	}
}
async function requestPinnedHttps(url: URL, address: string, hostname: string): Promise<{ status: number; contentType: string; location?: string; body: string }> {
	return await new Promise((resolveResponse, reject) => {
		const request = httpsRequest({
			hostname: address,
			port: url.port ? Number(url.port) : 443,
			method: "GET",
			path: `${url.pathname}${url.search}`,
			headers: { host: url.host, accept: "text/html, text/plain, application/json, application/xml;q=0.9, */*;q=0.1" },
			agent: false,
			servername: isIP(hostname) === 0 ? hostname : undefined,
			checkServerIdentity: (_serverName, certificate) => checkServerIdentity(hostname, certificate),
		}, (response) => {
			void (async () => {
				const body = await readLimitedBody(Readable.toWeb(response) as ReadableStream<Uint8Array>, 1_000_000);
				const rawLocation = response.headers.location;
				resolveResponse({
					status: response.statusCode ?? 0,
					contentType: typeof response.headers["content-type"] === "string" ? response.headers["content-type"] : "",
					...(typeof rawLocation === "string" ? { location: rawLocation } : Array.isArray(rawLocation) && rawLocation[0] ? { location: rawLocation[0] } : {}),
					body,
				});
			})().catch(reject);
		});
		const deadline = setTimeout(() => request.destroy(new Error("HTTPS request timed out")), 30_000);
		deadline.unref();
		request.once("close", () => clearTimeout(deadline));
		request.setTimeout(30_000, () => request.destroy(new Error("HTTPS request timed out")));
		request.once("error", reject);
		request.end();
	});
}

async function fetchPublicHttps(input: string): Promise<{ url: string; status: number; contentType: string; body: string }> {
	let current = input;
	for (let redirects = 0; redirects <= 5; redirects++) {
		const { url, address, hostname } = await validateExternalHttps(current);
		const response = await requestPinnedHttps(url, address, hostname);
		if (response.status >= 300 && response.status < 400) {
			if (!response.location || redirects === 5) throw new Error("HTTPS redirect limit exceeded");
			current = new URL(response.location, url).href;
			continue;
		}
		return { url: url.href, status: response.status, contentType: response.contentType, body: response.body };
	}
	throw new Error("HTTPS redirect limit exceeded");
}

function decodeHtml(value: string): string {
	return value.replace(/&amp;/gu, "&").replace(/&quot;/gu, '"').replace(/&#39;/gu, "'").replace(/&lt;/gu, "<").replace(/&gt;/gu, ">").replace(/&#(\d+);/gu, (_match, decimal: string) => String.fromCodePoint(Number(decimal)));
}

async function searchWeb(query: string, limit: number): Promise<{ status: number; results: Array<{ title: string; url: string; snippet: string }> }> {
	if (!query.trim() || query.length > 1000 || /[\u0000-\u001f]/u.test(query)) throw new Error("Search query must be a nonempty single-line string of at most 1000 characters");
	const endpoint = new URL("https://html.duckduckgo.com/html/");
	endpoint.searchParams.set("q", query);
	const { status, body } = await fetchPublicHttps(endpoint.href);
	const results: Array<{ title: string; url: string; snippet: string }> = [];
	const blocks = body.match(/<div[^>]+class=["'][^"']*result[^"']*["'][^>]*>[\s\S]*?(?=<div[^>]+class=["'][^"']*result|$)/giu) ?? [];
	for (const block of blocks) {
		const link = block.match(/<a[^>]+class=["'][^"']*result__a[^"']*["'][^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/iu)
			?? block.match(/<a[^>]+href=["']([^"']+)["'][^>]+class=["'][^"']*result__a[^"']*["'][^>]*>([\s\S]*?)<\/a>/iu);
		if (!link) continue;
		let url: URL;
		try { url = new URL(decodeHtml(link[1]!), endpoint); } catch { continue; }
		if (url.protocol !== "https:" || isPrivateUrlPath(url)) continue;
		const title = decodeHtml(link[2]!.replace(/<[^>]+>/gu, "")).trim();
		const snippetMatch = block.match(/<a[^>]+class=["'][^"']*result__snippet[^"']*["'][^>]*>([\s\S]*?)<\/a>|<td[^>]+class=["'][^"']*result__snippet[^"']*["'][^>]*>([\s\S]*?)<\/td>/iu);
		const snippet = decodeHtml((snippetMatch?.[1] ?? snippetMatch?.[2] ?? "").replace(/<[^>]+>/gu, "")).trim();
		results.push({ title, url: url.href, snippet });
		if (results.length >= limit) break;
	}
	return { status, results };
}

export async function bindRunnerTools(
	prepared: RunnerPreparedWorkspace,
	options: RunnerToolOptions,
	register: RunnerToolRegistrar,
): Promise<{ token: string; toolNames: string[]; runnerBrief: string }> {
	const worldRoot = await realDirectory(prepared.root, "Runner World root");
	const run = await evalRunFromWorld(worldRoot);
	const controlRoot = join(run.sessionRoot, "control", run.runId);
	await realDirectory(controlRoot, "Runner private control root");
	const descriptor = await readPublicDescriptor(prepared, worldRoot);
	const { repositoryRoot, qmdEnv } = await validateLiveQmd(prepared, worldRoot);
	if (typeof prepared.case?.prompt !== "string" || !prepared.case.prompt.length) throw new Error("Prepared case is missing its natural DM request");
	const targetSkillRoot = await realDirectory(resolve(options.targetSkillRoot), "Target skill root");
	const targetSkillName = basename(targetSkillRoot);
	let skillRoot: string | undefined;
	if (options.skillRoot !== undefined) skillRoot = await realDirectory(resolve(options.skillRoot), "Assigned skill snapshot");
	if (skillRoot) validateAssignedSkillRoot(skillRoot, targetSkillRoot, run.sessionRoot, targetSkillName);
	const network = { https: options.network?.https === true, search: options.network?.search === true };
	const token = randomBytes(32).toString("base64url");
	const runTag = randomBytes(8).toString("hex");
	const toolNames: string[] = [];
	const capabilityNames: string[] = [];
	const grantPath = join(controlRoot, "runner-grant.json");
	const grant: Grant = {
		schemaVersion: 1,
		token,
		capabilityNames,
		sessionRoot: run.sessionRoot,
		runId: run.runId,
		worldRoot,
		controlRoot,
		repositoryRoot,
		targetSkillRoot,
		targetSkillName,
		...(skillRoot ? { skillRoot } : {}),
		network,
	};
	const bind = (suffix: string, description: string, parameters: JsonSchema, handler: ToolHandler): void => {
		const name = `cf_eval_${runTag}_${suffix}`;
		toolNames.push(name);
		capabilityNames.push(name);
		register(async (input) => {
			await assertGrantFile(grantPath, token);
			return await handler(input);
		}, { name, description, parameters });
	};
	const filePath = stringSchema("A path relative to the assigned World, or an explicitly granted source path");
	bind("read", "Read a file inside the assigned World or an allowed live source/skill path.", schema({ path: filePath, startLine: { type: "integer", minimum: 1 }, lineCount: { type: "integer", minimum: 1, maximum: 2000 } }, ["path"]), async (input) => {
		const startLine = boundedInteger(input, "startLine", 1, 1, Number.MAX_SAFE_INTEGER);
		const lineCount = boundedInteger(input, "lineCount", 400, 1, 2000);
		const target = await resolveTarget(input.path, worldRoot, grant, false);
		return await readTextFile(target, startLine, lineCount);
	});
	bind("grep", "Find literal text in files under one granted directory; private evaluator paths are filtered.", schema({ query: stringSchema("Literal case-insensitive text"), path: stringSchema("Optional granted directory; defaults to the assigned World"), limit: { type: "integer", minimum: 1, maximum: MAX_RESULT_LINES } }, ["query"]), async (input) => {
		if (typeof input.query !== "string" || !input.query) throw new Error("grep query must be nonempty text");
		if (input.path !== undefined && typeof input.path !== "string") throw new Error("grep path must be text");
		const root = typeof input.path === "string" ? input.path : worldRoot;
		const limit = boundedInteger(input, "limit", MAX_RESULT_LINES, 1, MAX_RESULT_LINES);
		const files = await listFiles(root, grant);
		const matches: Array<{ path: string; line: number; text: string }> = [];
		for (const path of files) {
			const target = await resolveTarget(path, worldRoot, grant, false);
			if (!target.info || target.info.size > MAX_READ_BYTES) continue;
			const lines = (await readFile(path, "utf8")).split(/\r?\n/u);
			for (let index = 0; index < lines.length; index++) {
				if (lines[index]!.toLocaleLowerCase().includes(input.query.toLocaleLowerCase())) matches.push({ path, line: index + 1, text: lines[index]! });
				if (matches.length >= limit) return matches;
			}
		}
		return matches;
	});
	bind("glob", "List granted files matching a relative glob pattern; private evaluator paths are filtered.", schema({ pattern: stringSchema("Glob relative to the assigned search directory"), path: stringSchema("Optional granted directory; defaults to the assigned World"), limit: { type: "integer", minimum: 1, maximum: 1000 } }, ["pattern"]), async (input) => {
		if (typeof input.pattern !== "string" || !input.pattern) throw new Error("glob pattern must be nonempty text");
		assertSafePathText(input.pattern);
		if (input.path !== undefined && typeof input.path !== "string") throw new Error("glob path must be text");
		const rootPath = typeof input.path === "string" ? input.path : worldRoot;
		const rootTarget = await resolveTarget(rootPath, worldRoot, grant, false, true);
		const matcher = globRegex(input.pattern);
		const files = await listFiles(rootTarget.path, grant);
		const limit = boundedInteger(input, "limit", 200, 1, 1000);
		return files.filter((path) => matcher.test(relativePosix(rootTarget.path, path))).slice(0, limit).map((path) => ({ path, relative: relativePosix(rootTarget.path, path) }));
	});
	bind("find", "Find granted files by filename; private evaluator paths are filtered before results are returned.", schema({ query: stringSchema("Case-insensitive filename fragment"), path: stringSchema("Optional granted directory; defaults to the assigned World"), limit: { type: "integer", minimum: 1, maximum: 1000 } }, ["query"]), async (input) => {
		if (typeof input.query !== "string" || !input.query) throw new Error("find query must be nonempty text");
		if (input.path !== undefined && typeof input.path !== "string") throw new Error("find path must be text");
		const rootPath = typeof input.path === "string" ? input.path : worldRoot;
		const rootTarget = await resolveTarget(rootPath, worldRoot, grant, false, true);
		const files = await listFiles(rootTarget.path, grant);
		const query = input.query.toLocaleLowerCase();
		const limit = boundedInteger(input, "limit", 200, 1, 1000);
		return files.filter((path) => basename(path).toLocaleLowerCase().includes(query)).slice(0, limit).map((path) => ({ path, relative: relativePosix(rootTarget.path, path) }));
	});
	bind("write", "Write UTF-8 text to a regular file inside the assigned World; the prepared descriptor is immutable.", schema({ path: stringSchema("World-relative target path"), content: stringSchema("Complete UTF-8 file content") }, ["path", "content"]), async (input) => {
		return await writeInsideWorld(input.path, input.content, grant);
	});
	bind("edit", "Replace the complete contents of a regular file inside the assigned World (not hashline editing).", schema({ path: stringSchema("World-relative target path"), content: stringSchema("Complete replacement UTF-8 file content") }, ["path", "content"]), async (input) => {
		return await writeInsideWorld(input.path, input.content, grant);
	});
	bind("delete", "Delete one regular file inside the assigned World; directories and the prepared descriptor cannot be removed.", schema({ path: stringSchema("World-relative file path") }, ["path"]), async (input) => {
		const target = await validateDestination(input.path, grant, false);
		if (!target.info?.isFile()) rejectPath("Only regular files may be deleted");
		await unlink(target.path);
		return { deleted: relativePosix(worldRoot, target.path) };
	});
	bind("archive_move", "Move one Raw file into the assigned Archive without overwriting an existing destination.", schema({ source: stringSchema("Raw-relative source path, beginning with raw/"), destination: stringSchema("Archive-relative destination path, beginning with archive/") }, ["source", "destination"]), async (input) => {
		const source = await validateDestination(input.source, grant, false);
		const destination = await validateDestination(input.destination, grant, true);
		if (!relativePosix(worldRoot, source.path).startsWith("raw/") || !relativePosix(worldRoot, destination.path).startsWith("archive/")) throw new Error("Archive moves are limited to Raw → Archive inside the assigned World");
		if (!source.info?.isFile()) rejectPath("Only regular Raw files can be moved");
		if (destination.info) throw new Error("Archive destination already exists; refusing to overwrite it");
		await mkdir(dirname(destination.path), { recursive: true });
		await assertNoLinksFrom(worldRoot, dirname(destination.path), false);
		await link(source.path, destination.path);
		try {
			const linkedInfo = await lstat(destination.path);
			const sourceInfo = await lstat(source.path);
			if (!linkedInfo.isFile() || linkedInfo.dev !== sourceInfo.dev || linkedInfo.ino !== sourceInfo.ino || linkedInfo.nlink !== 2) {
				throw new Error("Raw source changed during the Archive move");
			}
			await unlink(source.path);
		} catch (error) {
			const [linkedInfo, sourceInfo] = await Promise.all([
				lstat(destination.path).catch(() => undefined),
				lstat(source.path).catch(() => undefined),
			]);
			if (linkedInfo?.isFile() && sourceInfo?.isFile() && linkedInfo.dev === sourceInfo.dev && linkedInfo.ino === sourceInfo.ino) await unlink(destination.path).catch(() => {});
			throw error;
		}
		return { moved: relativePosix(worldRoot, source.path), archived: relativePosix(worldRoot, destination.path) };
	});
	bind("qmd_query", "Query only the existing live QMD index's wiki, raw, and archive collections using typed lexical/semantic searches.", schema({ intent: stringSchema("Explicit retrieval intent"), searches: { type: "array", minItems: 1, maxItems: 8, items: { type: "object", properties: { type: { type: "string", enum: ["lex", "vec"] }, query: stringSchema("Single-line search text") }, required: ["type", "query"], additionalProperties: false } }, limit: { type: "integer", minimum: 1, maximum: 20 } }, ["intent", "searches"]), async (input) => {
		if (typeof input.intent !== "string" || !input.intent.trim() || /[\r\n\u0000]/u.test(input.intent) || !Array.isArray(input.searches) || input.searches.length < 1 || input.searches.length > 8) throw new Error("QMD requires a nonempty explicit intent and typed search list");
		const lines = [`intent: ${input.intent.trim()}`];
		for (const search of input.searches) {
			if (!record(search) || (search.type !== "lex" && search.type !== "vec") || typeof search.query !== "string" || !search.query.trim() || /[\r\n\u0000]/u.test(search.query)) throw new Error("Each QMD search must be a single-line lex or vec query");
			lines.push(`${search.type}: ${search.query.trim()}`);
		}
		const limit = boundedInteger(input, "limit", 5, 1, 20);
		const args = ["query", lines.join("\n"), "--format", "json", "--no-rerank", "--full-path", "-n", String(limit)];
		for (const collection of ROOT_COLLECTIONS) args.push("-c", collection);
		const result = await runExecFile("qmd", args, repositoryRoot, qmdEnv);
		let hits: unknown[] = [];
		const jsonStart = result.stdout.indexOf("[");
		const jsonEnd = result.stdout.lastIndexOf("]");
		if (jsonStart >= 0 && jsonEnd >= jsonStart) {
			try {
				const parsed: unknown = JSON.parse(result.stdout.slice(jsonStart, jsonEnd + 1));
				if (Array.isArray(parsed)) hits = parsed;
			} catch {
				throw new Error("QMD returned malformed JSON results");
			}
		}
		const mapped = [];
		for (const hit of hits) {
			if (!record(hit) || typeof hit.file !== "string") continue;
			const sourcePath = qmdRefToLivePath(hit.file, repositoryRoot);
			if (typeof sourcePath !== "string") rejectPath("QMD search returned a result without a source path");
			const sourcePair = await mapQmdSource(sourcePath, worldRoot, repositoryRoot, grant);
			mapped.push({ ...hit, ...sourcePair });
		}
		return { ...resultObject(result), results: mapped };
	});
	bind("qmd_get", "Retrieve one document from the existing live Wiki, Raw, or Archive QMD index by document ID or source path.", schema({ reference: stringSchema("QMD document ID, qmd://wiki|raw|archive path, or live repo collection path") }, ["reference"]), async (input) => {
		if (typeof input.reference !== "string") throw new Error("QMD reference must be text");
		const source = qmdRefToLivePath(input.reference, repositoryRoot);
		const args = ["get", source, "--full-path", "--line-numbers"];
		for (const collection of ROOT_COLLECTIONS) args.push("-c", collection);
		const result = await runExecFile("qmd", args, repositoryRoot, qmdEnv);
		if (result.exitCode !== 0) return resultObject(result);
		const firstLine = result.stdout.split(/\r?\n/u, 1)[0] ?? "";
		const printedPath = firstLine.startsWith("./") ? resolve(repositoryRoot, firstLine.slice(2)) : firstLine;
		const sourcePath = input.reference.startsWith("#") ? printedPath : source;
		const sourcePair = await mapQmdSource(sourcePath, worldRoot, repositoryRoot, grant);
		return { ...resultObject(result), ...sourcePair };
	});
	bind("check", "Run the complete 13-layer cf check or check --fix against the assigned World.", schema({ fix: { type: "boolean", description: "Apply mechanical fixes before reporting." }, reportPath: stringSchema("Optional World-relative output file for stdout") }), async (input) => {
		if (input.fix !== undefined && typeof input.fix !== "boolean") throw new Error("check fix must be boolean");
		const args = [join(repositoryRoot, "src", "cli.ts"), "check", "--json", "--root", worldRoot, "--vault", join(worldRoot, "wiki"), "--templates", join(worldRoot, "wiki", "templates")];
		if (input.fix === true) args.push("--fix");
		const result = await runExecFile("node", args, repositoryRoot, commandEnv(repositoryRoot));
		await writeReport(input.reportPath, result, grant);
		return resultObject(result);
	});
	bind("index", "Run cf index only for the assigned World; its writes stay under the assigned Wiki.", schema({ reportPath: stringSchema("Optional World-relative output file for stdout") }), async (input) => {
		const args = [join(repositoryRoot, "src", "cli.ts"), "index", "--root", worldRoot, "--vault", join(worldRoot, "wiki")];
		const result = await runExecFile("node", args, repositoryRoot, commandEnv(repositoryRoot));
		await writeReport(input.reportPath, result, grant);
		return resultObject(result);
	});
	bind("log", "Run cf log with typed fields against the assigned World only.", schema({ world: stringSchema("World name in the assigned Wiki"), op: { type: "string", enum: ["create", "ingest", "prep", "push", "audit", "pull", "query"] }, title: stringSchema("One-line log entry title"), pages: { type: "array", minItems: 1, items: stringSchema("Page name or Wiki-relative path") }, reportPath: stringSchema("Optional World-relative output file for stdout") }, ["world", "op", "title", "pages"]), async (input) => {
		if (typeof input.world !== "string" || !input.world.trim() || /[\/\\\u0000-\u001f]/u.test(input.world) || typeof input.op !== "string" || !LOG_OPERATIONS.has(input.op) || typeof input.title !== "string" || !input.title.trim() || /[\r\n\u0000]/u.test(input.title) || !Array.isArray(input.pages) || input.pages.length === 0 || input.pages.length > 64) throw new Error("log requires a World, valid operation, one-line title, and one to 64 pages");
		const pages: string[] = [];
		for (const page of input.pages) {
			if (typeof page !== "string" || !page.trim()) throw new Error("log page references must be nonempty text");
			pages.push(page);
		}
		for (const page of pages) {
			assertSafePathText(page);
			if (page.includes("/")) {
				const wikiPath = page.startsWith("wiki/") ? page : `wiki/${page}`;
				await resolveTarget(wikiPath, worldRoot, grant, false);
			}
		}
		const args = [join(repositoryRoot, "src", "cli.ts"), "log", `--world=${input.world}`, `--op=${input.op}`, `--title=${input.title}`, "--root", worldRoot, "--vault", join(worldRoot, "wiki")];
		for (const page of pages) args.push(`--page=${page}`);
		const result = await runExecFile("node", args, repositoryRoot, commandEnv(repositoryRoot));
		await writeReport(input.reportPath, result, grant);
		return resultObject(result);
	});
	if (network.https) {
		bind("https_get", "Retrieve one public HTTPS page with GET only; private/local hosts, redirects, and mutation methods are unavailable.", schema({ url: stringSchema("Public HTTPS URL") }, ["url"]), async (input) => {
			if (typeof input.url !== "string") throw new Error("HTTPS URL must be text");
			return await fetchPublicHttps(input.url);
		});
	}
	if (network.search) {
		bind("web_search", "Search the public web using read-only HTTPS retrieval.", schema({ query: stringSchema("Search query"), limit: { type: "integer", minimum: 1, maximum: 10 } }, ["query"]), async (input) => {
			if (typeof input.query !== "string") throw new Error("Search query must be text");
			const limit = boundedInteger(input, "limit", 5, 1, 10);
			return await searchWeb(input.query, limit);
		});
	}
	await writeFile(grantPath, JSON.stringify(grant, null, 2), { encoding: "utf8", flag: "wx", mode: 0o600 });
	await chmod(grantPath, 0o600);
	const operationDescriptor = {
		caseId: descriptor.caseId,
		startHere: descriptor.startHere,
		replaySources: descriptor.replaySources,
		outputPaths: descriptor.outputPaths,
	};
	const runnerBrief = `Eval grant: ${grantPath} ${token}\n\nOperational workspace descriptor:\n${JSON.stringify(operationDescriptor, null, 2)}\nStart-here paths are relative to outputPaths.wiki; read them as wiki/<path>.\n\nDM request (verbatim):\n${descriptor.prompt}`;
	return { token, toolNames, runnerBrief };
}
