import type { DdbCharacter, DdbClass, DdbClassDefinition, DdbItem, DdbModifier, DdbSpell } from "./ddb.ts";

/**
 * The narrow parser: D&D Beyond's payload holds raw ingredients (base scores, modifiers, items), never the
 * computed sheet, so this derives what a DM needs mid-round. It covers Armor Class, Hit Points, speeds, saves,
 * Passive Perception and spellcasting. Rare rules it does not model are listed in the research note.
 */

export const ABILITIES = ["str", "dex", "con", "int", "wis", "cha"] as const;
export type Ability = (typeof ABILITIES)[number];
const ABILITY_NAMES: Record<Ability, string> = {
	str: "strength", dex: "dexterity", con: "constitution", int: "intelligence", wis: "wisdom", cha: "charisma",
};
const ABILITY_LABEL: Record<Ability, string> = { str: "Str", dex: "Dex", con: "Con", int: "Int", wis: "Wis", cha: "Cha" };

export interface SpellEntry {
	name: string;
	level: number;
	/** `always prepared`, `prepared` and where a spell comes from when not a class (`feat`, `item`, `species`). */
	tags: string[];
}

export interface Sheet {
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
const slug = (name: string): string => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Standard 5e slots by multiclass caster level, index 0 = caster level 1. */
const MULTICLASS_SLOTS: number[][] = [
	[2], [3], [4, 2], [4, 3], [4, 3, 2], [4, 3, 3], [4, 3, 3, 1], [4, 3, 3, 2], [4, 3, 3, 3, 1], [4, 3, 3, 3, 2],
	[4, 3, 3, 3, 2, 1], [4, 3, 3, 3, 2, 1], [4, 3, 3, 3, 2, 1, 1], [4, 3, 3, 3, 2, 1, 1], [4, 3, 3, 3, 2, 1, 1, 1],
	[4, 3, 3, 3, 2, 1, 1, 1], [4, 3, 3, 3, 2, 1, 1, 1, 1], [4, 3, 3, 3, 3, 1, 1, 1, 1], [4, 3, 3, 3, 3, 2, 1, 1, 1],
	[4, 3, 3, 3, 3, 2, 2, 1, 1],
];

/** Class features that only restate the level table or pick a subclass; the DM gains nothing from them. */
const BORING_FEATURE = /^(\d+: )?Ability Score Improvement$|^Core .+ Traits$|^(Proficiencies|Hit Points|Equipment)$|(Subclass|Archetype|Specialist|Origin)$/;
const BORING_TRAIT = new Set(["Creature Type", "Size", "Speed", "Ability Score Increases", "Ability Score Increase", "Languages", "Age", "Alignment"]);

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
	const of = (type: string, ...subTypes: string[]): DdbModifier[] => ctx.mods.filter((m) => m.type === type && subTypes.includes(m.subType));
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

	const armorClass = computeArmorClass(abilities, ctx, bonus);

	const speeds: Sheet["speeds"] = { walk: c.race?.weightSpeeds?.normal?.walk ?? 30 };
	for (const kind of ["fly", "swim", "climb", "burrow"] as const) {
		const base = c.race?.weightSpeeds?.normal?.[kind] ?? 0;
		if (base > 0) speeds[kind] = base;
	}
	const speedNames = { walk: "walking", fly: "flying", swim: "swimming", climb: "climbing", burrow: "burrowing" } as const;
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
		saves[a] = { proficient, bonus: abilities[a].mod + (proficient ? proficiencyBonus : 0) + bonus("saving-throws", `${ABILITY_NAMES[a]}-saving-throws`) };
	}

	const perception = has("expertise", "perception")
		? proficiencyBonus * 2
		: has("proficiency", "perception")
			? proficiencyBonus
			: has("half-proficiency", "perception") || has("half-proficiency", "ability-checks")
				? Math.floor(proficiencyBonus / 2)
				: 0;
	const passivePerception = 10 + abilities.wis.mod + perception + bonus("passive-perception", "perception");

	const spellcasting: Sheet["spellcasting"] = [];
	for (const k of c.classes) {
		const caster = casterDefinition(k);
		if (!caster) continue;
		const abilityId = caster.spellCastingAbilityId ?? k.definition.spellCastingAbilityId;
		const ability = ABILITIES[(abilityId ?? 0) - 1];
		if (!ability) continue;
		const s = slug(k.definition.name);
		spellcasting.push({
			class: k.definition.name,
			ability: ABILITY_LABEL[ability],
			saveDc: 8 + proficiencyBonus + abilities[ability].mod + bonus("spell-save-dc", `${s}-spell-save-dc`),
			attackBonus: proficiencyBonus + abilities[ability].mod + bonus("spell-attacks", `${s}-spell-attacks`),
		});
	}

	const { slots, pact } = computeSlots(c.classes);
	const sheet: Sheet = {
		classes: c.classes.map((k) => ({
			name: k.definition.name,
			...(k.subclassDefinition ? { subclass: k.subclassDefinition.name.replace(/\s*\((?:Official[^)]*|[^)]*Subclass)\)$/, "") } : {}),
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

function computeArmorClass(
	abilities: Sheet["abilities"],
	ctx: Context,
	bonus: (...subTypes: string[]) => number,
): Sheet["armorClass"] {
	const dex = abilities.dex.mod;
	const magic = (item: DdbItem): number =>
		(item.definition.grantedModifiers ?? []).filter((m) => m.type === "bonus" && m.subType === "magic").reduce((sum, m) => sum + amount(m), 0);
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
		const casterLevel = normal.reduce((sum, { k, def }) => sum + Math.floor(k.level / (def.spellRules?.multiClassSpellSlotDivisor || 1)), 0);
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
	for (const [origin, label] of [["race", "species"], ["feat", "feat"], ["item", "item"], ["background", "background"]] as const) {
		for (const s of c.spells?.[origin] ?? []) add(s, label);
	}
	return [...seen.values()].sort((a, b) => a.level - b.level || a.name.localeCompare(b.name) || a.tags.join().localeCompare(b.tags.join()));
}

function collectFeatures(c: DdbCharacter): Sheet["features"] {
	const out: Sheet["features"] = [];
	for (const k of c.classes) {
		const names = new Set<string>();
		for (const def of [k.definition, k.subclassDefinition]) {
			for (const f of def?.classFeatures ?? []) if (f.requiredLevel <= k.level && !BORING_FEATURE.test(f.name)) names.add(f.name);
		}
		if (names.size > 0) out.push({ source: k.definition.name, names: [...names].sort((a, b) => a.localeCompare(b)) });
	}
	const traits = (c.race?.racialTraits ?? []).filter((t) => !t.definition.hideInSheet && !BORING_TRAIT.has(t.definition.name)).map((t) => t.definition.name);
	if (traits.length > 0) out.push({ source: "Species", names: [...new Set(traits)] });
	const feats = [...new Set((c.feats ?? []).map((f) => f.definition.name))].sort((a, b) => a.localeCompare(b));
	if (feats.length > 0) out.push({ source: "Feats", names: feats });
	return out;
}
