import { execFileSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { BACKUP_ROOTS, walkBackup } from "../../src/backup/files.ts";
import { diffSince, hashAt, headCommit, usableBase } from "../../src/backup/git.ts";
import { contentHash } from "../../src/backup/files.ts";
import { lfsPointer, OID, repo } from "./helpers.ts";

const W = "wiki/The Shattered Sea";

function git(root: string, ...args: string[]): string {
	return execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@t", "-c", "commit.gpgsign=false", ...args], { cwd: root, encoding: "utf8" }).trim();
}

describe("backup git diff", () => {
	it("names changed, added and deleted files under the roots since a commit, renames as delete plus add", () => {
		const root = repo({ [`${W}/a.md`]: "a\n", [`${W}/b.md`]: "b\n", [`${W}/c.md`]: "c\n", "src/x.ts": "x\n", ".agents/skills/s/SKILL.md": "s\n", ".omp/skills/run-evals/SKILL.md": "r\n", ".agents/skills/run-evals": { link: "../../.omp/skills/run-evals" } });
		git(root, "init", "-q", "-b", "main");
		git(root, "add", "-A");
		git(root, "commit", "-qm", "one");
		const base = headCommit(root) ?? "";
		writeFileSync(join(root, W, "a.md"), "a2\n");
		rmSync(join(root, W, "b.md"));
		git(root, "mv", `${W}/c.md`, `${W}/c2.md`);
		writeFileSync(join(root, ".agents/skills/s/new.yaml"), "n: 1\n");
		writeFileSync(join(root, "src/x.ts"), "y\n");
		writeFileSync(join(root, ".omp/skills/run-evals/SKILL.md"), "r2\n");
		git(root, "add", "-A");
		git(root, "commit", "-qm", "two");
		expect(usableBase(root, base)).toBe(true);
		expect(usableBase(root, "0".repeat(40))).toBe(false);
		const { links } = walkBackup(root);
		expect(links).toEqual([{ alias: ".agents/skills/run-evals", target: ".omp/skills/run-evals" }]);
		const { changed, deleted } = diffSince(root, base, BACKUP_ROOTS, links);
		expect([...changed].sort()).toEqual([".agents/skills/run-evals/SKILL.md", ".agents/skills/s/new.yaml", `${W}/a.md`, `${W}/c2.md`]);
		expect([...deleted].sort()).toEqual([`${W}/b.md`, `${W}/c.md`]);
	});

	it("gives a file's content hash at a commit, as an LFS object id for a pointer and through a followed symlink", () => {
		const root = repo({ [`${W}/a.md`]: "a\n", [`${W}/Map.png`]: lfsPointer(), ".omp/skills/run-evals/SKILL.md": "r\n", ".agents/skills/run-evals": { link: "../../.omp/skills/run-evals" } });
		git(root, "init", "-q", "-b", "main");
		git(root, "add", "-A");
		git(root, "commit", "-qm", "one");
		const one = headCommit(root) ?? "";
		writeFileSync(join(root, W, "a.md"), "a2\n");
		git(root, "commit", "-qam", "two");
		const links = [{ alias: ".agents/skills/run-evals", target: ".omp/skills/run-evals" }];
		expect(hashAt(root, one, `${W}/a.md`)).toBe(contentHash(Buffer.from("a\n")).hash);
		expect(hashAt(root, one.slice(0, 7), `${W}/a.md`)).toBe(contentHash(Buffer.from("a\n")).hash);
		expect(hashAt(root, headCommit(root) ?? "", `${W}/a.md`)).toBe(contentHash(Buffer.from("a2\n")).hash);
		expect(hashAt(root, one, `${W}/Map.png`)).toBe(OID);
		expect(hashAt(root, one, ".agents/skills/run-evals/SKILL.md", links)).toBe(contentHash(Buffer.from("r\n")).hash);
		expect(hashAt(root, one, `${W}/missing.md`)).toBeUndefined();
		expect(hashAt(root, "0".repeat(40), `${W}/a.md`)).toBeUndefined();
		expect(hashAt(root, "main; rm -rf /", `${W}/a.md`)).toBeUndefined();
	});
});
