import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { boilerplateLayer } from "../../src/check/layers/boilerplate.ts";
import { grammarLayer } from "../../src/check/layers/grammar.ts";
import { spellingLayer } from "../../src/check/layers/spelling.ts";
import { styleLayerWith } from "../../src/check/layers/style.ts";
import type { CheckContext } from "../../src/check/types.ts";
import { valeSubprocess } from "../../src/check/vale.ts";
import { bodyLines, lintText, proseView } from "../../src/check/views.ts";
import { buildVault } from "../../src/vault/vault.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function context(source: string, foreign: Record<string, string> = {}): Promise<CheckContext> {
	const root = await mkdtemp(join(tmpdir(), "cf-item-properties-"));
	roots.push(root);
	const vault = buildVault(join(root, "wiki"), {
		markdown: new Map(Object.entries({ "Target.md": source, ...foreign })),
		attachments: [],
	});
	return {
		root,
		vault,
		pages: vault.pages,
		templates: { byName: new Map(), types: new Map() },
		display: (path) => `wiki/${path}`,
	};
}

const rules = [
	"If your attunement to the tattoo ends, the tattoo vanishes, and the needle reappears in your space.",
	"While the tattoo is on your skin, you have resistance to acid damage.",
	"When you take acid damage, you can use your reaction to gain immunity against that instance of the damage, and you regain a number of hit points equal to half the damage you would have taken. Once this reaction is used, it can't be used again until the next dawn.",
];

// Published All-Purpose Tool text from test/items/fixtures/all-magic-items.md.
const toolRules = [
	"This simple screwdriver can transform into a variety of tools; as an action, you can touch the item and transform it into any type of artisan's tool of your choice (see the \"Equipment\" chapter in the *Player's Handbook* for a list of *artisan's tools*). Whatever form the tool takes, you are proficient with it.",
	"As an action, you can focus on the tool to channel your creative forces. Choose a cantrip that you don't know from any class list. For 8 hours, you can cast that cantrip, and it counts as an artificer cantrip for you. Once this property is used, it can't be used again until the next dawn.",
];

function source(type: string, heading = "## Properties", body: readonly string[] = rules): string {
	return ["---", `type: ${type}`, "---", "", heading, "", ...body, ""].join("\n");
}

