import { describe, expect, it } from "vitest";
import {
	BLOCK_ID,
	CALLOUT_TITLE,
	frontmatterNames,
	pageNames,
	parseWikiLinkText,
	slugify,
	stringValues,
	wikilinkDisplay,
	WIKILINK,
} from "../../src/vault/dialect.ts";

const matches = (text: string): string[] => [...text.matchAll(WIKILINK)].map((m) => `${m[1]}${m[2]}`);

describe("wikilink pattern", () => {
	it.each([
		["[[Mara Voss]]", "Mara Voss"],
		["![[Creature#Statblock]]", "!Creature#Statblock"],
		["[[NPCs/Mara Voss#Play|the harbormaster]]", "NPCs/Mara Voss#Play|the harbormaster"],
	])("%s separates the embed marker from the inner text", (text, inner) => {
		expect(matches(text)).toEqual([inner]);
	});

	it("never matches across lines or nested brackets", () => {
		expect(matches("[[Broken\nlink]] [[Deep [[nested]] link]]")).toEqual(["nested"]);
	});
});

describe("parseWikiLinkText", () => {
	it.each([
		["![[Creature#Statblock]]", true, "Creature", ["Statblock"], undefined, undefined],
		["[[A#H1#H2]]", false, "A", ["H1", "H2"], undefined, undefined],
		["[[A#^block]]", false, "A", [], "block", undefined],
		["[[A|Alias]]", false, "A", [], undefined, "Alias"],
		["[[#^block]]", false, "", [], "block", undefined],
	])("%s splits into target, headings, block and alias", (raw, embed, target, headings, block, alias) => {
		const inner = raw.replace(/^!?\[\[/, "").replace(/\]\]$/, "");
		const link = parseWikiLinkText(raw, embed, inner, 1, false);
		expect({ target: link.target, headings: link.headings, block: link.block, alias: link.alias }).toEqual({
			target,
			headings,
			block,
			alias,
		});
		expect(link.raw).toBe(raw);
		expect(link.embed).toBe(embed);
	});
});

describe("wikilink display text", () => {
	it.each([
		["Mara Voss", "Mara Voss", false],
		["NPCs/Mara Voss", "Mara Voss", false],
		["Creature#Statblock", "Creature", false],
		["Creature#^block", "Creature", false],
		["Mara Voss|the harbormaster", "the harbormaster", true],
		["Mara Voss | spaced alias ", "spaced alias", true],
		["Mara Voss\\|escaped table alias", "escaped table alias", true],
		["#Heading", "Heading", false],
		["#^block-only", "", false],
	])("%s shows %s", (inner, text, aliased) => {
		expect(wikilinkDisplay(inner).text).toBe(text);
		expect(wikilinkDisplay(inner).aliased).toBe(aliased);
	});

	it("places the alias text where it starts in the inner text", () => {
		expect(wikilinkDisplay("A| B").at).toBe(3);
		expect(wikilinkDisplay("A").at).toBe(0);
	});
});

describe("callout title", () => {
	it.each([
		["[!note] Title", "note", "Title"],
		["[!tip]- Folded shut", "tip", "Folded shut"],
		["[!warning]+ Pinned open", "warning", "Pinned open"],
		["[!note]", "note", ""],
		["[!note]   ", "note", ""],
	])("%s at the end of the file reads type %s title %s", (line, type, title) => {
		const head = CALLOUT_TITLE.exec(line);
		expect(head?.[1]).toBe(type);
		expect(head?.[2]).toBe(title);
	});

	it("stops at the line's end, leaving the body untouched", () => {
		const head = CALLOUT_TITLE.exec("[!note] Title\nBody line");
		expect(head?.[2]).toBe("Title");
		expect(head?.[0]).toBe("[!note] Title");
	});

	it("does not match a plain line", () => {
		expect(CALLOUT_TITLE.exec("Just text")).toBeNull();
	});
});

describe("block id", () => {
	it.each([
		["Visible text. ^hearth", "hearth"],
		["^standalone", "standalone"],
		["^eof-id", "eof-id"],
		["Trailing spaces ^x  ", "x"],
		["a^glued", null],
		["No id here", null],
		["^bad id", null],
	])("%s yields %s", (line, id) => {
		expect(BLOCK_ID.exec(line)?.[1] ?? null).toBe(id);
	});
});

describe("slugify", () => {
	it.each([
		["Gull's Errand", "gulls-errand"],
		["Thieves’ Cant", "thieves-cant"],
		["Otar the Foul (Creature)", "otar-the-foul-creature"],
		["  The -- Cold Hearth  ", "the-cold-hearth"],
		["Session 9: The Toll", "session-9-the-toll"],
		["''", ""],
	])("%s slugs to %s", (name, slug) => {
		expect(slugify(name)).toBe(slug);
	});
});

describe("frontmatter name rules (ADR 0028)", () => {
	it.each([
		[undefined, []],
		["", []],
		[" x ", ["x"]],
		[42, []],
		[
			[" a ", " ", 3, "b"],
			["a", "b"],
		],
	])("stringValues(%p) is %p", (value, out) => {
		expect(stringValues(value)).toEqual(out);
	});

	it("orders names title, aliases, slug, dropping case-insensitive duplicates", () => {
		expect(pageNames({ title: "T", aliases: ["a", "A", "b"] }, "s")).toEqual(["T", "a", "b", "s"]);
		expect(pageNames(null, "s")).toEqual(["s"]);
	});

	it.each([
		['---\ntitle: "Nona"\naliases: ["The Black-Jaw", "Sable"]\n---\n', "Nona", ["The Black-Jaw", "Sable"]],
		['---\ntitle: ""\naliases: "One Alias"\n---\n', undefined, ["One Alias"]],
		['---\ntitle: "Blank alias"\naliases: []\n---\n', "Blank alias", undefined],
		["---\ntitle: [broken\n---\n", undefined, undefined],
		["No frontmatter at all.\n", undefined, undefined],
	])("%s gives title %s aliases %s", (source, title, aliases) => {
		expect(frontmatterNames(source)).toEqual({
			...(title === undefined ? {} : { title }),
			...(aliases === undefined ? {} : { aliases }),
		});
	});
});
