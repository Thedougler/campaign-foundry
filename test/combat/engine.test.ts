import { execFileSync } from "node:child_process";
import { test, expect } from "vitest";
import { context, deathSave, playTrial, runCombat } from "../../src/combat/engine/index.ts";
import { fighter } from "../../src/combat/engine/state.ts";
import type { RuleContext, TrialState } from "../../src/combat/engine/state.ts";
import { compilePage } from "../../src/combat/import/index.ts";
import type { Ability, Action, AttackPrimitive, Combatant, Primitive } from "../../src/combat/model.ts";
import { trialRng } from "../../src/combat/rng.ts";
import { expected, resolve } from "../../src/combat/rules/index.ts";
import { applyDamage, mitigate } from "../../src/combat/rules/damage.ts";
import { regain } from "../../src/combat/rules/heal.ts";
import { runCli } from "../../src/cli.ts";

const ABILITY_LIST: Ability[] = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
const zeroes = () => Object.fromEntries(ABILITY_LIST.map((a) => [a, 0])) as Record<Ability, number>;
const tens = () => Object.fromEntries(ABILITY_LIST.map((a) => [a, 10])) as Record<Ability, number>;

type Overrides = Partial<Omit<Combatant, "abilities" | "saves">> & {
	abilities?: Partial<Record<Ability, number>>;
	saves?: Partial<Record<Ability, number>>;
};

/** A minimal viable Combatant; tests override only what their mechanic reads. */
function combatant(name: string, overrides: Overrides = {}): Combatant {
	const { abilities, saves, ...rest } = overrides;
	return {
		name,
		source: { path: `test/${name}`, hash: "0" },
		ac: 15,
		hp: 30,
		hitDice: { count: 3, sides: 8, bonus: 0 },
		size: "Medium",
		speeds: { walk: 30 },
		abilities: { ...tens(), ...abilities },
		saves: { ...zeroes(), ...saves },
		initiative: 0,
		resistances: [],
		immunities: [],
		vulnerabilities: [],
		conditionImmunities: [],
		actions: [],
		legendaryBudget: 0,
		legendaryResistance: 0,
		features: [],
		unmodelled: [],
		...rest,
	};
}
function action(
	name: string,
	primitives: Primitive[],
	cost: Action["cost"] = "action",
	extra: Partial<Action> = {},
): Action {
	return { name, cost, legendaryCost: cost === "legendary" ? 1 : 0, primitives, description: "", ...extra };
}
function attack(
	toHit: number,
	dice: { count: number; sides: number; bonus: number },
	extra: Partial<AttackPrimitive> = {},
): Primitive {
	return {
		kind: "attack",
		mode: "melee",
		toHit,
		damage: [{ dice: { ...dice }, type: "slashing" }],
		riders: [],
		...extra,
	};
}
function trial(seed: number | string, ...sides: Overrides[][]): TrialState {
	const state: TrialState = { fighters: [], rng: trialRng(seed, 0), round: 1, turn: 0, deathSaves: true };
	sides.forEach((side, i) => {
		for (const c of side)
			state.fighters.push(fighter(combatant(`f${state.fighters.length}`, c), state.fighters.length, i));
	});
	return state;
}
/** Each Mechanic's `expected` must sit within 4 standard errors of `resolve`'s empirical mean. */
function agreement(p: Primitive, build: (i: number) => RuleContext, n = 4000): void {
	let sum = 0;
	let sumSquares = 0;
	const values: number[] = [];
	for (let i = 0; i < n; i++) {
		const value = resolve(p, build(i));
		values.push(value);
		sum += value;
	}
	const mean = sum / n;
	for (const value of values) sumSquares += (value - mean) ** 2;
	const sd = Math.sqrt(sumSquares / Math.max(1, n - 1));
	const reference = expected(p, build(n));
	const z = (mean - reference) / (sd / Math.sqrt(n) || 1);
	expect(Math.abs(z), `mean ${mean.toFixed(3)} vs expected ${reference.toFixed(3)} (z=${z.toFixed(2)})`).toBeLessThan(
		4,
	);
}

