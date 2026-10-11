/**
 * Objective reference checks for agent-facing markdown (issue #66 `lint agents`), as a
 * remark plugin plus line scans. Covers what no installed tool does:
 *
 *   links/relative   a relative markdown link or image target resolves to a file
 *   links/anchor     a `#anchor` (same file or target file) matches a heading slug
 *   links/path-ref   a backtick span that names a repo path (has a directory part) exists
 *   links/skill-ref  a `skill://<name>[/path>]` names a skill under .omp/skills or .agents/skills
 *   links/import     an omp `@path` import line resolves to a file
 *   safety/secret    a hardcoded secret-looking token (sk-…, ghp_…, AKIA…, xox…)
 *   safety/pipe-shell  a shell snippet pipes a downloaded script into sh/bash
 *
 * Code fences are masked for reference checks (quoted commands stay verbatim) but scanned
 * for the safety rules. External URLs, wikilinks and anchor-only links into other files'
 * callouts stay out: resolving them is not objective.
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import type { Root } from "mdast";
import { VFile } from "vfile";
import { glob } from "tinyglobby";
import { headingAnchors } from "../../evals/authoring.ts";
import { EXTERNAL_SKILL_NAMES } from "../../evals/skill-graph.ts";
import { capture, REPO_ROOT } from "./core.ts";
import type { LintFinding } from "./types.ts";

/** Extensions a backtick span may end with to count as a file path (a trailing `/` marks a directory). */
const PATH_EXTENSIONS: Record<string, true> = {
	csv: true,
	css: true,
	html: true,
	ini: true,
	jpeg: true,
	jpg: true,
	js: true,
	json: true,
	jsonc: true,
	lock: true,
	markdown: true,
	md: true,
	mermaid: true,
	mjs: true,
	png: true,
	py: true,
	sh: true,
	skill: true,
	svg: true,
	toml: true,
	ts: true,
	tsx: true,
	txt: true,
	yaml: true,
	yml: true,
};

/**
 * Path candidate: a directory part, no spaces, placeholders or glob metacharacters, no URL scheme,
 * no home or absolute path, and a known extension or a trailing `/` (so model ids like `zai/glm-5.3`
 * and bare filenames stay out).
 */
function pathCandidate(span: string): boolean {
	if (span.includes(" ") || span.includes("://") || /[*?<>{}[\]$]/.test(span)) return false;
	if (span.startsWith("~/") || span.startsWith("/")) return false;
	if (!span.includes("/") && !span.startsWith("./") && !span.startsWith("../")) return false;
	if (span.endsWith("/")) return true;
	const ext = span.split(".").pop() ?? "";
	return ext !== span && ext in PATH_EXTENSIONS;
}

/** Resolves a repo path from the file's directory, the repo root, the vault (`wiki/`), then anywhere in the repo. */
async function repoPathExists(fromFile: string, ref: string): Promise<boolean> {
	for (const base of [join(REPO_ROOT, dirname(fromFile)), REPO_ROOT, join(REPO_ROOT, "wiki")]) {
		if (existsSync(resolve(base, ref))) return true;
	}
	// Docs name paths relative to the skill they describe (`references/transcript.md`): a suffix
	// match anywhere in the repo keeps those out of the findings.
	const matches = await glob([`**/${ref.replace(/^\.?\//, "")}`], {
		cwd: REPO_ROOT,
		onlyFiles: false,
		dot: true,
		ignore: ["node_modules/**"],
	});
	if (matches.length > 0) return true;
	// Named run outputs may be absent on a fresh checkout. Git's ignore policy owns these,
	// rather than an allowlist of generated filenames in this checker.
	const candidates = [join(REPO_ROOT, dirname(fromFile)), REPO_ROOT, join(REPO_ROOT, "wiki")]
		.map((base) => relative(REPO_ROOT, resolve(base, ref)))
		.filter((path) => path !== ".." && !path.startsWith("../"));
	const ignored = await capture("git", ["check-ignore", "--no-index", "--", ...candidates]);
	if (ignored.status !== 0 && ignored.status !== 1) {
		throw new Error(`git check-ignore failed: ${ignored.stderr || ignored.stdout}`);
	}
	return ignored.status === 0;
}

