import type { Page } from "../vault/types.ts";

/**
 * The page's lines with the frontmatter emptied and every `%% %%` comment blanked, so line numbers
 * still match the file. For layers that read a page's text rather than its parsed tree.
 */
export function bodyLines(page: Page): string[] {
	let text = page.source;
	for (const c of [...page.comments].sort((a, b) => b.start - a.start)) {
		text = text.slice(0, c.start) + text.slice(c.start, c.end).replace(/[^\n]/g, " ") + text.slice(c.end);
	}
	return text.split("\n").map((l, i) => (i < page.frontmatterEndLine ? "" : l));
}
