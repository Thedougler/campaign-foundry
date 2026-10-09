import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { cf, checkFixture, copyFixture, findingsFor, fixtures, type JsonReport, realTemplates } from "../helpers.ts";

const LAYERS = ["--layer", "template", "--layer", "statblock"];

describe("statblock layer: real SRD 5.2 stat blocks pass unchanged", () => {
	let report: JsonReport;
	let code: number;

	beforeAll(async () => {
		({ report, code } = await checkFixture("statblock-srd", LAYERS));
	});

	it("passes every converted SRD monster, and they pass the template layer too", () => {
		expect(report.findings).toEqual([]);
		expect(code).toBe(0);
	});

	it("covers low and high CR, Tiny to Gargantuan, legendary, spellcasting, expertise and multiattack", async () => {
		const dir = join(fixtures, "statblock-srd/wiki/Aldermoor/Creatures");
		const files = await readdir(dir);
		expect(files.length).toBeGreaterThanOrEqual(12);
		const pages = new Map(await Promise.all(files.map(async (f) => [f.replace(/\.md$/, ""), await readFile(join(dir, f), "utf8")] as const)));
		expect(pages.get("Rat")).toMatch(/size: Tiny/);
		expect(pages.get("Ancient Red Dragon")).toMatch(/size: Gargantuan/);
		expect(pages.get("Rat")).toMatch(/cr: 0$/m);
		expect(pages.get("Lich")).toMatch(/cr: 21$/m);
		expect(pages.get("Lich")).toMatch(/legendary_actions:\n {2}- name/);
		expect(pages.get("Archmage")).toContain("as the spellcasting ability (spell save DC 17)");
		expect(pages.get("Ancient Red Dragon")).toMatch(/- perception: 16/); // Wis +1 + 2 x PB 7: expertise
		expect(pages.get("Owlbear")).toContain("Multiattack");
		expect(pages.get("Goblin Warrior")).toMatch(/cr: 1\/4$/m);
	});

	it("still fails when one figure in an SRD block is changed (the pass is not vacuous)", async () => {
		const dir = await copyFixture("statblock-srd");
		const page = join(dir, "wiki/Aldermoor/Creatures/Ogre.md");
		const source = await readFile(page, "utf8");
		expect(source).toContain("hp: 68");
		await writeFile(page, source.replace("hp: 68", "hp: 70"));
		const result = await cf(["check", "--json", ...LAYERS, "--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates], dir);
		const changed = JSON.parse(result.stdout) as JsonReport;
		expect(changed.findings.map((f) => `${f.path.split("/").pop()} ${f.rule}`)).toEqual(["Ogre.md hp-average"]);
	});
});

describe("statblock layer: seeded errors, one page per class", () => {
	let report: JsonReport;
	let code: number;

	beforeAll(async () => {
		({ report, code } = await checkFixture("statblock-errors", LAYERS));
	});

	const rules = (page: string): string[] => findingsFor(report, `/${page}.md`).map((f) => `${f.layer}/${f.rule}`);

	it("exits 1", () => {
		expect(code).toBe(1);
	});

	it("passes correct blocks, including a caster with expertise and a spell save DC", () => {
		expect(rules("Good Goblin")).toEqual([]);
		expect(rules("Good Mage")).toEqual([]);
	});

	it.each([
		["Bad Yaml", "statblock-yaml"],
		["Bad Stats", "stats-invalid"],
		["Bad Cr", "cr-invalid"],
		["Bad Proficiency Bonus", "proficiency-bonus"],
		["Bad Save", "save-bonus"],
		["Bad Skill", "skill-bonus"],
		["Unknown Ability", "unknown-ability"],
		["Unknown Skill", "unknown-skill"],
		["Bad Passive Perception", "passive-perception"],
		["Bad Hit Die", "hit-die-size"],
		["Bad Hp", "hp-average"],
		["Bad Hp Constitution", "hp-constitution"],
		["Bad Hit Dice Format", "hit-dice-format"],
		["Bad Attack Bonus", "attack-bonus"],
		["Bad Spell Attack", "attack-bonus"],
		["Bad Damage Average", "damage-average"],
		["Bad Save Dc", "save-dc"],
		["Bad Spell Save Dc", "save-dc"],
		["Bad Escape Dc", "escape-dc"],
		["No Statblock", "missing-statblock"],
		["Two Statblocks", "multiple-statblocks"],
	])("%s fails only with statblock/%s", (page, rule) => {
		expect(rules(page)).toEqual([`statblock/${rule}`]);
	});

	it("flags a stat block on an NPC page and says where it belongs", () => {
		const [finding] = findingsFor(report, "/Misplaced Statblock.md");
		expect(findingsFor(report, "/Misplaced Statblock.md")).toHaveLength(1);
		expect(finding).toMatchObject({ layer: "statblock", rule: "statblock-misplaced", line: 22 });
		expect(finding?.hint).toContain("`creature:");
		expect(finding?.hint).toContain("![[Name#Statblock]]");
	});

	it("names the expected number and how it derives, on the line of the wrong figure", () => {
		const [hp] = findingsFor(report, "/Bad Hp.md");
		expect(hp?.message).toContain("`hp` is 50, expected 49");
		expect(hp?.hint).toContain("9d8 averages 40");
		expect(hp?.hint).toContain("`hp: 49`");
		const [attack] = findingsFor(report, "/Bad Attack Bonus.md");
		expect(attack?.message).toContain("Scimitar");
		expect(attack?.hint).toContain("proficiency bonus +2 (CR 1/4)");
		expect(attack?.hint).toContain("Dexterity +2 (score 15) gives +4");
		const [dc] = findingsFor(report, "/Bad Spell Save Dc.md");
		expect(dc?.hint).toContain("Intelligence +5");
		expect(dc?.hint).toContain("= 17");
	});

	it("has no --fix: the fix depends on which number is wrong, so --fix changes no stat block", async () => {
		const dir = await copyFixture("statblock-errors");
		const before = await readFile(join(dir, "wiki/Aldermoor/Creatures/Bad Hp.md"), "utf8");
		await cf(["check", "--fix", ...LAYERS, "--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates], dir);
		expect(await readFile(join(dir, "wiki/Aldermoor/Creatures/Bad Hp.md"), "utf8")).toBe(before);
	});
});
