// Skill-graph scanning for `cfcli eval validate` and `cfcli eval graph` (issue #52): the files of a
// skill that references are read from, the skill:// references and backticked skill names those
// files hold, and the wiki/templates/<template>.md files they name. Everything here is deterministic
// over the skill text; no judgement and no new frontmatter fields.

import { realpathSync, type Dirent } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";

/**
 * Skill names that repo skills point at but that live outside this repository, as user-level
 * (`~/.agents/skills`) or omp built-in skills. `cfcli eval validate` passes them without a repo
 * directory, and `cfcli eval graph` lists them as links. The DM confirms this list (issue #52).
 */
export const EXTERNAL_SKILL_NAMES: Record<string, true> = {
	"agent-design": true,
	"cli-for-agents": true,
	"domain-modeling": true,
	"find-skills": true,
	"oh-my-pi-session-history": true,
	"writing-for-agents": true,
};

/** Visit each line outside fenced code blocks with its 1-based line number, tracking fence delimiters. */
export function forEachVisibleLine(content: string, visit: (line: string, index: number) => void): void {
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

const INLINE_CODE = /`+[^`]*`+/g;
const MARKDOWN_LINK = /\[([^\]\n]*)\]\([ \t]*(<[^<>]*>|[^)\s]+)(?:[ \t]+(?:"[^"]*"|'[^']*'))?[ \t]*\)/g;
export const NON_RELATIVE = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const SKILL_REFERENCE = /skill:\/\/([a-zA-Z0-9][a-zA-Z0-9_-]*)((?:\/[^\s`'"<>()[\]{}]*)?)/g;
const TEMPLATE_REFERENCE = /(?:wiki\/)?templates\/([^/`*?[()\\\]\n]+?)\.md/g;
const TRAILING_PUNCTUATION = /[.,;:!?]+$/;

export interface MarkdownLink {
	line: number;
	text: string;
	destination: string;
}

/** Inline links and images on visible lines with inline code spans blanked out. */
export function markdownLinks(content: string): MarkdownLink[] {
	const links: MarkdownLink[] = [];
	forEachVisibleLine(content, (line, index) => {
		for (const match of line.replace(INLINE_CODE, " ").matchAll(MARKDOWN_LINK)) {
			links.push({ line: index + 1, text: match[1]!, destination: match[2]!.replace(/^<|>$/g, "") });
		}
	});
	return links;
}

export function decodedPath(rawPath: string): string {
	if (!rawPath.includes("%")) return rawPath;
	try {
		return decodeURIComponent(rawPath);
	} catch {
		return rawPath;
	}
}

/** Every repo skill by name; `.omp/skills` directories first, the source of truth where both roots hold one. */
export interface SkillReferenceScope {
	skills: Map<string, string[]>;
}

/** Enumerate the skills a repository holds, following symlinked skill directories and ignoring other entries. */
export async function loadSkillScope(root: string): Promise<SkillReferenceScope> {
	const skills = new Map<string, string[]>();
	for (const skillRoot of [join(root, ".omp/skills"), join(root, ".agents/skills")]) {
		let entries: Dirent[];
		try {
			entries = await readdir(skillRoot, { withFileTypes: true });
		} catch {
			continue;
		}
		for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
			const directory = join(skillRoot, entry.name);
			try {
				if (!(await stat(directory)).isDirectory()) continue;
				if (!(await stat(join(directory, "SKILL.md"))).isFile()) continue;
			} catch {
				continue;
			}
			const real = realpathSync(directory);
			const held = skills.get(entry.name);
			if (held?.includes(real)) continue;
			skills.set(entry.name, [...(held ?? []), real]);
		}
	}
	return { skills };
}

/**
 * The files of a skill that references are read from: SKILL.md, every file under references/, and
 * the skill-local Markdown files SKILL.md links to (one level, no further). Keys are absolute
 * paths; values are display paths relative to the skill directory.
 */
export async function skillSourceFiles(skillDir: string, skillContent: string): Promise<Map<string, string>> {
	const skillFile = join(skillDir, "SKILL.md");
	const files = new Map<string, string>([[skillFile, "SKILL.md"]]);
	const add = (path: string): void => {
		if (!files.has(path)) files.set(path, relative(skillDir, path).split(sep).join("/"));
	};
	async function visit(directory: string): Promise<void> {
		let entries: Dirent[];
		try {
			entries = await readdir(directory, { withFileTypes: true });
		} catch {
			return;
		}
		for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
			const path = join(directory, entry.name);
			if (entry.isDirectory()) await visit(path);
			else if (entry.isFile()) add(path);
		}
	}
	await visit(join(skillDir, "references"));
	for (const link of markdownLinks(skillContent)) {
		if (link.destination === "" || NON_RELATIVE.test(link.destination)) continue;
		const hash = link.destination.indexOf("#");
		const target = resolve(
			dirname(skillFile),
			decodedPath(hash === -1 ? link.destination : link.destination.slice(0, hash)),
		);
		if (target === skillFile || !/\.md$/i.test(target) || !(target === skillDir || target.startsWith(skillDir + sep)))
			continue;
		try {
			if (!(await stat(target)).isFile()) continue;
		} catch {
			continue;
		}
		add(target);
	}
	return files;
}

export interface SkillLinkBreak {
	file: string;
	line: number;
	reference: string;
	reason: string;
}

/**
 * Broken `skill://<name>[/<path>]` references in a skill's files: a name no repo skill or
 * allowlisted external skill answers to, or a path that is no file in the named skill.
 */
export async function brokenSkillLinks(
	skillDir: string,
	scope: SkillReferenceScope,
	skillContent: string,
): Promise<SkillLinkBreak[]> {
	const skillFile = join(skillDir, "SKILL.md");
	const pending: { file: string; line: number; reference: string; name: string; path: string }[] = [];
	const breaks: SkillLinkBreak[] = [];
	for (const [sourcePath, display] of await skillSourceFiles(skillDir, skillContent)) {
		const content = sourcePath === skillFile ? skillContent : await readFile(sourcePath, "utf8");
		forEachVisibleLine(content, (line, index) => {
			for (const match of line.matchAll(SKILL_REFERENCE)) {
				const name = match[1]!;
				const refPath = (match[2] ?? "").replace(/^\/+/, "").replace(TRAILING_PUNCTUATION, "");
				if (!scope.skills.has(name)) {
					// An allowlisted external skill has no repo directory to check; any other unknown name is a break.
					if (EXTERNAL_SKILL_NAMES[name] !== true) {
						breaks.push({
							file: display,
							line: index + 1,
							reference: `skill://${name}${refPath === "" ? "" : `/${refPath}`}`,
							reason: `no skill '${name}' in .omp/skills or .agents/skills`,
						});
					}
					continue;
				}
				if (refPath !== "")
					pending.push({
						file: display,
						line: index + 1,
						reference: `skill://${name}/${refPath}`,
						name,
						path: refPath,
					});
			}
		});
	}
	for (const ref of pending) {
		let isFile = false;
		for (const directory of scope.skills.get(ref.name)!) {
			try {
				isFile = (await stat(join(directory, ref.path))).isFile();
			} catch {
				continue;
			}
			if (isFile) break;
		}
		if (!isFile)
			breaks.push({
				file: ref.file,
				line: ref.line,
				reference: ref.reference,
				reason: `no file '${ref.path}' in skill '${ref.name}'`,
			});
	}
	return breaks;
}

export interface SkillGraphEntry {
	skill: string;
	links: string[];
	templates: string[];
}

/**
 * The skill graph of a repository, one entry per skill name sorted by name: its links (skill://
 * references and bare backticked skill names, self-links dropped) and the wiki/templates/<template>.md
 * files it names, each list sorted. Where both roots hold a name, the entry reads both directories.
 */
export async function buildSkillGraph(root: string): Promise<SkillGraphEntry[]> {
	const scope = await loadSkillScope(root);
	const entries: SkillGraphEntry[] = [];
	for (const [name, directories] of [...scope.skills].sort(([a], [b]) => a.localeCompare(b))) {
		const links = new Set<string>();
		const templates = new Set<string>();
		for (const directory of directories) {
			const skillFile = join(directory, "SKILL.md");
			const content = await readFile(skillFile, "utf8");
			for (const [path] of await skillSourceFiles(directory, content)) {
				const text = path === skillFile ? content : await readFile(path, "utf8");
				forEachVisibleLine(text, (line) => {
					for (const match of line.matchAll(SKILL_REFERENCE)) {
						const target = match[1]!;
						if (target !== name && (scope.skills.has(target) || EXTERNAL_SKILL_NAMES[target] === true))
							links.add(target);
					}
					for (const match of line.matchAll(INLINE_CODE)) {
						const token = match[0].replace(/^`+|`+$/g, "").trim();
						if (token !== name && (scope.skills.has(token) || EXTERNAL_SKILL_NAMES[token] === true)) links.add(token);
					}
					for (const match of line.matchAll(TEMPLATE_REFERENCE)) {
						const kind = match[1]!;
						if (kind !== "" && !/[<>]/.test(kind)) templates.add(`wiki/templates/${kind}.md`);
					}
				});
			}
		}
		entries.push({ skill: name, links: [...links].sort(), templates: [...templates].sort() });
	}
	return entries;
}
