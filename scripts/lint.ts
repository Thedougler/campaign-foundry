/**
 * `bun run lint` (issue #66): one thin, predictable, token-efficient entry over three scopes.
 *
 *   lint [agents|prose|code] [--fix] [--all] [--json] [paths…]
 *
 * With no paths, each scope checks the files changed against HEAD plus untracked files, filtered
 * to its domain; `--all` checks the whole domain. Output is one line per finding
 * (`path:line[:col] tool/rule message`) and one summary line per scope, quiet on success.
 * Exit 0 clean, 1 findings, 2 usage or tool error. The wrapper reports; it never decides.
 */

import { relative, resolve, sep } from "node:path";
import { changedFiles, formatFinding, REPO_ROOT, scopeSummary, sortByLocation } from "./lint/core.ts";
import { agentsScope } from "./lint/agents.ts";
import { codeScope } from "./lint/code.ts";
import { proseScope } from "./lint/prose.ts";
import type { LintFinding, ScopeModule, ScopeResult, ScopeRun } from "./lint/types.ts";

const SCOPES: Record<string, ScopeModule> = { agents: agentsScope, prose: proseScope, code: codeScope };

const HELP = `Lint the repo: one line per finding, one summary per scope, quiet on success.

Usage: bun run lint [agents|prose|code] [--fix] [--all] [--json] [paths...]

Scopes (no scope given runs all three; each takes only paths in its domain):
  agents  objective issues in agent-facing text: markdownlint, cspell (en-GB), broken
          relative links, anchors, \`skill://\` and backtick file references, skill frontmatter
          schema (name/description, limits), the always-loaded chain's \`@\` imports with its
          word count reported (ADR 0030), and the style gate over content-facing agent text (ADR 0020)
  prose   the Wiki gate: \`cf check\` over wiki/ paths (ADR 0015), \`--fix\` runs its mechanical fixes
  code    Biome (lint + format) and tsc for TypeScript, ruff (check + format) for Python

Options:
  --fix   apply every tool's safe, idempotent auto-fixes, then report what remains
  --all   check the scope's whole domain instead of changed + untracked files
  --json  one compact JSON object instead of text
  -h, --help

Files: no paths means the files changed against HEAD plus untracked, filtered per scope.
Exit: 0 clean, 1 findings, 2 usage error or tool failure.

Examples:
  bun run lint                         # changed + untracked files, all three scopes
  bun run lint src/check/run.ts        # one file: the code scope takes it
  bun run lint agents --all            # every agent-facing file
  bun run lint prose wiki/shattered-sea/NPCs wiki/dm-settings.md
  bun run lint --fix agents .omp/skills/lint
  bun run fix                          # same as: bun run lint --fix
  bun run lint --json src/ | head -5`;

interface Args {
	scope?: string;
	fix: boolean;
	all: boolean;
	json: boolean;
	paths: string[];
}

function usageError(message: string, example?: string): never {
	process.stderr.write(
		`Error: ${message}\n${example ? `Example: ${example}\n` : ""}Run bun run lint --help for the full usage.\n`,
	);
	process.exit(2);
}

function parseArgs(argv: string[]): Args {
	const args: Args = { fix: false, all: false, json: false, paths: [] };
	for (const arg of argv) {
		if (arg === "--fix") args.fix = true;
		else if (arg === "--all" || arg === "-a") args.all = true;
		else if (arg === "--json") args.json = true;
		else if (arg === "--" || arg.startsWith("-"))
			usageError(`unknown option ${arg}.`, "bun run lint agents --fix .omp/skills");
		else if (args.scope === undefined && !args.paths.length && (arg === "agents" || arg === "prose" || arg === "code"))
			args.scope = arg;
		else args.paths.push(arg);
	}
	if (args.all && args.paths.length > 0) usageError("--all takes no paths.", "bun run lint code --all");
	return args;
}

function emptyResult(files: string[]): ScopeResult {
	return { files, findings: [], fixes: [], failures: [] };
}
/** Runs one scope over its file set; an empty selection skips its tools with an empty result. */
async function runScope(scope: ScopeModule, opts: ScopeRun, selected: string[]): Promise<ScopeResult> {
	if (selected.length === 0 && opts.files !== null) return emptyResult([]);
	return scope.run({ ...opts, files: opts.files === null ? null : selected });
}

function jsonFinding(f: LintFinding) {
	return f.col === undefined ? { path: f.path, line: f.line, tool: f.tool, rule: f.rule, message: f.message } : f;
}

const main = async (): Promise<void> => {
	const argv = process.argv.slice(2);
	if (argv.includes("-h") || argv.includes("--help")) {
		process.stdout.write(`${HELP}\n`);
		return;
	}
	const args = parseArgs(argv);
	for (let index = 0; index < args.paths.length; index++) {
		const path = relative(REPO_ROOT, resolve(process.cwd(), args.paths[index]!));
		if (path === ".." || path.startsWith(`..${sep}`)) usageError(`path is outside the repo: ${args.paths[index]}`);
		args.paths[index] = path === "" ? "." : path;
	}
	const names = args.scope === undefined ? ["agents", "prose", "code"] : [args.scope];
	const changed = args.all || args.paths.length > 0 ? [] : await changedFiles();

	const results: { scope: string; result: ScopeResult; ran: boolean }[] = [];
	for (const name of names) {
		const scope = SCOPES[name]!;
		try {
			const selected = args.all ? await scope.all() : await scope.select(args.paths.length > 0 ? args.paths : changed);
			const result = await runScope(scope, { fix: args.fix, files: args.all ? null : selected }, selected);
			results.push({ scope: name, result, ran: selected.length > 0 || args.all });
		} catch (error) {
			results.push({
				scope: name,
				result: {
					files: [],
					findings: [],
					fixes: [],
					failures: [String(error instanceof Error ? error.message : error)],
				},
				ran: false,
			});
		}
	}

	if (args.json) {
		const payload = {
			ok: results.every(({ result }) => result.findings.length === 0 && result.failures.length === 0),
			scopes: results.map(({ scope, result, ran }) => ({
				scope,
				ok: result.findings.length === 0 && result.failures.length === 0,
				files: ran ? result.files.length : 0,
				findings: result.findings.map(jsonFinding),
				fixes: result.fixes.length,
				notes: result.notes ?? [],
				failures: result.failures,
			})),
		};
		process.stdout.write(`${JSON.stringify(payload)}\n`);
	} else {
		for (const { scope, result, ran } of results) {
			for (const fix of result.fixes) process.stdout.write(`fixed  ${fix}\n`);
			for (const finding of sortByLocation(result.findings)) process.stdout.write(`${formatFinding(finding)}\n`);
			if (result.findings.length > 0 || result.fixes.length > 0) process.stdout.write("\n");
			process.stdout.write(`${scopeSummary(scope, result, ran)}\n`);
			for (const note of result.notes ?? []) process.stdout.write(`${scope}: ${note}\n`);
			for (const failure of result.failures) process.stderr.write(`${scope}: error: ${failure}\n`);
		}
	}
	const findings = results.reduce((total, { result }) => total + result.findings.length, 0);
	const failures = results.reduce((total, { result }) => total + result.failures.length, 0);
	process.exitCode = failures > 0 ? 2 : findings > 0 ? 1 : 0;
};

process.on("unhandledRejection", (error) => {
	process.stderr.write(`lint: ${(error as Error).stack ?? String(error)}\n`);
	process.exit(2);
});

void main();
