import { beforeAll, describe, expect, it } from "vitest";
import { checkFixture, findingsFor, type JsonFinding, type JsonReport } from "../check/helpers.ts";

const C = "ember-vale";
const SCENE = `${C}/Sessions/Session 3/Session 3 - The Tollhouse Ledger`;
const LAYERS = ["narration", "style"] as const;
type Layer = (typeof LAYERS)[number];

const reports = {} as Record<Layer, JsonReport>;

beforeAll(async () => {
	await Promise.all(
		LAYERS.map(async (layer) => {
			reports[layer] = (await checkFixture("exemplar", ["--layer", layer])).report;
		}),
	);
}, 60000);

const on = (layer: Layer, page: string): JsonFinding[] => findingsFor(reports[layer], `${C}/${page}.md`);

describe("exemplar regression fixture (ADR 0029)", () => {
	it("holds the exemplar Scene to zero findings in both layers", () => {
		expect(on("narration", SCENE)).toEqual([]);
		expect(on("style", SCENE)).toEqual([]);
	});

	it("keeps the exemplar camera legal: the anaphora page carries no fresh-starts or You-token finding", () => {
		const rules = on("narration", SCENE).map((f) => f.rule);
		expect(rules).not.toContain("fresh-starts");
		const styleRules = on("style", SCENE).map((f) => f.rule);
		expect(styleRules).not.toContain("Narration.FilterVerbs");
		expect(styleRules).not.toContain("Narration.PerceptionHedges");
		expect(styleRules).not.toContain("Narration.NoCompass");
		expect(styleRules).not.toContain("Narration.NoFootMileCounts");
	});

	it("gates a Cue as Narration: the decision and the emotion belong to the player", () => {
		const found = on("style", "NPCs/Probe Interior").filter((f) => f.rule === "Narration.PcInterior");
		expect(found.length).toBeGreaterThan(0);
		expect(found.every((f) => f.message.includes("the decision and the emotion belong to the player"))).toBe(true);
		expect(found.every((f) => f.hint.includes("theatre-of-the-mind") && f.hint.includes("Hard line 1"))).toBe(true);
	});

	it("keeps a Cue a table beat: four sentences trip cue-length", () => {
		const found = on("narration", "NPCs/Probe Length").filter((f) => f.rule === "cue-length");
		expect(found.length).toBeGreaterThan(0);
		expect(found.every((f) => f.message.startsWith("Cue (line ") && f.message.endsWith("4 sentences, 40 words."))).toBe(true);
		expect(found.every((f) => f.hint.includes("Move the rest to a [!narration] callout or the DM notes"))).toBe(true);
	});
});
