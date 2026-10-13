import { readFile, mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, it } from "vitest";
import { runCli } from "../../src/cli.ts";
import { compilePage, importCombatant } from "../../src/combat/import/index.ts";
import { attack, limits, multiattack, plain, save } from "../../src/combat/import/grammar.ts";
import { feature } from "../../src/combat/import/features.ts";
import { d20, dN, rollDice, trialRng } from "../../src/combat/rng.ts";
import { parsePage } from "../../src/vault/parse.ts";

it("compiles italic 2024 and 2014 attacks, extra damage, range and on-hit saves without counting damage twice", () => {
	const modern = attack(
		plain(
			"*Melee Attack Roll:* +10, reach 10 ft. *Hit:* 22 (3d10 + 6) Piercing damage plus 7 (2d6) Fire damage. The target has the Grappled condition (escape DC 18).",
		),
	);
	expect(modern).toMatchObject({
		mode: "melee",
		toHit: 10,
		reach: 10,
		damage: [
			{ dice: { count: 3, sides: 10, bonus: 6 }, type: "piercing" },
			{ dice: { count: 2, sides: 6, bonus: 0 }, type: "fire" },
		],
		riders: [{ kind: "condition", condition: "grappled", escapeDC: 18 }],
	});
	const legacy = attack(
		"Ranged Weapon Attack: +5 to hit, range 20/60 ft., one target. Hit: 7 (1d8 + 3) slashing damage. The target must make a DC 13 Constitution saving throw or take 7 (2d6) poison damage and be poisoned.",
	);
	expect(legacy).toMatchObject({
		mode: "ranged",
		toHit: 5,
		range: { normal: 20, long: 60 },
		damage: [{ type: "slashing" }],
		riders: [{ kind: "save", dc: 13, damage: [{ type: "poison" }], conditions: [{ condition: "poisoned" }] }],
	});
	expect(legacy?.damage).toHaveLength(1);
	expect(legacy?.riders[0]).toHaveProperty("damage", [{ dice: { count: 2, sides: 6, bonus: 0 }, type: "poison" }]);
	expect(
		attack(
			"Melee Attack Roll: +5, reach 5 ft. Hit: 7 (1d8 + 3) slashing damage. The target has the Grappled condition (escape DC 13) and must make a DC 13 Constitution saving throw or be poisoned.",
		)?.riders,
	).toMatchObject([
		{ kind: "condition", condition: "grappled" },
		{ kind: "save", conditions: [{ condition: "poisoned" }] },
	]);
});

it("compiles both save grammars, areas, success damage and save-ends timing", () => {
	const modern = save(
		plain(
			"*Dexterity Saving Throw:* DC 18, each creature in a 30-foot Cone. *Failure:* 28 (8d6) Fire damage and the Blinded condition. It repeats the save at the end of each of its turns, ending the effect on a success. *Success:* Half damage.",
		),
	);
	expect(modern).toMatchObject({
		ability: "dexterity",
		dc: 18,
		target: { area: { shape: "cone", feet: 30 } },
		success: "half",
		conditions: [{ condition: "blinded", saveEnds: { ability: "dexterity", dc: 18, timing: "end" } }],
	});
	expect(
		save(
			"Each creature must make a DC 13 Dexterity saving throw, taking 4d6 fire damage on a failure, or half as much damage on a success.",
		),
	).toMatchObject({ dc: 13, success: "half", damage: [{ dice: { count: 4, sides: 6, bonus: 0 } }] });
	expect(
		save(
			"Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: The Stunned condition. Success: No effect.",
		),
	).toMatchObject({ target: { count: 1, range: 30 }, success: "none", conditions: [{ condition: "stunned" }] });
});

