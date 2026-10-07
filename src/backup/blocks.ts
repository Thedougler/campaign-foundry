import type { Blockquote, List, ListItem, PhrasingContent, Root, RootContent, Table } from "mdast";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { parseWikiLinkText } from "../vault/parse.ts";
import type { WikiLink } from "../vault/types.ts";

/** Notion's request limits: https://developers.notion.com/reference/request-limits */
export const LIMITS = {
	/** Characters in one rich text object's `text.content` (and a link URL). */
	text: 2000,
	/** Rich text objects in one block's array. */
	richTextItems: 100,
	/** Children in one append request or one nested `children` array. */
	children: 100,
	/** Levels of blocks one append request may carry: a block and its children, no grandchildren. */
	depth: 2,
	/** Block objects in one request, nested ones counted. */
	blocksPerRequest: 1000,
	/** Request body size; kept under Notion's 500 KB. */
	bytesPerRequest: 450_000,
	/** Rows in one table, which Notion creates with its rows in one request. */
	tableRows: 99,
} as const;

export interface Annotations {
	bold?: boolean;
	italic?: boolean;
	strikethrough?: boolean;
	code?: boolean;
	color?: string;
}

export interface RichText {
	type: "text";
	text: { content: string; link?: { url: string } | null };
	annotations?: Annotations;
}

export interface Block {
	object: "block";
	type: string;
	[key: string]: unknown;
}

/** What the converter asks the run about links and embeds, so pages link to each other inside Notion. */
export interface ConvertContext {
	/** The Notion URL of the page a `[[wikilink]]` names, or undefined to leave it as plain text. */
	link(target: string): string | undefined;
	/** The Notion URL for a relative Markdown link (`../NPCs/Ilse.md`), or undefined to leave it as text. */
	relative(href: string): string | undefined;
	/** The image block source for an embed (`![[Map.png]]`, `![](map.png)`), or undefined when no upload exists. */
	image(target: string): { fileUploadId: string } | { url: string } | undefined;
}

/** Callout icons by Obsidian callout type; anything else gets the pin. */
const CALLOUT_ICON: Record<string, string> = {
	narration: "🗣️",
	note: "📝",
	info: "ℹ️",
	tip: "💡",
	hint: "💡",
	important: "❗",
	warning: "⚠️",
	caution: "⚠️",
	danger: "🔥",
	error: "⛔",
	bug: "🐞",
	example: "🧪",
	quote: "💬",
	cite: "💬",
	question: "❓",
	faq: "❓",
	success: "✅",
	check: "✅",
	done: "✅",
	abstract: "📋",
	summary: "📋",
	tldr: "📋",
	todo: "☑️",
	failure: "❌",
	fail: "❌",
	missing: "❌",
};

/** Code languages Notion accepts; others fall back to `plain text`. */
const NOTION_LANGUAGES = new Set([
	"abap", "abc", "agda", "arduino", "ascii art", "assembly", "bash", "basic", "bnf", "c", "c#", "c++", "clojure", "coffeescript", "coq", "css", "dart", "dhall", "diff", "docker", "ebnf", "elixir", "elm", "erlang", "f#", "flow", "fortran", "gherkin", "glsl", "go", "graphql", "groovy", "haskell", "hcl", "html", "idris", "java", "javascript", "json", "julia", "kotlin", "latex", "less", "lisp", "livescript", "llvm ir", "lua", "makefile", "markdown", "markup", "matlab", "mathematica", "mermaid", "nix", "notion formula", "objective-c", "ocaml", "pascal", "perl", "php", "plain text", "powershell", "prolog", "protobuf", "purescript", "python", "r", "racket", "reason", "ruby", "rust", "sass", "scala", "scheme", "scss", "shell", "smalltalk", "solidity", "sql", "swift", "toml", "typescript", "vb.net", "verilog", "vhdl", "visual basic", "webassembly", "xml", "yaml", "java/c/c++/c#",
]);
const LANGUAGE_ALIASES: Record<string, string> = { sh: "shell", zsh: "shell", console: "shell", ts: "typescript", js: "javascript", py: "python", yml: "yaml", md: "markdown", text: "plain text", txt: "plain text", jsonc: "json", json5: "json", statblock: "yaml", base: "yaml", dockerfile: "docker", toml: "toml", cs: "c#", cpp: "c++" };
/** Obsidian plugin blocks that render only in Obsidian; their source is kept as YAML with this caption. */
const PLUGIN_FENCES: Record<string, string> = {
	statblock: "Fantasy Statblocks source: renders as a stat block in Obsidian only.",
	base: "Obsidian Bases query: a live table in Obsidian only.",
	dataview: "Dataview query: a live result in Obsidian only.",
};

