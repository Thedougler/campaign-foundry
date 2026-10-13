import type { Mechanic } from "../engine/state.ts";
import type { Primitive } from "../model.ts";
export const aura: Mechanic<Extract<Primitive, { kind: "aura" }>> = {
	resolve(p, c) {
		return c.actor.hp <= 0 || c.actor.dead
			? 0
			: p.save
				? c.resolve(p.save, c)
				: c.resolve({ kind: "damage", damage: p.damage }, c);
	},
	expected(p, c) {
		return c.actor.hp <= 0 || c.actor.dead
			? 0
			: p.save
				? c.expected(p.save, c)
				: c.expected({ kind: "damage", damage: p.damage }, c);
	},
};
