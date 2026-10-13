import { JSDOM } from "jsdom";
import { slugify } from "../vault/dialect.ts";
import type { DdbCharacter, DdbClass, DdbClassDefinition, DdbFeature, DdbItem, DdbModifier, DdbSpell } from "./ddb.ts";

/**
 * The narrow parser: D&D Beyond's payload holds raw ingredients (base scores, modifiers, items), never the
 * computed sheet, so this derives the numbers, weapon attacks and feature text for the PC's statblock fence.
 */

export const ABILITIES = ["str", "dex", "con", "int", "wis", "cha"] as const;
export type Ability = (typeof ABILITIES)[number];
const ABILITY_NAMES: Record<Ability, string> = {
	str: "strength",
	dex: "dexterity",
	con: "constitution",
	int: "intelligence",
	wis: "wisdom",
	cha: "charisma",
};
const ABILITY_LABEL: Record<Ability, string> = {
	str: "Str",
	dex: "Dex",
	con: "Con",
	int: "Int",
	wis: "Wis",
	cha: "Cha",
};

export interface SpellEntry {
	name: string;
	level: number;
	/** `always prepared`, `prepared` and where a spell comes from when not a class (`feat`, `item`, `species`). */
	tags: string[];
}

export interface Sheet {
	name: string;
	size: string;
	initiativeBonus: number;
	hitDice: string;
	perceptionBonus: number;
	senses: string[];
	languages: string[];
	attacks: {
		name: string;
		ranged: boolean;
		toHit: number;
		damageDice: string;
		damageBonus: number;
		damageType: string;
		reach: number;
		range?: { normal: number; long: number };
		versatile?: string;
	}[];
	statblockFeatures: {
		name: string;
		description: string;
		section: "traits" | "actions" | "bonus_actions" | "reactions";
		limitedUse?: { maxUses: number; reset: string };
	}[];
	classes: { name: string; subclass?: string; level: number }[];
	species: string;
	level: number;
	proficiencyBonus: number;
	abilities: Record<Ability, { score: number; mod: number }>;
	armorClass: { value: number; source: string };
	hitPoints: number;
	speeds: Partial<Record<"walk" | "fly" | "swim" | "climb" | "burrow", number>>;
	passivePerception: number;
	saves: Record<Ability, { bonus: number; proficient: boolean }>;
	spellcasting: { class: string; ability: string; saveDc: number; attackBonus: number }[];
	/** Spell slots per spell level, index 0 = 1st level; empty when the character has none. */
	spellSlots: number[];
	pactSlots?: { count: number; level: number };
	spells: SpellEntry[];
	features: { source: string; names: string[] }[];
	inventory: { name: string; quantity: number; equipped: boolean; attuned: boolean; rarity?: string }[];
	coin: string;
	/** The D&D Beyond account name, used only to fill a blank Player line. */
	account?: string;
}

const mod = (score: number): number => Math.floor((score - 10) / 2);
const amount = (m: DdbModifier): number => m.fixedValue ?? m.value ?? 0;

/** Standard 5e slots by multiclass caster level, index 0 = caster level 1. */
const MULTICLASS_SLOTS: number[][] = [
	[2],
	[3],
	[4, 2],
	[4, 3],
	[4, 3, 2],
	[4, 3, 3],
	[4, 3, 3, 1],
	[4, 3, 3, 2],
	[4, 3, 3, 3, 1],
	[4, 3, 3, 3, 2],
	[4, 3, 3, 3, 2, 1],
	[4, 3, 3, 3, 2, 1],
	[4, 3, 3, 3, 2, 1, 1],
	[4, 3, 3, 3, 2, 1, 1],
	[4, 3, 3, 3, 2, 1, 1, 1],
	[4, 3, 3, 3, 2, 1, 1, 1],
	[4, 3, 3, 3, 2, 1, 1, 1, 1],
	[4, 3, 3, 3, 3, 1, 1, 1, 1],
	[4, 3, 3, 3, 3, 2, 1, 1, 1],
	[4, 3, 3, 3, 3, 2, 2, 1, 1],
];

