import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { markdownTable } from "markdown-table";
import type { Heading, Html, Nodes, Table } from "mdast";
import { applyFixes, type Configuration } from "markdownlint";
import { lint } from "markdownlint/promise";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { parse, stringify } from "yaml";
import { toolRoot } from "../check/prose.ts";
import type { ExportedItem } from "./convert.ts";
import { normaliseItemSpelling } from "./spelling.ts";

const processor = unified().use(remarkParse).use(remarkGfm);
let config: Promise<Configuration> | undefined;

/** Nest all subheadings, remove inline export tags and align tables; wording, code and comments stay untouched. */
function normaliseStructure(text: string): string {
	let result = text;
	const nodes: (Heading | Html | Table)[] = [];
	const collect = (node: Nodes, inline = false): void => {
		if (node.type === "heading" && node.depth >= 5) nodes.push(node);
		else if (node.type === "html" && inline && !node.value.startsWith("<!--")) nodes.push(node);
		else if ("children" in node) for (const child of node.children) collect(child, inline || node.type === "paragraph");
	};
	for (const node of processor.parse(text).children) {
		if (node.type === "table") nodes.push(node);
		else collect(node);
	}
	for (let index = nodes.length - 1; index >= 0; index--) {
		const node = nodes[index]!;
		if (!node.position) continue;
		const at = node.position.start.offset ?? 0;
		if (node.type === "heading" && node.depth >= 5) {
			result = result.slice(0, at) + result.slice(at + 1);
		} else if (node.type === "table") {
			const end = node.position.end.offset ?? text.length;
			const rows = node.children.map((row) =>
				row.children.map((cell) => text.slice(cell.position?.start.offset, cell.position?.end.offset).trim()),
			);
			result = result.slice(0, at) + markdownTable(rows, { align: node.align }) + result.slice(end);
		} else if (node.type === "html") {
			result = result.slice(0, at) + result.slice(node.position.end.offset ?? at);
		}
	}
	return result;
}

/** Minimal World-free Item page, with the template's Links copied and only mechanical gate normalisation. */
export async function itemPage(item: ExportedItem, source: string, template: string): Promise<string> {
	const links = processor
		.parse(template)
		.children.find(
			(node) =>
				node.type === "heading" &&
				node.depth === 2 &&
				template.slice(node.position?.start.offset, node.position?.end.offset) === "## Links",
		);
	if (!links) throw new Error("Item template has no ## Links block.");
	const classification = await normaliseItemSpelling(
		item.classification.includes("<") ? normaliseStructure(item.classification) : item.classification,
	);
	const properties = normaliseStructure(await normaliseItemSpelling(item.properties));
	let page = `---\n${stringify({ title: item.title, type: "Item" }).trimEnd()}\nsummary: ""\nsources: ${JSON.stringify([source])}\n---\n\n## Play\n\n### Properties\n\n*${classification.replace(/\.$/, "")}.*\n\n${properties}\n\n${template.slice(links.position?.start.offset).trimEnd()}\n`;
	config ??= readFile(join(toolRoot, ".markdownlint.yaml"), "utf8").then((text) => parse(text) as Configuration);
	// The gate's own fixer changes whitespace and table layout, never mechanical wording.
	for (;;) {
		const findings = (await lint({ strings: { item: page }, config: await config })).item ?? [];
		const fixed = applyFixes(
			page,
			findings.filter((finding) => finding.fixInfo),
		);
		if (fixed === page) return page;
		page = fixed;
	}
}
