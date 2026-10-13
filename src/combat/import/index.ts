import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { parseStatblock } from "../../check/statblock/parse.ts";
import { parsePage } from "../../vault/parse.ts";
import type { Page } from "../../vault/types.ts";
import { ABILITIES, CONDITIONS, DAMAGE_TYPES } from "../model.ts";
import type { ActionCost, Combatant, DamageAffinity, Primitive } from "../model.ts";
import { parseDice } from "../rng.ts";
import { feature } from "./features.ts";
import { ability, attack, damage, effects, limits, multiattack, plain } from "./grammar.ts";

export class MissingStatblockError extends Error {}

function affinities(value: unknown): DamageAffinity[] {
	const text = Array.isArray(value) ? value.join("; ") : String(value ?? "");
	return text.split(";").flatMap((part) => {
		const types = DAMAGE_TYPES.filter((t) => new RegExp(`\\b${t}\\b`, "i").test(part));
		const qualifier = /\b(?:from|that|while|except|against)\b.+/i.exec(part)?.[0];
		return types.length ? [{ types, ...(qualifier ? { qualifier } : {}) }] : [];
	});
}

/** Compile one canonical Wiki page. No network source or derived sheet is consulted. */
export function importCombatant(page: Page): Combatant {
	const fail = (reason: string): never => {
		throw new Error(`${page.path}: ${reason}`);
	};
	let section = "";
	let fence: string | undefined;
	for (const node of page.tree.children) {
		if (node.type === "heading" && node.depth <= 2)
			section = page.headings.find((h) => h.line === node.position?.start.line)?.text ?? "";
		if (node.type === "code" && node.lang === "statblock" && (section === "Statblock" || section === "Sheet")) {
			fence = node.value;
			break;
		}
	}
	if (fence === undefined)
		throw new MissingStatblockError(`${page.path}: no statblock fence under ## Statblock or ## Sheet`);
	const parsed = parseStatblock(fence);
	const block = parsed.statblock;
	if (!block) return fail(parsed.issues.map((i) => i.message).join("; "));
	const malformed = parsed.issues.filter(
		(i) => (i.rule === "statblock-shape" && i.key !== "skillsaves") || i.rule === "stats-invalid",
	);
	if (malformed.length) return fail(malformed.map((i) => i.message).join("; "));
	const ac = Number(/^\s*(\d+)/.exec(String(block.raw.ac ?? ""))?.[1]);
	const hitDice = parseDice(block.hitDice);
	if (!block.name || !block.stats || block.hp === undefined || !Number.isFinite(ac) || !hitDice)
		return fail("statblock requires name, ac, hp, six stats and hit_dice");
	const abilities = Object.fromEntries(ABILITIES.map((a, i) => [a, block.stats![i]!])) as Combatant["abilities"];
	const saves = Object.fromEntries(
		ABILITIES.map((a) => [a, Math.floor((abilities[a] - 10) / 2)]),
	) as Combatant["saves"];
	for (const bonus of block.saves) {
		const a = ability(bonus.key);
		if (a) saves[a] = bonus.value;
	}
	const speeds: Combatant["speeds"] = {};
	for (const m of String(block.raw.speed ?? "").matchAll(
		/(?:(walk|fly|swim|climb|burrow)\s+)?(\d+)\s*(?:ft\.?|feet)/gi,
	))
		speeds[(m[1]?.toLowerCase() ?? "walk") as keyof typeof speeds] = Number(m[2]);
	const combatant: Combatant = {
		isPC: page.frontmatter?.type === "PC",
		name: block.name,
		source: { path: page.path, hash: createHash("sha256").update(page.source).digest("hex") },
		ac,
		hp: block.hp,
		hitDice,
		size: block.size,
		speeds,
		abilities,
		saves,
		initiative:
			block.raw.modifier !== undefined && Number.isFinite(Number(block.raw.modifier))
				? Number(block.raw.modifier)
				: Math.floor((abilities.dexterity - 10) / 2),
		resistances: affinities(block.raw.damage_resistances),
		immunities: affinities(block.raw.damage_immunities),
		vulnerabilities: affinities(block.raw.damage_vulnerabilities),
		conditionImmunities: CONDITIONS.filter((c) =>
			new RegExp(`\\b${c}\\b`, "i").test(plain(String(block.raw.condition_immunities ?? ""))),
		),
		actions: [],
		features: [],
		legendaryResistance: 0,
		legendaryBudget: Number(
			/(?:take|use)\s+(\d+)\s+legendary actions/i.exec(String(block.raw.legendary_description ?? ""))?.[1] ??
				(block.features.some((f) => f.section === "legendary_actions") ? 3 : 0),
		),
		unmodelled: [],
	};
	const costs: Partial<Record<string, ActionCost>> = {
		actions: "action",
		bonus_actions: "bonus",
		reactions: "reaction",
		legendary_actions: "legendary",
		lair_actions: "lair",
	};
	const actionNames = Object.fromEntries(
		block.features
			.filter((f) => f.section === "actions" && !/^multiattack$/i.test(f.name))
			.map((f) => [f.name.replace(/\s*\([^)]*\)/g, "").trim(), f.name]),
	);
	const names = Object.keys(actionNames);
	const weaponNames = block.features
		.filter((f) => f.section === "actions" && attack(plain(f.desc)) !== undefined)
		.map((f) => f.name.replace(/\s*\([^)]*\)/g, "").trim());
	let previousSection = "";
	for (const entry of block.features) {
		const firstInSection = previousSection !== entry.section;
		previousSection = entry.section;
		if (!entry.name.trim() && (entry.section === "legendary_actions" || entry.section === "lair_actions")) {
			if (firstInSection) {
				if (entry.section === "legendary_actions") {
					const budget = /Legendary Action Uses:\s*(\d+)|(?:take|use)\s+(\d+)\s+legendary actions?/i.exec(
						plain(entry.desc),
					);
					if (budget) combatant.legendaryBudget = Number(budget[1] ?? budget[2]);
				}
			} else
				combatant.unmodelled.push({
					name: "(unnamed)",
					section: entry.section,
					reason: "Missing name after the section preamble",
				});
			continue;
		}
		const text = plain(entry.desc);
		const extraAttack =
			combatant.isPC && /^Extra Attack$/i.test(entry.name) && /attack twice instead of once/i.test(text);
		const cost = extraAttack ? "action" : costs[entry.section];
		let primitives: Primitive[] = feature(entry.name, text, !cost);
		if (extraAttack && weaponNames.length) {
			const routine = multiattack(
				`It makes two attacks, using ${weaponNames.join(" or ")} in any combination.`,
				weaponNames,
			);
			if (routine) {
				for (const alternative of routine.alternatives)
					for (const ref of alternative) ref.action = actionNames[ref.action]!;
				primitives = [routine];
			}
		}
		if (!primitives.length && cost) {
			const multi = multiattack(text, names);
			if (multi)
				for (const alternative of multi.alternatives)
					for (const ref of alternative) ref.action = actionNames[ref.action]!;
			primitives =
				/^multiattack$/i.test(entry.name) || (!/Attack(?: Roll)?:/i.test(text) && /makes?[^.]*attack/i.test(text))
					? multi
						? [multi]
						: []
					: effects(text);
		}
		if (!primitives.length) {
			combatant.unmodelled.push({
				name: entry.name || "(unnamed)",
				section: entry.section,
				reason: "No recognised Primitive in this entry",
			});
			continue;
		}
		for (const p of primitives) if (p.kind === "legendary-resistance") combatant.legendaryResistance = p.count;
		if (cost)
			combatant.actions.push({
				name: entry.name,
				cost,
				legendaryCost: cost === "legendary" ? Number(/Costs?\s+(\d+)/i.exec(entry.name)?.[1] ?? 1) : 0,
				...limits(entry.name),
				primitives,
				description: entry.desc,
			});
		else combatant.features.push(...primitives);
		if (cost === "action" && /\bNick\b/i.test(entry.name) && /extra attack/i.test(text)) {
			const extraDamage = damage(text.slice(text.search(/(?:That|The) extra attack (?:deals|does)/i)));
			for (const primitive of primitives) {
				if (primitive.kind !== "attack") continue;
				combatant.actions.push({
					name: `${entry.name} (Light extra attack)`,
					cost: "bonus",
					legendaryCost: 0,
					primitives: [
						{
							...primitive,
							damage: extraDamage.length
								? extraDamage
								: primitive.damage.map((term, i) => (i === 0 ? { ...term, dice: { ...term.dice, bonus: 0 } } : term)),
						},
					],
					description: entry.desc,
				});
			}
		}
	}
	return combatant;
}

export async function compilePage(path: string): Promise<Combatant> {
	return importCombatant(parsePage(path, await readFile(path, "utf8")));
}
