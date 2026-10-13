import type { Mechanic, RuleContext } from "../engine/state.ts";
import type { ActionReference, MultiattackPrimitive } from "../model.ts";
function score(refs: ActionReference[], c: RuleContext): number {
	let total = 0;
	for (const ref of refs) {
		const action = c.actor.combatant.actions.find((a) => a.name === ref.action);
		if (!action) throw new Error(`Missing multiattack Action: ${ref.action}`);
		for (const p of action.primitives) total += ref.count * c.expected(p, c);
	}
	return total;
}
export const multiattack: Mechanic<MultiattackPrimitive> = {
	resolve(p, c) {
		const refs = [...p.alternatives].sort((a, b) => score(b, c) - score(a, c))[0] ?? [];
		let value = 0;
		for (const ref of refs) {
			const action = c.actor.combatant.actions.find((a) => a.name === ref.action)!;
			for (let i = 0; i < ref.count; i++) {
				if (!c.target.hp || c.target.dead) {
					const next = c.state.fighters
						.filter((f) => f.side !== c.actor.side && f.hp > 0 && !f.dead)
						.sort((a, b) => a.hp - b.hp || a.id - b.id)[0];
					if (next) c = { ...c, target: next };
				}
				for (const effect of action.primitives) value += c.resolve(effect, c);
			}
		}
		return value;
	},
	expected(p, c) {
		return Math.max(0, ...p.alternatives.map((refs) => score(refs, c)));
	},
};
