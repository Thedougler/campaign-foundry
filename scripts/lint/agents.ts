/** Objective checks for agent-facing markdown (issue #66), plus Claude's skill links. Markdownlint and skill links apply safe fixes. */
import {
	existsSync,
	lstatSync,
	mkdirSync,
	mkdtempSync,
	readFileSync,
	readdirSync,
	rmSync,
	statSync,
	symlinkSync,
	unlinkSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, isAbsolute, join, relative, resolve } from "node:path";
import { glob } from "tinyglobby";
import { SkillReferenceError, validateSkill } from "../../evals/authoring.ts";
import { UsageError } from "../../src/check/errors.ts";
import { loadCases } from "../../evals/cases.ts";
import { binPath, capture, markdownUnder, REPO_ROOT, sortByLocation, underDir } from "./core.ts";
import { CHAIN_START, chainFiles, countWords } from "./instruction-budget.ts";
import { hookText } from "./hook-text.ts";
import type { HookText } from "./hook-text.ts";
import { repoLinkFindings } from "./repo-links.ts";
import type { LintFinding, ScopeModule, ScopeResult, ScopeRun } from "./types.ts";

const ROOT_FILES: Record<string, true> = {
	"AGENTS.md": true,
	".omp/AGENTS.md": true,
	"CLAUDE.md": true,
	"CONTEXT.md": true,
};
const DOMAIN_DIRS = [".agents/skills", ".omp/skills", ".omp/agents", ".omp/rules", "docs/agents", ".omp/hooks"];
const SKILL_ROOTS = [".omp/skills", ".agents/skills"];
const CLAUDE_SKILLS = ".claude/skills";
const installed = JSON.parse(readFileSync(join(REPO_ROOT, "skills-lock.json"), "utf8")) as {
	skills: Record<string, unknown>;
};
const config = JSON.parse(readFileSync(join(REPO_ROOT, ".lint-agents.json"), "utf8")) as { vendoredSkills: string[] };
const VENDORED_SKILLS = new Set([...Object.keys(installed.skills), ...config.vendoredSkills]);

/** Upstream skill text is outside every agents check, including explicit path selection. */
function isVendored(path: string): boolean {
	return SKILL_ROOTS.some(
		(root) => underDir(path, root) && VENDORED_SKILLS.has(path.slice(root.length + 1).split("/")[0]!),
	);
}

/** ADR 0038: Benchmark prompts are the DM's verbatim text — outside markdownlint, cspell and the style gate, explicit selection included. */
const BENCH_PROMPTS = "evals/bench/prompts";

function isBenchPrompt(path: string): boolean {
	return underDir(path, BENCH_PROMPTS);
}

/** ADR 0020: the content-facing targets the whole-domain (`--all`) style pass checks, keeping that run fast. */
const STYLE_PATHS = [
	".omp/skills/collab-with-me",
	".omp/skills/lint",
	".omp/agents/creative-writer.md",
	".omp/agents/persona.md",
	".omp/agents/transcript-reader.md",
	"docs/agents/scene-pages.md",
	"docs/agents/co-writing.md",
	"docs/agents/narrative-devices.md",
	"wiki/templates",
	".agents/skills/plan-session",
	".agents/skills/prep-session",
	".agents/skills/hook-scene",
	".agents/skills/development-scene",
	".agents/skills/cliffhanger-scene",
	".agents/skills/climax-scene",
	".agents/skills/resolution-scene",
	".agents/skills/theatre-of-the-mind",
	".agents/skills/flesh-out",
	".agents/skills/npc-design",
	".agents/skills/faction-design",
	".agents/skills/location-design",
	".agents/skills/lore-design",
	".agents/skills/creature-design",
	".agents/skills/item-design",
	".agents/skills/dungeon-design",
	".agents/skills/vehicle-design",
	".agents/skills/spell-design",
	".agents/skills/simulate-npcs",
	".agents/skills/new-campaign",
	".agents/skills/ingest",
	".agents/skills/audit",
	".agents/skills/revealed-in-play",
	".agents/skills/story-arc",
];

interface ToolResult {
	findings: LintFinding[];
	failures: string[];
}

