import { readFileSync } from "node:fs";
import { UsageError } from "../check/errors.ts";
import type { RubricScore } from "./cache.ts";
import type { BenchEntry } from "./prompts.ts";

/** Reads and validates a Judge's grades file against the entry's rubrics: exact rubric texts, scores 1–5, a reason each. */
export function loadGrades(path: string, entry: BenchEntry): RubricScore[] {
	let parsed: unknown;
	try {
		parsed = JSON.parse(readFileSync(path, "utf8"));
	} catch (error) {
		throw new UsageError(`Cannot read grades from \`${path}\`: ${(error as Error).message}`, "The Judge writes a JSON array [{ rubric, score, reason }]; re-dispatch it with the judge brief if the file is broken.");
	}
	if (!Array.isArray(parsed) || parsed.length !== entry.rubrics.length) {
		throw new UsageError(`Grades in \`${path}\` are not ${entry.rubrics.length} scored rubrics.`, `Entry \`${entry.id}\` scores exactly ${entry.rubrics.length} rubrics; re-dispatch the Judge with its judge brief.`);
	}
	return (parsed as Record<string, unknown>[]).map((grade, i) => {
		const rubric = typeof grade.rubric === "string" ? grade.rubric : "";
		if (rubric !== entry.rubrics[i]) {
			throw new UsageError(`Grades in \`${path}\`: rubric ${i + 1} does not match the entry.`, `Expected "${entry.rubrics[i]}", got "${rubric}"; the Judge must quote each rubric verbatim from its brief.`);
		}
		const score = grade.score;
		if (typeof score !== "number" || !Number.isInteger(score) || score < 1 || score > 5) {
			throw new UsageError(`Grades in \`${path}\`: rubric ${i + 1} scores ${JSON.stringify(score)}.`, "Every rubric scores an integer 1–5; re-dispatch the Judge if it scaled differently.");
		}
		if (typeof grade.reason !== "string" || grade.reason.trim() === "") {
			throw new UsageError(`Grades in \`${path}\`: rubric ${i + 1} has no reason.`, "Every score carries a one-sentence reason quoting the sample.");
		}
		return { rubric, score, reason: grade.reason };
	});
}

/** Mean rubric score, one decimal, half-up: the row's `prose_score`. */
export function proseScore(grades: RubricScore[]): number {
	return Number((grades.reduce((sum, grade) => sum + grade.score, 0) / grades.length).toFixed(1));
}
