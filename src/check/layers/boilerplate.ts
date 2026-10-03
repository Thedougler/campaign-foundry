import type { Finding, Layer } from "../types.ts";
import type { Page } from "../../vault/types.ts";

/** A line worth comparing: body prose, not frontmatter, headings, callouts, fences, tables or comments. */
function proseLines(page: Page): Map<number, string> {
	const lines = new Map<number, string>();
	const source = page.source.split("\n");
	let inFence = false;
	for (let i = 0; i < source.length; i++) {
		const raw = source[i]!;
		const line = i + 1;
		if (raw.trimStart().startsWith("```")) {
			inFence = !inFence;
			continue;
		}
		if (inFence || line <= page.frontmatterEndLine) continue;
		const trimmed = raw.trim();
		if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith(">") || trimmed.startsWith("|") || trimmed.startsWith("%%")) continue;
		const normal = trimmed
			.replace(/^[-*+]\s+/, "")
			.replace(/^\d+[.)]\s+/, "")
			.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
			.replace(/\[\[([^\]]+)\]\]/g, "$1")
			.replace(/[*_`]/g, "")
			.replace(/\s+/g, " ")
			.toLowerCase();
		if (normal.length >= 25 && /[a-z]/.test(normal)) lines.set(line, normal);
	}
	return lines;
}

/**
 * A good book never prints the same sentence twice. This layer flags prose lines that appear verbatim on more
 * than one page, outside the places the templates hold in common (frontmatter, headings, callouts, fences).
 */
export const boilerplateLayer: Layer = {
	name: "boilerplate",
	description: "Verbatim prose shared across pages (every page is its own page).",
	async run(ctx) {
		const findings: Finding[] = [];
		const shared = new Map<string, Map<Page, number>>();
		for (const page of ctx.vault.pages) {
			// Generated pages quote the pages they catalogue; they are no one's prose.
			if (/(^|\/)(index|hot|log)\.md$/.test(page.path)) continue;
			for (const [line, normal] of proseLines(page)) {
				const pages = shared.get(normal) ?? new Map<Page, number>();
				pages.set(page, line);
				shared.set(normal, pages);
			}
		}
		for (const pages of shared.values()) {
			if (pages.size < 2) continue;
			for (const [page, line] of pages) {
				const others = [...pages.keys()].filter((other) => other !== page).map((other) => other.name);
				findings.push({
					layer: "boilerplate",
					rule: "shared-line",
					severity: "warning",
					path: ctx.display(page.path),
					line,
					message: `This line is shared verbatim with ${others.join(", ")}.`,
					hint: `Write the line from what only this page holds, so no two pages read alike: each page's Where, Held by, Tell or Tactics line becomes its own, from its own facts.`,
				});
			}
		}
		return findings.sort((a, b) => a.path.localeCompare(b.path) || a.line - b.line);
	},
};
