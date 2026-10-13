import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { checkFixture, copyFixture, findingsFor, type JsonReport, realTemplates, cf } from "./helpers.ts";

let report: JsonReport;
let code: number;

beforeAll(async () => {
	({ report, code } = await checkFixture("template", ["--layer", "template"]));
});

const rules = (page: string): string[] =>
	findingsFor(report, `/${page}.md`)
		.map((f) => f.rule)
		.sort();

describe("template layer: failure classes", () => {
	it("exits 1 when any page fails", () => {
		expect(code).toBe(1);
		expect(report.ok).toBe(false);
	});

	it("passes a conforming page, and skips index.md and log.md", () => {
		expect(rules("Sources Ok")).toEqual([]);
		expect(report.findings.filter((f) => /\/(index|log)\.md$/.test(f.path))).toEqual([]);
	});

	it.each([
		["No Frontmatter", ["missing-frontmatter"]],
		["Bad Yaml", ["invalid-frontmatter"]],
		["Unknown Type", ["unknown-type"]],
		["Lowercase Type", ["unknown-type"]],
		["Sneaky Kind", ["unexpected-kind"]],
		["Kindless Location", ["missing-kind"]],
		["Bad Kind", ["unknown-kind"]],
		["Missing Keys", ["missing-key"]],
		["Blank Summary", ["blank-summary"]],
		["Multiline Summary", ["summary-multiline"]],
		["Sources Scalar", ["sources-type"]],
		["Bad Sources", ["sources-path", "sources-path", "sources-type"]],
		["Short Sections", []],
		["Swapped Sections", ["section-order"]],
		["No Callout", []],
		["Empty Callout", ["empty-callout"]],
		["Empty Section", ["empty-heading"]],
		["Guided", ["empty-heading", "empty-heading", "leftover-comment", "leftover-comment"]],
	])("%s yields %j", (page, expected) => {
		expect(rules(page)).toEqual(expected);
	});

	it("lists the valid values in an unknown-type finding, and suggests the near miss", () => {
		const unknown = findingsFor(report, "/Unknown Type.md")[0];
		expect(unknown?.hint).toContain("`NPC`");
		expect(unknown?.hint).toContain("`Location`");
		const lower = findingsFor(report, "/Lowercase Type.md")[0];
		expect(lower?.hint).toContain("Did you mean `type: NPC`");
		const kind = findingsFor(report, "/Bad Kind.md")[0];
		expect(kind?.hint).toContain("`Region`, `Settlement`, `Site`");
	});

	it("gives each finding a line and an example-bearing hint", () => {
		for (const f of report.findings) {
			expect(f.line).toBeGreaterThan(0);
			expect(f.hint.length).toBeGreaterThan(20);
		}
	});

	it.each(['""', '"[[Bandit Captain]]"'])("retires the NPC creature property with value %s", async (value) => {
		const dir = await copyFixture("template");
		const path = join(dir, "wiki/Aldermoor/NPCs/Sources Ok.md");
		const source = await readFile(path, "utf8");
		await writeFile(path, source.replace("type: NPC", `type: NPC\ncreature: ${value}`));
		const result = await cf(
			[
				"check",
				path,
				"--json",
				"--layer",
				"template",
				"--vault",
				join(dir, "wiki"),
				"--root",
				dir,
				"--templates",
				realTemplates,
			],
			dir,
		);
		const [finding] = findingsFor(JSON.parse(result.stdout) as JsonReport, "/Sources Ok.md");
		expect(finding).toMatchObject({ rule: "retired-property", line: 3 });
		expect(finding?.hint).toContain("skill://npc-design");
		expect(finding?.hint).toContain("## Statblock");
	});

	it("retires PC sheet bullets and accepts the template's statblock sheet shape", async () => {
		const dir = await copyFixture("template");
		const path = join(dir, "wiki/Aldermoor/PC.md");
		const source = `---
title: "Test PC"
type: PC
summary: "A test adventurer."
sources: []
dndbeyond_url: ""
revealed: "Backstory"
---

## Sheet

- **Player.** A player.
- **Class, species and level.** Fighter, human, 1.
- **AC.** 16
- **HP.** 12

## Spells

None.

## Inventory

A sword.

## Backstory

A traveller.

## Goals and bonds

Protect the village.
`;
		const flags = [
			"--json",
			"--layer",
			"template",
			"--vault",
			join(dir, "wiki"),
			"--root",
			dir,
			"--templates",
			realTemplates,
		];
		await writeFile(path, source);
		const old = await cf(["check", path, ...flags], dir);
		const message =
			"Deprecated: PC sheet bullets. Migrate to the shape of wiki/templates/PC.md — run pull-pcs for a public character, or statblock-design (references/fence.md § PC sheet) for a private one; move AC, HP, speed, saves, passive Perception and the ability scores into the fence.";
		expect(old.code).toBe(1);
		expect(findingsFor(JSON.parse(old.stdout) as JsonReport, "/PC.md")).toMatchObject([
			{ layer: "template", rule: "retired-shape", message, hint: message.slice(message.indexOf("Migrate")) },
		]);
		await writeFile(
			path,
			source.replace(
				"- **AC.** 16\n- **HP.** 12",
				"```statblock\nname: Test PC\nac: 16\nhp: 12\nstats: [10, 10, 10, 10, 10, 10]\n```",
			),
		);
		const current = await cf(["check", path, ...flags], dir);
		expect(current.code).toBe(0);
		expect(findingsFor(JSON.parse(current.stdout) as JsonReport, "/PC.md")).toEqual([]);
	});

	it("derives requirements from the template: an edited template changes the check", async () => {
		const dir = await copyFixture("template");
		const { cp, readFile: read, writeFile } = await import("node:fs/promises");
		await cp(realTemplates, join(dir, "templates"), { recursive: true });
		const npc = await read(join(dir, "templates/npc.md"), "utf8");
		await writeFile(join(dir, "templates/npc.md"), npc.replace("sources: []", 'sources: []\nrole: ""'));
		const result = await cf(
			[
				"check",
				"--json",
				"--layer",
				"template",
				"--vault",
				join(dir, "wiki"),
				"--root",
				dir,
				"--templates",
				join(dir, "templates"),
			],
			dir,
		);
		const edited = JSON.parse(result.stdout) as JsonReport;
		expect(findingsFor(edited, "/Sources Ok.md").map((f) => f.rule)).toEqual(["missing-key"]);
	});

	it("requires Campaign-bound keys only inside a Campaign and never fixes them into a root-kind page", async () => {
		const dir = await copyFixture("template");
		const campaignPath = join(dir, "wiki/Aldermoor/NPCs/Sources Ok.md");
		const source = (await readFile(campaignPath, "utf8")).replace('revealed: ""\n', "");
		await writeFile(campaignPath, source);
		await mkdir(join(dir, "wiki/NPCs"), { recursive: true });
		const sharedPath = join(dir, "wiki/NPCs/Shared.md");
		await writeFile(sharedPath, source.replace('title: "Sources Ok"', 'title: "Shared"'));
		const worldPath = join(dir, "wiki/root-world.md");
		const world = await readFile(join(dir, "wiki/Aldermoor/Aldermoor.md"), "utf8");
		await writeFile(worldPath, world.replace('revealed: ""\n', ""));
		const flags = ["--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates];
		const before = JSON.parse(
			(await cf(["check", "--json", "--layer", "template", ...flags], dir)).stdout,
		) as JsonReport;
		expect(findingsFor(before, "/Shared.md")).toEqual([]);
		expect(findingsFor(before, "/Sources Ok.md").map((f) => f.rule)).toEqual(["missing-key"]);
		expect(findingsFor(before, "/root-world.md").map((f) => f.rule)).toEqual(["missing-key"]);
		await cf(["check", "--json", "--layer", "template", "--fix", ...flags], dir);
		expect(await readFile(sharedPath, "utf8")).not.toContain("revealed:");
		expect(await readFile(campaignPath, "utf8")).toContain('revealed: ""');
		expect(await readFile(worldPath, "utf8")).toContain('revealed: ""');
	});

	it("reads `Optional` guidance as an optional section: absent passes, present keeps order, empty is droppable", async () => {
		const dir = await copyFixture("template");
		const templates = join(dir, "templates");
		await cp(realTemplates, templates, { recursive: true });
		const npc = await readFile(join(templates, "npc.md"), "utf8");
		expect(npc).toMatch(/## History\n\n%% Optional\./);
		const flags = ["--vault", join(dir, "wiki"), "--root", dir, "--templates", templates];
		const result = await cf(["check", "--json", "--layer", "template", ...flags], dir);
		const edited = JSON.parse(result.stdout) as JsonReport;
		const of = (page: string): string[] =>
			findingsFor(edited, `/${page}.md`)
				.map((f) => f.rule)
				.sort();
		expect(of("Short Sections")).toEqual([]);
		expect(of("Swapped Sections")).toEqual(["section-order"]);
		const empty = findingsFor(edited, "/Empty Section.md");
		expect(empty.map((f) => f.rule)).toEqual(["empty-heading"]);
		expect(empty[0]?.hint).toContain("marks `## History` optional");

		await cf(["check", "--json", "--layer", "template", "--fix", ...flags], dir);
		const fixed = await readFile(join(dir, "wiki/Aldermoor/NPCs/Empty Section.md"), "utf8");
		expect(fixed).not.toContain("## History");
		expect(fixed).toContain("## Links");
	});

	it("requires a Scene's Opening callout and gives its section and example in the finding", async () => {
		const dir = await copyFixture("template");
		const path = join(dir, "wiki/Aldermoor/Opening.md");
		await writeFile(
			path,
			`---
title: "Session 1 - Opening"
type: Scene
kind: Hook
summary: "An opening."
sources: []
revealed: ""
---

## Situation

Situation.

## Angles

Choices.

## Outcomes

Consequences.
`,
		);
		const result = await cf(
			[
				"check",
				path,
				"--json",
				"--layer",
				"template",
				"--vault",
				join(dir, "wiki"),
				"--root",
				dir,
				"--templates",
				realTemplates,
			],
			dir,
		);
		const findings = findingsFor(JSON.parse(result.stdout) as JsonReport, "/Opening.md");
		expect(findings.map((f) => f.rule)).toEqual(["missing-callout"]);
		expect(findings[0]?.hint).toContain("where templates/scene-hook.md puts it");
		expect(findings[0]?.hint).toContain("> [!narration] Opening");
	});

	it("keeps a callout type required when only some of its template callouts are Optional", async () => {
		const dir = await copyFixture("template");
		const templates = join(dir, "templates");
		await cp(realTemplates, templates, { recursive: true });
		const path = join(templates, "npc.md");
		const source = await readFile(path, "utf8");
		await writeFile(
			path,
			source.replace(
				"## Roleplaying",
				"> [!narration] Required introduction\n> %% Give their introduction. %%\n\n## Roleplaying",
			),
		);
		const result = await cf(
			["check", "--json", "--layer", "template", "--vault", join(dir, "wiki"), "--root", dir, "--templates", templates],
			dir,
		);
		expect(findingsFor(JSON.parse(result.stdout) as JsonReport, "/No Callout.md").map((f) => f.rule)).toEqual([
			"missing-callout",
		]);
	});

	it("reports and fixes YAML comments without changing literal hashes, values or the body", async () => {
		const dir = await copyFixture("template");
		const path = join(dir, "wiki/Aldermoor/NPCs/Sources Ok.md");
		const original = await readFile(path, "utf8");
		const source = original
			.replace("type: NPC", "# leading guidance\ntype: NPC # x")
			.replace(
				'revealed: ""',
				'extra:\n  - "literal # value" # nested guidance\nnotes: |\n  # literal block text\n# before revealed\nrevealed: ""',
			)
			.replace('title: "Sources Ok"', 'title: "Sources Ok"\n# trailing guidance');
		await writeFile(path, source);
		const args = [
			"check",
			path,
			"--json",
			"--layer",
			"template",
			"--vault",
			join(dir, "wiki"),
			"--root",
			dir,
			"--templates",
			realTemplates,
		];
		const before = JSON.parse((await cf(args, dir)).stdout) as JsonReport;
		expect(before.findings.map((f) => f.rule)).toEqual(Array(5).fill("leftover-comment"));
		expect(before.findings.map((f) => f.line)).toEqual([2, 3, 7, 10, 13]);
		const fixed = JSON.parse((await cf([...args, "--fix"], dir)).stdout) as JsonReport;
		expect(fixed.findings).toEqual([]);
		expect(fixed.fixes).toHaveLength(1);
		const text = await readFile(path, "utf8");
		expect(text).not.toMatch(/guidance|# x/);
		expect(text).toContain("literal # value");
		expect(text).toContain("# literal block text");
		expect(text.slice(text.indexOf("\n---\n") + 5)).toBe(original.slice(original.indexOf("\n---\n") + 5));
		expect((JSON.parse((await cf([...args, "--fix"], dir)).stdout) as JsonReport).fixes).toEqual([]);
	});

	it.each([
		['""', "blank-title"],
		["17", "title-type"],
		['"First\\nSecond"', "title-multiline"],
	])("rejects invalid display title %s", async (value, rule) => {
		const dir = await copyFixture("template");
		const path = join(dir, "wiki/Aldermoor/NPCs/Sources Ok.md");
		const source = await readFile(path, "utf8");
		await writeFile(path, source.replace(/^title: .*$/m, `title: ${value}`));
		const result = await cf(
			[
				"check",
				path,
				"--json",
				"--layer",
				"template",
				"--vault",
				join(dir, "wiki"),
				"--root",
				dir,
				"--templates",
				realTemplates,
			],
			dir,
		);
		const edited = JSON.parse(result.stdout) as JsonReport;
		expect(findingsFor(edited, "/Sources Ok.md").map((f) => f.rule)).toEqual([rule]);
	});
});

describe("template layer: --fix", () => {
	it("adds blank keys, strips guidance and empty headings, then is idempotent", async () => {
		const dir = await copyFixture("template");
		const args = [
			"check",
			"--layer",
			"template",
			"--json",
			"--fix",
			"--vault",
			join(dir, "wiki"),
			"--root",
			dir,
			"--templates",
			realTemplates,
		];
		const first = JSON.parse((await cf(args, dir)).stdout) as JsonReport;
		expect(first.fixes.map((f) => f.path)).toContain("wiki/Aldermoor/NPCs/Guided.md");
		expect(findingsFor(first, "/Guided.md")).toEqual([]);
		expect(rules("Guided")).not.toEqual([]); // the original stays broken; the copy is fixed

		const fixed = await readFile(join(dir, "wiki/Aldermoor/NPCs/Guided.md"), "utf8");
		expect(fixed).not.toContain("%%");
		expect(fixed).not.toContain("creature:");
		expect(fixed).not.toContain("## History");
		expect(fixed).toContain("- **Role.** Text.");

		const missing = await readFile(join(dir, "wiki/Aldermoor/NPCs/Missing Keys.md"), "utf8");
		expect(missing).toMatch(
			/^---\ntype: NPC\nsummary: "A ferrywoman."\nrevealed: ""\ntitle: "Missing Keys"\nsources: \[\]\n---\n/,
		);

		const second = JSON.parse((await cf(args, dir)).stdout) as JsonReport;
		expect(second.fixes).toEqual([]);
		const third = await cf(
			args.filter((a) => a !== "--json"),
			dir,
		);
		expect(third.stdout).not.toContain("fixed  ");
	});

	it("--dry-run reports the fixes and writes nothing", async () => {
		const dir = await copyFixture("template");
		const before = await readFile(join(dir, "wiki/Aldermoor/NPCs/Guided.md"), "utf8");
		const result = await cf(
			[
				"check",
				"--layer",
				"template",
				"--fix",
				"--dry-run",
				"--vault",
				join(dir, "wiki"),
				"--root",
				dir,
				"--templates",
				realTemplates,
			],
			dir,
		);
		expect(result.stdout).toContain("would fix  wiki/Aldermoor/NPCs/Guided.md");
		expect(await readFile(join(dir, "wiki/Aldermoor/NPCs/Guided.md"), "utf8")).toBe(before);
	});
});

describe("template layer: optional entry callouts", () => {
	// Creature's First sight entry is optional even when Statblock is present.
	const worldFree = `---
title: "Bandit"
type: Creature
summary: "A reusable road agent for any World."
sources: []
cr: 0.125
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks: []
revealed: ""
---

## Statblock

\`\`\`statblock
layout: Basic 5e Layout
name: "Bandit"
size: Medium
type: Humanoid
alignment: "Any Non-Good"
ac: 12
hp: 11
hit_dice: "2d8+2"
speed: "30 ft."
stats: [11, 12, 12, 10, 10, 10]
saves: []
skillsaves: []
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: "passive Perception 10"
languages: "Common plus one other language"
cr: 1
traits: []
actions: []
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions: []
\`\`\`

## Links

\`\`\`base
filters:
  and:
    - file.hasLink(this.file)
\`\`\`
`;

	/** Runs the template layer over the fixture with one vault-root Creature page written in. */
	async function runCreature(source: string): Promise<JsonReport> {
		const dir = await copyFixture("template");
		const creatures = join(dir, "wiki/Creatures");
		await mkdir(creatures, { recursive: true });
		await writeFile(join(creatures, "Bandit.md"), source);
		const result = await cf(
			[
				"check",
				"--json",
				"--layer",
				"template",
				"--vault",
				join(dir, "wiki"),
				"--root",
				dir,
				"--templates",
				realTemplates,
			],
			dir,
		);
		return JSON.parse(result.stdout) as JsonReport;
	}

	it("does not require an optional entry callout", async () => {
		expect(findingsFor(await runCreature(worldFree), "/Bandit.md")).toEqual([]);
	});

	it("accepts an optional entry callout before the required sections", async () => {
		const withEntry = worldFree.replace(
			"## Statblock",
			"> [!narration] First sight\n> A bandit waits by the road.\n\n## Statblock",
		);
		expect(findingsFor(await runCreature(withEntry), "/Bandit.md")).toEqual([]);
	});
});
