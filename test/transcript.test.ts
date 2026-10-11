import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { proposeReanchors, readCites } from "../src/transcript/cites.ts";
import { highlightsPayload } from "../src/transcript/highlights.ts";
import { profileTranscript, type TranscriptProfile } from "../src/transcript/profile.ts";
import { parseTime, readBlocks, splitLines } from "../src/transcript/read.ts";
import { cf, repoRoot } from "./check/helpers.ts";

const fixture = (name: string): string => readFileSync(join(repoRoot, "test/fixtures/transcript", name), "utf8");
const sampleLines = fixture("sample.md").trimEnd().split("\n");

/** A fixture's profile; fails when it hit the too-few-blocks sentinel the command turns into a usage error. */
function profile(name: string, words: number): TranscriptProfile {
	const result = profileTranscript(fixture(name), words);
	if ("headings" in result) throw new Error(`${name} is not a Transcript: ${result.headings} headings`);
	return result;
}

describe("the TranscribeX parser", () => {
	it("parses `H:MM:SS`, `MM:SS` and plain seconds, with a `,` or `.` fraction", () => {
		expect(parseTime("00:42")).toBe(42);
		expect(parseTime("1:02:03")).toBe(3723);
		expect(parseTime("00:00:01,500")).toBe(1.5);
		expect(parseTime("12.25")).toBe(12.25);
		expect(parseTime("not a time")).toBeUndefined();
	});

	it("tells a CSV export apart by its header, one block per row however the quotes run", () => {
		const { format, timestamps, blocks } = readBlocks(splitLines(fixture("timed.csv")));
		expect(format).toBe("csv");
		expect(timestamps).toBe(true);
		expect(blocks).toHaveLength(25);
		expect(blocks[0]).toMatchObject({
			label: "DM",
			start: 2,
			end: 2,
			text: "Block 1 the amber anchor drifts past the harbour tonight.",
			words: 10,
			from: 0,
			to: 10,
		});
		expect(blocks[9]).toMatchObject({ label: "DM", start: 11, end: 11, from: 90, to: 100 });
	});

	it("reads a markdown export's `**Label**` blocks with their timestamp spans in seconds", () => {
		const { format, timestamps, blocks } = readBlocks(splitLines(fixture("timed.md")));
		expect(format).toBe("markdown");
		expect(timestamps).toBe(true);
		expect(blocks[0]).toMatchObject({ label: "DM", start: 3, end: 7, words: 10, from: 0, to: 10 });
		expect(blocks.at(-1)).toMatchObject({ label: "DM", start: 123, end: 126, from: 240, to: 250 });
		// An untimed markdown export still reads: the blocks are there, only without spans.
		const untimed = readBlocks(splitLines(fixture("sample.md")));
		expect(untimed.timestamps).toBe(false);
		expect(untimed.blocks.every((block) => block.from === undefined && block.to === undefined)).toBe(true);
	});
});

