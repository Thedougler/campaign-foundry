import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { layers } from "../../src/check/layers/index.ts";
import { cf, checkFixture, copyFixture, fixtures, type JsonReport, realTemplates, repoRoot } from "./helpers.ts";

const flags = (fixture: string) => ["--vault", join(fixtures, fixture, "wiki"), "--root", join(fixtures, fixture), "--templates", realTemplates];

const layerNames = layers.map((layer) => layer.name);

describe("cf --help", () => {
	it("lists subcommands without dumping their manuals", async () => {
		const { code, stdout } = await cf(["--help"]);
		expect(code).toBe(0);
		expect(stdout).toContain("check");
		expect(stdout).toContain("index");
		expect(stdout).toContain("log");
		expect(stdout).not.toContain("--dry-run");
	});

	it("prints top-level help when run bare", async () => {
		const { code, stdout } = await cf([]);
		expect(code).toBe(0);
		expect(stdout).toContain("Commands:");
	});

	it("cf check --help documents options, layers, exit codes and real example invocations", async () => {
		const { code, stdout } = await cf(["check", "--help"]);
		expect(code).toBe(0);
		for (const option of ["--vault", "--templates", "--root", "--layer", "--fix", "--dry-run", "--json"]) expect(stdout).toContain(option);
		for (const layer of layerNames) expect(stdout).toContain(layer);
		expect(stdout).toContain("Examples:");
		expect(stdout).toMatch(/^ {2}cf check --fix --dry-run$/m);
		expect(stdout).toMatch(/^ {2}cf check wiki\/\S+\.md$/m);
		expect(stdout).toContain("Exit codes:");
		expect(stdout).toContain("error");
		expect(stdout).toContain("warning");
		expect(stdout).toContain("0  no errors (warnings may print)");
		expect(stdout).toContain("1  errors remain");
		expect(stdout).toContain("2  usage error");
	});
});

