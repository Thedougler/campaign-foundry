import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import YAML from "yaml";
import { UsageError } from "../check/errors.ts";

/** The line every prompt in the set opens with: a runner brief must stand alone. */
export const PERSONA_LINE = "You are writing for a home D&D 5e campaign wiki.";

export interface BenchEntry {
	id: string;
	/** Fixture page the `context` was pasted from; provenance only. */
	fixture_page?: string;
	context: string;
	prompt: string;
	rubrics: string[];
}

export interface PromptSet {
	/** First 12 hex of the prompt set file's sha256: the cache key for the whole set. */
	version: string;
	entries: BenchEntry[];
}

/** First 12 hex of the sha256 of `input`. */
export function sha12(input: string | Uint8Array): string {
	return createHash("sha256").update(input).digest("hex").slice(0, 12);
}

export function loadPromptSet(path: string): PromptSet {
	let bytes: Buffer;
	try {
		bytes = readFileSync(path);
	} catch {
		throw new UsageError(`No prompt set at \`${path}\`.`, "Prose Benchmark prompts live in `evals/prose-bench.yaml`; run from the repository root.");
	}
	let parsed: unknown;
	try {
		parsed = YAML.parse(bytes.toString("utf8"));
	} catch (error) {
		throw new UsageError(`\`${path}\` is not valid YAML: ${(error as Error).message}`, "Fix the YAML; bench_version moves with any edit, so the cache clears itself.");
	}
	const entries = Array.isArray(parsed) ? (parsed as unknown[]) : [];
	if (entries.length === 0) throw new UsageError(`\`${path}\` holds no entries.`, "Add at least one { id, context, prompt, rubrics } entry.");
	const seen = new Set<string>();
	for (const raw of entries) {
		const entry = raw as Partial<BenchEntry>;
		const id = typeof entry.id === "string" ? entry.id : "<unset id>";
		if (typeof entry.id !== "string" || entry.id === "") {
			throw new UsageError(`Entry \`${id}\` in \`${path}\` has no id.`, "Every entry needs a unique id; it names the sample files and the leaderboard rows.");
		}
		if (seen.has(entry.id)) {
			throw new UsageError(`Duplicate entry id \`${entry.id}\` in \`${path}\`.`, "Entry ids must be unique; they key the benchmark cache.");
		}
		seen.add(entry.id);
		for (const field of ["context", "prompt"] as const) {
			if (typeof entry[field] !== "string" || entry[field]!.trim() === "") {
				throw new UsageError(`Entry \`${entry.id}\` has an empty \`${field}\`.`, "Each entry is self-contained: paste the fixture facts into `context`, the whole task into `prompt`.");
			}
		}
		if (!Array.isArray(entry.rubrics) || entry.rubrics.length === 0 || entry.rubrics.some((r) => typeof r !== "string" || r.trim() === "")) {
			throw new UsageError(`Entry \`${entry.id}\` has no rubrics.`, "List the rubrics the Judge scores; they must be identical across entries so scores compare.");
		}
		if (!entry.prompt!.trimStart().startsWith(PERSONA_LINE)) {
			throw new UsageError(`Entry \`${entry.id}\`'s prompt does not open with the persona line.`, `Every prompt opens with "${PERSONA_LINE}" so the rendered brief needs no glue.`);
		}
	}
	return { version: sha12(bytes), entries: entries as BenchEntry[] };
}

export function findEntry(set: PromptSet, id: string): BenchEntry {
	const entry = set.entries.find((e) => e.id === id);
	if (!entry) throw new UsageError(`No entry \`${id}\` in the prompt set.`, `Known entries: ${set.entries.map((e) => e.id).join(", ")}.`);
	return entry;
}

/** The byte-exact runner brief: the entry's facts, then its whole prompt. Deterministic: same YAML in, same bytes out. */
export function renderBrief(entry: BenchEntry): string {
	return `${entry.context.trim()}\n\n${entry.prompt.trim()}\n`;
}

/** The brief's sha256 prefix: the byte identity a cached row must match to be a HIT. */
export function promptSha(entry: BenchEntry): string {
	return sha12(renderBrief(entry));
}

/** Where a bench_version's artifacts live, relative to the repository root. */
export function benchDir(version: string): string {
	return `evals/benchmark-samples/${version}`;
}
