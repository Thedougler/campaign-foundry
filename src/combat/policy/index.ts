import type { Fighter, TrialState } from "../engine/state.ts";
import { canAct } from "../engine/state.ts";
import type { Action } from "../model.ts";
import { expected, resolve } from "../rules/index.ts";
export interface Choice {
	action: Action;
	targets: Fighter[];
}
export interface Policy {
	choose(state: TrialState, actor: Fighter, actions: Action[]): Choice | undefined;
}
/** One deterministic Policy instance per side; wounded enemies remain the focus until down. */
export class GreedyPolicy implements Policy {
	choose(state: TrialState, actor: Fighter, actions: Action[]): Choice | undefined {
		let best: Choice | undefined;
		let bestValue = 0;
		for (const action of actions) {
			const support = action.primitives.some((p) => p.kind === "heal" || p.kind === "temporary-hp");
			const targets = state.fighters
				.filter((f) => !f.dead && (support ? f.side === actor.side : f.side !== actor.side && f.hp > 0))
				.sort((a, b) => a.hp - b.hp || a.id - b.id);
			const area = action.primitives.find((p) => p.kind === "save");
			const count = area?.kind === "save" ? (area.target.count ?? (area.target.area ? targets.length : 1)) : 1;
			for (const target of targets) {
				const selected = count > 1 ? targets.slice(0, count) : [target];
				let value = 0;
				for (const f of selected)
					for (const p of action.primitives) value += expected(p, { state, actor, target: f, resolve, expected });
				if (value > bestValue) {
					bestValue = value;
					best = { action, targets: selected };
				}
				// Focus fire: choose the first target for damaging actions, not the one with the weakest AC.
				if (!support) break;
			}
		}
		return best;
	}
}
export function available(actor: Fighter, cost: Action["cost"]): Action[] {
	if (!canAct(actor)) return [];
	return actor.combatant.actions.filter(
		(action) =>
			action.cost === cost &&
			!actor.recharging.has(action) &&
			(!action.uses || (actor.uses.get(action) ?? 0) < action.uses.count) &&
			(cost !== "legendary" || action.legendaryCost <= actor.legendary) &&
			(cost !== "reaction" || actor.reaction) &&
			action.primitives.every((p) => p.kind !== "resource-spend" || (actor.resources[p.resource] ?? 0) >= p.amount),
	);
}
