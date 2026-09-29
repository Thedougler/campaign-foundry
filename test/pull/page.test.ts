import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { DdbCharacter } from "../../src/pull/ddb.ts";
import { rewritePcPage } from "../../src/pull/page.ts";
import { computeSheet } from "../../src/pull/sheet.ts";

const fixtures = join(import.meta.dirname, "fixtures");
const character = (name: string): DdbCharacter => (JSON.parse(readFileSync(join(fixtures, name), "utf8")) as { data: DdbCharacter }).data;
const pcPath = (name: string): string => join(fixtures, "vault/wiki/Aldermoor/Campaigns/Ashes of the Crown/PCs", `${name}.md`);
const page = (name: string): string => readFileSync(pcPath(name), "utf8");
const from = (source: string, heading: string): string => source.slice(source.indexOf(heading));
const before = (source: string, heading: string): string => source.slice(0, source.indexOf(heading));

describe("rewritePcPage", () => {
	const original = page("Wren");
	const sheet = computeSheet(character("character-sorcerer.json"));
	const result = rewritePcPage(original, "Aldermoor/Campaigns/Ashes of the Crown/PCs/Wren.md", sheet);

	it("replaces the Sheet, Spells and Inventory sections with the pulled sheet", () => {
		expect(result.sections).toEqual(["Sheet", "Spells", "Inventory"]);
		const updated = result.source;
		expect(updated).toContain("- **Class, species and level.** Level 9 Halfling Sorcerer (Wild Magic Sorcery). Proficiency bonus +4.");
		expect(updated).toContain("- **Armor Class, Hit Points and Speed.** AC 13 (unarmored). 65 HP. Speed 30 ft., fly 30 ft.\n");
		expect(updated).toContain("- **Passive Perception and save DC.** Passive Perception 14. Spell save DC 18 (Sorcerer, Cha).");
		expect(updated).toContain("| 8 (-1) | 14 (+2) | 16 (+3) | 8 (-1) | 10 (+0) | 19 (+4) |");
		expect(updated).toContain("- **Spell slots.** 1st 4, 2nd 3, 3rd 3, 4th 3, 5th 1.");
		expect(updated).toContain("### Cantrips");
		expect(updated).toContain("- **Coin.** 9896 gp, 9 sp, 4 cp.");
		expect(updated).toContain("- Cloak of Protection (uncommon, attuned)");
		expect(updated).not.toContain("- **Class, species and level.** Text.");
	});

	it("keeps the Player line the DM wrote", () => {
		expect(result.source).toContain("- **Player.** Sam\n");
	});

	it("leaves the story side byte-identical", () => {
		expect(from(result.source, "## Story")).toBe(from(original, "## Story"));
	});

	it("leaves the frontmatter as written except a blank summary, which it fills", () => {
		expect(before(result.source, "---\n\n## Sheet")).toBe(before(original, "---\n\n## Sheet").replace('summary: ""', 'summary: "Halfling Sorcerer 9."'));
		expect(result.summarySet).toBe(true);
	});

	it("does not overwrite a summary the DM wrote", () => {
		const vale = page("Vale");
		const out = rewritePcPage(vale, "Aldermoor/Campaigns/Ashes of the Crown/PCs/Vale.md", computeSheet(character("character-rogue.json")));
		expect(out.summarySet).toBe(false);
		expect(out.source).toContain("summary: \"The crew's quiet knife.\"");
	});

	it("is idempotent: pulling the same payload again changes nothing", () => {
		const again = rewritePcPage(result.source, "Aldermoor/Campaigns/Ashes of the Crown/PCs/Wren.md", sheet);
		expect(again.source).toBe(result.source);
		expect(again.sections).toEqual([]);
		expect(again.summarySet).toBe(false);
	});

	it("names the missing section when the page is not a PC page", () => {
		const broken = original.replace("## Inventory", "## Backpack");
		expect(() => rewritePcPage(broken, "Wren.md", sheet)).toThrow(/Inventory/);
	});
});
