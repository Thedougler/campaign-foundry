import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cf, repoRoot } from "../check/helpers.ts";
import { lfsPointer, repo } from "./helpers.ts";

const W = "wiki/shattered-sea";

describe("cf backup", () => {
	it("is listed in the top-level help and documents itself with examples", async () => {
		expect((await cf(["--help"])).stdout).toMatch(/^\s+backup\b/m);
		const help = await cf(["backup", "--help"]);
		expect(help.code).toBe(0);
		for (const flag of ["--dry-run", "--all", "--rewrite", "--since <commit>", "--parent <page>", "--map <file>", "--tree", "--json", "--root <dir>"]) expect(help.stdout).toContain(flag);
		expect(help.stdout).toContain("Examples:");
	});

	it("dry-runs without a token, printing counts, the estimate and the planned tree", async () => {
		const root = repo({
			[`${W}/hot.md`]: "---\ntitle: The next session\n---\n# Hot\n",
			[`${W}/attachments/Map.png`]: lfsPointer(),
			".agents/skills/npc-design/SKILL.md": "# NPC design\n",
			".claude/skills/npc-design": { link: "../../.agents/skills/npc-design" },
		});
		const text = await cf(["backup", "--dry-run", "--tree", "--root", root], root);
		expect(text.code).toBe(0);
		expect(text.stdout).toContain("would back up (all: first run: the map has no synced commit)");
		expect(text.stdout).toContain("2 Markdown, 0 other text, 1 images");
		expect(text.stdout).toContain("1 as LFS pointers here");
		expect(text.stdout).toContain("+     The next session");
		expect(text.stdout).toContain("(dry run: nothing sent to Notion, and only the map read");
		const json = await cf(["backup", "--dry-run", "--json", "--root", root], root);
		const report = JSON.parse(json.stdout) as { ok: boolean; scope: string; create: { root: boolean; dirs: number; files: number }; estimate: { skills: number } };
		expect(report).toMatchObject({ ok: true, scope: "all", create: { root: true, dirs: 6, files: 3 }, estimate: { skills: 1 } });
	});

	it("exits 2 without NOTION_TOKEN, and on a bad parent page", async () => {
		const root = repo({ [`${W}/hot.md`]: "---\ntitle: The next session\n---\n# Hot\n" });
		// An empty NOTION_TOKEN also keeps a developer's .env token from loading (dotenv never overrides a set variable).
		const saved = process.env.NOTION_TOKEN;
		process.env.NOTION_TOKEN = "";
		const noToken = await cf(["backup", "--root", root], root);
		if (saved === undefined) delete process.env.NOTION_TOKEN;
		else process.env.NOTION_TOKEN = saved;
		expect(noToken.code).toBe(2);
		expect(noToken.stderr).toContain("NOTION_TOKEN is not set");
		const badParent = await cf(["backup", "--dry-run", "--parent", "nope", "--root", root], root);
		expect(badParent.code).toBe(2);
		expect(badParent.stderr).toContain("not a Notion page id");
	});
});

describe("cf backup after the PR that ran it merges", () => {
	it.each([
		["merge", "diff", "changes since"],
		["squash", "all", "comparing content hashes"],
	] as const)("a %s merge leaves a run that writes only the file changed since the sync (%s scope)", async (style, scope, why) => {
		const { execFileSync } = await import("node:child_process");
		const { mkdirSync, writeFileSync } = await import("node:fs");
		const { walkBackup } = await import("../../src/backup/files.ts");
		const { headCommit } = await import("../../src/backup/git.ts");
		const { MAP_PATH, serializeMap } = await import("../../src/backup/map.ts");
		const { DEFAULT_PARENT } = await import("../../src/commands/backup.ts");
		const git = (root: string, ...args: string[]): string => execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@t", "-c", "commit.gpgsign=false", ...args], { cwd: root, encoding: "utf8" }).trim();
		const root = repo({ [`${W}/a.md`]: "---\ntitle: First page\n---\na\n", [`${W}/b.md`]: "---\ntitle: Second page\n---\nb\n", "src/x.ts": "x\n" });
		git(root, "init", "-q", "-b", "main");
		git(root, "add", "-A");
		git(root, "commit", "-qm", "base");
		// The PR branch: the Backup ran here, so the map's synced commit is on the branch.
		git(root, "checkout", "-qb", "pr");
		writeFileSync(join(root, "src/x.ts"), "y\n");
		git(root, "commit", "-qam", "pr work");
		const synced = headCommit(root) ?? "";
		const walk = walkBackup(root);
		const entries: Record<string, { kind: string; id: string; url: string; hash?: string }> = {};
		let n = 0;
		for (const d of walk.dirs) entries[d] = { kind: "dir", id: `d${++n}`, url: `https://www.notion.so/d${n}` };
		for (const f of walk.files) entries[f.path] = { kind: f.kind, id: `f${++n}`, url: `https://www.notion.so/f${n}`, hash: f.hash };
		const map = { version: 1, parentPageId: DEFAULT_PARENT, root: { id: "r", url: "https://www.notion.so/r" }, syncedCommit: synced, entries };
		git(root, "checkout", "-q", "main");
		if (style === "merge") git(root, "merge", "-q", "--no-ff", "-m", "merge PR", "pr");
		else {
			// A squash merge puts one new commit on main: the synced commit is not in main's history.
			git(root, "merge", "-q", "--squash", "pr");
			git(root, "commit", "-qm", "squashed PR");
		}
		writeFileSync(join(root, W, "b.md"), "---\ntitle: Second page\n---\nb2\n");
		git(root, "commit", "-qam", "edit b");
		mkdirSync(join(root, ".notion"), { recursive: true });
		writeFileSync(join(root, MAP_PATH), serializeMap(map as never));
		const json = await cf(["backup", "--dry-run", "--json", "--root", root], root);
		const report = JSON.parse(json.stdout) as { scope: string; why: string; create: { root: boolean; dirs: number; files: number }; write: number; delete: number };
		expect(report.scope).toBe(scope);
		expect(report.why).toContain(why);
		expect(report).toMatchObject({ create: { root: false, dirs: 0, files: 0 }, write: 1, delete: 0 });
	});
});
