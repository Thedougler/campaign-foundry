import { attackModifiers } from "./rolls.ts";
import type { Mechanic, RuleContext } from "../engine/state.ts";
import type { Primitive } from "../model.ts";
function eligible(c: RuleContext): boolean {
	const [adv, dis] = attackModifiers(c);
	return Boolean(
		c.attack &&
			c.actor.riderTurn !== c.state.turn &&
			!dis &&
			(adv || c.state.fighters.some((f) => f !== c.actor && f.side === c.actor.side && f.hp > 0 && !f.dead)),
	);
}
export const sneakAttack: Mechanic<Extract<Primitive, { kind: "sneak-attack" }>> = {
	resolve(p, c) {
		if (!eligible(c)) return 0;
		c.actor.riderTurn = c.state.turn;
		return c.resolve({ kind: "damage", damage: [{ dice: p.dice, type: c.attack!.damage[0]?.type ?? "piercing" }] }, c);
	},
	expected(p, c) {
		return eligible(c)
			? c.expected({ kind: "damage", damage: [{ dice: p.dice, type: c.attack!.damage[0]?.type ?? "piercing" }] }, c)
			: 0;
	},
};
