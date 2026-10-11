/**
 * Retired names (ADR 0032): the CLI's old `cf` script name, flagged in every tracked or untracked
 * text file in the selection, whatever its scope, so a caller the rename missed shows up with
 * the fix in its message. Frozen provenance and append-only history keep the old name.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { capture, REPO_ROOT, underDir } from "./core.ts";
import type { LintFinding, ScopeResult } from "./types.ts";

/** `bun run cf …`, a code-spanned `cf` command, or an argv spelling the old script. */
const RETIRED_CF = /\bbun run cf\b(?!cli)|`cf[` ]|"run", "cf"/g;
/** The ADR recording the rename and this module quote the old name on purpose. */
const QUOTES_OLD_NAME = new Set(["docs/adr/0032-cf-renamed-cfcli.md", "scripts/lint/retired.ts"]);
const FROZEN_DIRS = ["prior", "archive", "raw"];
const FROZEN_FILES = new Set(["legacy-import-report.json", "bun.lock"]);

function inDomain(path: string): boolean {
	return (
		!QUOTES_OLD_NAME.has(path) &&
		!FROZEN_FILES.has(path) &&
		!path.endsWith("/log.md") &&
		!FROZEN_DIRS.some((dir) => underDir(path, dir))
	);
}

/** Scans `paths` (files or directories, repo-relative), or every visible file when `null`. */
export async function retiredNames(paths: string[] | null): Promise<ScopeResult> {
	const out = await capture("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"], {
		cwd: REPO_ROOT,
	});
	if (out.status !== 0) return { files: [], findings: [], fixes: [], failures: [`git ls-files: ${out.stderr.trim()}`] };
	const files = out.stdout
		.split("\0")
		.filter((path) => path !== "" && inDomain(path))
		.filter((path) => paths === null || paths.some((p) => p === "." || underDir(path, p)));
	const findings: LintFinding[] = [];
	for (const path of files) {
		let text: string;
		try {
			text = readFileSync(join(REPO_ROOT, path), "utf8");
		} catch {
			continue;
		}
		if (text.includes("\0")) continue;
		text.split("\n").forEach((line, index) => {
			for (const match of line.matchAll(RETIRED_CF))
				findings.push({
					path,
					line: index + 1,
					col: match.index + 1,
					tool: "lint",
					rule: "retired-cf",
					message: "the `cf` script is now `cfcli` (ADR 0032): write `bun run cfcli -- <command>`",
				});
		});
	}
	return { files, findings, fixes: [], failures: [] };
}
