import type { Root, RootContent } from "mdast";
import { characterIdFromUrl } from "../pull/ddb.ts";
import { PULLED_SECTIONS } from "../pull/page.ts";
import { BLOCK_ID, wikilinkDisplay, WIKILINK } from "../vault/dialect.ts";
import type { Callout, Page, Vault } from "../vault/types.ts";

/**
 * The page views every layer reads off a page, computed once and memoised: which lines are spoken
 * Narration, what each Cue says, the sentences worth comparing across pages, and how the page's file
 * name classifies it. Each view has exactly one home (issue #62); layers never re-derive one.
 */

/** 1-based inclusive line range of a callout's blockquote in its page. */
export function calloutLines(page: Page, callout: Callout): [number, number] {
	const lines = pageSource(page).lines;
	let end = callout.line;
	while (end < lines.length && /^[ \t]*>/.test(lines[end] ?? "")) end++;
	return [callout.line, end];
}

/** A sentence worth comparing across pages: its normalized key, and the original text to quote in a finding. */
export interface Sentence {
	key: string;
	quote: string;
}

/** The derived views of one page. */
export interface PageViews {
	/** Original source lines and their UTF-16 start offsets, shared by all line-based views. */
	lines: readonly string[];
	starts: number[];
	/** Every line of a `[!narration]` callout, its title line included. */
	narration: ReadonlySet<number>;
	/** The body lines of `[!narration]` callouts, the title line excluded. */
	narrationBody: ReadonlySet<number>;
	/** Lines the DM speaks: narration callout lines and each Cue line. */
	spoken: ReadonlySet<number>;
	/** Each Cue's spoken texts, by the line the Cue sits on. */
	cues: ReadonlyMap<number, readonly string[]>;
	/** Published rules under Item `## Properties`, through the next heading of depth two or less. */
	itemProperties: ReadonlySet<number>;
	/** D&D Beyond identity and sheet-side lines for a linked PC's Campaign version. */
	pulledPc: { id: string; campaign: string; lines: ReadonlySet<number> } | undefined;
	/** Comparable body prose, excluding published Item Properties (the boilerplate policy). */
	sentences: ReadonlyMap<number, readonly Sentence[]>;
}

const viewsCache = new WeakMap<Page, PageViews>();
const sourceCache = new WeakMap<Page, { lines: string[]; starts: number[] }>();
const bodyCache = new WeakMap<Page, string[]>();
const lintCache = new WeakMap<Page, LintText>();

function pageSource(page: Page): { lines: string[]; starts: number[] } {
	let source = sourceCache.get(page);
	if (!source) {
		source = { lines: page.source.split("\n"), starts: lineStarts(page.source) };
		sourceCache.set(page, source);
	}
	return source;
}

/** The parsed headings own section bounds, so headings inside fences cannot start or end Properties. */
function itemPropertiesLines(page: Page): ReadonlySet<number> {
	const lines = new Set<number>();
	if (page.frontmatter?.type !== "Item") return lines;
	let end = pageSource(page).lines.length + 1;
	for (let index = page.headings.length - 1; index >= 0; index--) {
		const heading = page.headings[index]!;
		if (heading.depth > 2) continue;
		if (heading.depth === 2 && heading.text === "Properties") {
			for (let line = heading.line; line < end; line++) lines.add(line);
		}
		end = heading.line;
	}
	return lines;
}

/** Pull-owned sections include subheadings, but stop at the next parsed level-two heading. */
function pulledPcView(page: Page): PageViews["pulledPc"] {
	const url = page.frontmatter?.dndbeyond_url;
	if (page.frontmatter?.type !== "PC" || typeof url !== "string") return undefined;
	const id = characterIdFromUrl(url);
	if (id === undefined) return undefined;
	const campaign = page.path.split("/")[0]!;
	const lines = new Set<number>();
	let end = pageSource(page).lines.length + 1;
	for (let index = page.headings.length - 1; index >= 0; index--) {
		const heading = page.headings[index]!;
		if (heading.depth !== 2) continue;
		if (PULLED_SECTIONS.some((section) => section === heading.text)) {
			for (let line = heading.line; line < end; line++) lines.add(line);
		}
		end = heading.line;
	}
	return { id, campaign, lines };
}

