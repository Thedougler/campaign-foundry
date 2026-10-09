import { spawnSync } from "node:child_process";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, sep } from "node:path";
import { describe, expect, it } from "vitest";
import { cf, copyFixture, vaultFlags } from "./helpers.ts";

const read = (dir: string, path: string): Promise<string> => readFile(join(dir, path), "utf8");

/** `cf rename` against a copy of the clean fixture. */
function rename(dir: string, args: string[]) {
	return cf(["rename", ...vaultFlags(dir), ...args], dir);
}

/** Every file under `dir`, keyed by relative posix path, holding its text: the dry-run comparison. */
async function snapshot(dir: string): Promise<Map<string, string>> {
	const out = new Map<string, string>();
	for (const rel of await readdir(dir, { recursive: true })) {
		const file = join(dir, rel);
		if ((await stat(file)).isFile()) out.set(rel.split(sep).join("/"), await readFile(file, "utf8"));
	}
	return out;
}

const LINK_FARM = `---
type: Location
kind: Site
title: ""
summary: "Link shapes."
sources: []
---

- bare: [[The Cold Hearth]]
- piped: [[The Cold Hearth|the failing hearth]]
- heading: [[The Cold Hearth#Hidden truths]]
- block: [[The Cold Hearth#^hearth]]
- embed: ![[The Cold Hearth]]
- path: [[Threads/The Cold Hearth]]
- code: \`[[The Cold Hearth]]\` stays put

%% [[The Cold Hearth]] comment stays put %%
`;

const LINK_FARM_REWRITTEN = `---
type: Location
kind: Site
title: ""
summary: "Link shapes."
sources: []
---

- bare: [[cold-hearth-inn|Cold Hearth Inn]]
- piped: [[cold-hearth-inn|the failing hearth]]
- heading: [[cold-hearth-inn#Hidden truths|Cold Hearth Inn]]
- block: [[cold-hearth-inn#^hearth|Cold Hearth Inn]]
- embed: ![[cold-hearth-inn|Cold Hearth Inn]]
- path: [[cold-hearth-inn|Cold Hearth Inn]]
- code: \`[[The Cold Hearth]]\` stays put

%% [[The Cold Hearth]] comment stays put %%
`;

