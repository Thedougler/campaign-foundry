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

	it("normalises whitespace and dash variants while leaving other word edits gated", async () => {
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
		expect(result.findings.filter(({ path }) => path === "wiki/Spells/published.md")).toEqual([]);
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
			body.join("\n").replaceAll("—", "-"),
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
		const corpus = ["| Hit Points | Effect |", "|:----------:|--------|", "| 0-20 | The target dies. |"].join("\n");
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

	it("matches script-Britishised corpus lines but gates a word edit outside the spelling map", async () => {
		const original = `${register} The bubble is centered on the target.`;
		const british = `${register} The bubble is centred on the target.`;
		const { check } = await fixture(
			{
				"Spells/published.md": page([british]),
				"campaign/Spells/copy.md": page([british.replace("bubble", "sphere")]),
			},
			original,
		);
		const result = await check();
		expect(result.findings.filter(({ path }) => path === "wiki/Spells/published.md")).toEqual([]);
		expect(result.findings).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ path: "wiki/campaign/Spells/copy.md", rule: "ai-tells.VerbTricolon", line: 6 }),
			]),
		);
	});

	it.each([" -- ", " — "])(
		"matches the converter's %s clause repair while keeping other punctuation edits gated",
		async (dash) => {
			const original = `${register} You touch the creature${dash}the spell ends.`;
			const converted = `${register} You touch the creature, the spell ends.`;
			const { check } = await fixture(
				{
					"Spells/published.md": page([converted]),
					"campaign/Spells/copy.md": page([converted.replace("creature,", "creature;")]),
				},
				original,
			);
			const result = await check();
			expect(result.findings.filter(({ path }) => path === "wiki/Spells/published.md")).toEqual([]);
			expect(result.findings).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ path: "wiki/campaign/Spells/copy.md", rule: "ai-tells.VerbTricolon", line: 6 }),
				]),
			);
		},
	);

	it("does not treat edits inside literal code as converter clause repairs", async () => {
		const original = `${register} The literal is \`red -- blue\`.`;
		const { check } = await fixture(
			{
				"campaign/Spells/copy.md": page([original.replace("red -- blue", "red, blue")]),
			},
			original,
		);
		expect((await check()).findings).toEqual(
			expect.arrayContaining([expect.objectContaining({ rule: "ai-tells.VerbTricolon", line: 6 })]),
		);
	});

	it("recognises Britishised lines late in a corpus with repeated US spellings", async () => {
		const corpus = Array.from({ length: 120 }, (_, index) => `${register} Bubble ${index} is centered here.`);
		const { check } = await fixture(
			{
				"Spells/published.md": page([`${register} Bubble 119 is centred here.`]),
			},
			corpus.join("\n\n"),
		);
		expect((await check()).findings).toEqual([]);
	});

	it("matches the converter's scaling-label swap but gates an unrelated label edit", async () => {
		const original = register.replace("***Cantrip Upgrade.***", "***At Higher Levels.***");
		const converted = register.replace("***Cantrip Upgrade.***", "***Using a Higher-Level Spell Slot.***");
		const { check } = await fixture(
			{
				"Spells/published.md": page([converted]),
				"campaign/Spells/copy.md": page([converted.replace("Higher-Level", "Stronger")]),
			},
			original,
		);
		const result = await check();
		expect(result.findings.filter(({ path }) => path === "wiki/Spells/published.md")).toEqual([]);
		expect(result.findings).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ path: "wiki/campaign/Spells/copy.md", rule: "ai-tells.VerbTricolon", line: 6 }),
			]),
		);
	});

	it("matches compacted corpus tables while keeping edited cell wording gated", async () => {
		const corpus = `Effect            | Result\n-------------------|--------\n${register} | She have a sword.`;
		const table = ["| Effect | Result |", "| --- | --- |", `| ${register} | She have a sword. |`];
		const { check } = await fixture(
			{
				"Spells/published.md": page(table),
				"campaign/Spells/copy.md": page(table.map((line) => line.replace("She have a sword.", "She have an axe."))),
			},
			corpus,
		);
		const result = await check();
		expect(result.findings.filter(({ path }) => path === "wiki/Spells/published.md")).toEqual([]);
		expect(result.findings).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ path: "wiki/campaign/Spells/copy.md", rule: "PronounVerbAgreement", line: 8 }),
			]),
		);
	});

	it("matches removal of inline export tags without allowing other text edits", async () => {
		const original = `${register} You use an <a href="rules.html">Unarmed Strike</a>.`;
		const converted = `${register} You use an Unarmed Strike.`;
		const { check } = await fixture(
			{
				"Spells/published.md": page([converted]),
				"campaign/Spells/copy.md": page([converted.replace("Unarmed", "Armed")]),
			},
			original,
		);
		const result = await check();
		expect(result.findings.filter(({ path }) => path === "wiki/Spells/published.md")).toEqual([]);
		expect(result.findings).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ path: "wiki/campaign/Spells/copy.md", rule: "ai-tells.VerbTricolon", line: 6 }),
			]),
		);
	});

	it("matches a script-produced line that is only partly Britishised by a field-wide spelling cap", async () => {
		const original = `${register} A centered bubble encloses a centered ring, a centered glyph, and a centered rune.`;
		let count = 0;
		const partial = original.replaceAll("centered", () => (++count <= 3 ? "centred" : "centered"));
		const { check } = await fixture(
			{
				"Spells/published.md": page([partial]),
				"campaign/Spells/copy.md": page([partial.replace("bubble", "sphere")]),
			},
			`Both centered stones guard a centered gate.\n\n${original}`,
		);
		const result = await check();
		expect(result.findings.filter(({ path }) => path === "wiki/Spells/published.md")).toEqual([]);
		expect(result.findings).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ path: "wiki/campaign/Spells/copy.md", rule: "ai-tells.VerbTricolon", line: 6 }),
			]),
		);
	});
});
