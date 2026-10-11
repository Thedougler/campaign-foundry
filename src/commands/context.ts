import { Command } from "commander";
import { mentionedPages } from "../check/views.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { CF, envOptions, readInput, resolveEnv } from "./kit.ts";

interface ContextFlags {
	vault?: string;
	root?: string;
	json?: boolean;
}

interface Mentioned {
	path: string;
	type: string;
	name: string;
}

export function contextCommand(): Command {
	const command = new Command("context")
		.description("Lists the Wiki pages a text mentions; deciding what to change is the agent's job.")
		.argument("[file]", "markdown or plain text to read, or - for stdin (default: stdin)");
	envOptions(command);
	return command
		.option("--json", "print [{path,type,name}] JSON instead of tab-separated lines")
		.addHelpText(
			"after",
			`
A page is mentioned when its name or an alias appears as bare words: whole word, case-sensitive.

Output:
  one line per page: <vault-relative path>\\t<type>\\t<matched name>, deduplicated per page,
  sorted by type, then name.

Examples:
  ${CF} context notes.md
  printf 'Osset owes Talon Skarn.' | ${CF} context -
  ${CF} context draft.md --json`,
		)
		.action(async (file: string | undefined, flags: ContextFlags) => {
			const text = await readInput(
				file,
				`Pass a markdown or text file to read, or - for stdin. Example: ${CF} context notes.md`,
			);
			const { vault: vaultDir } = resolveEnv(flags, "context");
			const vault = buildVault(vaultDir, await readVaultFiles(vaultDir));
			const mentioned: Mentioned[] = mentionedPages(text, vault)
				.map(({ page, name }) => {
					const type = page.frontmatter?.type;
					return { path: page.path, type: typeof type === "string" ? type : "", name };
				})
				.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name) || a.path.localeCompare(b.path));
			if (flags.json) {
				process.stdout.write(`${JSON.stringify(mentioned, null, 2)}\n`);
			} else {
				for (const m of mentioned) process.stdout.write(`${m.path}\t${m.type}\t${m.name}\n`);
			}
		});
}
