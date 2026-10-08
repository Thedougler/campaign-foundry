import type { Statblock } from "../check/statblock/parse.ts";
import type { DdbMonsterRecord } from "./monster.ts";

/** The Wiki's monster as the adapter speaks it: the Creature page's statblock fields, not DDB's payload. */
export interface CanonicalMonster {
	name: string;
	size: string;
	/** Written armor class, e.g. `14 (natural armor)`. */
	ac: string;
	hp: number | undefined;
	/** Written hit dice, e.g. `6d8 + 12`. */
	hitDice: string;
	/** Str Dex Con Int Wis Cha. */
	stats: number[] | undefined;
}

/** DDB size ids, probed live on monster-service 2026-10-07: Owl/Cat=2 Tiny, Blood Hawk=3 Small, Wolf=4 Medium, Brown Bear=5 Large, Mammoth=6 Huge, Ancient Red Dragon=7 Gargantuan. */
const SIZE_IDS: Record<string, number> = { tiny: 2, small: 3, medium: 4, large: 5, huge: 6, gargantuan: 7 };

/** statId order in `stats` matches the wiki statblock's Str Dex Con Int Wis Cha order. */
const STAT_IDS = [1, 2, 3, 4, 5, 6];


/** The canonical monster for a parsed Creature page statblock; `ac` comes from the raw keys. */
export function canonicalFromStatblock(statblock: Statblock): CanonicalMonster {
	return {
		name: statblock.name,
		size: statblock.size,
		ac: String(statblock.raw.ac ?? ""),
		hp: statblock.hp,
		hitDice: statblock.hitDice.replace(/\s+/g, ""),
		stats: statblock.stats,
	};
}

export interface VerifyField {
	field: string;
	match: boolean;
	expected: string;
	actual: string;
}

export interface VerifyReport {
	ok: boolean;
	/** Set when verification could not even compare fields (no read-back, wrong content type). */
	message?: string;
	fields: VerifyField[];
}

function normalize(value: string): string {
	return value.replace(/\s+/g, " ").trim().toLowerCase();
}

/** Leading number of a written armor class: `14 (natural armor)` verifies against armorClass 14. */
export function acNumber(ac: string): string | undefined {
	return /^\s*(\d+)/.exec(ac)?.[1];
}

/**
 * Hit dice compare with whitespace stripped and a trailing zero modifier dropped on both sides:
 * the wiki writes `6d8 + 12` and `2d6 + 0`, while DDB records `6d8+12` and plain `2d6`.
 */
function diceMatch(expected: string, actual: string | undefined): boolean {
	if (actual === undefined) return false;
	const normalizedExpected = expected.replace(/\s+/g, "").replace(/[+-]0+$/, "");
	const normalizedActual = actual.replace(/\s+/g, "").replace(/[+-]0+$/, "");
	return normalizedExpected === normalizedActual;
}

/** Compares one field: ok when both sides normalize equal, mismatch with both values otherwise. */
function compare(field: string, expected: string | undefined, actual: string | undefined): VerifyField {
	const match = expected !== undefined && actual !== undefined && normalize(expected) === normalize(actual);
	return { field, match, expected: expected ?? "(missing)", actual: actual ?? "(missing)" };
}

/**
 * Verifies a read-back against the canonical monster, field by field. Never retries: a mismatch is
 * reported, not repaired (a wrong write must be visible, not papered over).
 */
export function verifyMonster(canonical: CanonicalMonster, record: DdbMonsterRecord | undefined, wantedId?: number): VerifyReport {
	if (!record) {
		return {
			ok: false,
			message: wantedId === undefined ? "no monster was read back" : `no monster was read back for id ${wantedId}`,
			fields: [],
		};
	}
	if (!record.isHomebrew) {
		return { ok: false, message: `monster ${record.id} is not homebrew; refusing to treat official content as the write's result`, fields: [] };
	}
	const actualStats = new Map((record.stats ?? []).map((s) => [s.statId, s.value]));
	const expectedStats = canonical.stats ?? [];
	const statValues = STAT_IDS.map((id) => (expectedStats[id - 1] === undefined ? undefined : String(actualStats.get(id) ?? "")));
	const acActual = record.armorClass === undefined ? undefined : String(record.armorClass);
	const hpActual = record.averageHitPoints === undefined ? undefined : String(record.averageHitPoints);
	const fields: VerifyField[] = [
		compare("name", canonical.name, record.name),
		compare("size", SIZE_IDS[normalize(canonical.size)] === undefined ? undefined : canonical.size, Object.entries(SIZE_IDS).find(([, id]) => id === record.sizeId)?.[0]),
		{
			field: "ac",
			match: acNumber(canonical.ac) !== undefined && acNumber(canonical.ac) === acActual,
			expected: canonical.ac,
			actual: acActual ?? "(missing)",
		},
		compare("hp", canonical.hp === undefined ? undefined : String(canonical.hp), hpActual),
		{
			field: "hitDice",
			match: canonical.hitDice !== "" && diceMatch(canonical.hitDice, record.hitPointDice?.diceString),
			expected: canonical.hitDice || "(missing)",
			actual: record.hitPointDice?.diceString ?? "(missing)",
		},
		{
			field: "stats",
			match: expectedStats.length === 6 && statValues.every((v, i) => v !== undefined && Number(v) === expectedStats[i]),
			expected: expectedStats.length === 6 ? expectedStats.join("/") : "(missing)",
			actual: STAT_IDS.map((id) => actualStats.get(id) ?? "?").join("/"),
		},
	];
	return { ok: fields.every((f) => f.match), fields };
}
