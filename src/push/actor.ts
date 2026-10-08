import { parseDice } from "../check/statblock/dice.ts";
import type { Feature, FeatureSection, Statblock } from "../check/statblock/parse.ts";
import { abilityModifier, ABILITIES, proficiencyBonus, SKILL_ABILITY } from "../check/statblock/tables.ts";
import type { Page } from "../vault/types.ts";
import { OWNERSHIP, stats } from "./foundry.ts";
import type { Doc } from "./foundry.ts";
import { foundryId } from "./ids.ts";
import { markdownToHtml } from "./markdown.ts";
import { statblockOf } from "./statblock.ts";

export interface ActorOptions {
	/** The Campaign folder the documents belong to; it seeds every ID. */
	campaign: string;
	/** The Actor's name: the Creature's own, or the NPC's when an NPC has its own Actor. */
	name: string;
	/** HTML for the Actor's biography. */
	biography: string;
	/** Module path of the portrait; the prototype token wears it too. */
	img?: string;
	/** Vault path the ID derives from (default: the Creature page). An NPC's Actor passes the NPC page. */
	idPath?: string;
	/** ID role suffix; none for a Creature's own Actor, `actor` for an NPC's. */
	role?: string;
	/** Token disposition: -1 hostile (a Creature), 0 neutral (an NPC). */
	disposition?: -1 | 0 | 1;
}

export interface BuiltActor {
	data: Doc;
	/** Statblock numbers that disagree with the Creature's own arithmetic; the gate reports them, Push carries them as written. */
	warnings: string[];
}

const SKILL_KEYS: Record<string, string> = {
	acrobatics: "acr", "animal handling": "ani", arcana: "arc", athletics: "ath", deception: "dec", history: "his", insight: "ins",
	intimidation: "itm", investigation: "inv", medicine: "med", nature: "nat", perception: "prc", performance: "prf", persuasion: "per",
	religion: "rel", "sleight of hand": "slt", stealth: "ste", survival: "sur",
};
const SIZES: Record<string, { key: string; squares: number }> = {
	tiny: { key: "tiny", squares: 1 }, small: { key: "sm", squares: 1 }, medium: { key: "med", squares: 1 },
	large: { key: "lg", squares: 2 }, huge: { key: "huge", squares: 3 }, gargantuan: { key: "grg", squares: 4 },
};
const CREATURE_TYPES = ["aberration", "beast", "celestial", "construct", "dragon", "elemental", "fey", "fiend", "giant", "humanoid", "monstrosity", "ooze", "plant", "undead"];
const DAMAGE_TYPES = ["acid", "bludgeoning", "cold", "fire", "force", "lightning", "necrotic", "piercing", "poison", "psychic", "radiant", "slashing", "thunder"];
const CONDITIONS = ["blinded", "charmed", "deafened", "exhaustion", "frightened", "grappled", "incapacitated", "invisible", "paralyzed", "petrified", "poisoned", "prone", "restrained", "stunned", "unconscious"];
const LANGUAGES: Record<string, string> = {
	common: "common", draconic: "draconic", dwarvish: "dwarvish", elvish: "elvish", giant: "giant", gnomish: "gnomish", goblin: "goblin",
	halfling: "halfling", orc: "orc", "common sign language": "sign", aarakocra: "aarakocra", abyssal: "abyssal", "thieves' cant": "cant",
	celestial: "celestial", "deep speech": "deep", druidic: "druidic", gith: "gith", gnoll: "gnoll", infernal: "infernal", primordial: "primordial",
	aquan: "aquan", auran: "auran", ignan: "ignan", terran: "terran", sylvan: "sylvan", undercommon: "undercommon",
};
const SENSES = ["darkvision", "blindsight", "tremorsense", "truesight"];
const MOVEMENT = ["burrow", "climb", "fly", "swim"];

const slug = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** `"30 ft., swim 30 ft., fly 60 ft. (hover)"` as dnd5e movement. */
function movement(text: string): Doc {
	const out: Doc = { units: "ft" };
	for (const part of text.split(",").map((p) => p.trim().toLowerCase()).filter(Boolean)) {
		const kind = MOVEMENT.find((m) => part.startsWith(m));
		const number = /(\d+)/.exec(part)?.[1];
		if (!number) continue;
		out[kind ?? "walk"] = number;
		if (part.includes("hover")) out.hover = true;
	}
	return out;
}

