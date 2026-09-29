import { existsSync, realpathSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { Command, Option } from "commander";
import { formatHuman, formatJson } from "../check/output.ts";
import { layers } from "../check/layers/index.ts";
import { runCheck, UsageError } from "../check/run.ts";

/** The repository root: nearest ancestor of `from` holding `.git`, else `from`. */
export function findRepoRoot(from: string): string {
	for (let dir = from; ; dir = dirname(dir)) {
		if (existsSync(join(dir, ".git")) || existsSync(join(dir, "pnpm-workspace.yaml"))) return dir;
		if (dirname(dir) === dir) return from;
	}
}

interface CheckFlags {
	vault?: string;
	templates?: string;
	root?: string;
	layer: string[];
	fix?: boolean;
	dryRun?: boolean;
	json?: boolean;
}

const collect = (value: string, previous: string[]): string[] => [...previous, value];

export function checkCommand(): Command {
	const width = Math.max(...layers.map((l) => l.name.length)) + 2;
	const layerLines = layers.map((l) => `  ${l.name.padEnd(width)}${l.description}`).join("\n");
	return new Command("check")
		.description("Gate the Wiki: every layer must pass. Exits 0 clean, 1 findings, 2 usage error.")
		.argument("[paths...]", "report only findings under these files or folders (the whole Wiki is still checked)")
		.option("--vault <dir>", "the Wiki folder to check (default: <root>/wiki)")
		.option("--templates <dir>", "folder of page templates (default: <root>/wiki/templates, else the repo's)")
		.option("--root <dir>", "repository root, where sources paths like archive/x.md resolve (default: nearest git root)")
		.addOption(new Option("--layer <name>", "run only this layer; repeat for several").argParser(collect).default([] as string[], "all layers"))
		.option("--fix", "apply mechanical fixes, report them, then re-check")
		.option("--dry-run", "with --fix: show the fixes without writing anything")
		.option("--json", "print machine-readable JSON instead of text")
		.addHelpText(
			"after",
			`
Layers:
${layerLines}

Output:
  path:line  layer/rule  message, then an indented "fix:" hint, then a summary line.
  Fixes reported by --fix read "fixed  path  layer/rule  what changed".

Exit codes:
  0  no findings    1  findings remain    2  usage error

Examples:
  cf check
  cf check wiki/Aldermoor/Locations/Ravenhold.md
  cf check wiki/Aldermoor --layer links --layer orphans
  cf check wiki/Aldermoor/NPCs/Mara\ Voss.md --layer spelling --layer style
  cf check --fix --dry-run
  cf check --fix
  cf check --json --vault test/fixtures/vault --root test/fixtures`,
		)
		.action(async (paths: string[], flags: CheckFlags) => {
			const cwd = process.cwd();
			// realpath so paths compare equal to process.cwd(), which the OS reports resolved (macOS /var -> /private/var).
			const real = (p: string): string => (existsSync(p) ? realpathSync(p) : p);
			const root = real(flags.root ? resolve(cwd, flags.root) : findRepoRoot(cwd));
			const vault = real(flags.vault ? resolve(cwd, flags.vault) : join(root, "wiki"));
			// A fixture or eval root usually carries no templates of its own: fall back to the repo's.
			const rootTemplates = join(root, "wiki/templates");
			const templates = real(
				flags.templates
					? resolve(cwd, flags.templates)
					: existsSync(rootTemplates)
						? rootTemplates
						: join(findRepoRoot(cwd), "wiki/templates"),
			);
			const fail = (message: string, hint: string): never => {
				throw new UsageError(message, hint);
			};
			if (flags.dryRun && !flags.fix) fail("--dry-run only applies with --fix.", "cf check --fix --dry-run");
			for (const [label, dir, flag] of [["vault", vault, "--vault"], ["templates", templates, "--templates"]] as const) {
				if (!existsSync(dir) || !statSync(dir).isDirectory()) fail(`The ${label} folder ${dir} does not exist.`, `cf check ${flag} <folder>`);
			}
			for (const p of paths) if (!existsSync(resolve(cwd, p))) fail(`No such path: ${p}.`, "Pass files or folders inside the Wiki, e.g. cf check wiki/Aldermoor");

			const result = await runCheck({
				vault,
				templates,
				root,
				cwd,
				layers: flags.layer,
				paths: paths.map((p) => real(resolve(cwd, p))),
				fix: flags.fix ?? false,
				dryRun: flags.dryRun ?? false,
			});
			const text = flags.json ? formatJson(result) : formatHuman(result, { fix: flags.fix ?? false, dryRun: flags.dryRun ?? false });
			process.stdout.write(`${text}\n`);
			process.exitCode = result.findings.length > 0 ? 1 : 0;
		});
}