describe("profileTranscript", () => {
	it("covers line 1 to the last line contiguously, closing chunks only at block ends", () => {
		const { chunks } = profile("sample.md", 44);
		expect(chunks[0]?.start).toBe(1);
		expect(chunks.at(-1)?.end).toBe(sampleLines.length);
		for (const [i, chunk] of chunks.entries()) {
			if (i > 0) expect(chunk.start).toBe((chunks[i - 1]?.end ?? 0) + 1);
			if (chunk.end < sampleLines.length) expect(sampleLines[chunk.end]).toMatch(/^\*\*[^*]+\*\*$/);
		}
	});

	it("closes each chunk at the first block end reaching --words and keeps a tail of exactly 25%", () => {
		// 25 blocks of 11 words: 44 words close every 4 blocks, leaving one 11-word block, 25% of 44.
		expect(profile("sample.md", 44).chunks.map((c) => c.words)).toEqual([44, 44, 44, 44, 44, 44, 11]);
	});

	it("merges a tail under 25% of --words into the chunk before", () => {
		// 66 words close every 6 blocks; the last 11-word block is under 16.5 and merges.
		const { chunks } = profile("sample.md", 66);
		expect(chunks.map((c) => c.words)).toEqual([66, 66, 66, 77]);
		expect(chunks.at(-1)?.end).toBe(sampleLines.length);
	});

	it("counts blocks and words per label, most blocks first, and reads the title", () => {
		expect(profile("sample.md", 6000)).toMatchObject({
			title: "Fixture Session: A Short Crossing",
			blocks: 25,
			labels: [
				{ label: "DM", blocks: 9, words: 99 },
				{ label: "Perrin", blocks: 8, words: 88 },
				{ label: "Speaker 1", blocks: 8, words: 88 },
			],
		});
	});

	it("reads a timestamped markdown export without counting its time lines as words", () => {
		expect(profile("timed.md", 6000)).toMatchObject({
			title: "Fixture Session: A Timed Crossing",
			timestamps: true,
			lines: 126,
			blocks: 25,
			words: 250,
		});
	});

	it("tells a CSV export apart by its header and makes each row a block", () => {
		const csv = profile("timed.csv", 40);
		expect(csv).toMatchObject({ title: null, format: "csv", timestamps: true, lines: 26, blocks: 25 });
		expect(csv.labels).toEqual([
			{ label: "DM", blocks: 9, words: 90 },
			{ label: "Perrin", blocks: 8, words: 80 },
			{ label: "Speaker 1", blocks: 8, words: 80 },
		]);
		// 40 words close every 4 rows; the header rides in chunk 1 and the last 10-word row is kept at 25%.
		expect(csv.chunks.map((c) => [c.start, c.end])).toEqual([
			[1, 5],
			[6, 9],
			[10, 13],
			[14, 17],
			[18, 21],
			[22, 25],
			[26, 26],
		]);
	});
});

describe("cites", () => {
	it("proposes where a quote or heard name really is, and counts the refs that match", () => {
		const { blocks } = readBlocks(splitLines(fixture("timed.md")));
		const rows = proposeReanchors(blocks, readCites(fixture("notes.md"))).rows;
		expect(rows).toEqual([
			'moved\tL23\tMOMENT\tL48\t"the jagged jackal jolts past the jetty"',
			'missing\tL8\tSAID\t-\t"nobody here speaks of sharks"',
			"moved\tL13\tNAME\tL38\tharpoon",
			"checked\t5\t2",
		]);
	});
});

describe("the highlights payload", () => {
	it("hands the detector a markdown export's timestamped blocks with their lines and seconds", () => {
		const payload = highlightsPayload("raw/session-12.md", fixture("timed.md"));
		expect(payload).toMatchObject({ path: "raw/session-12.md", format: "markdown" });
		expect(payload.segments).toHaveLength(25);
		expect(payload.segments[0]).toEqual({
			line: 3,
			endLine: 7,
			start: 0,
			end: 10,
			speaker: "DM",
			text: "Block 1 the amber anchor drifts past the harbour tonight.",
		});
		expect(payload.segments.at(-1)?.start).toBe(240);
	});

	it("hands the detector a CSV export's rows on the same shape", () => {
		const payload = highlightsPayload("raw/session-12.csv", fixture("timed.csv"));
		expect(payload.format).toBe("csv");
		expect(payload.segments[9]).toEqual({
			line: 11,
			endLine: 11,
			start: 90,
			end: 100,
			speaker: "DM",
			text: "Block 10 the jagged jackal jolts past the jetty tonight.",
		});
	});

	it("carries no segments for an untimed export: the detector aligns by seconds", () => {
		expect(highlightsPayload("raw/session-12.md", fixture("sample.md")).segments).toEqual([]);
	});
});

