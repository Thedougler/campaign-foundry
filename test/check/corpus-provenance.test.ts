import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { boilerplateLayer } from "../../src/check/layers/boilerplate.ts";
import { grammarLayer } from "../../src/check/layers/grammar.ts";
import { styleLayerWith } from "../../src/check/layers/style.ts";
import { runCheck } from "../../src/check/run.ts";
import type { Layer } from "../../src/check/types.ts";
import { valeSubprocess } from "../../src/check/vale.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

const registry: Layer[] = [styleLayerWith(valeSubprocess()), grammarLayer, boilerplateLayer];
const register =
	"***Cantrip Upgrade.*** The damage increases by 1d6 when you reach levels 5 (2d6), 11 (3d6), and 17 (4d6).";
const grammar = "She have a sword.";

function page(lines: string[], sources = ["archive/rules.md"]): string {
	return ["---", "type: Spell", `sources: ${JSON.stringify(sources)}`, "---", "", ...lines, ""].join("\n");
}

async function fixture(pages: Record<string, string>, corpus: string) {
	const root = await mkdtemp(join(tmpdir(), "cf-corpus-"));
	roots.push(root);
	await mkdir(join(root, "archive"));
	await writeFile(join(root, "archive/rules.md"), corpus);
	const check = () =>
		runCheck({
			root,
			vault: join(root, "wiki"),
			cwd: root,
			registry,
			files: { markdown: new Map(Object.entries(pages)), attachments: [] },
		});
	return { root, pages, check };
}

