import { breakConcentration, has } from "../engine/state.ts";
import type { Mechanic, RuleContext } from "../engine/state.ts";
import type { DamageAffinity, DamageTerm, Primitive } from "../model.ts";
import { rollDice } from "../rng.ts";
import { distribution, saveFails } from "./rolls.ts";

function matches(affinity: DamageAffinity, term: DamageTerm, c: RuleContext): boolean {
	if (!affinity.types.includes(term.type)) return false;
	if (!affinity.qualifier) return true;
	const q = affinity.qualifier.toLowerCase();
	// Qualifiers are predicates, never unconditional resistances. Importer preserves their authored text.
	if (/nonmagical|non-magical/.test(q) && c.attack?.magical) return false;
	if (/silver/.test(q) && c.attack?.silvered) return false;
	if (/adamantine/.test(q)) return false;
	if (/attacks|weapons/.test(q) && !c.attack) return false;
	if (/while|except|against/.test(q) && !/silver|nonmagical|non-magical/.test(q)) return false;
	return /nonmagical|non-magical|silver|attacks|weapons/.test(q);
}
export function mitigate(value: number, term: DamageTerm, c: RuleContext): number {
	const target = c.target;
	if (target.combatant.immunities.some((a) => matches(a, term, c))) return 0;
	let amount = Math.max(0, Math.floor(value));
	if (target.combatant.resistances.some((a) => matches(a, term, c)) || has(target, "petrified"))
		amount = Math.floor(amount / 2);
	if (target.combatant.vulnerabilities.some((a) => matches(a, term, c))) amount *= 2;
	return amount;
}
/** Damage at zero and massive damage are accounted for before clamping HP. */
export function applyDamage(amount: number, c: RuleContext): number {
	const f = c.target;
	if (f.dead || amount <= 0) return 0;
	const absorbed = Math.min(f.tempHP, amount);
	f.tempHP -= absorbed;
	const remaining = amount - absorbed;
	if (remaining >= f.combatant.hp) f.dead = true;
	if (f.hp === 0 && remaining > 0 && f.combatant.isPC && c.state.deathSaves) {
		f.stable = false;
		f.failures += c.critical ? 2 : 1;
		if (f.failures >= 3) f.dead = true;
	}
	const previous = f.hp;
	f.hp = Math.max(0, f.hp - remaining);
	if (previous > 0 && f.hp === 0) {
		f.downs++;
		f.failures = 0;
		f.successes = 0;
		f.stable = false;
		if (!f.combatant.isPC || !c.state.deathSaves) f.dead = true;
		f.conditions.set("unconscious", {
			primitive: { kind: "condition", condition: "unconscious" },
			source: f.id,
			expires: Infinity,
		});
		breakConcentration(c.state, f);
	} else if (f.concentration && saveFails({ ...c, target: f }, "constitution", Math.max(10, Math.floor(amount / 2))))
		breakConcentration(c.state, f);
	return amount;
}
export const damage: Mechanic<Extract<Primitive, { kind: "damage" }>> = {
	resolve(p, c) {
		let total = 0;
		for (const term of p.damage) {
			const dice = { ...term.dice, count: term.dice.count * (c.critical ? 2 : 1) };
			total += mitigate(rollDice(c.state.rng, dice) * (c.damageScale ?? 1), term, c);
			c.target.damagedBy.add(term.type);
		}
		return applyDamage(Math.max(0, total - (c.damageReduction ?? 0)), c);
	},
	expected(p, c) {
		if (c.target.dead) return 0;
		if (!c.damageReductionDice && !c.damageReduction)
			return p.damage.reduce(
				(total, term) =>
					total +
					distribution(term.dice, c.critical).reduce(
						(sum, [value, chance]) => sum + chance * mitigate(value * (c.damageScale ?? 1), term, c),
						0,
					),
				0,
			);
		let totals = new Map([[0, 1]]);
		for (const term of p.damage) {
			const next = new Map<number, number>();
			for (const [total, probability] of totals)
				for (const [value, chance] of distribution(term.dice, c.critical)) {
					const amount = total + mitigate(value * (c.damageScale ?? 1), term, c);
					next.set(amount, (next.get(amount) ?? 0) + probability * chance);
				}
			totals = next;
		}
		const reductions = c.damageReductionDice ? distribution(c.damageReductionDice) : [[c.damageReduction ?? 0, 1]];
		let result = 0;
		for (const [value, chance] of totals)
			for (const [reduction, probability] of reductions)
				result += chance * probability! * Math.max(0, value - reduction!);
		return result;
	},
};
