import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import {
	cf,
	checkFixture,
	copyFixture,
	findingsFor,
	realTemplates,
	type JsonFinding,
	type JsonReport,
} from "./helpers.ts";

const A = "Aldermoor";
const LAYERS = ["markdownlint", "remark-lint"] as const;
type Layer = (typeof LAYERS)[number];

const reports = {} as Record<Layer, JsonReport>;
const exits = {} as Record<Layer, number>;
let clean: JsonReport;

beforeAll(async () => {
	await Promise.all(
		LAYERS.map(async (layer) => {
			const result = await checkFixture("prose", ["--layer", layer]);
			reports[layer] = result.report;
			exits[layer] = result.code;
		}),
	);
	clean = (
		await checkFixture(
			"clean",
			LAYERS.flatMap((l) => ["--layer", l]),
		)
	).report;
}, 15_000);

const on = (layer: Layer, page: string): JsonFinding[] => findingsFor(reports[layer], `${A}/${page}.md`);

describe.each(LAYERS)("%s layer", (layer) => {
	it("fails check on a page seeded for it", () => {
		expect(exits[layer]).toBe(1);
		expect(reports[layer].findings.length).toBeGreaterThan(0);
		expect(reports[layer].findings.every((f) => f.layer === layer)).toBe(true);
		expect(reports[layer].findings.every((f) => f.hint.length > 0)).toBe(true);
	});

	it("passes the clean page, which has bad text only in frontmatter, comments, code and embeds", () => {
		expect(on(layer, "NPCs/Good Prose")).toEqual([]);
		expect(on(layer, "Locations/Zorvath Keep")).toEqual([]);
	});

	it("skips generated index.md pages", () => {
		expect(on(layer, "index")).toEqual([]);
	});
});

describe("markdownlint layer", () => {
	it("flags trailing spaces and extra blank lines on their lines, with the rule id", () => {
		const found = on("markdownlint", "NPCs/Bad Markdown");
		expect(found.map((f) => [f.rule, f.line])).toEqual(
			expect.arrayContaining([
				["MD009", 10],
				["MD012", 13],
			]),
		);
		expect(found[0]?.hint).toMatch(/--fix/);
	});

	it("does not fight Obsidian syntax", () => {
		expect(on("markdownlint", "NPCs/Good Prose")).toEqual([]);
	});

	it("--fix applies markdownlint's own fixes and leaves a clean vault alone", async () => {
		const dir = await copyFixture("prose");
		const args = [
			"check",
			"--json",
			"--layer",
			"markdownlint",
			"--fix",
			"--vault",
			join(dir, "wiki"),
			"--root",
			dir,
			"--templates",
			realTemplates,
		];
		const result = await cf(args, dir);
		const report = JSON.parse(result.stdout) as JsonReport;
		expect(report.fixes.some((f) => f.layer === "markdownlint" && f.path.endsWith("Bad Markdown.md"))).toBe(true);
		const fixed = await readFile(join(dir, "wiki", A, "NPCs/Bad Markdown.md"), "utf8");
		expect(fixed).not.toMatch(/ +$/m);
		expect(fixed).not.toMatch(/\n\n\n/);
		const again = JSON.parse((await cf(args, dir)).stdout) as JsonReport;
		expect(again.fixes).toEqual([]);
		expect(findingsFor(again, `${A}/NPCs/Bad Markdown.md`)).toEqual([]);
	});
});

describe("remark-lint layer", () => {
	it("flags a lazy blockquote line, leaving bare URLs to markdownlint", () => {
		const rules = on("remark-lint", "NPCs/Bad Remark").map((f) => f.rule);
		expect(rules).toEqual(["no-blockquote-without-marker"]);
	});

	it("reads wikilinks, callouts, embeds and block ids as ordinary text", () => {
		expect(on("remark-lint", "NPCs/Good Prose")).toEqual([]);
	});
});

describe("the clean fixture vault", () => {
	it("passes both Markdown prose layers", () => {
		expect(clean.findings).toEqual([]);
	});
});

describe("prose layers on a page written with the fixture text", () => {
	it("re-reads a page after --fix without drift", async () => {
		const dir = await copyFixture("prose");
		const file = join(dir, "wiki", A, "NPCs/Good Prose.md");
		const before = await readFile(file, "utf8");
		await writeFile(file, before);
		const result = await cf(
			[
				"check",
				"--json",
				"--fix",
				"--layer",
				"markdownlint",
				"--vault",
				join(dir, "wiki"),
				"--root",
				dir,
				"--templates",
				realTemplates,
			],
			dir,
		);
		const report = JSON.parse(result.stdout) as JsonReport;
		expect(report.fixes.some((f) => f.path.endsWith("Good Prose.md"))).toBe(false);
		expect(await readFile(file, "utf8")).toBe(before);
	});
});
