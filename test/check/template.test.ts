import { cp, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { checkFixture, copyFixture, findingsFor, type JsonReport, realTemplates, cf } from "./helpers.ts";

let report: JsonReport;
let code: number;

beforeAll(async () => {
	({ report, code } = await checkFixture("template", ["--layer", "template"]));
});

const rules = (page: string): string[] => findingsFor(report, `/${page}.md`).map((f) => f.rule).sort();

describe("template layer: failure classes", () => {
	it("exits 1 when any page fails", () => {
		expect(code).toBe(1);
		expect(report.ok).toBe(false);
	});

	it("passes a conforming page, and skips index.md and log.md", () => {
		expect(rules("Sources Ok")).toEqual([]);
		expect(report.findings.filter((f) => /\/(index|log)\.md$/.test(f.path))).toEqual([]);
	});

	it.each([
		["No Frontmatter", ["missing-frontmatter"]],
		["Bad Yaml", ["invalid-frontmatter"]],
		["Unknown Type", ["unknown-type"]],
		["Lowercase Type", ["unknown-type"]],
		["Sneaky Kind", ["unexpected-kind"]],
		["Kindless Location", ["missing-kind"]],
		["Bad Kind", ["unknown-kind"]],
		["Missing Keys", ["missing-key", "missing-key"]],
		["Blank Summary", ["blank-summary"]],
		["Multiline Summary", ["summary-multiline"]],
		["Sources Scalar", ["sources-type"]],
		["Bad Sources", ["sources-path", "sources-path", "sources-type"]],
		["Short Sections", ["missing-section", "missing-section"]],
		["Swapped Sections", ["section-order"]],
		["No Callout", ["missing-callout"]],
		["Empty Callout", ["empty-callout"]],
		["Empty Section", ["empty-heading"]],
		["Guided", ["empty-heading", "empty-heading", "leftover-comment", "leftover-comment", "missing-key"]],
	])("%s yields %j", (page, expected) => {
		expect(rules(page)).toEqual(expected);
	});

	it("lists the valid values in an unknown-type finding, and suggests the near miss", () => {
		const unknown = findingsFor(report, "/Unknown Type.md")[0];
		expect(unknown?.hint).toContain("`NPC`");
		expect(unknown?.hint).toContain("`Location`");
		const lower = findingsFor(report, "/Lowercase Type.md")[0];
		expect(lower?.hint).toContain("Did you mean `type: NPC`");
		const kind = findingsFor(report, "/Bad Kind.md")[0];
		expect(kind?.hint).toContain("`Region`, `Settlement`, `Site`");
	});

	it("gives each finding a line and an example-bearing hint", () => {
		for (const f of report.findings) {
			expect(f.line).toBeGreaterThan(0);
			expect(f.hint.length).toBeGreaterThan(20);
		}
		const callout = findingsFor(report, "/No Callout.md")[0];
		expect(callout?.hint).toContain("> [!narration] First look");
	});

	it("derives requirements from the template: an edited template changes the check", async () => {
		const dir = await copyFixture("template");
		const { cp, readFile: read, writeFile } = await import("node:fs/promises");
		await cp(realTemplates, join(dir, "templates"), { recursive: true });
		const npc = await read(join(dir, "templates/NPC.md"), "utf8");
		await writeFile(join(dir, "templates/NPC.md"), npc.replace("sources: []", "sources: []\nrole: \"\""));
		const result = await cf(["check", "--json", "--layer", "template", "--vault", join(dir, "wiki"), "--root", dir, "--templates", join(dir, "templates")], dir);
		const edited = JSON.parse(result.stdout) as JsonReport;
		expect(findingsFor(edited, "/Sources Ok.md").map((f) => f.rule)).toEqual(["missing-key"]);
	});

	it("reads `Optional` guidance as an optional section: absent passes, present keeps order, empty is droppable", async () => {
		const dir = await copyFixture("template");
		const templates = join(dir, "templates");
		await cp(realTemplates, templates, { recursive: true });
		const npc = await readFile(join(templates, "NPC.md"), "utf8");
		expect(npc).toMatch(/## Depth\n\n%% /);
		await writeFile(join(templates, "NPC.md"), npc.replace(/## Depth\n\n%% /, "## Depth\n\n%% Optional. "));
		const flags = ["--vault", join(dir, "wiki"), "--root", dir, "--templates", templates];
		const result = await cf(["check", "--json", "--layer", "template", ...flags], dir);
		const edited = JSON.parse(result.stdout) as JsonReport;
		const of = (page: string): string[] => findingsFor(edited, `/${page}.md`).map((f) => f.rule).sort();
		expect(of("Short Sections")).toEqual(["missing-section"]);
		expect(findingsFor(edited, "/Short Sections.md")[0]?.hint).toContain("`Depth` (optional)");
		expect(of("Swapped Sections")).toEqual(["section-order"]);
		const empty = findingsFor(edited, "/Empty Section.md");
		expect(empty.map((f) => f.rule)).toEqual(["empty-heading"]);
		expect(empty[0]?.hint).toContain("marks `## Depth` optional");

		await cf(["check", "--json", "--layer", "template", "--fix", ...flags], dir);
		const fixed = await readFile(join(dir, "wiki/Aldermoor/NPCs/Empty Section.md"), "utf8");
		expect(fixed).not.toContain("## Depth");
		expect(fixed).toContain("## Links");
	});

	it("points a missing callout at the section the template puts it in", () => {
		expect(findingsFor(report, "/No Callout.md")[0]?.hint).toContain("under `## At a glance`");
	});
});

describe("template layer: --fix", () => {
	it("adds blank keys, strips guidance and empty ### headings, then is idempotent", async () => {
		const dir = await copyFixture("template");
		const args = ["check", "--layer", "template", "--json", "--fix", "--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates];
		const first = JSON.parse((await cf(args, dir)).stdout) as JsonReport;
		expect(first.fixes.map((f) => f.path)).toContain("wiki/Aldermoor/NPCs/Guided.md");
		expect(findingsFor(first, "/Guided.md")).toEqual([]);
		expect(rules("Guided")).not.toEqual([]); // the original stays broken; the copy is fixed

		const fixed = await readFile(join(dir, "wiki/Aldermoor/NPCs/Guided.md"), "utf8");
		expect(fixed).not.toContain("%%");
		expect(fixed).toContain('creature: ""');
		expect(fixed).not.toContain("### History");
		expect(fixed).toContain("## At a glance\n\n- **Role.**");

		const missing = await readFile(join(dir, "wiki/Aldermoor/NPCs/Missing Keys.md"), "utf8");
		expect(missing).toMatch(/^---\ntype: NPC\nsummary: "A ferrywoman."\nrevealed: ""\ntitle: ""\nsources: \[\]\ncreature: ""\n---\n/);

		const second = JSON.parse((await cf(args, dir)).stdout) as JsonReport;
		expect(second.fixes).toEqual([]);
		const third = await cf(args.filter((a) => a !== "--json"), dir);
		expect(third.stdout).not.toContain("fixed  ");
	});

	it("--dry-run reports the fixes and writes nothing", async () => {
		const dir = await copyFixture("template");
		const before = await readFile(join(dir, "wiki/Aldermoor/NPCs/Guided.md"), "utf8");
		const result = await cf(["check", "--layer", "template", "--fix", "--dry-run", "--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates], dir);
		expect(result.stdout).toContain("would fix  wiki/Aldermoor/NPCs/Guided.md");
		expect(await readFile(join(dir, "wiki/Aldermoor/NPCs/Guided.md"), "utf8")).toBe(before);
	});
});
