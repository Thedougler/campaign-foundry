import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { DdbCharacter } from "../../src/pull/ddb.ts";
import { rewritePcPage } from "../../src/pull/page.ts";
import { computeSheet } from "../../src/pull/sheet.ts";

const fixtures = join(import.meta.dirname, "fixtures");
const character = (name: string): DdbCharacter =>
	(JSON.parse(readFileSync(join(fixtures, name), "utf8")) as { data: DdbCharacter }).data;
const pcPath = (name: string): string => join(fixtures, "vault/wiki/ashes-of-the-crown/PCs", `${name}.md`);
const page = (name: string): string => readFileSync(pcPath(name), "utf8");
const from = (source: string, heading: string): string => source.slice(source.indexOf(heading));
const before = (source: string, heading: string): string => source.slice(0, source.indexOf(heading));

describe("rewritePcPage", () => {
	const original = page("Wren");
	const sheet = computeSheet(character("character-sorcerer.json"));
	const result = rewritePcPage(original, "ashes-of-the-crown/PCs/Wren.md", sheet);

	it("replaces the Sheet, Spells and Inventory sections with the pulled sheet", () => {
		expect(result.sections).toEqual(["Sheet", "Spells", "Inventory"]);
		const updated = result.source;
		expect(updated).toContain("- **Class, species and level.** Sorcerer 9 (Wild Magic Sorcery), Halfling");
		expect(updated).toContain(
			'```statblock\nlayout: Basic 5e Layout\nname: "Wren"\nsize: Small\ntype: humanoid\nsubtype: "Halfling"\nac: 13\nhp: 65\nhit_dice: "9d6 + 27"\nspeed: "30 ft., fly 30 ft."\nstats: [8, 14, 16, 8, 10, 19]\nmodifier: 2\n',
		);
		expect(updated).toContain('skillsaves:\n  - perception: 4\nsenses: "passive Perception 14"');
		expect(updated).toContain(
			'  - name: "Spellcasting"\n    desc: "Sorcerer: Cha spellcasting (spell save DC 18, +9 to hit with spell attacks)."',
		);
		expect(updated).not.toContain("**Armor Class, Hit Points and Speed.**");
		expect(updated).not.toContain("**Passive Perception and save DC.**");
		expect(updated).not.toContain("**Saving throws.**");
		expect(updated).not.toContain("| Str |");
		expect(updated).not.toMatch(/^cr:/m);
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
		expect(before(result.source, "---\n\n## Sheet")).toBe(
			before(original, "---\n\n## Sheet").replace('summary: ""', 'summary: "Halfling Sorcerer 9."'),
		);
		expect(result.summarySet).toBe(true);
	});

	it("does not overwrite a summary the DM wrote", () => {
		const vale = page("Vale");
		const out = rewritePcPage(vale, "ashes-of-the-crown/PCs/Vale.md", computeSheet(character("character-rogue.json")));
		expect(out.summarySet).toBe(false);
		expect(out.source).toContain('summary: "The crew\'s quiet knife."');
		expect(out.source).toContain('name: "Vale"');
		expect(out.source).toContain('name: "Sneak Attack (3d6)"');
		expect(out.source).toContain("*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 8 (1d6 + 5) Piercing damage.");
		expect(out.source).toContain(
			"*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 20/60 ft. *Hit:* 6 (1d4 + 4) Piercing damage.",
		);
		expect(out.source).toContain("*Ranged Attack Roll:* +7, range 80/320 ft. *Hit:* 7 (1d6 + 4) Piercing damage.");
	});

	it("is idempotent: pulling the same payload again changes nothing", () => {
		const again = rewritePcPage(result.source, "ashes-of-the-crown/PCs/Wren.md", sheet);
		expect(again.source).toBe(result.source);
		expect(again.sections).toEqual([]);
		expect(again.summarySet).toBe(false);
	});

	it("names the missing section when the page is not a PC page", () => {
		const broken = original.replace("## Inventory", "## Backpack");
		expect(() => rewritePcPage(broken, "Wren.md", sheet)).toThrow(/Inventory/);
	});
});
