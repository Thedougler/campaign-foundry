import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import { englishWords } from "../check/english.ts";
import { UsageError } from "../check/run.ts";
import { proposeReanchors, readCites } from "../transcript/cites.ts";
import { highlightsPayload } from "../transcript/highlights.ts";
import { profileTranscript } from "../transcript/profile.ts";
import { MIN_HEADINGS, parseCsvLine, readBlocks, splitLines } from "../transcript/read.ts";
import { CF, readInput, resolveRoot, rootOption } from "./kit.ts";

const CSV_HEADER = "Source,Target,Case Sensitive,Enabled";

function chunksCommand(): Command {
	const command = new Command("chunks")
		.description("Profile a TranscribeX Transcript's speaker labels and cut it into chunks that end on block ends.")
		.argument(
			"<file>",
			"a TranscribeX export — markdown (a ### title, then **Label** speaker blocks) or CSV (ID,Start,End,Speaker,Text) — or - for stdin",
		)
		.option("--words <n>", "words per chunk; a chunk closes at the first block end reaching it", "6000")
		.option(
			"--json",
			"print {title,format,timestamps,lines,blocks,words,labels,chunks} JSON instead of tab-separated rows",
		);
	return command
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
  ${CF} transcript chunks archive/session-11.md
  ${CF} transcript chunks raw/session-12.csv --words 4000 --json
  ${CF} transcript chunks - < raw/session-12.csv`,
		)
		.action(async (file: string, flags: { words: string; json?: boolean }) => {
			const chunkWords = Number(flags.words);
			if (!Number.isInteger(chunkWords) || chunkWords < 1) {
				throw new UsageError(
					`--words must be a positive integer, got ${flags.words}.`,
					`${CF} transcript chunks <file> --words 6000`,
				);
			}
			const text = await readInput(
				file,
				`Pass a TranscribeX export, or - for stdin. Example: ${CF} transcript chunks raw/session-12.md`,
			);
			const profile = profileTranscript(text, chunkWords);
			if ("headings" in profile) {
				throw new UsageError(
					`Not a TranscribeX Transcript: found ${profile.headings} speaker headings in ${file}.`,
					`${CF} transcript chunks expects **Label** speaker blocks, or a CSV with ID,Start,End,Speaker,Text columns.`,
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

function citesCommand(): Command {
	return new Command("cites")
		.description(
			"Propose re-anchors for Session Ledger line refs whose quote or heard name is not at the cited Transcript lines.",
		)
		.argument("<transcript>", "the TranscribeX export the notes cite (markdown or CSV), or - for stdin")
		.argument("<notes>", "a chunk file, merged.md or a Session Ledger, or - for stdin")
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
  ${CF} transcript cites archive/session-12.md "$work/merged.md"
  ${CF} transcript cites archive/session-12.md archive/session-12.ledger.md`,
		)
		.action(async (transcriptFile: string, notesFile: string) => {
			const hint = `Example: ${CF} transcript cites archive/session-12.md archive/session-12.ledger.md`;
			const { blocks } = readBlocks(splitLines(await readInput(transcriptFile, hint)));
			if (blocks.length < MIN_HEADINGS) {
				throw new UsageError(
					`Not a TranscribeX Transcript: found ${blocks.length} speaker headings in ${transcriptFile}.`,
					"Pass the Transcript the notes cite.",
				);
			}
			const cites = readCites(await readInput(notesFile, hint));
			process.stdout.write(`${proposeReanchors(blocks, cites).rows.join("\n")}\n`);
		});
}