/** The derived views of `page`, computed once: narration and Cue lines, and comparable sentences. */
export function pageViews(page: Page): PageViews {
	const cached = viewsCache.get(page);
	if (cached) return cached;

	const narration = new Set<number>();
	const narrationBody = new Set<number>();
	for (const callout of page.callouts) {
		if (callout.type !== "narration") continue;
		const [start, end] = calloutLines(page, callout);
		for (let line = start; line <= end; line++) narration.add(line);
		for (let line = start + 1; line <= end; line++) narrationBody.add(line);
	}
	const cues = new Map<number, string[]>();
	for (const cue of page.cues) {
		const texts = cues.get(cue.line) ?? [];
		texts.push(cue.text);
		cues.set(cue.line, texts);
	}
	const spoken = new Set<number>(narration);
	for (const line of cues.keys()) spoken.add(line);
	const itemProperties = itemPropertiesLines(page);

	let comparable: Map<number, Sentence[]> | undefined;
	const views: PageViews = {
		...pageSource(page),
		narration,
		narrationBody,
		spoken,
		cues,
		itemProperties,
		pulledPc: pulledPcView(page),
		get sentences() {
			if (comparable === undefined) comparable = proseSentences(page, itemProperties);
			return comparable;
		},
	};
	viewsCache.set(page, views);
	return views;
}

const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });

/** Words that end an abbreviation rather than a sentence; a fragment ending in one joins the next sentence. */
const IS_ABBREVIATION: Record<string, true> = {
	ft: true,
	in: true,
	lb: true,
	mi: true,
	km: true,
	gp: true,
	sp: true,
	cp: true,
	pp: true, // measures and coin
	str: true,
	dex: true,
	con: true,
	int: true,
	wis: true,
	cha: true, // ability scores
	mr: true,
	mrs: true,
	ms: true,
	mx: true,
	dr: true,
	jr: true,
	sr: true,
	st: true, // names
	no: true,
	vs: true,
	vol: true,
	approx: true,
	prof: true,
	etc: true,
};

