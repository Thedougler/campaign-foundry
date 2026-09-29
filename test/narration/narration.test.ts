import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { cf, repoRoot } from "../check/helpers.ts";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "fixtures");
const vault = join(root, "wiki");
const vaultFlags = ["--vault", vault, "--root", root];

interface Callout {
	title: string;
	line: number;
	words: number;
	sentences: { narration: number; spoken: number };
	band: { min: number; max: number; pass: boolean } | null;
	echo: { text: string; occurrences: { source: string; line: number }[] }[];
	punctuation: { emDashes: number; semicolons: number; colons: number };
	compass: string[];
	footMileCounts: string[];
	freshStarts: { starts: string[]; runs: { from: number; to: number; starts: string[] }[] };
	judgementWords: string[];
	findings: { rule: string; severity: "error" | "warning"; message: string }[];
	ok: boolean;
}
interface Report {
	ok: boolean;
	page: string;
	callouts: Callout[];
}

/** `cf narration Crossing --callout <title>` as JSON; the stdout is parsed whatever the exit code. */
async function narrate(callout: string, extra: string[] = [], page = ["Clean", "Echo", "Stop words"].includes(callout) ? "Crossing" : callout) {
	const result = await cf(["narration", page, "--callout", callout, "--json", ...vaultFlags, ...extra], repoRoot);
	const report = JSON.parse(result.stdout) as Report;
	return { ...result, report, callout: report.callouts[0]! };
}
const rules = (c: Callout, severity?: "error" | "warning") =>
	c.findings.filter((f) => !severity || f.severity === severity).map((f) => f.rule);

describe("cf narration: a clean draft", () => {
	it("passes with exit 0, counting words, narration sentences and spoken lines separately", async () => {
		const { code, callout, report } = await narrate("Clean");
		expect(code).toBe(0);
		expect(report.ok).toBe(true);
		expect(report.page).toBe("Drown/Scenes/Crossing.md");
		expect(callout.words).toBe(40);
		expect(callout.sentences).toEqual({ narration: 5, spoken: 1 });
		expect(callout.findings).toEqual([]);
		expect(callout.band).toBeNull();
	});

	it("prints the counts in the line agents read", async () => {
		const { code, stdout } = await cf(["narration", "Crossing", "--callout", "Clean", ...vaultFlags], repoRoot);
		expect(code).toBe(0);
		expect(stdout).toContain("words: 40");
		expect(stdout).toContain("sentences (narration): 5, spoken lines: 1");
	});

	it("reads every narration callout on the page when --callout is not given", async () => {
		const result = await cf(["narration", "Drown/Scenes/Crossing.md", "--json", ...vaultFlags], repoRoot);
		const report = JSON.parse(result.stdout) as Report;
		expect(report.callouts.map((c) => c.title).slice(0, 3)).toEqual(["Clean", "Echo", "Stop words"]);
		expect(report.callouts).toHaveLength(3);
		expect(report.ok).toBe(false);
		expect(result.code).toBe(1);
	});
});

describe("cf narration: band", () => {
	it("passes inside the band", async () => {
		const { code, callout } = await narrate("Clean", ["--band", "30-60"]);
		expect(code).toBe(0);
		expect(callout.band).toEqual({ min: 30, max: 60, pass: true });
	});

	it("fails under and over the band, exit 1", async () => {
		const under = await narrate("Clean", ["--band", "80-120"]);
		expect(under.code).toBe(1);
		expect(under.callout.band?.pass).toBe(false);
		expect(rules(under.callout, "error")).toEqual(["band"]);
		const over = await narrate("Clean", ["--band", "10-20"]);
		expect(over.code).toBe(1);
		expect(rules(over.callout, "error")).toEqual(["band"]);
	});
});

describe("cf narration: echo", () => {
	it("fails on a run of four or more words shared with the page itself, outside the callout, and with a linked page", async () => {
		const { code, callout } = await narrate("Echo");
		expect(code).toBe(1);
		expect(rules(callout, "error")).toEqual(["echo"]);
		const own = callout.echo.find((e) => e.text.startsWith("mud slick as butter"));
		expect(own?.text).toBe("mud slick as butter coats every plank of the dock");
		expect(own?.occurrences).toEqual([{ source: "Drown/Scenes/Crossing.md", line: 7 }]);
		const linked = callout.echo.find((e) => e.text.includes("chain of rusted links"));
		expect(linked?.text).toBe("the ferry hangs from a chain of rusted links");
		expect(linked?.occurrences).toEqual([{ source: "Drown/Locations/Old Ferry.md", line: 6 }]);
	});

	it("does not match the callout against itself", async () => {
		const { callout } = await narrate("Clean");
		expect(callout.echo).toEqual([]);
	});

	it("ignores a shared run made only of stop-words", async () => {
		const { code, callout } = await narrate("Stop words");
		expect(callout.echo).toEqual([]);
		expect(code).toBe(0);
	});

	it("exempts quoted speech in the callout", async () => {
		const { code, callout } = await narrate("Speech");
		expect(callout.echo).toEqual([]);
		expect(code).toBe(0);
	});

	it("flags the same words when they are not quoted, from a page linked only in frontmatter", async () => {
		const { code, callout } = await narrate("Speech unquoted");
		expect(code).toBe(1);
		expect(callout.echo.map((e) => e.text)).toEqual(["poor hobb never paid his toll"]);
		expect(callout.echo[0]?.occurrences[0]?.source).toBe("Drown/NPCs/Ferryman.md");
	});

	it("leaves out a page the page does not link to, unless it is named with --source", async () => {
		const plain = await narrate("Unlinked");
		expect(plain.callout.echo).toEqual([]);
		const named = await narrate("Unlinked", ["--source", join(vault, "Drown/NPCs/Tinker.md")]);
		expect(named.code).toBe(1);
		expect(named.callout.echo.map((e) => e.text)).toEqual(["a tinker sells lamp wicks beside the reed beds"]);
	});

	it("--source replaces the default sources", async () => {
		const { callout } = await narrate("Echo", ["--source", join(vault, "Drown/NPCs/Tinker.md")]);
		expect(callout.echo).toEqual([]);
	});

	it("checks against --old, the block being replaced, and names it", async () => {
		const old = join(here, "fixtures/old-block.md");
		const { code, callout } = await narrate("Clean", ["--old", old]);
		expect(code).toBe(1);
		expect(callout.echo.map((e) => e.text)).toEqual(["the barge slides sideways in the current"]);
		expect(callout.echo[0]?.occurrences[0]?.source).toBe(old);
	});
});