function errorLine(error: unknown): string {
	const message = error instanceof Error ? error.message : String(error);
	return message.trim().split(/\r?\n/).join(" | ");
}

function inDomain(path: string): boolean {
	if (isVendored(path)) return false;
	if (isBenchPrompt(path)) return false;
	// A skill's eval fixtures keep researched source notes byte for byte as fetched (`evals/README.md`
	// § Grounding), so they stay outside markdownlint, cspell and the style gate, explicit selection included.
	if (SKILL_ROOTS.some((root) => underDir(path, root) && /^[^/]+\/evals\/fixtures\//.test(path.slice(root.length + 1))))
		return false;
	return (
		(underDir(path, ".omp/hooks") && /\.(?:[cm]?[jt]s)$/.test(path)) ||
		(SKILL_ROOTS.some((root) => underDir(path, root)) && path.endsWith("/evals/cases.yaml")) ||
		(path.endsWith(".md") && (Object.hasOwn(ROOT_FILES, path) || DOMAIN_DIRS.some((dir) => underDir(path, dir))))
	);
}

async function all(): Promise<string[]> {
	const files = Object.keys(ROOT_FILES).filter((path) => existsSync(join(REPO_ROOT, path)));
	files.push(...(await Promise.all(DOMAIN_DIRS.map((dir) => markdownUnder(dir)))).flat());
	files.push(
		...(await glob(
			SKILL_ROOTS.map((root) => `${root}/*/evals/cases.yaml`),
			{ cwd: REPO_ROOT, dot: true },
		)),
	);
	files.push(
		...(await glob(".omp/hooks/**/*.{ts,js,mts,mjs,cts,cjs}", {
			cwd: REPO_ROOT,
			onlyFiles: true,
			dot: true,
		})),
	);
	return [...new Set(files)].filter(inDomain).sort();
}

async function select(paths: string[]): Promise<string[]> {
	const selected: string[] = [];
	for (const input of paths) {
		const path = relative(REPO_ROOT, resolve(REPO_ROOT, input)) || ".";
		if (underDir(path, CLAUDE_SKILLS)) continue; // Checked globally, not as duplicate skill text.
		if (isVendored(path)) continue;
		if (!existsSync(join(REPO_ROOT, path))) throw new Error(`no such path: ${input}`);
		if (statSync(join(REPO_ROOT, path)).isDirectory()) {
			selected.push(...(await markdownUnder(path)));
			selected.push(
				...(await glob("**/evals/cases.yaml", { cwd: join(REPO_ROOT, path), dot: true })).map((file) =>
					join(path, file),
				),
			);
			const hooks = underDir(path, ".omp/hooks") ? path : ".omp/hooks";
			if (underDir(path, ".omp/hooks") || underDir(".omp/hooks", path) || path === ".") {
				selected.push(
					...(
						await glob("**/*.{ts,js,mts,mjs,cts,cjs}", {
							cwd: join(REPO_ROOT, hooks),
							onlyFiles: true,
							dot: true,
						})
					).map((file) => join(hooks, file)),
				);
			}
		} else selected.push(path);
	}
	return [...new Set(selected)].filter(inDomain).sort();
}

function selectionNotes(paths: string[], selected: string[]): string[] {
	return paths.flatMap((input) => {
		const path = relative(REPO_ROOT, resolve(REPO_ROOT, input)) || ".";
		if (underDir(path, CLAUDE_SKILLS)) return [];
		if (selected.some((file) => path === "." || underDir(file, path))) return [];
		const command = underDir(path, "wiki") ? "check" : "style";
		return [`skipped ${input} (outside agents scope); run bun run cfcli -- ${command} ${JSON.stringify(input)}`];
	});
}

async function markdownlintPass(stage: string, files: string[], fix: boolean): Promise<LintFinding[]> {
	const out = await capture(
		binPath("markdownlint-cli2"),
		[
			"--config",
			join(REPO_ROOT, ".markdownlint-agents.yaml"),
			...(fix ? ["--fix"] : []),
			...files.map((file) => `:${file}`),
		],
		{ cwd: stage },
	);
	if (out.status !== 0 && out.status !== 1) {
		throw new Error(`markdownlint-cli2 failed (exit ${out.status}): ${errorLine(out.stderr || out.stdout)}`);
	}
	const findings: LintFinding[] = [];
	// cli2 0.23 emits finding lines on stderr; accept stdout too for other formatters/versions.
	for (const text of `${out.stdout}\n${out.stderr}`.split(/\r?\n/)) {
		const match = /^(.+?):(\d+)(?::(\d+))?\s+(?:error\s+)?(MD\d+)(?:\/\S+)?\s+(.+)$/.exec(text);
		if (match === null) continue;
		findings.push({
			path: match[1]!,
			line: Number(match[2]),
			...(match[3] === undefined ? {} : { col: Number(match[3]) }),
			tool: "markdownlint",
			rule: match[4]!,
			message: match[5]!,
		});
	}
	return findings;
}

async function runMarkdownlint(files: string[], fix: boolean): Promise<ToolResult & { fixes: string[] }> {
	let stage: string | undefined;
	let observed: LintFinding[] = [];
	try {
		stage = mkdtempSync(join(tmpdir(), "lint-agents-"));
		// cli2 prefers discovered .markdownlint.yaml to --config. A symlinked repo layout isolates
		// the agents config from the Wiki config while preserving paths and write-through fixes.
		const links = new Set(files.map((file) => file.split("/")[0]!));
		for (const link of links) symlinkSync(join(REPO_ROOT, link), join(stage, link));
		const before = await markdownlintPass(stage, files, false);
		observed = before;
		if (!fix) return { findings: before, fixes: [], failures: [] };
		const after = await markdownlintPass(stage, files, true);
		observed = after;
		// Count by file/rule: whitespace fixes can move surviving findings to another line.
		const counts = new Map<string, { path: string; rule: string; count: number }>();
		for (const [findings, delta] of [
			[before, 1],
			[after, -1],
		] as const) {
			for (const finding of findings) {
				const key = `${finding.path}\0${finding.rule}`;
				const entry = counts.get(key) ?? { path: finding.path, rule: finding.rule, count: 0 };
				entry.count += delta;
				counts.set(key, entry);
			}
		}
		const fixes: string[] = [];
		for (const { path, rule, count } of counts.values()) {
			for (let i = 0; i < count; i++) fixes.push(`${path} markdownlint/${rule} fixed`);
		}
		return { findings: after, fixes, failures: [] };
	} catch (error) {
		return { findings: observed, fixes: [], failures: [`markdownlint: ${errorLine(error)}`] };
	} finally {
		if (stage !== undefined) rmSync(stage, { recursive: true, force: true });
	}
}

async function runCspell(files: string[]): Promise<ToolResult> {
	try {
		const out = await capture(binPath("cspell"), [
			"lint",
			"--config",
			"cspell.json",
			"--no-progress",
			"--no-summary",
			"--no-color",
			"--no-cache",
			...files,
		]);
		const findings: LintFinding[] = [];
		for (const text of out.stdout.split(/\r?\n/)) {
			const match = /^(.+?):(\d+):(\d+) - Unknown word \(([^)]+)\)(?:.*)$/.exec(text);
			if (match === null) continue;
			findings.push({
				path: match[1]!,
				line: Number(match[2]),
				col: Number(match[3]),
				tool: "cspell",
				rule: "unknown-word",
				message: `Unknown word (${match[4]})`,
			});
		}
		const failures =
			out.status === 0 || out.status === 1
				? []
				: [`cspell failed (exit ${out.status}): ${errorLine(out.stderr || out.stdout)}`];
		return { findings, failures };
	} catch (error) {
		return { findings: [], failures: [`cspell: ${errorLine(error)}`] };
	}
}

interface CfStyleJson {
	findings: { layer: string; rule: string; path: string; line: number; message: string }[];
}

async function runStyle(files: string[], wholeDomain: boolean): Promise<ToolResult & { files: string[] }> {
	// Explicit paths and changed files are agent-facing by selection, so every one of them goes
	// through the style gate: one command gates agent-facing text. The whole-domain run keeps
	// ADR 0020's curated list to stay fast.
	const selected = wholeDomain ? STYLE_PATHS.filter((path) => !isVendored(path)) : files;
	if (selected.length === 0) return { files: [], findings: [], failures: [] };
	try {
		// Mirrors cfcli style's directory expansion for the reported file union, not its lint rules.
		const expanded = (
			await Promise.all(
				selected.map(async (path) => {
					if (path.endsWith(".md")) return [path];
					const found = await glob("**/*.md", {
						cwd: join(REPO_ROOT, path),
						onlyFiles: true,
						dot: false,
						ignore: ["templates/**", ".obsidian/**", "node_modules/**", "**/evals/snapshot/**", "**/evals/fixtures/**"],
					});
					return found.map((file) => join(path, file));
				}),
			)
		).flat();
		return { files: expanded, ...(await stylePass(selected)) };
	} catch (error) {
		return { files: [], findings: [], failures: [`cfcli style: ${errorLine(error)}`] };
	}
}

async function stylePass(paths: string[]): Promise<ToolResult> {
	const cf = await capture(process.execPath, ["src/cli.ts", "style", ...paths, "--json"]);
	let parsed: CfStyleJson;
	try {
		parsed = JSON.parse(cf.stdout) as CfStyleJson;
		if (!Array.isArray(parsed.findings)) throw new Error("missing findings array");
	} catch {
		return { findings: [], failures: [`cfcli style failed (exit ${cf.status}): ${errorLine(cf.stderr || cf.stdout)}`] };
	}
	return {
		findings: parsed.findings.map((finding) => ({
			path: finding.path,
			line: finding.line,
			tool: finding.layer,
			rule: finding.rule,
			message: finding.message,
		})),
		failures: cf.status === 2 ? [`cfcli style usage error: ${errorLine(cf.stderr || cf.stdout)}`] : [],
	};
}

async function runHookText(paths: string[]): Promise<ToolResult> {
	if (paths.length === 0) return { findings: [], failures: [] };
	let stage: string | undefined;
	try {
		const pieces = paths.flatMap((path) => hookText(path));
		if (pieces.length === 0) return { findings: [], failures: [] };
		stage = mkdtempSync(join(tmpdir(), "lint-hook-text-"));
		// Injected prose is a fragment, not a whole H1 document. All other agents rules still apply.
		writeFileSync(
			join(stage, ".markdownlint.yaml"),
			`extends: ${JSON.stringify(join(REPO_ROOT, ".markdownlint-agents.yaml"))}\nMD041: false\n`,
		);
		const files = pieces.map((piece, index) => {
			const file = join(stage!, `hook-${index}.md`);
			writeFileSync(file, `${piece.text}\n`);
			return file;
		});
		const [markdownlint, cspell, style, links] = await Promise.all([
			markdownlintPass(
				stage,
				files.map((file) => basename(file)),
				false,
			),
			runCspell(files),
			stylePass(files),
			Promise.all(pieces.map((piece) => repoLinkFindings(piece.path, piece.text))),
		]);
		const remap = (finding: LintFinding, piece: HookText): LintFinding => ({
			...finding,
			path: piece.path,
			line: piece.lines[finding.line - 1] ?? piece.lines.at(-1)!,
			...(finding.col === undefined
				? {}
				: {
						col: finding.line === 1 ? piece.col + finding.col - 1 : finding.col,
					}),
		});
		const findings = [...markdownlint, ...cspell.findings, ...style.findings].map((finding) => {
			const index = Number(/^hook-(\d+)\.md$/.exec(basename(finding.path))?.[1]);
			const piece = pieces[index];
			if (piece === undefined) throw new Error(`unknown extracted hook target: ${finding.path}`);
			return remap(finding, piece);
		});
		for (const [index, found] of links.entries()) {
			for (const finding of found) findings.push(remap(finding, pieces[index]!));
		}
		return { findings, failures: [...cspell.failures, ...style.failures] };
	} catch (error) {
		return { findings: [], failures: [`hook text: ${errorLine(error)}`] };
	} finally {
		if (stage !== undefined) rmSync(stage, { recursive: true, force: true });
	}
}

async function skillDirectories(files: string[]): Promise<string[]> {
	const dirs = new Set<string>();
	for (const file of files) {
		for (const root of SKILL_ROOTS) {
			if (!underDir(file, root)) continue;
			const name = file.slice(root.length + 1).split("/")[0]!;
			const dir = join(root, name);
			if (existsSync(join(REPO_ROOT, dir, "SKILL.md"))) dirs.add(dir);
		}
	}
	return [...dirs].sort();
}

async function runSkill(dir: string): Promise<ToolResult> {
	const path = join(dir, "SKILL.md");
	try {
		const skill = await validateSkill(join(REPO_ROOT, dir), { root: REPO_ROOT });
		const findings: LintFinding[] = [];
		if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(skill.name) || skill.name.length > 64) {
			findings.push({
				path,
				line: 1,
				tool: "skill",
				rule: "name",
				message: `name must be lower-kebab-case and at most 64 characters: ${JSON.stringify(skill.name)}`,
			});
		}
		if (skill.description.length > 1024) {
			findings.push({
				path,
				line: 1,
				tool: "skill",
				rule: "description",
				message: `description is ${skill.description.length} characters; Agent Skills limit is 1024`,
			});
		}
		return { findings, failures: [] };
	} catch (error) {
		if (error instanceof SkillReferenceError) {
			const findings: LintFinding[] = [];
			for (const match of error.message.matchAll(/^ {2}(.+?):(\d+): (.+)$/gm)) {
				const shown = match[1]!;
				const file = isAbsolute(shown) ? relative(REPO_ROOT, shown) : underDir(shown, dir) ? shown : join(dir, shown);
				findings.push({ path: file, line: Number(match[2]), tool: "skill", rule: "refs", message: match[3]! });
			}
			return { findings, failures: [] };
		}
		if (error instanceof UsageError) {
			return {
				findings: [{ path, line: 1, tool: "skill", rule: "frontmatter", message: errorLine(error) }],
				failures: [],
			};
		}
		return { findings: [], failures: [`skill ${dir}: ${errorLine(error)}`] };
	}
}

