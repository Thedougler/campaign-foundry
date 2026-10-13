import { parseCr } from "../check/statblock/parse.ts";
import { ABILITY_NAMES } from "../check/statblock/tables.ts";
import { normaliseItemSpelling } from "../items/spelling.ts";
import { normalisePunctuation } from "../spells/page.ts";

const STATBLOCK_KEYS = [
	"layout",
	"name",
	"size",
	"type",
	"subtype",
	"alignment",
	"ac",
	"ac_class",
	"hp",
	"hit_dice",
	"modifier",
	"speed",
	"stats",
	"saves",
	"skillsaves",
	"damage_vulnerabilities",
	"damage_resistances",
	"damage_immunities",
	"condition_immunities",
	"gear",
	"senses",
	"languages",
	"cr",
	"traits",
	"actions",
	"bonus_actions",
	"reactions",
	"legendary_description",
	"legendary_actions",
	"mythic_description",
	"mythic_actions",
	"lair_actions",
	"regional_effects",
] as const;

const FEATURE_LISTS = new Set<string>([
	"traits",
	"actions",
	"bonus_actions",
	"reactions",
	"legendary_actions",
	"mythic_actions",
	"lair_actions",
]);
const SIZE_NAMES: Record<string, string> = {
	T: "Tiny",
	S: "Small",
	M: "Medium",
	L: "Large",
	H: "Huge",
	G: "Gargantuan",
};

const ABILITY_FROM_NAME: Record<string, string> = Object.fromEntries(
	Object.entries(ABILITY_NAMES).map(([key, name]) => [name.toLowerCase(), key]),
);

const BESTIARY_SHAPE = "Not a 5etools bestiary JSON (expected an array or {monster: [...]})";

/** One 5etools monster object: `name` and `source` are required; the rest is read where present. */
export interface FivetoolsMonster {
	name: string;
	source: string;
	cr?: unknown;
	type?: unknown;
	size?: unknown;
	environment?: unknown;
	otherSources?: { source?: string }[];
}

export interface CreatureSortKeys {
	cr: number | "";
	creature_type: string;
	size: string;
	habitat: string[];
	sourcebooks: string[];
}

function isEmpty(value: unknown): boolean {
	if (value === undefined || value === null || value === "") return true;
	if (Array.isArray(value) && value.length === 0) return true;
	return false;
}

function titleCaseWords(text: string): string {
	return text
		.trim()
		.split(/\s+/)
		.map((word) => (word ? word[0]!.toUpperCase() + word.slice(1).toLowerCase() : word))
		.join(" ");
}

function habitatName(entry: string): string {
	const comma = entry.indexOf(",");
	if (comma < 0) return titleCaseWords(entry);
	return `${titleCaseWords(entry.slice(0, comma))} (${titleCaseWords(entry.slice(comma + 1))})`;
}

function typeName(type: unknown): string {
	if (typeof type === "string") return type;
	if (type && typeof type === "object" && "type" in type && typeof type.type === "string") return type.type;
	return "";
}

function sizeName(size: unknown): string {
	const letters = Array.isArray(size) ? size : size == null ? [] : [size];
	return letters.map((letter) => SIZE_NAMES[String(letter).toUpperCase()] ?? String(letter)).join(" or ");
}

function mapSaves(value: unknown): unknown {
	if (!Array.isArray(value)) return value;
	return value.map((item) => {
		if (!item || typeof item !== "object" || Array.isArray(item)) return item;
		const mapped: Record<string, unknown> = {};
		for (const [key, bonus] of Object.entries(item as Record<string, unknown>)) {
			mapped[ABILITY_FROM_NAME[key.toLowerCase()] ?? key] = bonus;
		}
		return mapped;
	});
}

function mapSkillsaves(value: unknown): unknown {
	if (!Array.isArray(value)) return value;
	return value.map((item) => {
		if (!item || typeof item !== "object" || Array.isArray(item)) return item;
		const rec = item as Record<string, unknown>;
		if (typeof rec.name !== "string" || rec.desc === undefined) return item;
		const name = rec.name.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").toLowerCase();
		return { [name]: Number(String(rec.desc).replace(/^\+/, "").replace("−", "-")) };
	});
}

/** Strip inline HTML, spell links to italics, other links to their text, then punctuation and British spelling. */
export async function cleanText(s: string): Promise<string> {
	let html = s;
	let previous = "";
	while (html !== previous) {
		previous = html;
		html = html.replace(/<([a-zA-Z][\w:-]*)\b[^>]*>([\s\S]*?)<\/\1>/g, "$2");
	}
	const unlinked = html
		.replace(/\[([^\]]+)\]\(([^)]*\/spells\/[^)]*)\)/g, "*$1*")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
	return normaliseItemSpelling(normalisePunctuation(unlinked));
}