it("references Multiattack actions with counts, alternatives and any-combination allocations", () => {
	expect(multiattack("The scorpion makes two Claw attacks and one Sting attack.", ["Claw", "Sting"])).toEqual({
		kind: "multiattack",
		alternatives: [
			[
				{ action: "Claw", count: 2 },
				{ action: "Sting", count: 1 },
			],
		],
	});
	expect(multiattack("It makes two Claw attacks or one Bite attack.", ["Claw", "Bite"])?.alternatives).toEqual([
		[{ action: "Claw", count: 2 }],
		[{ action: "Bite", count: 1 }],
	]);
	expect(
		multiattack("It makes two attacks, using Claw or Bite in any combination.", ["Claw", "Bite"])?.alternatives,
	).toHaveLength(3);
	for (const [name, reset] of [
		["Blast (2/Day)", "day"],
		["Blast (3/Long Rest)", "long-rest"],
		["Blast (1/Short Rest)", "short-rest"],
	])
		expect(limits(name!).uses?.reset).toBe(reset);
	expect(limits("Breath (Recharge 5–6)")).toEqual({ recharge: { min: 5, max: 6 } });
});

it("compiles the contract PC fence, provenance, recognised features and named Unmodelled entries", async () => {
	const pc = await compilePage("test/combat/fixtures/pc.md");
	expect(pc).toMatchObject({
		name: "Delmar Fisk",
		ac: 16,
		hp: 38,
		initiative: 5,
		saves: { dexterity: 8, intelligence: 3, strength: 0 },
		speeds: { walk: 30 },
		source: { path: "test/combat/fixtures/pc.md" },
		features: [{ kind: "sneak-attack", dice: { count: 3, sides: 6, bonus: 0 } }],
	});
	expect(pc.source.hash).toMatch(/^[a-f0-9]{64}$/);
	expect(pc.actions.map((a) => a.cost)).toEqual(["action", "action", "bonus", "reaction"]);
	expect(pc.unmodelled).toEqual([{ name: "Lucky (3/Long Rest)", section: "traits", reason: expect.any(String) }]);
});

it("compiles PC Extra Attack routines and Nick as a separate bonus attack without duplicating damage", async () => {
	const source = (await readFile("test/combat/fixtures/pc.md", "utf8"))
		.replace(
			/^actions:/m,
			'actions:\n  - name: Extra Attack\n    desc: "When the PC takes the Attack action, it can attack twice instead of once."',
		)
		.replace("name: Rapier", 'name: "Dagger (Nick)"')
		.replace(
			'desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 9 (1d8 + 5) Piercing damage."',
			'desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 7 (1d4 + 5) Piercing damage. Once per turn, the PC can make the Light property extra attack. That extra attack deals 2 (1d4) Piercing damage, without its ability modifier."',
		);
	const pc = importCombatant(parsePage("pc.md", source));
	expect(pc.isPC).toBe(true);
	const routine = pc.actions.find((a) => a.name === "Extra Attack");
	expect(routine?.cost).toBe("action");
	const multi = routine?.primitives[0];
	expect(multi?.kind).toBe("multiattack");
	if (multi?.kind !== "multiattack") throw new Error("Expected Extra Attack routine");
	expect(multi.alternatives).toHaveLength(3);
	expect(multi.alternatives.every((refs) => refs.reduce((n, ref) => n + ref.count, 0) === 2)).toBe(true);
	expect(pc.unmodelled.some((f) => f.name === "Extra Attack")).toBe(false);
	expect(pc.actions.find((a) => a.name === "Dagger (Nick)")?.primitives).toMatchObject([
		{ kind: "attack", damage: [{ dice: { count: 1, sides: 4, bonus: 5 } }] },
	]);
	expect(pc.actions.find((a) => a.name === "Dagger (Nick) (Light extra attack)")).toMatchObject({
		cost: "bonus",
		primitives: [{ kind: "attack", toHit: 8, reach: 5, damage: [{ dice: { count: 1, sides: 4, bonus: 0 } }] }],
	});
	for (const name of ["Dagger (Nick)", "Dagger (Nick) (Light extra attack)"]) {
		const primitive = pc.actions.find((a) => a.name === name)?.primitives[0];
		if (primitive?.kind !== "attack") throw new Error("Expected dagger attack");
		expect(primitive.damage).toHaveLength(1);
	}
	expect(importCombatant(parsePage("npc.md", source.replace("type: PC", "type: NPC"))).isPC).toBe(false);
	expect(
		attack(
			"Melee Attack Roll: +7, reach 5 ft. Hit: 7 (1d6 + 4) Slashing damage, or 3 (1d6) Slashing damage when made as the extra attack of the Light property.",
		)?.damage,
	).toEqual([{ dice: { count: 1, sides: 6, bonus: 4 }, type: "slashing" }]);
});

