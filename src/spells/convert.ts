import type { Heading } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";

const processor = unified().use(remarkParse).use(remarkGfm);
const statNames = ["Casting Time", "Range", "Components", "Duration"];

/** One exported Spell; casting bullets and description are verbatim source slices. */
export interface ExportedSpell {
	title: string;
	level: number;
	school: string;
	casting: string;
	description: string;
	classes: string[];
}

/** Read batch h4 entries or a standalone h1 export; stop at the first malformed block before any writing. */
export function parseSpells(source: string): ExportedSpell[] {
	const nodes = processor.parse(source).children;
	let starts = nodes.flatMap((node, index) => (node.type === "heading" && node.depth === 4 ? [index] : []));
	if (starts.length === 0) {
		const headings = nodes.flatMap((node, index) => (node.type === "heading" && node.depth === 1 ? [index] : []));
		if (headings.length === 1) starts = headings;
	}
	return starts.map((start, i) => {
		const heading = nodes[start] as Heading;
		const title = mdastToString(heading).trim();
		const label = `${title || "(untitled)"} (line ${heading.position?.start.line})`;
		const end = starts[i + 1] ?? nodes.length;
		const levelLine = nodes[start + 1];
		if (!title || levelLine?.type !== "paragraph" || levelLine.position?.start.line !== levelLine.position?.end.line) {
			throw new Error(`${label}: expected a title and one level line.`);
		}
		const levelText = mdastToString(levelLine).trim().replace(/\.$/, "");
		const levelMatch = /^Level ([1-9]) ([A-Za-z]+)$/.exec(levelText);
		const cantripMatch = /^([A-Za-z]+) Cantrip$/.exec(levelText);
		if (!levelMatch && !cantripMatch) throw new Error(`${label}: expected Level <N> <School> or <School> Cantrip.`);
		if (nodes[start + 2]?.type !== "thematicBreak") throw new Error(`${label}: missing ___ before its casting list.`);
		const castingList = nodes[start + 3];
		if (
			castingList?.type !== "list" ||
			castingList.ordered ||
			castingList.children.length !== statNames.length ||
			castingList.children.some((item, index) => {
				const text = source.slice(item.position?.start.offset, item.position?.end.offset);
				return (
					!text.startsWith(`- **${statNames[index]}:** `) ||
					!text.slice(text.indexOf(":** ") + 4).trim() ||
					/[\r\n]/.test(text)
				);
			})
		) {
			throw new Error(`${label}: expected Casting Time, Range, Components and Duration bullets.`);
		}
		if (nodes[start + 4]?.type !== "thematicBreak") throw new Error(`${label}: missing --- after its casting list.`);
		const bodyStart = start + 5;
		let bodyEnd = end;
		if (nodes[bodyEnd - 1]?.type === "thematicBreak") bodyEnd--;
		let description =
			bodyStart < bodyEnd
				? source.slice(nodes[bodyStart]?.position?.start.offset, nodes[bodyEnd - 1]?.position?.end.offset).trim()
				: "";
		let classes: string[] = [];
		if (nodes[bodyEnd - 1]?.type === "paragraph") {
			const classLine = /(?:^|\r?\n)\*\*Classes:\*\*[^\S\r\n]*([^\r\n]*)$/.exec(description);
			if (classLine) {
				classes = [
					...new Set(
						classLine[1]!
							.split(",")
							.map((name) => name.trim())
							.filter(Boolean),
					),
				];
				description = description.slice(0, classLine.index).trimEnd();
			}
		}
		if (!description) throw new Error(`${label}: missing rules text.`);
		return {
			title,
			level: levelMatch ? Number(levelMatch[1]) : 0,
			school: (levelMatch?.[2] ?? cantripMatch?.[1])!,
			casting: source.slice(castingList.position?.start.offset, castingList.position?.end.offset),
			description,
			classes,
		};
	});
}
