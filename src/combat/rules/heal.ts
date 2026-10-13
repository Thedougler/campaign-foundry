import type { Mechanic, RuleContext } from "../engine/state.ts";
import type { Primitive } from "../model.ts";
import { rollDice } from "../rng.ts";
import { distribution } from "./rolls.ts";
export function regain(amount: number, c: RuleContext): number {
	const f = c.target;
	if (f.dead) return 0;
	const gained = Math.min(f.combatant.hp - f.hp, Math.max(0, amount));
	f.hp += gained;
	if (f.hp > 0) {
		f.conditions.delete("unconscious");
		f.failures = 0;
		f.successes = 0;
		f.stable = false;
	}
	return gained;
}
export const heal: Mechanic<Extract<Primitive, { kind: "heal" | "temporary-hp" }>> = {
	resolve(p, c) {
		return regain(rollDice(c.state.rng, p.amount), c);
	},
	expected(p, c) {
		return c.target.dead
			? 0
			: distribution(p.amount).reduce(
					(sum, [value, chance]) => sum + chance * Math.min(c.target.combatant.hp - c.target.hp, Math.max(0, value)),
					0,
				);
	},
};