describe("cf rename", () => {
	it("migrates a titleless page using an explicit title and derived slug", async () => {
		const dir = await copyFixture("clean");
		const { code, stdout } = await rename(dir, ["Mara Voss", "--title", "Mara Voss"]);
		expect(code).toBe(0);
		expect(stdout).toContain("move  wiki/ashes-of-the-crown/NPCs/Mara Voss.md -> wiki/ashes-of-the-crown/NPCs/mara-voss.md");
		expect(await read(dir, "wiki/ashes-of-the-crown/NPCs/mara-voss.md")).toContain('title: "Mara Voss"');
		await expect(read(dir, "wiki/ashes-of-the-crown/NPCs/Mara Voss.md")).rejects.toThrow();
		// Even when the title is unchanged, the stable slug is the rewritten target.
		expect(await read(dir, "wiki/ashes-of-the-crown/Locations/Ravenhold.md")).toContain("- **Ruled by.** [[mara-voss|Mara Voss]]");
		expect(await read(dir, "wiki/ashes-of-the-crown/index.md")).toContain("- [[mara-voss|Mara Voss]] — Harbormaster with a bandit's past.");
	});

	it("records the rename in the Campaign folder's log.md as an audit entry", async () => {
		const dir = await copyFixture("clean");
		const { code } = await rename(dir, ["Mara Voss", "--title", "Mara Voss"]);
		expect(code).toBe(0);
		expect(await read(dir, "wiki/ashes-of-the-crown/log.md")).toMatch(/## \[\d{4}-\d{2}-\d{2}\] audit \| Renamed Mara Voss to mara-voss\.md\n\n- \[\[mara-voss\|Mara Voss\]\]\n$/);
	});

	it("rewrites every link shape when the title changes, leaving code and comments alone", async () => {
		const dir = await copyFixture("clean");
		await writeFile(join(dir, "wiki/ashes-of-the-crown/Locations/Link Farm.md"), LINK_FARM);
		const { code, stdout } = await rename(dir, ["The Cold Hearth", "--title", "Cold Hearth Inn"]);
		expect(code).toBe(0);
		expect(stdout).toContain("[[The Cold Hearth|the failing hearth]] -> [[cold-hearth-inn|the failing hearth]]");
		expect(await read(dir, "wiki/ashes-of-the-crown/Threads/cold-hearth-inn.md")).toContain('title: "Cold Hearth Inn"');
		await expect(read(dir, "wiki/ashes-of-the-crown/Threads/The Cold Hearth.md")).rejects.toThrow();
		// Every target becomes the slug; custom text survives, otherwise the display is the new title.
		// Headings, block refs and embed markers survive; code spans and %% comments are never touched.
		expect(await read(dir, "wiki/ashes-of-the-crown/Locations/Link Farm.md")).toBe(LINK_FARM_REWRITTEN);
		expect(await read(dir, "wiki/ashes-of-the-crown/NPCs/Mara Voss.md")).toContain("Keeps [[cold-hearth-inn|Cold Hearth Inn]] burning.");
		expect(await read(dir, "wiki/ashes-of-the-crown/hot.md")).not.toContain("[[The Cold Hearth]]");
		const index = await read(dir, "wiki/ashes-of-the-crown/index.md");
		expect(index).toContain("[[cold-hearth-inn|Cold Hearth Inn]] — Mara's hearth is failing, and so is her hold.");
		expect(index).not.toContain("[[The Cold Hearth]]");
	});

	it("rewrites links held in quoted frontmatter values", async () => {
		const dir = await copyFixture("clean");
		const { code } = await rename(dir, ["Bandit Captain", "--title", "Bandit Leader"]);
		expect(code).toBe(0);
		expect(await read(dir, "wiki/ashes-of-the-crown/Creatures/bandit-leader.md")).toContain('title: "Bandit Leader"');
		expect(await read(dir, "wiki/ashes-of-the-crown/NPCs/Mara Voss.md")).toContain('creature: "[[bandit-leader|Bandit Leader]]"');
	});

	it("escapes alias pipes in Markdown tables without double-escaping custom text", async () => {
		const dir = await copyFixture("clean");
		const table = [
			"| Scene | Hands to |",
			"| --- | --- |",
			"| [[The Cold Hearth]] | ![[The Cold Hearth#Hidden truths]] |",
			"| [[The Cold Hearth\\|custom text]] | [[The Cold Hearth#Hidden truths\\|custom heading]] |",
			"",
			"Scene | Hands to",
			"--- | ---",
			"[[The Cold Hearth]] | ![[The Cold Hearth\\|custom embed]]",
			"",
			"Ordinary prose: [[The Cold Hearth]]",
			"",
		].join("\n");
		await writeFile(join(dir, "wiki/ashes-of-the-crown/Locations/Table Links.md"), table);
		const result = await rename(dir, ["The Cold Hearth", "--title", "Cold Hearth Inn"]);
		expect(result.code).toBe(0);
		expect(await read(dir, "wiki/ashes-of-the-crown/Locations/Table Links.md")).toBe([
			"| Scene | Hands to |",
			"| --- | --- |",
			"| [[cold-hearth-inn\\|Cold Hearth Inn]] | ![[cold-hearth-inn#Hidden truths\\|Cold Hearth Inn]] |",
			"| [[cold-hearth-inn\\|custom text]] | [[cold-hearth-inn#Hidden truths\\|custom heading]] |",
			"",
			"Scene | Hands to",
			"--- | ---",
			"[[cold-hearth-inn\\|Cold Hearth Inn]] | ![[cold-hearth-inn\\|custom embed]]",
			"",
			"Ordinary prose: [[cold-hearth-inn|Cold Hearth Inn]]",
			"",
		].join("\n"));
	});

	it("keeps a twin's distinguishing bracket in the title and derives the collision-free slug", async () => {
		const dir = await copyFixture("clean");
		await writeFile(
			join(dir, "wiki/ashes-of-the-crown/Creatures/Otar the Foul (Creature).md"),
			'---\ntype: Creature\ntitle: ""\nsummary: "A swamp horror with a twin."\nsources: []\n---\n\nText.\n',
		);
		await writeFile(join(dir, "wiki/ashes-of-the-crown/NPCs/Otar the Foul.md"), '---\ntype: NPC\ntitle: ""\nsummary: "The twin."\nsources: []\n---\n\nText.\n');
		const npc = await rename(dir, ["Otar the Foul", "--title", "Otar the Foul"]);
		expect(npc.code).toBe(0);
		const creature = await rename(dir, ["Otar the Foul (Creature)", "--title", "Otar the Foul (Creature)"]);
		expect(creature.code).toBe(0);
		expect(await read(dir, "wiki/ashes-of-the-crown/NPCs/otar-the-foul.md")).toContain('title: "Otar the Foul"');
		expect(await read(dir, "wiki/ashes-of-the-crown/Creatures/otar-the-foul-creature.md")).toContain('title: "Otar the Foul (Creature)"');
	});

	it("takes an explicit --slug for a title whose derived slug would not do", async () => {
		const dir = await copyFixture("clean");
		const { code } = await rename(dir, ["Mara Voss", "--title", "Mara Voss", "--slug", "harbormaster"]);
		expect(code).toBe(0);
		expect(await read(dir, "wiki/ashes-of-the-crown/NPCs/harbormaster.md")).toContain('title: "Mara Voss"');
	});

	it("refuses when another page already uses the slug", async () => {
		const dir = await copyFixture("clean");
		const before = await snapshot(dir);
		const { code, stderr } = await rename(dir, ["Mara Voss", "--title", "Mara Voss", "--slug", "ravenhold"]);
		expect(code).toBe(2);
		expect(stderr).toContain("already uses the slug `ravenhold`");
		expect(await snapshot(dir)).toEqual(before);
	});

	it("refuses when another page already answers to the title", async () => {
		const dir = await copyFixture("clean");
		const before = await snapshot(dir);
		// Captain Morrow answers to the alias `Black-Jaw`.
		const { code, stderr } = await rename(dir, ["Mara Voss", "--title", "Black-Jaw"]);
		expect(code).toBe(2);
		expect(stderr).toContain("already answers to the title `Black-Jaw`");
		expect(stderr).toContain("(Creature)");
		expect(await snapshot(dir)).toEqual(before);
	});

	it("refuses when a page already sits at the target path", async () => {
		const dir = await copyFixture("clean");
		const before = await snapshot(dir);
		const { code, stderr } = await rename(dir, ["Mara Voss", "--title", "Mara Voss", "--slug", "morrow"]);
		expect(code).toBe(2);
		expect(stderr).toContain("A page already exists at");
		expect(await snapshot(dir)).toEqual(before);
	});

	it("--dry-run prints every planned move and rewrite and writes nothing", async () => {
		const dir = await copyFixture("clean");
		await writeFile(join(dir, "wiki/ashes-of-the-crown/Locations/Link Farm.md"), LINK_FARM);
		const before = await snapshot(dir);
		const { code, stdout } = await rename(dir, ["The Cold Hearth", "--title", "Cold Hearth Inn", "--dry-run"]);
		expect(code).toBe(0);
		expect(stdout).toContain("would move");
		expect(stdout).toContain("would set  title: \"Cold Hearth Inn\"");
		expect(stdout).toContain("[[The Cold Hearth]] -> [[cold-hearth-inn|Cold Hearth Inn]]");
		expect(stdout).toContain("would log");
		expect(await snapshot(dir)).toEqual(before);
	});

	it("re-running a finished rename is a no-op that logs nothing", async () => {
		const dir = await copyFixture("clean");
		await rename(dir, ["Mara Voss", "--title", "Mara Voss"]);
		const log = await read(dir, "wiki/ashes-of-the-crown/log.md");
		const again = await rename(dir, ["Mara Voss"]);
		expect(again.code).toBe(0);
		expect(again.stdout).toContain("already renamed");
		expect(await read(dir, "wiki/ashes-of-the-crown/log.md")).toBe(log);
	});

	it("refuses to rename the generated and append-only pages", async () => {
		const dir = await copyFixture("clean");
		const { code, stderr } = await rename(dir, ["index"]);
		expect(code).toBe(2);
		expect(stderr).toContain("index.md");
	});

	it("suggests the closest name for an unknown page", async () => {
		const dir = await copyFixture("clean");
		const { code, stderr } = await rename(dir, ["Mara Vos"]);
		expect(code).toBe(2);
		expect(stderr).toContain("Did you mean `Mara Voss`?");
	});

	it("defaults to the current title, not the filename", async () => {
		const dir = await copyFixture("clean");
		const result = await rename(dir, ["Captain Morrow"]);
		expect(result.code).toBe(0);
		expect(await read(dir, "wiki/ashes-of-the-crown/NPCs/captain-morrow.md")).toContain('title: "Captain Morrow"');
	});

	it("defaults to the first alias when the title is blank", async () => {
		const dir = await copyFixture("clean");
		await writeFile(join(dir, "wiki/ashes-of-the-crown/NPCs/alias-page.md"), '---\ntitle: ""\ntype: NPC\naliases: ["First Alias", "Other Alias"]\n---\n');
		const result = await rename(dir, ["alias-page"]);
		expect(result.code).toBe(0);
		expect(await read(dir, "wiki/ashes-of-the-crown/NPCs/first-alias.md")).toContain('title: "First Alias"');
	});

	it("requires --title when there is no title or alias, without touching anything", async () => {
		const dir = await copyFixture("clean");
		await writeFile(join(dir, "wiki/ashes-of-the-crown/NPCs/titleless-page.md"), '---\ntype: NPC\ntitle: ""\naliases: []\n---\n\nA page awaiting its title.\n');
		const before = await snapshot(dir);
		const result = await rename(dir, ["titleless-page"]);
		expect(result.code).toBe(2);
		expect(result.stderr).toContain("--title is required");
		expect(await snapshot(dir)).toEqual(before);
	});

	it("moves a tracked file with git mv, keeping the rename staged", async () => {
		const dir = await copyFixture("clean");
		spawnSync("git", ["init", "-q"], { cwd: dir });
		spawnSync("git", ["add", "-A"], { cwd: dir });
		spawnSync("git", ["-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "init"], { cwd: dir });
		const { code } = await rename(dir, ["Mara Voss", "--title", "Mara Voss"]);
		expect(code).toBe(0);
		const status = spawnSync("git", ["status", "--short"], { cwd: dir, encoding: "utf8" }).stdout;
		expect(status).toContain("R");
		expect(status).toContain("wiki/ashes-of-the-crown/NPCs/mara-voss.md");
		await expect(read(dir, "wiki/ashes-of-the-crown/NPCs/Mara Voss.md")).rejects.toThrow();
	});
});
