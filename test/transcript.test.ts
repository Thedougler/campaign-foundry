import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { repoRoot } from "./check/helpers.ts";

/** Runs `bun run cf -- <args>` — the supported invocation, through the npm script. */
function run(args: string[], stdin = ""): { status: number; stdout: string; stderr: string } {
	const result = spawnSync("bun", ["run", "cf", "--", ...args], { cwd: repoRoot, encoding: "utf8", input: stdin });
	return { status: result.status ?? 1, stdout: result.stdout, stderr: result.stderr };
}

const sample = "test/fixtures/transcript/sample.md";
const sampleLines = readFileSync(join(repoRoot, sample), "utf8").trimEnd().split("\n");

interface Profile {
	title: string;
	lines: number;
	blocks: number;
	labels: { label: string; blocks: number; words: number }[];
	chunks: { n: number; start: number; end: number; words: number }[];
}

function chunks(words: number): Profile {
	const result = run(["transcript", "chunks", sample, "--words", String(words), "--json"]);
	expect(result.status).toBe(0);
	return JSON.parse(result.stdout) as Profile;
}

describe("cf transcript chunks", () => {
	it("covers line 1 to the last line contiguously, closing chunks only at block ends", () => {
		const profile = chunks(44);
		expect(profile.lines).toBe(sampleLines.length);
		expect(profile.chunks[0]?.start).toBe(1);
		expect(profile.chunks.at(-1)?.end).toBe(sampleLines.length);
		for (const [i, chunk] of profile.chunks.entries()) {
			if (i > 0) expect(chunk.start).toBe((profile.chunks[i - 1]?.end ?? 0) + 1);
			if (chunk.end < sampleLines.length) expect(sampleLines[chunk.end]).toMatch(/^\*\*[^*]+\*\*$/);
		}
	});

	it("closes each chunk at the first block end reaching --words and keeps a tail of exactly 25%", () => {
		// 25 blocks of 11 words: 44 words close every 4 blocks, leaving one 11-word block, 25% of 44.
		const profile = chunks(44);
		expect(profile.chunks.map((c) => c.words)).toEqual([44, 44, 44, 44, 44, 44, 11]);
	});

	it("merges a tail under 25% of --words into the chunk before", () => {
		// 66 words close every 6 blocks; the last 11-word block is under 16.5 and merges.
		const profile = chunks(66);
		expect(profile.chunks.map((c) => c.words)).toEqual([66, 66, 66, 77]);
		expect(profile.chunks.at(-1)?.end).toBe(sampleLines.length);
	});

	it("counts blocks and words per label, most blocks first, and reads the title", () => {
		const profile = chunks(6000);
		expect(profile.title).toBe("Fixture Session: A Short Crossing");
		expect(profile.blocks).toBe(25);
		expect(profile.labels).toEqual([
			{ label: "DM", blocks: 9, words: 99 },
			{ label: "Perrin", blocks: 8, words: 88 },
			{ label: "Speaker 1", blocks: 8, words: 88 },
		]);
	});

	it("exits 2 for a file without speaker blocks", () => {
		const result = run(["transcript", "chunks", "package.json"]);
		expect(result.status).toBe(2);
		expect(result.stderr).toContain("Not a TranscribeX Transcript: found 0 speaker headings in package.json.");
	});

	it("reads a timestamped markdown export without counting its time lines as words", () => {
		const result = run(["transcript", "chunks", "test/fixtures/transcript/timed.md", "--words", "6000"]);
		expect(result.status).toBe(0);
		const rows = result.stdout.trimEnd().split("\n");
		expect(rows.slice(0, 6)).toEqual([
			"title\tFixture Session: A Timed Crossing",
			"format\tmarkdown",
			"timestamps\tyes",
			"lines\t126",
			"blocks\t25",
			"words\t250",
		]);
	});

	it("tells a CSV export apart by its header and makes each row a block", () => {
		const result = run(["transcript", "chunks", "test/fixtures/transcript/timed.csv", "--words", "40", "--json"]);
		expect(result.status).toBe(0);
		const profile = JSON.parse(result.stdout) as Profile & { format: string; timestamps: boolean; title: string | null };
		expect(profile).toMatchObject({ title: null, format: "csv", timestamps: true, lines: 26, blocks: 25 });
		expect(profile.labels).toEqual([
			{ label: "DM", blocks: 9, words: 90 },
			{ label: "Perrin", blocks: 8, words: 80 },
			{ label: "Speaker 1", blocks: 8, words: 80 },
		]);
		// 40 words close every 4 rows; the header rides in chunk 1 and the last 10-word row is kept at 25%.
		expect(profile.chunks.map((c) => [c.start, c.end])).toEqual([
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

describe("cf transcript cites", () => {
	it("proposes where a quote or heard name really is, and counts the refs that match", () => {
		const result = run(["transcript", "cites", "test/fixtures/transcript/timed.md", "test/fixtures/transcript/notes.md"]);
		expect(result.status).toBe(0);
		expect(result.stdout.trimEnd().split("\n")).toEqual([
			'moved\tL23\tMOMENT\tL48\t"the jagged jackal jolts past the jetty"',
			'missing\tL8\tSAID\t-\t"nobody here speaks of sharks"',
			"moved\tL13\tNAME\tL38\tharpoon",
			"checked\t5\t2",
		]);
	});
});

describe("cf transcript highlights", () => {
	it("passes --help through to the Python command", () => {
		const result = run(["transcript", "highlights", "--help"]);
		expect(result.status).toBe(0);
		expect(result.stdout).toContain("usage: bun run cf -- transcript highlights");
		expect(result.stdout).toContain("--transcript PATH");
	});
});

describe("cf transcript dictionary", () => {
	const dir = mkdtempSync(join(tmpdir(), "cf-dictionary-"));
	const csv = join(dir, "dictionary.csv");
	afterAll(() => rmSync(dir, { recursive: true, force: true }));
	const add = (pairs: string) => run(["transcript", "dictionary", "-", "--csv", csv], pairs);

	it("creates the CSV with the TranscribeX header and disables a single English-word source", () => {
		const result = add("Crystalline\tCrissdalynn\n");
		expect(result.status).toBe(0);
		expect(result.stdout).toBe("added-disabled\tCrystalline -> Crissdalynn\n");
		expect(readFileSync(csv, "utf8")).toBe("Source,Target,Case Sensitive,Enabled\nCrystalline,Crissdalynn,0,0\n");
	});

	it("enables a non-word source, then reports the same pair as a duplicate", () => {
		expect(add("Spidewar\tSpiguar\n").stdout).toBe("added\tSpidewar -> Spiguar\n");
		expect(readFileSync(csv, "utf8").split("\n")).toContain("Spidewar,Spiguar,0,1");
		expect(add("Spidewar\tSpiguar\n").stdout).toBe("duplicate\tSpidewar -> Spiguar\n");
	});

	it("reports a case-insensitive source with a different target as a conflict and keeps the file", () => {
		const before = readFileSync(csv, "utf8");
		const result = add("spidewar\tSpiguard\n");
		expect(result.status).toBe(0);
		expect(result.stdout).toBe("conflict\tspidewar -> Spiguard\tSpiguar\n");
		expect(readFileSync(csv, "utf8")).toBe(before);
	});

	it("quotes a field holding a comma and reads it back as the same source", () => {
		expect(add("Osset, the clerk\tOsset\n").stdout).toBe("added\tOsset, the clerk -> Osset\n");
		expect(readFileSync(csv, "utf8").split("\n")).toContain('"Osset, the clerk",Osset,0,1');
		expect(add("Osset, the clerk\tOsset\n").stdout).toBe("duplicate\tOsset, the clerk -> Osset\n");
	});

	it("exits 2 naming a line without exactly one tab", () => {
		const result = add("# comment\n\nSpidewar Spiguar\n");
		expect(result.status).toBe(2);
		expect(result.stderr).toContain("Line 3");
	});
});
