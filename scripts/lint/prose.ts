/**
 * The prose scope (issue #66): the Wiki gate, plus the same prose layers for named drafts.
 * `cfcli check` is the one Wiki gate (ADR 0015); `cfcli style` checks text outside the Wiki.
 * This scope shells out to both, never forking their rules, and renders their findings in
 * the shared one-line format. `--fix` passes through to the Wiki gate's mechanical fixes.
 */

import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { capture, markdownUnder, REPO_ROOT, underDir } from "./core.ts";
import type { ScopeModule, ScopeResult, ScopeRun } from "./types.ts";
import { repoIgnore } from "./repo-files.ts";

/** `cfcli check --json` output shape (src/check/output.ts `formatJson`). */
interface CfCheckJson {
	ok: boolean;
	counts: { pages: number };
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

async function select(paths: string[], explicit = false): Promise<string[]> {
	const selected: string[] = [];
	const ignored = repoIgnore(REPO_ROOT);
	for (const path of paths) {
		if (!existsSync(join(REPO_ROOT, path))) throw new Error(`no such path: ${path}`);
		if (statSync(join(REPO_ROOT, path)).isDirectory()) {
			selected.push(...wikiMarkdown(await markdownUnder(path)).filter((file) => !ignored(file)));
		} else if (explicit) {
			if (!path.endsWith(".md")) throw new Error(`cannot check non-markdown file: ${path}`);
			selected.push(path);
		} else selected.push(...wikiMarkdown([path]));
	}
	return [...new Set(selected)].sort();
}

async function run(opts: ScopeRun): Promise<ScopeResult> {
	const files = opts.files ?? (await markdownUnder("wiki"));
	const result: ScopeResult = { files, findings: [], fixes: [], failures: [] };
	const wiki = wikiMarkdown(files);
	const drafts = files.filter((file) => !underDir(file, "wiki"));
	for (const [command, targets] of [
		["check", wiki],
		["style", drafts],
	] as const) {
		if (targets.length === 0) continue;
		const args = [
			"src/cli.ts",
			command,
			"--json",
			...(opts.fix && command === "check" ? ["--fix"] : []),
			...(opts.files === null ? [] : targets),
		];
		const cf = await capture(process.execPath, args);
		let parsed: CfCheckJson | undefined;
		try {
			parsed = JSON.parse(cf.stdout) as CfCheckJson;
		} catch {
			// Tool failures may return text instead of the JSON report.
		}
		if (parsed === undefined || (cf.status !== 0 && cf.status !== 1)) {
			result.failures.push(
				`cfcli ${command} failed for ${targets.join(", ")} (exit ${cf.status}): ${(cf.stderr || cf.stdout).trim().split("\n").slice(0, 4).join(" | ")}`,
			);
			continue;
		}
		result.findings.push(
			...parsed.findings.map((f) => ({
				path: f.path,
				line: f.line,
				tool: f.layer,
				rule: f.rule,
				message: f.message,
			})),
		);
		result.fixes.push(...parsed.fixes.map((f) => `${f.path} ${f.layer}/${f.rule} ${f.description}`));
		if (opts.files !== null && parsed.counts.pages !== targets.length) {
			result.failures.push(`cfcli ${command} did not check every requested file: ${targets.join(", ")}`);
		}
	}
	return result;
}

export const proseScope: ScopeModule = { select, all: () => markdownUnder("wiki"), run };
