export interface Dice {
	/** `[count, sides]` for each `XdY` term. */
	terms: [number, number][];
	/** Sum of the flat numbers, signed. */
	flat: number;
}

const TERM = /^(?:(\d+)d(\d+)|\d+)$/i;

/** Parses `2d8 + 1d6 - 2` (a real minus sign works too). Returns undefined when it is not a dice expression. */
export function parseDice(text: string): Dice | undefined {
	const parts = text.trim().split(/\s*([+\-−])\s*/);
	const terms: [number, number][] = [];
	let flat = 0;
	for (let i = 0; i < parts.length; i += 2) {
		const part = parts[i] ?? "";
		const positive = i === 0 || parts[i - 1] === "+";
		const match = TERM.exec(part);
		if (!match) return undefined;
		if (match[1] === undefined) flat += (positive ? 1 : -1) * Number(part);
		else if (positive) terms.push([Number(match[1]), Number(match[2])]);
		else return undefined;
	}
	return terms.length > 0 ? { terms, flat } : undefined;
}

/** The average as printed in a stat block: rounded down. */
export function averageOf(dice: Dice): number {
	return Math.floor(dice.terms.reduce((sum, [count, sides]) => sum + (count * (sides + 1)) / 2, 0) + dice.flat);
}
