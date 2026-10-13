import type { Mechanic } from "../engine/state.ts";
import type { Primitive } from "../model.ts";
import { rollDice } from "../rng.ts";
import { distribution } from "./rolls.ts";
export const temporaryHP: Mechanic<Extract<Primitive, { kind: "heal" | "temporary-hp" }>> = {
	resolve(p, c) {
		if (c.target.dead) return 0;
		const gained = Math.max(0, rollDice(c.state.rng, p.amount) - c.target.tempHP);
		c.target.tempHP += gained;
		return gained;
	},
	expected(p, c) {
		return c.target.dead
			? 0
			: distribution(p.amount).reduce((sum, [value, chance]) => sum + chance * Math.max(0, value - c.target.tempHP), 0);
	},
};
