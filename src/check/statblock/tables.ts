/** 2024 rules tables, each confirmed against the SRD 5.2 API (`https://www.dnd5eapi.co/api/2024`). */

export const ABILITIES = ["str", "dex", "con", "int", "wis", "cha"] as const;
export type Ability = (typeof ABILITIES)[number];

export const ABILITY_NAMES: Record<Ability, string> = {
	str: "Strength",
	dex: "Dexterity",
	con: "Constitution",
	int: "Intelligence",
	wis: "Wisdom",
	cha: "Charisma",
};

/** `/skills/{index}` `.ability_score.index` for every skill. Keys are lowercase with spaces. */
export const SKILL_ABILITY: Record<string, Ability> = {
	acrobatics: "dex",
	"animal handling": "wis",
	arcana: "int",
	athletics: "str",
	deception: "cha",
	history: "int",
	insight: "wis",
	intimidation: "cha",
	investigation: "int",
	medicine: "wis",
	nature: "int",
	perception: "wis",
	performance: "cha",
	persuasion: "cha",
	religion: "int",
	"sleight of hand": "dex",
	stealth: "dex",
	survival: "wis",
};

/** Proficiency bonus by challenge rating: the lowest CR of each band and its bonus (`proficiency_bonus` on `/monsters/{index}`). */
const PROFICIENCY_BY_CR: [minCr: number, bonus: number][] = [
	[29, 9],
	[25, 8],
	[21, 7],
	[17, 6],
	[13, 5],
	[9, 4],
	[5, 3],
	[0, 2],
];

export function proficiencyBonus(cr: number): number {
	return PROFICIENCY_BY_CR.find(([min]) => cr >= min)?.[1] ?? 2;
}

/** Hit Die size by creature size (`hit_points_roll` on `/monsters/{index}` for one Creature of each size). */
export const HIT_DIE_BY_SIZE: Record<string, number> = {
	tiny: 4,
	small: 6,
	medium: 8,
	large: 10,
	huge: 12,
	gargantuan: 20,
};

export function abilityModifier(score: number): number {
	return Math.floor((score - 10) / 2);
}

export function signed(n: number): string {
	return n < 0 ? `-${-n}` : `+${n}`;
}
