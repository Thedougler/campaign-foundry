/**
 * Shared plumbing for `bun run lint` (issue #66): finding types, the repo-root and
 * changed-file sets, subprocess capture, and the one-line-per-finding rendering every
 * scope reports through. Scope modules live beside this file and implement `ScopeModule`.
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { glob } from "tinyglobby";
import type { LintFinding, ScopeResult } from "./types.ts";

/** Nearest ancestor of `from` holding `.git`, else `from`. Mirrors `findRepoRoot` in `src/commands/check.ts`. */
export function findRepoRoot(from: string): string {
	for (let dir = from; ; dir = dirname(dir)) {
		if (existsSync(join(dir, ".git"))) return dir;
		if (dirname(dir) === dir) return dir;
	}
}

export const REPO_ROOT = findRepoRoot(import.meta.dirname ?? process.cwd());

/** Runs `bin` with `args`, capturing stdout/stderr; `status` is the exit code, `-1` on failure to spawn. */
export function capture(
	bin: string,
	args: string[],
	opts: { cwd?: string } = {},
): Promise<{ status: number; stdout: string; stderr: string }> {
	const { promise, resolve, reject } = Promise.withResolvers<{ status: number; stdout: string; stderr: string }>();
	const child = spawn(bin, args, { cwd: opts.cwd ?? REPO_ROOT, env: process.env });
	const stdout: Buffer[] = [];
	const stderr: Buffer[] = [];
	child.stdout.on("data", (chunk: Buffer) => stdout.push(chunk));
	child.stderr.on("data", (chunk: Buffer) => stderr.push(chunk));
	child.on("error", reject);
	child.on("close", (status) =>
		resolve({
			status: status ?? -1,
			stdout: Buffer.concat(stdout).toString("utf8"),
			stderr: Buffer.concat(stderr).toString("utf8"),
		}),
	);
	return promise;
}

/** A binary from the repo's `node_modules/.bin`, as an absolute path. */
export function binPath(name: string): string {
	return join(REPO_ROOT, "node_modules", ".bin", name);
}

/**
 * Files changed against HEAD plus untracked files (issue #66 default file set), NUL-separated
 * to survive spaces. Deleted paths drop out (`--diff-filter`); the scopes filter by domain.
 */
export async function changedFiles(): Promise<string[]> {
	const diff = await capture("git", ["diff", "--name-only", "--diff-filter=ACMRT", "-z", "HEAD"]);
	const untracked = await capture("git", ["ls-files", "--others", "--exclude-standard", "-z"]);
	if (diff.status !== 0 || untracked.status !== 0) {
		throw new Error(`git failed: ${diff.stderr || untracked.stderr}`);
	}
	return [...new Set([...diff.stdout.split("\0"), ...untracked.stdout.split("\0")])].filter((p) => p !== "");
}

/** Every `*.md` file under a repo-relative directory, repo-relative and sorted; a missing directory is empty. */
export async function markdownUnder(dir: string): Promise<string[]> {
	const files = await glob(["**/*.md"], { cwd: join(REPO_ROOT, dir), onlyFiles: true, dot: true });
	return files.map((f) => join(dir, f)).sort();
}

/** Whether `path` (repo-relative, `/`-separated) sits under `dir` or is `dir` itself. */
export function underDir(path: string, dir: string): boolean {
	return path === dir || path.startsWith(`${dir}/`);
}

export function sortByLocation(findings: LintFinding[]): LintFinding[] {
	return findings.toSorted(
		(a, b) =>
			a.path.localeCompare(b.path) ||
			a.line - b.line ||
			(a.col ?? 0) - (b.col ?? 0) ||
			a.tool.localeCompare(b.tool) ||
			a.rule.localeCompare(b.rule),
	);
}

/** `path:line[:col] tool/rule message`, the one line per finding every scope prints. */
export function formatFinding(f: LintFinding): string {
	const at = f.col === undefined ? `${f.path}:${f.line}` : `${f.path}:${f.line}:${f.col}`;
	return `${at} ${f.tool}/${f.rule} ${f.message.replace(/\s*\r?\n\s*/g, " ")}`;
}

/** The per-scope summary line: `ok (N files)` or `N findings in M files`, fixes appended. */
export function scopeSummary(scope: string, result: ScopeResult, ran: boolean): string {
	const affectedFiles = new Set(result.findings.map((finding) => finding.path)).size;
	const checkedFiles = ran ? result.files.length : 0;
	const base =
		result.failures.length > 0
			? `${scope}: ${result.failures.length} tool failure${result.failures.length === 1 ? "" : "s"}, ${result.findings.length} findings`
			: result.findings.length === 0
				? `${scope}: ok (${checkedFiles} file${checkedFiles === 1 ? "" : "s"})`
				: `${scope}: ${result.findings.length} finding${result.findings.length === 1 ? "" : "s"} in ${affectedFiles} file${affectedFiles === 1 ? "" : "s"}`;
	return result.fixes.length > 0 ? `${base}, ${result.fixes.length} fixed` : base;
}