/** `"darkvision 60 ft., passive Perception 10"` as dnd5e senses; passive Perception is derived, anything unknown goes to `special`. */
function senses(text: string): Doc {
	const ranges: Record<string, number> = {};
	const special: string[] = [];
	for (const part of text.split(",").map((p) => p.trim()).filter(Boolean)) {
		const sense = SENSES.find((s) => part.toLowerCase().startsWith(s));
		const range = /(\d+)/.exec(part)?.[1];
		if (sense && range) ranges[sense] = Number(range);
		else if (!/^passive perception/i.test(part)) special.push(part);
	}
	return { ranges, units: "ft", special: special.join("; ") };
}

/** A damage or condition trait list: known keys become `value`, anything else (a qualifier such as "nonmagical") stays as `custom`. */
function traitList(text: string, known: string[]): { value: string[]; custom: string } {
	const value: string[] = [];
	const custom: string[] = [];
	const items = text.split(/;/).flatMap((chunk) => (/[a-z] (?:from|that|not|except)\b/i.test(chunk) ? [chunk] : chunk.split(",")));
	for (const raw of items) {
		const item = raw.trim().replace(/^and\s+/i, "");
		if (!item) continue;
		if (known.includes(item.toLowerCase())) value.push(item.toLowerCase());
		else custom.push(item);
	}
	return { value, custom: custom.join("; ") };
}

function languages(text: string): Doc {
	const value: string[] = [];
	const custom: string[] = [];
	const communication: Record<string, { value: number; units: string }> = {};
	for (const raw of text.split(/[,;]/).map((p) => p.trim()).filter(Boolean)) {
		const telepathy = /^telepathy (\d+) ?ft/i.exec(raw);
		if (telepathy) communication.telepathy = { value: Number(telepathy[1]), units: "ft" };
		else if (LANGUAGES[raw.toLowerCase()]) value.push(LANGUAGES[raw.toLowerCase()]!);
		else if (!/^(—|-|none)$/i.test(raw)) custom.push(raw);
	}
	// A sentence such as "Understands X but can't speak" contains commas only by accident; keep it whole when nothing else matched.
	return value.length === 0 && Object.keys(communication).length === 0 && custom.length > 0 ? { value, custom: text.trim(), communication } : { value, custom: custom.join("; "), communication };
}

interface AttackText {
	kind: "melee" | "ranged";
	bonus: string;
	reach?: number;
	range?: { value: number; long?: number };
	parts: { number: number; denomination: number; bonus: string; type: string }[];
}

const ATTACK = /^\*?(Melee or Ranged|Melee|Ranged) Attack Roll:\*?\s*([+\-−]\d+)\s*,\s*(.*)$/is;
const DAMAGE_CLAUSE = /(\d+)\s*\(([^)]+)\)\s+([A-Za-z]+)\s+damage/g;

/** Reads the 2024 attack line (`*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 11 (2d8 + 2) Bludgeoning damage ...`). */
export function parseAttack(desc: string): AttackText | undefined {
	const head = ATTACK.exec(desc.trim());
	if (!head) return undefined;
	const [, kindText = "", bonusText = "", rest = ""] = head;
	const [reachAndRange = "", hit = ""] = rest.split(/\*Hit:\*/i);
	if (!hit) return undefined;
	const reach = /reach (\d+)\s*ft/i.exec(reachAndRange)?.[1];
	const range = /range (\d+)(?:\s*\/\s*(\d+))?\s*ft/i.exec(reachAndRange);
	const parts: AttackText["parts"] = [];
	let previousEnd = 0;
	for (const match of hit.matchAll(DAMAGE_CLAUSE)) {
		const between = hit.slice(previousEnd, match.index).trim();
		const after = hit.slice((match.index ?? 0) + match[0].length).split(/[.]/)[0] ?? "";
		const first = parts.length === 0;
		// Only the first clause and unconditional "plus" clauses are real damage; a rider that needs Advantage stays in the text.
		if (!first && (!/^,?\s*(plus|and)$/i.test(between) || /\bif\b|\bwhile\b|\bagainst\b|\bunless\b/i.test(after))) {
			previousEnd = (match.index ?? 0) + match[0].length;
			continue;
		}
		previousEnd = (match.index ?? 0) + match[0].length;
		const dice = parseDice(match[2] ?? "");
		if (!dice) return first ? undefined : { kind: "melee", bonus: "", parts };
		dice.terms.forEach(([number, denomination], i) => {
			parts.push({ number, denomination, bonus: i === 0 && dice.flat !== 0 ? String(dice.flat) : "", type: (match[3] ?? "").toLowerCase() });
		});
	}
	if (parts.length === 0) return undefined;
	const kind = /^Ranged/i.test(kindText) ? "ranged" : "melee";
	const out: AttackText = { kind, bonus: String(Number(bonusText.replace("−", "-"))), parts };
	if (reach) out.reach = Number(reach);
	if (range) out.range = { value: Number(range[1]), ...(range[2] ? { long: Number(range[2]) } : {}) };
	return out;
}

