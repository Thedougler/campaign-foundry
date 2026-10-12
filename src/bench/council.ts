import { readFileSync } from "node:fs";
import type { Mapping, RunEntry } from "./runs.ts";

/** How many rubrics each grades file scores: `evals/bench/rubric.md` scores six. */
export const RUBRIC_COUNT = 6;

/** One grader's grades file: the `bench-grader-<family>` yield shape. */
export interface GradesFile {
	grades: { alias: string; scores: number[]; reasons: string[] }[];
	ranking: string[];
}

/** A data error `bench reveal` reports by naming the file, exiting 1: not a usage error. */
export class GradesError extends Error {}

/** Reads one grades file's shape: `{grades:[{alias,scores,reasons}],ranking}`. Deeper checks come from `validateGrades`. */
export function readGrades(path: string): GradesFile {
	let parsed: unknown;
	try {
		parsed = JSON.parse(readFileSync(path, "utf8"));
	} catch (error) {
		throw new GradesError(`${path}: cannot read grades (${(error as Error).message})`);
	}
	const record = parsed !== null && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
	if (!Array.isArray(record.grades) || !Array.isArray(record.ranking))
		throw new GradesError(`${path}: no { grades: [...], ranking: [...] }`);
	const grades = record.grades.map((raw) => {
		const entry = (raw ?? {}) as Record<string, unknown>;
		return {
			alias: typeof entry.alias === "string" ? entry.alias : "",
			scores: Array.isArray(entry.scores) ? entry.scores : [],
			reasons: Array.isArray(entry.reasons) ? entry.reasons : [],
		};
	});
	return { grades, ranking: record.ranking.filter((alias): alias is string => typeof alias === "string") };
}

/** Checks a grades file against its run: the run's exact alias set, an integer score 1–5 per rubric, a ranking that permutes the aliases. */
export function validateGrades(grades: GradesFile, aliases: string[], path: string): void {
	const graded = grades.grades.map((grade) => grade.alias);
	if (new Set(graded).size !== graded.length)
		throw new GradesError(`${path}: grades alias ${duplicates(graded)} more than once`);
	if (graded.length !== aliases.length || aliases.some((alias) => !graded.includes(alias)))
		throw new GradesError(
			`${path}: grades cover ${quoted(graded)} but the run holds ${quoted(aliases)}; re-dispatch the grader with its brief`,
		);
	for (const grade of grades.grades) {
		if (grade.scores.length !== RUBRIC_COUNT)
			throw new GradesError(
				`${path}: ${grade.alias} scores ${grade.scores.length} rubrics, not ${RUBRIC_COUNT}; re-dispatch the grader with its brief`,
			);
		for (const score of grade.scores)
			if (typeof score !== "number" || !Number.isInteger(score) || score < 1 || score > 5)
				throw new GradesError(
					`${path}: ${grade.alias} scores ${JSON.stringify(score)}; every rubric scores an integer 1–5`,
				);
		if (grade.reasons.length !== RUBRIC_COUNT)
			throw new GradesError(
				`${path}: ${grade.alias} gives ${grade.reasons.length} reasons, not ${RUBRIC_COUNT}; re-dispatch the grader with its brief`,
			);
	}
	if (
		grades.ranking.length !== aliases.length ||
		new Set(grades.ranking).size !== grades.ranking.length ||
		aliases.some((alias) => !grades.ranking.includes(alias))
	)
		throw new GradesError(`${path}: ranking ${quoted(grades.ranking)} is not a ranking of ${quoted(aliases)}`);
}

function duplicates(items: string[]): string {
	const twice = items.filter((item, index) => items.indexOf(item) !== index);
	return quoted([...new Set(twice)]);
}

function quoted(items: string[]): string {
	return `[${items.join(", ")}]`;
}

/** One sample's council result: the mean per rubric, the overall mean and the mean rank across the graders who sat. */
export interface CouncilSample {
	family: string | undefined;
	scores: number[];
	overall: number;
	mean_rank: number;
}

export interface CouncilResult {
	/** The graders whose grades file counted. */
	council: string[];
	/** Seat families that filed no grades file. */
	empty_seats: string[];
	/** Aliases best first: mean rank ascending, then overall mean descending. */
	order: string[];
	samples: Record<string, CouncilSample>;
}

/**
 * The council's averaged result (ADR 0038): each model's bias counts once among several, so every
 * grader's scores and ranks weigh alike whatever its family.
 */
