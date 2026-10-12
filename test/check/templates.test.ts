import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
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
			expect(
				t.keys.map((k) => k.key),
				t.name,
			).toEqual(expect.arrayContaining(["summary", "sources"]));
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

describe("loadTemplates: one template per (type, kind)", () => {
	const load = async (files: Record<string, string>): Promise<Error | undefined> => {
		const dir = await mkdtemp(join(tmpdir(), "cf-templates-"));
		await Promise.all(Object.entries(files).map(([file, source]) => writeFile(join(dir, file), source)));
		return loadTemplates(dir).then(
			() => undefined,
			(error: unknown) => error as Error,
		);
	};

	it("throws naming both files when two kindless templates claim the same type", async () => {
		const source = "---\ntype: Creature\n---\n";
		const error = await load({ "creature.md": source, "beast.md": source });
		expect(error).toBeInstanceOf(Error);
		expect(error?.message).toContain("creature.md");
		expect(error?.message).toContain("beast.md");
	});

	it("throws for a kinded clash too, naming the kind and both files", async () => {
		const source = "---\ntype: Creature\nkind: Fast\n---\n";
		const error = await load({ "creature-fast.md": source, "creature-swift.md": source });
		expect(error).toBeInstanceOf(Error);
		expect(error?.message).toContain("kind `Fast`");
		expect(error?.message).toContain("creature-fast.md");
		expect(error?.message).toContain("creature-swift.md");
	});
});
