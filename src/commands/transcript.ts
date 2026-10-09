import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import { englishWords } from "../check/english.ts";
import { UsageError } from "../check/run.ts";
import { resolveCheckEnv } from "./check.ts";
import { readStdin } from "./stdin.ts";

const HEADING = /^\*\*([^*\n]+)\*\*\s*$/;
const TIME = String.raw`\d{1,2}(?::\d{2}){1,2}(?:[.,]\d+)?`;
const SPAN = new RegExp(String.raw`^\s*${TIME}\s*-\s*${TIME}\s*$`);
const CSV_COLUMNS = ["Start", "End", "Speaker", "Text"];
const MIN_HEADINGS = 20;
const CSV_HEADER = "Source,Target,Case Sensitive,Enabled";

/** One speaker block: a markdown `**Label**` block or one CSV row, with its lines and spoken words. */
interface Block {
	label: string;
	start: number;
	end: number;
	text: string;
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
	format: "markdown" | "csv";
	timestamps: boolean;
	lines: number;
	blocks: number;
	words: number;
	labels: { label: string; blocks: number; words: number }[];
	chunks: Chunk[];
}

function splitLines(text: string): string[] {
	const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/);
	if (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
	return lines;
}

const countWords = (text: string): number => text.split(/\s+/).filter((token) => token !== "").length;

/** A TranscribeX export's speaker blocks, its format told apart by its own first line. */
function readBlocks(lines: string[]): { format: "markdown" | "csv"; timestamps: boolean; blocks: Block[] } {
	const headerAt = lines.findIndex((line) => line.trim() !== "");
	const header = parseCsvLine(lines[headerAt] ?? "").map((cell) => cell.trim());
	if (CSV_COLUMNS.every((column) => header.includes(column))) {
		const [startAt, speakerAt, textAt] = [header.indexOf("Start"), header.indexOf("Speaker"), header.indexOf("Text")];
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
				if ((fields[startAt] ?? "").trim() !== "") timestamps = true;
				blocks.push({ label: (fields[speakerAt] ?? "").trim(), start: rowStart, end: i + 1, text, words: countWords(text) });
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
		if (current.text === "" && SPAN.test(line)) {
			timestamps = true;
			return;
		}
		current.text = current.text === "" ? line.trim() : `${current.text} ${line.trim()}`;
		current.words += countWords(line);
	});
	return { format: "markdown", timestamps, blocks };
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
		.argument("<file>", "a TranscribeX export: markdown (a ### title, then **Label** speaker blocks) or CSV (ID,Start,End,Speaker,Text)")
		.option("--words <n>", "words per chunk; a chunk closes at the first block end reaching it", "6000")
		.option("--json", "print {title,format,timestamps,lines,blocks,words,labels,chunks} JSON instead of tab-separated rows")
		.addHelpText(
			"after",
			`
The format is read from the file itself: a first line naming Start, End, Speaker and Text columns is CSV,
one block per row; anything else is markdown, where a block runs from a line holding only **Label** to the
line before the next, and a "00:20 - 00:29" line under the label is its timestamp (never counted as words).
The first chunk starts at line 1; a final chunk under 25% of --words merges into the one before.

Output (tab-separated):
  title  <title or ->      format  <markdown|csv>      timestamps  <yes|no>
  lines  <n>      blocks  <n>      words  <n>
  label  <label>  <blocks>  <words>        one row per label, most blocks first
  chunk  <NN>  <start>-<end>  <words>      contiguous from line 1 to the last line

Exit codes:
  0  profiled    2  usage error (missing file, fewer than ${MIN_HEADINGS} speaker blocks, bad --words)

Examples:
  bun run cf -- transcript chunks archive/session-11.md
  bun run cf -- transcript chunks raw/session-12.csv --words 4000 --json`,
		)
		.action(async (file: string, flags: { words: string; json?: boolean }) => {
			const chunkWords = Number(flags.words);
			if (!Number.isInteger(chunkWords) || chunkWords < 1) {
				throw new UsageError(`--words must be a positive integer, got ${flags.words}.`, "cf transcript chunks <file> --words 6000");
			}
			const text = await readTextOrUsage(file, "Pass a TranscribeX export. Example: bun run cf -- transcript chunks raw/session-12.md");
			const profile = profileTranscript(text, chunkWords);
			if ("headings" in profile) {
				throw new UsageError(
					`Not a TranscribeX Transcript: found ${profile.headings} speaker headings in ${file}.`,
					"cf transcript chunks expects **Label** speaker blocks, or a CSV with ID,Start,End,Speaker,Text columns.",
				);
			}
			if (flags.json) {
				process.stdout.write(`${JSON.stringify(profile, null, 2)}\n`);
				return;
			}
			const rows = [
				`title\t${profile.title ?? "-"}`,
				`format\t${profile.format}`,
				`timestamps\t${profile.timestamps ? "yes" : "no"}`,
				`lines\t${profile.lines}`,
				`blocks\t${profile.blocks}`,
				`words\t${profile.words}`,
				...profile.labels.map((l) => `label\t${l.label}\t${l.blocks}\t${l.words}`),
				...profile.chunks.map((c) => `chunk\t${String(c.n).padStart(2, "0")}\t${c.start}-${c.end}\t${c.words}`),
			];
			process.stdout.write(`${rows.join("\n")}\n`);
		});
}