/** Class features that only restate the level table or pick a subclass; the DM gains nothing from them. */
const BORING_FEATURE =
	/^(\d+: )?Ability Score Improvement$|^Core .+ Traits$|^(Proficiencies|Hit Points|Equipment)$|(Subclass|Archetype|Specialist|Origin)$/;
const BORING_TRAIT = new Set([
	"Creature Type",
	"Size",
	"Speed",
	"Ability Score Increases",
	"Ability Score Increase",
	"Languages",
	"Age",
	"Alignment",
]);

interface Context {
	mods: DdbModifier[];
	items: DdbItem[];
	bodyArmor: DdbItem | undefined;
	shield: DdbItem | undefined;
	heavyArmor: boolean;
}

/** Whether an item's modifiers apply: worn or held, attuned if it needs attunement, and not a consumable. */
function itemActive(item: DdbItem, needsAttunement: boolean): boolean {
	if (item.definition.isConsumable || !item.equipped) return false;
	return !(needsAttunement || item.definition.canAttune) || item.isAttuned;
}

function restrictionHolds(restriction: string | null, ctx: Pick<Context, "bodyArmor" | "heavyArmor">): boolean {
	const r = (restriction ?? "").trim();
	if (r === "") return true;
	if (/(not wearing|without|no) (any )?heavy armor/i.test(r)) return !ctx.heavyArmor;
	if (/(not wearing|without|no) (any )?armor|unarmored/i.test(r)) return ctx.bodyArmor === undefined;
	if (/wearing (any )?(light |medium |heavy )?armor/i.test(r)) return ctx.bodyArmor !== undefined;
	return false;
}

function gatherModifiers(c: DdbCharacter): { mods: DdbModifier[]; items: DdbItem[] } {
	const items = c.inventory ?? [];
	const mods: DdbModifier[] = [];
	for (const source of ["race", "class", "background", "feat"] as const) mods.push(...(c.modifiers?.[source] ?? []));
	for (const m of c.modifiers?.item ?? []) {
		const owners = items.filter((i) => i.definition.id === m.componentId);
		if (owners.some((i) => itemActive(i, m.requiresAttunement ?? false))) mods.push(m);
	}
	return { mods, items };
}