async function cleanValue(value: unknown): Promise<unknown> {
	if (typeof value === "string") return cleanText(value);
	if (Array.isArray(value)) return Promise.all(value.map(cleanValue));
	if (value && typeof value === "object") {
		const out: Record<string, unknown> = {};
		for (const [key, nested] of Object.entries(value)) out[key] = await cleanValue(nested);
		return out;
	}
	return value;
}

/** Write `name` before `desc` on each feature entry. */
function orderFeatureKeys(value: unknown): unknown {
	if (!Array.isArray(value)) return value;
	return value.map((item) => {
		if (!item || typeof item !== "object" || Array.isArray(item)) return item;
		const rec = item as Record<string, unknown>;
		if (!("name" in rec) || !("desc" in rec)) return rec;
		const ordered: Record<string, unknown> = { name: rec.name, desc: rec.desc };
		for (const [key, nested] of Object.entries(rec)) {
			if (key === "name" || key === "desc") continue;
			ordered[key] = nested;
		}
		return ordered;
	});
}

function isMonster(item: unknown): item is FivetoolsMonster {
	return (
		!!item &&
		typeof item === "object" &&
		"name" in item &&
		"source" in item &&
		typeof item.name === "string" &&
		typeof item.source === "string"
	);
}

/** Accept a top-level array or `{monster: [...]}`; each item needs string `name` and `source`. */
export function parseBestiary(text: string): FivetoolsMonster[] {
	let data: unknown;
	try {
		data = JSON.parse(text);
	} catch {
		throw new Error(BESTIARY_SHAPE);
	}
	const list = Array.isArray(data)
		? data
		: data && typeof data === "object" && "monster" in data && Array.isArray(data.monster)
			? data.monster
			: undefined;
	if (!list) throw new Error(BESTIARY_SHAPE);
	const monsters: FivetoolsMonster[] = [];
	for (const item of list) {
		if (!isMonster(item)) throw new Error(BESTIARY_SHAPE);
		monsters.push(item);
	}
	return monsters;
}

/** Names that appear more than once, compared case-insensitively. */
export function duplicateNames(monsters: readonly { name: string }[]): Set<string> {
	const counts = new Map<string, number>();
	for (const monster of monsters) {
		const key = monster.name.toLowerCase();
		counts.set(key, (counts.get(key) ?? 0) + 1);
	}
	return new Set([...counts].filter(([, n]) => n > 1).map(([key]) => key));
}

/** Duplicate names take a `(SOURCE)` suffix; unique names stay as written. */
export function creatureTitle(monster: { name: string; source: string }, duplicates: Set<string>): string {
	return duplicates.has(monster.name.toLowerCase()) ? `${monster.name} (${monster.source})` : monster.name;
}

export function sortKeys(raw: FivetoolsMonster, books: Map<string, string>): CreatureSortKeys {
	const cr = raw.cr && typeof raw.cr === "object" && !Array.isArray(raw.cr) && "cr" in raw.cr ? raw.cr.cr : raw.cr;
	const parsed = parseCr(cr);
	const type = typeName(raw.type);
	const environment = Array.isArray(raw.environment)
		? raw.environment
		: raw.environment == null
			? []
			: [raw.environment];
	const ids = [raw.source, ...(Array.isArray(raw.otherSources) ? raw.otherSources.map((entry) => entry?.source) : [])];
	const sourcebooks: string[] = [];
	const seen = new Set<string>();
	for (const id of ids) {
		if (typeof id !== "string" || seen.has(id)) continue;
		seen.add(id);
		sourcebooks.push(books.get(id) ?? id);
	}
	return {
		cr: parsed === undefined ? "" : parsed,
		creature_type: type ? type[0]!.toUpperCase() + type.slice(1) : "",
		size: sizeName(raw.size),
		habitat: environment.filter((entry): entry is string => typeof entry === "string").map(habitatName),
		sourcebooks,
	};
}

/** Map a ttrpg-convert YAML object onto the Fantasy Statblocks key order. */
export async function toStatblock(rendered: Record<string, unknown>): Promise<Record<string, unknown>> {
	const out: Record<string, unknown> = {};
	for (const key of STATBLOCK_KEYS) {
		let value: unknown;
		if (key === "layout") value = "Basic 5e Layout";
		else if (key === "saves") value = mapSaves(rendered.saves);
		else if (key === "skillsaves") value = mapSkillsaves(rendered.skillsaves);
		else if (key === "alignment") {
			value = rendered.alignment;
			if (typeof value === "string") value = value.replace(/ {2,}/g, " ");
		} else value = rendered[key];
		value = await cleanValue(value);
		if (FEATURE_LISTS.has(key)) value = orderFeatureKeys(value);
		if (isEmpty(value)) continue;
		out[key] = value;
	}
	return out;
}
