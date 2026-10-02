import type { Stats } from "node:fs";
import { chmod, lstat, readFile, realpath, readdir, writeFile } from "node:fs/promises";
import { execFile as execFileCallback } from "node:child_process";
import { lookup } from "node:dns/promises";
import { request as httpsRequest } from "node:https";
import { Readable } from "node:stream";
import { checkServerIdentity } from "node:tls";
import { randomBytes } from "node:crypto";
import { isIP } from "node:net";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import YAML from "./yaml.ts";
import { evalRunPaths, validateEvalSessionRoot } from "./workspaces.ts";
import { deleteRunnerPage, outputPagePath, writeRunnerOutput } from "./outputs.ts";

const evaluatorTreeNames: Record<string, true> = {
	evals: true, answers: true, answer: true, graders: true, grader: true,
	grades: true, snapshots: true, ".snapshots": true,
};
const protectedFileName = /(?:^|[._-])(?:answers?|grader|grades?|rubric)(?:[._-]|$)/iu;
const MAX_READ_BYTES = 5 * 1024 * 1024;
const MAX_RESULT_LINES = 200;
const ROOT_COLLECTIONS = ["wiki", "raw", "archive"] as const;

const CAPABILITIES = ["read", "grep", "glob", "find", "qmd_query", "qmd_get", "write", "delete_page", "https_get", "web_search"];

type Collection = (typeof ROOT_COLLECTIONS)[number];
type JsonSchema = Record<string, unknown>;
type ToolHandler = (input: Record<string, unknown>) => Promise<unknown>;
export type RunnerToolRegistrar = (handler: ToolHandler, options: { name: string; description: string; parameters: JsonSchema }) => unknown;

export interface RunnerPreparedRun {
	repositoryRoot: string;
	sessionRoot: string;
	runId: string;
	caseId: string;
	case: { prompt: string; source_pages?: string[]; raw_sources?: string[] };
	qmd: { mode: "live-read-only"; index: string };
}

export interface RunnerToolOptions {
	targetSkillRoot: string;
	skillRoot?: string;
	network?: { https: boolean; search: boolean };
}

export interface Grant {
	schemaVersion: 1;
	token: string;
	capabilityNames: string[];
	sessionRoot: string;
	runId: string;
	controlRoot: string;
	outputRoot: string;
	repositoryRoot: string;
	targetSkillRoot: string;
	targetSkillName: string;
	skillRoot?: string;
	network: { https: boolean; search: boolean };
}

interface SafeTarget {
	path: string;
	root: string;
	info?: Stats;
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
	const checked = allowedSkillRoot && isInside(allowedSkillRoot, resolve(path)) ? relative(allowedSkillRoot, resolve(path)) : resolve(path);
	for (const part of checked.split(sep).filter(Boolean)) {
		if (Object.hasOwn(evaluatorTreeNames, part.toLowerCase()) || protectedFileName.test(part)) rejectPath();
	}
}

async function realDirectory(path: string, label: string): Promise<string> {
	const resolved = resolve(path);
	const info = await lstat(resolved);
	if (info.isSymbolicLink() || !info.isDirectory()) throw new Error(`${label} must be a canonical real directory`);
	return await realpath(resolved);
}

async function realSkillDirectory(path: string, label: string): Promise<string> {
	const root = await realDirectory(path, label);
	assertNoEvaluatorTree(root);
	const entry = await assertNoLinksFrom(root, join(root, "SKILL.md"));
	if (!entry.isFile()) throw new Error(`${label} must contain a regular SKILL.md`);
	return root;
}

async function assertNoLinksFrom(root: string, target: string): Promise<Stats> {
	if (!isInside(root, target)) rejectPath();
	const rel = relative(root, target);
	const parts = rel === "" ? [] : rel.split(sep);
	let current = root;
	let info = await lstat(root);
	if (info.isSymbolicLink() || !info.isDirectory()) rejectPath();
	for (let index = 0; index < parts.length; index++) {
		current = join(current, parts[index]!);
		info = await lstat(current);
		if (info.isSymbolicLink()) rejectPath("Symbolic links are not available to Runner capabilities");
		if (index < parts.length - 1 && !info.isDirectory()) rejectPath();
	}
	if (info.isFile() && info.nlink !== 1) rejectPath("Hard-linked files are not available to Runner capabilities");
	if (!info.isFile() && !info.isDirectory()) rejectPath("Special files are not available to Runner capabilities");
	return info;
}