it("preserves qualified defences, action costs and limits, regeneration and damaging auras", async () => {
	const source = (await readFile("test/combat/fixtures/pc.md", "utf8")).replace(
		"traits:",
		`damage_resistances: "cold; bludgeoning, piercing, and slashing from nonmagical attacks"
damage_immunities: "poison"
damage_vulnerabilities: "fire"
condition_immunities: "Poisoned, Frightened"
legendary_description: "It can take 4 legendary actions per round."
legendary_actions:
  - name: "Strike (Costs 2 Actions, 3/Day)"
    desc: "Melee Attack Roll: +8, reach 5 ft. Hit: 9 (1d8 + 5) Piercing damage."
lair_actions:
  - name: "Flames (Recharge 5–6)"
    desc: "Dexterity Saving Throw: DC 14, one target. Failure: 7 (2d6) Fire damage. Success: Half damage."
traits:
  - name: "Legendary Resistance (3/Day)"
    desc: "It can choose to succeed on a failed save."
  - name: "Regeneration"
    desc: "It regains 10 hit points at the start of its turn unless it took fire damage."
  - name: "Heat Aura"
    desc: "A creature that starts its turn within 5 feet takes 7 (2d6) fire damage."`,
	);
	const c = importCombatant(parsePage("fixture.md", source));
	expect(c.resistances).toEqual([
		{ types: ["cold"] },
		{ types: ["bludgeoning", "piercing", "slashing"], qualifier: "from nonmagical attacks" },
	]);
	expect(c.immunities).toEqual([{ types: ["poison"] }]);
	expect(c.vulnerabilities).toEqual([{ types: ["fire"] }]);
	expect(c.conditionImmunities).toEqual(["frightened", "poisoned"]);
	expect(c).toMatchObject({ legendaryBudget: 4, legendaryResistance: 3 });
	expect(c.actions).toContainEqual(
		expect.objectContaining({ cost: "legendary", legendaryCost: 2, uses: { count: 3, reset: "day" } }),
	);
	expect(c.actions).toContainEqual(expect.objectContaining({ cost: "lair", recharge: { min: 5, max: 6 } }));
	expect(c.features).toContainEqual(
		expect.objectContaining({ kind: "regeneration", amount: { count: 0, sides: 0, bonus: 10 }, disabledBy: ["fire"] }),
	);
	expect(c.features).toContainEqual(expect.objectContaining({ kind: "aura", radius: 5, timing: "start" }));
	const decorated = importCombatant(
		parsePage(
			"fixture.md",
			source
				.replace(/^actions:/m, 'actions:\n  - name: Multiattack\n    desc: "It makes two Rapier attacks."')
				.replace("name: Rapier", 'name: "Rapier (2/Short Rest)"'),
		),
	);
	expect(decorated.actions.find((a) => a.name === "Multiattack")?.primitives).toEqual([
		{ kind: "multiattack", alternatives: [[{ action: "Rapier (2/Short Rest)", count: 2 }]] },
	]);
	for (const name of [
		"Pack Tactics",
		"Magic Resistance",
		"Uncanny Dodge",
		"Evasion",
		"Nimble Escape",
		"Brute",
		"Amphibious",
		"Flyby",
		"Spider Climb",
		"Turn Resistance",
	])
		expect(feature(name, "")).toHaveLength(1);
	expect(feature("Parry", "The creature adds 2 to its AC.")).toEqual([{ kind: "parry", acBonus: 2 }]);
});

