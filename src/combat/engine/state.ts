import type { RandomGenerator } from "pure-rand/types/RandomGenerator";
import type {
	Action,
	AttackPrimitive,
	Combatant,
	Condition,
	ConditionPrimitive,
	DamageType,
	Dice,
	Primitive,
} from "../model.ts";

export interface ActiveCondition {
	primitive: ConditionPrimitive;
	source: number;
	expires: number;
}
export interface Fighter {
	id: number;
	side: number;
	combatant: Combatant;
	hp: number;
	tempHP: number;
	dead: boolean;
	failures: number;
	successes: number;
	stable: boolean;
	downs: number;
	initiative: number;
	conditions: Map<Condition, ActiveCondition>;
	reaction: boolean;
	legendary: number;
	legendaryResistance: number;
	uses: Map<Action, number>;
	recharging: Set<Action>;
	resources: Record<string, number>;
	riderTurn: number;
	damagedBy: Set<DamageType>;
	concentration: boolean;
	hidden: boolean;
	disengaged: boolean;
}
export interface TrialState {
	fighters: Fighter[];
	rng: RandomGenerator;
	round: number;
	turn: number;
	deathSaves: boolean;
}
export interface RuleContext {
	state: TrialState;
	actor: Fighter;
	target: Fighter;
	critical?: boolean;
	attack?: AttackPrimitive;
	damageScale?: number;
	damageReduction?: number;
	damageReductionDice?: Dice;
	resolve: (primitive: Primitive, context: RuleContext) => number;
	expected: (primitive: Primitive, context: RuleContext) => number;
}
export interface Mechanic<P extends Primitive> {
	resolve: (primitive: P, context: RuleContext) => number;
	expected: (primitive: P, context: RuleContext) => number;
}
export function fighter(combatant: Combatant, id: number, side: number): Fighter {
	return {
		id,
		side,
		combatant,
		hp: combatant.hp,
		tempHP: 0,
		dead: false,
		failures: 0,
		successes: 0,
		stable: false,
		downs: 0,
		initiative: 0,
		conditions: new Map(),
		reaction: true,
		legendary: combatant.legendaryBudget,
		uses: new Map(),
		recharging: new Set(),
		resources: { ...combatant.resources },
		legendaryResistance: combatant.legendaryResistance,
		riderTurn: -1,
		damagedBy: new Set(),
		concentration: false,
		hidden: false,
		disengaged: false,
	};
}
export function has(f: Fighter, ...conditions: Condition[]): boolean {
	return conditions.some((c) => f.conditions.has(c));
}
export function conscious(f: Fighter): boolean {
	return !f.dead && f.hp > 0 && !has(f, "unconscious");
}
export function canAct(f: Fighter): boolean {
	return conscious(f) && !has(f, "incapacitated", "paralyzed", "petrified", "stunned");
}
export function flag(f: Fighter, value: Extract<Primitive, { kind: "feature" }>["flag"]): boolean {
	return f.combatant.features.some((p) => p.kind === "feature" && p.flag === value);
}
export function breakConcentration(state: TrialState, source: Fighter): void {
	source.concentration = false;
	for (const f of state.fighters)
		for (const [name, condition] of f.conditions)
			if (condition.source === source.id && condition.primitive.concentration) f.conditions.delete(name);
}
export function durationRounds(duration?: string): number {
	if (!duration) return Infinity;
	const match = /(\d+)\s*(round|minute|hour)/i.exec(duration);
	if (match)
		return (
			Number(match[1]) * (match[2]!.toLowerCase() === "round" ? 1 : match[2]!.toLowerCase() === "minute" ? 10 : 600)
		);
	if (/next turn/i.test(duration)) return 1;
	return Infinity;
}
