import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Root, RootContent } from "mdast";
import type { Page, TemplateSet, Vault } from "../vault/types.ts";

/**
 * What the prose layers read: a page body as a reader sees it, with a map back to the source so a finding
 * lands on the right line. Every line break survives, so a line in the view is the same line in the page.
 */
export interface ProseView {
	text: string;
	/** For each UTF-16 unit of `text`, the offset in the page source it came from. */
	map: number[];
	/** `[start, end)` of each page name in `text`: an unaliased link's name, or a masked name's stand-in. */
	names: Range[];
}

/** Generated catalog pages are machine output: the prose layers skip them. `log.md` is written by the Agent and is checked. */
export function isProsePage(page: Page): boolean {
	return page.name !== "index";
}

/** Pages the prose layers read. */
export function prosePages(vault: Vault): Page[] {
	return vault.pages.filter(isProsePage);
}

/** Offsets of the start of each line in `source`. */
export function lineStarts(source: string): number[] {
	const starts = [0];
	for (let i = 0; i < source.length; i++) if (source[i] === "\n") starts.push(i + 1);
	return starts;
}

/** 1-based line containing `offset`, given `lineStarts`. */
export function lineAt(starts: number[], offset: number): number {
	let lo = 0;
	let hi = starts.length - 1;
	while (lo < hi) {
		const mid = (lo + hi + 1) >> 1;
		if ((starts[mid] ?? 0) <= offset) lo = mid;
		else hi = mid - 1;
	}
	return lo + 1;
}

type Range = [number, number];

/** Frontmatter, fenced and indented code, raw HTML and `%% %%` comments: nothing a reader reads as prose. */
function droppedRanges(page: Page): Range[] {
	const ranges: Range[] = page.comments.map((c) => [c.start, c.end]);
	const visit = (node: Root | RootContent): void => {
		if (node.type === "yaml" || node.type === "code" || node.type === "html") {
			if (node.position) ranges.push([node.position.start.offset ?? 0, node.position.end.offset ?? 0]);
			return;
		}
		if ("children" in node) for (const child of node.children as RootContent[]) visit(child);
	};
	visit(page.tree);
	return ranges.sort((a, b) => a[0] - b[0]);
}

interface Edit {
	start: number;
	end: number;
	/** Replacement text and, for each of its units, the source offset it maps to. */
	text: string;
	from: number[];
	/** The replacement is a page name or its stand-in. */
	name?: boolean;
}

const NEWLINES = /\n/g;

function keepNewlines(source: string, [start, end]: Range): Edit {
	const text = "\n".repeat(source.slice(start, end).match(NEWLINES)?.length ?? 0);
	return { start, end, text, from: Array.from({ length: text.length }, () => start) };
}

/** What Obsidian shows for `[[target#heading|alias]]`, and where in the source that text starts. */
function wikilinkDisplay(inner: string, innerStart: number): { text: string; at: number; named: boolean } {
	const bar = /(?<!\\)\|/.exec(inner) ?? /\\\|/.exec(inner);
	if (bar) {
		const skip = bar[0].length;
		const alias = inner.slice(bar.index + skip);
		const lead = alias.length - alias.trimStart().length;
		return { text: alias.trim(), at: innerStart + bar.index + skip + lead, named: false };
	}
	const [target = "", ...fragments] = inner.split("#");
	const name = target.trim().split("/").pop() ?? "";
	if (name !== "") return { text: name, at: innerStart, named: true };
	const heading = fragments.find((f) => !f.trim().startsWith("^"));
	return { text: heading?.trim() ?? "", at: innerStart, named: true };
}

const WIKILINK = /(!?)\[\[([^[\]\n]*)\]\]/g;
const CALLOUT_MARKER = /(?<=^[ \t]*(?:>[ \t]?)+)\[![^\]\s]+\][+-]?[ \t]?/gm;
const BLOCK_ID = /[ \t]+\^[A-Za-z0-9-]+[ \t]*$/gm;

/**
 * The page body as prose: frontmatter, code, HTML and `%% %%` comments removed; each wikilink reduced to the
 * text Obsidian shows (its alias, else its page name); embeds, callout markers and `^block` ids removed.
 * Build the same view every time for the same page: results are cached on the page object.
 */
