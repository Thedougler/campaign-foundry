import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { parseStatblock } from "../../src/check/statblock/parse.ts";
import { creatureTitle, duplicateNames, parseBestiary, sortKeys, toStatblock } from "../../src/creatures/convert.ts";
import { creaturePage } from "../../src/creatures/page.ts";
import { parsePage } from "../../src/vault/parse.ts";

const books = new Map<string, string>();
const rendered = parse(readFileSync(join(import.meta.dirname, "fixtures/elder-brain-rendered.yaml"), "utf8")) as Record<
	string,
	unknown
>;

describe("toStatblock", () => {
	it("maps saves {intelligence: 10} to {int: 10} and skillsaves name/desc to {arcana: 10}", async () => {
		const block = await toStatblock({
			saves: [{ intelligence: 10 }],
			skillsaves: [{ name: "[Arcana](rules/skills.md#Arcana)", desc: "+10" }],
		});
		expect(block.saves).toEqual([{ int: 10 }]);
		expect(block.skillsaves).toEqual([{ arcana: 10 }]);
	});

	it("turns a spell link into italics, a condition link into text, and Recharge 5-6 into an en dash", async () => {
		const block = await toStatblock({
			traits: [
				{
					name: "Mind Blast (Recharge 5-6)",
					desc: "A [mind blank](c/spells/mind-blank-xphb.md) spell. The target is [grappled](rules/conditions.md#Grappled).",
				},
			],
		});
		expect(block.traits).toEqual([
			{
				name: "Mind Blast (Recharge 5–6)",
				desc: "A *mind blank* spell. The target is grappled.",
			},
		]);
	});

	it("strips inline HTML tags to their inner text", async () => {
		const block = await toStatblock({
			traits: [
				{
					name: "Regeneration",
					desc: 'The spirit regains 5 <span title="Player\'s Handbook (2024)">Hit Points</span> at the start of its turn.',
				},
			],
		});
		expect(block.traits).toEqual([
			{
				name: "Regeneration",
				desc: "The spirit regains 5 Hit Points at the start of its turn.",
			},
		]);
	});

	it("writes name before desc on feature entries", async () => {
		const block = await toStatblock({
			traits: [{ desc: "A trait.", name: "Alert" }],
		});
		expect(Object.keys((block.traits as object[])[0] as object)).toEqual(["name", "desc"]);
	});
});

describe("sortKeys", () => {
	it("parses fractional, null and object challenge ratings", () => {
		expect(sortKeys({ name: "A", source: "X", cr: "1/4" }, books).cr).toBe(0.25);
		expect(sortKeys({ name: "A", source: "X", cr: null }, books).cr).toBe("");
		expect(sortKeys({ name: "A", source: "X", cr: { cr: "10", lair: "11" } }, books).cr).toBe(10);
	});

	it("joins sizes with or and title-cases habitats, wrapping planar entries", () => {
		expect(sortKeys({ name: "A", source: "X", size: ["S", "M"] }, books).size).toBe("Small or Medium");
		expect(sortKeys({ name: "A", source: "X", environment: ["planar, abyss", "underdark"] }, books).habitat).toEqual([
			"Planar (Abyss)",
			"Underdark",
		]);
	});
});

describe("creature titles", () => {
	it("suffixes duplicate names with their source and leaves unique names alone", () => {
		const monsters = [
			{ name: "Medusa", source: "MOT" },
			{ name: "Medusa", source: "XMM" },
			{ name: "Goblin", source: "XMM" },
		];
		const duplicates = duplicateNames(monsters);
		expect(creatureTitle(monsters[0]!, duplicates)).toBe("Medusa (MOT)");
		expect(creatureTitle(monsters[1]!, duplicates)).toBe("Medusa (XMM)");
		expect(creatureTitle(monsters[2]!, duplicates)).toBe("Goblin");
	});
});

describe("creaturePage", () => {
	it("parses as a page whose only ## heading is Statblock, and the Elder Brain fence has no parse issues", async () => {
		const page = await creaturePage({
			title: "Elder Brain",
			sortKeys: sortKeys(
				{
					name: "Elder Brain",
					source: "MPMM",
					cr: "14",
					type: { type: "aberration" },
					size: ["L"],
					environment: ["underdark"],
				},
				new Map([["MPMM", "Mordenkainen Presents: Monsters of the Multiverse"]]),
			),
			statblock: await toStatblock(rendered),
			sources: ["archive/bestiary-sublist-data.json"],
		});
		const parsed = parsePage("Creatures/elder-brain.md", page);
		expect(parsed.headings.filter((heading) => heading.depth === 2).map((heading) => heading.text)).toEqual([
			"Statblock",
		]);
		const fence = /```statblock\n([\s\S]*?)```/.exec(page)?.[1] ?? "";
		expect(parseStatblock(fence).issues).toEqual([]);
	});
});

describe("parseBestiary", () => {
	it("rejects {} and a bare string", () => {
		expect(() => parseBestiary("{}")).toThrow(/Not a 5etools bestiary JSON/);
		expect(() => parseBestiary('"Medusa"')).toThrow(/Not a 5etools bestiary JSON/);
	});
});
