import { canAct, flag, has } from "../engine/state.ts";
import type { Mechanic, RuleContext } from "../engine/state.ts";
import type { AttackPrimitive, Primitive } from "../model.ts";
import { attackModifiers, d20Distribution, rollD20, rollThreshold } from "./rolls.ts";

function defence(c: RuleContext): Extract<Primitive, { kind: "parry" }> | undefined {
	if (!c.target.reaction || !canAct(c.target)) return undefined;
	return c.target.combatant.actions
		.filter(
			(a) =>
				a.cost === "reaction" && !c.target.recharging.has(a) && (!a.uses || (c.target.uses.get(a) ?? 0) < a.uses.count),
		)
		.flatMap((a) => a.primitives)
		.find((p) => p.kind === "parry");
}
function onHit(p: AttackPrimitive, c: RuleContext, expected: boolean): number {
	const effect = expected ? c.expected : c.resolve;
	let value = effect({ kind: "damage", damage: p.damage }, c);
	for (const rider of p.riders) if (!c.target.dead) value += effect(rider, c);
	for (const rider of c.actor.combatant.features)
		if (rider.kind === "sneak-attack" && !c.target.dead) value += effect(rider, c);
	return value;
}
export const attack: Mechanic<AttackPrimitive> = {
	resolve(p, context) {
		if (context.target.dead) return 0;
		let c = { ...context, attack: p };
		const [adv, dis] = attackModifiers(c);
		const roll = rollD20(c, adv, dis, rollThreshold(c, "attack"));
		const critical = roll === 20 || (p.mode !== "ranged" && has(c.target, "paralyzed", "unconscious"));
		if (roll === 1 || (roll !== 20 && roll + p.toHit < c.target.combatant.ac)) return 0;
		const reaction = defence(c);
		if (reaction) {
			const amount = c.resolve(reaction, { ...c, actor: c.target });
			const action = c.target.combatant.actions.find((a) => a.cost === "reaction" && a.primitives.includes(reaction));
			if (action) {
				c.target.uses.set(action, (c.target.uses.get(action) ?? 0) + 1);
				if (action.recharge) c.target.recharging.add(action);
			}
			if (reaction.acBonus && roll !== 20 && roll + p.toHit < c.target.combatant.ac + amount) return 0;
			if (reaction.reduction) c = { ...c, damageReduction: amount };
		} else if (c.target.reaction && canAct(c.target) && flag(c.target, "uncanny-dodge")) {
			c.target.reaction = false;
			c = { ...c, damageScale: 0.5 };
		}
		const value = onHit(p, { ...c, critical }, false);
		c.actor.hidden = false;
		return value;
	},
	expected(p, context) {
		if (context.target.dead) return 0;
		const c = { ...context, attack: p };
		const [adv, dis] = attackModifiers(c);
		const reaction = defence(c);
		let total = 0;
		for (const [roll, chance] of d20Distribution(adv, dis, rollThreshold(c, "attack"))) {
			if (roll === 1 || (roll !== 20 && roll + p.toHit < c.target.combatant.ac + (reaction?.acBonus ?? 0))) continue;
			const critical = roll === 20 || (p.mode !== "ranged" && has(c.target, "paralyzed", "unconscious"));
			total +=
				chance *
				onHit(
					p,
					{
						...c,
						critical,
						damageReductionDice: reaction?.reduction,
						damageScale:
							!reaction && c.target.reaction && canAct(c.target) && flag(c.target, "uncanny-dodge") ? 0.5 : 1,
					},
					true,
				);
		}
		return total;
	},
};