/** `skill://<name>[/path]`: a repo skill (either root) with `<path>` a file in it; allowlisted externals pass (skill-graph policy). */
function skillRefExists(reference: string): boolean {
	const match = /^skill:\/\/([a-z0-9-]+)(?:\/([^?#]+))?/.exec(reference);
	if (match === null) return true; // not shaped like a skill ref; other rules own it
	const [name, path] = [match[1]!, match[2]];
	const skillDir = [".omp/skills", ".agents/skills"].find((root) => existsSync(join(REPO_ROOT, root, name)));
	if (skillDir === undefined) return EXTERNAL_SKILL_NAMES[name] === true;
	return path === undefined || existsSync(join(REPO_ROOT, skillDir, name, path));
}

/** Yields `[startLine, endLine]` pairs of fenced code blocks, 1-based inclusive. */
function fencedBlocks(source: string): [number, number][] {
	const blocks: [number, number][] = [];
	let start = 0;
	let inFence = false;
	for (const [i, line] of source.split("\n").entries()) {
		const fence = /^ {0,3}(```|~~~)/.test(line);
		if (fence && !inFence) {
			inFence = true;
			start = i + 1;
		} else if (fence && inFence) {
			inFence = false;
			blocks.push([start, i + 1]);
		}
	}
	return blocks;
}

const SECRET =
	/\b(?:sk-[A-Za-z0-9_-]{16,}|ghp_[A-Za-z0-9]{20,}|gho_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|xox[abp]-[A-Za-z0-9-]{10,})\b/;
const PIPE_SHELL = /\b(?:curl|wget)\b[^|\n]*\|\s*(?:sudo\s+)?(?:ba|z|fi)?sh\b/;

/** Native unified/remark plugin: diagnostics remain VFile messages, never rewrites. */
export function remarkRepoReferences(options: { path: string }) {
	return async (tree: Root, file: VFile): Promise<void> => {
		const path = options.path;
		const source = file.toString();
		const findings: LintFinding[] = [];
		const fences = fencedBlocks(source);

		const at = (node: { position?: { start: { line: number; column: number } } }): { line: number; col: number } =>
			node.position === undefined
				? { line: 1, col: 1 }
				: { line: node.position.start.line, col: node.position.start.column };

		const walk = async (node: unknown): Promise<void> => {
			const typed = node as {
				type?: string;
				url?: string;
				value?: string;
				children?: unknown[];
				position?: { start: { line: number; column: number } };
			};
			if (typed.type === "link" || typed.type === "image") {
				const url = typed.url ?? "";
				if (!/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url)) {
					const [target = "", anchor] = url.split("#");
					const { line, col } = at(typed);
					if (target !== "" && !existsSync(resolve(join(REPO_ROOT, dirname(path)), target))) {
						findings.push({
							path,
							line,
							col,
							tool: "links",
							rule: "relative",
							message: `link target does not exist: ${target}`,
						});
					} else if (anchor !== undefined) {
						const anchorSource =
							target === ""
								? source
								: existsSync(resolve(join(REPO_ROOT, dirname(path)), target))
									? readFileSync(resolve(join(REPO_ROOT, dirname(path)), target), "utf8")
									: "";
						if (anchorSource !== "" && !headingAnchors(anchorSource).has(anchor)) {
							findings.push({
								path,
								line,
								col,
								tool: "links",
								rule: "anchor",
								message: `#${anchor} matches no heading in ${target === "" ? "this file" : target}`,
							});
						}
					}
				}
			}
			if (typed.type === "inlineCode" && pathCandidate(typed.value ?? "")) {
				const ref = typed.value!.replace(/^@/, "");
				if (!(await repoPathExists(path, ref))) {
					const { line, col } = at(typed);
					findings.push({
						path,
						line,
						col,
						tool: "links",
						rule: "path-ref",
						message: `backtick path does not exist: ${typed.value}`,
					});
				}
			}
			for (const child of typed.children ?? []) await walk(child);
		};
		await walk(tree);

		const inFence = (line: number): boolean => fences.some(([start, end]) => line >= start && line <= end);
		for (const [i, line] of source.split("\n").entries()) {
			const lineNo = i + 1;
			const importMatch = /^@(\S+)\s*$/.exec(line);
			if (importMatch !== null && !existsSync(resolve(join(REPO_ROOT, dirname(path)), importMatch[1]!))) {
				findings.push({
					path,
					line: lineNo,
					tool: "links",
					rule: "import",
					message: `@import target does not exist: ${importMatch[1]}`,
				});
			}
			if (!inFence(lineNo)) {
				for (const match of line.matchAll(/skill:\/\/[a-z0-9-]+(?:\/[\w./-]+)?/g)) {
					if (!skillRefExists(match[0])) {
						findings.push({
							path,
							line: lineNo,
							col: match.index! + 1,
							tool: "links",
							rule: "skill-ref",
							message: `skill:// reference does not resolve: ${match[0]}`,
						});
					}
				}
			}
			const secretMatch = SECRET.exec(line);
			if (secretMatch !== null) {
				findings.push({
					path,
					line: lineNo,
					col: secretMatch.index + 1,
					tool: "safety",
					rule: "secret",
					message: `hardcoded secret-looking token: ${secretMatch[0].slice(0, 8)}…`,
				});
			}
			const pipeMatch = PIPE_SHELL.exec(line);
			if (pipeMatch !== null) {
				findings.push({
					path,
					line: lineNo,
					col: pipeMatch.index + 1,
					tool: "safety",
					rule: "pipe-shell",
					message: "pipes a downloaded script into a shell",
				});
			}
		}
		for (const finding of findings) {
			file.message(
				finding.message,
				{ line: finding.line, column: finding.col ?? 1 },
				`${finding.tool}:${finding.rule}`,
			);
		}
	};
}

/** Runs the repo reference plugin over one file and normalises its native messages. */
export async function repoLinkFindings(path: string, source?: string): Promise<LintFinding[]> {
	const file = new VFile({ path, value: source ?? readFileSync(join(REPO_ROOT, path), "utf8") });
	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkFrontmatter, ["yaml"])
		.use(remarkRepoReferences, { path });
	await processor.run(processor.parse(file), file);
	return file.messages.map((message) => ({
		path,
		line: message.line ?? 1,
		col: message.column,
		tool: message.source ?? "links",
		rule: message.ruleId ?? "reference",
		message: message.reason,
	}));
}
