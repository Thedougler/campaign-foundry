import { describe, expect, it, vi } from "vitest";
import { drawAliases } from "../../src/bench/alias.ts";

// Always select the first remaining name, so an unfiltered pool necessarily reuses a revealed alias.
vi.mock("node:crypto", () => ({ randomInt: () => 0 }));

describe("amendment aliases", () => {
	it("excludes the earlier run's revealed names before drawing", () => {
		const earlier = drawAliases(3);
		const amended = drawAliases(3, earlier);
		expect(amended).toHaveLength(3);
		expect(new Set(amended).size).toBe(3);
		for (const alias of amended) expect(earlier).not.toContain(alias);
	});
});
