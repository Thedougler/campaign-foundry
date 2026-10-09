import type { Blockquote, Heading as MdHeading, Root, RootContent } from "mdast";
import { toString } from "mdast-util-to-string";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { parseDocument } from "yaml";
import type { Callout, Comment, Heading, Page, WikiLink } from "./types.ts";

const processor = unified().use(remarkParse).use(remarkFrontmatter, ["yaml"]);

/** `![[target#heading#^block|alias]]`; the inner text never spans lines or nests brackets. */
const WIKILINK = /(!?)\[\[([^[\]\n]*)\]\]/g;
const CALLOUT_TITLE = /^\[!([^\]\s]+)\][+-]?[ \t]*(.*)$/;
const BLOCK_ID = /(?:^|\s)\^([A-Za-z0-9-]+)\s*$/;

/** A frontmatter value as a list of trimmed non-empty strings: a scalar becomes one entry, other shapes read as absent. */
function stringValues(value: unknown): string[] {
	if (typeof value === "string") return value.trim() === "" ? [] : [value.trim()];
	return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string" && v.trim() !== "").map((v) => v.trim()) : [];
}

/**
 * A page's names in resolution order (ADR 0028): the frontmatter `title`, then each `aliases` entry, then the slug.
 * A blank `title` counts as unset. Duplicates are removed case-insensitively, first spelling wins.
 * Display uses the title, then the first alias; the slug is a lookup handle, never a display name.
 */
export function pageNames(frontmatter: Record<string, unknown> | null, slug: string): string[] {
	const seen = new Set<string>();
	const out: string[] = [];
	for (const name of [...stringValues(frontmatter?.title), ...stringValues(frontmatter?.aliases), slug]) {
		const key = name.toLowerCase();
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(name);
	}
	return out;
}

