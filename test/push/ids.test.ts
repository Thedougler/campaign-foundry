import { describe, expect, it } from "vitest";
import { foundryId } from "../../src/push/ids.ts";

describe("foundryId", () => {
	it("is a 16-character alphanumeric Foundry ID", () => {
		expect(foundryId("salt-and-lantern", "Creatures/Mire Drowner.md")).toMatch(/^[A-Za-z0-9]{16}$/);
	});

	it("is stable: the same Campaign folder, page and role always give the same ID", () => {
		// Pinned literal: changing the scheme would orphan every document already imported into a Foundry world.
		expect(foundryId("salt-and-lantern", "Creatures/Mire Drowner.md")).toBe("cywjeYclfDxLbdCU");
	});

	it("differs by Campaign folder, page path and role", () => {
		const base = foundryId("salt-and-lantern", "NPCs/Sable.md");
		expect(foundryId("ashes-of-the-crown", "NPCs/Sable.md")).not.toBe(base);
		expect(foundryId("salt-and-lantern", "NPCs/Nib Ashwater.md")).not.toBe(base);
		expect(foundryId("salt-and-lantern", "NPCs/Sable.md", "actor")).not.toBe(base);
	});
});