function endsWithAbbreviation(fragment: string): boolean {
	const match = /([a-zA-Z]+)\.\s*$/.exec(fragment);
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

/** Comparable body prose: syntax exclusions and published Item Properties are not repeated authorial prose. */
function proseSentences(page: Page, itemProperties: ReadonlySet<number>): Map<number, Sentence[]> {
	const sentencesByLine = new Map<number, Sentence[]>();
	const source = bodyLines(page);
	const proseLines = new Set<number>();
	const visit = (node: Root | RootContent): void => {
		// The parsed tree owns syntax exclusions; no second frontmatter/fence/blockquote parser.
		if (
			node.type === "blockquote" ||
			node.type === "heading" ||
			node.type === "table" ||
			node.type === "code" ||
			node.type === "html" ||
			node.type === "yaml"
		)
			return;
		if (node.type === "paragraph" && node.position) {
			for (let line = node.position.start.line; line <= node.position.end.line; line++) proseLines.add(line);
		}
		if ("children" in node) for (const child of node.children as RootContent[]) visit(child);
	};
	visit(page.tree);
	for (const line of proseLines) {
		if (itemProperties.has(line)) continue;
		const trimmed = (source[line - 1] ?? "").trim();
		if (!trimmed) continue;
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
			.filter(
				(sentence) =>
					sentence
						.replace(/\u0001[^\u0001]*\u0001/g, "")
						.replace(/\s+/g, " ")
						.trim().length >= 25,
			)
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
 * The page's lines with the frontmatter emptied and every `%% %%` comment blanked, so line numbers
 * still match the file. For layers that read a page's text rather than its parsed tree.
 */
export function bodyLines(page: Page): string[] {
	const cached = bodyCache.get(page);
	if (cached) return cached;
	let text = page.source;
	for (const c of [...page.comments].sort((a, b) => b.start - a.start)) {
		text = text.slice(0, c.start) + text.slice(c.start, c.end).replace(/[^\n]/g, " ") + text.slice(c.end);
	}
	const lines = text.split("\n").map((l, i) => (i < page.frontmatterEndLine ? "" : l));
	bodyCache.set(page, lines);
	return lines;
}

/**
 * Pages the prose layers read: every page but the generated catalogs. `index.md` is machine output and is
 * skipped; `log.md` is written by the Agent and is checked.
 */
export function isProsePage(page: Page): boolean {
	return page.slug !== "index";
}

/** Generated or append-only file names (slugs, ADR 0028): `index`, `log`, `log-YYYY`. */
export function isFixedSlug(slug: string): boolean {
	return slug === "index" || slug === "log" || /^log-\d{4}$/.test(slug);
}

/** Generated or append-only pages: they carry no template and are never renamed (ADR 0028). */
export function isFixedPage(page: Page): boolean {
	return isFixedSlug(page.slug);
}

/** Pages whose prose no one owns: generated catalogs, `hot.md` and the live log. Rotated logs are history and stay compared. */
export function isUnownedProse(page: Page): boolean {
	return page.slug === "index" || page.slug === "hot" || page.slug === "log";
}
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

/** A file name (`ssw-miras-blade.md`, `map.webp`): a path, not words, wherever it stands in prose. */
const FILE_NAME = /(?<![\w.-])[\w'-]+(?:\.[\w'-]+)*\.(?:md|pdf|txt|png|jpe?g|webp|gif|svg)\b/g;

/** Frontmatter, fenced and indented code, raw HTML, `%% %%` comments and file names: nothing a reader reads as prose. */
function droppedRanges(page: Page): Range[] {
	const ranges: Range[] = page.comments.map((c) => [c.start, c.end]);
	const visit = (node: Root | RootContent): void => {
		if (node.type === "yaml" || node.type === "code" || node.type === "html") {
			if (node.position) ranges.push([node.position.start.offset ?? 0, node.position.end.offset ?? 0]);
			return;
		}
		if (node.type === "text" && node.position) {
			const start = node.position.start.offset ?? 0;
			for (const m of page.source.slice(start, node.position.end.offset ?? start).matchAll(FILE_NAME)) {
				const from = start + m.index;
				const to = from + m[0].length;
				// Take one of the two spaces around it, so dropping the name leaves no double space behind.
				ranges.push([from, page.source[from - 1] === " " && page.source[to] === " " ? to + 1 : to]);
			}
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

/** A callout's `[!type]` marker on a quoted line: removed from prose, so the body reads as text. */
const CALLOUT_MARKER = /(?<=^[ \t]*(?:>[ \t]?)+)\[![^\]\s]+\][+-]?[ \t]?/gm;
/**
 * The page body as prose: frontmatter, code, HTML and `%% %%` comments removed; each wikilink reduced to the
 * text Obsidian shows (its alias, else its page name); embeds, callout markers and `^block` ids removed.
 * Build the same view every time for the same page: results are cached on the page object.
 */
const caches = {
	show: new WeakMap<Page, ProseView>(),
	named: new WeakMap<Vault, WeakMap<Page, ProseView>>(),
	mask: new WeakMap<Vault, WeakMap<Page, ProseView>>(),
	grammar: new WeakMap<Vault, WeakMap<Page, ProseView>>(),
};

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
		for (const name of page.names) if (!kinds.has(name)) kinds.set(name, type);
	}
	const sorted = [...kinds.keys()].filter((n) => /\p{Lu}/u.test(n)).sort((a, b) => b.length - a.length);
	const letters = (i: number): string =>
		(i < 26 ? "" : letters(Math.floor(i / 26) - 1)) + String.fromCharCode(97 + (i % 26));
	const token = new Map(sorted.map((n, i) => [n, MASKED_NAME + letters(i)]));
	// ponytail: case-sensitive whole-word match, so a sentence-initial common word that is also a page name ("Passage") is masked too.
	const mask =
		sorted.length === 0
			? null
			: {
					pattern: new RegExp(
						`(?<![\\p{L}\\p{N}])(?:${sorted.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?![\\p{L}\\p{N}])`,
						"gu",
					),
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
 * Pages whose name or an alias appears as bare words in `text`, matched exactly as masking matches names:
 * whole word, case-sensitive, names holding an uppercase letter, the same pattern `nameMask` builds. One entry
 * per page, the first match in `text` order. A wikilink is not needed: bare mention is enough.
 */
export function mentionedPages(text: string, vault: Vault): { page: Page; name: string }[] {
	const mask = nameMask(vault);
	if (!mask) return [];
	const pageOf = new Map<string, Page>();
	for (const page of vault.pages) {
		if (!isProsePage(page)) continue;
		for (const name of page.names) if (!pageOf.has(name)) pageOf.set(name, page);
	}
	const first = new Map<Page, string>();
	for (const m of text.matchAll(mask.pattern)) {
		const page = pageOf.get(m[0]);
		if (page && !first.has(page)) first.set(page, m[0]);
	}
	return [...first].map(([page, name]) => ({ page, name }));
}

/**
 * Without `mask`, a link shows its display text. With the vault as `mask`, each unaliased link,
 * exact owned title/alias label and bare page name becomes its stand-in (see `MASKED_NAME`).
 * Arbitrary custom labels remain prose; names such as `Fire Watch` or `Countless` are not prose.
 * `namesFrom` marks owned display labels without replacing their text, for the grammar layer.
 */
export function proseView(page: Page, mask?: Vault, namesFrom?: Vault): ProseView {
	const vault = mask ?? namesFrom;
	let cache: WeakMap<Page, ProseView>;
	if (vault) {
		const mode = mask ? caches.mask : caches.named;
		cache = mode.get(vault) ?? new WeakMap<Page, ProseView>();
		mode.set(vault, cache);
	} else cache = caches.show;
	const cached = cache.get(page);
	if (cached) return cached;
	const source = page.source;
	const edits: Edit[] = [];
	const dropped = droppedRanges(page);
	let masked = source;
	for (const range of dropped) {
		edits.push(keepNewlines(source, range));
		masked =
			masked.slice(0, range[0]) + masked.slice(range[0], range[1]).replace(/[^\n]/g, " ") + masked.slice(range[1]);
	}

	const names = mask || namesFrom ? nameMask(mask ?? namesFrom!) : null;
	for (const m of masked.matchAll(WIKILINK)) {
		const start = m.index ?? 0;
		const end = start + m[0].length;
		if (m[1] === "!") {
			edits.push({ start, end, text: "", from: [] });
			continue;
		}
		const shown = wikilinkDisplay(m[2] ?? "");
		const named = !shown.aliased || (names?.standIn.has(shown.text) ?? false);
		const text = mask && named ? (names?.standIn.get(shown.text) ?? MASKED_NAME) : shown.text;
		edits.push({
			start,
			end,
			text,
			from: Array.from({ length: text.length }, (_, i) => start + 2 + shown.at + i),
			name: named,
		});
	}
	if (mask && names) {
		for (const m of masked.matchAll(names.pattern)) {
			const start = m.index ?? 0;
			const text = names.standIn.get(m[0]) ?? MASKED_NAME;
			edits.push({
				start,
				end: start + m[0].length,
				text,
				from: Array.from({ length: text.length }, () => start),
				name: true,
			});
		}
	}
	for (const m of masked.matchAll(CALLOUT_MARKER)) {
		const start = m.index ?? 0;
		const end = start + m[0].length;
		edits.push({ start, end, text: "", from: [] });
		// The title is a label, not the start of the body's first sentence: end it there, as Obsidian shows it on its own line.
		const lineEnd = masked.indexOf("\n", end) === -1 ? masked.length : masked.indexOf("\n", end);
		if (/[\p{L}\p{N}]\s*$/u.test(masked.slice(end, lineEnd)))
			edits.push({ start: lineEnd, end: lineEnd, text: ".", from: [lineEnd] });
	}
	// Per line, so the id's own line break and the text before it on the line both survive the blanking.
	let offset = 0;
	for (const line of masked.split("\n")) {
		const id = BLOCK_ID.exec(line);
		if (id) edits.push({ start: offset + id.index, end: offset + id.index + id[0].length, text: "", from: [] });
		offset += line.length + 1;
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

/** Harper's prose view: published Item Properties blanked without changing offsets or source lines. */
export function grammarView(page: Page, vault: Vault): ProseView {
	const view = proseView(page, undefined, vault);
	if (page.frontmatter?.type !== "Item") return view;
	const properties = pageViews(page).itemProperties;
	if (properties.size === 0) return view;
	let pages = caches.grammar.get(vault);
	if (!pages) {
		pages = new WeakMap();
		caches.grammar.set(vault, pages);
	}
	let result = pages.get(page);
	if (!result) {
		result = {
			...view,
			text: view.text
				.split("\n")
				.map((line, index) => (properties.has(index + 1) ? line.replace(/[^\n]/g, " ") : line))
				.join("\n"),
		};
		pages.set(page, result);
	}
	return result;
}

/** The source offset of a UTF-16 index in the view (the last offset when the index is at the end). */
export function sourceOffset(view: ProseView, index: number): number {
	return view.map[Math.min(index, view.map.length - 1)] ?? 0;
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
	const cached = lintCache.get(page);
	if (cached) return cached;
	const source = page.source;
	const { starts, lines: sourceLines } = pageSource(page);
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
	if (removed.size === 0) {
		const view = { text: blanked, lines: sourceLines.map((_, i) => i + 1), skip };
		lintCache.set(page, view);
		return view;
	}
	const kept: string[] = [];
	const lines: number[] = [];
	blanked.split("\n").forEach((line, i) => {
		if (removed.has(i + 1)) return;
		kept.push(line);
		lines.push(i + 1);
	});
	const view = { text: kept.join("\n"), lines, skip };
	lintCache.set(page, view);
	return view;
}

/**
 * A list item's bold lead-in (`- **Found at.** Ravenhold`) is a field name from the template, not a sentence.
 * Vale would read `Found at.` as a clipped sentence and trip its staccato and mic-drop rules on every page, so the
 * label loses its full stop. Line numbers do not change.
 */
function valeText(text: string, views: PageViews): string {
	const cueLines = views.cues;
	// Only narration stays a blockquote: other callouts and ordinary quotes are DM-side prose. A quote line under an
	// NPC's `## Quotes` is that person's verbatim speech, so it leaves the view (blanked) while its context line stays.
	// The DM ruled published Item Properties wording the house standard (2026-10-11; raw samples:
	// "the gold standard for concise direct communication"), the same reason fenced statblock text is exempt.
	let inQuotes = false;
	const scoped = text
		.split("\n")
		.map((line, index) => {
			if (/^#{1,6}\s/.test(line)) inQuotes = /^##\s+Quotes\s*$/.test(line);
			if (views.itemProperties.has(index + 1)) return "";
			if (inQuotes && /^[ \t]*>/.test(line)) return "";
			const lineNo = index + 1;
			// A Cue line keeps its spoken text but loses the `==` marks: ai-tells reads the words, the gate keeps the line.
			if (cueLines.has(lineNo)) return line.replace(/^[ \t]*(?:>[ \t]?)+/, "").replaceAll("==", "");
			return views.narration.has(lineNo) ? line : line.replace(/^[ \t]*(?:>[ \t]?)+/, "");
		})
		.join("\n");
	return scoped.replace(/^([ \t]*(?:[-*+]|\d+\.)[ \t]+\*\*[^*\n]+?)\.(\*\*)/gm, "$1$2");
}

/**
 * The view the craft checks read: the body lines of every [!narration] callout with their `>` markers stripped, and
 * each Cue line holding only its spoken texts (the trigger text is DM side, not Narration); every other line, the
 * callout's title line included, blanked to "" so line numbers stay the page's. Null when the page has neither a
 * narration callout nor a Cue, so the craft pass is skipped entirely.
 */
function narrationValeText(text: string, views: PageViews): string | null {
	const cueTexts = new Map<number, readonly string[]>();
	for (const [line, texts] of views.cues) {
		if (views.narration.has(line)) continue;
		cueTexts.set(line, texts);
	}
	if (views.narrationBody.size === 0 && cueTexts.size === 0) return null;
	return text
		.split("\n")
		.map((line, index) => {
			const lineNo = index + 1;
			if (views.narrationBody.has(lineNo)) return line.replace(/^[ \t]*(?:>[ \t]?)+/, "");
			const texts = cueTexts.get(lineNo);
			return texts ? texts.join(" ") : "";
		})
		.join("\n");
}

/**
 * The view the Narration token rules read over Cues: each Cue line as a blockquote line holding its spoken texts,
 * every other line blanked to "" so line numbers stay the page's. Null when the page has no Cue, so the pass is
 * skipped entirely.
 */
function cueValeText(text: string, views: PageViews): string | null {
	if (views.cues.size === 0) return null;
	return text
		.split("\n")
		.map((_, index) => {
			const texts = views.cues.get(index + 1);
			return texts ? `> ${texts.join(" ")}` : "";
		})
		.join("\n");
}

export interface ValeViews {
	/** DM prose plus spoken lines, prepared for the gate's rules with source line numbers intact. */
	written: string;
	/** Callout bodies and Cue speech only, for the narration craft rules. */
	narrated: string | null;
	/** Cue speech represented as narration blockquotes, for the gate's Narration rules. */
	cued: string | null;
}

const valeCache = new WeakMap<Vault, WeakMap<Page, ValeViews>>();

/** The three readings Vale consumes; all prose/narration policy stays in this module. */
export function valeViews(page: Page, vault: Vault): ValeViews {
	let pages = valeCache.get(vault);
	if (!pages) {
		pages = new WeakMap();
		valeCache.set(vault, pages);
	}
	let result = pages.get(page);
	if (!result) {
		const text = proseView(page, vault).text;
		const views = pageViews(page);
		result = {
			written: valeText(text, views),
			narrated: narrationValeText(text, views),
			cued: cueValeText(text, views),
		};
		pages.set(page, result);
	}
	return result;
}
