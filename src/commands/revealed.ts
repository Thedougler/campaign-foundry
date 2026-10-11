import { Command } from "commander";
import { campaignNames } from "../vault/indexes.ts";
import type { Page } from "../vault/types.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { campaignFolderOf, CF, envOptions, resolveEnv } from "./kit.ts";

interface RevealedFlags {
	vault?: string;
	root?: string;
	campaign?: string;
	json?: boolean;
}

/** A page's `revealed` value: what the table has seen, `unset` when the key is absent or empty. */
export function revealedOf(page: Page): string {
	const value = page.frontmatter?.revealed;
	const shown = typeof value === "string" ? value.trim() : "";
	return shown === "" ? "unset" : shown;
}

export function revealedCommand(): Command {
	const command = new Command("revealed")
		.description("Lists each page's `revealed` value: the Canon frontier in one read. Read-only.")
		.option("--campaign <Campaign>", "scope to one Campaign folder, by the Campaign's name (default: the whole vault)");
	envOptions(command);
	return command
		.option("--json", "print [{path,value}] JSON instead of path-and-value lines")
		.addHelpText(
			"after",
			`
Output:
  one line per page: <vault-relative path>  <revealed value>. Pages whose \`revealed\` key is absent
  or empty print last, as \`unset\`; each group sorts by path.

Exit codes:
  0  done    2  usage error

Examples:
  ${CF} revealed
  ${CF} revealed --campaign "Shattered Sea"
  ${CF} revealed --campaign "Shattered Sea" | grep -c "  unset"
  ${CF} revealed --json`,
		)
		.action(async (flags: RevealedFlags) => {
			const { vault: vaultDir } = resolveEnv(flags, "revealed");
			const vault = buildVault(vaultDir, await readVaultFiles(vaultDir));
			let pages = vault.pages;
			if (flags.campaign !== undefined) {
				const folder = campaignFolderOf(
					vault,
					flags.campaign,
					`${CF} revealed --campaign "${campaignNames(vault)[0] ?? "<Campaign>"}"`,
				);
				pages = pages.filter((p) => p.path.startsWith(`${folder}/`));
			}
			const rows = pages.map((p) => ({ path: p.path, value: revealedOf(p) }));
			const ordered = [...rows.filter((r) => r.value !== "unset"), ...rows.filter((r) => r.value === "unset")];
			if (flags.json) process.stdout.write(`${JSON.stringify(ordered, null, 2)}\n`);
			else if (ordered.length > 0) process.stdout.write(`${ordered.map((r) => `${r.path}  ${r.value}`).join("\n")}\n`);
		});
}
