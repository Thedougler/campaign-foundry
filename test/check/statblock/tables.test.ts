import { describe, expect, it } from "vitest";
import { averageOf, parseDice } from "../../../src/check/statblock/dice.ts";
import { abilityModifier, HIT_DIE_BY_SIZE, proficiencyBonus } from "../../../src/check/statblock/tables.ts";

describe("proficiency bonus by CR (SRD 5.2 monsters: goblin-warrior 1/4, troll 5, tarrasque 30 ...)", () => {
	it.each([
		[0, 2],
		[0.125, 2],
		[0.25, 2],
		[0.5, 2],
		[1, 2],
		[4, 2],
		[5, 3],
		[8, 3],
		[9, 4],
		[12, 4],
		[13, 5],
		[16, 5],
		[17, 6],
		[20, 6],
		[21, 7],
		[24, 7],
		[25, 8],
		[28, 8],
		[29, 9],
		[30, 9],
	])("CR %s gives +%s", (cr, expected) => {
		expect(proficiencyBonus(cr)).toBe(expected);
	});
});

describe("ability modifiers", () => {
	it.each([
		[1, -5],
		[8, -1],
		[9, -1],
		[10, 0],
		[11, 0],
		[12, 1],
		[15, 2],
		[30, 10],
	])("score %s gives %s", (score, mod) => {
		expect(abilityModifier(score)).toBe(mod);
	});
});

describe("hit die by size", () => {
	it("matches the SRD", () => {
		expect(HIT_DIE_BY_SIZE).toEqual({ tiny: 4, small: 6, medium: 8, large: 10, huge: 12, gargantuan: 20 });
	});
});

describe("dice", () => {
	it("averages rounding down, flat modifier included", () => {
		expect(averageOf(parseDice("4d10 + 5")!)).toBe(27);
		expect(averageOf(parseDice("1d4 - 1")!)).toBe(1);
		expect(averageOf(parseDice("3d6")!)).toBe(10);
		expect(averageOf(parseDice("1d8 + 1d6 + 2")!)).toBe(10);
		expect(averageOf(parseDice("1d4 − 1")!)).toBe(1);
	});

	it("rejects text that is not dice", () => {
		expect(parseDice("hello")).toBeUndefined();
		expect(parseDice("5")).toBeUndefined();
		expect(parseDice("")).toBeUndefined();
	});
});
