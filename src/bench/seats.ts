import { readFileSync } from "node:fs";
import { join } from "node:path";
import YAML from "yaml";
import { UsageError } from "../check/errors.ts";

/** The Matrix families (evals/README.md § Terms): Anthropic, OpenAI, Z.ai and xAI, each seated by a runner/grader definition pair. */
export const FAMILIES = ["anthropic", "openai", "zai", "xai"] as const;

export type FamilyName = (typeof FAMILIES)[number];

/** One family's Benchmark seat: the model and thinking level its runner and grader definitions share. */
export interface Seat {
	family: string;
	model: string;
	thinking: string;
}

/** One family's seat pair as `bench status` reads it: the shared seat, or why the pair gives none. */
export interface FamilySeats {
	family: string;
	seat: Seat | null;
	/** A missing definition, a missing frontmatter key, or a model/thinking mismatch between the pair. */
	error: string | null;
}

/** The frontmatter seat of one `bench-<role>-<family>.md` definition. */
function readSeat(root: string, family: string, role: "runner" | "grader") {
	const path = join(root, ".omp", "agents", `bench-${role}-${family}.md`);
	const file = `bench-${role}-${family}.md`;
	let text: string;
	try {
		text = readFileSync(path, "utf8");
	} catch {
		throw new UsageError(
			`No ${role} definition at \`${path}\`.`,
			`Each family needs ${file} beside its counterpart definition.`,
		);
	}
	const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
	const parsed = frontmatter === null ? {} : ((YAML.parse(frontmatter[1]!) as Record<string, unknown>) ?? {});
	const model = typeof parsed.model === "string" ? parsed.model : undefined;
	const thinking = typeof parsed["thinking-level"] === "string" ? parsed["thinking-level"] : undefined;
	if (model === undefined || thinking === undefined)
		throw new UsageError(
			`\`${file}\` frontmatter has no \`model\` and \`thinking-level\` pair.`,
			"A seat is one model and one thinking level, identical in the runner and grader definitions (skill://model-evidence § Refresh Benchmark seats).",
		);
	return { model, thinking };
}

/** Reads every family's seat from its two agent definitions, collecting per-family errors instead of failing the read. */
export function loadSeats(root: string): FamilySeats[] {
	return FAMILIES.map((family) => {
		try {
			const runner = readSeat(root, family, "runner");
			const grader = readSeat(root, family, "grader");
			if (runner.model !== grader.model || runner.thinking !== grader.thinking)
				return {
					family,
					seat: null,
					error: `bench-runner-${family} seats ${runner.model} / ${runner.thinking}, bench-grader-${family} seats ${grader.model} / ${grader.thinking}.`,
				};
			return { family, seat: { family, model: runner.model, thinking: runner.thinking }, error: null };
		} catch (error) {
			return { family, seat: null, error: error instanceof Error ? error.message : String(error) };
		}
	});
}

/** The seat a run needs: an unknown family, or a pair that does not agree, is a usage error. */
export function seatFor(seats: FamilySeats[], family: string): Seat {
	const entry = seats.find((candidate) => candidate.family === family);
	if (entry === undefined)
		throw new UsageError(
			`No Benchmark family \`${family}\`.`,
			`The Matrix families are ${FAMILIES.join(", ")} (evals/README.md § Terms).`,
		);
	if (entry.error !== null || entry.seat === null)
		throw new UsageError(
			`Family \`${family}\` has no one seat: ${entry.error}`,
			"Fix the pair to one model and thinking level; `bun run cfcli -- bench status` names each pair's mismatch.",
		);
	return entry.seat;
}
