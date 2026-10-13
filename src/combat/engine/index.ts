import type { Action, Combatant } from "../model.ts";
import { GreedyPolicy, available } from "../policy/index.ts";
import type { Choice, Policy } from "../policy/index.ts";
import { dN, trialRng } from "../rng.ts";
import { expected, resolve } from "../rules/index.ts";
import { saveFails } from "../rules/rolls.ts";
import { regain } from "../rules/heal.ts";
import { breakConcentration, canAct, fighter } from "./state.ts";
import type { Fighter, RuleContext, TrialState } from "./state.ts";

export interface TrialResult {
	winner: number | null;
	rounds: number;
	capped: boolean;
	combatants: {
		id: number;
		side: number;
		name: string;
		hp: number;
		dead: boolean;
		downs: number;
		actionsTaken: Record<string, number>;
	}[];
}
export interface RunOptions {
	trials: number;
	seed: string | number;
	policies?: Policy[];
	deathSaves?: boolean;
	roundLimit?: number;
}
export interface RunResult {
	trials: number;
	sides: { side: number; wins: number; winRate: number }[];
	draws: number;
	rounds: { mean: number; min: number; max: number };
	capped: number;
	combatants: {
		id: number;
		side: number;
		name: string;
		path: string;
		deaths: number;
		downs: number;
		deathRate: number;
		downRate: number;
	}[];
}
export function context(state: TrialState, actor: Fighter, target = actor): RuleContext {
	return { state, actor, target, resolve, expected };
}
export function deathSave(f: Fighter, state: TrialState, roll = dN(state.rng, 20)): void {
	if (f.hp > 0 || f.dead || f.stable || !f.combatant.isPC || !state.deathSaves) return;
	if (roll === 20) {
		regain(1, context(state, f));
		return;
	}
	if (roll < 10) f.failures += roll === 1 ? 2 : 1;
	else f.successes++;
	if (f.failures >= 3) f.dead = true;
	if (f.successes >= 3) {
		f.stable = true;
		f.failures = 0;
		f.successes = 0;
	}
}
function conditionWindow(f: Fighter, state: TrialState, timing: "start" | "end"): void {
	for (const [name, active] of f.conditions) {
		const save = active.primitive.saveEnds;
		if (
			(timing === "start" && state.round >= active.expires) ||
			(save?.timing === timing && !saveFails(context(state, f), save.ability, save.dc))
		)
			f.conditions.delete(name);
	}
}
function execute(choice: Choice, actor: Fighter, state: TrialState): void {
	const action = choice.action;
	actor.uses.set(action, (actor.uses.get(action) ?? 0) + 1);
	if (action.recharge) actor.recharging.add(action);
	if (action.cost === "legendary") actor.legendary -= action.legendaryCost;
	if (action.cost === "reaction") actor.reaction = false;
	if (action.concentration) {
		breakConcentration(state, actor);
		actor.concentration = true;
	}
	for (const p of action.primitives) {
		if (!canAct(actor)) break;
		if (p.kind === "resource-spend" || p.kind === "movement") resolve(p, context(state, actor));
		else for (const target of choice.targets) resolve(p, context(state, actor, target));
	}
}
function window(actor: Fighter, state: TrialState, policies: Policy[], cost: Action["cost"]): void {
	const choice = policies[actor.side]!.choose(state, actor, available(actor, cost));
	if (choice) execute(choice, actor, state);
}
function survivors(state: TrialState): number[] {
	// An unstable PC at zero still has a chance to return on a natural 20. Finish those saves before declaring defeat.
	return [
		...new Set(
			state.fighters
				.filter((f) => !f.dead && (f.hp > 0 || (state.deathSaves && f.combatant.isPC && !f.stable)))
				.map((f) => f.side),
		),
	];
}
export function playTrial(
	sides: Combatant[][],
	seed: string | number,
	index: number,
	options: Omit<RunOptions, "seed" | "trials"> = {},
): TrialResult {
	const state: TrialState = {
		fighters: [],
		rng: trialRng(seed, index),
		round: 0,
		turn: 0,
		deathSaves: options.deathSaves ?? true,
	};
	sides.forEach((side, i) => {
		for (const c of side) state.fighters.push(fighter(c, state.fighters.length, i));
	});
	const policies = options.policies ?? sides.map(() => new GreedyPolicy());
	for (const f of state.fighters) f.initiative = dN(state.rng, 20) + f.combatant.initiative;
	const order = [...state.fighters].sort((a, b) => b.initiative - a.initiative || a.id - b.id);
	let winner: number | null = null;
	let ended = false;
	const limit = options.roundLimit ?? 100;
	for (state.round = 1; state.round <= limit && !ended; state.round++) {
		let lairDone = false;
		for (const actor of order) {
			if (!lairDone && actor.initiative < 20) {
				for (const f of order) window(f, state, policies, "lair");
				lairDone = true;
			}
			state.turn++;
			actor.reaction = true;
			actor.legendary = actor.combatant.legendaryBudget;
			actor.disengaged = false;
			for (const action of actor.recharging) {
				const roll = dN(state.rng, 6);
				if (roll >= action.recharge!.min && roll <= action.recharge!.max) actor.recharging.delete(action);
			}
			conditionWindow(actor, state, "start");
			deathSave(actor, state);
			for (const p of actor.combatant.features) if (p.kind === "regeneration") resolve(p, context(state, actor));
			actor.damagedBy.clear();
			for (const source of state.fighters)
				for (const p of source.combatant.features)
					if (p.kind === "aura" && p.timing === "start" && actor.side !== source.side)
						resolve(p, context(state, source, actor));
			if (canAct(actor)) {
				window(actor, state, policies, "action");
				window(actor, state, policies, "bonus");
			}
			conditionWindow(actor, state, "end");
			for (const source of state.fighters)
				for (const p of source.combatant.features)
					if (p.kind === "aura" && p.timing === "end" && actor.side !== source.side)
						resolve(p, context(state, source, actor));
			let remaining = survivors(state);
			if (remaining.length <= 1) {
				winner = remaining[0] ?? null;
				ended = true;
				break;
			}
			for (const legendary of order) if (legendary !== actor) window(legendary, state, policies, "legendary");
			remaining = survivors(state);
			if (remaining.length <= 1) {
				winner = remaining[0] ?? null;
				ended = true;
				break;
			}
		}
		if (!lairDone && !ended) for (const f of order) window(f, state, policies, "lair");
		const remaining = survivors(state);
		if (remaining.length <= 1) {
			winner = remaining[0] ?? null;
			ended = true;
		}
	}
	return {
		winner,
		rounds: Math.min(state.round - 1, limit),
		capped: !ended,
		combatants: state.fighters.map((f) => ({
			id: f.id,
			side: f.side,
			name: f.combatant.name,
			hp: f.hp,
			dead: f.dead,
			downs: f.downs,
			actionsTaken: Object.fromEntries([...f.uses].map(([a, n]) => [a.name, n])),
		})),
	};
}
export function runCombat(sides: Combatant[][], options: RunOptions): RunResult {
	if (sides.length < 2 || sides.some((side) => !side.length))
		throw new Error("Combat run needs at least two non-empty sides");
	if (!Number.isSafeInteger(options.trials) || options.trials < 1)
		throw new Error("Trials must be a positive safe integer");
	if (options.policies && options.policies.length !== sides.length) throw new Error("Supply one Policy per side");
	const combatants = sides.flatMap((side, i) =>
		side.map((c) => ({
			id: 0,
			side: i,
			name: c.name,
			path: c.source.path,
			deaths: 0,
			downs: 0,
			deathRate: 0,
			downRate: 0,
		})),
	);
	combatants.forEach((c, id) => {
		c.id = id;
	});
	const result: RunResult = {
		trials: options.trials,
		sides: sides.map((_, side) => ({ side, wins: 0, winRate: 0 })),
		draws: 0,
		rounds: { mean: 0, min: Infinity, max: 0 },
		capped: 0,
		combatants,
	};
	for (let i = 0; i < options.trials; i++) {
		const trial = playTrial(sides, options.seed, i, options);
		if (trial.winner === null) result.draws++;
		else result.sides[trial.winner]!.wins++;
		result.rounds.mean += trial.rounds;
		result.rounds.min = Math.min(result.rounds.min, trial.rounds);
		result.rounds.max = Math.max(result.rounds.max, trial.rounds);
		if (trial.capped) result.capped++;
		for (const f of trial.combatants) {
			if (f.dead) combatants[f.id]!.deaths++;
			if (f.downs > 0) combatants[f.id]!.downs++;
		}
	}
	result.rounds.mean /= options.trials;
	for (const side of result.sides) side.winRate = side.wins / options.trials;
	for (const c of combatants) {
		c.deathRate = c.deaths / options.trials;
		c.downRate = c.downs / options.trials;
	}
	return result;
}
