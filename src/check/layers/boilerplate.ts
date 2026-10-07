import type { Finding, Layer } from "../types.ts";
import type { Page } from "../../vault/types.ts";

const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });

/** Words that end an abbreviation rather than a sentence; a fragment ending in one joins the next sentence. */
const IS_ABBREVIATION: Record<string, true> = {
	ft: true, in: true, lb: true, mi: true, km: true, gp: true, sp: true, cp: true, pp: true, // measures and coin
	str: true, dex: true, con: true, int: true, wis: true, cha: true, // ability scores
	mr: true, mrs: true, ms: true, mx: true, dr: true, jr: true, sr: true, st: true, // names
	no: true, vs: true, vol: true, approx: true, prof: true, etc: true,
};

function endsWithAbbreviation(fragment: string): boolean {
	const match = /([a-zA-Z]+)\.$/.exec(fragment);
	return match !== null && (match[1]!.length === 1 || IS_ABBREVIATION[match[1]!.toLowerCase()] === true);
}

/** Sentences of a line: ICU boundaries, with fragments cut short at an abbreviation joined back. */
function sentences(line: string): string[] {
	const out: string[] = [];
	for (const { segment } of segmenter.segment(line)) {
		const prev = out[out.length - 1];
		if (prev !== undefined && endsWithAbbreviation(prev)) out[out.length - 1] = prev + segment;
		else out.push(segment);
	}
	return out;
}

/** A sentence worth comparing: its normalized key, and the original text to quote in a finding. */
interface Sentence {
	key: string;
	quote: string;
}

/** Sentences worth comparing per line: body prose, not frontmatter, headings, callouts, fences, tables or comments. */
function proseSentences(page: Page): Map<number, Sentence[]> {
	const sentencesByLine = new Map<number, Sentence[]>();
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
		const prose = trimmed
			.replace(/^[-*+]\s+/, "")
			.replace(/^\d+[.)]\s+/, "")
			// A bold field label (`**Weak to.**`) is template structure like a heading; only the field's content is prose.
			.replace(/^\*\*[^*]+\*\*\s*/, "")
			// A linked name is a name, not prose: it is wrapped in \u0001 so the length floor below counts only the words
			// around it. A Recap's `[[Thread]], still.` recurs on every Recap by template design.
			.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "\u0001$2\u0001")
			.replace(/\[\[([^\]]+)\]\]/g, "\u0001$1\u0001")
			.replace(/[*_`]/g, "")
			// Quoted speech is a record of words someone said; two pages may quote the same line. The narration around it
			// stays in the comparison.
			.replace(/"[^"\n]*"|“[^”\n]*”/g, '""');
		// Sentence boundaries need the original casing, so the key is normalized per sentence, not per line.
		const kept = sentences(prose)
			.filter((sentence) => sentence.replace(/\u0001[^\u0001]*\u0001/g, "").replace(/\s+/g, " ").trim().length >= 25)
			.map((sentence) => sentence.replace(/\u0001/g, ""))
			.map((sentence) => ({
				quote: sentence.trim(),
				key: sentence.replace(/\s+/g, " ").trim().toLowerCase(),
			}))
			.filter(({ key }) => /[a-z]/.test(key));
		if (kept.length > 0) sentencesByLine.set(line, kept);
	}
	return sentencesByLine;
}

/**
 * A good book never prints the same sentence twice. This layer flags sentences of body prose that appear verbatim
 * on more than one page, outside the places the templates hold in common (frontmatter, headings, callouts, fences).
 */
export const boilerplateLayer: Layer = {
	name: "boilerplate",
	description: "Verbatim prose shared across pages (every page is its own page).",
	async run(ctx) {
		const findings: Finding[] = [];
		const shared = new Map<string, { pages: Map<Page, number>; quote: string }>();
		for (const page of ctx.vault.pages) {
			// Generated pages quote the pages they catalogue; they are no one's prose.
			if (/(^|\/)(index|hot|log)\.md$/.test(page.path)) continue;
			for (const [line, sentences] of proseSentences(page)) {
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
				const others = [...pages].filter(([other]) => other !== page).map(([other, at]) => `${ctx.display(other.path)}:${at}`);
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