export function councilOf(
	seats: string[],
	grades: Record<string, GradesFile>,
	aliases: string[],
	mapping: Mapping,
): CouncilResult {
	const council = seats.filter((family) => grades[family] !== undefined).sort();
	const emptySeats = seats.filter((family) => grades[family] === undefined).sort();
	const samples: Record<string, CouncilSample> = {};
	for (const alias of aliases) {
		const perGrader = council.map((family) => grades[family]!.grades.find((grade) => grade.alias === alias));
		const scores = Array.from({ length: RUBRIC_COUNT }, (_, rubric) =>
			round2(perGrader.reduce((sum, grade) => sum + (grade?.scores[rubric] ?? 0), 0) / council.length),
		);
		const ranks = council.map((family) => grades[family]!.ranking.indexOf(alias) + 1);
		samples[alias] = {
			family: mapping[alias]?.family,
			scores,
			overall: round2(scores.reduce((sum, score) => sum + score, 0) / scores.length),
			mean_rank: round2(ranks.reduce((sum, rank) => sum + rank, 0) / ranks.length),
		};
	}
	const order = [...aliases].sort(
		(a, b) =>
			samples[a]!.mean_rank - samples[b]!.mean_rank || samples[b]!.overall - samples[a]!.overall || a.localeCompare(b),
	);
	return { council, empty_seats: emptySeats, order, samples };
}

function round2(value: number): number {
	return Math.round(value * 100) / 100;
}

/** The rubric names in rubric order: the `- **Name.**` bullets of the committed rubric. */
export function rubricNames(rubric: string): string[] {
	return [...rubric.matchAll(/^- \*\*(.+?)\.\*\*/gm)].map((match) => match[1]!);
}

/** `report.md`: the DM's complete picture of one revealed entry. */
export function renderReport(
	entry: RunEntry,
	council: CouncilResult,
	mapping: Mapping,
	rubricLabels: string[],
): string {
	const lines: string[] = [];
	lines.push(`# Council report — ${entry.run.prompt}`, "");
	lines.push(
		`Run \`${entry.name}\`${entry.run.amends === undefined ? "" : `, amending \`${entry.run.amends}\``} (${entry.run.date}).`,
		`Council: ${council.council.join(", ") || "(none)"}. Empty seats: ${council.empty_seats.join(", ") || "none"}.`,
		"",
	);
	lines.push(
		"| rank | alias | family | seat | mean | mean rank |",
		"| ---- | ----- | ------ | ---- | ---- | --------- |",
	);
	council.order.forEach((alias, index) => {
		const sample = council.samples[alias]!;
		const seat = seatOf(entry, mapping, alias);
		lines.push(
			`| ${index + 1} | ${alias} | ${sample.family ?? "?"} | ${seat} | ${sample.overall.toFixed(2)} | ${sample.mean_rank.toFixed(2)} |`,
		);
	});
	lines.push("", "Per-rubric means:", "");
	lines.push(`| alias | ${rubricLabels.join(" | ")} |`, `| ------${rubricLabels.map(() => " | ---").join("")} |`);
	for (const alias of council.order) {
		const sample = council.samples[alias]!;
		lines.push(`| ${alias} | ${sample.scores.map((score) => score.toFixed(2)).join(" | ")} |`);
	}
	const pending = entry.run.pending.map(
		(pendingFamily) =>
			`- **${pendingFamily.family}** — ${pendingFamily.reason}${pendingFamily.resetsAt === null ? "" : ` (resets ${pendingFamily.resetsAt})`}`,
	);
	if (pending.length > 0) lines.push("", "Pending:", "", ...pending);
	const dropped = entry.run.dropped.map((droppedFamily) => `- **${droppedFamily.family}** — ${droppedFamily.reason}`);
	if (dropped.length > 0) lines.push("", "Dropped:", "", ...dropped);
	return `${lines.join("\n")}\n`;
}

/** The seat line for a sample: the seat its family held in this entry, or the source entry for a carried sample. */
function seatOf(entry: RunEntry, mapping: Mapping, alias: string): string {
	const mapped = mapping[alias];
	const seat = mapped === undefined ? undefined : entry.run.seats[mapped.family];
	if (seat === undefined) return "?";
	return `${seat.model} · thinking ${seat.thinking}${mapped?.source_run === undefined ? "" : ` (carried from ${mapped.source_run})`}`;
}
