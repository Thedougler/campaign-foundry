import type { Mechanic } from "../engine/state.ts";
import type { Primitive } from "../model.ts";
export const resourceSpend: Mechanic<Extract<Primitive, { kind: "resource-spend" }>> = {
	resolve(p, c) {
		if ((c.actor.resources[p.resource] ?? 0) < p.amount) throw new Error(`Insufficient ${p.resource}`);
		c.actor.resources[p.resource]! -= p.amount;
		return 0;
	},
	expected() {
		return 0;
	},
};
