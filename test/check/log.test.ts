import { execFile } from "node:child_process";
import { readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { cf, copyFixture, type JsonReport, realTemplates, vaultFlags } from "./helpers.ts";

/** Today as a node child sees it, the same clock `cf log` runs on. */
const nodeToday = (): Promise<string> =>
	promisify(execFile)("node", ["-e", "const d=new Date();const p=(n)=>String(n).padStart(2,'0');console.log(`${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`)"])
		.then(({ stdout }) => stdout.trim());

const LOG = "wiki/Aldermoor/log.md";
const FIRST = "## [2026-01-05] ingest | Session 1 transcript\n\n- [[Session 1 - Recap]]\n";

const read = (dir: string, path = LOG) => readFile(join(dir, path), "utf8");
const exists = async (dir: string, path: string) => (await read(dir, path).then(() => true, () => false));

/** `cf log` against a copy of the clean fixture. */
async function log(dir: string, args: string[], stdin = "") {
	return cf(["log", ...vaultFlags(dir), "--world", "Aldermoor", ...args], dir, stdin);
}

describe("cf log", () => {
	it("appends an entry with one bullet per page, a blank line between entries", async () => {
		const dir = await copyFixture("clean");
		const { code, stdout } = await log(dir, ["--op", "prep", "--title", "Session 2 Prep", "--page", "Session 1 - Recap", "--page", "Mara Voss", "--date", "2026-02-01"]);
		expect(code).toBe(0);
		expect(stdout).toContain("logged");
		expect(await read(dir)).toBe(`${FIRST}\n## [2026-02-01] prep | Session 2 Prep\n\n- [[Session 1 - Recap]]\n- [[Mara Voss]]\n`);
	});

	it("accepts --op lint", async () => {
		const dir = await copyFixture("clean");
		const { code, stdout } = await log(dir, ["--op", "lint", "--title", "Headings", "--page", "Mara Voss", "--date", "2026-02-01"]);
		expect(code).toBe(0);
		expect(stdout).toContain("lint | Headings");
		expect(await read(dir)).toContain("## [2026-02-01] lint | Headings");
	});

	it("takes pages as a name, a vault-relative path or a path from the working directory", async () => {
		const dir = await copyFixture("clean");
		const { code } = await log(dir, [
			"--op", "audit", "--title", "Paths", "--date", "2026-02-01",
			"--page", "Aldermoor/NPCs/Mara Voss.md",
			"--page", "wiki/Aldermoor/Locations/Ravenhold.md",
			"--page", "Orsa",
		]);
		expect(code).toBe(0);
		expect((await read(dir)).endsWith("- [[Mara Voss]]\n- [[Ravenhold]]\n- [[Orsa]]\n")).toBe(true);
	});

	it("reads page names from stdin with --stdin, one per line", async () => {
		const dir = await copyFixture("clean");
		const { code } = await log(dir, ["--op", "ingest", "--title", "Piped", "--date", "2026-02-01", "--stdin"], "Mara Voss\n\nOrsa\n");
		expect(code).toBe(0);
		expect((await read(dir)).endsWith("## [2026-02-01] ingest | Piped\n\n- [[Mara Voss]]\n- [[Orsa]]\n")).toBe(true);
	});

	it("creates log.md when the World has none", async () => {
		const dir = await copyFixture("clean");
		await rm(join(dir, LOG));
		const { code } = await log(dir, ["--op", "query", "--title", "Who is Mara", "--page", "Mara Voss", "--date", "2026-03-04"]);
		expect(code).toBe(0);
		expect(await read(dir)).toBe("## [2026-03-04] query | Who is Mara\n\n- [[Mara Voss]]\n");
	});

	it("dates the entry today, in the real world, when --date is left out", async () => {
		const stamp = await nodeToday();
		const dir = await copyFixture("clean");
		await log(dir, ["--op", "pull", "--title", "D&D Beyond", "--page", "Tam Brightwater"]);
		expect(await read(dir)).toContain(`## [${stamp}] pull | D&D Beyond\n`);
	});

	it("rotates log.md to log-<year>.md when the last entry is from an earlier year", async () => {
		const dir = await copyFixture("clean");
		const { code, stdout } = await log(dir, ["--op", "prep", "--title", "New year", "--page", "Mara Voss", "--date", "2027-01-02"]);
		expect(code).toBe(0);
		expect(stdout).toContain("rotated");
		expect(stdout).toContain("log-2026.md");
		expect(await read(dir, "wiki/Aldermoor/log-2026.md")).toBe(FIRST);
		expect(await read(dir)).toBe("## [2027-01-02] prep | New year\n\n- [[Mara Voss]]\n");
	});

	it("does not rotate within the same year", async () => {
		const dir = await copyFixture("clean");
		await log(dir, ["--op", "prep", "--title", "Later", "--page", "Mara Voss", "--date", "2026-12-31"]);
		expect(await exists(dir, "wiki/Aldermoor/log-2026.md")).toBe(false);
	});

	it("refuses to rotate over an existing log-<year>.md", async () => {
		const dir = await copyFixture("clean");
		await writeFile(join(dir, "wiki/Aldermoor/log-2026.md"), FIRST);
		const { code, stderr } = await log(dir, ["--op", "prep", "--title", "New year", "--page", "Mara Voss", "--date", "2027-01-02"]);
		expect(code).toBe(2);
		expect(stderr).toContain("log-2026.md");
		expect(await read(dir)).toBe(FIRST);
	});

	it("is idempotent: repeating the last entry is a no-op that says so", async () => {
		const dir = await copyFixture("clean");
		const args = ["--op", "prep", "--title", "Session 2 Prep", "--page", "Mara Voss", "--page", "Orsa", "--date", "2026-02-01"];
		await log(dir, args);
		const once = await read(dir);
		const again = await log(dir, args);
		expect(again.code).toBe(0);
		expect(again.stdout).toContain("already logged");
		expect(await read(dir)).toBe(once);
	});

	it("is idempotent across a rotation retry", async () => {
		const dir = await copyFixture("clean");
		const args = ["--op", "prep", "--title", "New year", "--page", "Mara Voss", "--date", "2027-01-02"];
		await log(dir, args);
		const again = await log(dir, args);
		expect(again.stdout).toContain("already logged");
		expect(await read(dir, "wiki/Aldermoor/log-2026.md")).toBe(FIRST);
	});

	it("logs the same title again when the pages differ", async () => {
		const dir = await copyFixture("clean");
		const base = ["--op", "prep", "--title", "Session 2 Prep", "--date", "2026-02-01"];
		await log(dir, [...base, "--page", "Mara Voss"]);
		await log(dir, [...base, "--page", "Orsa"]);
		expect((await read(dir)).match(/^## /gm)).toHaveLength(3);
	});

	it("--dry-run shows the entry and rotation and writes nothing", async () => {
		const dir = await copyFixture("clean");
		const { code, stdout } = await log(dir, ["--op", "prep", "--title", "New year", "--page", "Mara Voss", "--date", "2027-01-02", "--dry-run"]);
		expect(code).toBe(0);
		expect(stdout).toContain("would rotate");
		expect(stdout).toContain("## [2027-01-02] prep | New year");
		expect(await read(dir)).toBe(FIRST);
		expect(await exists(dir, "wiki/Aldermoor/log-2026.md")).toBe(false);
	});

	it("produces a log the gate accepts", async () => {
		const dir = await copyFixture("clean");
		await log(dir, ["--op", "prep", "--title", "Session 2 Prep", "--page", "Mara Voss", "--date", "2026-02-01"]);
		await log(dir, ["--op", "push", "--title", "Session 2", "--page", "Orsa", "--date", "2027-01-02"]);
		const result = await cf(["check", "--json", "--layer", "log", "--layer", "links", ...vaultFlags(dir), "--templates", realTemplates], dir);
		expect((JSON.parse(result.stdout) as JsonReport).findings).toEqual([]);
	});

	describe("usage errors exit 2 with an example invocation", () => {
		const base = ["--op", "prep", "--title", "T", "--page", "Mara Voss"];
		const without = (flag: string) => {
			const i = base.indexOf(flag);
			return base.filter((_, j) => j !== i && j !== i + 1);
		};

		it("rejects an unknown op, naming the valid ones", async () => {
			const dir = await copyFixture("clean");
			const { code, stderr } = await log(dir, ["--op", "plan", "--title", "T", "--page", "Mara Voss"]);
			expect(code).toBe(2);
			expect(stderr).toContain("create, ingest, prep, push, audit, pull, query, lint");
			expect(stderr).toContain('cf log --world Aldermoor --op prep --title "Session 2 Prep" --page');
			expect(await read(dir)).toBe(FIRST);
		});

		it.each([["--op"], ["--title"]])("requires %s", async (flag) => {
			const dir = await copyFixture("clean");
			const { code, stderr } = await log(dir, without(flag));
			expect(code).toBe(2);
			expect(stderr).toContain(flag);
			expect(stderr).toContain("cf log --world");
		});

		it("requires --world", async () => {
			const dir = await copyFixture("clean");
			const { code, stderr } = await cf(["log", ...vaultFlags(dir), ...base], dir);
			expect(code).toBe(2);
			expect(stderr).toContain("--world");
		});

		it("requires at least one page", async () => {
			const dir = await copyFixture("clean");
			const { code, stderr } = await log(dir, without("--page"));
			expect(code).toBe(2);
			expect(stderr).toContain("--page");
			expect(stderr).toContain("cf log --world");
		});

		it("rejects a page that does not exist, suggesting the closest name", async () => {
			const dir = await copyFixture("clean");
			const { code, stderr } = await log(dir, ["--op", "prep", "--title", "T", "--page", "Mara Vos"]);
			expect(code).toBe(2);
			expect(stderr).toContain("No page `Mara Vos`");
			expect(stderr).toContain("Mara Voss");
			expect(await read(dir)).toBe(FIRST);
		});

		it("rejects a World that does not exist, listing the Worlds", async () => {
			const dir = await copyFixture("clean");
			const { code, stderr } = await cf(["log", ...vaultFlags(dir), "--world", "Nowhere", ...base], dir);
			expect(code).toBe(2);
			expect(stderr).toContain("Aldermoor");
		});

		it("rejects a malformed or impossible --date", async () => {
			const dir = await copyFixture("clean");
			for (const date of ["2026-2-1", "2026-02-30", "yesterday"]) {
				const { code, stderr } = await log(dir, [...base, "--date", date]);
				expect(code, date).toBe(2);
				expect(stderr).toContain("--date 2026-02-01");
			}
		});

		it("rejects an entry dated before the last one", async () => {
			const dir = await copyFixture("clean");
			const { code, stderr } = await log(dir, [...base, "--date", "2025-12-31"]);
			expect(code).toBe(2);
			expect(stderr).toContain("2026-01-05");
		});

		it("rejects a title with a line break", async () => {
			const dir = await copyFixture("clean");
			const { code } = await log(dir, ["--op", "prep", "--title", "two\nlines", "--page", "Mara Voss"]);
			expect(code).toBe(2);
		});
	});

	it("documents itself in --help, with examples", async () => {
		const { code, stdout } = await cf(["log", "--help"]);
		expect(code).toBe(0);
		for (const option of ["--world", "--op", "--title", "--page", "--stdin", "--date", "--dry-run", "--vault", "--root"]) expect(stdout).toContain(option);
		expect(stdout.replace(/\s+/g, " ")).toContain("create, ingest, prep, push, audit, pull, query, lint");
		expect(stdout).toContain("Examples:");
		expect(stdout).toMatch(/^ {2}cf log --world \S+ --op ingest --title ".+" --page ".+"/m);
		expect(stdout).toContain("Exit codes:");
	});
});

describe("log layer", () => {
	const gate = async (dir: string) => {
		const result = await cf(["check", "--json", "--layer", "log", ...vaultFlags(dir), "--templates", realTemplates], dir);
		return { ...result, report: JSON.parse(result.stdout) as JsonReport };
	};
	const rules = (report: JsonReport) => report.findings.map((f) => `${f.line}:${f.rule}`);

	it("passes the well-formed log in the clean fixture", async () => {
		const dir = await copyFixture("clean");
		const { code, report } = await gate(dir);
		expect(code).toBe(0);
		expect(report.findings).toEqual([]);
	});

	it("passes a rotated log-YYYY.md holding only that year", async () => {
		const dir = await copyFixture("clean");
		await writeFile(join(dir, "wiki/Aldermoor/log-2025.md"), "## [2025-03-01] ingest | Old\n\n- [[Mara Voss]]\n\n## [2025-12-01] audit | Older\n\n- [[Orsa]]\n");
		expect((await gate(dir)).report.findings).toEqual([]);
	});

	async function withLog(text: string) {
		const dir = await copyFixture("clean");
		await writeFile(join(dir, LOG), text);
		return gate(dir);
	}

	it("flags a heading that does not match the format", async () => {
		const { code, report } = await withLog("## 2026-01-05 ingest | No brackets\n\n- [[Orsa]]\n\n## [2026-01-06] ingest Missing bar\n");
		expect(code).toBe(1);
		expect(rules(report)).toEqual(["1:bad-heading", "5:bad-heading"]);
		expect(report.findings[0]!.hint).toContain("## [YYYY-MM-DD] op | Title");
	});

	it("flags an unknown op, naming the valid ones", async () => {
		const { report } = await withLog("## [2026-01-05] plan | Something\n\n- [[Orsa]]\n");
		expect(rules(report)).toEqual(["1:unknown-op"]);
		expect(report.findings[0]!.hint).toContain("create, ingest, prep, push, audit, pull, query, lint");
	});

	it("flags a date that is not a real calendar date", async () => {
		const { report } = await withLog("## [2026-02-30] ingest | Impossible\n\n- [[Orsa]]\n\n## [2026-13-01] ingest | Also\n");
		expect(rules(report)).toEqual(["1:bad-date", "5:bad-date"]);
	});

	it("flags entries out of date order, on the entry that is early", async () => {
		const { report } = await withLog("## [2026-03-01] ingest | Later\n\n- [[Orsa]]\n\n## [2026-02-01] ingest | Earlier\n\n- [[Orsa]]\n\n## [2026-02-01] prep | Same day as the last\n");
		expect(rules(report)).toEqual(["5:out-of-order"]);
	});

	it("flags a bullet that is not a wikilink, and stray text", async () => {
		const { report } = await withLog("## [2026-01-05] ingest | Bullets\n\n- [[Orsa]]\n- Orsa\n- [[Orsa]] and more\nsome prose\n\n# Log\n");
		expect(rules(report)).toEqual(["4:bad-bullet", "5:bad-bullet", "6:stray-line", "8:stray-line"]);
	});

	it("flags text before the first entry", async () => {
		const { report } = await withLog("- [[Orsa]]\n\n## [2026-01-05] ingest | Late start\n");
		expect(rules(report)).toEqual(["1:stray-line"]);
	});

	it("ignores %% comments and blank lines", async () => {
		const { report } = await withLog("%% Append-only. %%\n\n## [2026-01-05] ingest | Fine\n\n%% a note %%\n- [[Orsa]]\n");
		expect(report.findings).toEqual([]);
	});

	it("flags an entry from another year in a log-YYYY.md", async () => {
		const dir = await copyFixture("clean");
		await writeFile(join(dir, "wiki/Aldermoor/log-2025.md"), "## [2025-12-31] ingest | Fine\n\n- [[Orsa]]\n\n## [2026-01-01] ingest | Wrong year\n\n- [[Orsa]]\n");
		const { report } = await gate(dir);
		expect(report.findings.map((f) => `${f.path}:${f.line}:${f.rule}`)).toEqual(["wiki/Aldermoor/log-2025.md:5:wrong-year"]);
		expect(report.findings[0]!.hint).toContain("log-2026.md");
	});

	it("leaves unresolved bullet links to the links layer", async () => {
		const { report } = await withLog("## [2026-01-05] ingest | Dangling\n\n- [[Nowhere At All]]\n");
		expect(report.findings).toEqual([]);
	});

	it("keeps history: a log bullet naming a page since merged away is no broken link", async () => {
		const dir = await copyFixture("clean");
		await writeFile(join(dir, "wiki/Aldermoor/log.md"), "## [2026-01-05] ingest | Before the merge\n\n- [[Merged Away Keep]]\n");
		const result = await cf(["check", "--json", "--layer", "links", ...vaultFlags(dir), "--templates", realTemplates], dir);
		expect((JSON.parse(result.stdout) as JsonReport).findings).toEqual([]);
	});
});
