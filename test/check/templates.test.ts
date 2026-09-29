import { describe, expect, it } from "vitest";
import { loadTemplates } from "../../src/vault/vault.ts";
import { realTemplates } from "./helpers.ts";

describe("the real templates", () => {
	it("each carry the type and kind their file name promises, plus summary and sources", async () => {
		const set = await loadTemplates(realTemplates);
		expect(set.byName.size).toBeGreaterThanOrEqual(25);
		for (const t of set.byName.values()) {
			const fm = t.page.frontmatter ?? {};
			expect(fm.type, t.name).toBe(t.type);
			if (t.kind) expect(fm.kind, t.name).toBe(t.kind);
			else expect("kind" in fm, t.name).toBe(false);
			expect(t.keys.map((k) => k.key), t.name).toEqual(expect.arrayContaining(["summary", "sources"]));
		}
	});

	it("derive valid kinds per type from the file names", async () => {
		const set = await loadTemplates(realTemplates);
		expect(set.types.get("Location")).toEqual(["Region", "Settlement", "Site"]);
		expect(set.types.get("Scene")?.sort()).toEqual(["Cliffhanger", "Climax", "Development", "Hook", "Resolution"]);
		expect(set.types.get("NPC")).toEqual([]);
		expect(set.types.has("hot") && set.types.has("DM Settings")).toBe(true);
	});

	it("read required sections in template order, ignoring ### and code-fenced # lines", async () => {
		const set = await loadTemplates(realTemplates);
		expect(set.byName.get("Creature")?.sections).toEqual(["At a glance", "Statblock", "Play", "Depth", "Links"]);
		expect(set.byName.get("Scene - Climax")?.sections).toEqual(["At a glance", "Threads", "Play", "Outcomes", "Depth"]);
		expect(set.byName.get("Location - Site")?.callouts).toEqual(["narration"]);
		expect(set.byName.get("hot")?.callouts).toEqual([]);
	});
});