function allowedRoots(grant: Grant): string[] {
	return [
		...ROOT_COLLECTIONS.map((collection) => join(grant.repositoryRoot, collection)),
		grant.outputRoot,
		...(grant.skillRoot ? [grant.skillRoot] : []),
	].sort((a, b) => b.length - a.length);
}

function resolveSkillUri(input: string, grant: Grant): string {
	const match = input.match(/^skill:\/\/([^/]+)(?:\/(.*))?$/u);
	if (!match || match[1] !== grant.targetSkillName || !grant.skillRoot) rejectPath("Only the assigned skill is available");
	let path: string;
	try { path = decodeURIComponent(match[2] ?? "") || "SKILL.md"; } catch { rejectPath(); }
	assertSafePathText(path);
	if (isAbsolute(path)) rejectPath();
	return join(grant.skillRoot, path);
}

async function resolveTarget(input: unknown, grant: Grant, expectDirectory = false): Promise<SafeTarget> {
	if (typeof input !== "string") rejectPath();
	let requested = input;
	if (requested.startsWith("skill://")) requested = resolveSkillUri(requested, grant);
	else assertSafePathText(requested);
	const absolute = resolve(grant.repositoryRoot, requested);
	assertNoEvaluatorTree(absolute, grant.skillRoot);
	// Even a snapshot/no-skill run excludes the live candidate.
	if (grant.skillRoot !== grant.targetSkillRoot && isInside(grant.targetSkillRoot, absolute)) rejectPath();
	const root = allowedRoots(grant).find((candidate) => isInside(candidate, absolute));
	if (!root) rejectPath();
	const info = await assertNoLinksFrom(root, absolute);
	if (!info) rejectPath("The requested source does not exist");
	if (expectDirectory ? !info.isDirectory() : !info.isFile()) rejectPath("The requested path has the wrong file type");
	return { path: absolute, root, info };
}

function relativePosix(root: string, path: string): string {
	return relative(root, path).split(sep).join("/");
}

function globRegex(pattern: string): RegExp {
	const escaped = pattern.replace(/[.+^${}()|[\]\\]/gu, "\\$&").replaceAll("**", "\u0000").replaceAll("*", "[^/]*").replaceAll("?", "[^/]").replaceAll("\u0000", ".*");
	return new RegExp(`^${escaped}$`, "u");
}

