import { Command } from "commander";
import { UsageError } from "../check/run.ts";
import { suggest } from "../check/util.ts";
import { campaignFolders, campaignNames } from "../vault/indexes.ts";
import type { Page } from "../vault/types.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { resolveVault } from "./vault-flags.ts";

interface RevealedFlags {
	vault?: string;
	root?: string;
	campaign?: string;
}

/** A page's `revealed` value: what the table has seen, `unset` when the key is absent or empty. */
export function revealedOf(page: Page): string {
	const value = page.frontmatter?.revealed;
	const shown = typeof value === "string" ? value.trim() : "";
	return shown === "" ? "unset" : shown;
}

export function revealedCommand(): Command {
	return new Command("revealed")
		.description("Lists each page's `revealed` value: the Canon frontier in one read. Read-only.")
		.option("--campaign <Campaign>", "scope to one Campaign folder, by the Campaign's name (default: the whole vault)")
		.option("--vault <dir>", "the Wiki folder (default: <root>/wiki)")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.addHelpText(
			"after",
			`
Output:
  one line per page: <vault-relative path>  <revealed value>. Pages whose \`revealed\` key is absent
  or empty print last, as \`unset\`; each group sorts by path.

Exit codes:
  0  done    2  usage error

Examples:
  cf revealed
  cf revealed --campaign "Shattered Sea"
  cf revealed --campaign "Shattered Sea" | grep -c "  unset"`,
		)
		.action(async (flags: RevealedFlags) => {
			const { vault: vaultDir } = resolveVault(flags, "revealed");
			const vault = buildVault(vaultDir, await readVaultFiles(vaultDir));
			let pages = vault.pages;
			if (flags.campaign !== undefined) {
				const folders = campaignFolders(vault);
				if (!folders.has(flags.campaign)) {
					const names = campaignNames(vault);
					const closest = suggest(flags.campaign, names);
					throw new UsageError(
						`No Campaign \`${flags.campaign}\`.${closest ? ` Did you mean \`${closest}\`?` : ""}`,
						`Campaigns here: ${names.join(", ") || "none"}. Example: cf revealed --campaign "${names[0] ?? "<Campaign>"}"`,
					);
				}
				const folder = folders.get(flags.campaign)!;
				pages = pages.filter((p) => p.path.startsWith(`${folder}/`));
			}
			const rows = pages.map((p) => ({ path: p.path, value: revealedOf(p) }));
			const lines = [...rows.filter((r) => r.value !== "unset"), ...rows.filter((r) => r.value === "unset")].map(
				(r) => `${r.path}  ${r.value}`,
			);
			if (lines.length > 0) process.stdout.write(`${lines.join("\n")}\n`);
		});
}
