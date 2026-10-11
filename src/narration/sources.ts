import { pageViews, proseView } from "../check/views.ts";
import { buildLinkGraph } from "../vault/links.ts";
import type { Page, Vault } from "../vault/types.ts";
import { plainText, type SourceWords, wordsWithLines } from "./analyze.ts";

const wordCache = new WeakMap<Page, SourceWords>();
/**
 * A page as words a callout can echo: its frontmatter values and its prose as a reader sees it, with the
 * lines in `skip` left out. Every word keeps its line in the page source.
 */
export function pageWords(page: Page, skip?: [number, number]): SourceWords {
	let source = wordCache.get(page);
	if (!source) {
		const words: SourceWords["words"] = [];
		const sourceLines = pageViews(page).lines;
		for (let i = 1; i < page.frontmatterEndLine - 1; i++) {
			const value = (sourceLines[i] ?? "").replace(/^\s*(?:-\s*)?[\w-]+:\s*/, "");
			words.push(...wordsWithLines(plainText(value), i + 1));
		}
		words.push(...wordsWithLines(proseView(page).text));
		source = { label: page.path, words };
		wordCache.set(page, source);
	}
	if (!skip) return source;
	return {
		label: source.label,
		words: source.words.filter(({ line }) => line <= page.frontmatterEndLine || line < skip[0] || line > skip[1]),
	};
}

/** Every page `page` links to, in its frontmatter and body, other than itself. */
export function linkedPages(vault: Vault, page: Page): Page[] {
	const found = new Set<Page>();
	for (const { resolution } of buildLinkGraph(vault).links.get(page) ?? []) {
		if (resolution.status === "ok") for (const target of resolution.pages) if (target !== page) found.add(target);
	}
	return [...found];
}
