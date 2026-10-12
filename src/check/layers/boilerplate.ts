import type { Finding, Layer } from "../types.ts";
import { findTemplate } from "../../vault/vault.ts";
import type { Page, Template } from "../../vault/types.ts";
import { isUnownedProse, pageViews } from "../views.ts";
import { corpusProvenance } from "../provenance.ts";

const LABEL = /(\*{2,3}|_{2,3})([^*_\n]+?[.:])\1/g;
const FIELD = /^(?:[-*+]\s+|\d+[.)]\s+)?(\*{2,3}|_{2,3})([^*_\n]+?[.:])\1(?:\s+|$)/;
const TOKEN_LIST = /^[A-Z][A-Za-z]*(?:,\s*[A-Z][A-Za-z]*)+$/;
const labelKey = (label: string): string => label.replace(/\s+/g, " ").trim().toLowerCase();

/**
 * Repeated authorial sentences are boilerplate, outside the places templates hold in common
 * (frontmatter, headings, callouts, fences and fixed field labels). Published Item Properties and lines
 * proved against a page's named source corpus are intentional shared rules, not repeated authorial prose.
 */
export const boilerplateLayer: Layer = {
	name: "boilerplate",
	scope: "vault",
	description: "Repeated authorial prose, excluding published Item Properties and proved corpus lines.",
	async run(ctx) {
		const findings: Finding[] = [];
		const provenance = await corpusProvenance(ctx);
		const shared = new Map<string, { pages: Map<Page, number>; quote: string }>();
		const labels = new Map<Template, ReadonlySet<string>>();
		for (const page of ctx.vault.pages) {
			if (isUnownedProse(page)) continue;
			const type = page.frontmatter?.type;
			const kind = page.frontmatter?.kind;
			const template =
				typeof type === "string"
					? findTemplate(ctx.templates, type, typeof kind === "string" ? kind : undefined)
					: undefined;
			let required: ReadonlySet<string> | undefined;
			if (template) {
				required = labels.get(template);
				if (!required) {
					// Guidance comments also name fixed run-ins, such as Spell scaling and Item properties.
					required = new Set([...template.page.source.matchAll(LABEL)].map((match) => labelKey(match[2]!)));
					labels.set(template, required);
				}
			}
			const views = pageViews(page);
			for (const [line, sentences] of views.sentences) {
				if (provenance.lines.get(page)!.has(line)) continue;
				const source = views.lines[line - 1]!.trim();
				const field = FIELD.exec(source);
				const label = field && labelKey(field[2]!);
				const ownedLabel = label !== null && required?.has(label);
				// Only a structured token list is a template value, not an authored sentence or free-text fragment.
				if (ownedLabel && TOKEN_LIST.test(source.slice(field![0].length).trim())) continue;
				for (const { key, quote } of sentences) {
					if (ownedLabel && key === label) continue;
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
				const key = `${page.path}:${line}`;
				if (reported.has(key)) continue;
				reported.add(key);
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
