import { readFileSync } from "node:fs";
import { UsageError } from "../check/errors.ts";
import { sha12, type BenchEntry } from "./prompts.ts";

export interface JudgeBriefInput {
	entry: BenchEntry;
	/** The exact runner brief the sample answers. */
	brief: string;
	sample: string;
	/** Where the Judge must write its JSON grades. */
	gradesPath: string;
}

/** The anonymous handle of a sample: a hash of its bytes, carrying no family or model. */
export function anonId(sample: string): string {
	return `sample-${sha12(sample).slice(0, 8)}`;
}

/** Fills the committed judge template (`evals/bench/judge-brief.md`) for one anonymized sample. */
export function renderJudgeBrief(templatePath: string, input: JudgeBriefInput): string {
	let template: string;
	try {
		template = readFileSync(templatePath, "utf8");
	} catch {
		throw new UsageError(`No judge template at \`${templatePath}\`.`, "The Judge's prompt is committed at `evals/bench/judge-brief.md`; run from the repository root.");
	}
	const rubrics = input.entry.rubrics.map((rubric) => `- ${rubric}`).join("\n");
	const filled = template
		.replaceAll("{{brief}}", input.brief)
		.replaceAll("{{sample_id}}", anonId(input.sample))
		.replaceAll("{{sample}}", input.sample)
		.replaceAll("{{rubrics}}", rubrics)
		.replaceAll("{{grades_path}}", input.gradesPath);
	if (filled.includes("{{")) {
		throw new UsageError(`Judge template \`${templatePath}\` holds an unknown placeholder.`, "Only {{brief}}, {{sample_id}}, {{sample}}, {{rubrics}} and {{grades_path}} are filled.");
	}
	return filled;
}