const caches = { show: new WeakMap<Page, ProseView>(), mask: new WeakMap<Page, ProseView>() };

/**
 * What a page name becomes in a masked view, so the name's own words (`Fire Watch`, `Countless`) cannot trip a
 * wording rule. A page of a concrete kind reads as that kind's common noun, so a literal subject stays literal: the
 * Saltwright that carried passengers is a `Ship` that carried them, which the rules' exception lists know. Every other
 * page (a Quest, a Scene, Lore) reads as a made-up word, `Placenamea`, `Placenameb`, …, which the rules treat as the
 * abstraction it is. Capitalised like the name it replaces.
 */
const MASKED_NAME = "Placename";
const STAND_IN: Record<string, string> = {
	NPC: "Person",
	PC: "Person",
	Deity: "Person",
	// An animate being: the rules' exception lists name beings as `person`, not `creature`.
	Creature: "Person",
	Faction: "People",
	Vehicle: "Ship",
	Item: "Object",
	Location: "Place",
};

interface NameMask {
	pattern: RegExp;
	/** Each name's own made-up word: no source holds it (the narration layer's echo check). */
	token: Map<string, string>;
	/** Each name's word in a masked view: its kind's noun, else its made-up word. */
	standIn: Map<string, string>;
}

const nameMaskCache = new WeakMap<Vault, NameMask | null>();

/** Every page name and alias in the vault: one whole-word, case-sensitive pattern (longest first) and each name's mask words. */
function nameMask(vault: Vault): NameMask | null {
	if (nameMaskCache.has(vault)) return nameMaskCache.get(vault) ?? null;
	const kinds = new Map<string, unknown>();
	for (const page of vault.pages) {
		if (!isProsePage(page)) continue;
		const type = page.frontmatter?.type;
		if (!kinds.has(page.name)) kinds.set(page.name, type);
		const aliases = page.frontmatter?.aliases;
		for (const alias of Array.isArray(aliases) ? aliases : [aliases]) if (typeof alias === "string" && !kinds.has(alias)) kinds.set(alias, type);
	}
	const sorted = [...kinds.keys()].filter((n) => /\p{Lu}/u.test(n)).sort((a, b) => b.length - a.length);
	const letters = (i: number): string => (i < 26 ? "" : letters(Math.floor(i / 26) - 1)) + String.fromCharCode(97 + (i % 26));
	const token = new Map(sorted.map((n, i) => [n, MASKED_NAME + letters(i)]));
	// ponytail: case-sensitive whole-word match, so a sentence-initial common word that is also a page name ("Passage") is masked too.
	const mask =
		sorted.length === 0
			? null
			: {
					pattern: new RegExp(`(?<![\\p{L}\\p{N}])(?:${sorted.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?![\\p{L}\\p{N}])`, "gu"),
					token,
					standIn: new Map(sorted.map((n) => [n, STAND_IN[String(kinds.get(n))] ?? token.get(n) ?? MASKED_NAME])),
				};
	nameMaskCache.set(vault, mask);
	return mask;
}

/** `text` with each bare page name or alias swapped for its mask word. */
export function maskNames(text: string, vault: Vault): string {
	const mask = nameMask(vault);
	return mask ? text.replace(mask.pattern, (name) => mask.token.get(name) ?? MASKED_NAME) : text;
}

/**
 * Without `mask`, a link shows its page name. With the vault as `mask`, each unaliased link and each bare page
 * name or alias becomes its stand-in (see `MASKED_NAME`): the style layer uses it, because a name such as
 * `Fire Watch` or `Countless` is not the DM's prose.
 */
