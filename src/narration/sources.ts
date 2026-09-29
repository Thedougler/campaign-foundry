import { proseView } from "../check/prose.ts";
import { buildLinkGraph } from "../vault/links.ts";
import type { Callout, Page, Vault } from "../vault/types.ts";
import { plainText, type SourceWords, wordsWithLines } from "./analyze.ts";

/** 1-based inclusive line range of a callout's blockquote in its page. */
export function calloutLines(page: Page, callout: Callout): [number, number] {
	const lines = page.source.split("\n");
	let end = callout.line;
	while (end < lines.length && /^[ \t]*>/.test(lines[end] ?? "")) end++;
	return [callout.line, end];
}

/**
 * A page as words a callout can echo: its frontmatter values and its prose as a reader sees it, with the
 * lines in `skip` left out. Every word keeps its line in the page source.
 */
export function pageWords(page: Page, skip?: [number, number]): SourceWords {
	const words: SourceWords["words"] = [];
	const sourceLines = page.source.split("\n");
	for (let i = 1; i < page.frontmatterEndLine - 1; i++) {
		const value = (sourceLines[i] ?? "").replace(/^\s*(?:-\s*)?[\w-]+:\s*/, "");
		words.push(...wordsWithLines(plainText(value), i + 1));
	}
	for (const w of wordsWithLines(proseView(page).text)) {
		if (skip && w.line >= skip[0] && w.line <= skip[1]) continue;
		words.push(w);
	}
	return { label: page.path, words };
}

/** Every page `page` links to, in its frontmatter and body, other than itself. */
export function linkedPages(vault: Vault, page: Page): Page[] {
	const found = new Set<Page>();
	for (const { resolution } of buildLinkGraph(vault).links.get(page) ?? []) {
		if (resolution.status === "ok") for (const target of resolution.pages) if (target !== page) found.add(target);
	}
	return [...found];
}
