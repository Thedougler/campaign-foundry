import { existsSync, realpathSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { Command } from "commander";
import { formatHuman, formatJson } from "../check/output.ts";
import { runCheck, UsageError } from "../check/run.ts";
import { suggest } from "../check/util.ts";
import { worldsOf } from "../vault/indexes.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { resolveCheckEnv } from "./check.ts";

/** Judgement-free mechanical layers: template headings/order, wikilinks, placement, index. */
export const LINT_LAYERS = ["template", "placement", "links", "index"] as const;

interface LintFlags {
	world?: string;
	vault?: string;
	templates?: string;
	root?: string;
	fix?: boolean;
	dryRun?: boolean;
	json?: boolean;
}

export function lintCommand(): Command {
	return new Command("lint")
		.description("Mechanical Wiki repair: template headings and order, wikilinks, placement, index. Exits 0 clean, 1 findings, 2 usage error.")
		.option("--world <World>", "limit to this World folder (default: whole Wiki)")
		.option("--vault <dir>", "the Wiki folder to lint (default: <root>/wiki)")
		.option("--templates <dir>", "folder of page templates (default: <root>/wiki/templates, else the repo's)")
		.option("--root <dir>", "repository root, where sources paths like archive/x.md resolve (default: nearest git root)")
		.option("--fix", "apply judgement-free mechanical fixes, report them, then re-check")
		.option("--dry-run", "with --fix: show the fixes without writing anything")
		.option("--json", "print machine-readable JSON instead of text")
		.addHelpText(
			"after",
			`
Layers:
  template    headings, section order, required properties
  placement   each page sits where docs/wiki-layout.md puts its kind
  links       every wikilink and embed resolves
  index       root and World index.md match cf index

--fix rewrites layout, headings, links, placement, and regenerates index.md.
It does not create, split, delete or merge pages, and it does not change what a sentence asserts.
The gate (cf check) still owns form.

Output:
  path:line  layer/rule  message, then an indented "fix:" hint, then a summary line.
  Fixes reported by --fix read "fixed  path  layer/rule  what changed".

Exit codes:
  0  no findings    1  findings remain    2  usage error

Examples:
  cf lint --world Aldermoor
  cf lint --world Aldermoor --fix
  cf lint --world Aldermoor --fix --dry-run
  cf lint --fix
  cf lint --json --vault test/check/fixtures/clean/wiki --root test/check/fixtures/clean
  cf log --world Aldermoor --op lint --title "Headings" --page "Mara Voss"`,
		)
		.action(async (flags: LintFlags) => {
			const { cwd, root, vault, templates } = resolveCheckEnv(flags);
			const real = (p: string): string => (existsSync(p) ? realpathSync(p) : p);
			const example = flags.world ? `cf lint --world ${flags.world}` : "cf lint --world <World>";
			const fail = (message: string, hint: string): never => {
				throw new UsageError(message, hint);
			};
			if (flags.dryRun && !flags.fix) fail("--dry-run only applies with --fix.", "cf lint --fix --dry-run");
			for (const [label, dir, flag] of [
				["vault", vault, "--vault"],
				["templates", templates, "--templates"],
			] as const) {
				if (!existsSync(dir) || !statSync(dir).isDirectory()) fail(`The ${label} folder ${dir} does not exist.`, `cf lint ${flag} <folder>`);
			}

			const paths: string[] = [];
			if (flags.world) {
				const vaultPages = buildVault(vault, await readVaultFiles(vault));
				const worlds = worldsOf(vaultPages).map((w) => w.name);
				if (!worlds.includes(flags.world)) {
					const closest = suggest(flags.world, worlds);
					fail(
						`No World \`${flags.world}\`.${closest ? ` Did you mean \`${closest}\`?` : ""}`,
						`Worlds here: ${worlds.join(", ") || "none"}. ${example}`,
					);
				}
				paths.push(real(resolve(cwd, join(vault, flags.world))));
			}

			const result = await runCheck({
				vault,
				templates,
				root,
				cwd,
				layers: [...LINT_LAYERS],
				paths,
				fix: flags.fix ?? false,
				dryRun: flags.dryRun ?? false,
			});
			const text = flags.json ? formatJson(result) : formatHuman(result, { fix: flags.fix ?? false, dryRun: flags.dryRun ?? false });
			process.stdout.write(`${text}\n`);
			process.exitCode = result.findings.length > 0 ? 1 : 0;
		});
}
