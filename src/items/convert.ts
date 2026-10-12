import type { Heading } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";

const processor = unified().use(remarkParse).use(remarkGfm);

/** One exported Item: classification and all remaining rules are source slices, not rewritten Markdown. */
export interface ExportedItem {
	title: string;
	classification: string;
	properties: string;
}

/** Read top-level level-four Item headings, preserving tables, lists and internal separators verbatim. */
export function parseItems(source: string): ExportedItem[] {
	const nodes = processor.parse(source).children;
	const starts = nodes.flatMap((node, index) => (node.type === "heading" && node.depth === 4 ? [index] : []));
	return starts.map((start, i) => {
		const heading = nodes[start] as Heading;
		const title = mdastToString(heading).trim();
		const end = starts[i + 1] ?? nodes.length;
		const classification = nodes[start + 1];
		if (
			!title ||
			classification?.type !== "paragraph" ||
			classification.position?.start.line !== classification.position?.end.line
		) {
			throw new Error(`Item at line ${heading.position?.start.line}: expected a title and one classification line.`);
		}
		const separator = nodes.slice(start + 2, end).findIndex((node) => node.type === "thematicBreak");
		if (separator < 0) throw new Error(`Item ${title}: missing --- after its classification.`);
		const bodyStart = start + 3 + separator;
		let bodyEnd = end;
		if (nodes[bodyEnd - 1]?.type === "thematicBreak") bodyEnd--;
		const metadata = source
			.slice(classification.position?.end.offset, nodes[bodyStart - 1]?.position?.start.offset)
			.trim();
		const body =
			bodyStart < bodyEnd
				? source.slice(nodes[bodyStart]?.position?.start.offset, nodes[bodyEnd - 1]?.position?.end.offset).trim()
				: "";
		if (!body) throw new Error(`Item ${title}: missing Properties text.`);
		return {
			title,
			classification: source.slice(classification.position?.start.offset, classification.position?.end.offset).trim(),
			properties: [metadata, body].filter(Boolean).join("\n\n"),
		};
	});
}
