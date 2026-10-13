import type { FeatureSection } from "../check/statblock/parse.ts";

export const ABILITIES = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"] as const;
export type Ability = (typeof ABILITIES)[number];
export const DAMAGE_TYPES = [
	"acid",
	"bludgeoning",
	"cold",
	"fire",
	"force",
	"lightning",
	"necrotic",
	"piercing",
	"poison",
	"psychic",
	"radiant",
	"slashing",
	"thunder",
] as const;
export type DamageType = (typeof DAMAGE_TYPES)[number];
export const CONDITIONS = [
	"blinded",
	"charmed",
	"deafened",
	"exhaustion",
	"frightened",
	"grappled",
	"incapacitated",
	"invisible",
	"paralyzed",
	"petrified",
	"poisoned",
	"prone",
	"restrained",
	"stunned",
	"unconscious",
] as const;
export type Condition = (typeof CONDITIONS)[number];
export interface Dice {
	count: number;
	sides: number;
	bonus: number;
}
export interface DamageTerm {
	dice: Dice;
	type: DamageType;
}
export interface DamageAffinity {
	types: DamageType[];
	qualifier?: string;
}
export type ActionCost = "action" | "bonus" | "reaction" | "legendary" | "lair";
export interface UseLimit {
	count: number;
	reset: "day" | "long-rest" | "short-rest";
}
export interface Recharge {
	min: number;
	max: number;
}
export interface Target {
	count?: number;
	area?: { shape: "cone" | "line" | "sphere" | "cube" | "radius"; feet: number };
	range?: number;
	description: string;
}
export interface ConditionPrimitive {
	kind: "condition";
	condition: Condition;
	escapeDC?: number;
	duration?: string;
	saveEnds?: { ability: Ability; dc: number; timing: "start" | "end" };
	concentration?: boolean;
}
export interface SavePrimitive {
	kind: "save";
	ability: Ability;
	dc: number;
	target: Target;
	damage: DamageTerm[];
	success: "half" | "none";
	conditions: ConditionPrimitive[];
}
export interface AttackPrimitive {
	kind: "attack";
	mode: "melee" | "ranged" | "melee-or-ranged";
	toHit: number;
	reach?: number;
	range?: { normal: number; long?: number };
	damage: DamageTerm[];
	riders: (ConditionPrimitive | SavePrimitive)[];
	magical?: boolean;
	silvered?: boolean;
	advantage?: boolean;
	disadvantage?: boolean;
	rerollBelow?: number;
}
export interface ActionReference {
	action: string;
	count: number;
}
export interface MultiattackPrimitive {
	kind: "multiattack";
	alternatives: ActionReference[][];
}
export type FeatureFlag =
	| "pack-tactics"
	| "magic-resistance"
	| "uncanny-dodge"
	| "evasion"
	| "nimble-escape"
	| "brute"
	| "amphibious"
	| "water-breathing"
	| "flyby"
	| "spider-climb"
	| "turn-resistance";
export type Primitive =
	| AttackPrimitive
	| SavePrimitive
	| ConditionPrimitive
	| MultiattackPrimitive
	| { kind: "damage"; damage: DamageTerm[] }
	| { kind: "reroll"; below: number; roll: "attack" | "save" }
	| { kind: "heal" | "temporary-hp"; amount: Dice }
	| { kind: "movement"; mode: "dash" | "disengage" | "hide" | "move" | "teleport"; feet?: number }
	| { kind: "resource-spend"; resource: string; amount: number }
	| { kind: "feature"; flag: FeatureFlag }
	| { kind: "sneak-attack"; dice: Dice }
	| { kind: "parry"; acBonus?: number; reduction?: Dice }
	| { kind: "legendary-resistance"; count: number }
	| { kind: "regeneration"; amount: Dice; disabledBy: DamageType[]; description: string }
	| {
			kind: "aura";
			radius: number;
			timing: "start" | "end" | "enter" | "touch";
			damage: DamageTerm[];
			save?: SavePrimitive;
	  };
export interface Action {
	name: string;
	cost: ActionCost;
	legendaryCost: number;
	uses?: UseLimit;
	recharge?: Recharge;
	primitives: Primitive[];
	concentration?: boolean;
	description: string;
}
export interface UnmodelledFeature {
	name: string;
	section: FeatureSection;
	reason: string;
}
export interface Combatant {
	isPC?: boolean;
	name: string;
	source: { path: string; hash: string };
	ac: number;
	hp: number;
	hitDice: Dice;
	size: string;
	speeds: Partial<Record<"walk" | "fly" | "swim" | "climb" | "burrow", number>>;
	abilities: Record<Ability, number>;
	saves: Record<Ability, number>;
	initiative: number;
	resistances: DamageAffinity[];
	immunities: DamageAffinity[];
	vulnerabilities: DamageAffinity[];
	conditionImmunities: Condition[];
	actions: Action[];
	legendaryBudget: number;
	legendaryResistance: number;
	features: Primitive[];
	resources?: Record<string, number>;
	unmodelled: UnmodelledFeature[];
}
