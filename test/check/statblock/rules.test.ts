import { describe, expect, it } from "vitest";
import { parseStatblock } from "../../../src/check/statblock/parse.ts";
import { checkStatblock } from "../../../src/check/statblock/rules.ts";

/** Goblin Warrior, from the SRD 5.2 API: passes every rule unchanged. */
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
bonus_actions: []
reactions: []
legendary_actions: []
`;

/** Archmage-like caster: Int 20, CR 12 (PB +4), Con 12 (+1). */
const MAGE = `name: Mage
size: Medium
hp: 49
hit_dice: "9d8 + 9"
stats: [10, 14, 12, 20, 15, 11]
saves:
  - int: 9
  - wis: 6
skillsaves:
  - arcana: 13
  - perception: 6
senses: "passive Perception 16"
cr: 12
actions:
  - name: Arcane Burst
    desc: "*Melee or Ranged Attack Roll:* +9, reach 5 ft. or range 150 ft. *Hit:* 27 (4d10 + 5) Force damage."
  - name: Spellcasting
    desc: "The mage casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17, +9 to hit with spell attacks):"
`;

const rules = (yaml: string): string[] => {
	const { statblock, issues } = parseStatblock(yaml);
	return [...issues, ...(statblock ? checkStatblock(statblock) : [])].map((i) => i.rule);
};

const change = (yaml: string, from: string | RegExp, to: string): string => {
	const next = yaml.replace(from, to);
	expect(next, `fixture edit ${String(from)}`).not.toBe(yaml);
	return next;
};

describe("valid blocks pass", () => {
	it("goblin warrior and the caster", () => {
		expect(rules(GOBLIN)).toEqual([]);
		expect(rules(MAGE)).toEqual([]);
	});
});

describe("saves and skills", () => {
	it("save-bonus: a save is the ability modifier plus proficiency bonus", () => {
		const { statblock } = parseStatblock(change(MAGE, "int: 9", "int: 8"));
		const issues = checkStatblock(statblock!);
		expect(issues.map((i) => i.rule)).toEqual(["save-bonus"]);
		expect(issues[0]?.message).toContain("+8");
		expect(issues[0]?.hint).toContain("+9");
		expect(issues[0]?.hint).toContain("Intelligence");
		expect(issues[0]?.hint).toContain("proficiency bonus +4");
	});

	it("save-bonus: no expertise on saves", () => {
		expect(rules(change(MAGE, "int: 9", "int: 14"))).toEqual(["save-bonus"]);
	});

	it("skill-bonus: a skill is the modifier plus proficiency bonus, or twice that with expertise", () => {
		expect(rules(change(MAGE, "arcana: 13", "arcana: 14"))).toEqual(["skill-bonus"]);
		expect(rules(change(MAGE, "arcana: 13", "arcana: 9"))).toEqual([]); // proficient: 5 + 4
		expect(rules(change(MAGE, "perception: 6", "perception: 7"))).toContain("skill-bonus");
	});

	it("names abilities and skills that do not exist", () => {
		expect(rules(change(MAGE, "wis: 6", "luck: 6"))).toEqual(["unknown-ability"]);
		expect(rules(change(MAGE, "arcana: 13", "witchcraft: 13"))).toEqual(["unknown-skill"]);
	});

	it("accepts underscores and hyphens in multi-word skills", () => {
		const base = change(GOBLIN, "stealth: 6", "sleight_of_hand: 6");
		expect(rules(base)).toEqual([]);
	});
});

describe("proficiency bonus", () => {
	it("derives from cr, so a wrong optional proficiency_bonus is caught", () => {
		expect(rules(`${GOBLIN}proficiency_bonus: 2\n`)).toEqual([]);
		expect(rules(`${GOBLIN}proficiency_bonus: 3\n`)).toEqual(["proficiency-bonus"]);
	});

	it("uses the CR's band for every check: cr 5 makes goblin numbers wrong", () => {
		expect(rules(change(GOBLIN, "cr: 1/4", "cr: 5"))).toEqual(["skill-bonus", "attack-bonus"]);
	});
});

describe("passive Perception", () => {
	it("is 10 + Wisdom modifier without a Perception skill", () => {
		const issues = rules(change(GOBLIN, "passive Perception 9", "passive Perception 10"));
		expect(issues).toEqual(["passive-perception"]);
	});

	it("is 10 + the Perception skill bonus when listed", () => {
		expect(rules(change(MAGE, "passive Perception 16", "passive Perception 15"))).toEqual(["passive-perception"]);
	});

	it("must be present", () => {
		expect(rules(change(GOBLIN, "passive Perception 9", "nothing"))).toEqual(["passive-perception"]);
	});
});

describe("hit points", () => {
	it("hp-average: hp is the floor of the dice average plus the flat modifier", () => {
		const { statblock } = parseStatblock(change(MAGE, "hp: 49", "hp: 60"));
		const issues = checkStatblock(statblock!);
		expect(issues.map((i) => i.rule)).toEqual(["hp-average"]);
		expect(issues[0]?.hint).toContain("49"); // 9d8 = 40.5 -> 40, + 9
	});

	it("hp-constitution: the flat modifier is dice count x Con modifier", () => {
		const issues = rules(change(change(MAGE, "9d8 + 9", "9d8 + 18"), "hp: 49", "hp: 58"));
		expect(issues).toEqual(["hp-constitution"]);
	});

	it("handles negative Con: a Tiny beast with Con 8 has 1d4 - 1", () => {
		const rat = `name: Bat\nsize: Tiny\nhp: 1\nhit_dice: "1d4 - 1"\nstats: [2, 15, 8, 2, 12, 4]\ncr: 0\nsenses: "passive Perception 11"\n`;
		expect(rules(rat)).toEqual([]);
	});

	it("hit-die-size: the die follows the creature's size", () => {
		const issues = rules(change(GOBLIN, `hit_dice: "3d6"`, `hit_dice: "3d8"`));
		expect(issues).toContain("hit-die-size");
	});

	it("hit-die-size: an unreadable size cannot be verified", () => {
		expect(rules(change(GOBLIN, "size: Small", 'size: ""'))).toEqual(["hit-die-size"]);
	});

	it('accepts either size of "Medium or Small"', () => {
		expect(rules(change(GOBLIN, "size: Small", "size: Medium or Small").replace('"3d6"', '"3d8"').replace("hp: 10", "hp: 13"))).toEqual([]);
	});

	it("hit-dice-format: hit_dice must be NdS with an optional flat term", () => {
		expect(rules(change(GOBLIN, `"3d6"`, `"lots"`))).toEqual(["hit-dice-format"]);
	});
});

describe("attack rolls", () => {
	it("attack-bonus: a weapon attack is proficiency bonus plus Str or Dex", () => {
		const issues = rules(change(GOBLIN, "+4, reach", "+5, reach"));
		expect(issues).toEqual(["attack-bonus"]);
	});

	it("the hint states the expected number and how it derives", () => {
		const { statblock } = parseStatblock(change(GOBLIN, "+4, reach", "+5, reach"));
		const [issue] = checkStatblock(statblock!);
		expect(issue?.message).toContain("Scimitar");
		expect(issue?.hint).toContain("+4");
		expect(issue?.hint).toContain("proficiency bonus +2");
		expect(issue?.hint).toContain("Dexterity +2 (score 15)");
	});

	it("a spell attack uses the named spellcasting ability", () => {
		expect(rules(change(MAGE, "+9, reach", "+7, reach"))).toEqual(["attack-bonus"]); // Dex would give +6 and Str +4: +7 fits neither
		expect(rules(change(MAGE, "+9 to hit", "+8 to hit"))).toEqual(["attack-bonus"]);
	});

	it("without a Spellcasting trait only Str or Dex count", () => {
		const noCaster = change(MAGE, /  - name: Spellcasting[\s\S]*$/, "");
		expect(rules(noCaster)).toEqual(["attack-bonus"]); // +9 is Int-based, and nothing names a spellcasting ability
	});

	it("also reads the 2024 text without italics", () => {
		expect(rules(change(GOBLIN, "*Melee Attack Roll:* +4", "Melee Attack Roll: +5"))).toEqual(["attack-bonus"]);
	});

	it("checks each attack in a section", () => {
		const two = `${GOBLIN}`.replace("bonus_actions: []", `bonus_actions:\n  - name: Spit\n    desc: "*Ranged Attack Roll:* +9, range 30 ft. *Hit:* 3 (1d4 + 1) Acid damage."`);
		expect(rules(two)).toEqual(["attack-bonus"]);
	});
});

describe("damage", () => {
	it("damage-average: N is the floor of the expression's average", () => {
		const { statblock } = parseStatblock(change(GOBLIN, "5 (1d6 + 2)", "6 (1d6 + 2)"));
		const [issue] = checkStatblock(statblock!);
		expect(issue?.rule).toBe("damage-average");
		expect(issue?.hint).toContain("5 (1d6 + 2)");
	});

	it("handles several dice terms", () => {
		expect(rules(change(GOBLIN, "5 (1d6 + 2)", "5 (1d6 + 2) Slashing damage plus 7 (2d6) Fire"))).toEqual([]);
		expect(rules(change(GOBLIN, "5 (1d6 + 2)", "5 (1d6 + 2) Slashing damage plus 8 (2d6) Fire"))).toEqual(["damage-average"]);
	});
});

describe("save DCs", () => {
	it("save-dc: a DC is 8 + proficiency bonus + an ability modifier", () => {
		const breath = (dc: number) => `${GOBLIN}`.replace("bonus_actions: []", `bonus_actions:\n  - name: Spit\n    desc: "*Dexterity Saving Throw:* DC ${dc}, each creature in a 15-foot Cone."`);
		expect(rules(breath(12))).toEqual([]); // 8 + 2 + Dex 2
		expect(rules(breath(11))).toEqual(["save-dc"]); // 8 + 2 + Str -1 = 9, Dex 12, Con 10: 11 fits no ability
	});

	it("the spell save DC uses the named spellcasting ability", () => {
		expect(rules(change(MAGE, "spell save DC 17", "spell save DC 15"))).toEqual(["save-dc"]);
		expect(rules(change(MAGE, "spell save DC 17", "spell save DC 14"))).toEqual(["save-dc"]); // 14 is 8 + 4 + Wis +2, but Wis is not the spellcasting ability
	});

	it("ignores DCs of ability checks", () => {
		const check = `${GOBLIN}`.replace("traits: []", `traits:\n  - name: Knack\n    desc: "It escapes unless a creature succeeds on a DC 15 Wisdom (Perception) check."`);
		expect(rules(check)).toEqual([]);
	});

	it("escape-dc: 10 + Str or Dex modifier, or the general 8 + proficiency bonus + an ability modifier", () => {
		const grab = (dc: number) => `${GOBLIN}`.replace("bonus_actions: []", `bonus_actions:\n  - name: Grab\n    desc: "The target has the Grappled condition (escape DC ${dc})."`);
		expect(rules(grab(9))).toEqual([]); // 10 + Str -1
		expect(rules(grab(12))).toEqual([]); // 10 + Dex 2, and 8 + 2 + Dex 2
		expect(rules(grab(13))).toEqual(["escape-dc"]);
	});
});
