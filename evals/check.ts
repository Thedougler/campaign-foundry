/**
 * Deterministic checks for one skill eval case, run against the vault a skill left behind.
 *
 *   node evals/check.ts <skill> <case-id> <vault-dir> [--root <dir>] [--templates <dir>] [--cases <file>]
 *
 * Cases live in `.agents/skills/<skill>/evals/cases.yaml` (or the file given with `--cases`). Rubrics in
 * a case are not run here: the orchestrator's grader reads them from the YAML (ADR 0010).
 * Exit codes: 0 every check passed, 1 a check failed, 2 usage or cases-file error.
 */
import "../src/env.ts";
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import YAML from "yaml";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const USAGE = `Usage: node evals/check.ts <skill> <case-id> <vault-dir> [options]

Runs one eval case's deterministic checks against a vault, then the check gate.

Options:
  --root <dir>       repository root the gate resolves archive/ paths against
                     (default: the parent of <vault-dir>)
  --templates <dir>  page templates for the gate (default: <root>/wiki/templates,
                     else this repository's wiki/templates)
  --cases <file>     read cases from this file instead of
                     .agents/skills/<skill>/evals/cases.yaml
  -h, --help         show this help

cases.yaml is a list of { id, prompt, checks, rubrics }. checks holds any of:
  pages     list of vault-relative page paths that must exist
  sections  page -> headings that must exist (a leading "##" also fixes the level)
  canon     page -> regexes that must still match (Canon facts)
  absent    page -> regexes that must not match
A regex is plain text (multiline) or /pattern/flags. The ".md" extension is optional.
Skill eval preparation additionally requires source_pages provenance; see evals/README.md.

Exit codes: 0 all passed, 1 a check failed, 2 usage or cases-file error.

Example:
  node evals/check.ts eval-sample who-leads /tmp/run1/wiki
`;

class UsageError extends Error {}

interface Checks {
	pages?: string[];
	sections?: Record<string, string[]>;
	canon?: Record<string, string[]>;
	absent?: Record<string, string[]>;
}

interface Case {
	id: string;
	prompt: string;
	checks?: Checks;
	rubrics?: string[];
}

interface Result {
	ok: boolean;
	skip?: boolean;
	kind: string;
	detail: string;
}

const CHECK_KEYS = ["pages", "sections", "canon", "absent"];

function fail(message: string): never {
	throw new UsageError(message);
}