const ACTIVATION: Partial<Record<FeatureSection, string>> = { actions: "action", bonus_actions: "bonus", reactions: "reaction", legendary_actions: "legendary" };

const RECHARGE = /\(Recharge (\d)(?:\s*[–-]\s*\d)?\)/i;
const PER_DAY = /\((\d+)\/Day\)/i;

function uses(name: string): Doc | undefined {
	const recharge = RECHARGE.exec(name)?.[1];
	if (recharge) return { max: "1", spent: 0, recovery: [{ period: "recharge", formula: recharge, type: "recoverAll" }] };
	const perDay = PER_DAY.exec(name)?.[1];
	if (perDay) return { max: perDay, spent: 0, recovery: [{ period: "day", type: "recoverAll" }] };
	return undefined;
}

function activityBase(id: string, type: string, activation: string, hasUses: boolean): Doc {
	return {
		_id: id,
		type,
		name: "",
		sort: 0,
		activation: { type: activation, value: activation === "legendary" ? 1 : null, override: false, condition: "" },
		consumption: { targets: hasUses ? [{ type: "itemUses", target: "", value: "1", scaling: {} }] : [], scaling: { allowed: false }, spellSlot: true },
		duration: { units: "inst", concentration: false, override: false },
		effects: [],
		uses: { spent: 0, recovery: [], max: "" },
	};
}

function featureItem(campaign: string, path: string, feature: Feature, sort: number, warnings: string[]): Doc {
	const id = foundryId(campaign, path, `item:${feature.section}:${feature.name}`);
	const activation = ACTIVATION[feature.section];
	const itemUses = uses(feature.name);
	const description = markdownToHtml(feature.desc);
	const attack = activation ? parseAttack(feature.desc) : undefined;
	const base = { _id: id, name: feature.name, img: attack ? "icons/svg/sword.svg" : "icons/svg/aura.svg", sort: sort * 100_000, effects: [], flags: {}, ownership: { default: OWNERSHIP.NONE }, _stats: stats() };

	if (attack) {
		const activityId = foundryId(campaign, path, `activity:${feature.section}:${feature.name}`);
		const reach = attack.kind === "melee" ? (attack.reach ?? attack.range?.value ?? 5) : (attack.range?.value ?? 5);
		const activity = {
			...activityBase(activityId, "attack", activation ?? "action", Boolean(itemUses)),
			attack: { ability: "", bonus: attack.bonus, critical: { threshold: null }, flat: true, type: { value: attack.kind, classification: "weapon" } },
			damage: {
				includeBase: false,
				critical: { bonus: "" },
				parts: attack.parts.map((p) => ({ number: p.number, denomination: p.denomination, bonus: p.bonus, types: [p.type], custom: { enabled: false, formula: "" }, scaling: { number: 1 } })),
			},
			range: { value: String(reach), units: "ft", special: "", override: false },
		};
		return {
			...base,
			type: "weapon",
			system: {
				description: { value: description, chat: "" },
				type: { value: "natural", baseItem: "" },
				equipped: true,
				quantity: 1,
				identifier: slug(feature.name),
				range: { value: attack.range?.value ?? null, long: attack.range?.long ?? null, reach: attack.reach ?? null, units: "ft" },
				properties: [],
				proficient: null,
				...(itemUses ? { uses: itemUses } : {}),
				activities: { [activityId]: activity },
			},
		};
	}

	if (!activation) {
		// A trait: text only, no activity.
		return { ...base, type: "feat", system: { description: { value: description, chat: "" }, type: { value: "monster", subtype: "" }, identifier: slug(feature.name), properties: ["trait"], ...(itemUses ? { uses: itemUses } : {}), activities: {} } };
	}
	if (/^\*?(Melee|Ranged)( or Ranged)? Attack Roll:/i.test(feature.desc.trim()) && !attack) warnings.push(`${feature.name}: the attack text did not parse; it is a feature with its text, not an attack.`);
	const activityId = foundryId(campaign, path, `activity:${feature.section}:${feature.name}`);
	return {
		...base,
		type: "feat",
		system: {
			description: { value: description, chat: "" },
			type: { value: "monster", subtype: "" },
			identifier: slug(feature.name),
			properties: [],
			...(itemUses ? { uses: itemUses } : {}),
			activities: { [activityId]: { ...activityBase(activityId, "utility", activation, Boolean(itemUses)), roll: { prompt: false, visible: false, name: "", formula: "" } } },
		},
	};
}

