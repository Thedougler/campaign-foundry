import { existsSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Command } from "commander";
import { mentionedPages } from "../check/prose.ts";
import { UsageError } from "../check/run.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { resolveCheckEnv } from "./check.ts";
import { readStdin } from "./stdin.ts";

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

async function readFileOrUsage(file: string): Promise<string> {
	try {
		return await readFile(resolve(process.cwd(), file), "utf8");
	} catch {
		throw new UsageError(
			`No such file: ${file}.`,
			"Pass a markdown or text file to read, or - for stdin. Example: bun run cf -- context notes.md",
		);
	}
}

export function contextCommand(): Command {
	return new Command("context")
		.description("Lists the Wiki pages a text mentions; deciding what to change is the agent's job.")
		.argument("[file]", "markdown or plain text to read, or - for stdin (default: stdin)")
		.option("--vault <dir>", "the Wiki folder to read names from (default: <root>/wiki)")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.option("--json", "print [{path,type,name}] JSON instead of tab-separated lines")
		.addHelpText(
			"after",
			`
A page is mentioned when its name or an alias appears as bare words: whole word, case-sensitive.

Output:
  one line per page: <vault-relative path>\\t<type>\\t<matched name>, deduplicated per page,
  sorted by type, then name.

Exit codes:
  0  text read (with or without mentions)    2  usage error

Examples:
  bun run cf -- context notes.md
  printf 'Osset owes Talon Skarn.' | bun run cf -- context -
  bun run cf -- context draft.md --json`,
		)
		.action(async (file: string | undefined, flags: ContextFlags) => {
			const text = file === undefined || file === "-" ? await readStdin() : await readFileOrUsage(file);
			const { vault: vaultDir } = resolveCheckEnv(flags);
			if (!existsSync(vaultDir) || !statSync(vaultDir).isDirectory()) {
				throw new UsageError(`The vault folder ${vaultDir} does not exist.`, "cf context --vault <folder>");
			}
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
