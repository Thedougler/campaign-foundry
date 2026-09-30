import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { UsageError } from "../check/errors.ts";

export const HIT_RULE =
	"a scored row matches the current bench_version, entry id, family and top pin, and the rendered brief's prompt_sha";

export interface RubricScore {
	rubric: string;
	score: number;
	reason: string;
}

export interface Timing {
	total_tokens: number;
	duration_ms: number;
}

export interface BenchRow {
	bench_version: string;
	id: string;
	prompt_sha: string;
	family: string;
	model: string;
	status: "scored" | "dark" | "skipped";
	prose_score?: number;
	rubrics?: RubricScore[];
	sample_path?: string;
	timing?: Timing;
	reason?: string;
	run_at: string;
	judge?: string;
}

export interface BenchFile {
	schema: 1;
	hit_rule: string;
	results: BenchRow[];
}

/** The cache file, or an empty one when the benchmark has never run. */
export function loadCache(path: string): BenchFile {
	if (!existsSync(path)) return { schema: 1, hit_rule: HIT_RULE, results: [] };
	let parsed: unknown;
	try {
		parsed = JSON.parse(readFileSync(path, "utf8"));
	} catch (error) {
		throw new UsageError(`\`${path}\` is not valid JSON: ${(error as Error).message}`, "Fix or delete it — `benchmark.md` rebuilds on the next `cf bench record`; the hit rule is: " + HIT_RULE + ".");
	}
	const results = asRecord(parsed).results;
	if (!Array.isArray(results)) {
		throw new UsageError("`evals/benchmark.json` has no results array.", "Rebuild it with `cf bench record`, or empty it to `{ \"schema\": 1, \"results\": [] }`.");
	}
	return { schema: 1, hit_rule: HIT_RULE, results: results as BenchRow[] };
}

export function findHit(cache: BenchFile, key: { version: string; id: string; family: string; model: string; promptSha: string }): BenchRow | undefined {
	return cache.results.find(
		(row) =>
			row.status === "scored" &&
			row.bench_version === key.version &&
			row.id === key.id &&
			row.family === key.family &&
			row.model === key.model &&
			row.prompt_sha === key.promptSha,
	);
}

/** Latest state wins: a row replaces the cached row with the same version, entry, family and pin. */
export function upsertRow(cache: BenchFile, row: BenchRow): void {
	const index = cache.results.findIndex(
		(existing) => existing.bench_version === row.bench_version && existing.id === row.id && existing.family === row.family && existing.model === row.model,
	);
	if (index === -1) cache.results.push(row);
	else cache.results[index] = row;
}

export function saveCache(path: string, cache: BenchFile): void {
	writeFileSync(path, `${JSON.stringify(cache, null, 2)}\n`);
}

function asRecord(value: unknown): Record<string, unknown> {
	return value !== null && typeof value === "object" ? (value as Record<string, unknown>) : {};
}
