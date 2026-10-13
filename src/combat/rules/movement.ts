import { canAct, flag } from "../engine/state.ts";
import type { Mechanic, RuleContext } from "../engine/state.ts";
import type { AttackPrimitive, Primitive } from "../model.ts";
function opportunities(c: RuleContext): { enemy: RuleContext["actor"]; attack: AttackPrimitive }[] {
	if (c.actor.disengaged || flag(c.actor, "flyby")) return [];
	return c.state.fighters
		.filter((f) => f.side !== c.actor.side && f.reaction && canAct(f))
		.flatMap((enemy) => {
			const attack = enemy.combatant.actions
				.flatMap((a) => a.primitives)
				.find((p): p is AttackPrimitive => p.kind === "attack" && p.mode !== "ranged");
			return attack ? [{ enemy, attack }] : [];
		});
}
export const movement: Mechanic<Extract<Primitive, { kind: "movement" }>> = {
	resolve(p, c) {
		if (p.mode === "disengage") c.actor.disengaged = true;
		if (p.mode === "hide") c.actor.hidden = true;
		if (p.mode !== "move" && p.mode !== "dash") return 0;
		let value = 0;
		for (const { enemy, attack } of opportunities(c)) {
			enemy.reaction = false;
			value -= c.resolve(attack, { ...c, actor: enemy, target: c.actor });
			if (!canAct(c.actor)) break;
		}
		return value;
	},
	expected(p, c) {
		return p.mode !== "move" && p.mode !== "dash"
			? 0
			: opportunities(c).reduce(
					(sum, { enemy, attack }) => sum - c.expected(attack, { ...c, actor: enemy, target: c.actor }),
					0,
				);
	},
};
