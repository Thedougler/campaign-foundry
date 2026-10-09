import type { Root } from "mdast";

/** A `[[target#heading#^block|alias]]` link or `![[embed]]`, with its position. */
export interface WikiLink {
	/** Exact source text, e.g. `![[Creature#Statblock]]`. */
	raw: string;
	embed: boolean;
	/** The name or vault path before any `#`, with no `.md`-stripping applied. Empty for same-page links. */
	target: string;
	/** Heading names after the first `#` (`[[A#H1#H2]]` gives two). */
	headings: string[];
	/** Block id after `#^`, without the caret. */
	block?: string;
	alias?: string;
	/** 1-based line in the file. */
	line: number;
	/** True when the link sits in a frontmatter string value. */
	frontmatter: boolean;
}

export interface Heading {
	depth: number;
	text: string;
	line: number;
	/** Index into the root's children. */
	index: number;
}

export interface Callout {
	/** Lowercased callout type, e.g. `narration`. */
	type: string;
	title: string;
	line: number;
	/** Text under the title line, `>` markers stripped and trimmed. */
	body: string;
}

/** An Obsidian `%% ... %%` comment. Offsets index the page source. */
export interface Comment {
	start: number;
	end: number;
	line: number;
	endLine: number;
	text: string;
}

export interface Page {
	/** Vault-relative, posix separators, with `.md`. */
	path: string;
	/** Basename without `.md`: the file slug (ADR 0028). Stable and path-safe, but not the page's name. */
	slug: string;
	/** The page's name: frontmatter `title`, else the slug (ADR 0028). An alias is another handle, never the name. */
	name: string;
	/** Every name the page answers to, in resolution order: `title`, each `aliases` entry, the slug; duplicates removed case-insensitively. */
	names: string[];
	source: string;
	/** Parsed frontmatter, or null when the page has none or it is not a map. */
	frontmatter: Record<string, unknown> | null;
	frontmatterError?: string;
	/** Line of the closing `---`, or 0 when there is no frontmatter. */
	frontmatterEndLine: number;
	/** 1-based line of each frontmatter key. */
	frontmatterKeyLines: Record<string, number>;
	/** Frontmatter values that are unquoted wikilinks (YAML read them as nested lists). */
	unquotedFrontmatterLinks: { key: string; line: number }[];
	/** mdast of the body with `%% %%` comments blanked out. */
	tree: Root;
	headings: Heading[];
	callouts: Callout[];
	comments: Comment[];
	links: WikiLink[];
	/** Block ids (`^id`) defined on the page. */
	blocks: Set<string>;
}

export interface Vault {
	/** Absolute vault directory. */
	dir: string;
	pages: Page[];
	pageByPath: Map<string, Page>;
	/** Vault-relative paths of non-markdown files, for embed resolution. */
	attachments: string[];
}

/** A page kind's template, read from `templates/`. */
export interface Template {
	/** Template file name without `.md`, e.g. `Location - Region`. */
	name: string;
	type: string;
	kind?: string;
	/** Frontmatter keys in template order, with the template's own values. */
	keys: { key: string; value: unknown }[];
	/** `##` headings in template order, optional ones included. */
	sections: string[];
	/** The `##` headings whose guidance comment opens with `Optional`: a page may leave them out, and keeps them in template order when it has them. */
	optional: Set<string>;
	/** Callout types in the template. */
	callouts: string[];
	page: Page;
}

export interface TemplateSet {
	byName: Map<string, Template>;
	/** Every valid `type`, with its valid `kind` values (empty when the type has none). */
	types: Map<string, string[]>;
}