describe("cf check: exit codes and output", () => {
	it("exits 0 on a clean vault, with a summary line", async () => {
		const { code, stdout } = await cf(["check", ...flags("clean")], repoRoot);
		expect(code).toBe(0);
		expect(stdout).toMatch(new RegExp(`^ok: 0 findings, 29 pages, ${layerNames.length} layers \\(${layerNames.join(", ")}\\), \\d+ms$`, "m"));
	});

	it("exits 1 on errors and prints path:line  layer/rule  severity  message, then an indented fix hint", async () => {
		const { code, stdout } = await cf(["check", ...flags("links"), "--layer", "links"], repoRoot);
		expect(code).toBe(1);
		expect(stdout).toMatch(/^test\/check\/fixtures\/links\/wiki\/Aldermoor\/NPCs\/Broken Links\.md:\d+ {2}links\/unresolved {2}error {2}Link \[\[Nowhere Keep\]\]/m);
		expect(stdout).toMatch(/^ {4}fix: .+/m);
		expect(stdout).toMatch(/^\d+ findings? \(\d+ errors?, 0 warnings\) in \d+ files?, \d+ pages, 1 layer \(links\), \d+ms$/m);
	});

	it("exits 2 on usage errors, with a message on stderr", async () => {
		for (const args of [
			["check", "--bogus"],
			["check", "--layer", "nope"],
			["check", "--vault", "/no/such/folder"],
			["check", "--dry-run"],
			["check", "no-such-file.md"],
			["nonsense"],
		]) {
			const { code, stderr } = await cf(args, repoRoot);
			expect(code, args.join(" ")).toBe(2);
			expect(stderr.length, args.join(" ")).toBeGreaterThan(0);
		}
	});

	it("names valid layers and an example invocation when --layer is wrong", async () => {
		const { stderr } = await cf(["check", "--layer", "nope"], repoRoot);
		expect(stderr).toContain(`Available layers: ${layerNames.join(", ")}`);
		expect(stderr).toContain("cf check --layer template");
	});

	it("--fix on a clean vault changes nothing", async () => {
		const dir = await copyFixture("clean");
		const { code, stdout } = await cf(["check", "--fix", "--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates], dir);
		expect(code).toBe(0);
		expect(stdout).not.toContain("fixed  ");
	});

	it("emits parseable JSON with counts", async () => {
		const { report, code } = await checkFixture("clean");
		expect(code).toBe(0);
		expect(report).toMatchObject({ ok: true, findings: [], counts: { findings: 0, pages: 29 } });
	});

	it("ignores templates/ and .obsidian/ inside the vault", async () => {
		const { report } = await checkFixture("clean");
		expect(report.counts.pages).toBe(29); // clean/wiki/templates/Sample.md would fail every layer if loaded
	});
});

describe("cf check: layers and paths", () => {
	it("--layer runs only the named layers, repeatably", async () => {
		const { report } = await checkFixture("template", ["--layer", "links", "--layer", "orphans"]);
		expect((report as JsonReport & { layers: string[] }).layers).toEqual(["links", "orphans"]);
		expect(report.findings.every((f) => f.layer === "links" || f.layer === "orphans")).toBe(true);
	});

	it("checks the given paths with the whole vault as link context", async () => {
		// Lonely is an orphan only because nothing anywhere links to it: that needs the global link graph.
		const scoped = await checkFixture("orphans", ["--layer", "orphans", join(fixtures, "orphans/wiki/Aldermoor/NPCs/Lonely.md")]);
		expect(scoped.report.findings.map((f) => f.path)).toEqual(["wiki/Aldermoor/NPCs/Lonely.md"]);
		expect(scoped.report.counts.pages).toBe(1);
		const dir = await checkFixture("orphans", ["--layer", "orphans", join(fixtures, "orphans/wiki/Aldermoor/NPCs")]);
		expect(dir.report.findings.map((f) => f.path)).toEqual([
			"wiki/Aldermoor/NPCs/Lonely.md",
			"wiki/Aldermoor/NPCs/Only From Index.md",
			"wiki/Aldermoor/NPCs/Only From Log.md",
			"wiki/Aldermoor/NPCs/Orphan With Link.md",
		]);
		const clean = await checkFixture("orphans", ["--layer", "orphans", join(fixtures, "orphans/wiki/Aldermoor/NPCs/Linked.md")]);
		expect(clean.report.counts.pages).toBe(1);
		expect(clean.code).toBe(0);
	});

	it("--fix only touches pages under the given paths", async () => {
		const dir = await copyFixture("template");
		const result = await cf(["check", "--json", "--layer", "template", "--fix", "--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates, join(dir, "wiki/Aldermoor/NPCs/Guided.md")], dir);
		const report = JSON.parse(result.stdout) as JsonReport;
		expect(report.fixes.map((f) => f.path)).toEqual(["wiki/Aldermoor/NPCs/Guided.md"]);
	});
});

describe("cf check: speed", () => {
	it("checks a 300-page vault in seconds cold and about a second warm", { timeout: 30000 }, async () => {
		const dir = await copyFixture("clean");
		const npcs = join(dir, "wiki/ashes-of-the-crown/NPCs");
		await mkdir(npcs, { recursive: true });
		const body = (name: string, next: string) => `---
type: NPC
title: "${name}"
summary: "Villager ${name}."
sources: []
creature: ""
revealed: ""
---

## At a glance

- **Role.** Farmer.
- **Found at.** [[Ravenhold]]

> [!narration] First look
> ${name} nods. See [[${next}]].

## Play

- **Opens them up.** Talk of the weather gets ${name} going.

## Depth

Knows [[${next}]].

### History

Born here.

## Links

\`\`\`base
filters:
  and:
    - file.hasLink(this.file)
\`\`\`
`;
		await Promise.all(
			Array.from({ length: 300 }, (_, i) => writeFile(join(npcs, `Villager ${i}.md`), body(`${i}`, `Villager ${(i + 1) % 300}`))),
		);
		await cf(["index", "--vault", join(dir, "wiki"), "--root", dir], dir); // the 300 new pages make the generated index stale
		const args = ["check", "--json", "--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates];
		// The prose layers cache per page by content hash: a first run reads every page, a repeat run
		// reads only what changed. Absolute bounds stay generous because CI loads the machine; the
		// cold-to-warm ratio is what actually catches a broken cache.
		const started = performance.now();
		const first = JSON.parse((await cf(args, dir)).stdout) as JsonReport & { durationMs: number };
		const firstWall = performance.now() - started;
		expect(first.findings).toEqual([]);
		expect(first.counts.pages).toBeGreaterThanOrEqual(328);
		expect(firstWall).toBeLessThan(30000);
		const repeatStarted = performance.now();
		const repeat = JSON.parse((await cf(args, dir)).stdout) as JsonReport & { durationMs: number };
		const repeatWall = performance.now() - repeatStarted;
		expect(repeat.findings).toEqual([]);
		expect(repeat.durationMs).toBeLessThan(first.durationMs / 2);
		expect(repeatWall).toBeLessThan(5000);
	});
});
