import { MIN_HEADINGS, readBlocks, splitLines } from "./read.ts";

interface Chunk {
	n: number;
	start: number;
	end: number;
	words: number;
}

export interface TranscriptProfile {
	title: string | null;
	format: "markdown" | "csv";
	timestamps: boolean;
	lines: number;
	blocks: number;
	words: number;
	labels: { label: string; blocks: number; words: number }[];
	chunks: Chunk[];
}

/** Profiles a TranscribeX export (markdown or CSV) and cuts it into chunks that end on block ends; `{headings}` when it has too few speaker blocks. */
export function profileTranscript(text: string, chunkWords: number): TranscriptProfile | { headings: number } {
	const lines = splitLines(text);
	const { format, timestamps, blocks } = readBlocks(lines);
	if (blocks.length < MIN_HEADINGS) return { headings: blocks.length };

	const first = lines[0] ?? "";
	const title = format === "markdown" && first.startsWith("#") ? first.replace(/^#+\s*/, "") : null;

	const byLabel = new Map<string, { label: string; blocks: number; words: number }>();
	for (const block of blocks) {
		const entry = byLabel.get(block.label) ?? { label: block.label, blocks: 0, words: 0 };
		entry.blocks += 1;
		entry.words += block.words;
		byLabel.set(block.label, entry);
	}
	const labels = [...byLabel.values()].sort((a, b) => b.blocks - a.blocks || a.label.localeCompare(b.label));

	const chunks: Chunk[] = [];
	let start = 1;
	let words = 0;
	for (const block of blocks) {
		words += block.words;
		if (words >= chunkWords) {
			chunks.push({ n: chunks.length + 1, start, end: block.end, words });
			start = block.end + 1;
			words = 0;
		}
	}
	if (start <= lines.length) chunks.push({ n: chunks.length + 1, start, end: lines.length, words });
	const last = chunks[chunks.length - 1];
	const previous = chunks[chunks.length - 2];
	if (last && previous && last.words < chunkWords * 0.25) {
		previous.end = last.end;
		previous.words += last.words;
		chunks.pop();
	}

	return {
		title,
		format,
		timestamps,
		lines: lines.length,
		blocks: blocks.length,
		words: blocks.reduce((sum, block) => sum + block.words, 0),
		labels,
		chunks,
	};
}
