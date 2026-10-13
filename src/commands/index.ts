import type { Command } from "commander";

/** One `cfcli` subcommand: its name, and the loader that imports its module and builds it. */
export interface CommandEntry {
	/** The name `cfcli <name>` dispatches on; equal to the loaded command's `name()`. */
	name: string;
	load: () => Promise<Command>;
}

/**
 * Every `cfcli` subcommand. Each module loads only when its subcommand runs (or top-level help
 * lists them all), so a half-edited command module breaks that command alone. Dynamic `import()`
 * is the point here: a static import would load every module on every invocation.
 * To add one: create `src/commands/<name>.ts` exporting a function that returns a commander
 * `Command`, then add one entry here.
 */
export const commands: CommandEntry[] = [
	{ name: "backup", load: async () => (await import("./backup.ts")).backupCommand() },
	{ name: "bench", load: async () => (await import("./bench.ts")).benchCommand() },
	{ name: "check", load: async () => (await import("./check.ts")).checkCommand() },
	{ name: "context", load: async () => (await import("./context.ts")).contextCommand() },
	{ name: "convert", load: async () => (await import("./convert.ts")).convertCommand() },
	{ name: "convert-creatures", load: async () => (await import("./convert-creatures.ts")).convertCreaturesCommand() },
	{ name: "convert-items", load: async () => (await import("./convert-items.ts")).convertItemsCommand() },
	{ name: "convert-spells", load: async () => (await import("./convert-spells.ts")).convertSpellsCommand() },
	{ name: "ddb", load: async () => (await import("./ddb.ts")).ddbCommand() },
	{ name: "encounter-budget", load: async () => (await import("./encounter-budget.ts")).encounterBudgetCommand() },
	{ name: "eval", load: async () => (await import("./eval.ts")).evalCommand() },
	{ name: "find", load: async () => (await import("./find.ts")).findCommand() },
	{ name: "foundry", load: async () => (await import("./foundry.ts")).foundryCommand() },
	{ name: "index", load: async () => (await import("./index-cmd.ts")).indexCommand() },
	{ name: "lint-tally", load: async () => (await import("./lint-tally.ts")).lintTallyCommand() },
	{ name: "log", load: async () => (await import("./log.ts")).logCommand() },
	{ name: "pull", load: async () => (await import("./pull.ts")).pullCommand() },
	{ name: "push", load: async () => (await import("./push.ts")).pushCommand() },
	{ name: "rename", load: async () => (await import("./rename.ts")).renameCommand() },
	{ name: "revealed", load: async () => (await import("./revealed.ts")).revealedCommand() },
	{ name: "style", load: async () => (await import("./style.ts")).styleCommand() },
	{ name: "transcript", load: async () => (await import("./transcript.ts")).transcriptCommand() },
];
