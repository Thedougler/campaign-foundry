import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cf, repoRoot } from "../check/helpers.ts";
import { lfsPointer, repo } from "./helpers.ts";

const W = "wiki/The Shattered Sea";

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
			[`${W}/hot.md`]: "# Hot\n",
			[`${W}/attachments/Map.png`]: lfsPointer(),
			".agents/skills/npc-design/SKILL.md": "# NPC design\n",
			".claude/skills/npc-design": { link: "../../.agents/skills/npc-design" },
		});
		const text = await cf(["backup", "--dry-run", "--tree", "--root", root], root);
		expect(text.code).toBe(0);
		expect(text.stdout).toContain("would back up (all: first run: the map has no synced commit)");
		expect(text.stdout).toContain("2 Markdown, 0 other text, 1 images");
		expect(text.stdout).toContain("1 as LFS pointers here");
		expect(text.stdout).toContain("+     hot");
		expect(text.stdout).toContain("(dry run: nothing sent to Notion)");
		const json = await cf(["backup", "--dry-run", "--json", "--root", root], root);
		const report = JSON.parse(json.stdout) as { ok: boolean; scope: string; create: { root: boolean; dirs: number; files: number }; estimate: { skills: number } };
		expect(report).toMatchObject({ ok: true, scope: "all", create: { root: true, dirs: 6, files: 3 }, estimate: { skills: 1 } });
	});

	it("exits 2 without NOTION_TOKEN, and on a bad parent page", async () => {
		const root = repo({ [`${W}/hot.md`]: "# Hot\n" });
		// An empty NOTION_TOKEN also keeps a developer's .env token from loading (dotenv never overrides a set variable).
		const noToken = spawnSync("node", [join(repoRoot, "src/cli.ts"), "backup", "--root", root], { cwd: root, encoding: "utf8", env: { ...process.env, NOTION_TOKEN: "" } });
		expect(noToken.status).toBe(2);
		expect(noToken.stderr).toContain("NOTION_TOKEN is not set");
		const badParent = await cf(["backup", "--dry-run", "--parent", "nope", "--root", root], root);
		expect(badParent.code).toBe(2);
		expect(badParent.stderr).toContain("not a Notion page id");
	});
});
