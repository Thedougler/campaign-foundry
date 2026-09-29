import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { Command } from "commander";
import { generateIndexes } from "../vault/indexes.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { resolveVault } from "./vault-flags.ts";

interface IndexFlags {
	vault?: string;
	root?: string;
	dryRun?: boolean;
}

export function indexCommand(): Command {
	return new Command("index")
		.description("Regenerate the vault's index.md files (root and one per World) from every page's summary. Never edit them by hand.")
		.option("--vault <dir>", "the Wiki folder (default: <root>/wiki)")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.option("--dry-run", "print what would change without writing anything")
		.addHelpText(
			"after",
			`
Output:
  The root index.md lists each World as "[[World]] — summary". Each World's index.md lists every page
  in it, Campaigns and Sessions included, grouped by page kind as "[[Page]] — summary": the World's
  kinds first (Locations by Region, Settlement, Site), then Campaign kinds, then Session kinds.
  Pages sort by name. Re-running changes nothing unless a summary, name or page changed.
  Prints "wrote  path" per file changed, or "up to date".

Exit codes:
  0  done (or nothing to do)    2  usage error

Examples:
  cf index
  cf index --dry-run
  cf index --vault test/check/fixtures/clean/wiki --root test/check/fixtures/clean
  cf check --layer index --fix     the same regeneration, from the gate`,
		)
		.action(async (flags: IndexFlags) => {
			const { vault: vaultDir } = resolveVault(flags, "index");
			const vault = buildVault(vaultDir, await readVaultFiles(vaultDir));
			const generated = generateIndexes(vault);
			const cwd = process.cwd();
			const lines: string[] = [];
			for (const [path, content] of generated) {
				const existing = vault.pageByPath.get(path);
				if (existing?.source === content) continue;
				if (!flags.dryRun) {
					await mkdir(dirname(join(vaultDir, path)), { recursive: true });
					await writeFile(join(vaultDir, path), content);
				}
				lines.push(`${flags.dryRun ? "would write" : "wrote"}  ${relative(cwd, join(vaultDir, path)).split(sep).join("/")}`);
			}
			process.stdout.write(`${lines.length > 0 ? lines.join("\n") : `up to date: ${generated.size} index files`}\n`);
		});
}
