import { parsePage } from "../vault/parse.ts";
import { PullError } from "./ddb.ts";
import { renderInventory, renderSheet, renderSpells, summaryLine } from "./render.ts";
import type { Sheet } from "./sheet.ts";

export type PulledSection = "Sheet" | "Spells" | "Inventory";
const SECTIONS: PulledSection[] = ["Sheet", "Spells", "Inventory"];

export interface Rewrite {
	source: string;
	/** Sections whose text changed. */
	sections: PulledSection[];
	summarySet: boolean;
	/** Lines added and removed across the pulled sections, counted as a multiset difference. */
	added: number;
	removed: number;
}

/** Lines in `a` that `b` lacks, counting duplicates. */
function missing(a: string[], b: string[]): number {
	const counts = new Map<string, number>();
	for (const line of b) counts.set(line, (counts.get(line) ?? 0) + 1);
	let n = 0;
	for (const line of a) {
		const left = counts.get(line) ?? 0;
		if (left > 0) counts.set(line, left - 1);
		else n++;
	}
	return n;
}

/**
 * Rewrites the sheet side of a PC page: the `## Sheet`, `## Spells` and `## Inventory` sections whole, and a blank
 * `summary`. Every other byte of the page is kept. Sections are found by their `##` headings, so `%% %%` comments
 * and code fences cannot confuse the split.
 */
export function rewritePcPage(source: string, path: string, sheet: Sheet): Rewrite {
	const page = parsePage(path, source);
	const h2 = page.headings.filter((h) => h.depth === 2);
	const lines = source.split("\n");

	const ranges = SECTIONS.map((name) => {
		const at = h2.findIndex((h) => h.text === name);
		if (at === -1) {
			throw new PullError(`${path}: no "## ${name}" section. A PC page needs the Sheet, Spells and Inventory sections; copy them from wiki/templates/PC.md.`);
		}
		const start = h2[at]!.line - 1;
		const next = h2[at + 1];
		return { name, start, end: next ? next.line - 1 : lines.length };
	});

	const oldSheet = lines.slice(ranges[0]!.start, ranges[0]!.end).join("\n");
	const keptPlayer = /^- \*\*Player\.\*\*[ \t]*(.*)$/m.exec(oldSheet)?.[1]?.trim() ?? "";
	const rendered: Record<PulledSection, string> = {
		Sheet: renderSheet(sheet, keptPlayer || sheet.account || ""),
		Spells: renderSpells(sheet),
		Inventory: renderInventory(sheet),
	};

	const changed: PulledSection[] = [];
	let added = 0;
	let removed = 0;
	// Later sections first, so earlier line numbers stay valid.
	for (const r of [...ranges].sort((a, b) => b.start - a.start)) {
		const oldLines = lines.slice(r.start, r.end);
		const newLines = rendered[r.name].split("\n");
		// A section that runs to the end of the file already ends with the file's final newline.
		if (r.end === lines.length && oldLines[oldLines.length - 1] !== "") newLines.pop();
		if (oldLines.join("\n") === newLines.join("\n")) continue;
		changed.unshift(r.name);
		added += missing(newLines, oldLines);
		removed += missing(oldLines, newLines);
		lines.splice(r.start, r.end - r.start, ...newLines);
	}

	let summarySet = false;
	const summary = page.frontmatter?.summary;
	if (page.frontmatter && (summary === undefined || summary === null || (typeof summary === "string" && summary.trim() === "")) && "summary" in page.frontmatter) {
		const line = lines.findIndex((l, i) => i < page.frontmatterEndLine - 1 && /^summary:[ \t]*(""|'')?[ \t]*$/.test(l));
		if (line !== -1) {
			lines[line] = `summary: ${JSON.stringify(summaryLine(sheet))}`;
			summarySet = true;
		}
	}

	return { source: lines.join("\n"), sections: SECTIONS.filter((s) => changed.includes(s)), summarySet, added, removed };
}