function instructionReport(selected: string[] | null): { findings: LintFinding[]; notes: string[] } {
	// Preserve the former chain-membership trigger even if an import is broken upstream.
	const triggers = [CHAIN_START, "AGENTS.md", "user-config.md", "CONTEXT.md", "wiki/shattered-sea/campaign-config.md"];
	if (selected !== null && !selected.some((file) => triggers.includes(file))) return { findings: [], notes: [] };
	try {
		const chain = chainFiles();
		const note = `instruction chain: ${chain.length} files, ${countWords(chain)} words: ${chain.join(", ")}`;
		return { findings: [], notes: [note] };
	} catch (error) {
		return {
			findings: [{ path: CHAIN_START, line: 1, tool: "budget", rule: "chain-import", message: errorLine(error) }],
			notes: [],
		};
	}
}

async function runLinks(files: string[]): Promise<ToolResult> {
	const results = await Promise.all(
		files.map(async (path): Promise<ToolResult> => {
			try {
				return { findings: await repoLinkFindings(path), failures: [] };
			} catch (error) {
				return { findings: [], failures: [`repo-links ${path}: ${errorLine(error)}`] };
			}
		}),
	);
	return {
		findings: results.flatMap((result) => result.findings),
		failures: results.flatMap((result) => result.failures),
	};
}

