import { createHash } from "node:crypto";
import { uniformInt } from "pure-rand/distribution/uniformInt";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";
import type { RandomGenerator } from "pure-rand/types/RandomGenerator";
import type { Dice } from "./model.ts";

/** Derive each Trial directly, without depending on scheduling or prior Trials. */
export function trialRng(seed: string | number, trialIndex: number): RandomGenerator {
	if (!Number.isSafeInteger(trialIndex) || trialIndex < 0)
		throw new Error("Trial index must be a non-negative safe integer");
	const digest = createHash("sha256")
		.update(JSON.stringify([seed, trialIndex]))
		.digest();
	return xoroshiro128plus(digest.readInt32LE(0));
}

export function parseDice(text: string): Dice | undefined {
	const match = /^\s*(\d+)d(\d+)(?:\s*([+−-])\s*(\d+))?\s*$/i.exec(text);
	if (match && Number(match[2]) > 0)
		return {
			count: Number(match[1]),
			sides: Number(match[2]),
			bonus: (match[3] === "-" || match[3] === "−" ? -1 : 1) * Number(match[4] ?? 0),
		};
	if (/^\s*\d+\s*$/.test(text)) return { count: 0, sides: 0, bonus: Number(text) };
	return undefined;
}

export function dN(rng: RandomGenerator, sides: number): number {
	if (!Number.isSafeInteger(sides) || sides < 1) throw new Error("Die must have a positive integer number of sides");
	return uniformInt(rng, 1, sides);
}

export function rollDice(rng: RandomGenerator, dice: Dice | string): number {
	const parsed = typeof dice === "string" ? parseDice(dice) : dice;
	if (!parsed) throw new Error(`Invalid dice expression: ${dice}`);
	let total = parsed.bonus;
	for (let i = 0; i < parsed.count; i++) total += dN(rng, parsed.sides);
	return total;
}

export function d20(rng: RandomGenerator, advantage = false, disadvantage = false): number {
	const first = dN(rng, 20);
	if (advantage === disadvantage) return first;
	const second = dN(rng, 20);
	return advantage ? Math.max(first, second) : Math.min(first, second);
}
