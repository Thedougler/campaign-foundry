import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { parsePage } from "../../src/vault/parse.ts";
import { cf, copyFixture, vaultFlags } from "./helpers.ts";

/** Writes one page with the given frontmatter into a copied fixture. */
async function addPage(dir: string, rel: string, frontmatter: string): Promise<void> {
	const path = join(dir, "wiki", rel);
	await mkdir(dirname(path), { recursive: true });
	await writeFile(path, `---\n${frontmatter}---\n\nText.\n`);
}

describe("cf find", () => {
	it("resolves a name by its filename stem, case-insensitively", async () => {
		const dir = await copyFixture("clean");
		const { code, stdout } = await cf(["find", "mara voss", ...vaultFlags(dir)], dir);
		expect(code).toBe(0);
		expect(stdout).toContain("ashes-of-the-crown/NPCs/Mara Voss.md");
		expect(stdout).toContain("kind: NPC");
		expect(stdout).toContain("revealed: unset");
	});

	it("resolves a page through its aliases, exactly or by prefix", async () => {
		const dir = await copyFixture("clean");
		await addPage(
			dir,
			"ashes-of-the-crown/NPCs/Nona Black-Jaw.md",
			'type: NPC\nsummary: "Rattkin matriarch."\naliases:\n  - "Nona"\n  - "The Calveno Candle"\nrevealed: "Backstory"\n',
		);
		const byAlias = await cf(["find", "The Calveno Candle", ...vaultFlags(dir)], dir);
		expect(byAlias.code).toBe(0);
		expect(byAlias.stdout).toContain("ashes-of-the-crown/NPCs/Nona Black-Jaw.md");
		expect(byAlias.stdout).toContain("aliases: Nona, The Calveno Candle");
		expect(byAlias.stdout).toContain("revealed: Backstory");
		const byPrefix = await cf(["find", "the cal", ...vaultFlags(dir)], dir);
		expect(byPrefix.stdout).toContain("NPCs/Nona Black-Jaw.md");
	});

	it("prints one block when a stem and an alias name the same page", async () => {
		const dir = await copyFixture("clean");
		await addPage(
			dir,
			"ashes-of-the-crown/NPCs/Nona Black-Jaw.md",
			'type: NPC\nsummary: "Rattkin matriarch."\naliases:\n  - "Nona"\n',
		);
		const { code, stdout } = await cf(["find", "nona", ...vaultFlags(dir)], dir);
		expect(code).toBe(0);
		expect(stdout).toContain("nona  1 page");
		expect(stdout.match(/Nona Black-Jaw\.md/g)).toHaveLength(1);
	});

	it("matches the frontmatter `title` where it differs from the stem", async () => {
		const dir = await copyFixture("clean");
		await addPage(
			dir,
			"ashes-of-the-crown/Creatures/Geoffrey Draves (Creature).md",
			'type: Creature\nsummary: "The Commodore himself."\ntitle: "The Commodore"\nrevealed: "Session 1"\n',
		);
		const { code, stdout } = await cf(["find", "the commodore", ...vaultFlags(dir)], dir);
		expect(code).toBe(0);
		expect(stdout).toContain("ashes-of-the-crown/Creatures/Geoffrey Draves (Creature).md");
		expect(stdout).toContain("revealed: Session 1");
	});

	it("prints every match and says so when several pages answer", async () => {
		const dir = await copyFixture("clean");
		const { code, stdout } = await cf(["find", "the", ...vaultFlags(dir)], dir);
		expect(code).toBe(0);
		expect(stdout).toContain("ashes-of-the-crown/Threads/The Cold Hearth.md");
		expect(stdout).toContain("ashes-of-the-crown/Locations/The Sunken Chapel.md");
		expect(stdout).toContain("the  2 pages");
	});

	it("suggests the closest real name when nothing matches", async () => {
		const dir = await copyFixture("clean");
		const { code, stderr } = await cf(["find", "Marra Voss", ...vaultFlags(dir)], dir);
		expect(code).toBe(2);
		expect(stderr).toContain("No page answering to `Marra Voss`");
		expect(stderr).toContain("Did you mean `Mara Voss`?");
	});

	it("still prints the other names' matches when one of several misses", async () => {
		const dir = await copyFixture("clean");
		const { code, stdout, stderr } = await cf(["find", "Ravenhold", "Marra Voss", ...vaultFlags(dir)], dir);
		expect(code).toBe(2);
		expect(stdout).toContain("Ravenhold  1 page");
		expect(stdout).toContain("ashes-of-the-crown/Locations/Ravenhold.md");
		expect(stderr).toContain("Marra Voss");
	});

	it("refuses an empty name", async () => {
		const dir = await copyFixture("clean");
		const { code, stderr } = await cf(["find", "", ...vaultFlags(dir)], dir);
		expect(code).toBe(2);
		expect(stderr).toContain("No name given.");
	});

	it("documents itself in --help, with examples", async () => {
		const { code, stdout } = await cf(["find", "--help"]);
		expect(code).toBe(0);
		for (const option of ["--vault", "--root"]) expect(stdout).toContain(option);
		expect(stdout).toContain("Examples:");
		expect(stdout).toContain("Exit codes:");
		expect(stdout).toMatch(/^ {2}cf find ".+"/m);
	});
});

