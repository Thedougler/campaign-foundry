import { describe, expect, it } from "vitest";
import { type Block, chunkBlocks, type ConvertContext, countBlocks, LIMITS, limitNesting, markdownToBlocks, notionLanguage, textFileToBlocks, textItems, validUrl } from "../../src/backup/blocks.ts";
import { textOf } from "./helpers.ts";

const ctx: ConvertContext = {
	link: (t) => (t === "Ilse Corran" || t === "NPCs/Ilse Corran" ? "https://www.notion.so/ilse" : undefined),
	relative: (href) => (href === "../NPCs/Ilse Corran.md" ? "https://www.notion.so/ilse" : undefined),
	image: (t) => (t.endsWith("Map.png") ? { fileUploadId: "up-1" } : t.startsWith("https://") ? { url: t } : undefined),
};
const body = (b: Block | undefined): Record<string, unknown> => (b ? (b[b.type] as Record<string, unknown>) : {});
const rich = (b: Block | undefined) => (body(b).rich_text ?? []) as { text: { content: string; link?: { url: string } }; annotations?: Record<string, unknown> }[];
const para = (n: number): Block => ({ object: "block", type: "paragraph", paragraph: { rich_text: textItems(`p${n}`) } });

describe("markdown to Notion blocks", () => {
	it("turns an Obsidian callout into a Notion callout, title as its text and body as children", () => {
		const [callout] = markdownToBlocks("> [!narration] First sight\n> The deep water goes still.\n>\n> A second paragraph.\n", ctx);
		expect(callout?.type).toBe("callout");
		expect(rich(callout).map((r) => r.text.content).join("")).toBe("First sight");
		expect(rich(callout)[0]?.annotations).toMatchObject({ bold: true });
		expect(body(callout).icon).toEqual({ type: "emoji", emoji: "🗣️" });
		const children = body(callout).children as Block[];
		expect(children.map((c) => c.type)).toEqual(["paragraph", "paragraph"]);
		expect(textOf(children)).toBe("The deep water goes still.|A second paragraph.");
	});

	it("names an untitled callout by its type and keeps a plain blockquote a quote", () => {
		const [untitled, quote] = markdownToBlocks("> [!warning]\n> Mind the reef.\n\n> Just a quote.\n", ctx);
		expect(rich(untitled)[0]?.text.content).toBe("Warning");
		expect(textOf(body(untitled).children as Block[])).toBe("Mind the reef.");
		expect(quote?.type).toBe("quote");
	});

	it("links wikilinks to backed-up pages and leaves the rest as text, showing the alias", () => {
		const [p] = markdownToBlocks("Ask [[Ilse Corran|Ilse]] or [[NPCs/Ilse Corran#Voice]] about [[Nobody Known]].\n", ctx);
		const items = rich(p);
		expect(items.find((r) => r.text.content === "Ilse")?.text.link?.url).toBe("https://www.notion.so/ilse");
		expect(items.find((r) => r.text.content === "Ilse Corran > Voice")?.text.link?.url).toBe("https://www.notion.so/ilse");
		expect(items.find((r) => r.text.content.includes("Nobody Known"))?.text.link).toBeUndefined();
		expect(items.map((r) => r.text.content).join("")).toBe("Ask Ilse or Ilse Corran > Voice about Nobody Known.");
	});

	it("resolves relative Markdown links and drops links Notion would reject", () => {
		const [p] = markdownToBlocks("See [Ilse](../NPCs/Ilse%20Corran.md), [site](https://example.com) and [odd](obsidian://open).\n", { ...ctx, relative: (h) => (decodeURI(h) === "../NPCs/Ilse Corran.md" ? "https://www.notion.so/ilse" : undefined) });
		const items = rich(p);
		expect(items.find((r) => r.text.content === "Ilse")?.text.link?.url).toBe("https://www.notion.so/ilse");
		expect(items.find((r) => r.text.content === "site")?.text.link?.url).toBe("https://example.com");
		expect(items.find((r) => r.text.content === "odd")?.text.link).toBeUndefined();
	});

	it("turns image embeds into image blocks on the uploaded file, and an unknown embed into text", () => {
		const blocks = markdownToBlocks("![[Map.png]]\n\nText ![[Map.png|The map]] after.\n\n![alt](https://example.com/a.png)\n\n![[Missing.png]]\n", ctx);
		expect(blocks.map((b) => b.type)).toEqual(["image", "paragraph", "image", "image", "paragraph"]);
		expect(body(blocks[0])).toMatchObject({ type: "file_upload", file_upload: { id: "up-1" } });
		expect(rich(blocks[1]).map((r) => r.text.content).join("")).toBe("Text  after.");
		expect((body(blocks[2]).caption as { text: { content: string } }[])[0]?.text.content).toBe("The map");
		expect(body(blocks[3])).toMatchObject({ type: "external", external: { url: "https://example.com/a.png" } });
		expect(rich(blocks[4])[0]?.text.content).toBe("Missing.png");
	});

	it("keeps frontmatter, statblocks and Bases as YAML code, captioned as Obsidian-only", () => {
		const blocks = markdownToBlocks("---\ntype: Creature\n---\n\n```statblock\nname: Serpent\nhp: 6\n```\n\n```base\nviews: []\n```\n\n```ts\nconst x = 1;\n```\n", ctx);
		expect(blocks.map((b) => [b.type, body(b).language])).toEqual([
			["code", "yaml"],
			["code", "yaml"],
			["code", "yaml"],
			["code", "typescript"],
		]);
		expect(rich(blocks[0])[0]?.text.content).toBe("type: Creature");
		expect(rich(blocks[1])[0]?.text.content).toBe("name: Serpent\nhp: 6");
		expect((body(blocks[1]).caption as { text: { content: string } }[])[0]?.text.content).toMatch(/Fantasy Statblocks/);
	});

	it("maps headings, lists, to-dos, inline formatting, rules and tables", () => {
		const md = "# One\n\n#### Four\n\n- **Bold** and *it* and `code` and ~~gone~~\n  - nested\n\n1. first\n\n- [x] done\n\n---\n\n| A | B |\n| - | - |\n| 1 | 2 |\n";
		const blocks = markdownToBlocks(md, ctx);
		expect(blocks.map((b) => b.type)).toEqual(["heading_1", "heading_3", "bulleted_list_item", "numbered_list_item", "to_do", "divider", "table"]);
		const ann = rich(blocks[2]).map((r) => [r.text.content, r.annotations ?? {}]);
		expect(ann).toContainEqual(["Bold", { bold: true }]);
		expect(ann).toContainEqual(["code", { code: true }]);
		expect(ann).toContainEqual(["gone", { strikethrough: true }]);
		expect(textOf(body(blocks[2]).children as Block[])).toBe("nested");
		expect(body(blocks[4]).checked).toBe(true);
		expect(body(blocks[6])).toMatchObject({ table_width: 2, has_column_header: true });
		expect(textOf([blocks[6] as Block])).toBe("A|B|1|2");
	});

	it("strips a trailing Obsidian block id", () => {
		const [p] = markdownToBlocks("A fact worth linking. ^fact-1\n", ctx);
		expect(rich(p).map((r) => r.text.content).join("")).toBe("A fact worth linking.");
	});
});

