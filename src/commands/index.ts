import type { Command } from "commander";
import { checkCommand } from "./check.ts";

/**
 * Every `cf` subcommand. To add one (`index`, `log`, `pull`, `push`): create `src/commands/<name>.ts`
 * exporting a function that returns a commander `Command`, then add one import and one entry here.
 */
export const commands: (() => Command)[] = [checkCommand];
