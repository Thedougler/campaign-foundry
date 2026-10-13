import type { Mechanic } from "../engine/state.ts";
import type { Primitive } from "../model.ts";
export const legendaryResistance: Mechanic<Extract<Primitive, { kind: "legendary-resistance" }>> = {
	resolve(p, c) {
		const spent = Math.min(p.count, c.actor.legendaryResistance);
		c.actor.legendaryResistance -= spent;
		return spent;
	},
	expected(p, c) {
		return Math.min(p.count, c.actor.legendaryResistance);
	},
};
