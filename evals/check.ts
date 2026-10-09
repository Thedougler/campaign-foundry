/** Deterministic case checks against live Wiki text overlaid with Runner output files. */
import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import YAML from "yaml";
import { narrationLayer } from "../src/check/layers/narration.ts";
import { styleLayer } from "../src/check/layers/style.ts";
import { UsageError } from "../src/check/errors.ts";
import type { Finding } from "../src/check/types.ts";
import { buildVault, readVaultFiles } from "../src/vault/vault.ts";
import type { Template } from "../src/vault/types.ts";
import { readRunnerOutput, wikiPagePath } from "./outputs.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const USAGE = `Usage: bun run eval:check <skill> <case-id> <vault-dir> --output <dir> [--cases <file>]

Runs deterministic checks against live Wiki text plus output pages and deletions.
Options:
  --output <dir>  Runner deliverables directory containing reply.md (required)
  --cases <file>  cases file (default: .agents/skills/<skill>/evals/cases.yaml)
  -h, --help      show this help

cases.yaml is a list of { id, prompt, source_pages, raw_sources, checks, rubrics }.
Checks: pages (written by the run), sections, canon regexes and absent regexes. The .md extension is optional.
After the case checks, the production gate (style and narration layers) runs read-only
over the Outcome; findings on output pages become gate results — an error fails, a
warning is reported (WARN) and passes.
Exit codes: 0 all passed, 1 a quality check failed, 2 usage/cases/output error.

Example:
  bun run eval:check theatre-of-the-mind fatespinner-chat wiki --output /tmp/runner-output