function runCases(path: string): ToolResult {
	try {
		loadCases(join(REPO_ROOT, path));
		return { findings: [], failures: [] };
	} catch (error) {
		if (error instanceof UsageError) {
			return {
				findings: [{ path, line: 1, tool: "skill", rule: "cases", message: errorLine(error) }],
				failures: [],
			};
		}
		return { findings: [], failures: [`cases ${path}: ${errorLine(error)}`] };
	}
}

/** Link integrity is repo-wide: deleted links are absent from the changed-file selection. */
function runSkillLinks(fix: boolean): { findings: LintFinding[]; fixes: string[] } {
	const findings: LintFinding[] = [];
	const fixes: string[] = [];
	const links = join(REPO_ROOT, CLAUDE_SKILLS);
	if (existsSync(links)) {
		for (const entry of readdirSync(links, { withFileTypes: true })) {
			if (!entry.isSymbolicLink() || existsSync(join(links, entry.name, "SKILL.md"))) continue;
			const path = join(CLAUDE_SKILLS, entry.name);
			if (fix) {
				unlinkSync(join(REPO_ROOT, path));
				fixes.push(`${path} skill-links/dead removed`);
			} else {
				findings.push({
					path,
					line: 1,
					tool: "skill-links",
					rule: "dead",
					message: "link resolves to no SKILL.md; run bun run fix to remove it",
				});
			}
		}
	}
	const source = join(REPO_ROOT, ".agents/skills");
	if (existsSync(source)) {
		for (const entry of readdirSync(source, { withFileTypes: true })) {
			if (!entry.isDirectory() || !existsSync(join(source, entry.name, "SKILL.md"))) continue;
			const path = join(CLAUDE_SKILLS, entry.name);
			const current = lstatSync(join(REPO_ROOT, path), { throwIfNoEntry: false });
			if (current?.isSymbolicLink()) continue;
			const target = `../../.agents/skills/${entry.name}`;
			if (fix && current === undefined) {
				mkdirSync(links, { recursive: true });
				symlinkSync(target, join(REPO_ROOT, path));
				fixes.push(`${path} skill-links/missing created ${target}`);
			} else {
				findings.push({
					path,
					line: 1,
					tool: "skill-links",
					rule: "missing",
					message: current
						? `expected a symlink to ${target}; existing non-link must be moved before running bun run fix`
						: `missing symlink to ${target}; run bun run fix to create it`,
				});
			}
		}
	}
	return { findings: sortByLocation(findings), fixes };
}