function isStringList(value: unknown): value is string[] {
	return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isPageMap(value: unknown): value is Record<string, string[]> {
	return typeof value === "object" && value !== null && !Array.isArray(value) && Object.values(value).every(isStringList);
}

/** Reads and validates a cases file. Throws a UsageError naming the first problem. */
export function loadCases(file: string): Case[] {
	if (!existsSync(file)) fail(`cases file not found: ${file}`);
	const data: unknown = YAML.parse(readFileSync(file, "utf8"));
	if (!Array.isArray(data)) fail(`${file}: expected a list of cases`);
	const seen = new Set<string>();
	for (const [index, entry] of data.entries()) {
		const item = entry as Record<string, unknown> | null;
		const where = `${file}: case #${index + 1}`;
		if (typeof item !== "object" || item === null) fail(`${where}: expected a mapping`);
		if (typeof item.id !== "string" || item.id === "") fail(`${where}: "id" must be a non-empty string`);
		if (seen.has(item.id)) fail(`${where}: duplicate id "${item.id}"`);
		seen.add(item.id);
		if (typeof item.prompt !== "string" || item.prompt === "") fail(`${where} ("${item.id}"): "prompt" must be a non-empty string`);
		if (item.rubrics !== undefined && !isStringList(item.rubrics)) fail(`${where} ("${item.id}"): "rubrics" must be a list of strings`);
		const checks = item.checks as Record<string, unknown> | undefined;
		if (checks === undefined) continue;
		if (typeof checks !== "object" || checks === null) fail(`${where} ("${item.id}"): "checks" must be a mapping`);
		for (const key of Object.keys(checks)) {
			if (!CHECK_KEYS.includes(key)) fail(`${where} ("${item.id}"): unknown check "${key}" (use ${CHECK_KEYS.join(", ")})`);
		}
		if (checks.pages !== undefined && !isStringList(checks.pages)) fail(`${where} ("${item.id}"): checks.pages must be a list of paths`);
		for (const key of ["sections", "canon", "absent"]) {
			if (checks[key] !== undefined && !isPageMap(checks[key])) fail(`${where} ("${item.id}"): checks.${key} must map a page path to a list of strings`);
		}
	}
	return data as Case[];
}

function pageFile(vault: string, page: string): string | undefined {
	for (const candidate of [join(vault, page), join(vault, `${page}.md`)]) {
		if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
	}
	return undefined;
}

function toRegExp(source: string): RegExp {
	const literal = source.match(/^\/(.+)\/([a-z]*)$/s);
	try {
		return literal ? new RegExp(literal[1] as string, literal[2]) : new RegExp(source, "m");
	} catch (error) {
		return fail(`invalid regex ${source}: ${(error as Error).message}`);
	}
}

function headings(text: string): { level: number; title: string }[] {
	const found: { level: number; title: string }[] = [];
	let inFence = false;
	for (const line of text.split("\n")) {
		if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
		const match = inFence ? null : line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
		if (match) found.push({ level: (match[1] as string).length, title: match[2] as string });
	}
	return found;
}

function hasHeading(text: string, spec: string): boolean {
	const wanted = spec.match(/^(#{1,6})\s+(.*)$/);
	const title = (wanted ? (wanted[2] as string) : spec).trim().toLowerCase();
	const level = wanted ? (wanted[1] as string).length : undefined;
	return headings(text).some((h) => h.title.toLowerCase() === title && (level === undefined || h.level === level));
}

/** Runs the deterministic checks of one case against a vault. Never throws on a failed check. */
export function runChecks(checks: Checks, vault: string): Result[] {
	const results: Result[] = [];
	for (const page of checks.pages ?? []) {
		const ok = pageFile(vault, page) !== undefined;
		results.push({ ok, kind: "pages", detail: `${page} ${ok ? "exists" : "is missing"}` });
	}
	const perPage = (kind: "sections" | "canon" | "absent", test: (text: string, item: string) => boolean, pass: string, miss: string) => {
		for (const [page, items] of Object.entries(checks[kind] ?? {})) {
			const file = pageFile(vault, page);
			for (const item of items) {
				if (file === undefined) {
					results.push({ ok: false, kind, detail: `${page}: page is missing (${item})` });
					continue;
				}
				const ok = test(readFileSync(file, "utf8"), item);
				results.push({ ok, kind, detail: `${page}: ${item} ${ok ? pass : miss}` });
			}
		}
	};
	perPage("sections", hasHeading, "found", "not found");
	perPage("canon", (text, re) => toRegExp(re).test(text), "still holds", "no longer matches");
	perPage("absent", (text, re) => !toRegExp(re).test(text), "is absent", "matches but must not");
	return results;
}

function defaultTemplates(root: string): string {
	const local = join(root, "wiki/templates");
	return existsSync(local) ? local : join(repoRoot, "wiki/templates");
}

/** Runs `node src/cli.ts check --json` from this repository over the vault. Skips when the gate does not exist yet. */
export function runGate(vault: string, root: string, templates: string): Result[] {
	const cli = join(repoRoot, "src/cli.ts");
	if (!existsSync(cli)) return [{ ok: true, skip: true, kind: "gate", detail: "src/cli.ts not found, so the gate was not run" }];
	const run = spawnSync("node", [cli, "check", "--json", "--vault", vault, "--root", root, "--templates", templates], { cwd: repoRoot, encoding: "utf8" });
	let report: { ok: boolean; findings: { path: string; line: number; layer: string; rule: string; message: string }[]; counts: { pages: number } };
	try {
		report = JSON.parse(run.stdout);
	} catch {
		return [{ ok: false, kind: "gate", detail: `no JSON from the gate (exit ${run.status}): ${(run.stderr || run.stdout).trim().slice(0, 300)}` }];
	}
	if (run.status === 0 && report.ok) return [{ ok: true, kind: "gate", detail: `0 findings across ${report.counts.pages} pages` }];
	const results: Result[] = report.findings.slice(0, 20).map((f) => ({ ok: false, kind: "gate", detail: `${f.path}:${f.line} ${f.layer}/${f.rule} ${f.message}` }));
	if (report.findings.length > 20) results.push({ ok: false, kind: "gate", detail: `and ${report.findings.length - 20} more findings` });
	return results.length > 0 ? results : [{ ok: false, kind: "gate", detail: `gate exited ${run.status} with no findings listed` }];
}

function main(argv: string[]): number {
	let parsed;
	try {
		parsed = parseArgs({
			args: argv,
			allowPositionals: true,
			options: {
				root: { type: "string" },
				templates: { type: "string" },
				cases: { type: "string" },
				help: { type: "boolean", short: "h" },
			},
		});
	} catch (error) {
		process.stderr.write(`${(error as Error).message}\n\n${USAGE}`);
		return 2;
	}
	if (parsed.values.help) {
		process.stdout.write(USAGE);
		return 0;
	}
	try {
		const [skill, caseId, vaultArg] = parsed.positionals;
		if (!skill || !caseId || !vaultArg || parsed.positionals.length > 3) fail("expected <skill> <case-id> <vault-dir>");
		const vault = resolve(vaultArg);
		if (!existsSync(vault) || !statSync(vault).isDirectory()) fail(`vault directory not found: ${vaultArg}`);
		const casesFile = resolve(parsed.values.cases ?? join(repoRoot, ".agents/skills", skill, "evals/cases.yaml"));
		const cases = loadCases(casesFile);
		const found = cases.find((c) => c.id === caseId);
		if (!found) fail(`no case "${caseId}" in ${relative(process.cwd(), casesFile)}; cases: ${cases.map((c) => c.id).join(", ")}`);
		if (readdirSync(vault).length === 0) fail(`vault directory is empty: ${vaultArg}`);
		const root = resolve(parsed.values.root ?? dirname(vault));
		const templates = resolve(parsed.values.templates ?? defaultTemplates(root));

		const results = [...runChecks(found.checks ?? {}, vault), ...runGate(vault, root, templates)];
		for (const r of results) process.stdout.write(`${r.skip ? "SKIP" : r.ok ? "PASS" : "FAIL"}  ${r.kind}  ${r.detail}\n`);
		const failed = results.filter((r) => !r.ok).length;
		const skipped = results.filter((r) => r.skip).length;
		process.stdout.write(`${failed === 0 ? "ok" : "failed"}: ${results.length - failed - skipped} passed, ${failed} failed, ${skipped} skipped for ${skill}/${caseId}\n`);
		return failed === 0 ? 0 : 1;
	} catch (error) {
		if (!(error instanceof UsageError)) throw error;
		process.stderr.write(`error: ${error.message}\n\n${USAGE}`);
		return 2;
	}
}

if (import.meta.main) process.exitCode = main(process.argv.slice(2));