export function proseView(page: Page, mask?: Vault): ProseView {
	const cache = caches[mask ? "mask" : "show"];
	const cached = cache.get(page);
	if (cached) return cached;
	const source = page.source;
	const edits: Edit[] = [];
	const dropped = droppedRanges(page);
	let masked = source;
	for (const range of dropped) {
		edits.push(keepNewlines(source, range));
		masked = masked.slice(0, range[0]) + masked.slice(range[0], range[1]).replace(/[^\n]/g, " ") + masked.slice(range[1]);
	}

	for (const m of masked.matchAll(WIKILINK)) {
		const start = m.index ?? 0;
		const end = start + m[0].length;
		if (m[1] === "!") {
			edits.push({ start, end, text: "", from: [] });
			continue;
		}
		const shown = wikilinkDisplay(m[2] ?? "", start + 2);
		const text = mask && shown.named ? (nameMask(mask)?.standIn.get(shown.text) ?? MASKED_NAME) : shown.text;
		edits.push({ start, end, text, from: Array.from({ length: text.length }, (_, i) => shown.at + i), name: shown.named });
	}
	const names = mask ? nameMask(mask) : null;
	if (names) {
		for (const m of masked.matchAll(names.pattern)) {
			const start = m.index ?? 0;
			const text = names.standIn.get(m[0]) ?? MASKED_NAME;
			edits.push({ start, end: start + m[0].length, text, from: Array.from({ length: text.length }, () => start), name: true });
		}
	}
	for (const m of masked.matchAll(CALLOUT_MARKER)) {
		const start = m.index ?? 0;
		edits.push({ start, end: start + m[0].length, text: "", from: [] });
	}
	for (const m of masked.matchAll(BLOCK_ID)) {
		const start = m.index ?? 0;
		edits.push({ start, end: start + m[0].length, text: "", from: [] });
	}

	edits.sort((a, b) => a.start - b.start || b.end - a.end);
	let text = "";
	const map: number[] = [];
	const nameRanges: Range[] = [];
	let cursor = 0;
	const copy = (from: number, to: number): void => {
		text += source.slice(from, to);
		for (let i = from; i < to; i++) map.push(i);
	};
	for (const edit of edits) {
		if (edit.start < cursor) continue;
		copy(cursor, edit.start);
		if (edit.name) nameRanges.push([text.length, text.length + edit.text.length]);
		text += edit.text;
		map.push(...edit.from);
		cursor = edit.end;
	}
	copy(cursor, source.length);
	const view = { text, map, names: nameRanges };
	cache.set(page, view);
	return view;
}

/** The source offset of a UTF-16 index in the view (the last offset when the index is at the end). */
export function sourceOffset(view: ProseView, index: number): number {
	return view.map[Math.min(index, view.map.length - 1)] ?? 0;
}

