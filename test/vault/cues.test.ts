import { describe, expect, it } from "vitest";
import { parsePage } from "../../src/vault/parse.ts";

describe("Cue triggers", () => {
	it.each([
		["plain result", "Success: ==One stone sits smoother than the rest.=="],
		["bold result", "- **Success.** ==One stone sits smoother than the rest.=="],
		["nested Checks result", ">   - **Success.** ==One stone sits smoother than the rest.=="],
	])("strips formatting from a %s", (_label, result) => {
		const page = parsePage(
			"Scenes/the-pantry.md",
			["> [!checks]", "> - **Hear through the half-truth.** Wisdom (Insight) DC 15.", result].join("\n"),
		);
		expect(page.cues).toEqual([{ line: 3, text: "One stone sits smoother than the rest.", trigger: "Success" }]);
	});
});
