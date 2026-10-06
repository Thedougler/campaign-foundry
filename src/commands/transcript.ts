import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { Command } from "commander";
import { englishWords } from "../check/english.ts";
import { UsageError } from "../check/run.ts";
import { resolveCheckEnv } from "./check.ts";
import { readStdin } from "./stdin.ts";

const HEADING = /^\*\*([^*\n]+)\*\*\s*$/;
const MIN_HEADINGS = 20;
const CSV_HEADER = "Source,Target,Case Sensitive,Enabled";

interface Block {
	label: string;
	start: number;
	end: number;
	words: number;
}

interface Chunk {
	n: number;
	start: number;
	end: number;
	words: number;
}

export interface TranscriptProfile {
	title: string | null;
	lines: number;
	blocks: number;
	words: number;
	labels: { label: string; blocks: number; words: number }[];
	chunks: Chunk[];
}

function splitLines(text: string): string[] {
	const lines = text.split(/\r?\n/);
	if (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
	return lines;
}

/** Profiles a TranscribeX export and cuts it into chunks that end on block ends; `{headings}` when it has too few speaker headings. */
export function profileTranscript(text: string, chunkWords: number): TranscriptProfile | { headings: number } {
	const lines = splitLines(text);
	const blocks: Block[] = [];
	lines.forEach((line, i) => {
		const match = HEADING.exec(line);
		if (match) {
			const previous = blocks[blocks.length - 1];
			if (previous) previous.end = i;
			blocks.push({ label: (match[1] ?? "").trim(), start: i + 1, end: lines.length, words: 0 });
		} else {
			const current = blocks[blocks.length - 1];
			if (current) current.words += line.split(/\s+/).filter((token) => token !== "").length;
		}
	});
	if (blocks.length < MIN_HEADINGS) return { headings: blocks.length };

	const first = lines[0] ?? "";
	const title = first.startsWith("#") ? first.replace(/^#+\s*/, "") : null;

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
		lines: lines.length,
		blocks: blocks.length,
		words: blocks.reduce((sum, block) => sum + block.words, 0),
		labels,
		chunks,
	};
}

function parseCsvLine(line: string): string[] {
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

async function readTextOrUsage(file: string, hint: string): Promise<string> {
	try {
		return await readFile(resolve(process.cwd(), file), "utf8");
	} catch {
		throw new UsageError(`No such file: ${file}.`, hint);
	}
}

function chunksCommand(): Command {
	return new Command("chunks")
		.description("Profile a TranscribeX Transcript's speaker labels and cut it into chunks that end on block ends.")
		.argument("<file>", "a TranscribeX markdown export: a ### title, then **Label** speaker blocks")
		.option("--words <n>", "words per chunk; a chunk closes at the first block end reaching it", "6000")
		.option("--json", "print {title,lines,blocks,words,labels,chunks} JSON instead of tab-separated rows")
		.addHelpText(
			"after",
			`
A heading is a line holding only **Label**; a block runs from its heading to the line before the next.
The first chunk starts at line 1; a final chunk under 25% of --words merges into the one before.

Output (tab-separated):
  title  <title or ->      lines  <n>      blocks  <n>      words  <n>
  label  <label>  <blocks>  <words>        one row per label, most blocks first
  chunk  <NN>  <start>-<end>  <words>      contiguous from line 1 to the last line

Exit codes:
  0  profiled    2  usage error (missing file, fewer than ${MIN_HEADINGS} speaker headings, bad --words)

Examples:
  bun run cf -- transcript chunks archive/session-11.md
  bun run cf -- transcript chunks raw/session-12.md --words 4000 --json`,
		)
		.action(async (file: string, flags: { words: string; json?: boolean }) => {
			const chunkWords = Number(flags.words);
			if (!Number.isInteger(chunkWords) || chunkWords < 1) {
				throw new UsageError(`--words must be a positive integer, got ${flags.words}.`, "cf transcript chunks <file> --words 6000");
			}
			const text = await readTextOrUsage(file, "Pass a TranscribeX markdown export. Example: bun run cf -- transcript chunks raw/session-12.md");
			const profile = profileTranscript(text, chunkWords);
			if ("headings" in profile) {
				throw new UsageError(
					`Not a TranscribeX Transcript: found ${profile.headings} speaker headings in ${file}.`,
					"cf transcript chunks expects **Label** speaker blocks.",
				);
			}
			if (flags.json) {
				process.stdout.write(`${JSON.stringify(profile, null, 2)}\n`);
				return;
			}
			const rows = [
				`title\t${profile.title ?? "-"}`,
				`lines\t${profile.lines}`,
				`blocks\t${profile.blocks}`,
				`words\t${profile.words}`,
				...profile.labels.map((l) => `label\t${l.label}\t${l.blocks}\t${l.words}`),
				...profile.chunks.map((c) => `chunk\t${String(c.n).padStart(2, "0")}\t${c.start}-${c.end}\t${c.words}`),
			];
			process.stdout.write(`${rows.join("\n")}\n`);
		});
}

function parsePairs(text: string): { source: string; target: string }[] {
	const pairs: { source: string; target: string }[] = [];
	splitLines(text).forEach((line, i) => {
		if (line.trim() === "" || line.startsWith("#")) return;
		const parts = line.split("\t");
		if (parts.length !== 2) {
			throw new UsageError(
				`Line ${i + 1} is not source<TAB>target: ${line}`,
				"Give one misheard form and its Canon spelling per line, separated by one tab.",
			);
		}
		pairs.push({ source: (parts[0] ?? "").trim(), target: (parts[1] ?? "").trim() });
	});
	return pairs;
}

function dictionaryCommand(): Command {
	return new Command("dictionary")
		.description("Append misheard -> Canon pairs to the TranscribeX Dictionary CSV the DM imports into TranscribeX.")
		.argument("[pairs]", "a file of source<TAB>target lines, or - for stdin (default: stdin)")
		.option("--csv <path>", "the dictionary CSV (default: <root>/transcribex-dictionary.csv)")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.addHelpText(
			"after",
			`
Input: one source<TAB>target pair per line; blank lines and lines starting with # are skipped.
A missing CSV is created with the header "${CSV_HEADER}". Existing rows keep their order; new rows are appended.
Sources match case-insensitively. A single-word source that is an English word is written disabled (0),
so a whole-word or substring replacement cannot rewrite ordinary speech; the DM can enable it in TranscribeX.

Output: one line per pair: <status>\\t<source> -> <target>[\\t<existing target>]
  added           appended, enabled
  added-disabled  appended, disabled (English word)
  duplicate       the same source and target are already there
  conflict        the source is there with a different target, shown last; the file keeps the existing row
  same            source equals target; skipped

Exit codes:
  0  pairs processed (conflicts included)    2  usage error (bad pair line, CSV header mismatch, missing file)

Examples:
  printf 'Spidewar\\tSpiguar\\n' | bun run cf -- transcript dictionary -
  bun run cf -- transcript dictionary names.tsv --csv /tmp/dictionary.csv`,
		)
		.action(async (file: string | undefined, flags: { csv?: string; root?: string }) => {
			const input =
				file === undefined || file === "-"
					? await readStdin()
					: await readTextOrUsage(file, "Pass a file of source<TAB>target lines, or - for stdin.");
			const pairs = parsePairs(input);
			const csvPath = flags.csv ? resolve(process.cwd(), flags.csv) : join(resolveCheckEnv(flags).root, "transcribex-dictionary.csv");

			const rows: string[][] = [];
			if (existsSync(csvPath)) {
				const lines = splitLines(await readFile(csvPath, "utf8"));
				if (lines[0] !== CSV_HEADER) {
					throw new UsageError(
						`${csvPath} does not start with the header ${CSV_HEADER}.`,
						"Point --csv at a TranscribeX Dictionary CSV, or move the file aside.",
					);
				}
				for (const line of lines.slice(1)) if (line.trim() !== "") rows.push(parseCsvLine(line));
			}
			const targets = new Map<string, string>();
			for (const row of rows) {
				const key = (row[0] ?? "").toLowerCase();
				if (!targets.has(key)) targets.set(key, row[1] ?? "");
			}

			const isWord = await englishWords();
			const report: string[] = [];
			for (const { source, target } of pairs) {
				const shown = `${source} -> ${target}`;
				if (source === target) {
					report.push(`same\t${shown}`);
					continue;
				}
				const key = source.toLowerCase();
				const existing = targets.get(key);
				if (existing === target) {
					report.push(`duplicate\t${shown}`);
				} else if (existing !== undefined) {
					report.push(`conflict\t${shown}\t${existing}`);
				} else {
					const enabled = !source.includes(" ") && isWord(key) ? "0" : "1";
					rows.push([source, target, "0", enabled]);
					targets.set(key, target);
					report.push(`${enabled === "0" ? "added-disabled" : "added"}\t${shown}`);
				}
			}

			const quote = (value: string): string => (/[",]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value);
			const body = [CSV_HEADER, ...rows.map((row) => row.map(quote).join(","))].join("\n");
			await writeFile(csvPath, `${body}\n`);
			if (report.length > 0) process.stdout.write(`${report.join("\n")}\n`);
		});
}

export function transcriptCommand(): Command {
	return new Command("transcript")
		.description("Profile and chunk a TranscribeX Transcript, and grow the TranscribeX Dictionary.")
		.addCommand(chunksCommand())
		.addCommand(dictionaryCommand());
}
