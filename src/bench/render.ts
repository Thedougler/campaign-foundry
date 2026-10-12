import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { rubricNames, type CouncilResult } from "./council.ts";
import { listPromptVersions } from "./prompts.ts";
import { listRunEntries, type Mapping, type RunEntry } from "./runs.ts";

/** One entry's revealed pieces, read beside its `run.json`. */
interface Revealed {
	council: CouncilResult;
	mapping: Mapping;
}

/**
 * Renders `evals/bench/leaderboard.md` from the committed log: deterministic, so the view never
 * drifts from the data. Each prompt version shows its latest entry — revealed or awaiting reveal —
 * and keeps the older ones as history (ADR 0038).
 */
export function renderLeaderboard(runsDir: string, promptsDir: string, promptsRel: string, rubricPath: string): string {
	const entries = listRunEntries(runsDir);
	const prompts = listPromptVersions(promptsDir, promptsRel);
	const rubric = existsSync(rubricPath) ? readFileSync(rubricPath, "utf8") : "";
	const labels = rubricNames(rubric);
	const header = [
		"# Prose Benchmark leaderboard",
		"",
		"Each prompt version's latest council entry, with older entries as history, rendered from the",
		"committed log in `evals/bench/runs/`. `bun run cfcli -- bench render` rebuilds it (ADR 0038).",
		"",
	].join("\n");
	if (entries.length === 0)
		return `${header}\nNo runs yet. \`bun run cfcli -- bench status\` selects the families for the first one.\n`;
	const sections: string[] = [];
	const byPrompt = new Map<string, RunEntry[]>();
	for (const entry of entries) {
		const list = byPrompt.get(entry.run.prompt) ?? [];
		list.push(entry);
		byPrompt.set(entry.run.prompt, list);
	}
	for (const prompt of prompts) if (!byPrompt.has(prompt.name)) byPrompt.set(prompt.name, []);
	for (const [prompt, promptEntries] of byPrompt) {
		sections.push(`## ${prompt}\n`);
		if (promptEntries.length === 0) {
			sections.push("No runs yet.\n");
			continue;
		}
		const latest = promptEntries.at(-1)!;
		const older = promptEntries.slice(0, -1);
		const revealed = revealedOf(latest);
		if (revealed === undefined) sections.push(awaitingReveal(latest));
		else sections.push(latestSection(latest, revealed, labels));
		if (older.length > 0) {
			sections.push(
				"### History\n",
				...older.map((entry) => {
					const past = revealedOf(entry);
					return past === undefined ? `- ${entry.name} — never revealed` : historyLine(entry, past);
				}),
				"",
			);
		}
	}
	return `${header}\n${sections.join("\n")}`;
}

function revealedOf(entry: RunEntry): Revealed | undefined {
	if (!entry.revealed) return undefined;
	const councilPath = join(entry.dir, "council.json");
	const mappingPath = join(entry.dir, "mapping.json");
	if (!existsSync(mappingPath)) return undefined;
	try {
		return {
			council: JSON.parse(readFileSync(councilPath, "utf8")) as CouncilResult,
			mapping: JSON.parse(readFileSync(mappingPath, "utf8")) as Mapping,
		};
	} catch {
		return undefined;
	}
}

function awaitingReveal(entry: RunEntry): string {
	const pending = entry.run.pending
		.map((pendingFamily) => `${pendingFamily.family} (${pendingFamily.reason})`)
		.join(", ");
	return [
		`### ${entry.name} — awaiting reveal\n`,
		`Council seats: ${Object.keys(entry.run.seats).join(", ") || "(none)"}.`,
		pending === "" ? undefined : `Pending: ${pending}.`,
		`Reveal with \`bun run cfcli -- bench reveal --run ${entry.name}\`.`,
		"",
	]
		.filter((line): line is string => line !== undefined)
		.join("\n");
}

function latestSection(entry: RunEntry, revealed: Revealed, labels: string[]): string {
	const { council } = revealed;
	const lines: string[] = [];
	lines.push(
		`### ${entry.name}${entry.run.amends === undefined ? "" : ` — amends ${entry.run.amends}`}\n`,
		`Council: ${council.council.join(", ") || "(none)"}. Empty seats: ${council.empty_seats.join(", ") || "none"}.\n`,
	);
	lines.push(
		`| rank | alias | family | seat | ${labels.join(" | ")} | mean | mean rank |`,
		`| ---- | ----- | ------ | ----${labels.map(() => " | ---").join("")} | ---- | --------- |`,
	);
	council.order.forEach((alias, index) => {
		const sample = council.samples[alias]!;
		const seat = entry.run.seats[sample.family ?? ""];
		lines.push(
			`| ${index + 1} | ${alias} | ${sample.family ?? "?"} | ${seat === undefined ? "?" : `${seat.model} · ${seat.thinking}`} | ${sample.scores.map((score) => score.toFixed(2)).join(" | ")} | ${sample.overall.toFixed(2)} | ${sample.mean_rank.toFixed(2)} |`,
		);
	});
	const pending = entry.run.pending
		.map(
			(pendingFamily) =>
				`- **${pendingFamily.family}** — ${pendingFamily.reason}${pendingFamily.resetsAt === null ? "" : ` (resets ${pendingFamily.resetsAt})`}`,
		)
		.join("\n");
	if (pending !== "") lines.push("", "Pending:", "", pending);
	const dropped = entry.run.dropped
		.map((droppedFamily) => `- **${droppedFamily.family}** — ${droppedFamily.reason}`)
		.join("\n");
	if (dropped !== "") lines.push("", "Dropped:", "", dropped);
	return `${lines.join("\n")}\n`;
}

function historyLine(entry: RunEntry, revealed: Revealed): string {
	const order = revealed.council.order
		.map((alias, index) => {
			const sample = revealed.council.samples[alias]!;
			return `${index + 1}. ${sample.family ?? alias} ${sample.overall.toFixed(2)}`;
		})
		.join(" · ");
	const pending =
		entry.run.pending.length === 0
			? ""
			: `; pending: ${entry.run.pending.map((pendingFamily) => pendingFamily.family).join(", ")}`;
	const dropped =
		entry.run.dropped.length === 0
			? ""
			: `; dropped: ${entry.run.dropped.map((droppedFamily) => droppedFamily.family).join(", ")}`;
	return `- **${entry.name}**${entry.run.amends === undefined ? "" : ` (amends ${entry.run.amends})`} — ${order}${pending}${dropped}`;
}