describe("corpus-provenance exemption", () => {
	it("exempts published lines from style, grammar and shared-line findings but keeps hand-written prose gated", async () => {
		const body = [register, "", grammar];
		const { check } = await fixture(
			{
				"Spells/published.md": page(body),
				"Spells/published-twin.md": page(body),
				"hand-written.md": page(body, []),
				"hand-written-twin.md": page(body, []),
			},
			body.join("\n"),
		);
		const result = await check();
		expect(result.findings.filter(({ path }) => path.startsWith("wiki/Spells/"))).toEqual([]);
		for (const path of ["wiki/hand-written.md", "wiki/hand-written-twin.md"]) {
			expect(result.findings).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ path, layer: "style", rule: "ai-tells.VerbTricolon", line: 6 }),
					expect.objectContaining({ path, layer: "grammar", rule: "PronounVerbAgreement", line: 8 }),
					expect.objectContaining({ path, layer: "boilerplate", rule: "shared-line", line: 6 }),
				]),
			);
		}
	});

	it("gates an edited Campaign sentence without losing provenance on the unchanged lines", async () => {
		const edited = register.replace("17 (4d6)", "18 (4d6)");
		const { check } = await fixture(
			{
				"Spells/published.md": page([register, "", grammar]),
				"campaign/Spells/copy.md": page([edited, "", grammar]),
				"campaign/Spells/other-copy.md": page([edited, "", grammar]),
			},
			[register, "", grammar].join("\n"),
		);
		const result = await check();
		expect(result.findings.filter(({ path }) => path === "wiki/Spells/published.md")).toEqual([]);
		for (const path of ["wiki/campaign/Spells/copy.md", "wiki/campaign/Spells/other-copy.md"]) {
			expect(result.findings.filter((finding) => finding.path === path)).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ layer: "style", rule: "ai-tells.VerbTricolon", line: 6 }),
					expect.objectContaining({ layer: "boilerplate", rule: "shared-line", line: 6 }),
				]),
			);
		}
		expect(result.findings.every(({ line }) => line === 6)).toBe(true);
	});

	it("keeps whitespace and dash variants gated instead of treating them as exact source lines", async () => {
		const original = `${register} The range is 3-5 feet.`;
		const unchanged = original.replaceAll(" ", "\t  ").replace("3-5", "3–5");
		const edited = original.replace("17 (4d6)", "18 (4d6)").replace("3-5", "3—5");
		const { check } = await fixture(
			{
				"Spells/published.md": page([unchanged]),
				"campaign/Spells/copy.md": page([edited]),
			},
			original,
		);
		const result = await check();
		expect(result.findings.some(({ path }) => path === "wiki/Spells/published.md")).toBe(true);
		expect(result.findings).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ path: "wiki/campaign/Spells/copy.md", rule: "ai-tells.VerbTricolon", line: 6 }),
				expect.objectContaining({ path: "wiki/campaign/Spells/copy.md", rule: "ai-tells.EmDashUsage", line: 6 }),
			]),
		);
	});

	it("skips corpus dashes in all three Vale passes but keeps hand-written Narration gated", async () => {
		const body = ["> [!narration] First look", "> The door opens—slowly.", "", "At entry: ==The door opens—slowly.=="];
		const { check } = await fixture(
			{
				"Spells/published.md": page(body),
				"hand-written.md": page(body, []),
			},
			body.join("\n"),
		);
		const result = await check();
		expect(result.findings.filter(({ path }) => path === "wiki/Spells/published.md")).toEqual([]);
		for (const line of [7, 9]) {
			expect(result.findings).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ path: "wiki/hand-written.md", rule: "ai-tells.EmDashUsage", line }),
					expect.objectContaining({ path: "wiki/hand-written.md", rule: "Narration.NoEmDash", line }),
				]),
			);
		}
	});

	it("uses only a page's named local sources, not other pages' corpora or unavailable sources", async () => {
		const { check } = await fixture(
			{
				"Spells/published.md": page([register]),
				"wrong-source.md": page([register], ["archive/missing.md"]),
				"remote-source.md": page([register], ["https://example.com/rules.md"]),
			},
			register,
		);
		const result = await check();
		expect(result.findings.filter(({ path }) => path === "wiki/Spells/published.md")).toEqual([]);
		for (const path of ["wiki/wrong-source.md", "wiki/remote-source.md"]) {
			expect(result.findings).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ path, layer: "style", rule: "ai-tells.VerbTricolon" }),
					expect.objectContaining({ path, layer: "boilerplate", rule: "shared-line" }),
				]),
			);
		}
	});

	it("invalidates language caches when the named corpus changes without any page edit", async () => {
		const body = [register, "", grammar];
		const { root, check } = await fixture({ "Spells/published.md": page(body) }, body.join("\n"));
		expect((await check()).findings).toEqual([]);
		await writeFile(join(root, "archive/rules.md"), "Unrelated published rules.\n");
		expect((await check()).findings).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ layer: "style", rule: "ai-tells.VerbTricolon", line: 6 }),
				expect.objectContaining({ layer: "grammar", rule: "PronounVerbAgreement", line: 8 }),
			]),
		);
		await writeFile(join(root, "archive/rules.md"), body.join("\n"));
		expect((await check()).findings).toEqual([]);
	});

	it("keeps table syntax when corpus rows are exempt but a converter has reformatted the separator", async () => {
		const corpus = ["| Hit Points | Effect |", "|:----------:|--------|", "| 0–20 | The target dies. |"].join("\n");
		const table = ["| Hit Points | Effect |", "| --- | --- |", "| 0–20 | The target dies. |"];
		const { check } = await fixture(
			{
				"Spells/published.md": page(table),
				"campaign/Spells/copy.md": page([...table, "| 21–30 | The migration is worth the effort. |"]),
			},
			corpus,
		);
		const result = await check();
		expect(result.findings.filter(({ path }) => path === "wiki/Spells/published.md")).toEqual([]);
		expect(result.findings).toEqual([
			expect.objectContaining({ path: "wiki/campaign/Spells/copy.md", rule: "ai-tells.FigurativeWorth", line: 9 }),
		]);
	});

	it("offers the now-valid en-dash repair for a hand-written numeric range", async () => {
		const { check } = await fixture({ "hand-written.md": page(["Roll 3-5 dice."], []) }, "");
		const result = await check();
		expect(result.findings).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ rule: "NumericRangeEnDash", hint: expect.stringContaining("change `-` to `–`") }),
			]),
		);
	});
});
