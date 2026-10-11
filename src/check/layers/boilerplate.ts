import type { Finding, Layer } from "../types.ts";
import type { Page } from "../../vault/types.ts";
import { isUnownedProse, pageViews } from "../views.ts";

/**
 * A good book never prints the same sentence twice. This layer flags sentences of body prose that appear verbatim
 * on more than one page, outside the places the templates hold in common (frontmatter, headings, callouts, fences).
 */
export const boilerplateLayer: Layer = {
	name: "boilerplate",
	scope: "vault",
	description: "Verbatim prose shared across pages (every page is its own page).",
	async run(ctx) {
		const findings: Finding[] = [];
		const shared = new Map<string, { pages: Map<Page, number>; quote: string }>();
		for (const page of ctx.vault.pages) {
			if (isUnownedProse(page)) continue;
			for (const [line, sentences] of pageViews(page).sentences) {
				for (const { key, quote } of sentences) {
					const entry = shared.get(key) ?? { pages: new Map<Page, number>(), quote };
					entry.pages.set(page, line);
					shared.set(key, entry);
				}
			}
		}
		// One finding per line even when several of its sentences are shared: the fix is one rewrite.
		const reported = new Set<string>();
		for (const { pages, quote } of shared.values()) {
			if (pages.size < 2) continue;
			const quoted = quote.length > 80 ? `${quote.slice(0, 77)}…` : quote;
			for (const [page, line] of pages) {
				if (!reported.add(`${page.path}:${line}`)) continue;
				const others = [...pages]
					.filter(([other]) => other !== page)
					.map(([other, at]) => `${ctx.display(other.path)}:${at}`);
				findings.push({
					layer: "boilerplate",
					rule: "shared-line",
					severity: "warning",
					path: ctx.display(page.path),
					line,
					message: `This sentence is shared verbatim with ${others.join(", ")}: "${quoted}"`,
					hint: `Recast this page's sentence from what only this page holds. Each sharer rewrites its own line, so pages outside your work stay as they are.`,
				});
			}
		}
		return findings.sort((a, b) => a.path.localeCompare(b.path) || a.line - b.line);
	},
};