describe("published Item Properties", () => {
	it("reports no Vale style findings on the DM's verbatim acid-absorbing tattoo rules", async () => {
		const ctx = await context(source("Item"));
		expect(await styleLayerWith(valeSubprocess()).run(ctx)).toEqual([]);
	});

	it.each([
		{ type: "Item", heading: "## In use" },
		{ type: "Spell", heading: "## Properties" },
		{ type: "Spell", heading: "### Effect" },
		{ type: "NPC", heading: "## Properties" },
		{ type: "House Rule", heading: "## Properties" },
		{ type: "Item", heading: "### Properties" },
		{ type: "Item", heading: "#### Properties" },
	])("keeps both style rules on $type $heading", async ({ type, heading }) => {
		const ctx = await context(source(type, heading));
		const findings = await styleLayerWith(valeSubprocess()).run(ctx);
		expect(findings.map(({ rule, line }) => [rule, line])).toEqual(
			expect.arrayContaining([
				["ai-tells.VerbTricolon", 7],
				["ai-tells.DefensiveHedges", 8],
			]),
		);
	});

	it.each(["## In use", "## At a glance", "# Other"])(
		"blanks nested Properties text and resumes style checking at %s without shifting lines",
		async (heading) => {
			const lines = [...source("Item").split("\n"), "### Absorption", "", ...rules, "", heading, "", ...rules, ""];
			const ctx = await context(lines.join("\n"));
			const firstRuleLine = lines.indexOf(heading) + 3;
			const findings = await styleLayerWith(valeSubprocess()).run(ctx);
			expect(findings.every(({ line }) => line >= firstRuleLine)).toBe(true);
			expect(findings.map(({ rule, line }) => [rule, line])).toEqual(
				expect.arrayContaining([
					["ai-tells.VerbTricolon", firstRuleLine],
					["ai-tells.DefensiveHedges", firstRuleLine + 1],
				]),
			);
		},
	);

	it("keeps Properties available to spelling and structural views, but exempts grammar", async () => {
		const text = `${source("Item")}You is ready to recieve the tattoo.  \n`;
		const ctx = await context(text);
		const page = ctx.pages[0]!;
		for (const view of [bodyLines(page).join("\n"), proseView(page).text, lintText(page).text]) {
			for (const sentence of rules) expect(view).toContain(sentence);
			expect(view).toContain("You is ready to recieve the tattoo.  ");
		}
		const line = text.split("\n").length - 1;
		const spelling = await spellingLayer.run(ctx);
		expect(spelling).toEqual(expect.arrayContaining([expect.objectContaining({ layer: "spelling", line })]));
		const grammar = await grammarLayer.run(ctx);
		expect(grammar).toEqual([]);
		expect(await styleLayerWith(valeSubprocess()).run(ctx)).toEqual([]);
	});

	it("lets two Item pages share verbatim Properties rules without boilerplate findings", async () => {
		const text = source("Item");
		const ctx = await context(text, { "Twin.md": text });
		expect(await boilerplateLayer.run(ctx)).toEqual([]);
	});

	it("exempts the published tool's LongSentences and cantrip wording from grammar and repetition checks", async () => {
		const text = source("Item", "## Properties", toolRules);
		const ctx = await context(text, { "Twin.md": text });
		expect(await grammarLayer.run(ctx)).toEqual([]);
		expect(await boilerplateLayer.run(ctx)).toEqual([]);
	});

	it.each([
		{ type: "Item", heading: "## In use" },
		{ type: "Spell", heading: "## Properties" },
		{ type: "Spell", heading: "### Effect" },
		{ type: "NPC", heading: "## Properties" },
		{ type: "House Rule", heading: "## Properties" },
		{ type: "Item", heading: "### Properties" },
		{ type: "Item", heading: "#### Properties" },
	])("keeps grammar and shared-line checks on $type $heading", async ({ type, heading }) => {
		const text = source(type, heading, toolRules);
		const ctx = await context(text, { "Twin.md": text });
		const grammar = await grammarLayer.run(ctx);
		expect(grammar.map(({ rule, line }) => [rule, line])).toEqual(
			expect.arrayContaining([
				["LongSentences", 7],
				["SplitWords", 8],
			]),
		);
		const shared = await boilerplateLayer.run(ctx);
		expect(shared.map(({ path, line }) => [path, line])).toEqual([
			["wiki/Target.md", 7],
			["wiki/Target.md", 8],
			["wiki/Twin.md", 7],
			["wiki/Twin.md", 8],
		]);
		expect(shared.every(({ rule }) => rule === "shared-line")).toBe(true);
	});

	it.each(["## In use", "## At a glance", "# Other"])(
		"resumes grammar and repetition checks at %s with source positions intact",
		async (heading) => {
			const lines = [
				...source("Item", "## Properties", toolRules).split("\n"),
				"### More rules",
				"",
				...toolRules,
				"",
				heading,
				"",
				...toolRules,
				"",
			];
			const text = lines.join("\n");
			const ctx = await context(text, { "Twin.md": text });
			const firstRuleLine = lines.indexOf(heading) + 3;
			const grammar = await grammarLayer.run(ctx);
			expect(grammar.every(({ line }) => line >= firstRuleLine)).toBe(true);
			expect(grammar.map(({ rule, line }) => [rule, line])).toEqual(
				expect.arrayContaining([
					["LongSentences", firstRuleLine],
					["SplitWords", firstRuleLine + 1],
				]),
			);
			const shared = await boilerplateLayer.run(ctx);
			expect(shared.map(({ path, line }) => [path, line])).toEqual([
				["wiki/Target.md", firstRuleLine],
				["wiki/Target.md", firstRuleLine + 1],
				["wiki/Twin.md", firstRuleLine],
				["wiki/Twin.md", firstRuleLine + 1],
			]);
		},
	);

	it("does not compare exempt Properties against a non-exempt page", async () => {
		const ctx = await context(source("Item"), { "Twin.md": source("NPC") });
		expect(await boilerplateLayer.run(ctx)).toEqual([]);
	});

	it("reports exactly one shared-line finding per page for a line containing several shared sentences", async () => {
		const text = source("NPC", "## In use", [toolRules[0]!]);
		const ctx = await context(text, { "Twin.md": text });
		const shared = await boilerplateLayer.run(ctx);
		expect(shared.map(({ path, rule, line }) => [path, rule, line])).toEqual([
			["wiki/Target.md", "shared-line", 7],
			["wiki/Twin.md", "shared-line", 7],
		]);
	});
});
