import { spawnSync } from "node:child_process";
import { BACKUP_ROOTS, contentHash } from "./files.ts";
import type { WalkResult } from "./files.ts";
import type { BackupGit } from "./pipeline.ts";

function git(root: string, args: string[]): { ok: boolean; stdout: string; stderr: string } {
	const r = spawnSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
	return { ok: r.status === 0, stdout: r.stdout ?? "", stderr: r.stderr ?? "" };
}

export function headCommit(root: string): string | undefined {
	const r = git(root, ["rev-parse", "HEAD"]);
	return r.ok ? r.stdout.trim() : undefined;
}

/** Moves a file with `git mv`, so a rename stays tracked; false when git cannot (untracked file, no repo). */
export function gitMove(root: string, from: string, to: string): boolean {
	return git(root, ["mv", "--", from, to]).ok;
}

/** True when `base` is a commit in this clone and an ancestor of HEAD (a force push or a shallow clone can break both). */
export function usableBase(root: string, base: string): boolean {
	return (
		git(root, ["cat-file", "-e", `${base}^{commit}`]).ok && git(root, ["merge-base", "--is-ancestor", base, "HEAD"]).ok
	);
}

/**
 * Paths under `roots` that changed between `base` and HEAD. A rename (git's detection at 30% similarity, low enough
 * to pair a page whose rename also rewrote its frontmatter and links) lands in all three sets: `renamed` maps the old
 * path to the new, so the run can move the existing page, and the delete and add stand in when it cannot. A change
 * inside a followed symlink's target is reported under the link's path (`.omp/skills/x/SKILL.md` as
 * `.agents/skills/x/SKILL.md`).
 */
export function diffSince(
	root: string,
	base: string,
	roots: readonly string[],
	links: { alias: string; target: string }[] = [],
): { changed: Set<string>; deleted: Set<string>; renamed: Map<string, string> } {
	const r = git(root, [
		"diff",
		"--name-status",
		"-M30%",
		"-z",
		base,
		"HEAD",
		"--",
		...roots,
		...links.map((l) => l.target),
	]);
	if (!r.ok) throw new Error(`git diff ${base}..HEAD failed: ${r.stderr.trim()}`);
	const alias = (raw: string): string => {
		const link = links.find((l) => raw === l.target || raw.startsWith(`${l.target}/`));
		return link ? link.alias + raw.slice(link.target.length) : raw;
	};
	const changed = new Set<string>();
	const deleted = new Set<string>();
	const renamed = new Map<string, string>();
	const parts = r.stdout.split("\0").filter(Boolean);
	for (let i = 0; i < parts.length; ) {
		const status = parts[i++] ?? "";
		if (status.startsWith("R")) {
			const from = alias(parts[i++] ?? "");
			const to = alias(parts[i++] ?? "");
			deleted.add(from);
			changed.add(to);
			renamed.set(from, to);
		} else if (status.startsWith("D")) deleted.add(alias(parts[i++] ?? ""));
		else changed.add(alias(parts[i++] ?? ""));
	}
	return { changed, deleted, renamed };
}

/** `https://github.com/<owner>/<repo>` for the origin remote (or GITHUB_SERVER_URL/GITHUB_REPOSITORY in Actions). */
export function repoWebUrl(root: string): string | undefined {
	if (process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY)
		return `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`;
	const r = git(root, ["remote", "get-url", "origin"]);
	if (!r.ok) return undefined;
	const m = /github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?\s*$/.exec(r.stdout.trim());
	return m ? `https://github.com/${m[1]}/${m[2]}` : undefined;
}

/**
 * The content hash a file had at `commit`, or undefined when the commit or file is not in this clone.
 * A page header names the commit it was written at, so a lost map gets its hashes back from git.
 */
export function hashAt(
	root: string,
	commit: string,
	path: string,
	links: { alias: string; target: string }[] = [],
): string | undefined {
	if (!/^[0-9a-f]{7,40}$/.test(commit)) return undefined;
	const link = links.find((l) => path.startsWith(`${l.alias}/`));
	const gitPath = link ? link.target + path.slice(link.alias.length) : path;
	const r = spawnSync("git", ["show", `${commit}:${gitPath}`], { cwd: root, maxBuffer: 256 * 1024 * 1024 });
	return r.status === 0 && r.stdout ? contentHash(r.stdout).hash : undefined;
}

/** The pipeline's git seam bound to one repo: every answer scoped to the backup roots and the walk's links. */
export function backupGit(root: string, walk: Pick<WalkResult, "links">): BackupGit {
	return {
		hashAt: (commit, path) => hashAt(root, commit, path, walk.links),
		usableBase: (base) => usableBase(root, base),
		diffSince: (base) => diffSince(root, base, BACKUP_ROOTS, walk.links),
		headCommit: () => headCommit(root),
		repoWebUrl: () => repoWebUrl(root),
	};
}
