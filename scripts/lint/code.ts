/**
 * The code scope (issue #66): Biome (lint + format) and `tsc` for TypeScript, JavaScript
 * and JSON outside the prose trees, and ruff (check + format) for Python under `python/`.
 * `biome.jsonc` at the repo root scopes Biome; this module mirrors it so `select` never
 * hands the tools a file they would skip. Under `--fix` only safe fixes and the formatters
 * run (never `--unsafe`); `fixes[]` names a file only when its content hash changed, and
 * the rule label only when a diagnostic of that rule disappeared.
 */

import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { glob } from "tinyglobby";
import { binPath, capture, REPO_ROOT, sortByLocation, underDir } from "./core.ts";
import type { LintFinding, ScopeModule, ScopeResult, ScopeRun } from "./types.ts";

/** Biome's file types (biome.jsonc owns the directory exclusions; see `inBiomeDomain`). */
const BIOME_EXTENSIONS: Record<string, true> = {
	".js": true,
	".jsx": true,
	".mjs": true,
	".cjs": true,
	".ts": true,
	".tsx": true,
	".cts": true,
	".mts": true,
	".json": true,
	".jsonc": true,
	".css": true,
	".html": true,
	".graphql": true,
};
/** The prose domain and frozen provenance trees the code scope leaves alone (tracked, so git will not hide them). */
const BIOME_EXCLUDED_DIRS = ["wiki", "raw", "archive", "reference", "prior"];
const BIOME_EXCLUDED_FILES: Record<string, true> = { "legacy-import-report.json": true, "bun.lock": true };
/** Types `tsc` could report on; a selection holding none of these skips the compiler. */
const TS_EXTENSIONS: Record<string, true> = { ".ts": true, ".tsx": true, ".cts": true, ".mts": true };

/** `::error title=lint/style/rule,file=<abs>,line=1,endLine=1,col=1,endColumn=1::message` (biome --reporter=github, stdout). */
const BIOME_LINE =
	/^::(?:error|warning|notice) title=(?<title>[^,]+),file=(?<file>.+?),line=(?<line>\d+),endLine=\d+,col=(?<col>\d+),endColumn=\d+::(?<message>.*)$/;
/** `src/foo.ts(12,5): error TS2345: message` (tsc --pretty false, stdout). */
const TSC_LINE = /^(?<path>[^:(]+)\((?<line>\d+),(?<col>\d+)\): (?:error|warning) (?<rule>TS\d+): (?<message>.*)$/;
/** `src/foo.py:12:5: F401 [*] message` (ruff check --output-format concise, stdout). */
const RUFF_LINE =
	/^(?<path>[^:\n]+):(?<line>\d+):(?<col>\d+): (?<code>[A-Z]{1,4}\d+) (?<fixable>\[\*\] )?(?<message>.*)$/;
/** The `  --> src/foo.py:12:5` arrow under a `ruff format --check` header names the first differing spot. */
const RUFF_ARROW = /^\s*--> (?<path>[^:\n]+):(?<line>\d+):(?<col>\d+)/;

function inBiomeDomain(path: string): boolean {
	const ext = extname(path).toLowerCase();
	return (
		Object.hasOwn(BIOME_EXTENSIONS, ext) &&
		!BIOME_EXCLUDED_DIRS.some((dir) => underDir(path, dir)) &&
		!Object.hasOwn(BIOME_EXCLUDED_FILES, path)
	);
}

function inPythonDomain(path: string): boolean {
	return underDir(path, "python") && extname(path) === ".py";
}

/** Tracked plus untracked-but-not-ignored files, the same set Biome's `vcs` section sees.
 *  Files deleted in the worktree but not yet committed drop out, so no tool gets a phantom path. */
async function gitVisibleFiles(): Promise<Set<string>> {
	const out = await capture("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"]);
	if (out.status !== 0) throw new Error(`git ls-files failed: ${out.stderr.trim()}`);
	return new Set(out.stdout.split("\0").filter((path) => path !== "" && existsSync(join(REPO_ROOT, path))));
}

async function select(paths: string[]): Promise<string[]> {
	const visible = await gitVisibleFiles();
	const candidates = new Set<string>();
	for (const path of paths) {
		if (!existsSync(join(REPO_ROOT, path))) throw new Error(`no such path: ${path}`);
		if (statSync(join(REPO_ROOT, path)).isDirectory()) {
			const found = await glob(["**/*"], { cwd: join(REPO_ROOT, path), onlyFiles: true, dot: true });
			for (const file of found) candidates.add(join(path, file));
		} else candidates.add(path);
	}
	return [...visible].filter((path) => candidates.has(path) && (inBiomeDomain(path) || inPythonDomain(path))).sort();
}

async function all(): Promise<string[]> {
	return [...(await gitVisibleFiles())].filter((path) => inBiomeDomain(path) || inPythonDomain(path)).sort();
}