describe("cf revealed", () => {
	it("lists settled pages first, then the unset ones", async () => {
		const dir = await copyFixture("clean");
		const { code, stdout } = await cf(["revealed", ...vaultFlags(dir)], dir);
		expect(code).toBe(0);
		const lines = stdout.trimEnd().split("\n");
		expect(lines[0]).toBe("ashes-of-the-crown/PCs/Tam Brightwater.md  Backstory");
		const firstUnset = lines.findIndex((l) => l.endsWith("  unset"));
		expect(firstUnset).toBeGreaterThan(0);
		expect(lines).toContain("ashes-of-the-crown/NPCs/Mara Voss.md  unset");
		for (const line of lines.slice(firstUnset)) expect(line.endsWith("  unset")).toBe(true);
	});

	it("scopes to one Campaign folder with --campaign", async () => {
		const dir = await copyFixture("clean");
		await addPage(dir, "ironvale/Ironvale.md", 'type: Campaign\nsummary: "Another table."\nsources: []\nrevealed: "Session 1"\n');
		const all = await cf(["revealed", ...vaultFlags(dir)], dir);
		expect(all.code).toBe(0);
		expect(all.stdout).toContain("ironvale/Ironvale.md  Session 1");
		const scoped = await cf(["revealed", "--campaign", "Ashes of the Crown", ...vaultFlags(dir)], dir);
		expect(scoped.code).toBe(0);
		for (const line of scoped.stdout.trimEnd().split("\n")) expect(line.startsWith("ashes-of-the-crown/")).toBe(true);
		expect(scoped.stdout).toContain("PCs/Tam Brightwater.md  Backstory");
	});

	it("rejects an unknown --campaign with a suggestion", async () => {
		const dir = await copyFixture("clean");
		const { code, stderr } = await cf(["revealed", "--campaign", "Ashes of teh Crown", ...vaultFlags(dir)], dir);
		expect(code).toBe(2);
		expect(stderr).toContain("No Campaign `Ashes of teh Crown`");
		expect(stderr).toContain("Did you mean `Ashes of the Crown`?");
	});

	it("documents itself in --help, with examples", async () => {
		const { code, stdout } = await cf(["revealed", "--help"]);
		expect(code).toBe(0);
		for (const option of ["--campaign", "--vault", "--root"]) expect(stdout).toContain(option);
		expect(stdout).toContain("Examples:");
		expect(stdout).toContain("Exit codes:");
		expect(stdout).toMatch(/^ {2}cf revealed --campaign ".+"/m);
	});
});

describe("page display identity", () => {
	it("uses the title for display while retaining title, aliases and slug lookup", () => {
		const page = parsePage("NPCs/stable-id.md", '---\ntitle: "Mara / Harbour Captain"\naliases: ["Old Captain"]\n---\n');
		expect(page.name).toBe("Mara / Harbour Captain");
		expect(page.names).toEqual(["Mara / Harbour Captain", "Old Captain", "stable-id"]);
	});

	it("uses the first alias, never the filename, when no title is set", () => {
		const page = parsePage("NPCs/stable-id.md", '---\ntitle: ""\naliases: ["The Captain", "Mara"]\n---\n');
		expect(page.name).toBe("The Captain");
		expect(page.names).toEqual(["The Captain", "Mara", "stable-id"]);
	});

	it("leaves display unset rather than turning a slug into a name", () => {
		const page = parsePage("NPCs/stable-id.md", "---\ntitle: \"\"\n---\n");
		expect(page.name).toBe("");
		expect(page.names).toEqual(["stable-id"]);
	});
});
