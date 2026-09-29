import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { computeSheet } from "../../src/pull/sheet.ts";
import type { DdbCharacter } from "../../src/pull/ddb.ts";

const load = (name: string): DdbCharacter => (JSON.parse(readFileSync(join(import.meta.dirname, "fixtures", name), "utf8")) as { data: DdbCharacter }).data;

// Expected values are worked by hand from the recorded payloads (base scores, the modifiers and the equipped
// items in them), never by calling the code under test.
describe("computeSheet on a 2024 Halfling Sorcerer 9 (fixture: character-sorcerer.json)", () => {
	const sheet = computeSheet(load("character-sorcerer.json"));

	it("adds species, feat and base scores into ability scores", () => {
		// Base 8/14/15/8/10/15; Halfling +2 Cha +1 Con; two feats +1 Cha each.
		expect(Object.values(sheet.abilities).map((a) => a.score)).toEqual([8, 14, 16, 8, 10, 19]);
		expect(Object.values(sheet.abilities).map((a) => a.mod)).toEqual([-1, 2, 3, -1, 0, 4]);
	});

	it("takes level, proficiency bonus and hit points from the classes", () => {
		expect(sheet.level).toBe(9);
		expect(sheet.proficiencyBonus).toBe(4);
		// 38 base hit points + Con +3 x 9 levels.
		expect(sheet.hitPoints).toBe(65);
	});

	it("counts attuned magic items into Armor Class, saves and the spell save DC", () => {
		// Unarmored 10 + Dex 2, +1 Cloak of Protection.
		expect(sheet.armorClass).toEqual({ value: 13, source: "unarmored" });
		// Con and Cha proficient (+4): Con 3+4+1, Cha 4+4+1; every save +1 from the cloak.
		expect(Object.values(sheet.saves).map((s) => s.bonus)).toEqual([0, 3, 8, 0, 1, 9]);
		expect(Object.values(sheet.saves).map((s) => s.proficient)).toEqual([false, false, true, false, false, true]);
		// Save DC 8 + 4 proficiency + 4 Cha, +1 sorcerer feature, +1 Bloodwell Vial; attack 4 + 4 + 1 Vial.
		expect(sheet.spellcasting).toEqual([{ class: "Sorcerer", ability: "Cha", saveDc: 18, attackBonus: 9 }]);
	});

	it("reads Perception proficiency for the passive score and attuned Winged Boots for a flying speed", () => {
		// 10 + Wis 0 + proficiency 4 from the background.
		expect(sheet.passivePerception).toBe(14);
		expect(sheet.speeds).toEqual({ walk: 30, fly: 30 });
	});
});

describe("computeSheet on a Human Rogue 5 (fixture: character-rogue.json)", () => {
	const sheet = computeSheet(load("character-rogue.json"));

	it("reads worn armor, Expertise and no spellcasting", () => {
		// Base 8/16/13/13/13/14; Human +1 each; Rogue ASI +1 Dex and +1 Cha.
		expect(Object.values(sheet.abilities).map((a) => a.score)).toEqual([9, 18, 14, 14, 14, 16]);
		// Leather 11 + Dex 4.
		expect(sheet.armorClass).toEqual({ value: 15, source: "Leather" });
		// 28 + Con 2 x 5.
		expect(sheet.hitPoints).toBe(38);
		// 10 + Wis 2 + 2 x proficiency 3 (Perception has Expertise).
		expect(sheet.passivePerception).toBe(18);
		expect(sheet.spellcasting).toEqual([]);
	});
});
