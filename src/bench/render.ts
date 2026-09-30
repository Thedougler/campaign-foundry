import type { BenchFile, BenchRow } from "./cache.ts";
import type { Matrix } from "./matrix.ts";
import type { PromptSet } from "./prompts.ts";

/** Renders `evals/benchmark.md` from the cache: deterministic, so the view never drifts from the data. */
export function renderLeaderboard(cache: BenchFile, set: PromptSet, matrix: Matrix): string {
	const version = latestVersion(cache) ?? set.version;
	const header = [
		"# Cross-family prose leaderboard",
		"",
		"Ranked Narration quality across model families, rendered from",
		"`evals/benchmark.json` (the cache; a row is a HIT only when " + cache.hit_rule + ").",
		`Prompt set: \`evals/prose-bench.yaml\` (bench_version ${version}). Matrix pins:`,
		"`evals/models.yaml`. Claude runs its own native skill-evals and is not ranked",
		"here. Rows marked (cached) were not re-executed this run.",
		"",
	].join("\n");
	if (cache.results.length === 0) {
		return `${header}## Prose Benchmark — not yet run for bench_version ${version}\n\nNo scored samples. Plan the first Round with \`cf bench status\`.\n`;
	}
	const rows = cache.results.filter((row) => row.bench_version === version);
	const runAt = maxRunAt(rows);
	const perFamily = matrix.families
		.map((family) => ({ family, rows: rows.filter((row) => row.family === family.name) }))
		.filter(({ rows }) => rows.length > 0)
		.map((entry) => {
			const hits = entry.rows.filter((row) => row.status === "scored");
			const mean = hits.length === 0 ? 0 : hits.reduce((sum, row) => sum + (row.prose_score ?? 0), 0) / hits.length;
			return { ...entry, hits, mean };
		});
	const order = [...perFamily].sort((a, b) => b.mean - a.mean || matrix.families.indexOf(a.family) - matrix.families.indexOf(b.family));
	const table = [
		"| family | model | samples | mean prose | per-type scores | rank |",
		"| ------ | ----- | ------- | ---------- | --------------- | ---- |",
	];
	for (let i = 0; i < order.length; i++) {
		const { family, rows, hits, mean } = order[i]!;
		const cached = maxRunAt(rows) < runAt ? " (cached)" : "";
		const perType = set.entries
			.map((bench) => hits.find((row) => row.id === bench.id))
			.filter((row): row is BenchRow => row !== undefined)
			.map((row) => `${row.id} ${(row.prose_score ?? 0).toFixed(1)}`)
			.join(", ");
		table.push(`| ${family.name} | ${rows.at(-1)?.model ?? ""} | ${hits.length} / ${set.entries.length}${cached} | ${mean.toFixed(1)} | ${perType} | ${i + 1} |`);
	}
	const notes = order.flatMap(({ family, rows }) => {
		const unfinished = rows.filter((row) => row.status !== "scored");
		if (unfinished.length === 0) return [];
		const ids = unfinished.map((row) => row.id).sort().join(", ");
		return [`> ${family.name} — ${unfinished[0]!.status}: ${ids} (${unfinished[0]!.reason ?? "no reason recorded"})`];
	});
	return `${header}## Prose Benchmark — ${runAt}\n\n${table.join("\n")}\n${notes.length > 0 ? `\n${notes.join("\n")}\n` : ""}`;
}

/** The bench_version of the most recently recorded row, so the leaderboard always shows the newest run. */
function latestVersion(cache: BenchFile): string | undefined {
	const maxAt = new Map<string, string>();
	for (const row of cache.results) maxAt.set(row.bench_version, maxRunAt(cache.results.filter((r) => r.bench_version === row.bench_version)));
	let best: { version: string; runAt: string } | undefined;
	for (const [version, runAt] of maxAt) {
		if (best === undefined || runAt > best.runAt) best = { version, runAt };
	}
	return best?.version;
}

function maxRunAt(rows: BenchRow[]): string {
	return rows.reduce((latest, row) => (row.run_at > latest ? row.run_at : latest), "");
}
