import { describe, expect, it } from "vitest";
import { layers } from "../../src/check/layers/index.ts";

describe("the gate's layer registry", () => {
	it("runs exactly the known layers, in order", () => {
		// A layer dropped from this array stops checking the Wiki while the gate still reports "ok".
		expect(layers.map((layer) => layer.name)).toEqual([
			"template",
			"placement",
			"links",
			"orphans",
			"statblock",
			"index",
			"hot",
			"log",
			"markdownlint",
			"remark-lint",
			"spelling",
			"grammar",
			"narration",
			"style",
			"boilerplate",
		]);
	});
});
