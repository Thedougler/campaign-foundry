import { describe, expect, it } from "vitest";
import { foundryId } from "../../src/push/ids.ts";

describe("foundryId", () => {
	it("is a 16-character alphanumeric Foundry ID", () => {
		expect(foundryId("Lowtide", "Creatures/Mire Drowner.md")).toMatch(/^[A-Za-z0-9]{16}$/);
	});

	it("is stable: the same World, page and role always give the same ID", () => {
		// Pinned literal: changing the scheme would orphan every document already imported into a Foundry world.
		expect(foundryId("Lowtide", "Creatures/Mire Drowner.md")).toBe("M66bnKCk8BqAsDtI");
	});

	it("differs by World, page path and role", () => {
		const base = foundryId("Lowtide", "NPCs/Sable.md");
		expect(foundryId("Aldermoor", "NPCs/Sable.md")).not.toBe(base);
		expect(foundryId("Lowtide", "NPCs/Nib Ashwater.md")).not.toBe(base);
		expect(foundryId("Lowtide", "NPCs/Sable.md", "actor")).not.toBe(base);
	});
});