function abilityBlock(sb: Statblock, pb: number, warnings: string[]): Record<string, Doc> {
	const scores = sb.stats ?? [10, 10, 10, 10, 10, 10];
	const out: Record<string, Doc> = {};
	ABILITIES.forEach((ability, i) => {
		const save = sb.saves.find((s) => s.key === ability);
		const mod = abilityModifier(scores[i] ?? 10);
		if (save && save.value !== mod + pb) warnings.push(`${ability} save is ${save.value}, not ${mod + pb}; Foundry will compute ${mod + pb}.`);
		out[ability] = { value: scores[i] ?? 10, proficient: save ? 1 : 0 };
	});
	return out;
}

function skillBlock(sb: Statblock, pb: number, warnings: string[]): Record<string, Doc> {
	const scores = sb.stats ?? [10, 10, 10, 10, 10, 10];
	const out: Record<string, Doc> = {};
	for (const skill of sb.skills) {
		const key = SKILL_KEYS[skill.key];
		const ability = SKILL_ABILITY[skill.key];
		if (!key || !ability) continue;
		const mod = abilityModifier(scores[ABILITIES.indexOf(ability)] ?? 10);
		const value = skill.value === mod + 2 * pb ? 2 : 1;
		if (skill.value !== mod + pb && skill.value !== mod + 2 * pb) warnings.push(`${skill.key} is ${skill.value}, not ${mod + pb} or ${mod + 2 * pb}; Foundry will compute a proficient bonus.`);
		out[key] = { value };
	}
	return out;
}

/** A dnd5e 5.3.3 `npc` Actor from a Creature page's statblock, with each trait and action as an embedded Item. */
export function buildActor(page: Page, options: ActorOptions): BuiltActor {
	const sb = statblockOf(page);
	if (!sb) throw new Error(`${page.path} has no readable statblock.`);
	const warnings: string[] = [];
	const raw = sb.raw;
	const text = (key: string): string => (typeof raw[key] === "string" ? (raw[key] as string) : typeof raw[key] === "number" ? String(raw[key]) : "");
	const pb = sb.proficiencyBonus ?? proficiencyBonus(sb.cr ?? 0);
	const size = SIZES[sb.size.toLowerCase()] ?? SIZES.medium!;
	const typeText = text("type").toLowerCase();
	const legendary = sb.features.some((f) => f.section === "legendary_actions");
	const legendaryCount = Number(/(\d+)\s+Legendary Action/i.exec(text("legendary_description"))?.[1] ?? (legendary ? 3 : 0));

	const items = sb.features.map((f, i) => featureItem(options.campaign, options.idPath ?? page.path, f, i + 1, warnings));
	const idPath = options.idPath ?? page.path;
	const id = foundryId(options.campaign, idPath, options.role ?? "");
	const img = options.img ?? "icons/svg/mystery-man.svg";
	const di = traitList(text("damage_immunities"), DAMAGE_TYPES);
	const dr = traitList(text("damage_resistances"), DAMAGE_TYPES);
	const dv = traitList(text("damage_vulnerabilities"), DAMAGE_TYPES);
	const ci = traitList(text("condition_immunities"), CONDITIONS);

	const data: Doc = {
		_id: id,
		name: options.name,
		type: "npc",
		img,
		folder: null,
		sort: 0,
		flags: {},
		ownership: { default: OWNERSHIP.NONE },
		_stats: stats(),
		effects: [],
		items,
		system: {
			abilities: abilityBlock(sb, pb, warnings),
			skills: skillBlock(sb, pb, warnings),
			attributes: {
				ac: { calc: "natural", flat: Number(text("ac")) || 10 },
				hp: { value: sb.hp ?? 1, max: sb.hp ?? 1, formula: sb.hitDice },
				movement: movement(text("speed")),
				senses: senses(sb.senses),
			},
			details: {
				biography: { value: options.biography, public: "" },
				alignment: text("alignment"),
				type: CREATURE_TYPES.includes(typeText) ? { value: typeText, subtype: text("subtype") } : { value: "", subtype: text("subtype"), custom: text("type") },
				cr: sb.cr ?? 0,
			},
			traits: {
				size: size.key,
				di, dr, dv, ci,
				languages: languages(text("languages")),
			},
			resources: { legact: { max: legendaryCount, spent: 0 } },
			source: { rules: "2024", book: "Campaign Foundry" },
		},
		prototypeToken: {
			name: options.name,
			actorLink: false,
			displayName: 20,
			displayBars: 20,
			bar1: { attribute: "attributes.hp" },
			disposition: options.disposition ?? -1,
			width: size.squares,
			height: size.squares,
			texture: { src: img, anchorX: 0.5, anchorY: 0.5, fit: "contain", scaleX: 1, scaleY: 1 },
		},
	};
	return { data, warnings };
}
