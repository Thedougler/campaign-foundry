import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Nodes } from "mdast";
import { applyFixes, type Configuration } from "markdownlint";
import { lint } from "markdownlint/promise";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { parse, stringify } from "yaml";
import { toolRoot } from "../check/prose.ts";
import { normaliseStructure } from "../items/page.ts";
import { normaliseItemSpelling } from "../items/spelling.ts";
import type { ExportedSpell } from "./convert.ts";

const processor = unified().use(remarkParse).use(remarkGfm);
let config: Promise<Configuration> | undefined;

/** Rename only the exported scaling run-in, never its wording or literal code. */
function normaliseScaling(text: string): string {
	const offsets: [number, number][] = [];
	const collect = (node: Nodes): void => {
		if (
			node.type === "emphasis" &&
			node.position &&
			text.slice(node.position.start.offset, node.position.end.offset) === "***At Higher Levels.***"
		) {
			offsets.push([node.position.start.offset!, node.position.end.offset!]);
		} else if ("children" in node) {
			for (const child of node.children) collect(child);
		}
	};
	collect(processor.parse(text));
	let output = text;
	for (const [start, end] of offsets.toReversed()) {
		output = `${output.slice(0, start)}***Using a Higher-Level Spell Slot.***${output.slice(end)}`;
	}
	return output;
}

/** Minimal World-free Spell entry, with only deterministic spelling and layout repairs. */
export async function spellPage(spell: ExportedSpell, source: string, template: string): Promise<string> {
	if (!processor.parse(template).children.some((node) => node.type === "heading" && node.depth === 1)) {
		throw new Error("Spell template has no # <Title> entry.");
	}
	const casting = normaliseStructure(await normaliseItemSpelling(spell.casting));
	const description = normaliseStructure(normaliseScaling(await normaliseItemSpelling(spell.description)), 3);
	const classes = spell.classes.map((name) => stringify(name).trimEnd()).join(", ");
	const levelLine = spell.level === 0 ? `${spell.school} Cantrip` : `Level ${spell.level} ${spell.school}`;
	let page = `---\n${stringify({ title: spell.title, type: "Spell" }).trimEnd()}\nsummary: ""\nsources:\n  - ${JSON.stringify(source)}\nlevel: ${spell.level}\nschool: ${spell.school}\nclasses: [${classes}]\n---\n\n# ${spell.title}\n\n*${levelLine}.*\n\n___\n\n${casting}\n\n___\n\n${description}${spell.classes.length ? `\n\n**Classes:** ${spell.classes.join(", ")}` : ""}\n`;
	config ??= readFile(join(toolRoot, ".markdownlint.yaml"), "utf8").then((text) => parse(text) as Configuration);
	// Apply the same whitespace/table-only fixes as the Item converter and page gate.
	for (;;) {
		const findings = (await lint({ strings: { spell: page }, config: await config })).spell ?? [];
		const fixed = applyFixes(
			page,
			findings.filter((finding) => finding.fixInfo),
		);
		if (fixed === page) return page;
		page = fixed;
	}
}
