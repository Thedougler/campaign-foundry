/**
 * The prose scope (issue #66): the Wiki gate and nothing else. `cf check` is the one gate
 * (ADR 0015); this scope shells out to it, never forking its rules, and renders its findings
 * in the shared one-line format. `--fix` passes straight through to `cf check --fix`, whose
 * fixes are idempotent by construction.
 */

import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { capture, markdownUnder, REPO_ROOT, underDir } from "./core.ts";
import type { LintFinding, ScopeModule, ScopeResult, ScopeRun } from "./types.ts";

/** `cf check --json` output shape (src/check/output.ts `formatJson`). */
interface CfCheckJson {
	ok: boolean;
	findings: { layer: string; rule: string; path: string; line: number; message: string }[];
	fixes: { layer: string; rule: string; path: string; description: string }[];
}

/** Markdown files under `wiki/` (the vault, `CONTEXT.md` Wiki): the prose domain. */
function wikiMarkdown(paths: string[]): string[] {
	const files: string[] = [];
	for (const path of paths) {
		if (underDir(path, "wiki") && path.endsWith(".md")) files.push(path);
	}
	return [...new Set(files)].sort();
}

async function select(paths: string[]): Promise<string[]> {
	const selected: string[] = [];
	for (const path of paths) {
		if (!existsSync(join(REPO_ROOT, path))) throw new Error(`no such path: ${path}`);
		if (statSync(join(REPO_ROOT, path)).isDirectory()) selected.push(...(await markdownUnder(path)));
		else selected.push(path);
	}
	return wikiMarkdown(selected);
}

async function run(opts: ScopeRun): Promise<ScopeResult> {
	const files = opts.files ?? (await markdownUnder("wiki"));
	const args = ["src/cli.ts", "check", "--json", ...(opts.fix ? ["--fix"] : []), ...(opts.files ?? [])];
	const cf = await capture(process.execPath, args);
	let parsed: CfCheckJson | undefined;
	try {
		parsed = JSON.parse(cf.stdout) as CfCheckJson;
	} catch {
		return {
			files,
			findings: [],
			fixes: [],
			failures: [
				`cf check failed (exit ${cf.status}): ${(cf.stderr || cf.stdout).trim().split("\n").slice(0, 4).join(" | ")}`,
			],
		};
	}
	const findings: LintFinding[] = parsed.findings.map((f) => ({
		path: f.path,
		line: f.line,
		tool: f.layer,
		rule: f.rule,
		message: f.message,
	}));
	const fixes = parsed.fixes.map((f) => `${f.path} ${f.layer}/${f.rule} ${f.description}`);
	const failures =
		cf.status === 2
			? [`cf check usage error (exit 2): ${(cf.stderr || cf.stdout).trim().split("\n").slice(0, 4).join(" | ")}`]
			: [];
	return { files, findings, fixes, failures };
}

export const proseScope: ScopeModule = { select, all: () => markdownUnder("wiki"), run };
