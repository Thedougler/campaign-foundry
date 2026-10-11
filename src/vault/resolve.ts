import { relative, resolve, sep } from "node:path";
import { UsageError } from "../check/errors.ts";
import { suggest } from "../check/util.ts";
import type { Page, Vault } from "./types.ts";

export interface ResolvePageOptions {
	/** A Campaign folder that settles pages sharing a name before the refusal: the one page inside it wins. */
	campaignFolder?: string;
	/**
	 * The command's own usage hint under a refusal: given the vault path of a page that answers (empty when
	 * nothing did), so each command points at its own invocation.
	 */
	hint: (candidate: string) => string;
}

/**
 * A page named on the command line: `Mara Voss`, `[[Mara Voss]]`, `ashes-of-the-crown/NPCs/Mara Voss.md` or a
 * path from the working directory. A name several pages answer to is settled by `campaignFolder` when exactly
 * one of them sits inside it; otherwise the refusal lists them, and a name nothing answers to carries the
 * did-you-mean.
 */
export function resolvePage(vault: Vault, input: string, options: ResolvePageOptions): Page {
	const raw = input.trim().replace(/^\[\[(.*)\]\]$/, "$1");
	if (raw.includes("/") || raw.endsWith(".md")) {
		const rel = raw.endsWith(".md") ? raw : `${raw}.md`;
		for (const candidate of [
			rel.replace(/^\/+/, ""),
			relative(vault.dir, resolve(process.cwd(), rel)).split(sep).join("/"),
		]) {
			const page = vault.pageByPath.get(candidate);
			if (page) return page;
		}
	} else {
		const wanted = raw.toLowerCase();
		const named = vault.pages.filter((p) => p.names.some((n) => n.toLowerCase() === wanted));
		if (named.length === 1) return named[0]!;
		if (named.length > 1) {
			if (options.campaignFolder !== undefined) {
				const here = named.filter((p) => p.path.startsWith(`${options.campaignFolder}/`));
				if (here.length === 1) return here[0]!;
			}
			throw new UsageError(
				`More than one page is named \`${raw}\`: ${named.map((p) => p.path).join(", ")}.`,
				`Pass the vault path of the one you mean. ${options.hint(named[0]!.path)}`,
			);
		}
	}
	const closest = suggest(
		raw.replace(/\.md$/, "").split("/").at(-1) ?? raw,
		vault.pages.flatMap((p) => p.names),
	);
	throw new UsageError(
		`No page \`${raw}\` in the Wiki.${closest ? ` Did you mean \`${closest}\`?` : ""}`,
		`Name a page that exists, by name or vault path. ${options.hint(closest ?? "")}`,
	);
}
