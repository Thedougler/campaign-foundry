/**
 * The always-loaded instruction chain omp pays for on every turn (ADR 0030): the `@path`
 * import closure of `.omp/AGENTS.md` and its word count. Consumed by `scripts/lint/agents.ts`,
 * which reports the count as a note (never a finding) and flags imports that do not resolve.
 * The word ceiling the old test enforced is gone by DM decision, 2026-10-10: the number is
 * reported so drift is visible, not gated.
 */

import { readFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { REPO_ROOT } from "./core.ts";

/** Where omp starts loading: the agent instructions prepended to every session. */
export const CHAIN_START = ".omp/AGENTS.md";

/** Every file the chain loads, first visit first, following `@path` import lines relative to the importing file. */
export function chainFiles(): string[] {
	const seen = new Set<string>();
	const files: string[] = [];
	const queue = [CHAIN_START];
	while (queue.length > 0) {
		const file = queue.shift();
		if (file === undefined || seen.has(file)) continue;
		seen.add(file);
		files.push(file);
		for (const match of readFileSync(join(REPO_ROOT, file), "utf8").matchAll(/^@(.+)$/gm)) {
			const target = normalize(join(dirname(file), match[1]!.trim()));
			// A broken import must not silently shrink the reported chain.
			// Callers map this read failure to budget/chain-import.
			readFileSync(join(REPO_ROOT, target), "utf8");
			queue.push(target);
		}
	}
	return files;
}

/** Whitespace-separated word count of the given repo-relative files, the ADR 0030 metric (report-only). */
export function countWords(files: string[]): number {
	return files.reduce(
		(total, file) => total + readFileSync(join(REPO_ROOT, file), "utf8").split(/\s+/).filter(Boolean).length,
		0,
	);
}