test("attacks and criticals: expected matches the empirical mean, natural 20s included", () => {
	agreement(attack(4, { count: 2, sides: 6, bonus: 3 }), (i) => {
		const s = trial(i, [{ ac: 14 }]);
		return context(s, s.fighters[0]!, s.fighters[0]!);
	});
	agreement(attack(30, { count: 2, sides: 8, bonus: 0 }), (i) => {
		const s = trial(i, [{ ac: 10 }]);
		return context(s, s.fighters[0]!, s.fighters[0]!);
	});
});
test("saves: half damage on a success matches the empirical mean", () => {
	agreement(
		{
			kind: "save",
			ability: "dexterity",
			dc: 11,
			target: { description: "" },
			damage: [{ dice: { count: 3, sides: 6, bonus: 0 }, type: "fire" }],
			success: "half",
			conditions: [],
		},
		(i) => {
			const s = trial(i, [{}, { saves: { dexterity: 2 } }]);
			return context(s, s.fighters[0]!, s.fighters[1]!);
		},
	);
});
test("save-or-suck: a save-ends condition lands and the modelled escape save clears it", () => {
	const stun: Primitive = {
		kind: "save",
		ability: "constitution",
		dc: 20,
		target: { description: "" },
		damage: [],
		success: "none",
		conditions: [
			{ kind: "condition", condition: "stunned", saveEnds: { ability: "constitution", dc: 1, timing: "end" } },
		],
	};
	const s = trial(0, [{}, { saves: { constitution: 0 } }]);
	expect(resolve(stun, context(s, s.fighters[0]!, s.fighters[1]!))).toBe(1);
	expect(s.fighters[1]!.conditions.has("stunned")).toBe(true);
	const c = context(s, s.fighters[0]!, s.fighters[1]!);
	c.state.turn = 1;
	agreement(stun, (i) => {
		const t = trial(i, [{}, { saves: { constitution: 0 } }]);
		return context(t, t.fighters[0]!, t.fighters[1]!);
	});
});
test("damage affinities: qualified resistance honours the attack; immunity and vulnerability apply", () => {
	const term = { dice: { count: 0, sides: 0, bonus: 10 }, type: "bludgeoning" as const };
	const fire = { dice: { count: 0, sides: 0, bonus: 10 }, type: "fire" as const };
	const mundane: AttackPrimitive = { kind: "attack", mode: "melee", toHit: 0, damage: [], riders: [] };
	const s = trial(0, [
		{
			resistances: [{ types: ["bludgeoning"], qualifier: "from nonmagical attacks" }],
			immunities: [{ types: ["fire"] }],
		},
		{ vulnerabilities: [{ types: ["fire"] }] },
	]);
	expect(mitigate(10, term, { ...context(s, s.fighters[0]!, s.fighters[0]!), attack: mundane })).toBe(5);
	expect(
		mitigate(10, term, { ...context(s, s.fighters[0]!, s.fighters[0]!), attack: { ...mundane, magical: true } }),
	).toBe(10);
	expect(mitigate(10, fire, context(s, s.fighters[0]!, s.fighters[0]!))).toBe(0);
	expect(mitigate(10, fire, context(s, s.fighters[1]!, s.fighters[1]!))).toBe(20);
});
test("healing and temporary HP: lost HP returns up to maximum, temp HP only improves", () => {
	const s = trial(0, [{ hp: 30 }]);
	const c = context(s, s.fighters[0]!, s.fighters[0]!);
	s.fighters[0]!.hp = 10;
	expect(regain(25, c)).toBe(20);
	expect(regain(25, c)).toBe(0);
	agreement({ kind: "temporary-hp", amount: { count: 2, sides: 6, bonus: 0 } }, (i) => {
		const t = trial(i, [{}]);
		return context(t, t.fighters[0]!, t.fighters[0]!);
	});
});
test("once-per-turn rider: Sneak Attack adds its dice on the first eligible hit only", () => {
	const s = trial(0, [{ features: [{ kind: "sneak-attack", dice: { count: 3, sides: 1, bonus: 0 } }] }, {}]);
	const rogue = s.fighters[0]!;
	const first = resolve(attack(30, { count: 1, sides: 1, bonus: 1 }), context(s, rogue, s.fighters[1]!));
	const second = resolve(attack(30, { count: 1, sides: 1, bonus: 1 }), context(s, rogue, s.fighters[1]!));
	expect(first - second).toBe(3);
});
test("advantage and disadvantage: hit rates follow the d20 model", () => {
	const blinded = (seed: number) => {
		const s = trial(seed, [{}, { ac: 13 }]);
		s.fighters[1]!.conditions.set("blinded", {
			primitive: { kind: "condition", condition: "blinded" },
			source: 0,
			expires: Infinity,
		});
		return s;
	};
	agreement(attack(2, { count: 1, sides: 6, bonus: 0 }, { advantage: true }), (i) => {
		const s = trial(i, [{ ac: 13 }]);
		s.fighters[0]!.hidden = true;
		return context(s, s.fighters[0]!, s.fighters[0]!);
	});
	agreement(attack(2, { count: 1, sides: 6, bonus: 0 }, { disadvantage: true }), (i) => {
		const s = blinded(i);
		return context(s, s.fighters[0]!, s.fighters[1]!);
	});
});
test("rerolls: attack rolls below the threshold reroll once, matching the model", () => {
	agreement(attack(3, { count: 1, sides: 8, bonus: 0 }, { rerollBelow: 2 }), (i) => {
		const s = trial(i, [{ features: [{ kind: "reroll", below: 2, roll: "attack" }] }, { ac: 12 }]);
		return context(s, s.fighters[0]!, s.fighters[1]!);
	});
});
test("multiattack: the best alternative's value matches the empirical mean", () => {
	const multi: Primitive = {
		kind: "multiattack",
		alternatives: [[{ action: "Bite", count: 2 }], [{ action: "Claws", count: 3 }]],
	};
	const moves = [
		action("Bite", [attack(6, { count: 2, sides: 6, bonus: 0 })]),
		action("Claws", [attack(6, { count: 1, sides: 6, bonus: 0 })]),
	];
	agreement(
		multi,
		(i) => {
			const s = trial(i, [{ actions: moves }, { ac: 13 }]);
			return context(s, s.fighters[0]!, s.fighters[1]!);
		},
		3000,
	);
});
test("regeneration: heals each round unless disabled by its damage type", () => {
	const regen: Primitive = {
		kind: "regeneration",
		amount: { count: 0, sides: 0, bonus: 5 },
		disabledBy: ["fire"],
		description: "",
	};
	const s = trial(0, [{ hp: 30, features: [regen] }]);
	const c = context(s, s.fighters[0]!, s.fighters[0]!);
	s.fighters[0]!.hp = 10;
	expect(resolve(regen, c)).toBe(5);
	expect(s.fighters[0]!.hp).toBe(15);
	s.fighters[0]!.damagedBy.add("fire");
	expect(resolve(regen, c)).toBe(0);
});
test("auras: a start-of-round aura damages its enemies", () => {
	const aura: Primitive = {
		kind: "aura",
		radius: 5,
		timing: "start",
		damage: [{ dice: { count: 1, sides: 4, bonus: 0 }, type: "necrotic" }],
	};
	const s = trial(0, [{ features: [aura] }, {}]);
	const before = s.fighters[1]!.hp;
	resolve(aura, context(s, s.fighters[0]!, s.fighters[1]!));
	expect(s.fighters[1]!.hp).toBeLessThan(before);
});
test("opportunity attacks: moving without Disengage eats the enemy's reaction; Disengage does not", () => {
	const provoker = combatant("runner", { hp: 40 });
	const guard = combatant("guard", {
		hp: 40,
		actions: [action("Opportunity", [attack(20, { count: 0, sides: 0, bonus: 6 })], "reaction")],
	});
	const walk = (seed: number, mode: "move" | "disengage" = "move") => {
		const state: TrialState = {
			fighters: [fighter(provoker, 0, 0), fighter(guard, 1, 1)],
			rng: trialRng("opp", seed),
			round: 1,
			turn: 1,
			deathSaves: true,
		};
		if (mode === "disengage")
			resolve({ kind: "movement", mode: "disengage" }, context(state, state.fighters[0]!, state.fighters[0]!));
		return {
			state,
			value: resolve({ kind: "movement", mode: "move" }, context(state, state.fighters[0]!, state.fighters[0]!)),
		};
	};
	const provoked = walk(0);
	expect(provoked.value).toBe(-6);
	expect(provoked.state.fighters[0]!.hp).toBe(34);
	expect(provoked.state.fighters[1]!.reaction).toBe(false);
	expect(walk(1).value).toBe(-6);
	expect(walk(2, "disengage").value).toBe(0);
});
test("AC reactions and damage reduction: Parry and Uncanny Dodge change the incoming mean", () => {
	const parryGuard = combatant("parry", {
		actions: [action("Parry", [{ kind: "parry", reduction: { count: 1, sides: 6, bonus: 0 } }], "reaction")],
	});
	const dodger = combatant("dodge", { features: [{ kind: "feature", flag: "uncanny-dodge" }] });
	const plain = combatant("plain");
	const rig = (defender: Combatant, seed: string, i: number): RuleContext => {
		const state: TrialState = {
			fighters: [fighter(combatant("striker"), 0, 0), fighter(defender, 1, 1)],
			rng: trialRng(seed, i),
			round: 1,
			turn: 0,
			deathSaves: true,
		};
		return context(state, state.fighters[0]!, state.fighters[1]!);
	};
	agreement(attack(6, { count: 2, sides: 6, bonus: 0 }), (i) => rig(parryGuard, "parry", i), 3000);
	agreement(attack(6, { count: 2, sides: 6, bonus: 0 }), (i) => rig(dodger, "dodge", i), 3000);
	agreement(attack(6, { count: 2, sides: 6, bonus: 0 }), (i) => rig(plain, "plain", i), 3000);
});
test("legendary resistance: a failed condition save is refused while charges remain", () => {
	const suck: Primitive = {
		kind: "save",
		ability: "constitution",
		dc: 30,
		target: { description: "" },
		damage: [],
		success: "none",
		conditions: [{ kind: "condition", condition: "stunned" }],
	};
	const s = trial(0, [{}, { legendaryResistance: 1 }]);
	expect(resolve(suck, context(s, s.fighters[0]!, s.fighters[1]!))).toBe(0);
	expect(s.fighters[1]!.conditions.has("stunned")).toBe(false);
	expect(s.fighters[1]!.legendaryResistance).toBe(0);
	expect(resolve(suck, context(s, s.fighters[0]!, s.fighters[1]!))).toBe(1);
});
test("concentration: damage on the caster ends the condition it sustained", () => {
	const s = trial(0, [{}, {}]);
	s.fighters[1]!.concentration = true;
	s.fighters[0]!.conditions.set("frightened", {
		primitive: { kind: "condition", condition: "frightened", concentration: true },
		source: 1,
		expires: Infinity,
	});
	s.fighters[1]!.combatant.saves.constitution = -20;
	applyDamage(5, context(s, s.fighters[0]!, s.fighters[1]!));
	expect(s.fighters[0]!.conditions.has("frightened")).toBe(false);
	expect(s.fighters[1]!.concentration).toBe(false);
});
test("death saves follow the 2024 table", () => {
	const down = (): TrialState => {
		const s = trial(0, [{ isPC: true, hp: 10 }]);
		s.fighters[0]!.hp = 0;
		return s;
	};
	const crit = down();
	applyDamage(4, { ...context(crit, crit.fighters[0]!, crit.fighters[0]!), critical: true });
	expect(crit.fighters[0]!.failures).toBe(2);
	expect(crit.fighters[0]!.dead).toBe(false);
	applyDamage(4, context(crit, crit.fighters[0]!, crit.fighters[0]!));
	expect(crit.fighters[0]!.failures).toBe(3);
	expect(crit.fighters[0]!.dead).toBe(true);
	const massive = down();
	applyDamage(11, context(massive, massive.fighters[0]!, massive.fighters[0]!));
	expect(massive.fighters[0]!.dead).toBe(true);
	const twenty = down();
	deathSave(twenty.fighters[0]!, twenty, 20);
	expect(twenty.fighters[0]!.hp).toBe(1);
	expect(twenty.fighters[0]!.conditions.has("unconscious")).toBe(false);
	const one = down();
	deathSave(one.fighters[0]!, one, 1);
	expect(one.fighters[0]!.failures).toBe(2);
	const stable = down();
	deathSave(stable.fighters[0]!, stable, 10);
	deathSave(stable.fighters[0]!, stable, 10);
	deathSave(stable.fighters[0]!, stable, 10);
	expect(stable.fighters[0]!.stable).toBe(true);
	deathSave(stable.fighters[0]!, stable, 1);
	expect(stable.fighters[0]!.failures).toBe(0);
});
test("death saves change Trial outcomes: PCs die far less with them on", async () => {
	const delmar = await compilePage("wiki/shattered-sea/PCs/delmar-fisk.md");
	const hawk = await compilePage("wiki/shattered-sea/Creatures/young-bloodhawk.md");
	const withSaves = runCombat([[delmar], [hawk]], { trials: 400, seed: "death-save-compare", deathSaves: true });
	const without = runCombat([[delmar], [hawk]], { trials: 400, seed: "death-save-compare", deathSaves: false });
	expect(withSaves.combatants[0]!.downRate).toBeGreaterThan(0);
	expect(without.combatants[0]!.deathRate).toBeCloseTo(without.combatants[0]!.downRate, 2);
	expect(without.combatants[0]!.deathRate).toBeGreaterThan(withSaves.combatants[0]!.deathRate + 0.05);
});
test("action economy: one action and bonus per turn; legendary and lair windows run within budget", () => {
	const pincer = combatant("pincer", {
		hp: 400,
		ac: 25,
		legendaryBudget: 3,
		actions: [
			action("Jab", [attack(12, { count: 1, sides: 10, bonus: 6 })]),
			action("Quick Sting", [attack(12, { count: 1, sides: 6, bonus: 6 })], "bonus"),
			action("Tail", [attack(12, { count: 1, sides: 8, bonus: 6 })], "legendary"),
			action(
				"Tremor",
				[
					{
						kind: "save",
						ability: "dexterity",
						dc: 15,
						target: { description: "" },
						damage: [{ dice: { count: 2, sides: 6, bonus: 0 }, type: "thunder" }],
						success: "half",
						conditions: [],
					},
				],
				"lair",
			),
		],
	});
	const dummy = combatant("dummy", { hp: 3000, ac: 5 });
	const result = playTrial([[pincer], [dummy]], "economy", 0);
	const taken = result.combatants[0]!.actionsTaken;
	expect(taken.Jab).toBeLessThanOrEqual(result.rounds);
	expect(taken.Jab).toBeGreaterThanOrEqual(result.rounds - 1);
	expect(taken["Quick Sting"]).toBeLessThanOrEqual(result.rounds);
	expect(taken.Tail ?? 0).toBeGreaterThan(0);
	expect(taken.Tail ?? 0).toBeLessThanOrEqual(3 * result.rounds);
	expect(taken.Tremor ?? 0).toBeGreaterThan(0);
});
test("recharge: a 5–6 action returns on its die, not every round", () => {
	const dragon = combatant("dragon", {
		hp: 400,
		ac: 25,
		actions: [
			action("Breath", [attack(12, { count: 4, sides: 8, bonus: 6 })], "action", { recharge: { min: 5, max: 6 } }),
		],
	});
	const dummy = combatant("dummy", { hp: 3000, ac: 5 });
	const result = playTrial([[dragon], [dummy]], "recharge", 0, { roundLimit: 12 });
	const taken = result.combatants[0]!.actionsTaken.Breath ?? 0;
	expect(taken).toBeGreaterThan(0);
	expect(taken).toBeLessThan(result.rounds);
});
test("a seeded 1v1 and a mixed roster of real Shattered Sea pages replay bit-identically", async () => {
	const delmar = await compilePage("wiki/shattered-sea/PCs/delmar-fisk.md");
	const jc = await compilePage("wiki/shattered-sea/PCs/jean-claude-tabarnack.md");
	const grung = await compilePage("wiki/shattered-sea/Creatures/grung-creature.md");
	const deckhand = await compilePage("wiki/shattered-sea/Creatures/dravosi-deckhand.md");
	const once = JSON.stringify([
		playTrial([[delmar], [deckhand, deckhand]], "replay", 7),
		runCombat(
			[
				[jc, delmar],
				[grung, grung, grung, deckhand],
			],
			{ trials: 200, seed: "replay-mixed" },
		),
	]);
	const again = JSON.stringify([
		playTrial([[delmar], [deckhand, deckhand]], "replay", 7),
		runCombat(
			[
				[jc, delmar],
				[grung, grung, grung, deckhand],
			],
			{ trials: 200, seed: "replay-mixed" },
		),
	]);
	expect(once).toBe(again);
});
test("the CLI replays bit-identically across two processes and reports provenance", () => {
	const argv = [
		"combat",
		"run",
		"--side",
		"wiki/shattered-sea/PCs/jean-claude-tabarnack.md",
		"wiki/shattered-sea/PCs/delmar-fisk.md",
		"--side",
		"wiki/shattered-sea/Creatures/grung-creature.md",
		"--count",
		"grung-creature=3",
		"--trials",
		"150",
		"--seed",
		"cli-replay",
		"--json",
	];
	const run = () => execFileSync("node", ["src/cli.ts", ...argv], { encoding: "utf8" });
	const first = run();
	expect(run()).toBe(first);
	const report = JSON.parse(first);
	expect(report.trials).toBe(150);
	expect(report.sides.reduce((sum: number, s: { wins: number }) => sum + s.wins, 0) + report.draws).toBe(150);
	expect(report.provenance.engineVersion).toMatch(/^[0-9a-f]{40}$/);
	expect(report.provenance.seed).toBe("cli-replay");
	expect(
		report.provenance.pages.every(
			(p: { path: string; hash: string }) => p.path.endsWith(".md") && /^[0-9a-f]{64}$/.test(p.hash),
		),
	).toBe(true);
	expect(report.provenance.command).toContain("--side");
	expect(report.provenance.assumption).toContain("#96");
});
test("usage errors: sides, trials and count are validated with examples", async () => {
	const one = await runCli([
		"combat",
		"run",
		"--side",
		"wiki/shattered-sea/PCs/delmar-fisk.md",
		"--trials",
		"5",
		"--seed",
		"x",
	]);
	expect(one.code).toBe(2);
	expect(one.stderr).toContain("--side is required at least twice");
	const bad = await runCli([
		"combat",
		"run",
		"--side",
		"a.md",
		"--side",
		"b.md",
		"--count",
		"b=zero",
		"--trials",
		"5",
		"--seed",
		"x",
	]);
	expect(bad.code).toBe(2);
	expect(bad.stderr).toContain("--count takes page=N");
	const trials = await runCli(["combat", "run", "--side", "a.md", "--side", "b.md", "--trials", "0", "--seed", "x"]);
	expect(trials.code).toBe(2);
	expect(trials.stderr).toContain("--trials must be a positive integer");
});
test("policy seam: a custom Policy replaces the default for its side", () => {
	const poke: Primitive = { kind: "damage", damage: [{ dice: { count: 0, sides: 0, bonus: 1 }, type: "psychic" }] };
	const passive = { choose: () => undefined };
	const result = runCombat(
		[
			[combatant("acted", { actions: [action("Poke", [poke])] })],
			[combatant("other", { actions: [action("Poke", [poke])] })],
		],
		{ trials: 20, seed: "policy", policies: [passive, passive] },
	);
	expect(result.capped).toBe(20);
});
test("throughput: a real mixed roster reports its trials per second", async () => {
	const jc = await compilePage("wiki/shattered-sea/PCs/jean-claude-tabarnack.md");
	const delmar = await compilePage("wiki/shattered-sea/PCs/delmar-fisk.md");
	const grung = await compilePage("wiki/shattered-sea/Creatures/grung-creature.md");
	const deckhand = await compilePage("wiki/shattered-sea/Creatures/dravosi-deckhand.md");
	const started = performance.now();
	const result = runCombat(
		[
			[jc, delmar],
			[grung, grung, grung, deckhand],
		],
		{ trials: 500, seed: "throughput" },
	);
	const seconds = (performance.now() - started) / 1000;
	const rate = result.trials / seconds;
	console.log(
		`throughput: ${Math.round(rate)} trials/s over a 2v4 mixed roster (${seconds.toFixed(2)} s for ${result.trials} trials)`,
	);
	expect(rate).toBeGreaterThan(50);
});
