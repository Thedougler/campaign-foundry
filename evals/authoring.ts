// SPDX-License-Identifier: Apache-2.0
// Adapted from Anthropic's skills/skill-creator validation and packaging
// helpers: https://github.com/anthropics/skills/tree/main/skills/skill-creator
// Modified for native omp frontmatter, streaming ZIP packaging and TypeScript.
// License: https://www.apache.org/licenses/LICENSE-2.0

import { createWriteStream } from "node:fs";
import { lstat, mkdir, mkdtemp, readFile, readdir, rename, rm, stat } from "node:fs/promises";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import type { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { ZipFile } from "yazl";
import { parse } from "yaml";
import { UsageError } from "../src/check/errors.ts";

export interface SkillValidation {
	skillDir: string;
	skillFile: string;
	name: string;
	description: string;
	frontmatter: Record<string, unknown>;
}

export interface SkillPackage {
	skillDir: string;
	name: string;
	output: string;
	files: string[];
	excluded: string[];
}

function errorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

/** Validate native omp metadata without constraining extension-specific keys. */
export async function validateSkill(skillDirectory: string): Promise<SkillValidation> {
	const skillDir = resolve(skillDirectory);
	const skillFile = join(skillDir, "SKILL.md");
	const hint = `Fix ${skillFile}, then run cf eval validate ${JSON.stringify(skillDir)}.`;
	let content: string;
	try {
		if (!(await stat(skillDir)).isDirectory()) {
			throw new UsageError(`Skill path is not a directory: ${skillDir}`, "Pass the directory containing SKILL.md, not the file itself.");
		}
		content = await readFile(skillFile, "utf8");
	} catch (error) {
		if (error instanceof UsageError) throw error;
		throw new UsageError(`Cannot read skill ${skillDir}: ${errorMessage(error)}`, "Pass an existing, readable skill directory containing SKILL.md. Example: cf eval validate .omp/skills/skill-creator");
	}
	const match = /^\uFEFF?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(content);
	if (!match) {
		throw new UsageError(`Missing or incomplete YAML frontmatter in ${skillFile}.`, `Start SKILL.md with a --- delimited YAML mapping containing name and description. ${hint}`);
	}
	let parsed: unknown;
	try {
		parsed = parse(match[1]!);
	} catch (error) {
		throw new UsageError(`Invalid YAML frontmatter in ${skillFile}: ${errorMessage(error)}`, hint);
	}
	if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
		throw new UsageError(`Frontmatter in ${skillFile} must be a YAML mapping.`, hint);
	}
	const frontmatter = parsed as Record<string, unknown>;
	const { name, description } = frontmatter;
	if (typeof name !== "string" || name.trim().length === 0) {
		throw new UsageError(`Frontmatter name in ${skillFile} must be a nonempty string.`, `Set name: ${JSON.stringify(basename(skillDir))}. ${hint}`);
	}
	if (name !== basename(skillDir)) {
		throw new UsageError(`Frontmatter name ${JSON.stringify(name)} does not match directory ${JSON.stringify(basename(skillDir))}.`, `Set name: ${JSON.stringify(basename(skillDir))}, or rename the skill directory to match. ${hint}`);
	}
	if (typeof description !== "string" || description.trim().length === 0) {
		throw new UsageError(`Frontmatter description in ${skillFile} must be a nonempty string.`, `Describe when the skill should be invoked. ${hint}`);
	}
	for (const key of ["hide", "alwaysApply", "disableModelInvocation", "disable-model-invocation", "user-invocable"]) {
		if (key in frontmatter && typeof frontmatter[key] !== "boolean") {
			throw new UsageError(`Frontmatter ${key} in ${skillFile} must be a boolean.`, `Use ${key}: true or ${key}: false (without quotes), or remove the optional field. ${hint}`);
		}
	}
	if ("argument-hint" in frontmatter && typeof frontmatter["argument-hint"] !== "string") {
		throw new UsageError(`Frontmatter argument-hint in ${skillFile} must be a string.`, hint);
	}
	if ("globs" in frontmatter && (!Array.isArray(frontmatter.globs) || frontmatter.globs.some((glob) => typeof glob !== "string"))) {
		throw new UsageError(`Frontmatter globs in ${skillFile} must be an array of strings.`, hint);
	}
	const breaks = await brokenSkillReferences(skillDir, skillFile, content);
	if (breaks.length > 0) {
		const listed = breaks.map((brk) => `  ${brk.file}:${brk.line}: [${brk.text}](${brk.destination}) — ${brk.reason}`).join("\n");
		throw new UsageError(`Broken references in ${skillDir}:\n${listed}`, `Repair each listed link (fix the target path or the heading it names), then run cf eval validate ${JSON.stringify(skillDir)}.`);
	}
	return { skillDir, skillFile, name, description, frontmatter };
}

interface MarkdownLink {
	line: number;
	text: string;
	destination: string;
}

interface ReferenceBreak {
	file: string;
	line: number;
	text: string;
	destination: string;
	reason: string;
}