describe("Notion limits", () => {
	it("splits text over 2000 characters without breaking a surrogate pair", () => {
		const items = textItems(`${"a".repeat(1999)}🐙${"b".repeat(10)}`);
		expect(items.map((i) => Array.from(i.text.content).length)).toEqual([2000, 10]);
		expect(items[0]?.text.content.endsWith("🐙")).toBe(true);
	});

	it("splits a paragraph whose rich text overflows 100 items into several paragraphs", () => {
		const md = Array.from({ length: 150 }, (_, i) => (i % 2 ? `**b${i}**` : `i${i}`)).join(" ");
		const blocks = markdownToBlocks(`${md}\n`, ctx);
		expect(blocks.map((b) => b.type)).toEqual(["paragraph", "paragraph"]);
		for (const b of blocks) expect(rich(b).length).toBeLessThanOrEqual(LIMITS.richTextItems);
		expect(blocks.flatMap((b) => rich(b).map((r) => r.text.content)).join("")).toBe(md.replace(/\*\*/g, ""));
	});

	it("splits a code file too long for one block's rich text into several code blocks", () => {
		const source = "x".repeat(LIMITS.text * LIMITS.richTextItems + 5);
		const blocks = textFileToBlocks(source, ".agents/skills/s/evals/cases.yaml");
		expect(blocks.map((b) => body(b).language)).toEqual(["yaml", "yaml"]);
		expect(blocks.flatMap((b) => rich(b).map((r) => r.text.content)).join("")).toBe(source);
		expect(textFileToBlocks("MIT", ".agents/skills/s/LICENSE").map((b) => body(b).language)).toEqual(["plain text"]);
	});

	it("keeps nesting to a block and its children, lifting deeper items in order", () => {
		const blocks = markdownToBlocks("- a\n  - b\n    - c\n      - d\n- e\n", ctx);
		expect(blocks.map((b) => textOf([{ ...b, [b.type]: { ...body(b), children: [] } }]))).toEqual(["a", "e"]);
		const a = body(blocks[0]).children as Block[];
		expect(a.map((b) => textOf([b]))).toEqual(["b", "c", "d"]);
		for (const b of a) expect(body(b).children).toBeUndefined();
	});

	it("caps nested children at 100 and lifts a table out of a callout", () => {
		const kids = Array.from({ length: 130 }, (_, i) => para(i));
		const table: Block = { object: "block", type: "table", table: { table_width: 1, children: [] } };
		const callout: Block = { object: "block", type: "callout", callout: { rich_text: [], children: [...kids, table] } };
		const out = limitNesting([callout]);
		expect((body(out[0]).children as Block[]).length).toBe(100);
		expect(out.length).toBe(1 + 30 + 1);
		expect(out.at(-1)?.type).toBe("table");
	});

	it("splits a table over 99 rows, repeating the header", () => {
		const md = `| H |\n| - |\n${Array.from({ length: 150 }, (_, i) => `| r${i} |`).join("\n")}\n`;
		const tables = markdownToBlocks(md, ctx);
		expect(tables.map((t) => (body(t).children as Block[]).length)).toEqual([99, 53]);
		expect(textOf([tables[1] as Block]).startsWith("H|r98")).toBe(true);
	});

	it("chunks appends to 100 blocks, 1000 nested blocks and the body size", () => {
		expect(chunkBlocks(Array.from({ length: 250 }, (_, i) => para(i))).map((c) => c.length)).toEqual([100, 100, 50]);
		const heavy: Block = { object: "block", type: "toggle", toggle: { rich_text: [], children: Array.from({ length: 99 }, (_, i) => para(i)) } };
		expect(countBlocks(heavy)).toBe(100);
		expect(chunkBlocks(Array.from({ length: 12 }, () => heavy)).map((c) => c.length)).toEqual([10, 2]);
		const big: Block = { object: "block", type: "code", code: { rich_text: textItems("x".repeat(150_000)), language: "plain text" } };
		expect(chunkBlocks([big, big, big, big]).map((c) => c.length)).toEqual([2, 2]);
	});

	it("maps code languages to Notion's list and validates link URLs", () => {
		expect(notionLanguage("yml")).toBe("yaml");
		expect(notionLanguage("sh")).toBe("shell");
		expect(notionLanguage("statblock")).toBe("yaml");
		expect(notionLanguage("klingon")).toBe("plain text");
		expect(notionLanguage(undefined)).toBe("plain text");
		expect(validUrl("https://x.y/z")).toBe("https://x.y/z");
		expect(validUrl("mailto:a@b.c")).toBe("mailto:a@b.c");
		expect(validUrl("../a.md")).toBeUndefined();
		expect(validUrl(`https://x.y/${"a".repeat(2001)}`)).toBeUndefined();
	});
});