export function notionLanguage(lang: string | null | undefined): string {
	const l = (lang ?? "").trim().toLowerCase();
	if (!l) return "plain text";
	const mapped = LANGUAGE_ALIASES[l] ?? l;
	return NOTION_LANGUAGES.has(mapped) ? mapped : "plain text";
}

const parser = unified().use(remarkParse).use(remarkFrontmatter, ["yaml"]).use(remarkGfm);
const WIKILINK = /(!?)\[\[([^[\]\n]*)\]\]/g;
const CALLOUT_TITLE = /^\[!([^\]\s]+)\][+-]?[ \t]*([^\n]*)/;
const BLOCK_ID = /\s\^[A-Za-z0-9-]+\s*$/;

const block = (type: string, body: Record<string, unknown>): Block => ({ object: "block", type, [type]: body });

/** Splits text into rich text objects of at most LIMITS.text characters, keeping surrogate pairs whole. */
export function textItems(content: string, annotations: Annotations = {}, url?: string): RichText[] {
	if (content === "") return [];
	const out: RichText[] = [];
	const chars = Array.from(content);
	for (let i = 0; i < chars.length; i += LIMITS.text) {
		const item: RichText = { type: "text", text: { content: chars.slice(i, i + LIMITS.text).join("") } };
		if (url) item.text.link = { url };
		if (Object.values(annotations).some(Boolean)) item.annotations = { ...annotations };
		out.push(item);
	}
	return out;
}

export function validUrl(url: string): string | undefined {
	if (url.length > LIMITS.text) return undefined;
	try {
		const u = new URL(url);
		return ["http:", "https:", "mailto:"].includes(u.protocol) ? url : undefined;
	} catch {
		return undefined;
	}
}

/** Merges neighbours with the same formatting so a page stays under the rich text item limit. */
function mergeRich(items: RichText[]): RichText[] {
	const out: RichText[] = [];
	for (const item of items) {
		const last = out.at(-1);
		if (
			last &&
			JSON.stringify(last.annotations ?? {}) === JSON.stringify(item.annotations ?? {}) &&
			(last.text.link?.url ?? "") === (item.text.link?.url ?? "") &&
			Array.from(last.text.content).length + Array.from(item.text.content).length <= LIMITS.text
		) {
			last.text.content += item.text.content;
		} else out.push({ ...item, text: { ...item.text } });
	}
	return out;
}

/** An inline image found while converting a paragraph: it becomes its own image block after the text. */
interface Inline {
	rich: RichText[];
	images: Block[];
}

class Converter {
	private readonly ctx: ConvertContext;

	constructor(ctx: ConvertContext) {
		this.ctx = ctx;
	}

	private imageBlock(target: string, caption: string): Block | undefined {
		const src = this.ctx.image(target);
		if (!src) return undefined;
		const captionRich = textItems(caption);
		if ("fileUploadId" in src) return block("image", { type: "file_upload", file_upload: { id: src.fileUploadId }, caption: captionRich });
		return block("image", { type: "external", external: { url: src.url }, caption: captionRich });
	}

