#!/usr/bin/env node
/** Prepare independent, provenance-tracked workspaces for active skill evals.
 *
 *   bun run eval:prepare --cases /absolute/path/cases.yaml --case <id>
 *   bun run eval:prepare --from <prepared-root>
 *   bun run eval:prepare --verify <world-root>
 */
import "../src/env.ts";
import { createHash, randomUUID } from "node:crypto";
import { constants, createReadStream } from "node:fs";
import { access, chmod, copyFile, cp, lstat, mkdir, readFile, readdir, realpath, rm, unlink, writeFile } from "node:fs/promises";
import { Command, CommanderError } from "commander";
import { basename, dirname, extname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { calloutLines } from "../src/narration/sources.ts";
import { parsePage } from "../src/vault/parse.ts";
import { loadCases } from "./check.ts";
import { allocateEvalRun, closeEvalSession, createEvalSession, evalRunFromWorld, evalRunPaths, reapEvalSessions, validateEvalSessionRoot } from "./workspaces.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataRoots = ["wiki", "raw", "archive"] as const;
type DataRoot = (typeof dataRoots)[number];

type EvalCase = Record<string, unknown> & {
	id: string;
	prompt: string;
	source_pages: string[];
	raw_sources?: string[];
	seed_callouts?: Array<{ page: string; title: string; body: string }>;
};

interface SourceFile {
	origin: string;
	sha256: string;
	bytes: number;
	repoPath?: string;
}

interface BaselineFile {
	path: string;
	sha256: string;
	bytes: number;
}

interface ReplaySource {
	origin: string;
	scratchPath: string;
	archivePath: string;
	sha256: string;
}

interface Manifest {
	schemaVersion: 2;
	sessionRoot: string;
	workspaceRoot: string;
	sourceRoot: string;
	createdAt: string;
	clonedFrom?: string;
	caseId: string;
	casesFile: string;
	caseFileSha256: string;
	caseInput: EvalCase;
	sourceTrees: Record<DataRoot, boolean>;
	sourceFiles: SourceFile[];
	replaySources: ReplaySource[];
	baselineFiles: BaselineFile[];
}

export interface QmdIndex {
	mode: "live-read-only";
	index: string;
}

export interface PreparedWorkspace {
	root: string;
	wiki: string;
	raw: string;
	archive: string;
	baseline: string;
	manifest: string;
	caseId: string;
	case: EvalCase;
	sessionRoot: string;
	runnerInput: string;
	qmd: QmdIndex;
}

export interface PreparationOptions {
	repositoryRoot?: string;
	sessionRoot?: string;
}

export interface VerificationResult {
	ok: true;
	root: string;
	caseId: string;
}

interface LocalFile {
	path: string;
	relativePath: string;
	sha256: string;
	bytes: number;
	dev: number;
	ino: number;
}

class PreparationError extends Error {}

function fail(message: string): never {
	throw new PreparationError(message.startsWith("PREPARATION:") ? message : `PREPARATION: ${message}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toPosix(path: string): string {
	return path.split(sep).join("/");
}

function inTree(root: string, candidate: string): boolean {
	const rel = relative(root, candidate);
	return rel !== "" && rel !== ".." && !rel.startsWith(`..${sep}`) && !isAbsolute(rel);
}

function safeRelativePath(value: unknown, what: string): string {
	if (typeof value !== "string" || value.length === 0 || value.includes("\\") || value.includes("\0") || isAbsolute(value)) {
		fail(`${what} must be a safe relative path using / separators`);
	}
	const parts = value.split("/");
	if (parts.some((part) => part === "" || part === "." || part === ".." || /[\u0000-\u001f]/u.test(part))) {
		fail(`${what} contains an unsafe path component: ${value}`);
	}
	return parts.join("/");
}

function regexFromCheck(source: string, caseId: string, kind: "canon" | "absent", page: string): RegExp {
	const literal = source.match(/^\/(.+)\/([a-z]*)$/s);
	try {
		return literal ? new RegExp(literal[1] as string, literal[2]) : new RegExp(source, "m");
	} catch (error) {
		fail(`case "${caseId}" checks.${kind}[${JSON.stringify(page)}]: invalid regex ${source}: ${(error as Error).message}`);
	}
}

function validateRegexes(caseInput: EvalCase): void {
	const checks = caseInput.checks;
	if (!isRecord(checks)) return;
	for (const key of ["canon", "absent"] as const) {
		const pageMap = checks[key];
		if (!isRecord(pageMap)) continue;
		for (const [page, expressions] of Object.entries(pageMap)) {
			if (!Array.isArray(expressions)) continue;
			for (const expression of expressions) {
				if (typeof expression !== "string") fail(`case "${caseInput.id}": checks.${key}.${page} must contain regex strings`);
				regexFromCheck(expression, caseInput.id, key, page);
			}
		}
	}
}

function digestFile(path: string): Promise<{ sha256: string; bytes: number }> {
	return new Promise((resolveDigest, reject) => {
		const hash = createHash("sha256");
		let bytes = 0;
		const stream = createReadStream(path);
		stream.on("data", (chunk: Buffer) => {
			hash.update(chunk);
			bytes += chunk.byteLength;
		});
		stream.once("error", reject);
		stream.once("end", () => resolveDigest({ sha256: hash.digest("hex"), bytes }));
	});
}

async function walkFiles(root: string, label: string, required: boolean): Promise<LocalFile[]> {
	let rootInfo;
	try {
		rootInfo = await lstat(root);
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "ENOENT" && !required) return [];
		if ((error as NodeJS.ErrnoException).code === "ENOENT") fail(`${label} directory not found: ${root}`);
		throw error;
	}
	if (rootInfo.isSymbolicLink() || !rootInfo.isDirectory()) fail(`${label} must be a real directory, not a symlink or special file: ${root}`);
	const found: LocalFile[] = [];
	const visit = async (directory: string): Promise<void> => {
		const names = (await readdir(directory)).sort((a, b) => a.localeCompare(b));
		for (const name of names) {
			const path = join(directory, name);
			const info = await lstat(path);
			if (info.isSymbolicLink()) fail(`${label} contains a symlink: ${path}`);
			if (info.isDirectory()) {
				await visit(path);
				continue;
			}
			if (!info.isFile()) fail(`${label} contains a non-regular file: ${path}`);
			if (info.nlink !== 1) fail(`${label} contains a hard-linked file (link count ${info.nlink}): ${path}`);
			const digest = await digestFile(path);
			found.push({ path, relativePath: toPosix(relative(root, path)), ...digest, dev: info.dev, ino: info.ino });
		}
	};
	await visit(root);
	return found;
}

function sourceFileFor(files: LocalFile[], root: string, relativePath: string, label: string): LocalFile {
	const normalized = toPosix(relativePath);
	const found = files.find((file) => file.relativePath === normalized);
	if (!found) fail(`${label} file not found: ${join(root, ...normalized.split("/"))}`);
	return found;
}

async function copyIndependent(source: string, destination: string, label: string): Promise<void> {
	await cp(source, destination, { recursive: true, force: false, errorOnExist: true, verbatimSymlinks: true });
	const sourceFiles = await walkFiles(source, `${label} source`, true);
	const copiedFiles = await walkFiles(destination, `${label} copy`, true);
	if (sourceFiles.length !== copiedFiles.length) fail(`${label} copy did not preserve the complete file set`);
	for (const sourceFile of sourceFiles) {
		const copied = copiedFiles.find((file) => file.relativePath === sourceFile.relativePath);
		if (!copied || copied.sha256 !== sourceFile.sha256 || copied.bytes !== sourceFile.bytes) {
			fail(`${label} copy differs from source at ${sourceFile.relativePath}`);
		}
		if (copied.dev === sourceFile.dev && copied.ino === sourceFile.ino) fail(`${label} copy shares an inode with the source: ${sourceFile.relativePath}`);
	}
}

function asEvalCase(value: unknown, caseId: string): EvalCase {
	if (!isRecord(value) || value.id !== caseId || typeof value.prompt !== "string" || value.prompt.length === 0) {
		fail(`case "${caseId}" must be a mapping with its id and a non-empty prompt`);
	}
	const sourcePages = value.source_pages;
	if (!Array.isArray(sourcePages) || sourcePages.length === 0 || !sourcePages.every((page): page is string => typeof page === "string" && page.length > 0)) {
		fail(`case "${caseId}" must have a non-empty source_pages list of Wiki-relative page paths`);
	}
	const rawSources = value.raw_sources;
	if (rawSources !== undefined && (!Array.isArray(rawSources) || !rawSources.every((source): source is string => typeof source === "string" && source.length > 0))) {
		fail(`case "${caseId}" raw_sources must be a list of repo-relative raw/ or archive/ file paths`);
	}
	let seedCallouts: Array<{ page: string; title: string; body: string }> | undefined;
	if (value.seed_callouts !== undefined) {
		if (!Array.isArray(value.seed_callouts)) fail(`case "${caseId}" seed_callouts must be a list`);
		seedCallouts = value.seed_callouts.map((seed, index) => {
			if (!isRecord(seed) || typeof seed.page !== "string" || typeof seed.title !== "string" || typeof seed.body !== "string"
				|| seed.title.trim() === "" || seed.body.trim() === "") {
				fail(`case "${caseId}" seed_callouts[${index}] requires a page, non-empty title, and non-empty body`);
			}
			return {
				page: safeRelativePath(seed.page, `case "${caseId}" seed_callouts[${index}].page`),
				title: seed.title,
				body: seed.body,
			};
		});
	}
	const input: EvalCase = {
		...value,
		id: value.id,
		prompt: value.prompt,
		source_pages: sourcePages.map((page) => safeRelativePath(page, `case "${caseId}" source_pages`)),
		...(rawSources === undefined ? {} : { raw_sources: rawSources }),
		...(seedCallouts === undefined ? {} : { seed_callouts: seedCallouts }),
	};
	validateRegexes(input);
	return input;
}

function checkCaseSources(caseInput: EvalCase, wikiFiles: LocalFile[], repoFiles: LocalFile[], sourceRoot: string): { pages: string[]; rawSources: LocalFile[] } {
	const pages = caseInput.source_pages;
	for (const page of pages) {
		const pagePath = page.endsWith(".md") ? page : `${page}.md`;
		if (!wikiFiles.some((file) => file.relativePath === pagePath)) {
			fail(`case "${caseInput.id}" source_pages file is missing from wiki/: ${page}`);
		}
	}
	const rawPaths = caseInput.raw_sources ?? [];
	const seen = new Set<string>();
	const rawSources = rawPaths.map((source) => {
		const relativePath = safeRelativePath(source, `case "${caseInput.id}" raw_sources`);
		const [rootName, ...parts] = relativePath.split("/");
		if ((rootName !== "raw" && rootName !== "archive") || parts.length === 0) {
			fail(`case "${caseInput.id}" raw_sources must name files under raw/ or archive/: ${source}`);
		}
		if (seen.has(relativePath)) fail(`case "${caseInput.id}" repeats raw_sources path: ${relativePath}`);
		seen.add(relativePath);
		return sourceFileFor(repoFiles, sourceRoot, relativePath, `case "${caseInput.id}" raw_sources`);
	});
	return { pages, rawSources };
}

async function assertDirectorySafe(path: string, label: string): Promise<void> {
	const info = await lstat(path);
	if (info.isSymbolicLink() || !info.isDirectory()) fail(`${label} is not a real directory: ${path}`);
}

function manifestPath(controlRoot: string): string {
	return join(controlRoot, "manifest.json");
}

function runnerInputPath(root: string): string {
	return join(root, ".eval", "runner-input.json");
}

function outputPaths(root: string, controlRoot: string, sessionRoot: string, manifest: Manifest, index: string): PreparedWorkspace {
	return {
		root,
		wiki: join(root, "wiki"),
		raw: join(root, "raw"),
		archive: join(root, "archive"),
		baseline: join(controlRoot, "baseline", "wiki"),
		manifest: manifestPath(controlRoot),
		caseId: manifest.caseId,
		case: manifest.caseInput,
		sessionRoot,
		runnerInput: runnerInputPath(root),
		qmd: { mode: "live-read-only", index },
	};
}

const PREPARE_EXAMPLES = `Examples:
  bun run eval:prepare --session-start
  bun run eval:prepare --session-close "$SESSION_ROOT"
  bun run eval:prepare --reap-stale --include-legacy --older-than-hours 24 --dry-run
  bun run eval:prepare --reap-stale --include-legacy --older-than-hours 24 --yes
  bun run eval:prepare --cases "$PWD/.agents/skills/audit/evals/cases.yaml" --case named-claim --session-root "$SESSION_ROOT"
  bun run eval:prepare --from "$PREPARED_ROOT" --session-root "$SESSION_ROOT"
  bun run eval:prepare --verify "$WORLD_ROOT"`;

async function writeRunnerInput(root: string, manifest: Manifest, pages: string[]): Promise<string> {
	const directory = join(root, ".eval");
	await mkdir(directory, { mode: 0o700 });
	const path = runnerInputPath(root);
	const descriptor = {
		caseId: manifest.caseId,
		prompt: manifest.caseInput.prompt,
		startHere: pages,
		replaySources: manifest.replaySources.map(({ scratchPath, archivePath }) => ({ input: scratchPath, archiveDestination: archivePath })),
		outputPaths: {
			workspace: root,
			wiki: join(root, "wiki"),
			raw: join(root, "raw"),
			archive: join(root, "archive"),
			output: join(root, ".eval", "output.md"),
		},
	};
	await writeFile(path, `${JSON.stringify(descriptor, null, 2)}\n`, { flag: "wx", mode: 0o444 });
	await chmod(path, 0o444);
	return path;
}

async function seedCallouts(root: string, caseInput: EvalCase): Promise<void> {
	for (const seed of caseInput.seed_callouts ?? []) {
		const pagePath = seed.page.endsWith(".md") ? seed.page : `${seed.page}.md`;
		const file = join(root, "wiki", ...pagePath.split("/"));
		const info = await lstat(file).catch(() => fail(`case "${caseInput.id}" seed_callouts page not found in wiki/: ${pagePath}`));
		if (info.isSymbolicLink() || !info.isFile() || info.nlink !== 1) fail(`case "${caseInput.id}" seed_callouts page is not an independent regular file: ${pagePath}`);
		const source = await readFile(file, "utf8");
		const page = parsePage(pagePath, source);
		const matches = page.callouts.filter((callout) => callout.type === "narration" && callout.title === seed.title);
		if (matches.length !== 1) fail(`case "${caseInput.id}" seed_callouts ${pagePath} title ${JSON.stringify(seed.title)} matched ${matches.length} narration callouts; expected exactly one`);
		const callout = matches[0];
		if (!callout) fail(`case "${caseInput.id}" seed_callouts has no matching callout in ${pagePath}`);
		const [firstLine, lastLine] = calloutLines(page, callout);
		const lines = source.split("\n");
		const replacement = seed.body.split("\n").map((line) => `> ${line}`);
		lines.splice(firstLine, lastLine - firstLine, ...replacement);
		await writeFile(file, lines.join("\n"));
	}
}

async function requireIndependentFile(path: string, label: string): Promise<void> {
	const info = await lstat(path).catch((error: NodeJS.ErrnoException) => {
		if (error.code === "ENOENT") fail(`PREPARATION: missing ${label}: ${path}`);
		throw error;
	});
	if (info.isSymbolicLink() || !info.isFile() || info.nlink !== 1) fail(`${label} must be an independent regular file: ${path}`);
	if (await realpath(path) !== path) fail(`${label} must not resolve through a symlink: ${path}`);
}

function sameFiles(expected: Array<{ path: string; sha256: string; bytes: number }>, actual: LocalFile[], label: string): void {
	if (expected.length !== actual.length) fail(`${label} file set changed (expected ${expected.length}, found ${actual.length})`);
	const byPath = new Map(actual.map((file) => [file.relativePath, file]));
	for (const file of expected) {
		const found = byPath.get(file.path);
		if (!found || found.sha256 !== file.sha256 || found.bytes !== file.bytes) fail(`${label} changed: ${file.path}`);
	}
}

async function readManifest(rootArgument: string): Promise<{ root: string; sessionRoot: string; runId: string; controlRoot: string; manifest: Manifest }> {
	if (rootArgument.split(sep).includes("..")) fail(`eval World path must not contain traversal components: ${rootArgument}`);
	const root = resolve(rootArgument);
	const { sessionRoot, runId } = evalRunFromWorld(root);
	const validatedSessionRoot = await validateEvalSessionRoot(sessionRoot);
	if (validatedSessionRoot !== sessionRoot) fail(`eval session root is not canonical: ${sessionRoot}`);
	const paths = evalRunPaths(sessionRoot, runId);
	if (paths.worldRoot !== root) fail(`eval World path does not match session layout: ${root}`);
	await assertDirectorySafe(root, "eval World root");
	if (await realpath(root) !== root) fail(`eval World root must not resolve through a symlink: ${root}`);
	await assertDirectorySafe(paths.controlRoot, "private eval control root");
	if (await realpath(paths.controlRoot) !== paths.controlRoot) fail(`private eval control root must not resolve through a symlink: ${paths.controlRoot}`);
	const manifestFile = manifestPath(paths.controlRoot);
	const info = await lstat(manifestFile);
	if (info.isSymbolicLink() || !info.isFile() || info.nlink !== 1) fail(`manifest must be an independent regular file: ${manifestFile}`);
	let parsed: unknown;
	try {
		parsed = JSON.parse(await readFile(manifestFile, "utf8"));
	} catch (error) {
		fail(`could not read preparation manifest ${manifestFile}: ${(error as Error).message}`);
	}
	if (!isRecord(parsed)
		|| parsed.schemaVersion !== 2
		|| parsed.sessionRoot !== sessionRoot
		|| parsed.workspaceRoot !== root
		|| typeof parsed.sourceRoot !== "string"
		|| typeof parsed.createdAt !== "string"
		|| typeof parsed.caseId !== "string"
		|| typeof parsed.casesFile !== "string"
		|| typeof parsed.caseFileSha256 !== "string"
		|| !isRecord(parsed.caseInput)
		|| !Array.isArray(parsed.sourceFiles)
		|| !Array.isArray(parsed.replaySources)
		|| !Array.isArray(parsed.baselineFiles)
		|| !isRecord(parsed.sourceTrees)) {
		fail(`unsupported or invalid preparation manifest: ${manifestFile}`);
	}
	const sourceTrees = parsed.sourceTrees;
	if (!isAbsolute(parsed.sourceRoot) || !isAbsolute(parsed.casesFile)
		|| parsed.caseInput.id !== parsed.caseId
		|| dataRoots.some((name) => typeof sourceTrees[name] !== "boolean")
		|| !parsed.sourceFiles.every((file) => isRecord(file) && typeof file.origin === "string" && typeof file.sha256 === "string" && /^[0-9a-f]{64}$/u.test(file.sha256) && typeof file.bytes === "number" && Number.isSafeInteger(file.bytes) && (file.repoPath === undefined || typeof file.repoPath === "string"))
		|| !parsed.baselineFiles.every((file) => isRecord(file) && typeof file.path === "string" && typeof file.sha256 === "string" && /^[0-9a-f]{64}$/u.test(file.sha256) && typeof file.bytes === "number" && Number.isSafeInteger(file.bytes))
		|| !parsed.replaySources.every((source) => isRecord(source) && typeof source.origin === "string" && typeof source.scratchPath === "string" && typeof source.archivePath === "string" && typeof source.sha256 === "string")) {
		fail(`preparation manifest contains invalid fields: ${manifestFile}`);
	}
	const caseInput = asEvalCase(parsed.caseInput, parsed.caseId);
	const manifest = parsed as unknown as Manifest;
	return { root, sessionRoot, runId, controlRoot: paths.controlRoot, manifest: { ...manifest, caseInput } };
}

async function compareSourceOrigins(manifest: Manifest): Promise<Set<string>> {
	const sourceRoot = await realpath(manifest.sourceRoot).catch(() => fail(`source repository no longer exists: ${manifest.sourceRoot}`));
	if (sourceRoot !== resolve(manifest.sourceRoot)) fail(`source repository path now resolves elsewhere: ${manifest.sourceRoot}`);
	const expectedByTree = new Map<DataRoot, Array<{ path: string; sha256: string; bytes: number }>>();
	for (const rootName of dataRoots) expectedByTree.set(rootName, []);
	const externalSources = new Map<string, SourceFile>();
	for (const file of manifest.sourceFiles) {
		if (!isAbsolute(file.origin) || !/^[0-9a-f]{64}$/u.test(file.sha256) || !Number.isSafeInteger(file.bytes) || file.bytes < 0) fail("manifest contains an invalid source hash entry");
		if (file.repoPath !== undefined) {
			const repoPath = safeRelativePath(file.repoPath, "manifest repoPath");
			const rootName = repoPath.split("/", 1)[0] as DataRoot;
			if (!dataRoots.includes(rootName)) fail(`manifest contains an invalid repo source path: ${file.repoPath}`);
			const expectedOrigin = join(sourceRoot, ...repoPath.split("/"));
			if (file.origin !== expectedOrigin || !inTree(sourceRoot, expectedOrigin)) fail(`manifest source escapes its repository: ${file.origin}`);
			expectedByTree.get(rootName)?.push({ path: repoPath.slice(rootName.length + 1), sha256: file.sha256, bytes: file.bytes });
		} else {
			const allowed = [manifest.casesFile, join(sourceRoot, ".qmd", "index.yml"), join(sourceRoot, ".qmd", "index.sqlite")];
			if (!allowed.includes(file.origin)) fail(`manifest contains an unrecognized external source: ${file.origin}`);
			if (externalSources.has(file.origin)) fail(`manifest repeats external source: ${file.origin}`);
			externalSources.set(file.origin, file);
		}
	}
	const originIdentities = new Set<string>();
	for (const rootName of dataRoots) {
		const sourceDirectory = join(sourceRoot, rootName);
		if (manifest.sourceTrees[rootName]) {
			const actual = await walkFiles(sourceDirectory, `source ${rootName}`, true);
			sameFiles(expectedByTree.get(rootName) ?? [], actual, `source ${rootName}`);
			for (const file of actual) originIdentities.add(`${file.dev}:${file.ino}`);
		} else {
			const actual = await walkFiles(sourceDirectory, `source ${rootName}`, false);
			const appeared = await lstat(sourceDirectory).then(() => true, (error: NodeJS.ErrnoException) => {
				if (error.code === "ENOENT") return false;
				throw error;
			});
			if (actual.length > 0 || appeared) fail(`source ${rootName} appeared after preparation`);
		}
	}
	for (const origin of [manifest.casesFile, join(sourceRoot, ".qmd", "index.yml"), join(sourceRoot, ".qmd", "index.sqlite")]) {
		const expected = externalSources.get(origin);
		if (!expected) fail(`manifest is missing external source hash: ${origin}`);
		await requireIndependentFile(origin, `recorded source`);
		const info = await lstat(origin);
		const digest = await digestFile(origin);
		if (digest.sha256 !== expected.sha256 || digest.bytes !== expected.bytes) fail(`source changed after preparation: ${origin}`);
		originIdentities.add(`${info.dev}:${info.ino}`);
	}
	if (externalSources.get(manifest.casesFile)?.sha256 !== manifest.caseFileSha256) fail("manifest cases-file hash does not match its source entry");
	const sourceCase = loadCases(manifest.casesFile).find((entry) => entry.id === manifest.caseId);
	if (!sourceCase || JSON.stringify(asEvalCase(sourceCase, manifest.caseId)) !== JSON.stringify(manifest.caseInput)) {
		fail(`manifest case input differs from the hashed case in ${manifest.casesFile}`);
	}
	return originIdentities;
}

/** Validate original source hashes, frozen baseline integrity, and workspace isolation. */
export async function verifyWorkspace(rootArgument: string): Promise<VerificationResult> {
	const { root, controlRoot, manifest } = await readManifest(rootArgument);
	const sourceRoot = resolve(manifest.sourceRoot);
	if (inTree(sourceRoot, root) || inTree(root, sourceRoot) || root === sourceRoot) fail(`eval World overlaps the source repository: ${root}`);
	const originIdentities = await compareSourceOrigins(manifest);
	const allWorkspaceFiles = await walkFiles(root, "eval World", true);
	if (await lstat(join(root, ".qmd")).then(() => true, (error: NodeJS.ErrnoException) => {
		if (error.code === "ENOENT") return false;
		throw error;
	})) fail(`eval World must not contain a .qmd directory: ${root}`);
	for (const file of allWorkspaceFiles) {
		if (originIdentities.has(`${file.dev}:${file.ino}`)) fail(`eval World shares an inode with a source original: ${file.path}`);
	}
	const baseline = join(controlRoot, "baseline");
	await assertDirectorySafe(baseline, "private frozen baseline");
	const baselineFiles = await walkFiles(baseline, "private frozen baseline", true);
	sameFiles(manifest.baselineFiles, baselineFiles, "frozen baseline");
	const worldInodes = new Set(allWorkspaceFiles.map((file) => `${file.dev}:${file.ino}`));
	for (const file of baselineFiles) {
		const identity = `${file.dev}:${file.ino}`;
		if (worldInodes.has(identity) || originIdentities.has(identity)) fail(`frozen baseline shares an inode with an eval World or source original: ${file.path}`);
	}
	const descriptor = runnerInputPath(root);
	const descriptorInfo = await lstat(descriptor);
	if (descriptorInfo.isSymbolicLink() || !descriptorInfo.isFile() || descriptorInfo.nlink !== 1 || (descriptorInfo.mode & 0o222) !== 0) {
		fail(`runner input must be an independent read-only regular file: ${descriptor}`);
	}
	return { ok: true, root, caseId: manifest.caseId };
}

function uniqueReplayFilename(token: string, index: number, originalName: string): string {
	const extension = extname(originalName);
	const stem = extension ? originalName.slice(0, -extension.length) : originalName;
	const prefix = `eval-${token}-${String(index + 1).padStart(2, "0")}-`;
	const room = 240 - prefix.length - extension.length;
	if (room < 1) fail(`raw source filename is too long to stage safely: ${originalName}`);
	return `${prefix}${stem.slice(0, room)}${extension}`;
}

async function stageRawSources(root: string, token: string, sources: LocalFile[]): Promise<ReplaySource[]> {
	const rawDirectory = join(root, "raw");
	await mkdir(rawDirectory, { recursive: true });
	const staged: ReplaySource[] = [];
	for (const [index, source] of sources.entries()) {
		const repoPath = source.relativePath;
		const rootName = repoPath.split("/", 1)[0] as DataRoot;
		const originalName = basename(repoPath);
		const fileName = uniqueReplayFilename(token, index, originalName);
		const scratchPath = join(rawDirectory, fileName);
		const archivePath = join(root, "archive", fileName);
		for (const collision of [scratchPath, archivePath]) {
			try {
				await access(collision);
				fail(`cannot stage raw source without a collision (${collision}); prepare a fresh snapshot`);
			} catch (error) {
				if (error instanceof PreparationError) throw error;
				if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
			}
		}
		const fromScratch = join(root, ...repoPath.split("/"));
		await copyFile(fromScratch, scratchPath, constants.COPYFILE_EXCL);
		const stagedDigest = await digestFile(scratchPath);
		if (stagedDigest.sha256 !== source.sha256 || stagedDigest.bytes !== source.bytes) fail(`staged raw source differs from its original: ${repoPath}`);
		if (rootName === "raw") await unlink(fromScratch);
		staged.push({
			origin: source.path,
			scratchPath: toPosix(relative(root, scratchPath)),
			archivePath: toPosix(relative(root, archivePath)),
			sha256: source.sha256,
		});
	}
	return staged;
}

/** Create a fresh workspace from a real case and immutable source trees. */
export async function prepareCase(casesFileArgument: string, caseId: string, options: PreparationOptions = {}): Promise<PreparedWorkspace> {
	if (!isAbsolute(casesFileArgument)) fail(`--cases requires an absolute path: ${casesFileArgument}`);
	if (!caseId) fail("--case requires a non-empty case id");
	const caseArgumentPath = resolve(casesFileArgument);
	const caseInfo = await lstat(caseArgumentPath).catch(() => fail(`cases file not found: ${caseArgumentPath}`));
	if (caseInfo.isSymbolicLink() || !caseInfo.isFile() || caseInfo.nlink !== 1) fail(`cases file must be an independent regular file: ${caseArgumentPath}`);
	const casesFile = await realpath(caseArgumentPath);
	const caseDigestBefore = await digestFile(casesFile);
	const cases = loadCases(casesFile);
	const selectedCase = cases.find((item) => item.id === caseId);
	if (!selectedCase) fail(`no case "${caseId}" in ${casesFile}; cases: ${cases.map((item) => item.id).join(", ")}`);
	const caseInput = asEvalCase(selectedCase, caseId);
	const repositoryRoot = options.repositoryRoot ?? repoRoot;
	if (!isAbsolute(repositoryRoot)) fail(`repository root must be an absolute path: ${repositoryRoot}`);
	const sourceRoot = await realpath(resolve(repositoryRoot)).catch(() => fail(`repository root not found: ${repositoryRoot}`));
	const sourceQmdDirectory = join(sourceRoot, ".qmd");
	const sourceQmdInfo = await lstat(sourceQmdDirectory).catch(() => fail(`PREPARATION: missing live QMD config directory: ${sourceQmdDirectory}`));
	if (sourceQmdInfo.isSymbolicLink() || !sourceQmdInfo.isDirectory()) fail(`source .qmd must be a real directory: ${sourceQmdDirectory}`);
	const sourceQmdConfig = join(sourceQmdDirectory, "index.yml");
	await requireIndependentFile(sourceQmdConfig, "live QMD config");
	const sourceQmdIndex = join(sourceQmdDirectory, "index.sqlite");
	await requireIndependentFile(sourceQmdIndex, "live QMD index");
	const qmdConfigDigest = await digestFile(sourceQmdConfig);
	const qmdIndexDigest = await digestFile(sourceQmdIndex);
	const sourceTrees = {} as Record<DataRoot, boolean>;
	const sourceFiles: SourceFile[] = [];
	const localTrees = new Map<DataRoot, LocalFile[]>();
	for (const rootName of dataRoots) {
		const path = join(sourceRoot, rootName);
		const tree = await walkFiles(path, `source ${rootName}`, rootName !== "raw");
		sourceTrees[rootName] = await lstat(path).then(() => true, (error: NodeJS.ErrnoException) => {
			if (error.code === "ENOENT") return false;
			throw error;
		});
		localTrees.set(rootName, tree);
		for (const file of tree) sourceFiles.push({
			origin: file.path,
			sha256: file.sha256,
			bytes: file.bytes,
			repoPath: `${rootName}/${file.relativePath}`,
		});
	}
	const wikiFiles = localTrees.get("wiki") ?? [];
	const repoFiles = [...(localTrees.get("raw") ?? []), ...(localTrees.get("archive") ?? [])].map((file) => {
		const rootName = dataRoots.find((name) => file.path === join(sourceRoot, name) || inTree(join(sourceRoot, name), file.path));
		return { ...file, relativePath: rootName ? `${rootName}/${file.relativePath}` : file.relativePath };
	});
	const validated = checkCaseSources(caseInput, wikiFiles, repoFiles, sourceRoot);
	const caseDigest = await digestFile(casesFile);
	if (caseDigest.sha256 !== caseDigestBefore.sha256) fail(`cases file changed while it was being read: ${casesFile}`);
	if (await digestFile(sourceQmdConfig).then((digest) => digest.sha256) !== qmdConfigDigest.sha256) fail(`source QMD config changed while it was being read: ${sourceQmdConfig}`);
	if (await digestFile(sourceQmdIndex).then((digest) => digest.sha256) !== qmdIndexDigest.sha256) fail(`live QMD index changed while it was being read: ${sourceQmdIndex}`);
	sourceFiles.push({ origin: casesFile, sha256: caseDigest.sha256, bytes: caseDigest.bytes });
	sourceFiles.push({ origin: sourceQmdConfig, sha256: qmdConfigDigest.sha256, bytes: qmdConfigDigest.bytes });
	sourceFiles.push({ origin: sourceQmdIndex, sha256: qmdIndexDigest.sha256, bytes: qmdIndexDigest.bytes });
	let sessionRoot: string;
	let standaloneSession = false;
	if (options.sessionRoot !== undefined) sessionRoot = await validateEvalSessionRoot(options.sessionRoot);
	else {
		const session = await createEvalSession({ sessionId: randomUUID(), pid: process.pid });
		sessionRoot = session.root;
		standaloneSession = true;
	}
	let allocated: Awaited<ReturnType<typeof allocateEvalRun>> | undefined;
	try {
		if (sessionRoot === sourceRoot || inTree(sourceRoot, sessionRoot) || inTree(sessionRoot, sourceRoot)) fail(`eval session root must be outside source repository: ${sessionRoot}`);
		allocated = await allocateEvalRun(sessionRoot);
		sessionRoot = evalRunFromWorld(allocated.worldRoot).sessionRoot;
		const { worldRoot, controlRoot } = allocated;
		for (const rootName of dataRoots) {
			const sourceDirectory = join(sourceRoot, rootName);
			if (sourceTrees[rootName]) await copyIndependent(sourceDirectory, join(worldRoot, rootName), `source ${rootName}`);
			else await mkdir(join(worldRoot, rootName));
		}
		await seedCallouts(worldRoot, caseInput);
		const replayRootName = randomUUID().replaceAll("-", "").slice(0, 10);
		const replaySources = await stageRawSources(worldRoot, replayRootName, validated.rawSources);
		const baseline = join(controlRoot, "baseline");
		await mkdir(baseline, { mode: 0o700 });
		for (const rootName of dataRoots) await copyIndependent(join(worldRoot, rootName), join(baseline, rootName), `baseline ${rootName}`);
		const baselineFiles = (await walkFiles(baseline, "frozen baseline", true)).map((file) => ({ path: file.relativePath, sha256: file.sha256, bytes: file.bytes }));
		const manifest: Manifest = {
			schemaVersion: 2,
			sessionRoot,
			workspaceRoot: worldRoot,
			sourceRoot,
			createdAt: new Date().toISOString(),
			caseId,
			casesFile,
			caseFileSha256: caseDigest.sha256,
			caseInput,
			sourceTrees,
			sourceFiles,
			replaySources,
			baselineFiles,
		};
		await writeFile(manifestPath(controlRoot), `${JSON.stringify(manifest, null, 2)}\n`, { flag: "wx", mode: 0o600 });
		await writeRunnerInput(worldRoot, manifest, validated.pages);
		await verifyWorkspace(worldRoot);
		return outputPaths(worldRoot, controlRoot, sessionRoot, manifest, sourceQmdIndex);
	} catch (error) {
		if (standaloneSession) await closeEvalSession(sessionRoot);
		else if (allocated) {
			await rm(allocated.worldRoot, { recursive: true, force: true });
			await rm(allocated.controlRoot, { recursive: true, force: true });
		}
		throw error;
	}
}

/** Create another independent workspace using only a prepared root's frozen input snapshot. */
export async function clonePreparedWorkspace(sourceRootArgument: string, options: Pick<PreparationOptions, "sessionRoot"> = {}): Promise<PreparedWorkspace> {
	const sourceRootArgumentResolved = resolve(sourceRootArgument);
	await verifyWorkspace(sourceRootArgument);
	const { root: sourceRoot, controlRoot: sourceControlRoot, manifest: original } = await readManifest(sourceRootArgumentResolved);
	const sourceBaseline = join(sourceControlRoot, "baseline");
	let sessionRoot: string;
	let standaloneSession = false;
	if (options.sessionRoot !== undefined) sessionRoot = await validateEvalSessionRoot(options.sessionRoot);
	else {
		const session = await createEvalSession({ sessionId: randomUUID(), pid: process.pid });
		sessionRoot = session.root;
		standaloneSession = true;
	}
	let allocated: Awaited<ReturnType<typeof allocateEvalRun>> | undefined;
	try {
		if (sessionRoot === original.sourceRoot || inTree(original.sourceRoot, sessionRoot) || inTree(sessionRoot, original.sourceRoot)) {
			fail(`eval session root must be outside source repository: ${sessionRoot}`);
		}
		allocated = await allocateEvalRun(sessionRoot);
		sessionRoot = evalRunFromWorld(allocated.worldRoot).sessionRoot;
		const { worldRoot, controlRoot } = allocated;
		for (const rootName of dataRoots) await copyIndependent(join(sourceBaseline, rootName), join(worldRoot, rootName), `cloned ${rootName}`);
		const baseline = join(controlRoot, "baseline");
		await copyIndependent(sourceBaseline, baseline, "cloned frozen baseline");
		const manifest: Manifest = {
			...original,
			schemaVersion: 2,
			sessionRoot,
			workspaceRoot: worldRoot,
			createdAt: new Date().toISOString(),
			clonedFrom: sourceRoot,
		};
		await writeFile(manifestPath(controlRoot), `${JSON.stringify(manifest, null, 2)}\n`, { flag: "wx", mode: 0o600 });
		const runnerInput = await writeRunnerInput(worldRoot, manifest, original.caseInput.source_pages);
		await verifyWorkspace(worldRoot);
		const qmdIndex = join(manifest.sourceRoot, ".qmd", "index.sqlite");
		const prepared = outputPaths(worldRoot, controlRoot, sessionRoot, manifest, qmdIndex);
		return { ...prepared, runnerInput };
	} catch (error) {
		if (standaloneSession) await closeEvalSession(sessionRoot);
		else if (allocated) {
			await rm(allocated.worldRoot, { recursive: true, force: true });
			await rm(allocated.controlRoot, { recursive: true, force: true });
		}
		throw error;
	}
}

function buildCommand(): Command {
	const command = new Command("eval:prepare")
		.description("Prepare, clone, verify, and manage Session-scoped skill-eval workspaces.")
		.option("--cases <absolute-file>", "absolute skill cases.yaml path (preparation mode)")
		.option("--case <id>", "active case id (preparation mode)")
		.option("--from <prepared-root>", "clone a frozen prepared snapshot into a new independent workspace")
		.option("--verify <world-root>", "verify source hashes, frozen baseline, and workspace isolation")
		.option("--session-root <root>", "reuse an open Session workspace (prepare/clone only)")
		.option("--session-start", "create a Session-scoped temporary workspace root")
		.option("--session-close <root>", "close and remove a validated Session workspace root")
		.option("--reap-stale", "select and optionally remove stale eval Session roots")
		.option("--older-than-hours <number>", "minimum age for marked stale roots (default: 24)")
		.option("--include-legacy", "include unmarked roots at least 24 hours old")
		.option("--dry-run", "show eligible roots without removing them")
		.option("--yes", "confirm stale-root removal")
		.addHelpText("after", `

${PREPARE_EXAMPLES}

Preparation and clone read the live project QMD index without updating it. Each run
has independent Wiki/Raw/Archive copies and a private control record under sessionRoot.
Use --session-root to keep related runs and evidence in one Session lifetime.

Exit codes: 0 success; 2 invalid usage, unsafe/missing sources, or failed verification.
`)
		.action(async (options: {
			cases?: string;
			case?: string;
			from?: string;
			verify?: string;
			sessionRoot?: string;
			sessionStart?: boolean;
			sessionClose?: string;
			reapStale?: boolean;
			olderThanHours?: string;
			includeLegacy?: boolean;
			dryRun?: boolean;
			yes?: boolean;
		}) => {
			try {
				if (!options.reapStale && (options.olderThanHours !== undefined || options.includeLegacy || options.dryRun || options.yes)) {
					fail("--older-than-hours, --include-legacy, --dry-run, and --yes require --reap-stale");
				}
				const lifecycleModes = Number(Boolean(options.sessionStart)) + Number(options.sessionClose !== undefined) + Number(Boolean(options.reapStale));
				const preparationModes = Number(options.verify !== undefined) + Number(options.from !== undefined) + Number(options.cases !== undefined || options.case !== undefined);
				if (lifecycleModes + preparationModes !== 1) fail("choose exactly one lifecycle mode (--session-start, --session-close, --reap-stale) or preparation mode (--cases with --case, --from, --verify)");
				if (lifecycleModes > 0 && (options.sessionRoot !== undefined || options.cases !== undefined || options.case !== undefined || options.from !== undefined || options.verify !== undefined)) {
					fail("Session lifecycle modes cannot be combined with preparation, clone, verify, or --session-root");
				}
				if (options.sessionStart) {
					const session = await createEvalSession({ sessionId: randomUUID(), pid: process.pid });
					process.stdout.write(`${JSON.stringify(session)}\n`);
					return;
				}
				if (options.sessionClose !== undefined) {
					const root = await realpath(options.sessionClose).catch(() => resolve(options.sessionClose as string));
					await closeEvalSession(options.sessionClose);
					process.stdout.write(`${JSON.stringify({ closed: root })}\n`);
					return;
				}
				if (options.reapStale) {
					const ageArgument = options.olderThanHours ?? "24";
					const hours = Number(ageArgument);
					const olderThanMs = hours * 60 * 60 * 1000;
					if (ageArgument.trim() === "" || !Number.isFinite(hours) || hours < 0 || !Number.isFinite(olderThanMs)) {
						fail("--older-than-hours must be a finite nonnegative number");
					}
					if (!options.dryRun && !options.yes) fail("--yes is required to remove stale roots; use --dry-run to preview");
					const result = await reapEvalSessions({
						olderThanMs,
						dryRun: Boolean(options.dryRun),
						includeLegacy: Boolean(options.includeLegacy),
					});
					process.stdout.write(`${JSON.stringify(result)}\n`);
					return;
				}
				if (options.sessionRoot !== undefined && options.verify !== undefined) fail("--session-root can be used only with preparation or clone, not --verify");
				if (options.sessionRoot !== undefined && options.from === undefined && options.cases === undefined && options.case === undefined) fail("--session-root requires --cases with --case or --from");
				if (options.sessionRoot !== undefined && !isAbsolute(options.sessionRoot)) fail(`--session-root must be absolute: ${options.sessionRoot}`);
				if (options.verify !== undefined) {
					if (options.cases !== undefined || options.case !== undefined || options.from !== undefined) fail("--verify cannot be combined with --cases, --case, or --from");
					process.stdout.write(`${JSON.stringify(await verifyWorkspace(options.verify))}\n`);
					return;
				}
				if (options.from !== undefined) {
					if (options.cases !== undefined || options.case !== undefined) fail("--from cannot be combined with --cases or --case");
					const prepared = await clonePreparedWorkspace(options.from, options.sessionRoot === undefined ? {} : { sessionRoot: options.sessionRoot });
					process.stdout.write(`${JSON.stringify(prepared)}\n`);
					return;
				}
				if (!options.cases || !options.case) fail("preparation requires both --cases <absolute-file> and --case <id>");
				const prepared = await prepareCase(options.cases, options.case, {
					...(options.sessionRoot === undefined ? {} : { sessionRoot: options.sessionRoot }),
				});
				process.stdout.write(`${JSON.stringify(prepared)}\n`);
			} catch (error) {
				process.stderr.write(`Error: ${(error as Error).message}\n\n${PREPARE_EXAMPLES}\n`);
				process.exitCode = 2;
			}
		});
	return command;
}

async function main(): Promise<void> {
	const command = buildCommand().exitOverride().showHelpAfterError("(run with --help for examples)");
	try {
		await command.parseAsync(process.argv);
	} catch (error) {
		if (error instanceof CommanderError) process.exitCode = error.exitCode === 0 ? 0 : 2;
		else throw error;
	}
}

if (import.meta.main) void main();