export function computeSheet(c: DdbCharacter): Sheet {
	const { mods: gathered, items } = gatherModifiers(c);
	const active = (i: DdbItem): boolean => itemActive(i, false);
	const armors = items.filter((i) => i.definition.filterType === "Armor" && active(i));
	const bodyArmor = armors.find((i) => [1, 2, 3].includes(i.definition.armorTypeId ?? 0));
	const shield = armors.find((i) => i.definition.armorTypeId === 4);
	const ctx: Context = { mods: [], items, bodyArmor, shield, heavyArmor: bodyArmor?.definition.armorTypeId === 3 };
	// A modifier with dice, or one whose restriction does not hold here ("against being charmed"), is conditional: left out.
	ctx.mods = gathered.filter((m) => m.dice == null && restrictionHolds(m.restriction, ctx));
	const of = (type: string, ...subTypes: string[]): DdbModifier[] =>
		ctx.mods.filter((m) => m.type === type && subTypes.includes(m.subType));
	const bonus = (...subTypes: string[]): number => of("bonus", ...subTypes).reduce((sum, m) => sum + amount(m), 0);
	const has = (type: string, subType: string): boolean => of(type, subType).length > 0;

	const level = c.classes.reduce((sum, k) => sum + k.level, 0);
	const proficiencyBonus = 2 + Math.floor((Math.max(level, 1) - 1) / 4);

	const abilities = {} as Sheet["abilities"];
	ABILITIES.forEach((a, i) => {
		const id = i + 1;
		const base = (c.stats.find((s) => s.id === id)?.value ?? 10) + (c.bonusStats?.find((s) => s.id === id)?.value ?? 0);
		const sub = `${ABILITY_NAMES[a]}-score`;
		let score = Math.min(20, base + bonus(sub));
		for (const m of of("set", sub)) score = Math.max(score, amount(m));
		const override = c.overrideStats?.find((s) => s.id === id)?.value;
		if (override != null) score = override;
		abilities[a] = { score, mod: mod(score) };
	});

	const hitPoints =
		c.overrideHitPoints ??
		(c.baseHitPoints ?? 0) +
			(c.bonusHitPoints ?? 0) +
			abilities.con.mod * level +
			bonus("hit-points-per-level") * level +
			bonus("hit-points");

	const acOverride = c.characterValues?.find((v) => v.typeId === 1)?.value;
	const armorClass =
		typeof acOverride === "number"
			? { value: acOverride, source: "D&D Beyond override" }
			: computeArmorClass(abilities, ctx, bonus);

	const speeds: Sheet["speeds"] = { walk: c.race?.weightSpeeds?.normal?.walk ?? 30 };
	for (const kind of ["fly", "swim", "climb", "burrow"] as const) {
		const base = c.race?.weightSpeeds?.normal?.[kind] ?? 0;
		if (base > 0) speeds[kind] = base;
	}
	const speedNames = {
		walk: "walking",
		fly: "flying",
		swim: "swimming",
		climb: "climbing",
		burrow: "burrowing",
	} as const;
	for (const kind of Object.keys(speedNames) as (keyof typeof speedNames)[]) {
		for (const m of [...of("set", `speed-${speedNames[kind]}`), ...of("set", `innate-speed-${speedNames[kind]}`)]) {
			if (amount(m) > (speeds[kind] ?? 0)) speeds[kind] = amount(m);
		}
	}
	const speedBonus = bonus("speed") + (bodyArmor ? 0 : bonus("unarmored-movement"));
	for (const kind of Object.keys(speeds) as (keyof typeof speeds)[]) speeds[kind] = (speeds[kind] ?? 0) + speedBonus;

	const saves = {} as Sheet["saves"];
	for (const a of ABILITIES) {
		const proficient = has("proficiency", `${ABILITY_NAMES[a]}-saving-throws`);
		saves[a] = {
			proficient,
			bonus:
				abilities[a].mod +
				(proficient ? proficiencyBonus : 0) +
				bonus("saving-throws", `${ABILITY_NAMES[a]}-saving-throws`),
		};
	}

	const perception = has("expertise", "perception")
		? proficiencyBonus * 2
		: has("proficiency", "perception")
			? proficiencyBonus
			: has("half-proficiency", "perception") || has("half-proficiency", "ability-checks")
				? Math.floor(proficiencyBonus / 2)
				: 0;
	const perceptionBonus = abilities.wis.mod + perception + bonus("perception");
	const passivePerception = 10 + perceptionBonus + bonus("passive-perception");
	const initiativeBonus =
		abilities.dex.mod +
		of("bonus", "initiative").reduce((sum, m) => {
			const ability = ABILITIES[(m.statId ?? 0) - 1];
			return (
				sum + amount(m) + (ability ? abilities[ability].mod : 0) + (m.bonusTypes?.includes(1) ? proficiencyBonus : 0)
			);
		}, 0);
	const dice = new Map<number, number>();
	for (const k of c.classes) {
		const sides = k.definition.hitDice ?? 8;
		dice.set(sides, (dice.get(sides) ?? 0) + k.level);
	}
	const con = abilities.con.mod * level;
	const hitDice =
		[...dice].map(([sides, count]) => `${count}d${sides}`).join(" + ") +
		(con === 0 ? "" : ` ${con < 0 ? "-" : "+"} ${Math.abs(con)}`);

	const spellcasting: Sheet["spellcasting"] = [];
	for (const k of c.classes) {
		const caster = casterDefinition(k);
		if (!caster) continue;
		const abilityId = caster.spellCastingAbilityId ?? k.definition.spellCastingAbilityId;
		const ability = ABILITIES[(abilityId ?? 0) - 1];
		if (!ability) continue;
		const s = slugify(k.definition.name);
		spellcasting.push({
			class: k.definition.name,
			ability: ABILITY_LABEL[ability],
			saveDc: 8 + proficiencyBonus + abilities[ability].mod + bonus("spell-save-dc", `${s}-spell-save-dc`),
			attackBonus: proficiencyBonus + abilities[ability].mod + bonus("spell-attacks", `${s}-spell-attacks`),
		});
	}

	const { slots, pact } = computeSlots(c.classes);
	const sheet: Sheet = {
		name: c.name,
		size: ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"][(c.race?.sizeId ?? 4) - 2] ?? "Medium",
		initiativeBonus,
		hitDice,
		perceptionBonus,
		senses: computeSenses(c, ctx.mods),
		languages: collectLanguages(c, ctx.mods),
		attacks: computeAttacks(c, ctx.mods, abilities, proficiencyBonus),
		statblockFeatures: collectStatblockFeatures(c, abilities, proficiencyBonus),
		classes: c.classes.map((k) => ({
			name: k.definition.name,
			...(k.subclassDefinition
				? { subclass: k.subclassDefinition.name.replace(/\s*\((?:Official[^)]*|[^)]*Subclass)\)$/, "") }
				: {}),
			level: k.level,
		})),
		species: c.race?.fullName ?? c.race?.baseRaceName ?? "",
		level,
		proficiencyBonus,
		abilities,
		armorClass,
		hitPoints,
		speeds,
		passivePerception,
		saves,
		spellcasting,
		spellSlots: slots,
		spells: collectSpells(c),
		features: collectFeatures(c),
		inventory: items.map((i) => ({
			name: i.definition.name,
			quantity: i.quantity,
			equipped: i.equipped,
			attuned: i.isAttuned,
			...(i.definition.magic && i.definition.rarity ? { rarity: i.definition.rarity.toLowerCase() } : {}),
		})),
		coin: (["pp", "gp", "ep", "sp", "cp"] as const)
			.filter((k) => (c.currencies?.[k] ?? 0) > 0)
			.map((k) => `${c.currencies?.[k]} ${k}`)
			.join(", "),
	};
	if (pact) sheet.pactSlots = pact;
	if (c.username) sheet.account = c.username;
	return sheet;
}

