import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { computeSheet } from "../../src/pull/sheet.ts";
import type { DdbCharacter } from "../../src/pull/ddb.ts";
import { renderSheet } from "../../src/pull/render.ts";

const load = (name: string): DdbCharacter =>
	(JSON.parse(readFileSync(join(import.meta.dirname, "fixtures", name), "utf8")) as { data: DdbCharacter }).data;

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
		expect(sheet).toMatchObject({
			size: "Medium",
			hitDice: "5d8 + 10",
			initiativeBonus: 7,
			perceptionBonus: 8,
			languages: ["Common", "Common Sign Language", "Thieves’ Cant", "Dwarvish", "Celestial"],
		});
		expect(sheet.attacks).toMatchObject([
			{ name: "Tarell House Blade", toHit: 8, damageDice: "1d6", damageBonus: 5, reach: 5 },
			{ name: "Dagger", toHit: 7, damageDice: "1d4", damageBonus: 4, reach: 5, range: { normal: 20, long: 60 } },
			{ name: "Shortbow", toHit: 7, damageDice: "1d6", damageBonus: 4, range: { normal: 80, long: 320 } },
		]);
	});
});

it("renders weapon ability/proficiency, reach/versatile and feature rules with rest limits from the payload", () => {
	const c = load("character-rogue.json");
	c.overrideStats = [{ id: 1, value: 20 }];
	c.inventory = [
		...c.inventory.filter((i) => i.definition.name === "Shortbow"),
		{
			quantity: 1,
			equipped: true,
			isAttuned: false,
			definition: {
				id: 1,
				name: "Longsword",
				type: "Longsword",
				categoryId: 2,
				filterType: "Weapon",
				attackType: 1,
				damage: { diceString: "1d8" },
				damageType: "Slashing",
				range: 5,
				properties: [{ name: "Versatile", notes: "1d10" }],
			},
		},
		{
			quantity: 1,
			equipped: true,
			isAttuned: false,
			definition: {
				id: 2,
				name: "Whip",
				type: "Whip",
				categoryId: 2,
				filterType: "Weapon",
				attackType: 1,
				damage: { diceString: "1d4" },
				damageType: "Slashing",
				range: 5,
				properties: [{ name: "Finesse" }, { name: "Reach" }],
			},
		},
	];
	c.actions = {
		feat: [
			{
				name: "Lucky",
				snippet: "<p>Spend 1 of {{limiteduse}} Luck Points &amp; gain Advantage.</p>",
				limitedUse: { maxUses: 0, useProficiencyBonus: true, resetType: 2 },
			},
			{
				name: "Second Wind",
				snippet: "Regain 1d10 Hit Points.",
				activation: { activationType: 3 },
				limitedUse: { maxUses: 2, resetType: 1 },
			},
			{
				name: "Parry",
				snippet: "Reduce damage.",
				activation: { activationType: 4 },
				limitedUse: { maxUses: 1, resetType: 3 },
			},
		],
	};
	const rendered = renderSheet(computeSheet(c), "Sam");
	expect(rendered).toContain(
		"*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 9 (1d8 + 5) Slashing damage, or 10 (1d10 + 5) Slashing damage if used with two hands.",
	);
	expect(rendered).toContain("*Melee Attack Roll:* +5, reach 10 ft. *Hit:* 7 (1d4 + 5) Slashing damage.");
	expect(rendered).toContain("*Ranged Attack Roll:* +7, range 80/320 ft. *Hit:* 7 (1d6 + 4) Piercing damage.");
	expect(rendered).toContain('name: "Lucky (3/Long Rest)"\n    desc: "Spend 1 of 3 Luck Points & gain Advantage."');
	expect(rendered).toContain('bonus_actions:\n  - name: "Second Wind (2/Short Rest)"');
	expect(rendered).toContain('reactions:\n  - name: "Parry (1/Day)"');
});

it("resolves scaled and rounded D&D Beyond snippets even when an action supplies the final description", () => {
	const c = load("character-rogue.json");
	c.classes[0]!.classFeatures!.push({
		definition: { name: "Magical Cunning", requiredLevel: 2 },
		levelScale: { fixedValue: 2 },
	});
	c.actions = {
		class: [
			{ name: "Sneak Attack", snippet: "Deal {{scalevalue}} extra damage." },
			{
				name: "Magical Cunning",
				snippet: "Regain {{(scalevalue/2)@roundup}} slots.",
				limitedUse: { maxUses: 1, resetType: 2 },
			},
			{ name: "Jack of All Trades", snippet: "Add {{(proficiency/2)@rounddown}} to the check." },
			{ name: "Bardic Inspiration", snippet: "Use {{modifier:cha@min:1#unsigned}} times; save DC {{savedc:cha}}." },
		],
	};
	const rendered = renderSheet(computeSheet(c), "Sam");
	expect(rendered).toContain('name: "Sneak Attack (3d6)"\n    desc: "Deal 3d6 extra damage."');
	expect(rendered).toContain('name: "Magical Cunning (1/Long Rest)"\n    desc: "Regain 1 slots."');
	expect(rendered).toContain('desc: "Add 1 to the check."');
	expect(rendered).toContain('desc: "Use 3 times; save DC 14."');
	expect(rendered).not.toContain("{{");
});

