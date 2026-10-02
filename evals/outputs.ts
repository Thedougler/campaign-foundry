import { lstatSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { lstat, mkdir, readFile, realpath, unlink, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

export interface RunnerOutput {
	pages: Map<string, string>;
	deleted: string[];
	reply: string;
}

/** Canonical Wiki-relative path; case checks may omit the Markdown extension. */
export function wikiPagePath(path: string): string {
	if (!path || path.trim() !== path || /[\\:\u0000-\u001f\u007f]/u.test(path)
		|| path.startsWith("/") || path.startsWith("wiki/")
		|| path.split("/").some((part) => !part || part === "." || part === "..")) {
		throw new Error(`EXECUTION: unsafe Wiki-relative page path: ${JSON.stringify(path)}`);
	}
	return path.endsWith(".md") ? path : `${path}.md`;
}

/** Runner writes use explicit Markdown paths, optionally prefixed with wiki/. */
export function outputPagePath(input: unknown, allowReply = false): string {
	if (typeof input !== "string") throw new Error("EXECUTION: output path must be text");
	const path = input.replace(/^wiki\//u, "");
	const canonical = wikiPagePath(path);
	if (!path.endsWith(".md")) throw new Error("EXECUTION: output path must end in .md");
	if (!allowReply && canonical === "reply.md") throw new Error("EXECUTION: reply.md is reserved for the DM reply");
	return canonical;
}

function deletionPaths(text: string): string[] {
	const value: unknown = JSON.parse(text);
	if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) throw new Error("EXECUTION: invalid output deletion manifest");
	const paths = value.map((item) => outputPagePath(item));
	if (new Set(paths).size !== paths.length) throw new Error("EXECUTION: duplicate output deletion path");
	return paths;
}

/** Read only independent regular files beneath one canonical output directory. */
export function readRunnerOutput(outputRoot: string): RunnerOutput {
	const root = resolve(outputRoot);
	const rootInfo = lstatSync(root);
	if (!rootInfo.isDirectory() || rootInfo.isSymbolicLink() || realpathSync(root) !== root) throw new Error("EXECUTION: output root must be a canonical real directory");
	const pages = new Map<string, string>();
	let reply: string | undefined;
	let deleted: string[] = [];
	const visit = (directory: string, prefix: string): void => {
		for (const entry of readdirSync(directory, { withFileTypes: true })) {
			const path = join(directory, entry.name);
			const name = prefix ? `${prefix}/${entry.name}` : entry.name;
			const info = lstatSync(path);
			if (info.isSymbolicLink()) throw new Error(`EXECUTION: output symlinks are unavailable: ${name}`);
			if (info.isDirectory()) {
				// Validate directory components without inventing a deliverable.
				wikiPagePath(`${name}/page.md`);
				visit(path, name);
			} else {
				if (!info.isFile() || info.nlink !== 1) throw new Error(`EXECUTION: output must be an independent regular file: ${name}`);
				const text = readFileSync(path, "utf8");
				if (name === ".deleted.json") deleted = deletionPaths(text);
				else if (name === "reply.md") reply = text;
				else {
					const canonical = outputPagePath(name);
					if (canonical !== name || pages.has(canonical)) throw new Error(`EXECUTION: duplicate or noncanonical output page: ${name}`);
					pages.set(canonical, text);
				}
			}
		}
	};
	visit(root, "");
	if (reply === undefined) throw new Error("EXECUTION: Runner output is missing reply.md");
	return { pages, deleted, reply };
}

/** Check each path component before creating or modifying anything below outputRoot. */
async function outputTarget(outputRoot: string, path: string): Promise<string> {
	const parts = path.split("/");
	let directory = outputRoot;
	const rootInfo = await lstat(directory);
	if (rootInfo.isSymbolicLink() || !rootInfo.isDirectory() || await realpath(directory) !== directory) throw new Error("EXECUTION: output root must be a canonical real directory");
	for (const part of parts.slice(0, -1)) {
		directory = join(directory, part);
		await mkdir(directory, { mode: 0o700 }).catch((error: NodeJS.ErrnoException) => { if (error.code !== "EEXIST") throw error; });
		const info = await lstat(directory);
		if (info.isSymbolicLink() || !info.isDirectory()) throw new Error("EXECUTION: output parent must be a real directory");
	}
	const target = join(outputRoot, path);
	const info = await lstat(target).catch((error: NodeJS.ErrnoException) => { if (error.code !== "ENOENT") throw error; return undefined; });
	if (info && (!info.isFile() || info.isSymbolicLink() || info.nlink !== 1)) throw new Error("EXECUTION: output target must be an independent regular file");
	return target;
}

async function readDeletions(outputRoot: string): Promise<string[]> {
	const path = await outputTarget(outputRoot, ".deleted.json");
	try { return deletionPaths(await readFile(path, "utf8")); }
	catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; }
}

/** Callers serialize mutations per run so page writes and deletions have last-write semantics. */
export async function writeRunnerOutput(outputRoot: string, path: string, content: string): Promise<void> {
	path = outputPagePath(path, true);
	const target = await outputTarget(outputRoot, path);
	const deleted = await readDeletions(outputRoot);
	await writeFile(target, content, { mode: 0o600 });
	if (deleted.includes(path)) await writeFile(join(outputRoot, ".deleted.json"), `${JSON.stringify(deleted.filter((item) => item !== path))}\n`, { mode: 0o600 });
}

export async function deleteRunnerPage(outputRoot: string, path: string): Promise<void> {
	path = outputPagePath(path);
	const target = await outputTarget(outputRoot, path);
	const deleted = await readDeletions(outputRoot);
	await unlink(target).catch((error: NodeJS.ErrnoException) => { if (error.code !== "ENOENT") throw error; });
	if (!deleted.includes(path)) deleted.push(path);
	await writeFile(join(outputRoot, ".deleted.json"), `${JSON.stringify(deleted)}\n`, { mode: 0o600 });
}
