import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { Command, Option } from "commander";
import { formatHuman, formatJson, gateExitCode } from "../check/output.ts";
import { layers } from "../check/layers/index.ts";
import { runCheck, UsageError } from "../check/run.ts";
import { collect, envOptions, CF, realPath, requireTemplates, resolveEnv } from "./kit.ts";

interface CheckFlags {
	vault?: string;
	templates?: string;
	root?: string;
	layer: string[];
	fix?: boolean;
	dryRun?: boolean;
	json?: boolean;
}

export function checkCommand(): Command {
	const width = Math.max(...layers.map((l) => l.name.length)) + 2;
	const layerLines = layers.map((l) => `  ${l.name.padEnd(width)}${l.description}`).join("\n");
	const command = new Command("check")
		.description("Gate the Wiki: errors fail; warnings are reported. Exits 0 no errors, 1 errors, 2 usage error.")
		.argument("[paths...]", "check only these files or folders, using the whole Wiki as read-only context");
	envOptions(command, { templates: true });
	return command
		.addOption(
			new Option("--layer <name>", "run only this layer; repeat for several")
				.argParser(collect)
				.default([] as string[], "all layers"),
		)
		.option("--fix", "apply mechanical fixes, report them, then re-check")
		.option("--dry-run", "with --fix: show the fixes without writing anything")
		.option("--json", "print machine-readable JSON instead of text")
		.addHelpText(
			"after",
			`
Layers:
${layerLines}

Output:
  path:line  layer/rule  severity  message, then an indented "fix:" hint, then a summary line.
  Fixes reported by --fix read "fixed  path  layer/rule  what changed".
  Severities: error fails the gate; warning is reported without failing the gate.

Exit codes:
  0  no errors (warnings may print)    1  errors remain    2  usage error

Examples:
  ${CF} check
  ${CF} check wiki/Aldermoor/Locations/Ravenhold.md
  ${CF} check wiki/Aldermoor --layer links --layer orphans
  ${CF} check wiki/Aldermoor/NPCs/Mara Voss.md --layer spelling --layer style
  ${CF} check --fix --dry-run
  ${CF} check --fix
  ${CF} check --json --vault test/fixtures/vault --root test/fixtures`,
		)
		.action(async (paths: string[], flags: CheckFlags) => {
			const env = resolveEnv(flags, "check");
			requireTemplates(env, "check");
			if (flags.dryRun && !flags.fix)
				throw new UsageError("--dry-run only applies with --fix.", `${CF} check --fix --dry-run`);
			for (const p of paths)
				if (!existsSync(resolve(env.cwd, p)))
					throw new UsageError(
						`No such path: ${p}.`,
						`Pass files or folders inside the Wiki, e.g. ${CF} check wiki/Aldermoor`,
					);

			const result = await runCheck({
				vault: env.vault,
				templates: env.templates,
				root: env.root,
				cwd: env.cwd,
				layers: flags.layer,
				paths: paths.map((p) => realPath(resolve(env.cwd, p))),
				fix: flags.fix ?? false,
				dryRun: flags.dryRun ?? false,
			});
			const text = flags.json
				? formatJson(result)
				: formatHuman(result, { fix: flags.fix ?? false, dryRun: flags.dryRun ?? false });
			process.stdout.write(`${text}\n`);
			process.exitCode = gateExitCode(result);
		});
}