/** Splits a page name into the words a reader would spell-check: `Gull's Errand` gives `Gull's`, `Gull`, `Errand`. */
export function nameWords(name: string): string[] {
	const words = new Set<string>();
	for (const token of name.split(/[\s\-–—_/,:;()[\]"“”]+/)) {
		const word = token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
		if (!/\p{L}/u.test(word)) continue;
		words.add(word);
		for (const part of word.split(/['’]/)) if (/\p{L}{2,}/u.test(part)) words.add(part);
	}
	return [...words];
}

const dictionaryCache = new WeakMap<Vault, string[]>();

/**
 * Every word in the vault's page names (and in each page's `aliases`), so in-world names pass the spelling
 * and grammar layers without a hand-kept list.
 */
export function vaultNameWords(vault: Vault): string[] {
	const cached = dictionaryCache.get(vault);
	if (cached) return cached;
	const words = new Set<string>();
	for (const page of vault.pages) {
		for (const word of nameWords(page.name)) words.add(word);
		const aliases = page.frontmatter?.aliases;
		for (const alias of Array.isArray(aliases) ? aliases : typeof aliases === "string" ? [aliases] : []) {
			if (typeof alias === "string") for (const word of nameWords(alias)) words.add(word);
		}
	}
	const list = [...words].sort();
	dictionaryCache.set(vault, list);
	return list;
}

/** The gate's own repository root, where the committed prose configs live (`.markdownlint.yaml`, `cspell.json`, `.vale.ini`). */
export const toolRoot = fileURLToPath(new URL("../../", import.meta.url));

let projectWordsPromise: Promise<string[]> | undefined;

/** The committed D&D term list (`.cspell/dnd-terms.txt`), shared by the spelling and grammar layers. */
export function projectWords(): Promise<string[]> {
	projectWordsPromise ??= readFile(join(toolRoot, ".cspell", "dnd-terms.txt"), "utf8").then(
		(text) =>
			text
				.split("\n")
				.map((line) => line.trim())
				.filter((line) => line !== "" && !line.startsWith("#")),
		() => [],
	);
	return projectWordsPromise;
}

/** The vault's own word list: in-world coinages that are not page names, one word per line, `#` starts a comment. */
export const VAULT_WORDS_FILE = ".cspell-words.txt";

const vaultWordCache = new WeakMap<Vault, Promise<string[]>>();

/**
 * Words the World invented that no page is named for (a Calendar's months and weekdays, a name mentioned in
 * passing), read from `.cspell-words.txt` at the vault root and committed with the vault. It sits beside the page
 * names in the spelling and grammar dictionaries. D&D rules terms belong in `.cspell/dnd-terms.txt` instead.
 */
export function vaultWordList(vault: Vault): Promise<string[]> {
	let list = vaultWordCache.get(vault);
	if (!list) {
		list = readFile(join(vault.dir, VAULT_WORDS_FILE), "utf8").then(
			(text) =>
				text
					.split("\n")
					.map((line) => line.trim())
					.filter((line) => line !== "" && !line.startsWith("#")),
			() => [],
		);
		vaultWordCache.set(vault, list);
	}
	return list;
}

const templateCache = new WeakMap<TemplateSet, string[]>();

/**
 * Every word in the templates' headings, labels and guidance. The templates define page shape, so the words they
 * use (`Armor Class`, a section named `Rumors`) are the gate's own vocabulary and cannot be misspellings.
 */
export function templateWords(templates: TemplateSet): string[] {
	const cached = templateCache.get(templates);
	if (cached) return cached;
	const words = new Set<string>();
	for (const template of templates.byName.values()) {
		for (const match of proseView(template.page).text.matchAll(/\p{L}[\p{L}'’]*\p{L}|\p{L}/gu)) words.add(match[0]);
		for (const word of nameWords(template.name)) words.add(word);
	}
	const list = [...words].sort();
	templateCache.set(templates, list);
	return list;
}

/** A page as the structural linters (markdownlint, remark-lint) read it. */
export interface LintText {
	text: string;
	/** For each line of `text` (index 0 is line 1), its line number in the page source. */
	lines: number[];
	/** Source lines that hold part of an inline `%% %%` comment: findings there are noise from the blanking. */
	skip: Set<number>;
}

/**
 * The page source with `%% %%` authoring comments taken out, so guidance text is not linted as page text.
 * A comment on lines of its own is deleted with its lines; a comment inside a line is blanked to spaces.
 * `lines` maps every remaining line back to the source, so findings and fixes land on the right line.
 */
export function lintText(page: Page): LintText {
	const source = page.source;
	const starts = lineStarts(source);
	const sourceLines = source.split("\n");
	const removed = new Set<number>();
	const skip = new Set<number>();
	let blanked = source;
	for (const c of page.comments) {
		const lineStart = starts[c.line - 1] ?? 0;
		const before = source.slice(lineStart, c.start);
		const afterEnd = source.indexOf("\n", c.end);
		const after = source.slice(c.end, afterEnd === -1 ? source.length : afterEnd);
		if (/^[ \t]*$/.test(before) && /^[ \t\r]*$/.test(after)) {
			let last = c.endLine;
			// A comment between two blank lines must not leave a double blank line behind.
			const prevBlank = c.line === 1 || (sourceLines[c.line - 2] ?? "").trim() === "";
			if (prevBlank) while (last < sourceLines.length && (sourceLines[last] ?? "").trim() === "") last++;
			for (let line = c.line; line <= last; line++) removed.add(line);
			continue;
		}
		for (let line = c.line; line <= c.endLine; line++) skip.add(line);
		blanked = blanked.slice(0, c.start) + blanked.slice(c.start, c.end).replace(/[^\n]/g, " ") + blanked.slice(c.end);
	}
	if (removed.size === 0) return { text: blanked, lines: sourceLines.map((_, i) => i + 1), skip };
	const kept: string[] = [];
	const lines: number[] = [];
	blanked.split("\n").forEach((line, i) => {
		if (removed.has(i + 1)) return;
		kept.push(line);
		lines.push(i + 1);
	});
	return { text: kept.join("\n"), lines, skip };
}
