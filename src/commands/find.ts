import { Command } from "commander";
import { UsageError } from "../check/run.ts";
import { suggest } from "../check/util.ts";
import type { Page, Vault } from "../vault/types.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { revealedOf } from "./revealed.ts";
import { resolveVault } from "./vault-flags.ts";

interface FindFlags {
	vault?: string;
	root?: string;
}

/** The frontmatter value as a list of strings: a scalar becomes one entry, other shapes read as absent. */
function stringValues(value: unknown): string[] {
	if (typeof value === "string") return value.trim() === "" ? [] : [value];
	return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
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
	return new Command("find")
		.description(
			"Resolves names to Wiki pages: case-insensitive, exact or prefix, over each page's frontmatter `title`, its `aliases` and its filename slug (ADR 0028). Read-only; which page a subject means stays with the agent.",
		)
		.argument("<names...>", "one or more names to resolve")
		.option("--vault <dir>", "the Wiki folder (default: <root>/wiki)")
		.option("--root <dir>", "repository root (default: nearest git root)")
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
  cf find "Nona Black-Jaw"
  cf find "Nona"                  a prefix is enough, and it also matches aliases
  cf find "Gold Caste" "Nona"     several names, one block each
  cf find "gold" --vault wiki     every page answering to a gold-prefixed name`,
		)
		.action(async (names: string[], flags: FindFlags) => {
			const queries = names.map((n) => n.trim());
			if (queries.length === 0 || queries.some((q) => q === "")) {
				throw new UsageError("No name given.", 'Name at least one page by `title`, alias or file slug. Example: cf find "Nona Black-Jaw"');
			}
			const { vault: vaultDir } = resolveVault(flags, "find");
			const vault = buildVault(vaultDir, await readVaultFiles(vaultDir));
			const { byQuery, candidates } = matchNames(vault, queries);
			const out: string[] = [];
			let missed: { query: string; closest?: string } | undefined;
			for (const query of queries) {
				const hits = byQuery.get(query) ?? [];
				if (hits.length === 0) {
					missed ??= { query, closest: suggest(query, candidates) };
					continue;
				}
				out.push(`${query}  ${hits.length} ${hits.length === 1 ? "page" : "pages"}`);
				for (const page of hits) {
					out.push(`  ${page.path}`);
					const kind = page.frontmatter?.type;
					if (typeof kind === "string" && kind !== "") out.push(`    kind: ${kind}`);
					const title = typeof page.frontmatter?.title === "string" ? page.frontmatter.title.trim() : "";
					out.push(title === "" ? "    title: unset" : `    title: ${title}`);
					const aliases = stringValues(page.frontmatter?.aliases);
					if (aliases.length > 0) out.push(`    aliases: ${aliases.join(", ")}`);
					out.push(`    revealed: ${revealedOf(page)}`);
				}
				out.push("");
			}
			if (out.length > 0) process.stdout.write(out.join("\n"));
			if (missed !== undefined) {
				throw new UsageError(
					`No page answering to \`${missed.query}\` in the Wiki.${missed.closest ? ` Did you mean \`${missed.closest}\`?` : ""}`,
					`Name a page by \`title\`, alias or file slug; a prefix is enough. cf find "${missed.closest ?? missed.query}"`,
				);
			}
		});
}