async function run(opts: ScopeRun): Promise<ScopeResult> {
	const files = (opts.files ?? (await all())).filter(inDomain);
	const skillLinks = runSkillLinks(opts.fix);
	if (files.length === 0) return { files, ...skillLinks, failures: [] };
	const markdown = files.filter((path) => path.endsWith(".md"));
	const hooks = files.filter((path) => underDir(path, ".omp/hooks") && !path.endsWith(".md"));
	const cases = files.filter((path) => path.endsWith("/evals/cases.yaml")).map(runCases);
	const dirs = await skillDirectories(markdown);
	const [markdownlint, cspell, style, links, skills, hookFindings] = await Promise.all([
		markdown.length === 0 ? { findings: [], fixes: [], failures: [] } : runMarkdownlint(markdown, opts.fix),
		markdown.length === 0 ? { findings: [], failures: [] } : runCspell(markdown),
		runStyle(markdown, opts.files === null),
		runLinks(markdown),
		Promise.all(dirs.map((dir) => runSkill(dir))),
		runHookText(hooks),
	]);
	const instruction = instructionReport(opts.files);
	const findings = [
		...skillLinks.findings,
		...markdownlint.findings,
		...cspell.findings,
		...style.findings,
		...links.findings,
		...skills.flatMap((skill) => skill.findings),
		...instruction.findings,
		...hookFindings.findings,
		...cases.flatMap((result) => result.findings),
	];
	const refs = new Set(
		findings
			.filter((finding) => finding.tool === "skill" && finding.rule === "refs")
			.map((finding) => `${finding.path}\0${finding.line}`),
	);
	return {
		files: [...new Set([...files, ...style.files])].sort(),
		findings: sortByLocation(
			findings.filter((finding) => finding.tool !== "links" || !refs.has(`${finding.path}\0${finding.line}`)),
		),
		fixes: [...markdownlint.fixes, ...skillLinks.fixes],
		failures: [
			...markdownlint.failures,
			...cspell.failures,
			...style.failures,
			...links.failures,
			...skills.flatMap((skill) => skill.failures),
			...hookFindings.failures,
			...cases.flatMap((result) => result.failures),
		],
		notes: instruction.notes,
	};
}

export const agentsScope: ScopeModule = { select, all, run, selectionNotes };
