import { parseDocument } from "yaml";
import type { WikiLink } from "./types.ts";

/**
 * The Obsidian dialect the Wiki is written in, in one place: the wikilink and its display text, the callout
 * title, the block id, the slug and the page-name rules (ADR 0028). Every consumer imports these; renderers
 * (Foundry HTML, Notion blocks) keep only their output stage.
 */

/** `![[target#heading#^block|alias]]`; the inner text never spans lines or nests brackets. */
export const WIKILINK = /(!?)\[\[([^[\]\n]*)\]\]/g;

/** A callout's title line, `> [!type+-] Title`: the type word, its fold mark, and the title to the line's end. */
export const CALLOUT_TITLE = /^\[!([^\]\s]+)\][+-]?[ \t]*([^\n]*)/;

/** A block id ending a line (`text ^id`, or `^id` on a line of its own): the id without its caret. */
export const BLOCK_ID = /(?:^|\s)\^([A-Za-z0-9-]+)\s*$/;

/** What Obsidian shows for the inside of a wikilink, and where in `inner` that text starts. */
export interface WikilinkDisplay {
	text: string;
	at: number;
	/** True when a `|alias` supplied the text; false when it is the target's or heading's own name. */
	aliased: boolean;
}

/** The text Obsidian shows for `[[target#heading|alias]]`: the alias, else the page name, else the heading. */
export function wikilinkDisplay(inner: string): WikilinkDisplay {
	const bar = /(?<!\\)\|/.exec(inner) ?? /\\\|/.exec(inner);
	if (bar) {
		const skip = bar[0].length;
		const alias = inner.slice(bar.index + skip);
		const lead = alias.length - alias.trimStart().length;
		return { text: alias.trim(), at: bar.index + skip + lead, aliased: true };
	}
	const [target = "", ...fragments] = inner.split("#");
	const name = target.trim().split("/").pop() ?? "";
	if (name !== "") return { text: name, at: 0, aliased: false };
	const heading = fragments.find((f) => !f.trim().startsWith("^"));
	return { text: heading?.trim() ?? "", at: 0, aliased: false };
}

/** `text` with every line's trailing block id taken out: what a reader reads, not what a link points at. */
export function stripBlockIds(text: string): string {
	return text
		.split("\n")
		.map((line) => line.replace(BLOCK_ID, ""))
		.join("\n");
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

/** A frontmatter value as a list of trimmed non-empty strings: a scalar becomes one entry, other shapes read as absent. */
export function stringValues(value: unknown): string[] {
	if (typeof value === "string") return value.trim() === "" ? [] : [value.trim()];
	return Array.isArray(value)
		? value.filter((v): v is string => typeof v === "string" && v.trim() !== "").map((v) => v.trim())
		: [];
}

/** A page's names in resolution order (ADR 0028): the frontmatter `title`, then each `aliases` entry, then the slug. */
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

/** Lowercase, hyphenated, apostrophes dropped: the slug form of a name (ADR 0028). */
export function slugify(name: string): string {
	return name
		.toLowerCase()
		.replace(/[''’]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/** A markdown file's frontmatter `title` and `aliases`, read leniently: broken YAML and blank values give nothing (ADR 0028). */
export function frontmatterNames(source: string): { title?: string; aliases?: string[] } {
	const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
	if (!match) return {};
	const doc = parseDocument(match[1] ?? "");
	if (doc.errors.length > 0) return {};
	const data = doc.toJS();
	if (data === null || typeof data !== "object" || Array.isArray(data)) return {};
	const fm = data as Record<string, unknown>;
	const title = stringValues(fm.title)[0];
	const aliases = stringValues(fm.aliases);
	return { ...(title === undefined ? {} : { title }), ...(aliases.length === 0 ? {} : { aliases }) };
}
