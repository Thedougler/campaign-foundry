/** 2024 Low / Moderate / High XP budget per character by level. SRD 5.2. */
export const XP_BUDGET_PER_CHARACTER: Record<number, readonly [number, number, number]> = {
	1: [50, 75, 100],
	2: [100, 150, 200],
	3: [150, 225, 400],
	4: [250, 375, 500],
	5: [500, 750, 1100],
	6: [600, 1000, 1400],
	7: [750, 1300, 1700],
	8: [1000, 1700, 2100],
	9: [1300, 2000, 2600],
	10: [1600, 2300, 3100],
	11: [1900, 2900, 4100],
	12: [2200, 3700, 4700],
	13: [2600, 4200, 5400],
	14: [2900, 4900, 6200],
	15: [3300, 5400, 7800],
	16: [3800, 6100, 9800],
	17: [4500, 7200, 11700],
	18: [5000, 8700, 14200],
	19: [5500, 10700, 17200],
	20: [6400, 13200, 22000],
};

export const DIFFICULTIES = ["low", "moderate", "high"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];
export type DifficultyLabel = Difficulty | "beyond high";

export interface PartyBudgets {
	low: number;
	moderate: number;
	high: number;
}

export interface CreatureSpend {
	name: string;
	cr: string;
	xp: number;
	count: number;
}

export function partyBudgets(levels: number[]): PartyBudgets {
	let low = 0;
	let moderate = 0;
	let high = 0;
	for (const level of levels) {
		const row = XP_BUDGET_PER_CHARACTER[level];
		if (!row) throw new RangeError(`Character levels must be from 1 to 20, not ${level}`);
		low += row[0];
		moderate += row[1];
		high += row[2];
	}
	return { low, moderate, high };
}

/** Lowest 2024 band the total fits in. Equal to a band ceiling is that band; one XP over High is beyond high. */
export function difficultyFor(totalXp: number, budgets: PartyBudgets): DifficultyLabel {
	for (const difficulty of DIFFICULTIES) {
		if (totalXp <= budgets[difficulty]) return difficulty;
	}
	return "beyond high";
}

export function describeParty(levels: number[]): string {
	const first = levels[0];
	if (first !== undefined && levels.every((level) => level === first)) {
		return `${levels.length} characters, level ${first}`;
	}
	return `${levels.length} characters, levels ${levels.join(", ")}`;
}
