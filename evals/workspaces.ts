import { randomUUID } from "node:crypto";
import { lstat, mkdir, mkdtemp, readFile, readdir, realpath, rm, writeFile } from "node:fs/promises";
import { realpathSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const SESSION_PREFIX = "campaign-foundry-eval-";
const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SESSION_MARKER = ".session.json";
const MIN_LEGACY_AGE_MS = 24 * 60 * 60 * 1000;

interface SessionMarker {
	schemaVersion: 1;
	root: string;
	sessionId: string;
	pid: number;
	createdAt: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function inside(root: string, candidate: string): boolean {
	const path = relative(root, candidate);
	return path === "" || (path !== ".." && !path.startsWith(`..${sep}`) && !isAbsolute(path));
}

function canonicalTmpdir(): string {
	return realpathSync(tmpdir());
}

function assertSessionPath(root: string, tempRoot: string, repoRoot: string): void {
	if (dirname(root) !== tempRoot || !basename(root).startsWith(SESSION_PREFIX)) {
		throw new Error(`eval session root must be an immediate ${SESSION_PREFIX}* child of ${tempRoot}: ${root}`);
	}
	if (inside(repoRoot, root) || inside(root, repoRoot)) throw new Error(`eval session root must be outside the repository: ${root}`);
}

async function canonicalRootArgument(rootArgument: string, allowMissing: boolean): Promise<{ root: string; exists: boolean }> {
	if (typeof rootArgument !== "string" || !isAbsolute(rootArgument)) throw new Error(`eval session root must be an absolute path: ${rootArgument}`);
	if (rootArgument.split(sep).includes("..")) throw new Error(`eval session root must not contain traversal components: ${rootArgument}`);
	const lexicalRoot = resolve(rootArgument);
	const tempRoot = await realpath(tmpdir());
	const repoRoot = await realpath(REPO_ROOT);
	let rootInfo;
	try {
		rootInfo = await lstat(lexicalRoot);
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code !== "ENOENT" || !allowMissing) throw error;
		const parent = await realpath(dirname(lexicalRoot));
		const root = join(parent, basename(lexicalRoot));
		assertSessionPath(root, tempRoot, repoRoot);
		return { root, exists: false };
	}
	if (rootInfo.isSymbolicLink() || !rootInfo.isDirectory()) throw new Error(`eval session root must be a real directory, not a symlink or special file: ${lexicalRoot}`);
	const root = await realpath(lexicalRoot);
	assertSessionPath(root, tempRoot, repoRoot);
	return { root, exists: true };
}

async function readMarker(root: string): Promise<SessionMarker> {
	const markerPath = join(root, SESSION_MARKER);
	const markerInfo = await lstat(markerPath).catch((error: NodeJS.ErrnoException) => {
		if (error.code === "ENOENT") throw Object.assign(new Error(`eval session marker is missing: ${markerPath}`), { code: "ENOENT" });
		throw error;
	});
	if (markerInfo.isSymbolicLink() || !markerInfo.isFile() || markerInfo.nlink !== 1) {
		throw new Error(`eval session marker must be an independent regular file: ${markerPath}`);
	}
	let value: unknown;
	try {
		value = JSON.parse(await readFile(markerPath, "utf8"));
	} catch (error) {
		throw new Error(`invalid eval session marker ${markerPath}: ${(error as Error).message}`);
	}
	if (!isRecord(value)
		|| value.schemaVersion !== 1
		|| value.root !== root
		|| typeof value.sessionId !== "string"
		|| value.sessionId.trim() === ""
		|| typeof value.pid !== "number"
		|| !Number.isSafeInteger(value.pid)
		|| value.pid <= 0
		|| typeof value.createdAt !== "string"
		|| !Number.isFinite(Date.parse(value.createdAt))
		|| new Date(value.createdAt).toISOString() !== value.createdAt) {
		throw new Error(`invalid eval session ownership record: ${markerPath}`);
	}
	return value as unknown as SessionMarker;
}

async function validateSession(rootArgument: string): Promise<{ root: string; marker: SessionMarker }> {
	const resolved = await canonicalRootArgument(rootArgument, false);
	if (!resolved.exists) throw new Error(`eval session root does not exist: ${resolved.root}`);
	return { root: resolved.root, marker: await readMarker(resolved.root) };
}

/** Validate and return the canonical path for an open eval Session. */
export async function validateEvalSessionRoot(rootArgument: string): Promise<string> {
	return (await validateSession(rootArgument)).root;
}

async function ensureRealDirectory(path: string): Promise<void> {
	await mkdir(path, { recursive: true, mode: 0o700 });
	const info = await lstat(path);
	if (info.isSymbolicLink() || !info.isDirectory() || await realpath(path) !== path) {
		throw new Error(`eval session layout directory must be real and canonical: ${path}`);
	}
}

/** Open a private, OS-temp Session root owned by the creating process. */
export async function createEvalSession(owner: { sessionId: string; pid: number }): Promise<{ root: string }> {
	if (typeof owner.sessionId !== "string" || owner.sessionId.trim() === "") throw new Error("eval session owner requires a non-empty sessionId");
	if (!Number.isSafeInteger(owner.pid) || owner.pid <= 0) throw new Error("eval session owner requires a positive integer pid");
	const tempRoot = await realpath(tmpdir());
	const repoRoot = await realpath(REPO_ROOT);
	const created = await mkdtemp(join(tempRoot, SESSION_PREFIX));
	const root = await realpath(created);
	try {
		assertSessionPath(root, tempRoot, repoRoot);
		for (const name of ["control", "audit", "outputs"]) await ensureRealDirectory(join(root, name));
		const marker: SessionMarker = {
			schemaVersion: 1,
			root,
			sessionId: owner.sessionId,
			pid: owner.pid,
			createdAt: new Date().toISOString(),
		};
		await writeFile(join(root, SESSION_MARKER), `${JSON.stringify(marker, null, 2)}\n`, { flag: "wx", mode: 0o600 });
		return { root };
	} catch (error) {
		await rm(root, { recursive: true, force: true });
		throw error;
	}
}

/** Close only a validated session root; an already-removed safe root is idempotent. */
export async function closeEvalSession(rootArgument: string): Promise<void> {
	const resolved = await canonicalRootArgument(rootArgument, true);
	if (!resolved.exists) return;
	await readMarker(resolved.root);
	await rm(resolved.root, { recursive: true, force: true });
}

/** Layout roots beneath an existing canonical eval session. */
export function evalSessionLayout(sessionRoot: string): { control: string; audit: string; outputs: string } {
	if (!isAbsolute(sessionRoot)) throw new Error(`eval session root must be absolute: ${sessionRoot}`);
	if (sessionRoot.split(sep).includes("..")) throw new Error(`eval session root must not contain traversal components: ${sessionRoot}`);
	const root = resolve(sessionRoot);
	let canonical: string;
	try {
		canonical = realpathSync(root);
	} catch {
		throw new Error(`eval session root does not exist: ${root}`);
	}
	const tempRoot = canonicalTmpdir();
	const repoRoot = realpathSync(REPO_ROOT);
	assertSessionPath(canonical, tempRoot, repoRoot);
	if (canonical !== root) throw new Error(`eval session root must be canonical: ${root}`);
	return {
		control: join(canonical, "control"),
		audit: join(canonical, "audit"),
		outputs: join(canonical, "outputs"),
	};
}

/** Resolve one run's private evaluator artifacts and scoped deliverable directory. */
export function evalRunPaths(sessionRoot: string, runId: string): { controlRoot: string; outputRoot: string } {
	if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/u.test(runId)) throw new Error(`unsafe eval run ID: ${runId}`);
	const layout = evalSessionLayout(sessionRoot);
	return { controlRoot: join(layout.control, runId), outputRoot: join(layout.outputs, runId) };
}

