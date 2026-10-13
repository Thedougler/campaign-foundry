import type { Mechanic } from "../engine/state.ts";
import type { Primitive } from "../model.ts";
export const regeneration: Mechanic<Extract<Primitive, { kind: "regeneration" }>> = {
	resolve(p, c) {
		return c.actor.dead || p.disabledBy.some((t) => c.actor.damagedBy.has(t))
			? 0
			: c.resolve({ kind: "heal", amount: p.amount }, { ...c, target: c.actor });
	},
	expected(p, c) {
		return c.actor.dead || p.disabledBy.some((t) => c.actor.damagedBy.has(t))
			? 0
			: c.expected({ kind: "heal", amount: p.amount }, { ...c, target: c.actor });
	},
};
