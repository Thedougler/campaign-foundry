import { describe, expect, it } from "vitest";
import { verifyMonster, canonicalFromStatblock } from "../../src/ddb/verify.ts";
import type { CanonicalMonster } from "../../src/ddb/verify.ts";
import type { DdbMonsterRecord } from "../../src/ddb/monster.ts";

/** A homebrew monster read back from monster-service, shaped per the documented MonsterObject. */
const readback: DdbMonsterRecord = {
	id: 4000001,
	name: "Young Bloodhawk",
	sizeId: 4,
	armorClass: 14,
	armorClassDescription: "Natural Armor",
	averageHitPoints: 39,
	hitPointDice: { diceCount: 6, diceValue: 8, diceMultiplier: 1, fixedValue: 12, diceString: "6d8+12" },
	stats: [
		{ statId: 1, name: "Str", value: 14 },
		{ statId: 2, name: "Dex", value: 18 },
		{ statId: 3, name: "Con", value: 14 },
		{ statId: 4, name: "Int", value: 3 },
		{ statId: 5, name: "Wis", value: 16 },
		{ statId: 6, name: "Cha", value: 7 },
	],
	challengeRatingId: 8,
	isHomebrew: true,
	homebrewStatus: 0,
	url: "https://www.dndbeyond.com/monsters/4000001",
};

const canonical: CanonicalMonster = {
	name: "Young Bloodhawk",
	size: "Medium",
	ac: "14 (natural armor)",
	hp: 39,
	hitDice: "6d8 + 12",
	stats: [14, 18, 14, 3, 16, 7],
};

describe("verifyMonster", () => {
	it("reports every field matched when the read-back equals the canonical monster", () => {
		const report = verifyMonster(canonical, readback);
		expect(report.ok).toBe(true);
		expect(report.fields.map((f) => `${f.field}:${f.match}`)).toEqual([
			"name:true",
			"size:true",
			"ac:true",
			"hp:true",
			"hitDice:true",
			"stats:true",
		]);
	});
	it("verifies a Small monster against sizeId 3 (live-probed table: Blood Hawk)", () => {
		const report = verifyMonster(
			{ ...canonical, name: "Blood Hawk", size: "Small", hitDice: "2d6 + 0" },
			{ ...readback, name: "Blood Hawk", sizeId: 3, armorClass: 12, averageHitPoints: 7, hitPointDice: { diceCount: 2, diceValue: 6, diceMultiplier: 1, fixedValue: 0, diceString: "2d6" }, stats: readback.stats!.map((s, i) => ({ ...s, value: [6, 14, 10, 3, 14, 5][i]! })) },
		);
		expect(report.fields.find((f) => f.field === "size")?.match).toBe(true);
	});


	it("matches hit dice when DDB omits a zero modifier (2d6 vs 2d6 + 0)", () => {
		const report = verifyMonster(
			{ ...canonical, hitDice: "2d6 + 0" },
			{ ...readback, hitPointDice: { diceCount: 2, diceValue: 6, diceMultiplier: 1, fixedValue: 0, diceString: "2d6" } },
		);
		expect(report.fields.find((f) => f.field === "hitDice")?.match).toBe(true);
	});

	it("names each mismatched field with both values", () => {
		const drifted = { ...readback, armorClass: 13, averageHitPoints: 40 };
		const report = verifyMonster(canonical, drifted);
		expect(report.ok).toBe(false);
		const mismatched = report.fields.filter((f) => !f.match);
		expect(mismatched.map((f) => f.field)).toEqual(["ac", "hp"]);
		expect(mismatched[0]).toMatchObject({ expected: "14 (natural armor)", actual: "13" });
	});

	it("reports a missing read-back monster as a failure naming the id", () => {
		const report = verifyMonster(canonical, undefined, 4000001);
		expect(report.ok).toBe(false);
		expect(report.fields).toEqual([]);
		expect(report.message).toContain("4000001");
	});

	it("treats a published (non-homebrew) read-back as a mismatch", () => {
		const report = verifyMonster(canonical, { ...readback, isHomebrew: false });
		expect(report.ok).toBe(false);
		expect(report.message).toMatch(/not homebrew/);
	});
});

describe("canonicalFromStatblock", () => {
	it("takes the canonical monster from the wiki statblock's fields", () => {
		const canonical = canonicalFromStatblock({
			name: "Young Bloodhawk",
			size: "Medium",
			cr: 2,
			crText: "2",
			stats: [14, 18, 14, 3, 16, 7],
			hp: 39,
			hitDice: "6d8 + 12",
			saves: [],
			skills: [],
			senses: "passive Perception 15",
			proficiencyBonus: undefined,
			features: [],
			raw: { ac: "14 (natural armor)" },
			lines: { key: () => 1, feature: () => 1 },
		});
		expect(canonical).toEqual(canonical);
		expect(canonical.ac).toBe("14 (natural armor)");
		expect(canonical.hitDice).toBe("6d8+12");
	});

	it("leaves hp undefined when the statblock does not parse one", () => {
		const canonical = canonicalFromStatblock({
			name: "Wisp",
			size: "Tiny",
			cr: undefined,
			crText: "",
			stats: undefined,
			hp: undefined,
			hitDice: "",
			saves: [],
			skills: [],
			senses: "",
			proficiencyBonus: undefined,
			features: [],
			raw: {},
			lines: { key: () => 1, feature: () => 1 },
		});
		expect(canonical.hp).toBeUndefined();
		expect(canonical.stats).toBeUndefined();
	});
});