async function listFiles(root: string, grant: Grant): Promise<string[]> {
	const rootTarget = await resolveTarget(root, grant, true);
	const files: string[] = [];
	const visit = async (directory: string): Promise<void> => {
		for (const entry of await readdir(directory, { withFileTypes: true })) {
			const path = join(directory, entry.name);
			try {
				assertNoEvaluatorTree(path, grant.skillRoot);
				const target = await resolveTarget(path, grant, entry.isDirectory());
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


async function validateLiveQmd(prepared: RunnerPreparedRun): Promise<{ repositoryRoot: string; qmdEnv: NodeJS.ProcessEnv }> {
	if (prepared.qmd?.mode !== "live-read-only" || typeof prepared.qmd.index !== "string" || !isAbsolute(prepared.qmd.index)) {
		throw new Error("Runner preparation must provide the existing live-read-only QMD index");
	}
	const indexPath = resolve(prepared.qmd.index);
	if (basename(dirname(indexPath)) !== ".qmd" || basename(indexPath) !== "index.sqlite") throw new Error("The QMD index must be the real project's .qmd/index.sqlite");
	const indexInfo = await lstat(indexPath);
	if (indexInfo.isSymbolicLink() || !indexInfo.isFile() || indexInfo.nlink !== 1) throw new Error("The existing QMD index must be an independent regular file");
	const index = await realpath(indexPath);
	const repositoryRoot = await realDirectory(dirname(dirname(index)), "QMD repository root");
	if (repositoryRoot !== await realDirectory(prepared.repositoryRoot, "Runner live repository")) throw new Error("QMD must use the assigned live repository");
	if (isPrivateControlPath(repositoryRoot)) throw new Error("The existing QMD index cannot be inside private evaluation storage");
	const qmdDirectory = join(repositoryRoot, ".qmd");
	const qmdDirectoryInfo = await lstat(qmdDirectory);
	if (qmdDirectoryInfo.isSymbolicLink() || !qmdDirectoryInfo.isDirectory()) throw new Error("The live QMD .qmd directory must be a real project directory");
	await assertNoLinksFrom(repositoryRoot, index);
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
	const controlRoot = parsed.controlRoot;
	const outputRoot = parsed.outputRoot;
	const repositoryRoot = parsed.repositoryRoot;
	const targetSkillRoot = parsed.targetSkillRoot;
	const targetSkillName = parsed.targetSkillName;
	const skillRoot = parsed.skillRoot;
	const network = parsed.network;
	if (parsed.schemaVersion !== 1 || parsed.token !== token || !Array.isArray(capabilities)
		|| !capabilities.every((name: unknown): name is string => typeof name === "string" && /^cf_eval_[a-f0-9]{16}_[a-z_]+$/u.test(name) && CAPABILITIES.some((suffix) => name.endsWith(`_${suffix}`)))
		|| typeof sessionRoot !== "string" || !isAbsolute(sessionRoot) || typeof runId !== "string"
		|| typeof controlRoot !== "string" || !isAbsolute(controlRoot)
		|| typeof outputRoot !== "string" || !isAbsolute(outputRoot)
		|| typeof repositoryRoot !== "string" || !isAbsolute(repositoryRoot) || typeof targetSkillRoot !== "string" || !isAbsolute(targetSkillRoot)
		|| typeof targetSkillName !== "string" || (skillRoot !== undefined && (typeof skillRoot !== "string" || !isAbsolute(skillRoot)))
		|| !record(network) || typeof network.https !== "boolean" || typeof network.search !== "boolean") {
		throw new Error("Runner grant has an invalid private record");
	}
	if (await validateEvalSessionRoot(sessionRoot) !== sessionRoot
		|| evalRunPaths(sessionRoot, runId).controlRoot !== controlRoot
		|| evalRunPaths(sessionRoot, runId).outputRoot !== outputRoot
		|| resolve(grantPath) !== join(controlRoot, "runner-grant.json")) throw new Error("Runner grant does not match its validated private control layout");
	await realDirectory(controlRoot, "Runner private control root");
	if (await realDirectory(outputRoot, "Runner output root") !== outputRoot) throw new Error("Runner output root is not canonical");
	if (await realDirectory(repositoryRoot, "Runner live repository") !== repositoryRoot) throw new Error("Runner live repository root is not canonical");
	if (await realSkillDirectory(targetSkillRoot, "Target skill root") !== targetSkillRoot || basename(targetSkillRoot) !== targetSkillName) throw new Error("Runner grant has an invalid target skill identity");
	if (typeof skillRoot === "string") {
		if (await realSkillDirectory(skillRoot, "Assigned skill snapshot") !== skillRoot) throw new Error("Assigned skill snapshot is not canonical");
	}
	return {
		schemaVersion: 1,
		token,
		capabilityNames: capabilities,
		sessionRoot,
		runId,
		controlRoot,
		outputRoot,
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

async function qmdSource(livePath: string, repositoryRoot: string, grant: Grant): Promise<{ liveSource: string; path: string }> {
	await resolveTarget(livePath, grant);
	const source = isCanonicalSourcePath(livePath, repositoryRoot);
	if (!source) rejectPath("QMD retrieval is limited to live Wiki, Raw, and Archive sources");
	return { liveSource: `${source.collection}/${source.relative}`, path: livePath };
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
	prepared: RunnerPreparedRun,
	options: RunnerToolOptions,
	register: RunnerToolRegistrar,
): Promise<{ token: string; toolNames: string[]; runnerBrief: string }> {
	const sessionRoot = await validateEvalSessionRoot(prepared.sessionRoot);
	const { controlRoot, outputRoot } = evalRunPaths(sessionRoot, prepared.runId);
	await realDirectory(controlRoot, "Runner private control root");
	if (await realDirectory(outputRoot, "Runner output root") !== outputRoot) throw new Error("Runner output root is not canonical");
	const { repositoryRoot, qmdEnv } = await validateLiveQmd(prepared);
	if (typeof prepared.case?.prompt !== "string" || !prepared.case.prompt.length) throw new Error("Prepared case is missing its natural DM request");
	const targetSkillRoot = await realSkillDirectory(resolve(options.targetSkillRoot), "Target skill root");
	const targetSkillName = basename(targetSkillRoot);
	let skillRoot: string | undefined;
	if (options.skillRoot !== undefined) skillRoot = await realSkillDirectory(resolve(options.skillRoot), "Assigned skill snapshot");
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
		sessionRoot,
		runId: prepared.runId,
		controlRoot,
		outputRoot,
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
	// Mutations are serial per run so deletion manifests and draft writes cannot race.
	let mutation: Promise<unknown> = Promise.resolve();
	const mutate = (operation: () => Promise<void>): Promise<unknown> => {
		const next = mutation.then(operation);
		mutation = next.catch(() => undefined);
		return next;
	};
	const outputPath = stringSchema("Wiki-relative .md page path (optional wiki/ prefix), or reply.md for the DM reply");
	bind("write", "Write a complete page or DM reply only into this run's output directory.", schema({ path: outputPath, content: stringSchema("Complete UTF-8 file text") }, ["path", "content"]), async (input) => {
		const path = outputPagePath(input.path, true);
		assertNoEvaluatorTree(join(outputRoot, path));
		if (typeof input.content !== "string") throw new Error("Output content must be text");
		const content = input.content;
		await mutate(() => writeRunnerOutput(outputRoot, path, content));
		return { path: join(outputRoot, path) };
	});
	bind("delete_page", "Record a Wiki page removal in this run's output directory.", schema({ path: outputPath }, ["path"]), async (input) => {
		const path = outputPagePath(input.path);
		assertNoEvaluatorTree(join(outputRoot, path));
		await mutate(() => deleteRunnerPage(outputRoot, path));
		return { deleted: path };
	});
	const filePath = stringSchema("A live repository-relative source path, assigned skill path, or absolute path under this run's output directory");
	bind("read", "Read a live Wiki, Raw, Archive, template, assigned skill file, or this run's output draft.", schema({ path: filePath, startLine: { type: "integer", minimum: 1 }, lineCount: { type: "integer", minimum: 1, maximum: 2000 } }, ["path"]), async (input) => {
		const startLine = boundedInteger(input, "startLine", 1, 1, Number.MAX_SAFE_INTEGER);
		const lineCount = boundedInteger(input, "lineCount", 400, 1, 2000);
		const target = await resolveTarget(input.path, grant);
		return await readTextFile(target, startLine, lineCount);
	});
	bind("grep", "Find literal text under a granted live or output directory.", schema({ query: stringSchema("Literal case-insensitive text"), path: stringSchema("Optional granted directory; defaults to wiki/"), limit: { type: "integer", minimum: 1, maximum: MAX_RESULT_LINES } }, ["query"]), async (input) => {
		if (typeof input.query !== "string" || !input.query) throw new Error("grep query must be nonempty text");
		if (input.path !== undefined && typeof input.path !== "string") throw new Error("grep path must be text");
		const root = typeof input.path === "string" ? input.path : join(repositoryRoot, "wiki");
		const limit = boundedInteger(input, "limit", MAX_RESULT_LINES, 1, MAX_RESULT_LINES);
		const files = await listFiles(root, grant);
		const matches: Array<{ path: string; line: number; text: string }> = [];
		for (const path of files) {
			const target = await resolveTarget(path, grant);
			if (!target.info || target.info.size > MAX_READ_BYTES) continue;
			const lines = (await readFile(path, "utf8")).split(/\r?\n/u);
			for (let index = 0; index < lines.length; index++) {
				if (lines[index]!.toLocaleLowerCase().includes(input.query.toLocaleLowerCase())) matches.push({ path, line: index + 1, text: lines[index]! });
				if (matches.length >= limit) return matches;
			}
		}
		return matches;
	});
	bind("glob", "List granted live and output files matching a relative glob pattern.", schema({ pattern: stringSchema("Glob relative to the search directory"), path: stringSchema("Optional granted directory; defaults to wiki/"), limit: { type: "integer", minimum: 1, maximum: 1000 } }, ["pattern"]), async (input) => {
		if (typeof input.pattern !== "string" || !input.pattern) throw new Error("glob pattern must be nonempty text");
		assertSafePathText(input.pattern);
		if (input.path !== undefined && typeof input.path !== "string") throw new Error("glob path must be text");
		const rootPath = typeof input.path === "string" ? input.path : join(repositoryRoot, "wiki");
		const rootTarget = await resolveTarget(rootPath, grant, true);
		const matcher = globRegex(input.pattern);
		const files = await listFiles(rootTarget.path, grant);
		const limit = boundedInteger(input, "limit", 200, 1, 1000);
		return files.filter((path) => matcher.test(relativePosix(rootTarget.path, path))).slice(0, limit).map((path) => ({ path, relative: relativePosix(rootTarget.path, path) }));
	});
	bind("find", "Find granted live and output files by filename.", schema({ query: stringSchema("Case-insensitive filename fragment"), path: stringSchema("Optional granted directory; defaults to wiki/"), limit: { type: "integer", minimum: 1, maximum: 1000 } }, ["query"]), async (input) => {
		if (typeof input.query !== "string" || !input.query) throw new Error("find query must be nonempty text");
		if (input.path !== undefined && typeof input.path !== "string") throw new Error("find path must be text");
		const rootPath = typeof input.path === "string" ? input.path : join(repositoryRoot, "wiki");
		const rootTarget = await resolveTarget(rootPath, grant, true);
		const files = await listFiles(rootTarget.path, grant);
		const query = input.query.toLocaleLowerCase();
		const limit = boundedInteger(input, "limit", 200, 1, 1000);
		return files.filter((path) => basename(path).toLocaleLowerCase().includes(query)).slice(0, limit).map((path) => ({ path, relative: relativePosix(rootTarget.path, path) }));
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
		if (result.exitCode !== 0) throw new Error(`QMD query failed: ${result.stderr || result.error || result.exitCode}`);
		const jsonStart = result.stdout.indexOf("[");
		const jsonEnd = result.stdout.lastIndexOf("]");
		if (jsonStart < 0 || jsonEnd < jsonStart) throw new Error("QMD returned no JSON results");
		const hits: unknown = JSON.parse(result.stdout.slice(jsonStart, jsonEnd + 1));
		if (!Array.isArray(hits)) throw new Error("QMD results must be a list");
		const results = [];
		for (const hit of hits) {
			if (!record(hit) || typeof hit.file !== "string") continue;
			try {
				const sourcePair = await qmdSource(qmdRefToLivePath(hit.file, repositoryRoot), repositoryRoot, grant);
				results.push({ ...hit, ...sourcePair });
			} catch {
				// Omit protected results and their snippets; never return unfiltered stdout.
			}
		}
		return { exitCode: 0, results };
	});
	bind("qmd_get", "Retrieve one document from the existing live Wiki, Raw, or Archive QMD index by document ID or source path.", schema({ reference: stringSchema("QMD document ID, qmd://wiki|raw|archive path, or live repo collection path") }, ["reference"]), async (input) => {
		if (typeof input.reference !== "string") throw new Error("QMD reference must be text");
		const source = qmdRefToLivePath(input.reference, repositoryRoot);
		if (!source.startsWith("#")) await qmdSource(source, repositoryRoot, grant);
		const args = ["get", source, "--full-path", "--line-numbers"];
		for (const collection of ROOT_COLLECTIONS) args.push("-c", collection);
		const result = await runExecFile("qmd", args, repositoryRoot, qmdEnv);
		if (result.exitCode !== 0) throw new Error(`QMD get failed: ${result.stderr || result.error || result.exitCode}`);
		const firstLine = result.stdout.split(/\r?\n/u, 1)[0] ?? "";
		const printedPath = firstLine.startsWith("./") ? resolve(repositoryRoot, firstLine.slice(2)) : firstLine;
		const sourcePath = input.reference.startsWith("#") ? printedPath : source;
		const sourcePair = await qmdSource(sourcePath, repositoryRoot, grant);
		const target = await resolveTarget(sourcePair.path, grant);
		if (!target.info || target.info.size > MAX_READ_BYTES) throw new Error("QMD source exceeds the Runner read limit");
		return { exitCode: 0, ...sourcePair, content: await readFile(target.path, "utf8") };
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
	const startHere = [
		...(prepared.case.source_pages ?? []).map((path) => `wiki/${path.endsWith(".md") ? path : `${path}.md`}`),
		...(prepared.case.raw_sources ?? []),
	];
	const runnerBrief = `Eval grant: ${grantPath} ${token}\n\nLive repository: ${repositoryRoot}\nOutput directory: ${outputRoot}\nUse write for complete Wiki-relative .md pages and reply.md; use delete_page for page removals. Read your drafts using their absolute output paths.\nStart-here sources:\n${startHere.map((path) => `- ${path}`).join("\n")}\n\nDM request (verbatim):\n${prepared.case.prompt}`;
	return { token, toolNames, runnerBrief };
}
