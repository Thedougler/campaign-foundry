import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildItem } from "../../src/push/item.ts";
import type { RenderContext } from "../../src/push/markdown.ts";
import { parsePage } from "../../src/vault/parse.ts";

const vault = join(import.meta.dirname, "../fixtures/vault/Lowtide");
const ctx: RenderContext = { target: () => undefined, image: () => undefined };
const load = (name: string): ReturnType<typeof buildItem> => {
	const path = `Items/${name}.md`;
	return buildItem(parsePage(path, readFileSync(join(vault, path), "utf8")), { world: "Lowtide", render: ctx });
};

describe("buildItem", () => {
	it("makes a wondrous magic item an equipment Item with its rarity and no attunement", () => {
		const lantern = load("Ebb Lantern").data as Record<string, any>;
		expect(lantern.type).toBe("equipment");
		expect(lantern.name).toBe("Ebb Lantern");
		expect(lantern._id).toMatch(/^[A-Za-z0-9]{16}$/);
		expect(lantern.system.type.value).toBe("wondrous");
		expect(lantern.system.rarity).toBe("uncommon");
		expect(lantern.system.attunement).toBe("");
	});

	it("carries the full rules text as the description, and keeps the hidden truths out of it", () => {
		const html = (load("Ebb Lantern").data as Record<string, any>).system.description.value as string;
		expect(html).toContain("Bright Light in a 30-foot radius");
		expect(html).toContain("expend 1 charge");
		expect(html).toContain("The lantern is brass"); // the narration callout
		expect(html).not.toContain("made with water taken from the Long Ebb");
	});

	it("makes a notable mundane object loot", () => {
		const ledger = load("Harbormaster's Ledger of Vessen").data as Record<string, any>;
		expect(ledger.type).toBe("loot");
		expect(ledger.system.rarity).toBe("");
		expect(ledger.system.description.value).toContain("210 pages");
	});
});
