import type { Blockquote, Html, Paragraph, PhrasingContent, Root, RootContent, Text } from "mdast";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import { BLOCK_ID, CALLOUT_TITLE, parseWikiLinkText, WIKILINK } from "../vault/dialect.ts";
import { blank } from "../vault/parse.ts";
import type { Page, WikiLink } from "../vault/types.ts";

/** What the renderer needs to know about the Adventure it renders into. */
export interface RenderContext {
	/** The Foundry document a page link points at, or undefined when it is not in the Adventure (rendered as plain text). */
	target(link: WikiLink): { uuid: string; label: string } | undefined;
	/** The module path of an embedded attachment image, or undefined when the embed is not a shipped image. */
	image(link: WikiLink): string | undefined;
}

export interface RenderOptions {
	/** Keep only `[!narration]` callouts and the image embedded right under each (a Handout). */
	narrationOnly?: boolean;
	/** `##` sections to leave out, by heading (the Obsidian-only `Links` section is always left out). */
	omit?: string[];
}

const CALLOUT_STYLE: Record<string, string> = {
	narration:
		"border-left: 4px solid #8a6d3b; padding: 0.4em 1em; margin: 0.8em 0; background: rgba(138, 109, 59, 0.12); font-style: italic;",
};
const DEFAULT_CALLOUT_STYLE =
	"border-left: 4px solid #666; padding: 0.4em 1em; margin: 0.8em 0; background: rgba(102, 102, 102, 0.1);";

const parser = unified().use(remarkParse).use(remarkFrontmatter, ["yaml"]).use(remarkGfm);
const compiler = unified()
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeStringify, { allowDangerousHtml: true });

// Match Cues before links so a Cue can contain a resolved wikilink.
const INLINE = new RegExp(`==([^=\\n]+)==|${WIKILINK.source}`, "g");
const esc = (s: string): string => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function nameOf(link: WikiLink): string {
	return link.alias ?? link.target.slice(link.target.lastIndexOf("/") + 1);
}

/** Text with Cues marked and wikilinks resolved: page links become `@UUID[...]{label}`, images `<img>`. */
function rewriteText(value: string, ctx: RenderContext): PhrasingContent[] {
	const out: PhrasingContent[] = [];
	let cursor = 0;
	const pushText = (text: string): void => {
		if (text) out.push({ type: "text", value: text } satisfies Text);
	};
	for (const match of value.matchAll(INLINE)) {
		pushText(value.slice(cursor, match.index));
		cursor = (match.index ?? 0) + match[0].length;
		if (match[1] !== undefined) {
			out.push({ type: "html", value: "<mark>" }, ...rewriteText(match[1], ctx), {
				type: "html",
				value: "</mark>",
			});
			continue;
		}
		const link = parseWikiLinkText(match[0], match[2] === "!", match[3] ?? "", 0, false);
		const image = link.embed ? ctx.image(link) : undefined;
		if (image) {
			out.push({
				type: "html",
				value: `<img src="${esc(image)}" alt="${esc(link.alias ?? link.target.replace(/\.[A-Za-z0-9]+$/, ""))}">`,
			} satisfies Html);
			continue;
		}
		const target = ctx.target(link);
		pushText(target ? `@UUID[${target.uuid}]{${link.alias ?? target.label}}` : nameOf(link));
	}
	pushText(value.slice(cursor));
	return out;
}

function rewriteChildren(node: { children: RootContent[] }, ctx: RenderContext): void {
	const next: RootContent[] = [];
	node.children.forEach((child, index) => {
		if (child.type === "text") {
			let value = child.value;
			if (index === node.children.length - 1) value = value.replace(BLOCK_ID, "");
			next.push(...rewriteText(value, ctx));
			return;
		}
		if (child.type === "code" || child.type === "inlineCode" || child.type === "html") {
			next.push(child);
			return;
		}
		if ("children" in child) rewriteChildren(child as { children: RootContent[] }, ctx);
		next.push(child);
	});
	node.children = next;
}

/** Turns a `> [!type] Title` blockquote into a styled blockquote; returns its callout type, or undefined for a plain quote. */
function styleCallout(quote: Blockquote): string | undefined {
	const first = quote.children[0];
	const text = first?.type === "paragraph" ? first.children[0] : undefined;
	if (first?.type !== "paragraph" || text?.type !== "text") return undefined;
	const head = CALLOUT_TITLE.exec(text.value);
	if (!head) return undefined;
	const type = (head[1] ?? "").toLowerCase();
	const title = (head[2] ?? "").trim();
	// The title pattern stops at the line's end, so the soft break after it goes here, keeping the body's own first line.
	text.value = text.value.slice(head[0].length).replace(/^\n/, "");
	if (text.value === "") first.children.shift();
	if (first.children.length === 0) quote.children.shift();
	if (title) {
		const titleParagraph: Paragraph = {
			type: "paragraph",
			children: [{ type: "text", value: title }],
			data: { hProperties: { className: ["cf-callout-title"] } } as Paragraph["data"],
		};
		quote.children.unshift(titleParagraph);
	}
	quote.data = {
		hProperties: { className: ["cf-callout", `cf-${type}`], style: CALLOUT_STYLE[type] ?? DEFAULT_CALLOUT_STYLE },
	} as Blockquote["data"];
	return type;
}

/** True for a paragraph that holds nothing but image embeds. */
function isImageLine(node: RootContent): boolean {
	return (
		node.type === "paragraph" &&
		node.children.every(
			(c) =>
				(c.type === "text" && /^(\s*!\[\[[^\]]+\]\]\s*)+$/.test(c.value)) ||
				(c.type === "text" && c.value.trim() === ""),
		)
	);
}

function dropSections(children: RootContent[], omit: string[]): RootContent[] {
	const out: RootContent[] = [];
	let skipping = false;
	for (const node of children) {
		if (node.type === "heading" && node.depth <= 2) {
			const title = node.children
				.map((c) => ("value" in c ? c.value : ""))
				.join("")
				.trim();
			skipping = omit.includes(title);
		}
		if (!skipping) out.push(node);
	}
	return out;
}

/** Renders a Wiki page's body as the HTML of a Foundry journal page. */
export function renderMarkdown(page: Page, ctx: RenderContext, options: RenderOptions = {}): string {
	const source = blank(
		page.source,
		page.comments.map((c): [number, number] => [c.start, c.end]),
		true,
	);
	const tree: Root = parser.parse(source);
	let children = dropSections(
		tree.children.filter((n) => n.type !== "yaml"),
		["Links", ...(options.omit ?? [])],
	);

	if (options.narrationOnly) {
		const kept: RootContent[] = [];
		children.forEach((node, i) => {
			if (node.type !== "blockquote") return;
			if (styleCallout(node) !== "narration") return;
			kept.push(node);
			const after = children[i + 1];
			if (after && isImageLine(after)) kept.push(after);
		});
		children = kept;
	} else {
		for (const node of children) if (node.type === "blockquote") styleCallout(node);
	}
	const root: Root = { type: "root", children };
	rewriteChildren(root, ctx);
	const hast = compiler.runSync(root);
	return compiler.stringify(hast).trim();
}

/** Renders a snippet of inline markdown (a statblock feature's `desc`) as HTML, with no page around it. */
export function markdownToHtml(text: string): string {
	const tree: Root = parser.parse(text);
	return compiler.stringify(compiler.runSync(tree)).trim();
}
