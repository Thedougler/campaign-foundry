import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { UsageError } from "../check/errors.ts";

/** One DM-written Benchmark prompt version: the committed file `evals/bench/prompts/<id>/v<N>.md` (ADR 0038). */
export interface PromptVersion {
	/** The prompt slot id: its directory name. */
	id: string;
	/** The version number N. */
	version: number;
	/** The version's name: `<id>/v<N>`. */
	name: string;
	/** Path relative to the repository root. */
	path: string;
}

/** The sha256 of a committed file's bytes: the identity `run.json` records for the prompt and the rubric. */
export function sha256File(path: string): string {
	return createHash("sha256").update(readFileSync(path)).digest("hex");
}

/**
 * Every prompt version under `promptsDir`, reported under `promptsRel` (its repository-relative path),
 * sorted by id then version. An empty or missing directory is no prompts.
 */
export function listPromptVersions(promptsDir: string, promptsRel: string): PromptVersion[] {
	let slots: string[];
	try {
		slots = readdirSync(promptsDir);
	} catch {
		return [];
	}
	const versions: PromptVersion[] = [];
	for (const slot of slots.sort()) {
		let files: string[];
		try {
			files = readdirSync(join(promptsDir, slot));
		} catch {
			continue;
		}
		for (const file of files) {
			const match = /^v(\d+)\.md$/.exec(file);
			if (match !== null)
				versions.push({
					id: slot,
					version: Number(match[1]),
					name: `${slot}/v${match[1]}`,
					path: `${promptsRel}/${slot}/${file}`,
				});
		}
	}
	return versions.sort((a, b) => a.id.localeCompare(b.id) || a.version - b.version);
}

/**
 * The prompt version a run uses: its exact name `<id>/v<N>`, or a bare `<id>` for the highest version
 * the DM has written. A name nothing matches is the empty prompt slot: the DM writes prompts, so the
 * run stops and says so.
 */
export function findPromptVersion(versions: PromptVersion[], name: string): PromptVersion {
	const exact = versions.find((version) => version.name === name);
	if (exact !== undefined) return exact;
	const highest = versions
		.filter((version) => version.id === name)
		.reduce<PromptVersion | undefined>(
			(top, version) => (top === undefined || version.version > top.version ? version : top),
			undefined,
		);
	if (highest !== undefined) return highest;
	throw new UsageError(
		`No Benchmark prompt \`${name}\` under \`evals/bench/prompts/\`.`,
		"The DM writes prompts at `evals/bench/prompts/<id>/v<N>.md`; when `bun run cfcli -- bench status` lists none, the prompt slot is empty — tell the DM.",
	);
}