function highlightsCommand(): Command {
	const highlights = new Command("highlights")
		.description(
			"Rank the biggest laughs in a Session's recording and align them with its timestamped Transcript (Python, under uv).",
		)
		.argument("[audio...]", "the recording, or its parts")
		.option("--transcript <file>", "a Transcript export aligned with the recording; repeat for several")
		.option("--top <n>", "highlights to align and print", "20")
		.option("--json", "print JSON instead of tab-separated rows")
		.option("--context-seconds <s>", "Transcript before each laugh", "60")
		.option("--clip-dir <dir>", "cut each highlight to an .m4a clip here")
		.option("--clip-pad <s>", "seconds before and after each clip", "4")
		.option("--threshold <p>", "laughter probability to count", "0.10")
		.option("--min-len <s>", "drop bursts shorter than this, s", "0.5")
		.option("--merge-gap <s>", "join bursts closer than this, s", "1.5")
		.option("--smooth <s>", "smoothing window, s", "0.5")
		.option("--chunk <s>", "model input length, s", "240")
		.option("--device <device>", "model device")
		.allowUnknownOption();
	highlights
		.addHelpText(
			"after",
			`
The first run installs the model stack and downloads the PANNs checkpoint (about 330 MB) to
~/panns_data/ with wget; ffmpeg decodes the audio. Scanning runs about 60 times faster than
real time on a CPU.

Parts lay end to end in natural name order (part2 before part10). One --transcript is read on the
session timeline; one per part is read on each part's own timeline. This command parses each
Transcript (markdown or CSV, told apart by its own lines) and hands it over already timestamped.

Output (tab-separated):
  audio       <path>  <session offset>  <duration>
  transcript  <path>  <markdown|csv>  <session|part>  <segments>
  bursts      <every burst found>
  highlight   <rank>  <session time>  <seconds>  <peak>  <intensity>  <laugh end>
              <file>:L<a>-<b> (context lines)  L<laugh line>
  clip        <rank>  <path>                     with --clip-dir
--json prints {audio, transcripts, settings, bursts, highlights[]}; each highlight carries its
times, the laugh's Transcript line and the context segments with their lines.

Exit codes:
  0  ranked    1  ffmpeg or the model failed    2  usage error (missing file, untimed transcript)

Examples:
  ${CF} transcript highlights rec.m4a --transcript raw/session-12.md
  ${CF} transcript highlights s12-part*.m4a --transcript raw/s12.csv --json > h.json
  ${CF} transcript highlights rec.m4a --top 7 --clip-dir /tmp/s12-clips`,
		)
		.action(async () => {
			// The detector owns its own argv: everything after `highlights` passes through to Python untouched
			// (after --, every argument is a positional audio path), so its flags stay whatever uv runs.
			const args = process.argv.slice(process.argv.indexOf("highlights") + 1);
			const project = fileURLToPath(new URL("../../python", import.meta.url));
			// The Transcript module owns parsing: each --transcript export is read here once and handed to Python as a payload file.
			const parsed = await writeTranscriptPayloads(args);
			const result = spawnSync(
				"uv",
				[
					"run",
					"--project",
					project,
					"--extra",
					"highlights",
					"python",
					"-m",
					"campaign_foundry.highlights",
					...parsed.args,
				],
				{ encoding: "utf8" },
			);
			parsed.cleanup();
			if (result.stdout) process.stdout.write(result.stdout);
			if (result.stderr) process.stderr.write(result.stderr);
			if (result.error) {
				throw new UsageError(
					"uv is not on PATH.",
					`Install uv (https://docs.astral.sh/uv/), then run bun run py:install.`,
				);
			}
			process.exitCode = result.status ?? 1;
		});
	return highlights;
}

/** Rewrites the command's `--transcript <file>` arguments into parsed payload files the detector reads; after `--` every argument is a positional audio path. */
async function writeTranscriptPayloads(args: string[]): Promise<{ args: string[]; cleanup: () => void }> {
	const dir = mkdtempSync(join(tmpdir(), "cf-highlights-"));
	const forward: string[] = [];
	const payload = async (file: string): Promise<string> => {
		const text = await readInput(file, `Example: ${CF} transcript highlights rec.m4a --transcript raw/session-12.md`);
		const parsed = highlightsPayload(file, text);
		if (parsed.segments.length === 0) {
			throw new UsageError(
				`${file} has no timestamped speaker blocks: export it from TranscribeX with timestamps on, as markdown or CSV.`,
				"TranscribeX exports timestamps in both markdown and CSV.",
			);
		}
		const path = join(dir, `${forward.length}.json`);
		await writeFile(path, `${JSON.stringify(parsed)}\n`);
		return path;
	};
	const cleanup = (): void => rmSync(dir, { recursive: true, force: true });
	try {
		for (let i = 0; i < args.length; i++) {
			const arg = args[i] ?? "";
			if (arg === "--") {
				forward.push(...args.slice(i));
				break;
			}
			const value =
				arg === "--transcript"
					? args[i + 1]
					: arg.startsWith("--transcript=")
						? arg.slice("--transcript=".length)
						: undefined;
			if (value === undefined || value === "" || (value.startsWith("-") && value !== "-")) {
				forward.push(arg); // not ours, or a missing value: let Python's argparse report it
				continue;
			}
			const file = await payload(value);
			if (arg === "--transcript") {
				forward.push("--transcript", file);
				i++;
			} else {
				forward.push(`--transcript=${file}`);
			}
		}
	} catch (error) {
		cleanup();
		throw error;
	}
	return { args: forward, cleanup };
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
	const command = new Command("dictionary")
		.description("Append misheard -> Canon pairs to the TranscribeX Dictionary CSV the DM imports into TranscribeX.")
		.argument("[pairs]", "a file of source<TAB>target lines, or - for stdin (default: stdin)")
		.option("--csv <path>", "the dictionary CSV (default: <root>/transcribex-dictionary.csv)");
	rootOption(command);
	return command
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
  printf 'Spidewar\\tSpiguar\\n' | ${CF} transcript dictionary -
  ${CF} transcript dictionary names.tsv --csv /tmp/dictionary.csv`,
		)
		.action(async (file: string | undefined, flags: { csv?: string; root?: string }) => {
			const input = await readInput(file, "Pass a file of source<TAB>target lines, or - for stdin.");
			const pairs = parsePairs(input);
			const csvPath = flags.csv
				? resolve(process.cwd(), flags.csv)
				: join(resolveRoot(flags.root), "transcribex-dictionary.csv");

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
		.addHelpText(
			"after",
			`\nExamples:\n  ${CF} transcript chunks raw/session-12.csv --json\n  ${CF} transcript highlights rec.m4a --transcript raw/session-12.md\n  ${CF} transcript dictionary names.tsv`,
		)
		.addCommand(chunksCommand())
		.addCommand(citesCommand())
		.addCommand(highlightsCommand())
		.addCommand(dictionaryCommand());
}
