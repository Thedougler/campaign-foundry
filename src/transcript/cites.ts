import type { Block } from "./read.ts";
import { splitLines } from "./read.ts";

const EVENT = /^\s*-\s+L(\d+)(?:\s*[–-]\s*L?(\d+))?\s+·\s+([A-Z]+)\s+·\s+(.*)$/;
const QUOTE = /["“]([^"”]+)["”]/g;
const RANGE = /L?(\d+)(?:\s*[–-]\s*L?(\d+))?/g;

const normalise = (text: string): string =>
	text
		.toLowerCase()
		.replace(/[^\p{L}\p{N}]+/gu, " ")
		.trim();
const contentWords = (text: string): string[] => [
	...new Set(
		normalise(text)
			.split(" ")
			.filter((word) => word.length >= 4),
	),
];

export interface Cite {
	line: number;
	kind: string;
	from: number;
	to: number;
	quote?: string;
	heard?: string;
}

/** Every quoted event line and every Names row in Session Ledger notes, with the lines it cites. */
export function readCites(notes: string): Cite[] {
	const cites: Cite[] = [];
	let section = "";
	let heardAt = -1;
	let linesAt = -1;
	splitLines(notes).forEach((line, i) => {
		if (line.startsWith("## ")) {
			section = line.slice(3).trim();
			heardAt = -1;
			linesAt = -1;
			return;
		}
		const event = EVENT.exec(line);
		if (event) {
			const quote = [...(event[4] ?? "").matchAll(QUOTE)].map((m) => m[1] ?? "").sort((a, b) => b.length - a.length)[0];
			if (quote !== undefined && contentWords(quote).length >= 2) {
				const from = Number(event[1]);
				cites.push({ line: i + 1, kind: event[3] ?? "", from, to: event[2] ? Number(event[2]) : from, quote });
			}
			return;
		}
		if (!/^(New names|Names)$/.test(section) || !line.trimStart().startsWith("|")) return;
		const cells = line
			.split("|")
			.slice(1, -1)
			.map((cell) => cell.trim());
		if (heardAt === -1) {
			heardAt = cells.findIndex((cell) => /^(As heard|Heard)$/i.test(cell));
			linesAt = cells.findIndex((cell) => /^Lines$/i.test(cell));
			return;
		}
		const heard = cells[heardAt] ?? "";
		if (heardAt < 0 || linesAt < 0 || /^-+$/.test(heard) || heard === "") return;
		for (const range of (cells[linesAt] ?? "").matchAll(RANGE)) {
			const from = Number(range[1]);
			cites.push({ line: i + 1, kind: "NAME", from, to: range[2] ? Number(range[2]) : from, heard });
		}
	});
	return cites;
}

export interface Reanchors {
	/** One row per mismatch (`moved` or `missing`), then the `checked` count row; tab-separated, as the command prints them. */
	rows: string[];
	checked: number;
	matched: number;
}

/**
 * Checks each cite against the blocks its line refs name, plus the block after them: a quote matches when 60% of
 * its words of four letters or more are there, a heard name as a phrase. A mismatch proposes the nearest blocks
 * where it does match, alone or run on into the next block. The rows propose; the agent reads the lines and decides.
 */
export function proposeReanchors(blocks: Block[], cites: Cite[]): Reanchors {
	const words = blocks.map((block) => new Set(contentWords(block.text)));
	const phrases = blocks.map((block) => ` ${normalise(block.text)} `);
	const blockAt = (line: number): number => {
		const found = blocks.findIndex((block) => block.start <= line && line <= block.end);
		return found === -1 ? (line < (blocks[0]?.start ?? 1) ? 0 : blocks.length - 1) : found;
	};
	/** Whether blocks `from` to `last` (inclusive) hold the cite's quote or heard name. */
	const matches = (cite: Cite, from: number, last: number): boolean => {
		const span = Array.from({ length: Math.min(last, blocks.length - 1) - from + 1 }, (_, k) => from + k);
		if (cite.heard !== undefined) return span.some((k) => phrases[k]?.includes(` ${normalise(cite.heard ?? "")} `));
		const wanted = contentWords(cite.quote ?? "");
		const found = wanted.filter((word) => span.some((k) => words[k]?.has(word))).length;
		return found / wanted.length >= 0.6;
	};
	const rows: string[] = [];
	let matched = 0;
	for (const cite of cites) {
		const [from, to] = [blockAt(cite.from), blockAt(cite.to)];
		if (matches(cite, from, Math.max(from, to) + 1)) {
			matched += 1;
			continue;
		}
		const nearest = (found: number[]): string[] =>
			found
				.sort((a, b) => Math.abs((blocks[a]?.start ?? 0) - cite.from) - Math.abs((blocks[b]?.start ?? 0) - cite.from))
				.slice(0, 3)
				.map((k) => `L${blocks[k]?.start}`);
		const indexes = blocks.map((_, k) => k);
		const alone = indexes.filter((k) => matches(cite, k, k));
		const elsewhere = nearest(alone.length > 0 ? alone : indexes.filter((k) => matches(cite, k, k + 1)));
		const shown = cite.heard ?? `"${(cite.quote ?? "").slice(0, 60)}"`;
		const cited = cite.to === cite.from ? `L${cite.from}` : `L${cite.from}–${cite.to}`;
		rows.push(
			`${elsewhere.length > 0 ? "moved" : "missing"}\t${cited}\t${cite.kind}\t${elsewhere.join(",") || "-"}\t${shown}`,
		);
	}
	rows.push(`checked\t${cites.length}\t${matched}`);
	return { rows, checked: cites.length, matched };
}
