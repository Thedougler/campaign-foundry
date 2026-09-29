import { parse } from "yaml";
import { ABILITIES, type Ability } from "./tables.ts";

/** One arithmetic problem in a stat block, independent of where the block lives. */
export interface Issue {
	rule: string;
	message: string;
	hint: string;
	/** Top-level YAML key the issue is about, used to find its line. */
	key?: string;
	/** For a trait or action: its section and name, used to find its line. */
	feature?: { section: string; name: string };
}

export const FEATURE_SECTIONS = ["traits", "actions", "bonus_actions", "reactions", "legendary_actions"] as const;
export type FeatureSection = (typeof FEATURE_SECTIONS)[number];

export interface Feature {
	section: FeatureSection;
	name: string;
	desc: string;
}

/** A `saves` or `skillsaves` entry: `- dex: 4`. */
export interface BonusEntry {
	key: string;
	value: number;
}

export interface Statblock {
	name: string;
	size: string;
	/** Challenge rating as a number (`1/4` is 0.25); undefined when missing or unreadable. */
	cr: number | undefined;
	/** The written `cr`, for messages. */
	crText: string;
	/** Str Dex Con Int Wis Cha; undefined when not six numbers. */
	stats: number[] | undefined;
	hp: number | undefined;
	hitDice: string;
	saves: BonusEntry[];
	skills: BonusEntry[];
	senses: string;
	/** The optional `proficiency_bonus` key. */
	proficiencyBonus: number | undefined;
	features: Feature[];
	/** Every top-level key of the block as written, for consumers (Push) that read more than the arithmetic fields. */
	raw: Record<string, unknown>;
	/** 1-based line within the block for a key or feature; 1 when it cannot be found. */
	lines: { key(key: string): number; feature(section: string, name: string): number };
}

export interface Parsed {
	statblock?: Statblock;
	issues: Issue[];
}

const FANTASY_STATBLOCKS = "See the Statblock section of templates/Creature.md for the Fantasy Statblocks `Basic 5e Layout` fields.";

function text(value: unknown): string {
	return typeof value === "string" ? value : typeof value === "number" ? String(value) : "";
}

function number(value: unknown): number | undefined {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (typeof value === "string" && /^\s*[+\-−]?\d+\s*$/.test(value)) return Number(value.replace("−", "-"));
	return undefined;
}

/** `1/4`, `0.25`, `"1/8"`, `17` as a number; undefined when it is not a rating from 0 to 30. */
export function parseCr(value: unknown): number | undefined {
	let cr: number | undefined;
	if (typeof value === "number") cr = value;
	else if (typeof value === "string") {
		const fraction = /^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(value);
		if (fraction) cr = Number(fraction[1]) / Number(fraction[2]);
		else if (/^\s*\d+(\.\d+)?\s*$/.test(value)) cr = Number(value);
	}
	return cr !== undefined && Number.isFinite(cr) && cr >= 0 && cr <= 30 ? cr : undefined;
}

/** `- dex: 4` entries; a non-list yields nothing. */
function entries(value: unknown, key: string, issues: Issue[]): BonusEntry[] {
	if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) return [];
	const out: BonusEntry[] = [];
	if (!Array.isArray(value)) {
		issues.push({ rule: "statblock-shape", key, message: `\`${key}\` must be a list of one-key maps.`, hint: `Write each entry as \`- dex: 4\` under \`${key}:\`, or \`${key}: []\` for none.` });
		return out;
	}
	for (const item of value) {
		const pairs = item && typeof item === "object" && !Array.isArray(item) ? Object.entries(item as Record<string, unknown>) : [];
		for (const [k, v] of pairs) {
			const n = number(v);
			if (n === undefined) issues.push({ rule: "statblock-shape", key, message: `\`${key}\` entry \`${k}\` is not a number: ${JSON.stringify(v)}.`, hint: `Write the total bonus as a number, e.g. \`- ${k}: 4\`.` });
			else out.push({ key: k.trim().toLowerCase().replace(/[_-]+/g, " "), value: n });
		}
		if (pairs.length === 0) issues.push({ rule: "statblock-shape", key, message: `A \`${key}\` entry is not a one-key map: ${JSON.stringify(item)}.`, hint: `Write each entry as \`- dex: 4\` under \`${key}:\`.` });
	}
	return out;
}