	/** Plain text with wikilinks resolved to Notion links and image embeds lifted out as image blocks. */
	private text(value: string, ann: Annotations, out: Inline): void {
		let cursor = 0;
		for (const match of value.matchAll(WIKILINK)) {
			out.rich.push(...textItems(value.slice(cursor, match.index), ann));
			cursor = (match.index ?? 0) + match[0].length;
			const link: WikiLink = parseWikiLinkText(match[0], match[1] === "!", match[2] ?? "", 0, false);
			const name = link.target.slice(link.target.lastIndexOf("/") + 1);
			if (link.embed) {
				const image = this.imageBlock(link.target, link.alias && !/^\d+(x\d+)?$/.test(link.alias) ? link.alias : "");
				if (image) {
					out.images.push(image);
					continue;
				}
			}
			const label = link.alias ?? ([name, ...link.headings].filter(Boolean).join(" > ") || match[0]);
			const url = link.target ? this.ctx.link(link.target) : undefined;
			out.rich.push(...textItems(label, ann, url));
		}
		out.rich.push(...textItems(value.slice(cursor), ann));
	}

	private phrasing(nodes: PhrasingContent[], ann: Annotations, out: Inline, url?: string): void {
		for (const node of nodes) {
			switch (node.type) {
				case "text":
					if (url) out.rich.push(...textItems(node.value, ann, url));
					else this.text(node.value, ann, out);
					break;
				case "strong":
					this.phrasing(node.children, { ...ann, bold: true }, out, url);
					break;
				case "emphasis":
					this.phrasing(node.children, { ...ann, italic: true }, out, url);
					break;
				case "delete":
					this.phrasing(node.children, { ...ann, strikethrough: true }, out, url);
					break;
				case "inlineCode":
					out.rich.push(...textItems(node.value, { ...ann, code: true }, url));
					break;
				case "break":
					out.rich.push(...textItems("\n", ann));
					break;
				case "link": {
					const target = validUrl(node.url) ?? this.ctx.relative(node.url);
					this.phrasing(node.children, ann, out, target);
					break;
				}
				case "image": {
					const image = this.imageBlock(node.url, node.alt ?? "");
					if (image) out.images.push(image);
					else out.rich.push(...textItems(node.alt || node.url, ann, validUrl(node.url)));
					break;
				}
				case "html":
					out.rich.push(...textItems(node.value, ann));
					break;
				case "footnoteReference":
					out.rich.push(...textItems(`[^${node.identifier}]`, ann));
					break;
				default:
					if ("children" in node) this.phrasing(node.children as PhrasingContent[], ann, out, url);
					else if ("value" in node) out.rich.push(...textItems(String(node.value), ann));
			}
		}
	}

	inline(nodes: PhrasingContent[]): Inline {
		const out: Inline = { rich: [], images: [] };
		this.phrasing(nodes, {}, out);
		const last = out.rich.at(-1);
		if (last && !last.annotations?.code) last.text.content = last.text.content.replace(BLOCK_ID, "");
		out.rich = mergeRich(out.rich).filter((r) => r.text.content !== "");
		return out;
	}

	/** A text block (paragraph, heading, list item) split into several when its rich text overflows the item limit. */
	private textBlocks(type: string, rich: RichText[], extra: Record<string, unknown> = {}, children: Block[] = []): Block[] {
		const out: Block[] = [];
		for (let i = 0; i === 0 || i < rich.length; i += LIMITS.richTextItems) {
			out.push(block(type, { rich_text: rich.slice(i, i + LIMITS.richTextItems), ...extra }));
		}
		const last = out.at(-1);
		if (last && children.length > 0) (last[type] as Record<string, unknown>).children = children;
		return out;
	}

	private code(value: string, lang: string | null | undefined, caption = ""): Block {
		return block("code", { rich_text: textItems(value), language: notionLanguage(lang), caption: textItems(caption) });
	}

	private codeBlocks(value: string, lang: string | null | undefined, caption = ""): Block[] {
		const perBlock = LIMITS.text * LIMITS.richTextItems;
		const chars = Array.from(value);
		if (chars.length <= perBlock) return [this.code(value, lang, caption)];
		const out: Block[] = [];
		for (let i = 0; i < chars.length; i += perBlock) out.push(this.code(chars.slice(i, i + perBlock).join(""), lang, i === 0 ? caption : ""));
		return out;
	}

