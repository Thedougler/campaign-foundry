import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { Command } from "commander";
import { generateIndexes } from "../vault/indexes.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { CF, envOptions, resolveEnv } from "./kit.ts";

interface IndexFlags {
	vault?: string;
	root?: string;
	dryRun?: boolean;
	json?: boolean;
}

export function indexCommand(): Command {
	const command = new Command("index").description(
		"Regenerate the vault's index.md files (the root index, and one per Campaign folder) from every page's summary. Never edit them by hand.",
	);
	envOptions(command);
	return command
		.option("--dry-run", "print what would change without writing anything")
		.option("--json", "print {wrote,total,dryRun} JSON instead of one line per file")
		.addHelpText(
			"after",
			`
Output:
  The root index.md lists each Campaign as "[[Campaign]] — summary", then any shared pages by kind.
  Each Campaign folder's index.md lists every page in it, the World overview and Sessions included,
  grouped by page kind as "[[Page]] — summary": World kinds first (Locations by Region, Settlement,
  Site), then Campaign kinds, then Session kinds.
  Pages sort by name. Re-running changes nothing unless a summary, name or page changed.
  Prints "wrote  path" per file changed, or "up to date".

Exit codes:
  0  done (or nothing to do)    2  usage error

Examples:
  ${CF} index
  ${CF} index --dry-run
  ${CF} index --vault test/check/fixtures/clean/wiki --root test/check/fixtures/clean
  ${CF} check --layer index --fix     the same regeneration, from the gate`,
		)
		.action(async (flags: IndexFlags) => {
			const { root, vault: vaultDir } = resolveEnv(flags, "index");
			const vault = buildVault(vaultDir, await readVaultFiles(vaultDir));
			const generated = generateIndexes(vault);
			const lines: string[] = [];
			const wrote: string[] = [];
			for (const [path, content] of generated) {
				const existing = vault.pageByPath.get(path);
				if (existing?.source === content) continue;
				if (!flags.dryRun) {
					await mkdir(dirname(join(vaultDir, path)), { recursive: true });
					await writeFile(join(vaultDir, path), content);
				}
				// Root-relative (wiki/...) like the gate's findings, so the JSON is stable from any cwd.
				const shown = relative(root, join(vaultDir, path)).split(sep).join("/");
				wrote.push(shown);
				lines.push(
					`${flags.dryRun ? "would write" : "wrote"}  ${relative(process.cwd(), join(vaultDir, path)).split(sep).join("/")}`,
				);
			}
			if (flags.json) {
				process.stdout.write(
					`${JSON.stringify({ dryRun: flags.dryRun ?? false, wrote, total: generated.size }, null, 2)}\n`,
				);
				return;
			}
			process.stdout.write(`${lines.length > 0 ? lines.join("\n") : `up to date: ${generated.size} index files`}\n`);
		});
}
