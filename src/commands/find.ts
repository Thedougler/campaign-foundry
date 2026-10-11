import { Command } from "commander";
import { UsageError } from "../check/run.ts";
import { suggest } from "../check/util.ts";
import { stringValues } from "../vault/dialect.ts";
import type { Page, Vault } from "../vault/types.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { CF, envOptions, resolveEnv } from "./kit.ts";
import { revealedOf } from "./revealed.ts";

interface FindFlags {
	vault?: string;
	root?: string;
	json?: boolean;
}

interface NameMatches {
	/** Per query, the pages answering to it in vault order. */
	byQuery: Map<string, Page[]>;
	/** Every name any page answers to, for the closest-name suggestion. */
	candidates: string[];
}

/**
 * One pass over the vault matching every query against every page's names (ADR 0028): the frontmatter
 * `title`, each `aliases` entry, then the filename slug, case-insensitively, exact or prefix. A page matching
 * a query through several of its names prints once.
 */
function matchNames(vault: Vault, queries: string[]): NameMatches {
	const byQuery = new Map<string, Page[]>();
	const candidates = new Set<string>();
	for (const page of vault.pages) {
		for (const name of page.names) candidates.add(name);
		for (const query of queries) {
			if (!page.names.some((n) => n.toLowerCase().startsWith(query.toLowerCase()))) continue;
			byQuery.set(query, [...(byQuery.get(query) ?? []), page]);
		}
	}
	return { byQuery, candidates: [...candidates] };
}

export function findCommand(): Command {
	const command = new Command("find")
		.description(
			"Resolves names to Wiki pages: case-insensitive, exact or prefix, over each page's frontmatter `title`, its `aliases` and its filename slug (ADR 0028). Read-only; which page a subject means stays with the agent.",
		)
		.argument("<names...>", "one or more names to resolve");
	envOptions(command);
	return command
		.option("--json", "print [{query,pages:[{path,kind,title,aliases,revealed}]}] JSON instead of text blocks")
		.addHelpText(
			"after",
			`
Output:
  one block per name: the name with its match count, then each page's vault-relative path, kind
  (frontmatter \`type\`), \`title\` (unset when absent or blank),
  \`aliases\` and \`revealed\` value (unset when the key is absent or empty).
  Several matches all print, and the count says so. A name matching nothing is a usage error
  naming the closest real name.

Exit codes:
  0  every name matched    2  usage error, or a name with no match

Examples:
  ${CF} find "Nona Black-Jaw"
  ${CF} find "Nona"                  a prefix is enough, and it also matches aliases
  ${CF} find "Gold Caste" "Nona"     several names, one block each
  ${CF} find "gold" --vault wiki     every page answering to a gold-prefixed name
  ${CF} find "Nona" --json           the same matches as JSON`,
		)
		.action(async (names: string[], flags: FindFlags) => {
			const queries = names.map((n) => n.trim());
			if (queries.length === 0 || queries.some((q) => q === "")) {
				throw new UsageError(
					"No name given.",
					`Name at least one page by \`title\`, alias or file slug. Example: ${CF} find "Nona Black-Jaw"`,
				);
			}
			const { vault: vaultDir } = resolveEnv(flags, "find");
			const vault = buildVault(vaultDir, await readVaultFiles(vaultDir));
			const { byQuery, candidates } = matchNames(vault, queries);
			let missed: { query: string; closest?: string } | undefined;
			const blocks: string[] = [];
			const report: {
				query: string;
				pages: { path: string; kind: string | null; title: string | null; aliases: string[]; revealed: string }[];
			}[] = [];
			for (const query of queries) {
				const hits = byQuery.get(query) ?? [];
				if (hits.length === 0) {
					missed ??= { query, closest: suggest(query, candidates) };
					continue;
				}
				blocks.push(`${query}  ${hits.length} ${hits.length === 1 ? "page" : "pages"}`);
				const pages = hits.map((page) => {
					const kind = page.frontmatter?.type;
					const title = stringValues(page.frontmatter?.title)[0] ?? "";
					const aliases = stringValues(page.frontmatter?.aliases);
					blocks.push(`  ${page.path}`);
					if (typeof kind === "string" && kind !== "") blocks.push(`    kind: ${kind}`);
					blocks.push(title === "" ? "    title: unset" : `    title: ${title}`);
					if (aliases.length > 0) blocks.push(`    aliases: ${aliases.join(", ")}`);
					blocks.push(`    revealed: ${revealedOf(page)}`);
					return {
						path: page.path,
						kind: typeof kind === "string" && kind !== "" ? kind : null,
						title: title === "" ? null : title,
						aliases,
						revealed: revealedOf(page),
					};
				});
				blocks.push("");
				report.push({ query, pages });
			}
			// A miss refuses after the matches print, so a partial answer still reaches the agent (exit 2 says to look again); JSON refuses whole, since half a document parses as whole.
			if (flags.json && missed === undefined) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
			else if (!flags.json && blocks.length > 0) process.stdout.write(blocks.join("\n"));
			if (missed !== undefined) {
				throw new UsageError(
					`No page answering to \`${missed.query}\` in the Wiki.${missed.closest ? ` Did you mean \`${missed.closest}\`?` : ""}`,
					`Name a page by \`title\`, alias or file slug; a prefix is enough. ${CF} find "${missed.closest ?? missed.query}"`,
				);
			}
		});
}
