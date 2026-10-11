import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { parseWikiLinkText, WIKILINK } from "./dialect.ts";
import { normalizeTarget } from "./links.ts";
import { blank } from "./parse.ts";
import type { Page, WikiLink } from "./types.ts";

/** One wikilink or embed the rewriter sees: the parsed link, its raw inner text, and whether it sits in a table row. */
export interface LinkSpan {
	link: WikiLink;
	/** The text between the brackets, verbatim: escaped pipes and untrimmed edges included. */
	inner: string;
	/** True when the link sits in a GFM table row, where an alias pipe must be written `\|`. */
	table: boolean;
	/** Source offsets of the whole link, indexing the page's current source. */
	start: number;
	end: number;
}

const masker = unified().use(remarkParse).use(remarkFrontmatter, ["yaml"]).use(remarkGfm);

function collectRanges(node: unknown, code: [number, number][], tables: [number, number][]): void {
	const n = node as {
		type?: string;
		position?: { start?: { offset?: number }; end?: { offset?: number } };
		children?: unknown[];
	};
	if (n.position) {
		const start = n.position.start?.offset;
		const end = n.position.end?.offset;
		if (start !== undefined && end !== undefined) {
			if (n.type === "code" || n.type === "inlineCode") code.push([start, end]);
			if (n.type === "table") tables.push([start, end]);
		}
	}
	for (const child of n.children ?? []) collectRanges(child, code, tables);
}

/**
 * Every wikilink and embed on the page at source offsets: code spans, code blocks and `%% %%` comments are masked
 * out first, exactly as `parsePage` masks them. The frontmatter is left in (its fence is not masked), so links in
 * quoted string values rewrite like body links. Tables are parsed, not guessed from prose, so links in rows are
 * flagged and their alias pipes can be escaped.
 */
export function linkSpans(page: Page): LinkSpan[] {
	const ranges: [number, number][] = page.comments.map((c) => [c.start, c.end]);
	const tables: [number, number][] = [];
	const commentless = blank(page.source, ranges, true);
	collectRanges(masker.parse(commentless), ranges, tables);
	ranges.sort((a, b) => a[0] - b[0]);
	const masked = blank(page.source, ranges, false);
	const spans: LinkSpan[] = [];
	let line = 1;
	let cursor = 0;
	for (const match of masked.matchAll(WIKILINK)) {
		const start = match.index ?? 0;
		line += page.source.slice(cursor, start).split("\n").length - 1;
		cursor = start;
		spans.push({
			link: parseWikiLinkText(match[0], match[1] === "!", match[2] ?? "", line, false),
			inner: match[2] ?? "",
			table: tables.some(([a, b]) => start >= a && start < b),
			start,
			end: start + match[0].length,
		});
	}
	return spans;
}

/** One planned `[[old]]` -> `[[new]]` on one line of one page; `start`/`end` offset the page's current source. */
export interface LinkEdit {
	line: number;
	from: string;
	to: string;
	start: number;
	end: number;
}

/**
 * Every link edit that rewrites links naming one of `keys`, across `pages`: a span matches when its target,
 * compared as the link graph compares (`normalizeTarget`), is a key. `render` writes the new link — embed marker,
 * fragments and display text survive only as it spells them back — and returning the span's own raw text, or
 * undefined, leaves the link alone.
 */
export function planLinkEdits(
	pages: Iterable<Page>,
	keys: ReadonlySet<string>,
	render: (span: LinkSpan) => string | undefined,
): Map<Page, LinkEdit[]> {
	const edits = new Map<Page, LinkEdit[]>();
	for (const page of pages) {
		const spans = linkSpans(page);
		if (spans.length === 0) continue;
		const found: LinkEdit[] = [];
		for (const span of spans) {
			if (span.link.target === "" || !keys.has(normalizeTarget(span.link.target))) continue;
			const to = render(span);
			if (to === undefined || to === span.link.raw) continue;
			found.push({ line: span.link.line, from: span.link.raw, to, start: span.start, end: span.end });
		}
		if (found.length > 0) edits.set(page, found);
	}
	return edits;
}

/** Applies edits back to front, so the offsets of the pre-edit source stay valid. */
export function applyEdits(source: string, edits: LinkEdit[]): string {
	let out = source;
	for (const edit of [...edits].sort((a, b) => b.start - a.start)) {
		out = out.slice(0, edit.start) + edit.to + out.slice(edit.end);
	}
	return out;
}