/** Item magic is local to that item, not a bonus to every attack or piece of armor. */
function itemMagic(item: DdbItem): number {
	return (item.definition.grantedModifiers ?? [])
		.filter((m) => m.type === "bonus" && m.subType === "magic")
		.reduce((sum, m) => sum + amount(m), 0);
}

function computeSenses(c: DdbCharacter, mods: DdbModifier[]): string[] {
	const names = ["blindsight", "darkvision", "tremorsense", "truesight"];
	return names.flatMap((name, index) => {
		const custom = c.customSenses?.find((s) => s.senseId === index + 1)?.distance;
		let distance = typeof custom === "number" ? custom : 0;
		for (const m of mods)
			if ((m.type === "set-base" || m.type === "set") && m.subType === name) distance = Math.max(distance, amount(m));
		for (const m of mods) if (m.type === "sense" && m.subType === name) distance += amount(m);
		return distance > 0 ? [`${name} ${distance} ft.`] : [];
	});
}

function collectLanguages(c: DdbCharacter, mods: DdbModifier[]): string[] {
	const languages = new Set(
		mods
			.filter((m) => m.type === "language" && !m.subType.startsWith("select-"))
			.map((m) => m.friendlySubtypeName ?? m.subType),
	);
	// Homebrew grants can be tagged only in the opening Languages paragraph, not in modifiers.
	// The later reference table lists choices, not languages the character knows.
	for (const { definition: f } of c.race?.racialTraits ?? []) {
		if (f.name !== "Languages") continue;
		const paragraph = (f.description ?? "").split(/<\/p>/i)[0] ?? "";
		for (const match of paragraph.matchAll(/\[language\]([^[]+)\[\/language\]/g)) languages.add(match[1]!.trim());
	}
	return [...languages];
}

function computeAttacks(
	c: DdbCharacter,
	mods: DdbModifier[],
	abilities: Sheet["abilities"],
	pb: number,
): Sheet["attacks"] {
	const attacks: Sheet["attacks"] = [];
	const seen = new Set<string>();
	const pactEnabled = mods.some((m) => m.type === "enable-feature" && m.subType === "enable-pact-weapon");
	for (const item of c.inventory) {
		const d = item.definition;
		if (!item.equipped || d.filterType !== "Weapon" || !d.damage || !d.damageType || seen.has(d.name)) continue;
		const damageDice = d.damage.diceString ?? `${d.damage.diceCount}d${d.damage.diceValue}`;
		const has = (name: string): boolean => d.properties?.some((p) => p.name === name) ?? false;
		const ranged = d.attackType === 2;
		let ability = ranged
			? abilities.dex.mod
			: has("Finesse")
				? Math.max(abilities.str.mod, abilities.dex.mod)
				: abilities.str.mod;
		const pactWeapon =
			pactEnabled &&
			item.id !== undefined &&
			(c.characterValues?.some((v) => v.typeId === 28 && v.value === true && String(v.valueId) === String(item.id)) ??
				false);
		if (pactWeapon) ability = Math.max(ability, abilities.cha.mod);
		const proficient =
			pactWeapon ||
			mods.some(
				(m) =>
					m.type === "proficiency" &&
					(m.subType === slugify(d.type ?? d.name) ||
						m.subType === (d.categoryId === 1 ? "simple-weapons" : "martial-weapons") ||
						m.subType === "weapons"),
			);
		const magic = itemActive(item, false) ? itemMagic(item) : 0;
		const thrown = has("Thrown");
		const versatile = d.properties?.find((p) => p.name === "Versatile")?.notes?.match(/\d+d\d+/)?.[0];
		attacks.push({
			name: d.name,
			ranged,
			toHit: ability + (proficient ? pb : 0) + magic,
			damageDice,
			damageBonus: ability + magic,
			damageType: d.damageType,
			reach: has("Reach") ? 10 : ranged || thrown ? 5 : (d.range ?? 5),
			...((ranged || thrown) && d.range != null ? { range: { normal: d.range, long: d.longRange ?? d.range } } : {}),
			...(versatile ? { versatile } : {}),
		});
		seen.add(d.name);
	}
	return attacks;
}

/** The scalar, division, rounding and minimum tokens used in D&D Beyond's feature snippets. */
function resolveSnippet(text: string, values: Record<string, string | number | undefined>): string {
	return text.replace(/\{\{([^{}]+)\}\}/g, (match, token: string) => {
		const [expression, ...operations] = token.replace(/#unsigned$/, "").split("@");
		const parsed = /^\(?([\w:]+)(?:\/(\d+))?\)?$/.exec(expression ?? "");
		if (!parsed) return match;
		let value = values[parsed[1]!];
		if (value === undefined) return match;
		if (parsed[2]) {
			if (!Number.isFinite(Number(value))) return match;
			value = Number(value) / Number(parsed[2]);
		}
		for (const operation of operations) {
			if (!Number.isFinite(Number(value))) return match;
			if (operation === "rounddown") value = Math.floor(Number(value));
			else if (operation === "roundup") value = Math.ceil(Number(value));
			else if (/^min:\d+$/.test(operation)) value = Math.max(Number(value), Number(operation.slice(4)));
			else return match;
		}
		return String(value);
	});
}

function collectStatblockFeatures(
	c: DdbCharacter,
	abilities: Sheet["abilities"],
	pb: number,
): Sheet["statblockFeatures"] {
	const features = new Map<string, Sheet["statblockFeatures"][number]>();
	const contexts = new Map<string, { level: number; scale: string | undefined }>();
	const values: Record<string, string | number | undefined> = { proficiency: pb };
	for (const a of ABILITIES) {
		values[`modifier:${a}`] = abilities[a].mod;
		values[`savedc:${a}`] = 8 + pb + abilities[a].mod;
	}
	const add = (f: DdbFeature, classLevel?: number, scale?: string): void => {
		if (f.hideInSheet || BORING_FEATURE.test(f.name) || BORING_TRAIT.has(f.name)) return;
		const previous = features.get(f.name);
		const context = contexts.get(f.name);
		const resolvedScale = scale ?? context?.scale;
		if (classLevel !== undefined) contexts.set(f.name, { level: classLevel, scale: resolvedScale });
		values.classlevel = classLevel ?? context?.level;
		values.scalevalue = resolvedScale;
		const use = !Array.isArray(f.limitedUse) ? f.limitedUse : undefined;
		let maxUses = Math.max(0, use?.maxUses ?? 0);
		const ability = ABILITIES[(use?.statModifierUsesId ?? 0) - 1];
		if (ability) maxUses = use?.operator === 2 ? maxUses * abilities[ability].mod : maxUses + abilities[ability].mod;
		if (use?.useProficiencyBonus) maxUses = use.proficiencyBonusOperator === 2 ? maxUses * pb : maxUses + pb;
		const reset = ({ 1: "Short Rest", 2: "Long Rest", 3: "Day" } as Record<number, string>)[use?.resetType ?? 0];
		const html = f.snippet || f.description || "";
		values.limiteduse = maxUses;
		const description = html
			? resolveSnippet(JSDOM.fragment(html.replace(/<\/(?:p|div|li)>|<br\s*\/?>/gi, " ")).textContent ?? "", values)
					.replace(/\s+/g, " ")
					.trim()
			: (previous?.description ?? "");
		const activation = f.activation?.activationType;
		const section =
			activation === 3
				? "bonus_actions"
				: activation === 4
					? "reactions"
					: activation === 1
						? "actions"
						: (previous?.section ?? "traits");
		features.set(f.name, {
			name:
				resolvedScale && /^\d+d\d+$/.test(resolvedScale) ? `${f.name} (${resolvedScale})` : (previous?.name ?? f.name),
			description,
			section,
			...(use && reset
				? { limitedUse: { maxUses, reset } }
				: previous?.limitedUse
					? { limitedUse: previous.limitedUse }
					: {}),
		});
	};
	for (const k of c.classes) {
		for (const d of [k.definition, k.subclassDefinition]) {
			for (const f of d?.classFeatures ?? []) if ((f.requiredLevel ?? 1) <= k.level) add(f, k.level);
		}
		for (const f of k.classFeatures ?? []) {
			if ((f.definition.requiredLevel ?? 1) <= k.level) {
				const scale =
					f.levelScale?.dice?.diceString ??
					(f.levelScale?.fixedValue != null ? String(f.levelScale.fixedValue) : undefined);
				add(f.definition, k.level, scale);
			}
		}
	}
	for (const t of c.race?.racialTraits ?? []) add(t.definition);
	for (const f of c.feats ?? []) add(f.definition);
	for (const list of Object.values(c.actions ?? {})) for (const f of list ?? []) add(f);
	return [...features.values()];
}

function computeArmorClass(
	abilities: Sheet["abilities"],
	ctx: Context,
	bonus: (...subTypes: string[]) => number,
): Sheet["armorClass"] {
	const dex = abilities.dex.mod;
	const magic = itemMagic;
	const shieldBonus = ctx.shield ? (ctx.shield.definition.armorClass ?? 2) + magic(ctx.shield) : 0;
	const extra = bonus("armor-class") + shieldBonus;
	const shieldName = ctx.shield ? " + shield" : "";
	if (ctx.bodyArmor) {
		const a = ctx.bodyArmor.definition;
		const kind = a.armorTypeId;
		const dexPart = kind === 1 ? dex : kind === 2 ? Math.min(dex, 2) : 0;
		return { value: (a.armorClass ?? 10) + magic(ctx.bodyArmor) + dexPart + extra, source: `${a.name}${shieldName}` };
	}
	let value = 10 + dex;
	let source = "unarmored";
	for (const m of ctx.mods.filter((x) => x.type === "set" && x.subType === "unarmored-armor-class")) {
		const stat = ABILITIES[(m.statId ?? 0) - 1];
		const candidate = stat ? 10 + dex + abilities[stat].mod : amount(m) + dex;
		if (candidate > value) {
			value = candidate;
			source = "unarmored defense";
		}
	}
	return { value: value + extra, source: `${source}${shieldName}` };
}

/** The class definition that supplies spellcasting: the class itself, or its subclass (Eldritch Knight, Arcane Trickster). */
function casterDefinition(k: DdbClass): DdbClassDefinition | undefined {
	if (k.definition.canCastSpells) return k.definition;
	if (k.subclassDefinition?.canCastSpells) return k.subclassDefinition;
	return undefined;
}

function computeSlots(classes: DdbClass[]): { slots: number[]; pact?: { count: number; level: number } } {
	const casters = classes.flatMap((k) => {
		const def = casterDefinition(k);
		return def ? [{ k, def }] : [];
	});
	const normal = casters.filter(({ k }) => k.definition.name !== "Warlock");
	const warlock = casters.find(({ k }) => k.definition.name === "Warlock")?.k;
	let slots: number[] = [];
	if (normal.length === 1) {
		const { k, def } = normal[0]!;
		slots = (def.spellRules?.levelSpellSlots?.[k.level] ?? []).slice();
		while (slots.length > 0 && slots[slots.length - 1] === 0) slots.pop();
	} else if (normal.length > 1) {
		const casterLevel = normal.reduce(
			(sum, { k, def }) => sum + Math.floor(k.level / (def.spellRules?.multiClassSpellSlotDivisor || 1)),
			0,
		);
		slots = (MULTICLASS_SLOTS[Math.min(casterLevel, 20) - 1] ?? []).slice();
	}
	if (!warlock) return { slots };
	const count = warlock.level >= 17 ? 4 : warlock.level >= 11 ? 3 : warlock.level >= 2 ? 2 : 1;
	return { slots, pact: { count, level: Math.min(5, Math.ceil(warlock.level / 2)) } };
}

function collectSpells(c: DdbCharacter): SpellEntry[] {
	const seen = new Map<string, SpellEntry>();
	const add = (spell: DdbSpell, origin: string | undefined): void => {
		const tags: string[] = [];
		if (spell.alwaysPrepared) tags.push("always prepared");
		else if (spell.prepared && spell.definition.level > 0) tags.push("prepared");
		if (origin) tags.push(origin);
		const key = `${spell.definition.level}|${spell.definition.name}|${origin ?? ""}`;
		if (!seen.has(key)) seen.set(key, { name: spell.definition.name, level: spell.definition.level, tags });
	};
	for (const cs of c.classSpells ?? []) for (const s of cs.spells ?? []) add(s, undefined);
	for (const [origin, label] of [
		["race", "species"],
		["feat", "feat"],
		["item", "item"],
		["background", "background"],
	] as const) {
		for (const s of c.spells?.[origin] ?? []) add(s, label);
	}
	return [...seen.values()].sort(
		(a, b) => a.level - b.level || a.name.localeCompare(b.name) || a.tags.join().localeCompare(b.tags.join()),
	);
}

function collectFeatures(c: DdbCharacter): Sheet["features"] {
	const out: Sheet["features"] = [];
	for (const k of c.classes) {
		const names = new Set<string>();
		for (const def of [k.definition, k.subclassDefinition]) {
			for (const f of def?.classFeatures ?? [])
				if ((f.requiredLevel ?? 1) <= k.level && !BORING_FEATURE.test(f.name)) names.add(f.name);
		}
		if (names.size > 0) out.push({ source: k.definition.name, names: [...names].sort((a, b) => a.localeCompare(b)) });
	}
	const traits = (c.race?.racialTraits ?? [])
		.filter((t) => !t.definition.hideInSheet && !BORING_TRAIT.has(t.definition.name))
		.map((t) => t.definition.name);
	if (traits.length > 0) out.push({ source: "Species", names: [...new Set(traits)] });
	const feats = [...new Set((c.feats ?? []).map((f) => f.definition.name))].sort((a, b) => a.localeCompare(b));
	if (feats.length > 0) out.push({ source: "Feats", names: feats });
	return out;
}
