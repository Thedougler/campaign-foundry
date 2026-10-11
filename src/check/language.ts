import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Page } from "../vault/types.ts";
import { cachedByPage, hash, lockfileSalt } from "./cache.ts";
import type { CachedFinding } from "./cache.ts";
import { projectWords, templateWords, toolRoot, vaultNameWords, vaultWordList } from "./prose.ts";
import type { CheckContext, Finding } from "./types.ts";
import { isProsePage } from "./views.ts";

/** Tool-specific inputs; selection, dictionaries, salt construction, cache and finding paths belong to the seam. */
export interface LanguageTool {
	name: string;
	/** Configuration files relative to the gate's repository root. Their contents invalidate cached answers. */
	config?: readonly string[];
	/** Harper imports the committed D&D dictionary; cspell reads it through its configuration. */
	projectDictionary?: boolean;
	/** Tool-specific policy fingerprint, e.g. disabled rules or synced Vale styles. */
	salt?(ctx: CheckContext): Promise<string> | string;
	/** Only cache misses reach the tool. The seam supplies the shared dictionary and fills finding paths. */
	compute(pages: Page[], ctx: CheckContext, words: string[]): Promise<Map<Page, CachedFinding[]>>;
}

/** Run a language tool over scoped prose pages, retaining answers for pages a scoped run does not evaluate. */
export async function runLanguageTool(tool: LanguageTool, ctx: CheckContext): Promise<Finding[]> {
	const pages = ctx.pages.filter(isProsePage);
	if (pages.length === 0) return [];
	const [vaultWords, dictionary, version, policy, config] = await Promise.all([
		vaultWordList(ctx.vault),
		tool.projectDictionary ? projectWords() : Promise.resolve([]),
		lockfileSalt(),
		tool.salt?.(ctx) ?? "",
		Promise.all((tool.config ?? []).map((file) => readFile(join(toolRoot, file), "utf8").catch(() => ""))),
	]);
	const words = [...vaultNameWords(ctx.vault), ...templateWords(ctx.templates), ...vaultWords, ...dictionary];
	// Names and kinds affect masking as well as dictionaries: equal word sets need not have equal name matches.
	const names = ctx.vault.pages.map((page) => [page.names, page.frontmatter?.type]);
	const salt = hash(JSON.stringify([version, policy, config, words, names]));
	const byPage = await cachedByPage(
		ctx.root,
		tool.name,
		salt,
		pages,
		(misses) => tool.compute(misses, ctx, words),
		ctx.pages.length < ctx.vault.pages.length,
	);
	return pages.flatMap((page) =>
		(byPage.get(page) ?? []).map((finding): Finding => ({ ...finding, path: ctx.display(page.path) })),
	);
}