	private list(node: List): Block[] {
		return node.children.flatMap((item: ListItem) => {
			const [first, ...rest] = item.children;
			const head = first?.type === "paragraph" ? this.inline(first.children) : { rich: [], images: [] };
			const children = [...head.images, ...this.nodes(first?.type === "paragraph" ? rest : item.children)];
			if (typeof item.checked === "boolean") return this.textBlocks("to_do", head.rich, { checked: item.checked }, children);
			return this.textBlocks(node.ordered ? "numbered_list_item" : "bulleted_list_item", head.rich, {}, children);
		});
	}

	private blockquote(node: Blockquote): Block[] {
		const [first, ...rest] = node.children;
		const firstText = first?.type === "paragraph" && first.children[0]?.type === "text" ? first.children[0].value : "";
		const callout = CALLOUT_TITLE.exec(firstText);
		if (!callout || first?.type !== "paragraph") {
			if (first?.type !== "paragraph") return [block("quote", { rich_text: [], children: this.nodes(node.children) })];
			const head = this.inline(first.children);
			return this.textBlocks("quote", head.rich, {}, [...head.images, ...this.nodes(rest)]);
		}
		// `> [!type] Title\n> body…`: the title line is the callout's text, the rest its children.
		const type = (callout[1] ?? "note").toLowerCase();
		const paragraph = structuredClone(first);
		const lead = paragraph.children[0];
		if (lead?.type === "text") lead.value = lead.value.slice(callout[0].length - (callout[2] ?? "").length);
		const nl = paragraph.children.findIndex((c) => (c.type === "text" && c.value.includes("\n")) || c.type === "break");
		let titleNodes = paragraph.children;
		let bodyNodes: PhrasingContent[] = [];
		if (nl !== -1) {
			const split = paragraph.children[nl];
			titleNodes = paragraph.children.slice(0, nl);
			bodyNodes = paragraph.children.slice(nl + 1);
			if (split?.type === "text") {
				const at = split.value.indexOf("\n");
				const before = split.value.slice(0, at);
				const after = split.value.slice(at + 1);
				if (before) titleNodes.push({ type: "text", value: before });
				if (after) bodyNodes.unshift({ type: "text", value: after });
			}
		}
		const title = this.inline(titleNodes);
		const body = bodyNodes.length > 0 ? this.paragraph(bodyNodes) : [];
		const label = title.rich.length > 0 ? title.rich.map((r) => ({ ...r, annotations: { ...r.annotations, bold: true } })) : textItems(type[0]?.toUpperCase() + type.slice(1), { bold: true });
		const children = [...title.images, ...body, ...this.nodes(rest)];
		return this.textBlocks("callout", label, { icon: { type: "emoji", emoji: CALLOUT_ICON[type] ?? "📌" }, color: type === "narration" ? "brown_background" : "gray_background" }, children);
	}

	private paragraph(children: PhrasingContent[]): Block[] {
		const { rich, images } = this.inline(children);
		return [...(rich.length > 0 ? this.textBlocks("paragraph", rich) : []), ...images];
	}

	private table(node: Table): Block[] {
		const rows = node.children.map((row) => row.children.map((cell) => this.inline(cell.children).rich.slice(0, LIMITS.richTextItems)));
		const width = Math.max(1, ...rows.map((r) => r.length));
		const pad = (r: RichText[][]): RichText[][] => [...r, ...Array.from({ length: width - r.length }, () => [])].slice(0, width);
		const [header = [], ...body] = rows;
		const out: Block[] = [];
		const perTable = LIMITS.tableRows - 1;
		for (let i = 0; i === 0 || i < body.length; i += perTable) {
			const slice = [header, ...body.slice(i, i + perTable)];
			out.push(block("table", { table_width: width, has_column_header: true, has_row_header: false, children: slice.map((cells) => block("table_row", { cells: pad(cells) })) }));
		}
		return out;
	}