/** Lowercase, hyphenated, no spaces: the slug form of a name (ADR 0028). */
export function slugify(name: string): string {
	return name
		.toLowerCase()
		.replace(/[''’]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/** Replaces every non-newline character in the ranges with a space, so offsets and lines survive. */
export function blank(source: string, ranges: [number, number][], keepQuoteMarkers: boolean): string {
	if (ranges.length === 0) return source;
	let out = "";
	let cursor = 0;
	for (const [start, end] of ranges) {
		out += source.slice(cursor, start);
		const chunk = source.slice(start, end);
		let first = true;
		out += chunk
			.split("\n")
			.map((line) => {
				const wasFirst = first;
				first = false;
				if (keepQuoteMarkers && !wasFirst) {
					// A callout's `>` markers on continuation lines must survive or the callout would end.
					const marker = /^[ \t]*(?:>[ \t]?)*/.exec(line)?.[0] ?? "";
					return marker + " ".repeat(line.length - marker.length);
				}
				return " ".repeat(line.length);
			})
			.join("\n");
		cursor = end;
	}
	return out + source.slice(cursor);
}

function lineStarts(source: string): number[] {
	const starts = [0];
	for (let i = 0; i < source.length; i++) if (source[i] === "\n") starts.push(i + 1);
	return starts;
}

function lineAt(starts: number[], offset: number): number {
	let lo = 0;
	let hi = starts.length - 1;
	while (lo < hi) {
		const mid = (lo + hi + 1) >> 1;
		if ((starts[mid] ?? 0) <= offset) lo = mid;
		else hi = mid - 1;
	}
	return lo + 1;
}

function walk(node: RootContent | Root, visit: (n: RootContent) => void): void {
	if ("children" in node) {
		for (const child of node.children as RootContent[]) {
			visit(child);
			walk(child, visit);
		}
	}
}

/** Splits `target#H1#H2#^block|alias` into its parts. */
export function parseWikiLinkText(
	raw: string,
	embed: boolean,
	inner: string,
	line: number,
	frontmatter: boolean,
): WikiLink {
	const bar = inner.indexOf("|");
	const targetPart = (bar === -1 ? inner : inner.slice(0, bar)).replace(/\\$/, "").trim();
	const alias = bar === -1 ? undefined : inner.slice(bar + 1).trim();
	const [target = "", ...fragments] = targetPart.split("#");
	const headings: string[] = [];
	let block: string | undefined;
	for (const fragment of fragments) {
		const f = fragment.trim();
		if (f.startsWith("^")) block = f.slice(1);
		else headings.push(f);
	}
	const link: WikiLink = { raw, embed, target: target.trim(), headings, line, frontmatter };
	if (block !== undefined) link.block = block;
	if (alias !== undefined) link.alias = alias;
	return link;
}

function findLinks(masked: string, starts: number[], frontmatterEnd: number, out: WikiLink[]): void {
	for (const match of masked.matchAll(WIKILINK)) {
		const offset = match.index ?? 0;
		if (offset < frontmatterEnd) continue;
		out.push(
			parseWikiLinkText(match[0], match[1] === "!", match[2] ?? "", lineAt(starts, offset), false),
		);
	}
}

export function parsePage(path: string, source: string): Page {
	const slug = path.slice(path.lastIndexOf("/") + 1).replace(/\.md$/, "");

	// Pass 1: find code, so `%%` inside code is not read as a comment.
	const first = processor.parse(source);
	const codeRanges: [number, number][] = [];
	walk(first, (n) => {
		if ((n.type === "code" || n.type === "inlineCode") && n.position) {
			codeRanges.push([n.position.start.offset ?? 0, n.position.end.offset ?? 0]);
		}
	});
	const yamlNode = first.children.find((n) => n.type === "yaml");
	const frontmatterEnd = yamlNode?.position?.end.offset ?? 0;
	if (yamlNode?.position) codeRanges.push([yamlNode.position.start.offset ?? 0, frontmatterEnd]);
	codeRanges.sort((a, b) => a[0] - b[0]);
	const codeMasked = blank(source, codeRanges, false);

	const starts = lineStarts(source);
	const comments: Comment[] = [];
	const commentRanges: [number, number][] = [];
	for (const match of codeMasked.matchAll(/%%[\s\S]*?%%/g)) {
		const start = match.index ?? 0;
		const end = start + match[0].length;
		comments.push({
			start,
			end,
			line: lineAt(starts, start),
			endLine: lineAt(starts, end - 1),
			text: source.slice(start + 2, end - 2).trim(),
		});
		commentRanges.push([start, end]);
	}

	// Pass 2: parse with the comments blanked so their text never becomes headings, callouts or links.
	const commentless = blank(source, commentRanges, true);
	const tree = commentRanges.length === 0 ? first : processor.parse(commentless);
	const linkText = blank(commentless, codeRanges, false);

	const headings: Heading[] = [];
	tree.children.forEach((node, index) => {
		if (node.type !== "heading") return;
		const h = node as MdHeading;
		headings.push({
			depth: h.depth,
			text: toString(h).trim(),
			line: h.position?.start.line ?? 0,
			index,
		});
	});

	const callouts: Callout[] = [];
	walk(tree, (n) => {
		if (n.type !== "blockquote" || !n.position) return;
		const quote = n as Blockquote;
		const raw = commentless.slice(quote.position?.start.offset ?? 0, quote.position?.end.offset ?? 0);
		const lines = raw.split("\n").map((l) => l.replace(/^[ \t]*(?:>[ \t]?)+/, ""));
		const head = CALLOUT_TITLE.exec(lines[0] ?? "");
		if (!head) return;
		callouts.push({
			type: (head[1] ?? "").toLowerCase(),
			title: (head[2] ?? "").trim(),
			line: quote.position?.start.line ?? 0,
			body: lines.slice(1).join("\n").trim(),
		});
	});

	const links: WikiLink[] = [];
	findLinks(linkText, starts, frontmatterEnd, links);

	const blocks = new Set<string>();
	for (const line of linkText.slice(frontmatterEnd).split("\n")) {
		const id = BLOCK_ID.exec(line)?.[1];
		if (id) blocks.add(id);
	}

	const page: Page = {
		path,
		slug,
		name: "",
		names: [slug],
		source,
		frontmatter: null,
		frontmatterEndLine: 0,
		frontmatterKeyLines: {},
		unquotedFrontmatterLinks: [],
		tree,
		headings,
		callouts,
		comments,
		links,
		blocks,
	};
	if (yamlNode?.position && yamlNode.type === "yaml") readFrontmatter(page, yamlNode.value, yamlNode.position.start.line);
	if (yamlNode?.position) page.frontmatterEndLine = yamlNode.position.end.line;
	page.names = pageNames(page.frontmatter, slug);
	// Titles own display names; aliases can name older pages without turning their slug into prose.
	page.name = stringValues(page.frontmatter?.title)[0] ?? stringValues(page.frontmatter?.aliases)[0] ?? "";
	return page;
}

function readFrontmatter(page: Page, yamlText: string, fenceLine: number): void {
	const doc = parseDocument(yamlText);
	if (doc.errors.length > 0) {
		page.frontmatterError = (doc.errors[0]?.message.split("\n")[0] ?? "invalid YAML").replace(/:$/, "");
		return;
	}
	const data = doc.toJS() as unknown;
	if (data === null || typeof data !== "object" || Array.isArray(data)) {
		if (data !== null) page.frontmatterError = "frontmatter must be a YAML map of `key: value` lines";
		return;
	}
	page.frontmatter = data as Record<string, unknown>;
	const lines = yamlText.split("\n");
	const lineOf = (needle: string | RegExp): number => {
		const i = lines.findIndex((l) => (typeof needle === "string" ? l.includes(needle) : needle.test(l)));
		return i === -1 ? 0 : fenceLine + 1 + i;
	};
	for (const key of Object.keys(page.frontmatter)) {
		const keyLine = lineOf(new RegExp(`^["']?${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']?\\s*:`));
		page.frontmatterKeyLines[key] = keyLine || fenceLine + 1;
	}
	const visit = (key: string, value: unknown): void => {
		if (typeof value === "string") {
			for (const m of value.matchAll(WIKILINK)) {
				const line = lineOf(m[0]) || page.frontmatterKeyLines[key] || fenceLine + 1;
				page.links.push(parseWikiLinkText(m[0], m[1] === "!", m[2] ?? "", line, true));
			}
		} else if (Array.isArray(value)) {
			if (value.some((v) => Array.isArray(v))) {
				page.unquotedFrontmatterLinks.push({ key, line: page.frontmatterKeyLines[key] ?? fenceLine + 1 });
			}
			for (const v of value) visit(key, v);
		} else if (value && typeof value === "object") {
			for (const v of Object.values(value)) visit(key, v);
		}
	};
	for (const [key, value] of Object.entries(page.frontmatter)) visit(key, value);
}
