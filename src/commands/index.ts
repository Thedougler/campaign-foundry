import type { Command } from "commander";
import { benchCommand } from "./bench.ts";
import { checkCommand } from "./check.ts";
import { contextCommand } from "./context.ts";
import { encounterBudgetCommand } from "./encounter-budget.ts";
import { evalCommand } from "./eval.ts";
import { indexCommand } from "./index-cmd.ts";
import { logCommand } from "./log.ts";
import { pullCommand } from "./pull.ts";
import { pushCommand } from "./push.ts";
import { styleCommand } from "./style.ts";
import { transcriptCommand } from "./transcript.ts";

/**
 * Every `cf` subcommand. To add one (`index`, `log`, `pull`, `push`): create `src/commands/<name>.ts`
 * exporting a function that returns a commander `Command`, then add one import and one entry here.
 */
export const commands: (() => Command)[] = [
 benchCommand,
 checkCommand,
 contextCommand,
 encounterBudgetCommand,
 evalCommand,
 indexCommand,
 logCommand,
 pullCommand,
 pushCommand,
 styleCommand,
 transcriptCommand,
];