function features(data: Record<string, unknown>, issues: Issue[]): Feature[] {
	const out: Feature[] = [];
	for (const section of FEATURE_SECTIONS) {
		const list = data[section];
		if (list === undefined || list === null) continue;
		if (!Array.isArray(list)) {
			issues.push({ rule: "statblock-shape", key: section, message: `\`${section}\` must be a list.`, hint: `Write each entry as \`- name: Scimitar\` then \`desc: ...\`, or \`${section}: []\` for none.` });
			continue;
		}
		for (const item of list) {
			if (!item || typeof item !== "object" || Array.isArray(item)) {
				issues.push({ rule: "statblock-shape", key: section, message: `A \`${section}\` entry is not a map with \`name\` and \`desc\`.`, hint: `Write each entry as \`- name: Scimitar\` then \`desc: ...\`.` });
				continue;
			}
			const f = item as Record<string, unknown>;
			out.push({ section, name: text(f.name), desc: text(f.desc) });
		}
	}
	return out;
}

/** Parses the YAML inside a ```statblock fence. */
export function parseStatblock(source: string): Parsed {
	const issues: Issue[] = [];
	let data: unknown;
	try {
		data = parse(source);
	} catch (error) {
		const reason = error instanceof Error ? error.message.split("\n")[0] : String(error);
		return { issues: [{ rule: "statblock-yaml", message: `Statblock YAML does not parse: ${reason}`, hint: `Fix the YAML inside the \`statblock\` fence; quote strings that contain \`:\` or \`*\`, e.g. \`desc: "*Melee Attack Roll:* +4"\`. ${FANTASY_STATBLOCKS}` }] };
	}
	if (!data || typeof data !== "object" || Array.isArray(data)) {
		return { issues: [{ rule: "statblock-yaml", message: "Statblock YAML is not a map of `key: value` lines.", hint: `Start with \`layout: Basic 5e Layout\` and give one \`key: value\` per line. ${FANTASY_STATBLOCKS}` }] };
	}
	const map = data as Record<string, unknown>;

	let stats: number[] | undefined;
	if (Array.isArray(map.stats) && map.stats.length === 6 && map.stats.every((s) => number(s) !== undefined)) stats = map.stats.map((s) => number(s) as number);
	else issues.push({ rule: "stats-invalid", key: "stats", message: "`stats` must be six ability scores.", hint: `Write \`stats: [10, 10, 10, 10, 10, 10]\` in the order ${ABILITIES.join(", ")} (Str Dex Con Int Wis Cha); every derived number is checked against them.` });

	const cr = parseCr(map.cr);
	if (cr === undefined) issues.push({ rule: "cr-invalid", key: "cr", message: `\`cr\` is ${map.cr === undefined ? "missing" : `\`${text(map.cr)}\``}, not a challenge rating from 0 to 30.`, hint: 'Write the rating as a number or fraction, e.g. `cr: 1/4`, `cr: "1/8"` or `cr: 5`; the proficiency bonus is derived from it.' });

	const lines = source.split("\n");
	const find = (test: (line: string) => boolean, from = 0): number => {
		const i = lines.findIndex((l, n) => n >= from && test(l));
		return i === -1 ? -1 : i;
	};
	const statblock: Statblock = {
		name: text(map.name),
		size: text(map.size),
		cr,
		crText: text(map.cr),
		stats,
		hp: number(map.hp),
		hitDice: text(map.hit_dice),
		saves: entries(map.saves, "saves", issues),
		skills: entries(map.skillsaves, "skillsaves", issues),
		senses: text(map.senses),
		proficiencyBonus: number(map.proficiency_bonus),
		features: features(map, issues),
		raw: map,
		lines: {
			key: (key) => find((l) => new RegExp(`^${key}\\s*:`).test(l)) + 1 || 1,
			feature: (section, name) => {
				const start = find((l) => new RegExp(`^${section}\\s*:`).test(l));
				if (start === -1) return 1;
				const at = find((l) => l.includes(name) && /^\s*-?\s*name\s*:/.test(l), start);
				return (at === -1 ? start : at) + 1;
			},
		},
	};
	return { statblock, issues };
}
