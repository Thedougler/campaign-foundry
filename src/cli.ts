#!/usr/bin/env node
import "./env.ts";
import { Command, CommanderError } from "commander";
import { UsageError } from "./check/run.ts";
import { commands } from "./commands/index.ts";

const program = new Command("cf")
	.description("Campaign Foundry: tools that keep the Wiki in shape. Run a subcommand with --help for its options and examples.")
	.showHelpAfterError("(run with --help for options and examples)")
	.addHelpText(
		"after",
		`
Examples:
  cf check                       gate the whole Wiki
  cf check --fix                 gate it, applying mechanical fixes
  cf check --help                options, layers and more examples
  cf lint --world Aldermoor --fix
                                 mechanical template, links, placement, index
  cf index                       regenerate the index.md files
  cf narration "Ilse Corran" --callout "First look" --band 60-100
                                 check a Narration draft before filing it
  cf encounter-budget --levels 5,5,5,5 --creature "Orc,1/2,100,3"
                                 2024 Encounter XP budgets and Creature spend
  cf eval extract "Ilse Corran" --callout "First look"
                                 dump a callout body for a grader to read (not a Grade)
  cf log --world Aldermoor --op ingest --title "Session 3 transcript" --page "Session 3 - Recap"
                                 append to a World's log.md
  cf bench status                 plan the Prose Benchmark: cache hits and run commands
  cf push --campaign "Salt and Lantern" --session 2
                                 build a Session's Foundry Adventure module`,
	)
	.exitOverride();

for (const make of commands) {
	const command = make().exitOverride().showHelpAfterError("(run with --help for options and examples)");
	program.addCommand(command);
}

async function main(): Promise<void> {
	if (process.argv.length <= 2) {
		program.outputHelp();
		return;
	}
	try {
		await program.parseAsync(process.argv);
	} catch (error) {
		if (error instanceof CommanderError) {
			// Help and version exit 0; every other commander error is a usage error.
			process.exitCode = error.exitCode === 0 ? 0 : 2;
		} else if (error instanceof UsageError) {
			process.stderr.write(`Error: ${error.message}\n  ${error.hint}\n`);
			process.exitCode = 2;
		} else {
			throw error;
		}
	}
}

await main();
