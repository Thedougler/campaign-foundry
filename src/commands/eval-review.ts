import { Command } from "commander";
import { generateDescriptionReview, generateReview } from "../../evals/review.ts";
import { UsageError } from "../check/run.ts";

interface ReviewFlags {
	skillName: string;
	benchmark: string;
	static?: string;
	previousWorkspace?: string;
}

interface DescriptionReviewFlags {
	skillName: string;
	description: string;
	static: string;
}

export function reviewCommand(): Command {
	return new Command("review")
		.exitOverride()
		.showHelpAfterError("Example: cf eval review /tmp/iteration-1 --skill-name example --benchmark /tmp/iteration-1/benchmark.json\nRun cf eval review --help for options.")
		.description("Generate an offline HTML review of authoring outputs, grading, benchmark and prior feedback.")
		.argument("<workspace>", "authoring iteration directory containing nested outputs/ runs")
		.requiredOption("--skill-name <name>", "skill name shown in the review")
		.requiredOption("--benchmark <benchmark.json>", "benchmark JSON from this iteration")
		.option("--static <review.html>", "write a standalone HTML page (default: <workspace>/review.html)")
		.option("--previous-workspace <path>", "previous iteration containing feedback.json and output runs")
		.addHelpText("after", `
The page embeds all deliverables; no browser launch, server or network connection is needed.
Text is displayed verbatim, images are shown inline, and binary files can be downloaded.
Nested deliverable paths are preserved. Review both Outputs and Benchmark tabs, then download
feedback.json into the workspace. Existing feedback.json is included when regenerating.
Success prints JSON {workspace,review,runs,outputs}. Usage/setup errors exit 2.

Examples:
  cf eval review /tmp/iteration-2 --skill-name npc-design --benchmark /tmp/iteration-2/benchmark.json --static /tmp/iteration-2/review.html --previous-workspace /tmp/iteration-1`)
		.action(async (workspace: string, flags: ReviewFlags) => {
			try {
				const result = await generateReview({ workspace, ...flags });
				process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
			} catch (error) {
				throw new UsageError((error as Error).message, "Check the workspace, benchmark JSON and output destination. cf eval review --help");
			}
		});
}

export function descriptionReviewCommand(): Command {
	return new Command("description-review")
		.exitOverride()
		.showHelpAfterError('Example: cf eval description-review /tmp/queries.json --skill-name example --description "Use for example work." --static /tmp/review.html\nRun cf eval description-review --help for options.')
		.description("Generate an offline editor for description trigger queries; export eval_set.json in the page.")
		.argument("<queries.json>", "JSON array of {query: string, should_trigger: boolean}")
		.requiredOption("--skill-name <name>", "skill name shown in the review")
		.requiredOption("--description <text>", "current skill description shown verbatim")
		.requiredOption("--static <review.html>", "destination for the standalone HTML query editor")
		.addHelpText("after", `
Edit queries, toggle Should Trigger, add or delete rows, then export eval_set.json.
Blank queries are omitted and exported query text is trimmed. The page needs no server or
network access. Success prints JSON {queries,review,count}. Usage/setup errors exit 2.

Examples:
  cf eval description-review /tmp/queries.json --skill-name npc-design --description "Design or deepen a named NPC." --static /tmp/description-review.html`)
		.action(async (queries: string, flags: DescriptionReviewFlags) => {
			try {
				const result = await generateDescriptionReview({ queries, ...flags });
				process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
			} catch (error) {
				throw new UsageError((error as Error).message, "Supply an array of query/boolean trigger cases and a writable HTML destination. cf eval description-review --help");
			}
		});
}