describe("cfcli transcript chunks", () => {
	it("exits 2 for a file without speaker blocks", async () => {
		const result = await cf(["transcript", "chunks", "package.json"]);
		expect(result.code).toBe(2);
		expect(result.stderr).toContain("Not a TranscribeX Transcript: found 0 speaker headings in package.json.");
	});

	it("prints the tab-separated profile", async () => {
		const result = await cf(["transcript", "chunks", "test/fixtures/transcript/timed.md", "--words", "6000"]);
		expect(result.code).toBe(0);
		expect(result.stdout.trimEnd().split("\n").slice(0, 6)).toEqual([
			"title\tFixture Session: A Timed Crossing",
			"format\tmarkdown",
			"timestamps\tyes",
			"lines\t126",
			"blocks\t25",
			"words\t250",
		]);
	});
});

describe("cfcli transcript highlights", () => {
	it("documents native --help with examples", async () => {
		const result = await cf(["transcript", "highlights", "--help"]);
		expect(result.code).toBe(0);
		expect(result.stdout).toContain("Usage: cfcli transcript highlights");
		expect(result.stdout).toContain("--transcript <file>");
	});

	it("refuses an untimed Transcript before the detector runs", async () => {
		const result = await cf([
			"transcript",
			"highlights",
			"rec.m4a",
			"--transcript",
			"test/fixtures/transcript/sample.md",
		]);
		expect(result.code).toBe(2);
		expect(result.stderr).toContain("test/fixtures/transcript/sample.md has no timestamped speaker blocks");
		expect(result.stderr).toContain("TranscribeX exports timestamps in both markdown and CSV.");
	});
});

describe("cfcli transcript dictionary", () => {
	const dir = mkdtempSync(join(tmpdir(), "cf-dictionary-"));
	const csv = join(dir, "dictionary.csv");
	afterAll(() => rmSync(dir, { recursive: true, force: true }));
	const add = async (pairs: string) => cf(["transcript", "dictionary", "-", "--csv", csv], repoRoot, pairs);

	it("creates the CSV with the TranscribeX header and disables a single English-word source", async () => {
		const result = await add("Crystalline\tCrissdalynn\n");
		expect(result.code).toBe(0);
		expect(result.stdout).toBe("added-disabled\tCrystalline -> Crissdalynn\n");
		expect(readFileSync(csv, "utf8")).toBe("Source,Target,Case Sensitive,Enabled\nCrystalline,Crissdalynn,0,0\n");
	});

	it("enables a non-word source, then reports the same pair as a duplicate", async () => {
		expect((await add("Spidewar\tSpiguar\n")).stdout).toBe("added\tSpidewar -> Spiguar\n");
		expect(readFileSync(csv, "utf8").split("\n")).toContain("Spidewar,Spiguar,0,1");
		expect((await add("Spidewar\tSpiguar\n")).stdout).toBe("duplicate\tSpidewar -> Spiguar\n");
	});

	it("reports a case-insensitive source with a different target as a conflict and keeps the file", async () => {
		const before = readFileSync(csv, "utf8");
		const result = await add("spidewar\tSpiguard\n");
		expect(result.code).toBe(0);
		expect(result.stdout).toBe("conflict\tspidewar -> Spiguard\tSpiguar\n");
		expect(readFileSync(csv, "utf8")).toBe(before);
	});

	it("quotes a field holding a comma and reads it back as the same source", async () => {
		expect((await add("Osset, the clerk\tOsset\n")).stdout).toBe("added\tOsset, the clerk -> Osset\n");
		expect(readFileSync(csv, "utf8").split("\n")).toContain('"Osset, the clerk",Osset,0,1');
		expect((await add("Osset, the clerk\tOsset\n")).stdout).toBe("duplicate\tOsset, the clerk -> Osset\n");
	});

	it("exits 2 naming a line without exactly one tab", async () => {
		const result = await add("# comment\n\nSpidewar Spiguar\n");
		expect(result.code).toBe(2);
		expect(result.stderr).toContain("Line 3");
	});
});