/** Parses biome's `--reporter=github` stdout; the reporter's absolute paths become repo-relative. */
function parseBiome(stdout: string): LintFinding[] {
	const findings: LintFinding[] = [];
	for (const line of stdout.split("\n")) {
		const groups = BIOME_LINE.exec(line)?.groups;
		if (!groups) continue;
		const path = groups.file!.startsWith(REPO_ROOT) ? groups.file!.slice(REPO_ROOT.length + 1) : groups.file!;
		findings.push({
			path,
			line: Number(groups.line),
			col: Number(groups.col),
			tool: "biome",
			rule: groups.title === "format" || groups.title === "parse" ? groups.title : groups.title!.replace(/^lint\//, ""),
			message: groups.title === "format" ? "content differs from biome's formatted output" : groups.message!,
		});
	}
	return findings;
}

function hashOf(path: string): string {
	return createHash("sha256")
		.update(readFileSync(join(REPO_ROOT, path)))
		.digest("hex");
}

/** One `failures[]` line for a tool that broke (the wrapper exits 2 on these): spawn failure or non-diagnostics exit. */
function failureLine(what: string, res: { status: number; stdout: string; stderr: string }): string {
	if (res.status === -1) return `${what} not found (spawn failed)`;
	return `${what} failed (exit ${res.status}): ${(res.stderr || res.stdout).trim().split("\n").slice(0, 4).join(" | ")}`;
}

/** Distinct rules per file, the label source for biome `fixes[]` under `--fix`. */
function rulesByFile(findings: LintFinding[]): Map<string, Set<string>> {
	const rules = new Map<string, Set<string>>();
	for (const finding of findings) {
		const set = rules.get(finding.path) ?? new Set<string>();
		set.add(finding.rule);
		rules.set(finding.path, set);
	}
	return rules;
}

async function runBiome(files: string[], fix: boolean): Promise<Pick<ScopeResult, "findings" | "fixes" | "failures">> {
	const args = ["check", "--config-path=.", "--reporter=github"];
	const report = await capture(binPath("biome"), [...args, ...files]);
	if (report.status === -1 || report.status > 1) {
		return { findings: [], fixes: [], failures: [failureLine("biome", report)] };
	}
	if (!fix) return { findings: parseBiome(report.stdout), fixes: [], failures: [] };
	const hashesBefore = new Map(files.map((path) => [path, hashOf(path)]));
	const write = await capture(binPath("biome"), [...args, "--write", ...files]);
	if (write.status === -1 || write.status > 1) {
		return { findings: [], fixes: [], failures: [failureLine("biome --write", write)] };
	}
	const beforeRules = rulesByFile(parseBiome(report.stdout));
	const after = parseBiome((await capture(binPath("biome"), [...args, ...files])).stdout);
	const afterRules = rulesByFile(after);
	const fixes: string[] = [];
	for (const [path, hash] of hashesBefore) {
		if (hashOf(path) === hash) continue;
		const fixed = [...(beforeRules.get(path) ?? [])].filter((rule) => !(afterRules.get(path)?.has(rule) ?? false));
		for (const rule of fixed.length > 0 ? fixed : ["format"])
			fixes.push(`${path} biome/${rule} ${rule === "format" ? "applied" : "fixed"}`);
	}
	return { findings: after, fixes: fixes.sort(), failures: [] };
}

async function runTsc(files: string[] | null): Promise<Pick<ScopeResult, "findings" | "fixes" | "failures">> {
	const result = await capture(binPath("tsc"), ["--noEmit", "--pretty", "false"]);
	if (result.status === -1) return { findings: [], fixes: [], failures: [failureLine("tsc", result)] };
	const findings: LintFinding[] = [];
	let parsedDiagnostics = 0;
	for (const line of result.stdout.split("\n")) {
		const groups = TSC_LINE.exec(line)?.groups;
		if (!groups) continue;
		parsedDiagnostics++;
		if (files !== null && !files.includes(groups.path!)) continue;
		findings.push({
			path: groups.path!,
			line: Number(groups.line),
			col: Number(groups.col),
			tool: "tsc",
			rule: groups.rule!,
			message: groups.message!,
		});
	}
	// Exit 1 with parseable diagnostics is findings even when the selection filters them all out;
	// only unparseable output (or a spawn failure) is a tool failure.
	if (result.status !== 0 && parsedDiagnostics === 0) {
		return { findings: [], fixes: [], failures: [failureLine("tsc", result)] };
	}
	return { findings, fixes: [], failures: [] };
}

/** Parses ruff's concise check output; paths arrive relative to `python/` and leave repo-relative. */
function parseRuffCheck(stdout: string): LintFinding[] {
	const findings: LintFinding[] = [];
	for (const line of stdout.split("\n")) {
		const groups = RUFF_LINE.exec(line)?.groups;
		if (!groups) continue;
		findings.push({
			path: `python/${groups.path}`,
			line: Number(groups.line),
			col: Number(groups.col),
			tool: "ruff",
			rule: groups.code!,
			message: groups.message!,
		});
	}
	return findings;
}

/** Parses `ruff format --check` stdout: each `unformatted:` block's `-->` arrow gives path and first differing line. */
function parseRuffFormat(stdout: string): LintFinding[] {
	const findings: LintFinding[] = [];
	let pending = false;
	for (const line of stdout.split("\n")) {
		if (/^(?:un|re)formatted:/.test(line)) {
			pending = true;
			continue;
		}
		const groups = pending ? RUFF_ARROW.exec(line)?.groups : undefined;
		if (!groups) continue;
		findings.push({
			path: `python/${groups.path}`,
			line: Number(groups.line),
			col: Number(groups.col),
			tool: "ruff",
			rule: "format",
			message: "file would be reformatted",
		});
		pending = false;
	}
	return findings;
}

/** Safe-fixable rule codes per file from the pre-fix check (`[*]` lines), the label source for ruff `fixes[]`. */
function fixableCodesByFile(stdout: string): Map<string, Set<string>> {
	const codes = new Map<string, Set<string>>();
	for (const line of stdout.split("\n")) {
		const groups = RUFF_LINE.exec(line)?.groups;
		if (!groups?.fixable) continue;
		const set = codes.get(groups.path!) ?? new Set<string>();
		set.add(groups.code!);
		codes.set(groups.path!, set);
	}
	return codes;
}

async function runRuff(files: string[], fix: boolean): Promise<Pick<ScopeResult, "findings" | "fixes" | "failures">> {
	const relPaths = files.map((path) => path.replace(/^python\//, ""));
	const uvCheck = ["run", "--directory", "python", "ruff", "check", "--output-format", "concise"];
	const uvFormat = ["run", "--directory", "python", "ruff", "format"];
	const check = await capture("uv", [...uvCheck, ...relPaths]);
	if (!fix) {
		const format = await capture("uv", [...uvFormat, "--check", ...relPaths]);
		const failures: string[] = [];
		if (check.status === -1 || check.status > 1) failures.push(failureLine("uv (ruff check)", check));
		if (format.status === -1 || format.status > 1) failures.push(failureLine("uv (ruff format --check)", format));
		return { findings: [...parseRuffCheck(check.stdout), ...parseRuffFormat(format.stdout)], fixes: [], failures };
	}
	const fixable = fixableCodesByFile(check.stdout);
	if (check.status === -1 || check.status > 1)
		return { findings: [], fixes: [], failures: [failureLine("uv (ruff check)", check)] };
	const hashesBefore = new Map(files.map((path) => [path, hashOf(path)]));
	const checkFix = await capture("uv", [...uvCheck, "--fix", ...relPaths]);
	if (checkFix.status === -1 || checkFix.status > 1)
		return { findings: [], fixes: [], failures: [failureLine("uv (ruff check --fix)", checkFix)] };
	const hashesAfterCheck = new Map(files.map((path) => [path, hashOf(path)]));
	const formatted = await capture("uv", [...uvFormat, ...relPaths]);
	if (formatted.status !== 0)
		return { findings: [], fixes: [], failures: [failureLine("uv (ruff format)", formatted)] };
	const checked = await capture("uv", [...uvCheck, ...relPaths]);
	if (checked.status === -1 || checked.status > 1) {
		return { findings: [], fixes: [], failures: [failureLine("uv (ruff check)", checked)] };
	}
	const after = parseRuffCheck(checked.stdout);
	const fixes: string[] = [];
	for (const [path, hash] of hashesBefore) {
		if (hashesAfterCheck.get(path) !== hash)
			for (const code of fixable.get(path.replace(/^python\//, "")) ?? []) fixes.push(`${path} ruff/${code} fixed`);
		if (hashesAfterCheck.get(path) !== hashOf(path)) fixes.push(`${path} ruff/format reformatted`);
	}
	return { findings: after, fixes: fixes.sort(), failures: [] };
}

async function run(opts: ScopeRun): Promise<ScopeResult> {
	const files = opts.files ?? (await all());
	const biomeFiles = files.filter(inBiomeDomain);
	const pyFiles = files.filter(inPythonDomain);
	const runCompiler = opts.files === null || biomeFiles.some((path) => Object.hasOwn(TS_EXTENSIONS, extname(path)));
	const parts = [
		...(biomeFiles.length > 0 ? [await runBiome(biomeFiles, opts.fix)] : []),
		...(runCompiler ? [await runTsc(opts.files)] : []),
		...(pyFiles.length > 0 ? [await runRuff(pyFiles, opts.fix)] : []),
	];
	return {
		files,
		findings: sortByLocation(parts.flatMap((part) => part.findings)),
		fixes: parts.flatMap((part) => part.fixes).sort(),
		failures: parts.flatMap((part) => part.failures),
	};
}

export const codeScope: ScopeModule = { select, all, run };
