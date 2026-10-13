import type { Mechanic } from "../engine/state.ts";
import type { Primitive } from "../model.ts";
import { rollDice } from "../rng.ts";
import { distribution } from "./rolls.ts";
export const parry: Mechanic<Extract<Primitive, { kind: "parry" }>> = {
	resolve(p, c) {
		if (!c.actor.reaction) return 0;
		c.actor.reaction = false;
		return p.acBonus ?? (p.reduction ? rollDice(c.state.rng, p.reduction) : 0);
	},
	expected(p, c) {
		return !c.actor.reaction
			? 0
			: (p.acBonus ??
					(p.reduction ? distribution(p.reduction).reduce((sum, [value, chance]) => sum + value * chance, 0) : 0));
	},
};