/** Allocate private control storage and deliverables for one live read-only run. */
export async function allocateEvalRun(sessionRootArgument: string): Promise<{ runId: string; controlRoot: string; outputRoot: string }> {
	const { root: sessionRoot } = await validateSession(sessionRootArgument);
	const runId = randomUUID().replaceAll("-", "");
	const paths = evalRunPaths(sessionRoot, runId);
	await mkdir(paths.controlRoot, { mode: 0o700 });
	await mkdir(paths.outputRoot, { mode: 0o700 });
	return { runId, ...paths };
}

function pidState(pid: number): "dead" | "live" | "uncertain" {
	try {
		process.kill(pid, 0);
		return "live";
	} catch (error) {
		const code = (error as NodeJS.ErrnoException).code;
		if (code === "ESRCH") return "dead";
		if (code === "EPERM") return "uncertain";
		return "uncertain";
	}
}

/** Remove only stale direct children of the canonical OS temp directory. */
export async function reapEvalSessions(options: {
	olderThanMs: number;
	dryRun: boolean;
	includeLegacy: boolean;
}): Promise<{ selected: string[]; removed: string[] }> {
	if (!Number.isFinite(options.olderThanMs) || options.olderThanMs < 0) throw new Error("olderThanMs must be a finite nonnegative number");
	const tempRoot = await realpath(tmpdir());
	const repoRoot = await realpath(REPO_ROOT);
	const now = Date.now();
	const selected: string[] = [];
	const removed: string[] = [];
	for (const name of await readdir(tempRoot)) {
		if (!name.startsWith(SESSION_PREFIX)) continue;
		const path = join(tempRoot, name);
		let info;
		try {
			info = await lstat(path);
		} catch {
			continue;
		}
		if (info.isSymbolicLink() || !info.isDirectory()) continue;
		let canonical: string;
		try {
			canonical = await realpath(path);
		} catch {
			continue;
		}
		try {
			assertSessionPath(canonical, tempRoot, repoRoot);
		} catch {
			continue;
		}
		let marker: SessionMarker | undefined;
		try {
			marker = await readMarker(canonical);
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code !== "ENOENT" || !options.includeLegacy) continue;
			if (now - info.mtimeMs < Math.max(options.olderThanMs, MIN_LEGACY_AGE_MS)) continue;
		}
		if (marker && (pidState(marker.pid) !== "dead" || now - Date.parse(marker.createdAt) < options.olderThanMs)) continue;
		selected.push(canonical);
		if (!options.dryRun) {
			try {
				const currentInfo = await lstat(canonical);
				if (currentInfo.isSymbolicLink() || !currentInfo.isDirectory() || await realpath(canonical) !== canonical) continue;
				if (marker) {
					const current = await readMarker(canonical);
					if (current.sessionId !== marker.sessionId || current.pid !== marker.pid || current.createdAt !== marker.createdAt
						|| pidState(current.pid) !== "dead" || now - Date.parse(current.createdAt) < options.olderThanMs) continue;
				} else {
					try {
						await lstat(join(canonical, SESSION_MARKER));
						continue;
					} catch (error) {
						if ((error as NodeJS.ErrnoException).code !== "ENOENT") continue;
					}
					if (now - currentInfo.mtimeMs < Math.max(options.olderThanMs, MIN_LEGACY_AGE_MS)) continue;
				}
				await rm(canonical, { recursive: true, force: true });
				removed.push(canonical);
			} catch {
				// Races or filesystem errors retain the remaining directory for a later safe reap.
			}
		}
	}
	return { selected, removed };
}
