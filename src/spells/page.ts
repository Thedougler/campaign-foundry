import type { Nodes } from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { stringify } from "yaml";
import { lintFixLoop, normaliseStructure } from "../items/page.ts";
import { normaliseItemSpelling } from "../items/spelling.ts";
import type { ExportedSpell } from "./convert.ts";

const processor = unified().use(remarkParse).use(remarkGfm);

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

/** Repair only literal text punctuation and spacing; Markdown syntax, code and dash placeholders stay intact. */
export function normalisePunctuation(text: string): string {
	const edits: [number, number, string][] = [];
	const collect = (node: Nodes, previous?: Nodes): void => {
		if (node.type === "text" && node.position) {
			const start = node.position.start.offset!;
			const end = node.position.end.offset!;
			const raw = text.slice(start, end);
			let fixed = raw.replace(/[\u00a0\u202f]/g, " ");
			fixed = fixed.replace(/ {2,}/g, (spaces, offset: number) => {
				const at = start + offset;
				const lineStart = text.lastIndexOf("\n", at - 1) + 1;
				return /^[ \t]*$/.test(text.slice(lineStart, at)) ? spaces : " ";
			});
			fixed = fixed.replace(/[ \t]*(—|(?<!-)--(?!-))[ \t]*/g, (match, dash: string, offset: number) => {
				const before = fixed.slice(0, offset).trimEnd();
				const after = fixed.slice(offset + match.length).trimStart();
				// A lone table placeholder, numeric range or quotation attribution is not a clause boundary.
				if (
					(!before && !after) ||
					(/\d$/.test(before) && /^\d/.test(after)) ||
					(dash === "—" && !before && /^[ \t]*—[ \t]/.test(match) && previous?.type === "emphasis")
				)
					return match;
				return ", ";
			});
			// Newly allowed range and triple-hyphen punctuation follows source em-dash repair.
			fixed = fixed.replace(/(?<=\d)-(?=\d)/g, "–").replace(/[ \t]+---[ \t]+/g, " — ");
			if (fixed !== raw) edits.push([start, end, fixed]);
		} else if ("children" in node) {
			for (let index = 0; index < node.children.length; index++)
				collect(node.children[index]!, node.children[index - 1]);
		}
	};
	collect(processor.parse(text));
	let output = text;
	for (const [start, end, fixed] of edits.toReversed())
		output = `${output.slice(0, start)}${fixed}${output.slice(end)}`;
	return output;
}

/** Minimal World-free Spell entry, with only deterministic spelling and layout repairs. */
export async function spellPage(spell: ExportedSpell, source: string, template: string): Promise<string> {
	if (!processor.parse(template).children.some((node) => node.type === "heading" && node.depth === 1)) {
		throw new Error("Spell template has no # <Title> entry.");
	}
	const casting = normaliseStructure(await normaliseItemSpelling(normalisePunctuation(spell.casting)), 3, true);
	const description = normaliseStructure(
		normaliseScaling(await normaliseItemSpelling(normalisePunctuation(spell.description))),
		3,
		true,
	);
	const classes = spell.classes.map((name) => stringify(name).trimEnd()).join(", ");
	const levelLine = spell.level === 0 ? `${spell.school} Cantrip` : `Level ${spell.level} ${spell.school}`;
	const page = `---\n${stringify({ title: spell.title, type: "Spell" }).trimEnd()}\nsummary: ""\nsources:\n  - ${JSON.stringify(source)}\nlevel: ${spell.level}\nschool: ${spell.school}\nclasses: [${classes}]\n---\n\n# ${spell.title}\n\n*${levelLine}.*\n\n___\n\n${casting}\n\n___\n\n${description}${spell.classes.length ? `\n\n**Classes:** ${spell.classes.join(", ")}` : ""}\n`;
	return lintFixLoop(page);
}