it("uses Charisma and proficiency only for the selected Pact of the Blade weapon", () => {
	const c = load("character-rogue.json");
	c.overrideStats = [
		{ id: 1, value: 6 },
		{ id: 6, value: 20 },
	];
	c.inventory = [
		{
			id: 42,
			quantity: 1,
			equipped: true,
			isAttuned: false,
			definition: {
				id: 4,
				name: "Longsword",
				type: "Longsword",
				categoryId: 2,
				filterType: "Weapon",
				attackType: 1,
				damage: { diceString: "1d8" },
				damageType: "Slashing",
				range: 5,
				properties: [{ name: "Versatile", notes: "1d10" }],
			},
		},
	];
	c.modifiers = {
		class: [
			{
				type: "enable-feature",
				subType: "enable-pact-weapon",
				value: null,
				fixedValue: null,
				statId: null,
				restriction: null,
				dice: null,
				componentId: 4496889,
			},
		],
	};
	c.characterValues = [{ typeId: 28, value: true, valueId: "42" }];
	expect(renderSheet(computeSheet(c), "Sam")).toContain(
		"*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 9 (1d8 + 5) Slashing damage, or 10 (1d10 + 5) Slashing damage if used with two hands.",
	);
	c.characterValues[0]!.valueId = "43";
	expect(computeSheet(c).attacks[0]).toMatchObject({ toHit: -2, damageBonus: -2 });
});

it("renders racial and feature senses and known languages, not a language selection or reference table", () => {
	const c = load("character-rogue.json");
	const m = c.modifiers.race![0]!;
	c.modifiers.race = [
		...c.modifiers.race!.filter((m) => m.type !== "language"),
		{ ...m, type: "set-base", subType: "blindsight", value: 5, fixedValue: 5 },
		{ ...m, type: "language", subType: "common", friendlySubtypeName: "Common" },
		{
			...m,
			type: "language",
			subType: "select-a-standard-language",
			friendlySubtypeName: "Select a Standard Language",
		},
	];
	c.modifiers.class!.push({ ...m, type: "sense", subType: "blindsight", value: 5, fixedValue: 5 });
	c.customSenses = [{ senseId: 4, distance: 30 }];
	c.race.racialTraits = [
		{
			definition: {
				name: "Languages",
				description:
					"<p>You know [language]Common[/language] and [language]Skitter-cant[/language], plus one language of your choice.</p><table><tr><td>[language]Aquan[/language]</td></tr></table>",
			},
		},
	];
	const rendered = renderSheet(computeSheet(c), "Sam");
	expect(rendered).toContain('senses: "blindsight 10 ft., truesight 30 ft., passive Perception 18"');
	expect(computeSheet(c).languages).toEqual(["Common", "Thieves’ Cant", "Dwarvish", "Celestial", "Skitter-cant"]);
	expect(rendered).not.toContain("Select a Standard Language");
	expect(rendered).not.toContain('languages: "Aquan"');
});

it("honors the DDB Armor Class override separately from armor, shield and attuned-item flags", () => {
	const c = load("character-rogue.json");
	const sorcerer = load("character-sorcerer.json");
	const armor = c.inventory.find((i) => i.definition.filterType === "Armor")!;
	const cloak = sorcerer.inventory.find((i) => i.definition.name === "Cloak of Protection")!;
	const shield = {
		id: 43,
		quantity: 1,
		equipped: false,
		isAttuned: false,
		definition: { id: 8, name: "Shield", filterType: "Armor", armorClass: 2, armorTypeId: 4 },
	};
	c.inventory = [{ ...armor, definition: { ...armor.definition, armorClass: 12 } }, cloak, shield];
	c.modifiers.item = sorcerer.modifiers.item;
	expect(computeSheet(c).armorClass.value).toBe(17);
	c.characterValues = [{ typeId: 1, value: 18 }];
	expect(renderSheet(computeSheet(c), "Sam")).toContain("ac: 18\n");
	c.characterValues = [];
	shield.equipped = true;
	expect(computeSheet(c).armorClass.value).toBe(19);
});
