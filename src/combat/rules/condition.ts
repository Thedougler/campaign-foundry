import { breakConcentration, durationRounds } from "../engine/state.ts";
import type { Mechanic } from "../engine/state.ts";
import type { ConditionPrimitive } from "../model.ts";
export const condition: Mechanic<ConditionPrimitive> = {
	resolve(p, c) {
		if (c.target.dead || c.target.combatant.conditionImmunities.includes(p.condition)) return 0;
		c.target.conditions.set(p.condition, {
			primitive: p,
			source: c.actor.id,
			expires: c.state.round + durationRounds(p.duration),
		});
		if (["incapacitated", "paralyzed", "stunned", "unconscious", "petrified"].includes(p.condition))
			breakConcentration(c.state, c.target);
		if (p.concentration) c.actor.concentration = true;
		return 1;
	},
	expected(p, c) {
		return c.target.dead || c.target.combatant.conditionImmunities.includes(p.condition) ? 0 : 1;
	},
};