const EVENT = /^\s*-\s+L(\d+)(?:\s*[–-]\s*L?(\d+))?\s+·\s+([A-Z]+)\s+·\s+(.*)$/;
const QUOTE = /["“]([^"”]+)["”]/g;
const RANGE = /L?(\d+)(?:\s*[–-]\s*L?(\d+))?/g;

const normalise = (text: string): string =>
	text
		.toLowerCase()
		.replace(/[^\p{L}\p{N}]+/gu, " ")
		.trim();
const contentWords = (text: string): string[] => [...new Set(normalise(text).split(" ").filter((word) => word.length >= 4))];

interface Cite {
	line: number;
	kind: string;
	from: number;
	to: number;
	quote?: string;
	heard?: string;
}

/** Every quoted event line and every Names row in Session Ledger notes, with the lines it cites. */
function readCites(notes: string): Cite[] {
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
		const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
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

function citesCommand(): Command {
	return new Command("cites")
		.description("Propose re-anchors for Session Ledger line refs whose quote or heard name is not at the cited Transcript lines.")
		.argument("<transcript>", "the TranscribeX export the notes cite (markdown or CSV)")
		.argument("<notes>", "a chunk file, merged.md or a Session Ledger")
		.addHelpText(
			"after",
			`
Checks every event line holding a quote of two or more words ("- L<a>[–<b>] · SAID · …") and every
Names / New names row, against the cited blocks plus the block after them. A quote matches when 60% of
its words of four letters or more are there, so a Canon spelling or a swapped real name still matches;
a heard name matches as a phrase. A mismatch proposes the nearest blocks where it does match, alone or
run on into the next block. The command proposes; the agent reads the lines and decides.

Output (tab-separated, mismatches only, then a count):
  moved    L<cited>  <KIND|NAME>  L<a>,L<b>  <quote or heard name>    found elsewhere, nearest first
  missing  L<cited>  <KIND|NAME>  -          <quote or heard name>    found nowhere
  checked  <refs checked>  <refs matching>

Exit codes:
  0  checked (mismatches included)    2  usage error (missing file, not a TranscribeX Transcript)

Examples:
  bun run cf -- transcript cites archive/session-12.md "$work/merged.md"
  bun run cf -- transcript cites archive/session-12.md archive/session-12.ledger.md`,
		)
		.action(async (transcriptFile: string, notesFile: string) => {
			const hint = "Example: bun run cf -- transcript cites archive/session-12.md archive/session-12.ledger.md";
			const { blocks } = readBlocks(splitLines(await readTextOrUsage(transcriptFile, hint)));
			if (blocks.length < MIN_HEADINGS) {
				throw new UsageError(
					`Not a TranscribeX Transcript: found ${blocks.length} speaker headings in ${transcriptFile}.`,
					"Pass the Transcript the notes cite.",
				);
			}
			const cites = readCites(await readTextOrUsage(notesFile, hint));
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
			const report: string[] = [];
			let ok = 0;
			for (const cite of cites) {
				const [from, to] = [blockAt(cite.from), blockAt(cite.to)];
				if (matches(cite, from, Math.max(from, to) + 1)) {
					ok += 1;
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
				report.push(`${elsewhere.length > 0 ? "moved" : "missing"}\t${cited}\t${cite.kind}\t${elsewhere.join(",") || "-"}\t${shown}`);
			}
			report.push(`checked\t${cites.length}\t${ok}`);
			process.stdout.write(`${report.join("\n")}\n`);
		});
}

function highlightsCommand(): Command {
	return new Command("highlights")
		.description("Rank the biggest laughs in a Session's recording and align them with its timestamped Transcript (Python, under uv).")
		.helpOption(false)
		.allowUnknownOption()
		.allowExcessArguments()
		.argument("[args...]", "passed through; run `bun run cf -- transcript highlights --help` for the options")
		.action(() => {
			const args = process.argv.slice(process.argv.indexOf("highlights") + 1);
			const help = args.includes("--help") || args.includes("-h");
			const project = fileURLToPath(new URL("../../python", import.meta.url));
			const extra = help ? [] : ["--extra", "highlights"];
			const result = spawnSync("uv", ["run", "--project", project, ...extra, "python", "-m", "campaign_foundry.highlights", ...args], { encoding: "utf8" });
			if (result.stdout) process.stdout.write(result.stdout);
			if (result.stderr) process.stderr.write(result.stderr);
			if (result.error) {
				throw new UsageError("uv is not on PATH.", "Install uv (https://docs.astral.sh/uv/), then run bun run py:install.");
			}
			process.exitCode = result.status ?? 1;
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
		.description(
			"Profile and chunk a TranscribeX Transcript, check its Ledger's line refs, rank its recording's laughs, and grow the TranscribeX Dictionary.",
		)
		.addCommand(chunksCommand())
		.addCommand(citesCommand())
		.addCommand(highlightsCommand())
		.addCommand(dictionaryCommand());
}
