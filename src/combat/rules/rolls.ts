import type { RuleContext } from "../engine/state.ts";
import { flag, has } from "../engine/state.ts";
import type { Ability, Dice } from "../model.ts";
import { d20, dN } from "../rng.ts";

const diceDistributions = new Map<string, [number, number][]>();
/** Exact dice distributions keep rounding, resistance and healing caps identical in both paths. */
export function distribution(dice: Dice, critical = false): [number, number][] {
	const key = `${dice.count}:${dice.sides}:${dice.bonus}:${critical}`;
	const cached = diceDistributions.get(key);
	if (cached) return cached;
	let values = new Map([[dice.bonus, 1]]);
	for (let n = 0; n < dice.count * (critical ? 2 : 1); n++) {
		const next = new Map<number, number>();
		for (const [value, probability] of values)
			for (let die = 1; die <= dice.sides; die++)
				next.set(value + die, (next.get(value + die) ?? 0) + probability / dice.sides);
		values = next;
	}
	const result = [...values];
	diceDistributions.set(key, result);
	return result;
}
export function attackModifiers(c: RuleContext): [boolean, boolean] {
	const { actor, target, state, attack } = c;
	const ally = state.fighters.some((f) => f.side === actor.side && f !== actor && f.hp > 0 && !f.dead);
	return [
		Boolean(
			attack?.advantage ||
				actor.hidden ||
				has(actor, "invisible") ||
				has(target, "blinded", "restrained", "stunned", "paralyzed", "unconscious") ||
				(has(target, "prone") && attack?.mode !== "ranged") ||
				(flag(actor, "pack-tactics") && ally),
		),
		Boolean(
			attack?.disadvantage ||
				has(actor, "blinded", "poisoned", "frightened", "restrained") ||
				has(target, "invisible") ||
				has(actor, "prone") ||
				(has(target, "prone") && attack?.mode === "ranged"),
		),
	];
}
export function rollThreshold(c: RuleContext, roll: "attack" | "save"): number {
	return Math.max(
		roll === "attack" ? (c.attack?.rerollBelow ?? 0) : 0,
		...c.actor.combatant.features
			.filter((p) => p.kind === "reroll" && p.roll === roll)
			.map((p) => (p.kind === "reroll" ? p.below : 0)),
	);
}
export function rollD20(c: RuleContext, advantage: boolean, disadvantage: boolean, threshold: number): number {
	const one = () => {
		const value = dN(c.state.rng, 20);
		return value < threshold ? dN(c.state.rng, 20) : value;
	};
	if (!threshold) return d20(c.state.rng, advantage, disadvantage);
	const a = one();
	if (advantage === disadvantage) return a;
	const b = one();
	return advantage ? Math.max(a, b) : Math.min(a, b);
}
export function d20Distribution(advantage: boolean, disadvantage: boolean, threshold = 0): [number, number][] {
	const single = Array.from(
		{ length: 20 },
		(_, i) => (i + 1 < threshold ? 0 : 0.05) + Math.min(20, Math.max(0, threshold - 1)) / 400,
	);
	if (advantage === disadvantage) return single.map((p, i) => [i + 1, p]);
	const probs = Array<number>(20).fill(0);
	for (let a = 0; a < 20; a++)
		for (let b = 0; b < 20; b++) {
			const i = advantage ? Math.max(a, b) : Math.min(a, b);
			probs[i]! += single[a]! * single[b]!;
		}
	return probs.map((p, i) => [i + 1, p]);
}
export function saveFails(c: RuleContext, ability: Ability, dc: number): boolean {
	if ((ability === "strength" || ability === "dexterity") && has(c.target, "paralyzed", "stunned", "unconscious"))
		return true;
	const targetContext = { ...c, actor: c.target };
	return (
		rollD20(
			targetContext,
			flag(c.target, "magic-resistance"),
			ability === "dexterity" && has(c.target, "restrained"),
			rollThreshold(targetContext, "save"),
		) +
			c.target.combatant.saves[ability] <
		dc
	);
}
export function failureProbability(c: RuleContext, ability: Ability, dc: number): number {
	if ((ability === "strength" || ability === "dexterity") && has(c.target, "paralyzed", "stunned", "unconscious"))
		return 1;
	const targetContext = { ...c, actor: c.target };
	return d20Distribution(
		flag(c.target, "magic-resistance"),
		ability === "dexterity" && has(c.target, "restrained"),
		rollThreshold(targetContext, "save"),
	).reduce((p, [roll, chance]) => p + (roll + c.target.combatant.saves[ability] < dc ? chance : 0), 0);
}
