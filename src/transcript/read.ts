/**
 * The one TranscribeX parser: a Transcript arrives as markdown (a `###` title, then `**Label**` speaker blocks)
 * or CSV (an ID,Start,End,Speaker,Text header, one row per block), told apart by the file's own first line.
 * Everything the Transcript commands read — chunks, cites, the laugh detector's payload — starts here.
 */

const HEADING = /^\*\*([^*\n]+)\*\*\s*$/;
const TIME = String.raw`\d{1,2}(?::\d{2}){1,2}(?:[.,]\d+)?`;
const SPAN = new RegExp(String.raw`^\s*(${TIME})\s*-\s*(${TIME})\s*$`);
const CLOCK = /^(?:\d{1,2}(?::\d{2}){1,2}|\d+)(?:[.,]\d+)?$/;
const CSV_COLUMNS = ["Start", "End", "Speaker", "Text"];

/** Fewer speaker blocks than this and the file is not a Transcript the Ledger tools will read. */
export const MIN_HEADINGS = 20;

/** One speaker block: a markdown `**Label**` block or one CSV row, with its lines, spoken words and, when the export carries them, its span in seconds. */
export interface Block {
	label: string;
	/** 1-based file line the block starts on: its label line, or the CSV row's first line. */
	start: number;
	/** 1-based file line the block ends on: the line before the next label, or the row's last line. */
	end: number;
	text: string;
	words: number;
	/** Seconds into the recording the block starts and ends, when it carries a timestamp. */
	from?: number;
	to?: number;
}

/** `H:MM:SS`, `MM:SS` or plain seconds (a `,` or `.` fraction allowed) as seconds; undefined when the text is not a time. */
export function parseTime(value: string): number | undefined {
	if (!CLOCK.test(value)) return undefined;
	let seconds = 0;
	for (const part of value.split(":")) seconds = seconds * 60 + Number(part.replace(",", "."));
	return seconds;
}

/** The file's lines, a BOM and one trailing newline stripped. */
export function splitLines(text: string): string[] {
	const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/);
	if (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
	return lines;
}

/** One CSV line into its fields: quotes wrap commas and newlines, a doubled quote is a literal one. */
export function parseCsvLine(line: string): string[] {
	const fields: string[] = [];
	let field = "";
	let quoted = false;
	for (let i = 0; i < line.length; i++) {
		const ch = line[i];
		if (quoted) {
			if (ch === '"' && line[i + 1] === '"') {
				field += '"';
				i++;
			} else if (ch === '"') {
				quoted = false;
			} else {
				field += ch;
			}
		} else if (ch === '"') {
			quoted = true;
		} else if (ch === ",") {
			fields.push(field);
			field = "";
		} else {
			field += ch;
		}
	}
	fields.push(field);
	return fields;
}

const countWords = (text: string): number => text.split(/\s+/).filter((token) => token !== "").length;

/** A TranscribeX export's speaker blocks, its format told apart by its own first line. */
export function readBlocks(lines: string[]): { format: "markdown" | "csv"; timestamps: boolean; blocks: Block[] } {
	const headerAt = lines.findIndex((line) => line.trim() !== "");
	const header = parseCsvLine(lines[headerAt] ?? "").map((cell) => cell.trim());
	if (CSV_COLUMNS.every((column) => header.includes(column))) {
		const [startAt, endAt, speakerAt, textAt] = [
			header.indexOf("Start"),
			header.indexOf("End"),
			header.indexOf("Speaker"),
			header.indexOf("Text"),
		];
		const blocks: Block[] = [];
		let timestamps = false;
		let row = "";
		let rowStart = 0;
		for (let i = headerAt + 1; i < lines.length; i++) {
			if (row === "") rowStart = i + 1;
			row = row === "" ? (lines[i] ?? "") : `${row}\n${lines[i] ?? ""}`;
			if ((row.match(/"/g) ?? []).length % 2 === 1) continue; // a quoted field runs onto the next line
			if (row.trim() !== "") {
				const fields = parseCsvLine(row);
				const text = fields[textAt] ?? "";
				const startCell = (fields[startAt] ?? "").trim();
				if (startCell !== "") timestamps = true;
				const from = parseTime(startCell);
				blocks.push({
					label: (fields[speakerAt] ?? "").trim(),
					start: rowStart,
					end: i + 1,
					text,
					words: countWords(text),
					...(from === undefined ? {} : { from, to: parseTime((fields[endAt] ?? "").trim()) }),
				});
			}
			row = "";
		}
		return { format: "csv", timestamps, blocks };
	}
	const blocks: Block[] = [];
	let timestamps = false;
	lines.forEach((line, i) => {
		const match = HEADING.exec(line);
		if (match) {
			const previous = blocks[blocks.length - 1];
			if (previous) previous.end = i;
			blocks.push({ label: (match[1] ?? "").trim(), start: i + 1, end: lines.length, text: "", words: 0 });
			return;
		}
		const current = blocks[blocks.length - 1];
		if (!current || line.trim() === "") return;
		const span = current.text === "" ? SPAN.exec(line) : null;
		if (span) {
			timestamps = true;
			current.from = parseTime(span[1] ?? "");
			current.to = parseTime(span[2] ?? "");
			return;
		}
		current.text = current.text === "" ? line.trim() : `${current.text} ${line.trim()}`;
		current.words += countWords(line);
	});
	return { format: "markdown", timestamps, blocks };
}
