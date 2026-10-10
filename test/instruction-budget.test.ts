import { readFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { describe, expect, it } from "vitest";

/** ADR 0030. The `@path` import chain omp loads on every turn, paid out of the attention the Campaign's prose runs on. */
const START = ".omp/AGENTS.md";
const EXPECTED_FILES = [
	".omp/AGENTS.md",
	"AGENTS.md",
	"user-config.md",
	"CONTEXT.md",
	"wiki/shattered-sea/campaign-config.md",
];
/** The ratchet from ADR 0030: the chain's measured word count (10002 on landing, 2026-10-10). Lower it when the chain shrinks; raising it is a DM decision recorded in the ADR. */
const WORD_CEILING = 9987;

/** Every file the chain loads, first visit first, following `@path` import lines relative to the importing file. */
function chainFiles(): string[] {
	const seen = new Set<string>();
	const files: string[] = [];
	const queue = [START];
	while (queue.length > 0) {
		const file = queue.shift();
		if (file === undefined || seen.has(file)) continue;
		seen.add(file);
		files.push(file);
		for (const match of readFileSync(file, "utf8").matchAll(/^@(.+)$/gm)) {
			const target = normalize(join(dirname(file), match[1]!.trim()));
			// A broken import would shrink the counted chain; reading it here fails the test instead.
			readFileSync(target, "utf8");
			queue.push(target);
		}
	}
	return files;
}

describe("the always-loaded instruction budget (ADR 0030)", () => {
	it("loads exactly the five files of the chain", () => {
		const files = chainFiles();
		expect(files).toHaveLength(EXPECTED_FILES.length);
		expect(files).toEqual(expect.arrayContaining(EXPECTED_FILES));
	});

	it("keeps the chain at or under the ceiling", () => {
		const words = chainFiles().reduce(
			(total, file) => total + readFileSync(file, "utf8").split(/\s+/).filter(Boolean).length,
			0,
		);
		expect(words, `always-loaded chain holds ${words} words; ADR 0030 ceiling is ${WORD_CEILING}`).toBeLessThanOrEqual(WORD_CEILING);
	});
});
