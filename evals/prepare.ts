#!/usr/bin/env node
/** Prepare independent, provenance-tracked workspaces for active skill evals.
 *
 *   bun run eval:prepare --cases /absolute/path/cases.yaml --case <id>
 *   bun run eval:prepare --from <prepared-root>
 *   bun run eval:prepare --verify <scratch-root>
 */
import { createHash, randomUUID } from "node:crypto";
import { constants, createReadStream } from "node:fs";
import { access, copyFile, cp, lstat, mkdir, mkdtemp, readFile, readdir, realpath, rm, unlink, writeFile } from "node:fs/promises";
import { Command, CommanderError } from "commander";
import { basename, dirname, extname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { loadCases } from "./check.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workspacePrefix = "campaign-foundry-eval-";
const dataRoots = ["wiki", "raw", "archive"] as const;
type DataRoot = (typeof dataRoots)[number];

type EvalCase = Record<string, unknown> & {
	id: string;
	prompt: string;
	source_pages: string[];
	raw_sources?: string[];
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
	schemaVersion: 1;
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

export interface PreparedWorkspace {
	root: string;
	wiki: string;
	raw: string;
	archive: string;
	baseline: string;
	manifest: string;
	caseId: string;
	case: EvalCase;
}

export interface PreparationOptions {
	repositoryRoot?: string;
	scratchParent?: string;
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
	throw new PreparationError(message);
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

function buildIsolatedQmdConfig(sourceText: string): string {
	const sourceConfig: unknown = YAML.parse(sourceText);
	const configRecord = isRecord(sourceConfig) ? sourceConfig : {};
	const sourceCollections = isRecord(configRecord.collections) ? configRecord.collections : {};
	const collections = Object.fromEntries(dataRoots.map((name) => {
		const sourceCollection = isRecord(sourceCollections[name]) ? sourceCollections[name] : {};
		const collection: Record<string, unknown> = { path: name };
		for (const key of ["pattern", "ignore", "includeByDefault", "context"] as const) {
			if (sourceCollection[key] !== undefined) collection[key] = sourceCollection[key];
		}
		return [name, collection];
	}));
	const safeConfig: Record<string, unknown> = { collections };
	if (typeof configRecord.global_context === "string") safeConfig.global_context = configRecord.global_context;
	if (isRecord(configRecord.models)) safeConfig.models = configRecord.models;
	return YAML.stringify(safeConfig);
}

async function writeIsolatedQmdConfig(root: string, configText: string): Promise<void> {
	const qmd = join(root, ".qmd");
	await mkdir(qmd, { recursive: true });
	await writeFile(join(qmd, "index.yml"), configText, { flag: "wx" });
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
	const input: EvalCase = {
		...value,
		id: value.id,
		prompt: value.prompt,
		source_pages: sourcePages,
		...(rawSources === undefined ? {} : { raw_sources: rawSources }),
	};
	validateRegexes(input);
	return input;
}

function checkCaseSources(caseInput: EvalCase, wikiFiles: LocalFile[], repoFiles: LocalFile[], sourceRoot: string): { pages: string[]; rawSources: LocalFile[] } {
	const pages = caseInput.source_pages.map((page) => safeRelativePath(page, `case "${caseInput.id}" source_pages`));
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

async function createScratchRoot(parentArgument: string | undefined, protectedRoots: string[]): Promise<string> {
	const requestedParent = parentArgument ?? tmpdir();
	if (!isAbsolute(requestedParent)) fail(`scratch parent must be an absolute directory: ${requestedParent}`);
	const parent = await realpath(resolve(requestedParent)).catch(() => fail(`scratch parent directory not found: ${requestedParent}`));
	await assertDirectorySafe(parent, "scratch parent");
	if (protectedRoots.some((protectedRoot) => parent === protectedRoot || inTree(protectedRoot, parent))) {
		fail(`scratch parent must be outside protected source data: ${parent}`);
	}
	const created = await mkdtemp(join(parent, workspacePrefix));
	const root = await realpath(created);
	if (protectedRoots.some((protectedRoot) => root === protectedRoot || inTree(protectedRoot, root) || inTree(root, protectedRoot))) {
		await rm(root, { recursive: true, force: true });
		fail(`generated scratch root overlaps protected source data: ${root}`);
	}
	return root;
}

function manifestPath(root: string): string {
	return join(root, ".eval", "manifest.json");
}

function outputPaths(root: string, manifest: Manifest): PreparedWorkspace {
	return {
		root,
		wiki: join(root, "wiki"),
		raw: join(root, "raw"),
		archive: join(root, "archive"),
		baseline: join(root, ".eval", "baseline", "wiki"),
		manifest: manifestPath(root),
		caseId: manifest.caseId,
		case: manifest.caseInput,
	};
}

function sameFiles(expected: Array<{ path: string; sha256: string; bytes: number }>, actual: LocalFile[], label: string): void {
	if (expected.length !== actual.length) fail(`${label} file set changed (expected ${expected.length}, found ${actual.length})`);
	const byPath = new Map(actual.map((file) => [file.relativePath, file]));
	for (const file of expected) {
		const found = byPath.get(file.path);
		if (!found || found.sha256 !== file.sha256 || found.bytes !== file.bytes) fail(`${label} changed: ${file.path}`);
	}
}

async function readManifest(rootArgument: string): Promise<{ root: string; manifest: Manifest }> {
	const root = resolve(rootArgument);
	await assertDirectorySafe(root, "scratch root");
	if (await realpath(root) !== root) fail(`scratch root must not resolve through a symlink: ${root}`);
	const evalDirectory = join(root, ".eval");
	await assertDirectorySafe(evalDirectory, "scratch .eval directory");
	const manifestFile = manifestPath(root);
	const info = await lstat(manifestFile);
	if (info.isSymbolicLink() || !info.isFile() || info.nlink !== 1) fail(`manifest must be an independent regular file: ${manifestFile}`);
	let parsed: unknown;
	try {
		parsed = JSON.parse(await readFile(manifestFile, "utf8"));
	} catch (error) {
		fail(`could not read preparation manifest ${manifestFile}: ${(error as Error).message}`);
	}
	if (!isRecord(parsed)
		|| parsed.schemaVersion !== 1
		|| typeof parsed.workspaceRoot !== "string"
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
	if (!isAbsolute(parsed.workspaceRoot) || !isAbsolute(parsed.sourceRoot) || !isAbsolute(parsed.casesFile)
		|| parsed.caseInput.id !== parsed.caseId
		|| dataRoots.some((name) => typeof sourceTrees[name] !== "boolean")
		|| !parsed.sourceFiles.every((file) => isRecord(file) && typeof file.origin === "string" && typeof file.sha256 === "string" && typeof file.bytes === "number" && Number.isSafeInteger(file.bytes) && (file.repoPath === undefined || typeof file.repoPath === "string"))
		|| !parsed.baselineFiles.every((file) => isRecord(file) && typeof file.path === "string" && typeof file.sha256 === "string" && typeof file.bytes === "number" && Number.isSafeInteger(file.bytes))
		|| !parsed.replaySources.every((source) => isRecord(source) && typeof source.origin === "string" && typeof source.scratchPath === "string" && typeof source.archivePath === "string" && typeof source.sha256 === "string")) {
		fail(`preparation manifest contains invalid fields: ${manifestFile}`);
	}
	if (resolve(parsed.workspaceRoot) !== root) fail(`manifest belongs to ${parsed.workspaceRoot}, not ${root}`);
	const caseInput = asEvalCase(parsed.caseInput, parsed.caseId);
	// These runtime guards validate the format-versioned JSON boundary before the typed manifest is used.
	const manifest = parsed as unknown as Manifest;
	return { root, manifest: { ...manifest, caseInput } };
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
			if (file.origin !== manifest.casesFile && file.origin !== join(sourceRoot, ".qmd", "index.yml")) {
				fail(`manifest contains an unrecognized external source: ${file.origin}`);
			}
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
	const qmdConfig = join(sourceRoot, ".qmd", "index.yml");
	for (const origin of [manifest.casesFile, qmdConfig]) {
		const expected = externalSources.get(origin);
		if (!expected) fail(`manifest is missing external source hash: ${origin}`);
		const info = await lstat(origin).catch(() => fail(`recorded source is missing: ${origin}`));
		if (info.isSymbolicLink() || !info.isFile() || info.nlink !== 1) fail(`recorded source is no longer an independent regular file: ${origin}`);
		if (await realpath(origin) !== origin) fail(`recorded source now resolves through a symlink: ${origin}`);
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
	const { root, manifest } = await readManifest(rootArgument);
	const sourceRoot = resolve(manifest.sourceRoot);
	if (inTree(sourceRoot, root) || inTree(root, sourceRoot) || root === sourceRoot) fail(`scratch workspace overlaps the source repository: ${root}`);
	const originIdentities = await compareSourceOrigins(manifest);
	const allWorkspaceFiles = await walkFiles(root, "scratch workspace", true);
	for (const file of allWorkspaceFiles) {
		if (originIdentities.has(`${file.dev}:${file.ino}`)) fail(`scratch workspace shares an inode with a source original: ${file.path}`);
	}
	const baselinePrefix = ".eval/baseline/";
	const baselineFiles = allWorkspaceFiles.filter((file) => file.relativePath.startsWith(baselinePrefix)).map((file) => ({
		...file,
		relativePath: file.relativePath.slice(baselinePrefix.length),
	}));
	sameFiles(manifest.baselineFiles, baselineFiles, "frozen baseline");
	const expectedQmdConfig = manifest.baselineFiles.find((file) => file.path === ".qmd/index.yml");
	if (!expectedQmdConfig) fail("frozen baseline is missing .qmd/index.yml");
	const liveQmdConfig = allWorkspaceFiles.find((file) => file.relativePath === ".qmd/index.yml");
	if (!liveQmdConfig || liveQmdConfig.sha256 !== expectedQmdConfig.sha256 || liveQmdConfig.bytes !== expectedQmdConfig.bytes) {
		fail("scratch .qmd/index.yml changed from its isolated frozen config");
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
	const sourceQmdInfo = await lstat(sourceQmdDirectory);
	if (sourceQmdInfo.isSymbolicLink() || !sourceQmdInfo.isDirectory()) fail(`source .qmd must be a real directory: ${sourceQmdDirectory}`);
	const sourceQmdConfig = join(sourceQmdDirectory, "index.yml");
	const sourceQmdConfigInfo = await lstat(sourceQmdConfig);
	if (sourceQmdConfigInfo.isSymbolicLink() || !sourceQmdConfigInfo.isFile() || sourceQmdConfigInfo.nlink !== 1) fail(`source QMD config must be an independent regular file: ${sourceQmdConfig}`);
	if (await realpath(sourceQmdConfig) !== sourceQmdConfig) fail(`source QMD config must not resolve through a symlink: ${sourceQmdConfig}`);
	const sourceQmdText = await readFile(sourceQmdConfig, "utf8");
	const qmdConfigText = buildIsolatedQmdConfig(sourceQmdText);
	const qmdConfigDigest = await digestFile(sourceQmdConfig);
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
	if (createHash("sha256").update(sourceQmdText).digest("hex") !== qmdConfigDigest.sha256) fail(`source QMD config changed while it was being read: ${sourceQmdConfig}`);
	sourceFiles.push({ origin: casesFile, sha256: caseDigest.sha256, bytes: caseDigest.bytes });
	sourceFiles.push({ origin: sourceQmdConfig, sha256: qmdConfigDigest.sha256, bytes: qmdConfigDigest.bytes });
	const replayRootName = randomUUID().replaceAll("-", "").slice(0, 10);
	const canonicalRoot = await createScratchRoot(options.scratchParent, [sourceRoot]);
	try {
		for (const rootName of dataRoots) {
			const sourceDirectory = join(sourceRoot, rootName);
			if (sourceTrees[rootName]) await copyIndependent(sourceDirectory, join(canonicalRoot, rootName), `source ${rootName}`);
			else await mkdir(join(canonicalRoot, rootName));
		}
		await writeIsolatedQmdConfig(canonicalRoot, qmdConfigText);
		const replaySources = await stageRawSources(canonicalRoot, replayRootName, validated.rawSources);
		const evalDirectory = join(canonicalRoot, ".eval");
		await mkdir(evalDirectory);
		const baseline = join(evalDirectory, "baseline");
		await mkdir(baseline);
		for (const rootName of dataRoots) await copyIndependent(join(canonicalRoot, rootName), join(baseline, rootName), `baseline ${rootName}`);
		await copyIndependent(join(canonicalRoot, ".qmd"), join(baseline, ".qmd"), "baseline QMD config");
		const baselineFiles = (await walkFiles(baseline, "frozen baseline", true)).map((file) => ({ path: file.relativePath, sha256: file.sha256, bytes: file.bytes }));
		const manifest: Manifest = {
			schemaVersion: 1,
			workspaceRoot: canonicalRoot,
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
		await writeFile(manifestPath(canonicalRoot), `${JSON.stringify(manifest, null, 2)}\n`, { flag: "wx" });
		await verifyWorkspace(canonicalRoot);
		return outputPaths(canonicalRoot, manifest);
	} catch (error) {
		await rm(canonicalRoot, { recursive: true, force: true });
		throw error;
	}
}

/** Create another independent workspace using only a prepared root's frozen input snapshot. */
export async function clonePreparedWorkspace(sourceRootArgument: string, options: Pick<PreparationOptions, "scratchParent"> = {}): Promise<PreparedWorkspace> {
	const sourceRootArgumentResolved = resolve(sourceRootArgument);
	await verifyWorkspace(sourceRootArgumentResolved);
	const { root: sourceRoot, manifest: original } = await readManifest(sourceRootArgumentResolved);
	const sourceBaseline = join(sourceRoot, ".eval", "baseline");
	const root = await createScratchRoot(options.scratchParent, [sourceRoot, original.sourceRoot]);
	try {
		for (const rootName of dataRoots) await copyIndependent(join(sourceBaseline, rootName), join(root, rootName), `cloned ${rootName}`);
		await copyIndependent(join(sourceBaseline, ".qmd"), join(root, ".qmd"), "cloned QMD config");
		const evalDirectory = join(root, ".eval");
		await mkdir(evalDirectory);
		await copyIndependent(sourceBaseline, join(evalDirectory, "baseline"), "cloned frozen baseline");
		const manifest: Manifest = {
			...original,
			workspaceRoot: root,
			createdAt: new Date().toISOString(),
			clonedFrom: sourceRoot,
		};
		await writeFile(manifestPath(root), `${JSON.stringify(manifest, null, 2)}\n`, { flag: "wx" });
		await verifyWorkspace(root);
		return outputPaths(root, manifest);
	} catch (error) {
		await rm(root, { recursive: true, force: true });
		throw error;
	}
}

function buildCommand(): Command {
	const command = new Command("eval:prepare")
		.description("Prepare, clone, or verify an isolated real-source skill-eval workspace.")
		.option("--cases <absolute-file>", "absolute skill cases.yaml path (preparation mode)")
		.option("--case <id>", "active case id (preparation mode)")
		.option("--from <prepared-root>", "clone a frozen prepared snapshot into a new independent workspace")
		.option("--verify <scratch-root>", "verify source hashes, frozen baseline, and workspace isolation")
		.addHelpText("after", `
Examples:
  bun run eval:prepare --cases "$PWD/.agents/skills/audit/evals/cases.yaml" --case named-claim
  bun run eval:prepare --from "$PREPARED_ROOT"
  bun run eval:prepare --verify "$SCRATCH_ROOT"

Preparation and clone modes print one JSON object with absolute root, wiki, raw, archive,
baseline, manifest, caseId, and case fields. Each preparation creates a fresh scratch root.
For a paired run, prepare once and invoke --from twice; both clones use the same frozen baseline.

Exit codes: 0 success; 2 invalid usage, unsafe/missing sources, or failed verification.
`)
		.action(async (options: { cases?: string; case?: string; from?: string; verify?: string }) => {
			try {
				const modes = Number(options.verify !== undefined) + Number(options.from !== undefined) + Number(options.cases !== undefined || options.case !== undefined);
				if (modes !== 1) fail("choose exactly one mode: --cases with --case, --from, or --verify");
				if (options.verify !== undefined) {
					if (options.cases !== undefined || options.case !== undefined) fail("--verify cannot be combined with --cases or --case");
					process.stdout.write(`${JSON.stringify(await verifyWorkspace(options.verify))}\n`);
					return;
				}
				if (options.from !== undefined) {
					if (options.cases !== undefined || options.case !== undefined) fail("--from cannot be combined with --cases or --case");
					process.stdout.write(`${JSON.stringify(await clonePreparedWorkspace(options.from))}\n`);
					return;
				}
				if (!options.cases || !options.case) fail("preparation requires both --cases <absolute-file> and --case <id>");
				process.stdout.write(`${JSON.stringify(await prepareCase(options.cases, options.case))}\n`);
			} catch (error) {
				process.stderr.write(`Error: ${(error as Error).message}\n\nExamples:\n  bun run eval:prepare --cases "$PWD/.agents/skills/audit/evals/cases.yaml" --case named-claim\n  bun run eval:prepare --from "$PREPARED_ROOT"\n  bun run eval:prepare --verify "$SCRATCH_ROOT"\n`);
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