`;

export interface Checks {
  pages?: string[];
  sections?: Record<string, string[]>;
  canon?: Record<string, string[]>;
  absent?: Record<string, string[]>;
}

export interface Case {
  id: string;
  prompt: string;
  source_pages?: string[];
  raw_sources?: string[];
  checks?: Checks;
  rubrics?: string[];
}

export interface Result {
  ok: boolean;
  skip?: boolean;
  /** Gate results carry the finding's severity: a warning is reported and passes, an error fails. */
  severity?: Finding["severity"];
  kind: string;
  detail: string;
}

const CHECK_KEYS = ["pages", "sections", "canon", "absent"];

function fail(message: string, hint = ""): never {
  throw new UsageError(message, hint);
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
    for (const key of Object.keys(item)) {
      if (!["id", "prompt", "source_pages", "raw_sources", "checks", "rubrics"].includes(key)) fail(`${where}: unknown case field "${key}"`);
    }
    for (const key of ["source_pages", "raw_sources"]) {
      if (item[key] !== undefined && !isStringList(item[key])) fail(`${where}: ${key} must be a list of paths`);
    }
    for (const path of (item.source_pages as string[] | undefined) ?? []) wikiPagePath(path);
    for (const path of (item.raw_sources as string[] | undefined) ?? []) {
      if (!/^(raw|archive)\/.+/u.test(path)) fail(`${where}: raw_sources must identify raw/ or archive/ inputs`);
      wikiPagePath(path);
    }
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

export interface Outcome {
  readPage: (path: string) => string | undefined;
  /** True when the run itself returned this page, so a live page left untouched does not count as a deliverable. */
  wrote: (path: string) => boolean;
}

/** Omitted pages remain live; output pages and recorded deletions shadow live files. */
export function createOutcome(vault: string, outputRoot: string): Outcome {
  const overlay = readRunnerOutput(outputRoot);
  const deleted = new Set(overlay.deleted);
  return {
    readPage(path) {
      const page = wikiPagePath(path);
      if (deleted.has(page)) return undefined;
      if (overlay.pages.has(page)) return overlay.pages.get(page)!;
      const file = join(vault, page);
      return existsSync(file) && statSync(file).isFile() ? readFileSync(file, "utf8") : undefined;
    },
    wrote: (path) => overlay.pages.has(wikiPagePath(path)),
  };
}

/**
 * The production gate (`cf check`'s style and narration layers, ADR 0015) over the Outcome: the live
 * Wiki with the run's output pages overlaid and its recorded deletions shadowing live pages. Read-only:
 * no `--fix`, and Vale's scratch lives in a temp directory. Findings are scoped to the run's output
 * pages — the Runner's writing — so live-Wiki noise never lands on a case. Setup failures (no Vale, no
 * synced ai-tells) throw `UsageError` and exit 2, an execution error rather than a quality failure.
 */
export async function runGate(vaultDir: string, outputRoot: string): Promise<Finding[]> {
  const overlay = readRunnerOutput(outputRoot);
  const scratch = realpathSync(mkdtempSync(join(tmpdir(), "eval-gate-")));
  try {
    const files = await readVaultFiles(vaultDir);
    for (const page of overlay.deleted) files.markdown.delete(page);
    for (const [page, text] of overlay.pages) files.markdown.set(page, text);
    const ctx = {
      vault: buildVault(vaultDir, files),
      // The style and narration layers read no templates.
      templates: { byName: new Map<string, Template>(), types: new Map<string, string[]>() },
      root: scratch,
      display: (vaultPath: string): string => vaultPath,
    };
    const found = (await Promise.all([styleLayer.run(ctx), narrationLayer.run(ctx)])).flat();
    return found
      .filter((finding) => overlay.pages.has(finding.path))
      .sort((a, b) => a.path.localeCompare(b.path) || a.line - b.line || a.layer.localeCompare(b.layer) || a.rule.localeCompare(b.rule));
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}

export function toRegExp(source: string): RegExp {
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

/** Failed quality checks are results, not execution errors. */
export function runChecks(checks: Checks, outcome: Outcome): Result[] {
  const results: Result[] = [];
  for (const page of checks.pages ?? []) {
    const ok = outcome.wrote(page);
    results.push({ ok, kind: "pages", detail: `${page} ${ok ? "written by the run" : "not written by the run"}` });
  }
  const perPage = (kind: "sections" | "canon" | "absent", test: (text: string, item: string) => boolean, pass: string, miss: string) => {
    for (const [page, items] of Object.entries(checks[kind] ?? {})) {
      const text = outcome.readPage(page);
      for (const item of items) {
        if (text === undefined) {
          results.push({ ok: false, kind, detail: `${page}: page is missing (${item})` });
          continue;
        }
        const ok = test(text, item);
        results.push({ ok, kind, detail: `${page}: ${item} ${ok ? pass : miss}` });
      }
    }
  };
  perPage("sections", hasHeading, "found", "not found");
  perPage("canon", (text, re) => toRegExp(re).test(text), "still holds", "no longer matches");
  perPage("absent", (text, re) => !toRegExp(re).test(text), "is absent", "matches but must not");
  return results;
}


/** The CLI entry: parse args, run the case's checks and the gate, print PASS/FAIL/WARN lines. Exported for tests. */
export async function main(argv: string[]): Promise<number> {
  let parsed;
  try {
    parsed = parseArgs({
      args: argv,
      allowPositionals: true,
      options: {
        output: { type: "string" },
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
    if (!parsed.values.output) fail("--output <dir> is required; see --help for an example");
    const outputRoot = resolve(parsed.values.output);
    const results = runChecks(found.checks ?? {}, createOutcome(vault, outputRoot));
    for (const finding of await runGate(vault, outputRoot)) {
      results.push({ ok: finding.severity !== "error", severity: finding.severity, kind: "gate", detail: `${finding.rule} ${finding.path}:${finding.line} ${finding.message}` });
    }
    for (const r of results) process.stdout.write(`${r.skip ? "SKIP" : !r.ok ? "FAIL" : r.severity === "warning" ? "WARN" : "PASS"}  ${r.kind}  ${r.detail}\n`);
    const failed = results.filter((r) => !r.ok).length;
    const skipped = results.filter((r) => r.skip).length;
    const warnings = results.filter((r) => r.severity === "warning").length;
    process.stdout.write(`${failed === 0 ? "ok" : "failed"}: ${results.length - failed - skipped - warnings} passed, ${failed} failed, ${skipped} skipped, ${warnings} gate warnings for ${skill}/${caseId}\n`);
    return failed === 0 ? 0 : 1;
  } catch (error) {
    if (!(error instanceof Error)) throw error;
    const hint = error instanceof UsageError && error.hint ? `\n  ${error.hint}` : "";
    process.stderr.write(`error: ${error.message}${hint}\n\n${USAGE}`);
    return 2;
  }
}

if (import.meta.main) void main(process.argv.slice(2)).then((code) => { process.exitCode = code; });