it("treats only first nameless legendary/lair entries as preambles and reports later nameless entries", async () => {
	const source = (await readFile("test/combat/fixtures/pc.md", "utf8")).replace(
		/^actions:/m,
		`legendary_actions:
  - name: ""
    desc: "It can take 1 legendary action. Melee Attack Roll: +8, reach 5 ft. Hit: 9 (1d8 + 5) Piercing damage."
  - name: ""
    desc: "Unrecognised later entry."
  - name: Strike
    desc: "It makes one Rapier attack."
lair_actions:
  - desc: "On initiative count 20, choose an option."
  - desc: "Dexterity Saving Throw: DC 14, one target. Failure: 7 (2d6) Fire damage. Success: Half damage."
  - name: Fog
    desc: "Unrecognised named entry."
actions:`,
	);
	const c = importCombatant(parsePage("fixture.md", source));
	expect(c.legendaryBudget).toBe(1);
	expect(c.actions.filter((a) => a.cost === "legendary" || a.cost === "lair").map((a) => a.name)).toEqual(["Strike"]);
	expect(c.unmodelled.filter((f) => f.section === "legendary_actions" || f.section === "lair_actions")).toEqual([
		{ name: "(unnamed)", section: "legendary_actions", reason: expect.any(String) },
		{ name: "(unnamed)", section: "lair_actions", reason: expect.any(String) },
		{ name: "Fog", section: "lair_actions", reason: expect.any(String) },
	]);
	const namedFirst = importCombatant(
		parsePage(
			"fixture.md",
			source.replace('legendary_actions:\n  - name: ""', "legendary_actions:\n  - name: Preamble"),
		),
	);
	expect(namedFirst.unmodelled.filter((f) => f.section === "legendary_actions" && f.name === "(unnamed)")).toHaveLength(
		1,
	);
});

it("uses independent reproducible Trial streams and correct advantage cancellation", () => {
	const draws = (seed: number, index: number) => {
		const rng = trialRng(seed, index);
		return Array.from({ length: 20 }, () => dN(rng, 20));
	};
	expect(draws(42, 7)).toEqual(draws(42, 7));
	expect(draws(42, 7)).not.toEqual(draws(42, 8));
	const rng = trialRng(42, 7);
	const first = dN(rng, 20);
	const second = dN(rng, 20);
	expect(d20(trialRng(42, 7), true)).toBe(Math.max(first, second));
	expect(d20(trialRng(42, 7), false, true)).toBe(Math.min(first, second));
	const cancel = trialRng(42, 7);
	expect(d20(cancel, true, true)).toBe(first);
	expect(dN(cancel, 20)).toBe(second);
	expect(rollDice(trialRng(42, 7), "2d20 + 3")).toBe(first + second + 3);
});

it("reports CLI usage, per-page failures, JSON, and directory/glob skips without failing the other pages", async () => {
	expect((await runCli(["combat", "compile"])).code).toBe(2);
	const result = await runCli([
		"combat",
		"compile",
		"test/combat/fixtures/pc.md",
		"test/combat/fixtures/missing.md",
		"--json",
	]);
	expect(result.code).toBe(1);
	expect(JSON.parse(result.stdout)).toHaveLength(1);
	expect(result.stderr).toContain("missing.md");
	const dir = await mkdtemp(join(tmpdir(), "combat-"));
	try {
		await writeFile(join(dir, "pc.md"), await readFile("test/combat/fixtures/pc.md", "utf8"));
		await writeFile(join(dir, "empty.md"), "## Statblock\n\nNot yet established.");
		const explicit = await runCli(["combat", "compile", join(dir, "empty.md")]);
		expect(explicit.code).toBe(1);
		expect(explicit.stderr).toContain("no statblock fence");
		for (const path of [dir, join(dir, "*.md")]) {
			const expanded = await runCli(["combat", "compile", path]);
			expect(expanded.code).toBe(0);
			expect(expanded.stdout).toContain("1 compiled, 1 skipped, 0 failed");
			expect(expanded.stderr).toContain("no Statblock, skipped");
		}
	} finally {
		await rm(dir, { recursive: true, force: true });
	}
});
