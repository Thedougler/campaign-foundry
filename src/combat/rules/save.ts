import { flag } from "../engine/state.ts";
import type { Mechanic } from "../engine/state.ts";
import type { SavePrimitive } from "../model.ts";
import { failureProbability, saveFails } from "./rolls.ts";
export const save: Mechanic<SavePrimitive> = {
	resolve(p, c) {
		let failed = saveFails(c, p.ability, p.dc);
		if (failed && c.target.legendaryResistance > 0 && p.conditions.length) {
			c.resolve({ kind: "legendary-resistance", count: 1 }, { ...c, actor: c.target });
			failed = false;
		}
		const evasion = p.ability === "dexterity" && flag(c.target, "evasion") && p.success === "half";
		let value = 0;
		if (failed || (p.success === "half" && !evasion)) {
			const damage = { kind: "damage" as const, damage: p.damage };
			// A half-damage save halves each rolled term before affinities and applies damage only once.
			if (!failed || evasion) value += c.resolve(damage, { ...c, damageScale: 0.5 });
			else value += c.resolve(damage, c);
		}
		if (failed) for (const condition of p.conditions) value += c.resolve(condition, c);
		return value;
	},
	expected(p, c) {
		let fail = failureProbability(c, p.ability, p.dc);
		if (c.target.legendaryResistance > 0 && p.conditions.length) fail = 0;
		const evasion = p.ability === "dexterity" && flag(c.target, "evasion") && p.success === "half";
		const full = c.expected({ kind: "damage", damage: p.damage }, c);
		const half = c.expected({ kind: "damage", damage: p.damage }, { ...c, damageScale: 0.5 });
		return (
			(evasion ? fail * half : fail * full + (p.success === "half" ? (1 - fail) * half : 0)) +
			fail * p.conditions.reduce((sum, condition) => sum + c.expected(condition, c), 0)
		);
	},
};
