import { describe, expect, it } from "vitest";
import { parseStatblock } from "../../../src/check/statblock/parse.ts";

const GOBLIN = `layout: Basic 5e Layout
name: Goblin Warrior
size: Small
type: fey
ac: 15
hp: 10
hit_dice: "3d6"
stats: [8, 15, 10, 10, 8, 8]
saves: []
skillsaves:
  - stealth: 6
senses: "darkvision 60 ft., passive Perception 9"
cr: 1/4
traits: []
actions:
  - name: Scimitar
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Slashing damage."
bonus_actions:
  - name: Nimble Escape
    desc: The goblin takes the Disengage or Hide action.
reactions: []
legendary_actions: []
`;

describe("parseStatblock", () => {
	it("reads the fields the arithmetic needs", () => {
		const { statblock, issues } = parseStatblock(GOBLIN);
		expect(issues).toEqual([]);
		expect(statblock).toMatchObject({
			size: "Small",
			hp: 10,
			hitDice: "3d6",
			stats: [8, 15, 10, 10, 8, 8],
			cr: 0.25,
			senses: "darkvision 60 ft., passive Perception 9",
			skills: [{ key: "stealth", value: 6 }],
			saves: [],
		});
		expect(statblock?.features.map((f) => [f.section, f.name])).toEqual([
			["actions", "Scimitar"],
			["bonus_actions", "Nimble Escape"],
		]);
	});

	it.each([
		["1/8", 0.125],
		["1/4", 0.25],
		["1/2", 0.5],
		[0.5, 0.5],
		["0", 0],
		[30, 30],
		["17", 17],
	])("reads cr %j as %s", (cr, expected) => {
		expect(parseStatblock(`cr: ${JSON.stringify(cr)}\n`).statblock?.cr).toBe(expected);
	});

	it("reports YAML that does not parse", () => {
		const { statblock, issues } = parseStatblock("name: [unclosed\n");
		expect(statblock).toBeUndefined();
		expect(issues.map((i) => i.rule)).toEqual(["statblock-yaml"]);
		expect(issues[0]?.hint).toContain("Fantasy Statblocks");
	});

	it("reports a block that is not a map", () => {
		expect(parseStatblock("- a\n- b\n").issues.map((i) => i.rule)).toEqual(["statblock-yaml"]);
	});

	it("reports stats that are not six numbers, and a cr that is not a rating", () => {
		const { issues } = parseStatblock("stats: [10, 10, 10]\ncr: lots\n");
		expect(issues.map((i) => i.rule).sort()).toEqual(["cr-invalid", "stats-invalid"]);
	});

	it("locates keys by line, one-based within the block", () => {
		const { statblock } = parseStatblock(GOBLIN);
		expect(statblock?.lines.key("hp")).toBe(6);
		expect(statblock?.lines.feature("actions", "Scimitar")).toBe(16);
	});
});
