import { Command } from "commander";
import { generateDescriptionReview } from "../../evals/review.ts";
import { UsageError } from "../check/run.ts";
import { CF } from "./kit.ts";

interface DescriptionReviewFlags {
	skillName: string;
	description: string;
	static: string;
}

export function descriptionReviewCommand(): Command {
	return new Command("description-review")
		.showHelpAfterError(
			`Example: ${CF} eval description-review /tmp/queries.json --skill-name example --description "Use for example work." --static /tmp/review.html\nRun ${CF} eval description-review --help for options.`,
		)
		.description("Generate an offline editor for description trigger queries; export eval_set.json in the page.")
		.argument("<queries.json>", "JSON array of {query: string, should_trigger: boolean}")
		.requiredOption("--skill-name <name>", "skill name shown in the review")
		.requiredOption("--description <text>", "current skill description shown verbatim")
		.requiredOption("--static <review.html>", "destination for the standalone HTML query editor")
		.addHelpText(
			"after",
			`
Edit queries, toggle Should Trigger, add or delete rows, then export eval_set.json.
Blank queries are omitted and exported query text is trimmed. The page needs no server or
network access. Success prints JSON {queries,review,count}. Usage/setup errors exit 2.
Examples:
  ${CF} eval description-review /tmp/queries.json --skill-name npc-design --description "Design or deepen a named NPC." --static /tmp/description-review.html`,
		)
		.action(async (queries: string, flags: DescriptionReviewFlags) => {
			try {
				const result = await generateDescriptionReview({ queries, ...flags });
				process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
			} catch (error) {
				throw new UsageError(
					(error as Error).message,
					`Supply an array of query/boolean trigger cases and a writable HTML destination. ${CF} eval description-review --help`,
				);
			}
		});
}