	node(node: RootContent): Block[] {
		switch (node.type) {
			case "yaml":
				return this.codeBlocks(node.value, "yaml", "Frontmatter");
			case "heading": {
				const { rich, images } = this.inline(node.children);
				const type = node.depth === 1 ? "heading_1" : node.depth === 2 ? "heading_2" : "heading_3";
				return [...this.textBlocks(type, rich), ...images];
			}
			case "paragraph":
				return this.paragraph(node.children);
			case "list":
				return this.list(node);
			case "blockquote":
				return this.blockquote(node);
			case "code": {
				const lang = (node.lang ?? "").toLowerCase();
				return this.codeBlocks(node.value, node.lang, PLUGIN_FENCES[lang] ?? "");
			}
			case "thematicBreak":
				return [block("divider", {})];
			case "table":
				return this.table(node);
			case "html":
				return this.textBlocks("paragraph", textItems(node.value));
			case "footnoteDefinition": {
				const blocks = this.nodes(node.children);
				return [...this.textBlocks("paragraph", textItems(`[^${node.identifier}]:`, { bold: true })), ...blocks];
			}
			case "definition":
				return [];
			default:
				return "children" in node ? this.nodes(node.children as RootContent[]) : [];
		}
	}

	nodes(nodes: RootContent[]): Block[] {
		return nodes.flatMap((n) => this.node(n));
	}
}

export function parseMarkdown(source: string): Root {
	return parser.parse(source);
}

/** Markdown (Obsidian flavour) to Notion blocks, with nesting kept within what one append request carries. */
export function markdownToBlocks(source: string, ctx: ConvertContext): Block[] {
	const converter = new Converter(ctx);
	return limitNesting(converter.nodes(parseMarkdown(source).children));
}

/** A non-Markdown file (YAML, JSON, a script) as code blocks in the language its extension names. */
export function textFileToBlocks(source: string, path: string): Block[] {
	const name = path.slice(path.lastIndexOf("/") + 1);
	const lang = name.includes(".") ? name.slice(name.lastIndexOf(".") + 1) : "plain text";
	const converter = new Converter({ link: () => undefined, relative: () => undefined, image: () => undefined });
	return converter.nodes([{ type: "code", lang, value: source }]);
}

const childrenOf = (b: Block): Block[] | undefined => (b[b.type] as { children?: Block[] } | undefined)?.children;
function setChildren(b: Block, children: Block[] | undefined): void {
	const body = b[b.type] as Record<string, unknown>;
	if (children && children.length > 0) body.children = children;
	else delete body.children;
}

/**
 * Keeps blocks within what one append request carries: a block and its children, no grandchildren (LIMITS.depth levels),
 * and at most LIMITS.children per nested array. Deeper descendants are lifted to follow their ancestor at the deepest
 * allowed level, in order, so no text is dropped; a nested table (which brings its own rows) is lifted to the top level.
 */
export function limitNesting(blocks: Block[], depth = 1): Block[] {
	const out: Block[] = [];
	for (const b of blocks) {
		const kids = childrenOf(b);
		if (!kids || b.type === "table") {
			out.push(b);
			continue;
		}
		if (depth >= LIMITS.depth) {
			setChildren(b, undefined);
			out.push(b, ...limitNesting(kids, depth));
			continue;
		}
		const limited = limitNesting(kids, depth + 1);
		const nested = limited.filter((k) => k.type !== "table");
		setChildren(b, nested.slice(0, LIMITS.children));
		out.push(b, ...nested.slice(LIMITS.children), ...limited.filter((k) => k.type === "table"));
	}
	return out;
}

/** Blocks in one subtree, the block itself included: Notion's per-request block count. */
export function countBlocks(b: Block): number {
	return 1 + (childrenOf(b) ?? []).reduce((n, c) => n + countBlocks(c), 0);
}

/** Splits top-level blocks into append requests within the child, nested-block and body-size limits. */
export function chunkBlocks(blocks: Block[]): Block[][] {
	const chunks: Block[][] = [];
	let current: Block[] = [];
	let count = 0;
	let bytes = 0;
	for (const b of blocks) {
		const n = countBlocks(b);
		const size = Buffer.byteLength(JSON.stringify(b));
		if (current.length > 0 && (current.length >= LIMITS.children || count + n > LIMITS.blocksPerRequest || bytes + size > LIMITS.bytesPerRequest)) {
			chunks.push(current);
			current = [];
			count = 0;
			bytes = 0;
		}
		current.push(b);
		count += n;
		bytes += size;
	}
	if (current.length > 0) chunks.push(current);
	return chunks;
}
