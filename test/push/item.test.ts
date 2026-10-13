import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildItem } from "../../src/push/item.ts";
import type { RenderContext } from "../../src/push/markdown.ts";
import { parsePage } from "../../src/vault/parse.ts";

const vault = join(import.meta.dirname, "../fixtures/vault/salt-and-lantern");
const ctx: RenderContext = { target: () => undefined, image: () => undefined };
const load = (name: string): ReturnType<typeof buildItem> => {
	const path = `Items/${name}.md`;
	return buildItem(parsePage(path, readFileSync(join(vault, path), "utf8")), {
		campaign: "salt-and-lantern",
		render: ctx,
	});
};

describe("buildItem", () => {
	it.each([
		"*Wondrous Item (Tattoo), Very Rare (Requires Attunement)*",
		"*Wondrous Item (Tattoo), Very Rare (Requires Attunement).*",
	])("reads a Very Rare attuned tattoo from the Properties classification %s", (line) => {
		const page = parsePage("Items/tattoo.md", `## Properties\n\n${line}`);
		expect(buildItem(page, { campaign: "salt-and-lantern", render: ctx }).data).toMatchObject({
			type: "equipment",
			system: { type: { value: "wondrous" }, rarity: "veryRare", attunement: "required" },
		});
	});

	it.each(["*Weapon (Longsword), Rare*", "_weapon (Longsword), rArE._", "Weapon (Longsword), Rare."])(
		"reads weapon rarity without attunement from %s",
		(line) => {
			const page = parsePage("Items/sword.md", `## Properties\n\n${line}`);
			expect(buildItem(page, { campaign: "salt-and-lantern", render: ctx }).data).toMatchObject({
				type: "weapon",
				system: { rarity: "rare", attunement: "" },
			});
		},
	);

	it.each([
		"## Properties\n\n## In use\n\n*Weapon (Longsword), Rare (Requires Attunement)*",
		"## In use\n\n*Weapon (Longsword), Rare (Requires Attunement)*",
		"## Properties\n\nA brass key opens one lock.",
	])("makes an unclassified page loot without falling back to legacy bullets (%s)", (body) => {
		const page = parsePage(
			"Items/key.md",
			`${body}\n\n## At a glance\n\n- **Kind.** Weapon.\n- **Rarity.** Legendary.\n- **Attunement.** Required.`,
		);
		const { data } = buildItem(page, { campaign: "salt-and-lantern", render: ctx });
		expect(data).toMatchObject({ type: "loot", system: { type: { value: "" }, rarity: "" } });
		expect(data.system).not.toHaveProperty("attunement");
	});

	it("reads only the first Properties paragraph, not later rules text", () => {
		const page = parsePage(
			"Items/sword.md",
			"## Properties\n\n*Weapon (Longsword), Rare*\n\nThis very rare technique requires attunement.",
		);
		expect(buildItem(page, { campaign: "salt-and-lantern", render: ctx }).data).toMatchObject({
			type: "weapon",
			system: { rarity: "rare", attunement: "" },
		});
	});

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

	it("keeps each DM-only section out while retaining property subheadings and the entry", () => {
		const page = parsePage(
			"Items/key.md",
			`> [!narration] First look
> The key shines.

## Properties

*Mundane Gear.*

### Turning the key

The door opens.

## Rulings

Only the DM knows this ruling.

## History

### Previous owner

Only the DM knows this history.

## Hidden truths

Only the DM knows this secret.

## Links

Linked from elsewhere.
`,
		);
		const { data } = buildItem(page, { campaign: "salt-and-lantern", render: ctx });
		const html = (data.system as { description: { value: string } }).description.value;
		expect(html).toContain("The key shines.");
		expect(html).toContain("Turning the key");
		expect(html).toContain("The door opens.");
		expect(html).not.toContain("Only the DM knows");
		expect(html).not.toContain("Previous owner");
	});

	it("makes a notable mundane object loot", () => {
		const ledger = load("Harbormaster's Ledger of Vessen").data as Record<string, any>;
		expect(ledger.type).toBe("loot");
		expect(ledger.system.rarity).toBe("");
		expect(ledger.system.description.value).toContain("210 pages");
	});
});