describe("cf narration: punctuation, compass, foot and mile counts", () => {
	it("counts em dashes, semicolons and colons", async () => {
		const { code, callout } = await narrate("Punctuation");
		expect(code).toBe(1);
		expect(callout.punctuation).toEqual({ emDashes: 1, semicolons: 1, colons: 1 });
		expect(rules(callout, "error")).toEqual(["punctuation"]);
	});

	it("finds compass words", async () => {
		const { code, callout } = await narrate("Compass");
		expect(code).toBe(1);
		expect(callout.compass).toEqual(["north", "Southeast"]);
		expect(rules(callout, "error")).toEqual(["compass"]);
	});

	it("finds foot and mile counts", async () => {
		const { code, callout } = await narrate("Feet");
		expect(code).toBe(1);
		expect(callout.footMileCounts).toEqual(["forty feet", "2 miles"]);
		expect(rules(callout, "error")).toEqual(["foot-mile-counts"]);
	});
});

describe("cf narration: warnings", () => {
	it("lists each sentence's first two words and warns on three list-like starts in a row", async () => {
		const { code, callout } = await narrate("List");
		expect(callout.freshStarts.starts).toEqual(["You cross", "In the", "Back in", "Rain ticks"]);
		expect(callout.freshStarts.runs).toEqual([{ from: 1, to: 3, starts: ["You cross", "In the", "Back in"] }]);
		expect(rules(callout, "warning")).toEqual(["fresh-starts"]);
		expect(code).toBe(0);
	});

	it("does not warn when the run is broken before three", async () => {
		const { callout } = await narrate("Short list");
		expect(callout.freshStarts.runs).toEqual([]);
		expect(callout.findings).toEqual([]);
	});

	it("warns on judgement words, with exit 0", async () => {
		const { code, callout } = await narrate("Judgement");
		expect(callout.judgementWords).toEqual(["ancient", "mysterious", "sense of", "can't help but", "angry"]);
		expect(rules(callout, "warning")).toEqual(["judgement-words"]);
		expect(code).toBe(0);
	});

	it("leaves judgement words inside quoted speech alone", async () => {
		const { callout } = await narrate("Judgement in speech");
		expect(callout.judgementWords).toEqual([]);
	});
});

describe("cf narration: help and usage errors", () => {
	it("documents options, exit codes and examples", async () => {
		const { code, stdout } = await cf(["narration", "--help"]);
		expect(code).toBe(0);
		for (const option of ["--callout", "--source", "--old", "--band", "--json", "--vault", "--root"]) expect(stdout).toContain(option);
		expect(stdout).toContain("Examples:");
		expect(stdout).toContain("Exit codes:");
		expect(stdout).toMatch(/^ {2}cf narration \S.*--band 80-120/m);
	});

	it("is listed in cf --help", async () => {
		expect((await cf(["--help"])).stdout).toContain("narration");
	});

	it("exits 2 with an example for an unknown page", async () => {
		const { code, stderr } = await cf(["narration", "Crosing", ...vaultFlags], repoRoot);
		expect(code).toBe(2);
		expect(stderr).toContain("Did you mean `Crossing`?");
		expect(stderr).toContain("cf narration");
	});

	it("exits 2 naming the callouts when --callout matches none", async () => {
		const { code, stderr } = await cf(["narration", "Crossing", "--callout", "Nope", ...vaultFlags], repoRoot);
		expect(code).toBe(2);
		expect(stderr).toContain("Clean");
	});

	it("exits 2 when the page has no narration callout", async () => {
		const { code, stderr } = await cf(["narration", "Old Ferry", ...vaultFlags], repoRoot);
		expect(code).toBe(2);
		expect(stderr).toContain("no [!narration] callout");
	});

	it("exits 2 for a malformed --band and a missing --source file", async () => {
		const band = await cf(["narration", "Crossing", "--band", "80", ...vaultFlags], repoRoot);
		expect(band.code).toBe(2);
		expect(band.stderr).toContain("--band 80-120");
		const source = await cf(["narration", "Crossing", "--source", "nowhere.md", ...vaultFlags], repoRoot);
		expect(source.code).toBe(2);
		expect(source.stderr).toContain("nowhere.md");
	});
});

describe("cf narration: the repo's fixture vault", () => {
	it("reads the Ilse Corran first look", async () => {
		const real = resolve(repoRoot, "test/fixtures");
		const { code, stdout } = await cf(["narration", "Ilse Corran", "--vault", join(real, "vault"), "--root", real], repoRoot);
		expect(stdout).toContain("First look");
		expect(stdout).toContain("sentences (narration): 5, spoken lines: 2");
		expect([0, 1]).toContain(code);
	});
});