/** GitHub's heading anchor rule: lowercase, drop punctuation except hyphens and spaces, spaces become hyphens. */
function headingSlug(heading: string): string {
	return heading.toLowerCase().trim().replace(/[^\p{L}\p{N} -]/gu, "").replace(/ /g, "-");
}

/** Visit each line outside fenced code blocks with its 1-based line number, tracking fence delimiters. */
function forEachVisibleLine(content: string, visit: (line: string, index: number) => void): void {
	let fence: { character: string; length: number } | undefined;
	for (const [index, line] of content.split("\n").entries()) {
		const marker = /^ {0,3}(`{3,}|~{3,})/.exec(line);
		if (marker) {
			const character = marker[1]![0]!;
			if (fence === undefined) fence = { character, length: marker[1]!.length };
			else if (fence.character === character && marker[1]!.length >= fence.length) fence = undefined;
			continue;
		}
		if (fence === undefined) visit(line, index);
	}
}

/** Heading anchors a Markdown file answers to; repeated headings get GitHub's -1, -2 suffixes. */
export function headingAnchors(content: string): Set<string> {
	const counts = new Map<string, number>();
	forEachVisibleLine(content, (line) => {
		const heading = /^ {0,3}#{1,6}[ \t]+(.+?)[ \t]*#*[ \t]*$/.exec(line);
		if (!heading) return;
		const base = headingSlug(heading[1]!);
		if (base === "") return;
		counts.set(base, (counts.get(base) ?? 0) + 1);
	});
	return new Set([...counts].flatMap(([base, count]) => Array.from({ length: count }, (_, seen) => (seen === 0 ? base : `${base}-${seen}`))));
}

const INLINE_CODE = /`+[^`]*`+/g;
const MARKDOWN_LINK = /\[([^\]\n]*)\]\([ \t]*(<[^<>]*>|[^)\s]+)(?:[ \t]+(?:"[^"]*"|'[^']*'))?[ \t]*\)/g;
const NON_RELATIVE = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/** Inline links and images on visible lines with inline code spans blanked out. */
function markdownLinks(content: string): MarkdownLink[] {
	const links: MarkdownLink[] = [];
	forEachVisibleLine(content, (line, index) => {
		for (const match of line.replace(INLINE_CODE, " ").matchAll(MARKDOWN_LINK)) {
			links.push({ line: index + 1, text: match[1]!, destination: match[2]!.replace(/^<|>$/g, "") });
		}
	});
	return links;
}

function decodedPath(rawPath: string): string {
	if (!rawPath.includes("%")) return rawPath;
	try {
		return decodeURIComponent(rawPath);
	} catch {
		return rawPath;
	}
}

/**
 * Broken relative references in SKILL.md and the skill-local Markdown files it links to (one
 * level, no further): a path that resolves to nothing, or a Markdown anchor no heading slugs to.
 */
async function brokenSkillReferences(skillDir: string, skillFile: string, skillContent: string): Promise<ReferenceBreak[]> {
	const breaks: ReferenceBreak[] = [];
	const anchorCache = new Map<string, Promise<Set<string>>>();
	const anchorsOf = (path: string): Promise<Set<string>> => {
		let anchors = anchorCache.get(path);
		if (anchors === undefined) {
			anchors = readFile(path, "utf8").then(headingAnchors);
			anchorCache.set(path, anchors);
		}
		return anchors;
	};
	const check = async (sourcePath: string, display: string, link: MarkdownLink): Promise<void> => {
		const destination = link.destination;
		if (destination === "" || NON_RELATIVE.test(destination)) return;
		const hash = destination.indexOf("#");
		const anchor = hash === -1 ? undefined : destination.slice(hash + 1);
		const rawPath = hash === -1 ? destination : destination.slice(0, hash);
		const target = rawPath === "" ? sourcePath : resolve(dirname(sourcePath), decodedPath(rawPath));
		let info;
		try {
			info = await stat(target);
		} catch {
			breaks.push({ file: display, line: link.line, text: link.text, destination, reason: "target does not exist" });
			return;
		}
		if (anchor === undefined || anchor === "" || !info.isFile() || !/\.md$/i.test(target)) return;
		if (!(await anchorsOf(target)).has(anchor)) {
			breaks.push({ file: display, line: link.line, text: link.text, destination, reason: `no heading slugs to #${anchor}` });
		}
	};
	const scan = async (sourcePath: string, display: string, content: string): Promise<void> => {
		for (const link of markdownLinks(content)) await check(sourcePath, display, link);
	};
	const sources = new Map<string, string>();
	anchorCache.set(skillFile, Promise.resolve(headingAnchors(skillContent)));
	for (const link of markdownLinks(skillContent)) {
		if (link.destination === "" || NON_RELATIVE.test(link.destination)) continue;
		const hash = link.destination.indexOf("#");
		const target = resolve(dirname(skillFile), decodedPath(hash === -1 ? link.destination : link.destination.slice(0, hash)));
		if (target === skillFile) continue;
		if (!/\.md$/i.test(target) || !(target === skillDir || target.startsWith(skillDir + sep))) continue;
		try {
			if (!(await stat(target)).isFile()) continue;
		} catch {
			continue;
		}
		if (!sources.has(target)) sources.set(target, relative(skillDir, target).split(sep).join("/"));
	}
	await scan(skillFile, "SKILL.md", skillContent);
	for (const [path, display] of sources) await scan(path, display, await readFile(path, "utf8"));
	return breaks;
}

const EXCLUDED_DIRECTORIES: Record<string, true> = {
	".git": true,
	".hg": true,
	".svn": true,
	node_modules: true,
	__pycache__: true,
	".cache": true,
	".pytest_cache": true,
	".mypy_cache": true,
	".ruff_cache": true,
};
const EXCLUDED_FILES: Record<string, true> = { ".DS_Store": true, "Thumbs.db": true };

/** Paths are relative to the skill directory; nested resource evals remain usable. */
export function shouldExcludeSkillPath(relativePath: string): boolean {
	const parts = relativePath.split(sep);
	const filename = parts.at(-1)!;
	return parts[0] === "evals" || parts.some((part) => Object.hasOwn(EXCLUDED_DIRECTORIES, part)) || Object.hasOwn(EXCLUDED_FILES, filename) || /\.(?:py[co]|skill)$/i.test(filename);
}

interface ArchiveFile {
	path: string;
	entry: string;
}

async function collectSkillFiles(skillDir: string, name: string): Promise<{ files: ArchiveFile[]; excluded: string[] }> {
	const files: ArchiveFile[] = [];
	const excluded: string[] = [];
	async function visit(relativeDir: string): Promise<void> {
		const entries = await readdir(join(skillDir, relativeDir), { withFileTypes: true });
		entries.sort((a, b) => a.name.localeCompare(b.name));
		for (const entry of entries) {
			const relativePath = join(relativeDir, entry.name);
			if (shouldExcludeSkillPath(relativePath)) {
				excluded.push(relativePath.split(sep).join("/"));
				continue;
			}
			const path = join(skillDir, relativePath);
			if (entry.name.includes("\\")) {
				throw new UsageError(`Cannot safely archive a filename containing a backslash: ${path}`, "Rename the file so ZIP extraction cannot reinterpret its name as a path.");
			}
			if (entry.isSymbolicLink()) {
				throw new UsageError(`Cannot package symbolic link: ${path}`, "Replace it with an ordinary file or directory inside the skill; bundles must not include files outside their source tree.");
			}
			if (entry.isDirectory()) await visit(relativePath);
			else if (entry.isFile()) files.push({ path, entry: `${name}/${relativePath.split(sep).join("/")}` });
			else throw new UsageError(`Cannot package non-regular file: ${path}`, "Remove sockets, devices and other special files from the skill directory.");
		}
	}
	await visit("");
	return { files, excluded };
}

/** Produce a real, deflated ZIP with one top-level skill folder; replace output only after success. */
export async function packageSkill(skillDirectory: string, outputFile: string): Promise<SkillPackage> {
	const skill = await validateSkill(skillDirectory);
	const output = resolve(outputFile);
	if (!output.endsWith(".skill")) {
		throw new UsageError(`Skill bundle output must end in .skill: ${output}`, `Example: cf eval package ${JSON.stringify(skill.skillDir)} --output ${JSON.stringify(`${skill.name}.skill`)}`);
	}
	if (skill.name.includes("\\") || /^[A-Za-z]:/.test(skill.name)) {
		throw new UsageError(`Skill directory name cannot be safely used in a ZIP: ${JSON.stringify(skill.name)}`, "Rename the skill directory and its frontmatter name to avoid backslashes or a drive prefix.");
	}
	const hint = `Check file permissions and fix the reported path, then run cf eval package ${JSON.stringify(skill.skillDir)} --output ${JSON.stringify(output)}.`;
	let temporaryDir: string | undefined;
	try {
		const { files, excluded } = await collectSkillFiles(skill.skillDir, skill.name);
		// A linked SKILL.md would otherwise pass read-time validation but is rejected above.
		if (!(await lstat(skill.skillFile)).isFile()) {
			throw new UsageError(`SKILL.md must be an ordinary file: ${skill.skillFile}`, hint);
		}
		await mkdir(dirname(output), { recursive: true });
		temporaryDir = await mkdtemp(join(dirname(output), ".skill-package-"));
		const temporaryFile = join(temporaryDir, "bundle.skill");
		const zip = new ZipFile();
		const stream = zip.outputStream as Readable;
		zip.on("error", (error: Error) => stream.destroy(error));
		const writing = pipeline(stream, createWriteStream(temporaryFile, { flags: "wx" }));
		try {
			for (const file of files) zip.addFile(file.path, file.entry);
			zip.end();
		} catch (error) {
			stream.destroy(error instanceof Error ? error : new Error(String(error)));
		}
		await writing;
		await rename(temporaryFile, output);
		return { skillDir: skill.skillDir, name: skill.name, output, files: files.map((file) => file.entry), excluded };
	} catch (error) {
		if (error instanceof UsageError) throw error;
		throw new UsageError(`Cannot package skill ${skill.skillDir}: ${errorMessage(error)}`, hint);
	} finally {
		if (temporaryDir !== undefined) await rm(temporaryDir, { recursive: true, force: true });
	}
}
