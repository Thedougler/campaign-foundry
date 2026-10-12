import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { UsageError } from "../check/errors.ts";

/** One council seat as `run.json` records it: the model and thinking level the family wrote and graded on. */
export interface SeatRecord {
	model: string;
	thinking: string;
}

/** A family skipped for usage: it stays pending in the entry with its reason and reset time. */
export interface PendingRecord {
	family: string;
	reason: string;
	resetsAt: string | null;
}

/** A family whose Runner failed: out of the entry, with the error as its reason. */
export interface DroppedRecord {
	family: string;
	reason: string;
}

/** `run.json`: the entry `bench alias` writes and `bench reveal` completes (ADR 0038). */
export interface RunLog {
	prompt: string;
	prompt_sha256: string;
	rubric_sha256: string;
	date: string;
	seats: Record<string, SeatRecord>;
	pending: PendingRecord[];
	dropped: DroppedRecord[];
	/** The run dir this entry amends; the amended entry itself stays unchanged. */
	amends?: string;
	/** Family → the run dir its carried sample was copied from, byte for byte. */
	carried?: Record<string, string>;
}

/** One entry of the committed log: a run dir with its `run.json`. */
export interface RunEntry {
	/** Run dir name: `<date>-<id>-v<N>`, with a `-2`, `-3` … suffix when more than one lands on a date. */
	name: string;
	dir: string;
	run: RunLog;
	/** Whether `bench reveal` has completed this entry (`council.json` present). */
	revealed: boolean;
}

/** The alias → family mapping `bench alias` keeps in `$TMPDIR` until `bench reveal` moves it into the log. */
export interface MappingEntry {
	family: string;
	model: string;
	thinking: string;
	/** The run dir a carried sample was copied from. */
	source_run?: string;
}

export type Mapping = Record<string, MappingEntry>;

/** Reads and validates one run's `run.json`; a broken log entry is a usage error naming its dir. */
export function loadRun(dir: string, name = ""): RunLog {
	const path = join(dir, "run.json");
	let parsed: Record<string, unknown>;
	try {
		parsed = JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
	} catch (error) {
		throw new UsageError(
			`Cannot read the run log at \`${path}\`: ${(error as Error).message}`,
			`Every entry of \`evals/bench/runs/\` holds a run.json that \`bench alias\` wrote; restore it from git history${name === "" ? "" : ` or drop the ${name} entry`}.`,
		);
	}
	const shown = name === "" ? dir : name;
	for (const key of ["prompt", "prompt_sha256", "rubric_sha256", "date"] as const)
		if (typeof parsed[key] !== "string")
			throw new UsageError(
				`\`${shown}\` has no ${key} in its run.json.`,
				"The entry comes from `bench alias`; restore it from git history or drop the entry.",
			);
	const seats: Record<string, SeatRecord> = {};
	if (parsed.seats === null || typeof parsed.seats !== "object" || Array.isArray(parsed.seats))
		throw new UsageError(
			`\`${shown}\` has no seats map in its run.json.`,
			"Each council family needs { model, thinking }; restore the entry from git history or drop it.",
		);
	for (const [family, seat] of Object.entries(parsed.seats as Record<string, Record<string, unknown>>)) {
		if (
			seat === null ||
			typeof seat !== "object" ||
			typeof seat.model !== "string" ||
			typeof seat.thinking !== "string"
		)
			throw new UsageError(
				`\`${shown}\` seats \`${family}\` without a model and thinking level.`,
				"Each council family needs { model, thinking }; restore the entry from git history or drop it.",
			);
		seats[family] = { model: seat.model, thinking: seat.thinking };
	}
	return {
		prompt: parsed.prompt as string,
		prompt_sha256: parsed.prompt_sha256 as string,
		rubric_sha256: parsed.rubric_sha256 as string,
		date: parsed.date as string,
		seats,
		pending: pendingOf(parsed.pending, shown),
		dropped: droppedOf(parsed.dropped, shown),
		...(typeof parsed.amends === "string" ? { amends: parsed.amends } : {}),
		...(parsed.carried !== null && typeof parsed.carried === "object" && !Array.isArray(parsed.carried)
			? { carried: parsed.carried as Record<string, string> }
			: {}),
	};
}

function pendingOf(value: unknown, shown: string): PendingRecord[] {
	if (!Array.isArray(value))
		throw new UsageError(
			`\`${shown}\` has no pending list in its run.json.`,
			"Restore the entry from git history or drop it.",
		);
	return value.map((raw) => {
		const entry = (raw ?? {}) as Record<string, unknown>;
		if (typeof entry.family !== "string" || typeof entry.reason !== "string")
			throw new UsageError(
				`\`${shown}\` holds a pending family without a family or reason.`,
				"Restore the entry from git history or drop it.",
			);
		return {
			family: entry.family,
			reason: entry.reason,
			resetsAt: typeof entry.resetsAt === "string" ? entry.resetsAt : null,
		};
	});
}

function droppedOf(value: unknown, shown: string): DroppedRecord[] {
	if (!Array.isArray(value))
		throw new UsageError(
			`\`${shown}\` has no dropped list in its run.json.`,
			"Restore the entry from git history or drop it.",
		);
	return value.map((raw) => {
		const entry = (raw ?? {}) as Record<string, unknown>;
		if (typeof entry.family !== "string" || typeof entry.reason !== "string")
			throw new UsageError(
				`\`${shown}\` holds a dropped family without a family or reason.`,
				"Restore the entry from git history or drop it.",
			);
		return { family: entry.family, reason: entry.reason };
	});
}

/** Every run dir under `runsDir` with a readable `run.json`, oldest first: dir names sort by date and collision suffix. */
export function listRunEntries(runsDir: string): RunEntry[] {
	let names: string[];
	try {
		names = readdirSync(runsDir);
	} catch {
		return [];
	}
	return names
		.filter((name) => existsSync(join(runsDir, name, "run.json")))
		.sort()
		.map((name) => {
			const dir = join(runsDir, name);
			return { name, dir, run: loadRun(dir, name), revealed: existsSync(join(dir, "council.json")) };
		});
}

/** The latest entry for each prompt version: the last in log order, amendments included. */
export function latestEntries(entries: RunEntry[]): Map<string, RunEntry> {
	const latest = new Map<string, RunEntry>();
	for (const entry of entries) latest.set(entry.run.prompt, entry);
	return latest;
}

/** The run dir name for a new entry: `<date>-<id>-v<N>`, suffixed -2, -3 … when the date already holds one. */
export function runDirName(date: string, id: string, version: number, taken: Iterable<string>): string {
	const base = `${date}-${id}-v${version}`;
	const names = new Set(taken);
	if (!names.has(base)) return base;
	for (let suffix = 2; ; suffix++) {
		const name = `${base}-${suffix}`;
		if (!names.has(name)) return name;
	}
}
