import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { cf, copyFixture, realTemplates, repoRoot } from "../check/helpers.ts";
import { parseItems } from "../../src/items/convert.ts";
import { parsePage } from "../../src/vault/parse.ts";
import { normaliseItemSpelling } from "../../src/items/spelling.ts";

describe("5e tool item export parser", () => {
	it("reads a single item without a leading document header and keeps its rules verbatim", () => {
		expect(
			parseItems(
				"#### Brass Key\n\nWondrous Item, Rare (Requires Attunement)\n\n---\n\nA brass key.\n\n***Unlock.*** Turn it once.\n",
			),
		).toEqual([
			{
				title: "Brass Key",
				classification: "Wondrous Item, Rare (Requires Attunement)",
				properties: "A brass key.\n\n***Unlock.*** Turn it once.",
			},
		]);
	});

	it.each([
		"Wondrous Item (Tattoo), Very Rare (Requires Attunement)",
		"Weapon (Longsword), Rare",
		"Generic Variant, Rare (Requires Attunement)",
		"Generic Variant, Rare",
	])("preserves classification %s", (classification) => {
		expect(parseItems(`#### Key\n\n${classification}\n\n---\n\nA key.\n`)[0]?.classification).toBe(classification);
	});

	it("reads attunement-free Generic Variants, metadata, tables and trailing variation lists under a leading header", () => {
		const rules =
			"A blade.\n\n##### Damage\n| Roll | Effect |\n| --- | --- |\n| 1 | Fire |\n\nMultiple variations of this item exist, as listed below:\n\n- *One*\n- *Two*";
		const items = parseItems(
			`# Items\n\n#### Keen Blade\n\nWeapon (Longsword), Rare\n\n1d8 Slashing\n\n---\n\n${rules}\n\n---\n\n#### Bright Armour\n\nGeneric Variant, Rare\n\n---\n\nWear it.\n\n---\n`,
		);
		expect(items).toEqual([
			{ title: "Keen Blade", classification: "Weapon (Longsword), Rare", properties: `1d8 Slashing\n\n${rules}` },
			{ title: "Bright Armour", classification: "Generic Variant, Rare", properties: "Wear it." },
		]);
	});

	it("keeps internal separators and ignores apparent item headings inside code fences", () => {
		expect(
			parseItems("#### Key\n\nWondrous Item, Rare\n\n---\n\nA key.\n\n---\n\n```md\n#### Not an item\n```\n\n---\n")[0]
				?.properties,
		).toBe("A key.\n\n---\n\n```md\n#### Not an item\n```");
	});

	it.each([
		"#### Key\n\n---\n\nA key.",
		"#### Key\n\nWondrous Item, Rare\n\nA key.",
		"#### Key\n\nWondrous Item, Rare\n\n---",
	])("refuses malformed item text without discarding it", (text) => {
		expect(() => parseItems(text)).toThrow(/Item/);
	});
});

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function fixture(): Promise<string> {
	const root = await mkdtemp(join(tmpdir(), "cf-items-"));
	roots.push(root);
	await mkdir(join(root, "wiki"));
	await mkdir(join(root, "raw"));
	await writeFile(join(root, "raw/keys.md"), "#### Brass Key\n\nWondrous Item, Rare\n\n---\n\nA brass key.\n");
	return root;
}

describe("convert-items CLI", () => {
	it("prints only created repo-relative paths for log --page - and omits skips, counts and dry-run plans", async () => {
		const root = await copyFixture("clean");
		roots.push(root);
		await mkdir(join(root, "archive"), { recursive: true });
		await writeFile(
			join(root, "archive/keys.md"),
			["Brass Key", "Copper Key", "Copper-Key"]
				.map((title) => `#### ${title}\n\nGeneric Variant, Rare\n\n---\n\nA key.\n\n---`)
				.join("\n\n"),
		);
		const args = ["convert-items", "archive/keys.md", "--root", root, "--templates", realTemplates, "--paths"];
		expect((await cf([...args, "--dry-run"], root)).stdout).toBe("");
		const converted = await cf(args, root);
		expect(converted.code, converted.stderr).toBe(0);
		expect(converted.stdout).toBe("wiki/Items/brass-key.md\nwiki/Items/copper-key.md\n");
		const logged = await cf(
			[
				"log",
				"--root",
				root,
				"--campaign",
				"Ashes of the Crown",
				"--op",
				"ingest",
				"--title",
				"Keys",
				"--page",
				"-",
				"--dry-run",
			],
			root,
			converted.stdout,
		);
		expect(logged.code, logged.stderr).toBe(0);
		expect(logged.stdout).toContain("[[brass-key|Brass Key]]");
		expect(logged.stdout).toContain("[[copper-key|Copper Key]]");
		expect((await cf(args, root)).stdout).toBe("");
		const help = await cf(["log", "--help"]);
		expect(help.stdout).toContain("repo-relative wiki/… path");
	});

	it("normalises exported heading and table layout while keeping escaped cell contents and variation lists", async () => {
		const root = await fixture();
		await mkdir(join(root, "archive"));
		const properties =
			"A key.\n\n##### Rolls\n| Roll | Effect |\n|:----:|-------:|\n| 1 | *A\\|B* |\n\nMultiple variations of this item exist:\n\n- *Brass*\n- *Copper*";
		await writeFile(join(root, "archive/keys.md"), `#### Brass Key\n\nGeneric Variant, Rare\n\n---\n\n${properties}\n`);
		const converted = await cf(
			["convert-items", "archive/keys.md", "--root", root, "--templates", realTemplates],
			root,
		);
		expect(converted.code, converted.stderr).toBe(0);
		const page = await readFile(join(root, "wiki/Items/brass-key.md"), "utf8");
		expect(page).toContain("### Rolls\n\n");
		expect(page).toContain("*A\\|B*");
		expect(page).toContain("Multiple variations of this item exist:\n\n- *Brass*\n- *Copper*");
		const checked = await cf(
			[
				"check",
				join(root, "wiki/Items"),
				"--root",
				root,
				"--templates",
				realTemplates,
				"--layer",
				"markdownlint",
				"--layer",
				"remark-lint",
			],
			root,
		);
		expect(checked.stdout).toContain("ok: 0 findings");
	});

	it("nests blockquoted export headings beneath Properties without changing the quoted rules", async () => {
		const root = await fixture();
		const raw = await readFile(join(repoRoot, "test/items/fixtures/blade-of-broken-mirrors-dormant.md"), "utf8");
		await mkdir(join(root, "archive"));
		await writeFile(join(root, "archive/blade.md"), raw);
		const converted = await cf(
			["convert-items", "archive/blade.md", "--root", root, "--templates", realTemplates],
			root,
		);
		expect(converted.code, converted.stderr).toBe(0);
		const page = await readFile(join(root, "wiki/Items/blade-of-broken-mirrors-dormant.md"), "utf8");
		expect(page).toContain("> ### Betrayer Artifact Properties\n");
		expect(page).toContain(raw.split("\n").find((line) => line.startsWith(">The Arms"))!);
		const checked = await cf(
			[
				"check",
				join(root, "wiki/Items"),
				"--root",
				root,
				"--templates",
				realTemplates,
				"--layer",
				"markdownlint",
				"--layer",
				"remark-lint",
			],
			root,
		);
		expect(checked.stdout).toContain("ok: 0 findings");
	});

	it("normalises corpus British-form gaps in paragraphs and tables without touching code", async () => {
		const root = await fixture();
		await mkdir(join(root, "archive"));
		await writeFile(
			join(root, "archive/keys.md"),
			"#### Brass Key\n\nGeneric Variant, Rare\n\n---\n\nTurn counterclockwise. Crisscrossed lines cover the key.\n\nskillfully Willful worshipers furor grayscale varicolored hematite\n\n| Roll | Effect |\n| --- | --- |\n| 1 | Eyelike fixtures glow. |\n| 2 | Rowboat rowboat |\n\n`counterclockwise crisscrossed Eyelike`\n",
		);
		const converted = await cf(
			["convert-items", "archive/keys.md", "--root", root, "--templates", realTemplates],
			root,
		);
		expect(converted.code, converted.stderr).toBe(0);
		const page = await readFile(join(root, "wiki/Items/brass-key.md"), "utf8");
		expect(page).toContain("Turn anticlockwise. Criss-crossed lines cover the key.");
		expect(page).toContain("Eye-like fixtures glow.");
		expect(page).toContain("skilfully Wilful worshippers furore greyscale varicoloured haematite");
		expect(page).toContain("Rowing boat rowing boat");
		expect(page).toContain("`counterclockwise crisscrossed Eyelike`");
		const checked = await cf(
			["check", join(root, "wiki/Items"), "--root", root, "--templates", realTemplates, "--layer", "spelling"],
			root,
		);
		expect(checked.stdout).toContain("ok: 0 findings");
	});

	it("removes inline HTML export tags while preserving their labels, Markdown, code and comments", async () => {
		const root = await fixture();
		const raw = await readFile(join(repoRoot, "test/items/fixtures/dwarven-thrower.md"), "utf8");
		await mkdir(join(root, "archive"));
		const literal = '`<a href="items.html">color</a>`\n\n<!-- exported <a> -->';
		await writeFile(join(root, "archive/thrower.md"), `${raw}\n\n${literal}\n`);
		const converted = await cf(
			["convert-items", "archive/thrower.md", "--root", root, "--templates", realTemplates],
			root,
		);
		expect(converted.code, converted.stderr).toBe(0);
		const page = await readFile(join(root, "wiki/Items/dwarven-thrower.md"), "utf8");
		expect(page).toContain(
			"*Weapon (*Warhammer*), Very Rare (Requires Attunement By a Dwarf or a Creature Attuned to a Belt of Dwarvenkind), Martial Weapon, Melee Weapon, 5 lb.*",
		);
		expect(page).not.toContain("onmouseover");
		expect(page).toContain(literal);
		const checked = await cf(
			[
				"check",
				join(root, "wiki/Items"),
				"--root",
				root,
				"--templates",
				realTemplates,
				"--layer",
				"markdownlint",
				"--layer",
				"remark-lint",
			],
			root,
		);
		expect(checked.stdout).toContain("ok: 0 findings");
	});

	it("previews pages without writing files or requiring an archive twin", async () => {
		const root = await fixture();
		const result = await cf(
			["convert-items", "raw/keys.md", "--root", root, "--templates", realTemplates, "--dry-run"],
			root,
		);
		expect(result.code, result.stderr).toBe(0);
		expect(result.stdout).toContain("would-create\twiki/Items/brass-key.md");
		expect(result.stdout).toContain("created: 0, skipped: 0, would-create: 1");
		expect(await readdir(join(root, "wiki"))).toEqual([]);
		expect(await readdir(root)).not.toContain("archive");
	});

	it("requires archive provenance before writing and prints the exact archive instruction", async () => {
		const root = await fixture();
		const result = await cf(["convert-items", "raw/keys.md", "--root", root, "--templates", realTemplates], root);
		expect(result.code).toBe(2);
		expect(result.stderr).toContain("mv raw/keys.md archive/keys.md");
		expect(await readdir(join(root, "wiki"))).toEqual([]);
	});

	it("writes a minimal page and skips existing slugs anywhere in the vault and destination, including input duplicates", async () => {
		const root = await fixture();
		await mkdir(join(root, "archive"));
		await writeFile(join(root, "archive/keys.md"), await readFile(join(root, "raw/keys.md")));
		const args = ["convert-items", "archive/keys.md", "--root", root, "--templates", realTemplates];
		expect((await cf(args, root)).stdout).toContain("created: 1, skipped: 0");
		const original = await readFile(join(root, "wiki/Items/brass-key.md"), "utf8");
		const page = parsePage("Items/brass-key.md", original);
		expect(page.frontmatter).toEqual({ title: "Brass Key", type: "Item", summary: "", sources: ["archive/keys.md"] });
		expect(page.headings.map(({ text }) => text)).toEqual(["Properties", "Links"]);
		const repeated = await cf(args, root);
		expect(repeated.stdout).toContain("skip\twiki/Items/brass-key.md");
		expect(repeated.stdout).toContain("created: 0, skipped: 1");
		expect(await readFile(join(root, "wiki/Items/brass-key.md"), "utf8")).toBe(original);
		const out = join(root, "other");
		await mkdir(out);
		await writeFile(join(out, "bright-key.md"), "keep destination");
		await mkdir(join(root, "wiki/NPCs"));
		await writeFile(join(root, "wiki/NPCs/copper-key.md"), "keep vault");
		const exports = ["Bright Key", "Copper Key", "Silver Key", "Silver-Key"]
			.map((title) => `#### ${title}\n\nGeneric Variant, Rare\n\n---\n\nA key.\n\n---`)
			.join("\n\n");
		await writeFile(join(root, "archive/keys.md"), exports);
		const collisions = await cf([...args, "--out", out], root);
		expect(collisions.stdout).toContain("created: 1, skipped: 3");
		expect(await readFile(join(out, "bright-key.md"), "utf8")).toBe("keep destination");
		expect(await readFile(join(root, "wiki/NPCs/copper-key.md"), "utf8")).toBe("keep vault");
		expect(await readdir(out)).toEqual(["bright-key.md", "silver-key.md"]);
	});

	it("converts a committed 20-item raw slice and passes the whole page gate without hand fixes", async () => {
		const root = await fixture();
		const slice = await readFile(join(repoRoot, "test/items/fixtures/all-magic-items.md"), "utf8");
		const archived = join(repoRoot, "archive/all-magic-items.md");
		const corpus = existsSync(archived) ? archived : join(repoRoot, "raw/all-magic-items.md");
		const originals = new Map(parseItems(await readFile(corpus, "utf8")).map((item) => [item.title, item]));
		const items = parseItems(slice);
		expect(items).toHaveLength(20);
		for (const item of items) expect(item).toEqual(originals.get(item.title));
		for (const name of ["blade-of-broken-mirrors-dormant.md", "dwarven-thrower.md"]) {
			const [item] = parseItems(await readFile(join(repoRoot, "test/items/fixtures", name), "utf8"));
			expect(item).toEqual(originals.get(item!.title));
		}
		await mkdir(join(root, "archive"));
		await writeFile(join(root, "archive/all-magic-items.md"), slice);
		const conversion = await cf(
			["convert-items", "archive/all-magic-items.md", "--root", root, "--templates", realTemplates],
			root,
		);
		expect(conversion.code, conversion.stderr).toBe(0);
		expect(conversion.stdout).toContain("created: 20, skipped: 0");
		const checked = await cf(["check", join(root, "wiki/Items"), "--root", root, "--templates", realTemplates], root);
		expect(checked.code, checked.stdout).toBe(0);
		expect(checked.stdout).toContain("ok: 0 findings");
		expect(await readdir(join(root, "wiki/Items"))).toHaveLength(20);
	});

	it("round-trips the already converted Acid Absorbing Tattoo byte-for-byte except summary and sources", async () => {
		const root = await fixture();
		const raw = await readFile(join(repoRoot, "archive/acid-absorbing-tattoo.md"), "utf8");
		await mkdir(join(root, "archive"));
		await writeFile(join(root, "archive/acid-absorbing-tattoo.md"), raw);
		const result = await cf(
			["convert-items", "archive/acid-absorbing-tattoo.md", "--root", root, "--templates", realTemplates],
			root,
		);
		expect(result.code, result.stderr).toBe(0);
		const generated = await readFile(join(root, "wiki/Items/acid-absorbing-tattoo.md"), "utf8");
		const reference = await readFile(join(repoRoot, "wiki/Items/acid-absorbing-tattoo.md"), "utf8");
		const withoutProvenance = (text: string): string =>
			text.replace(/^summary:.*\n/m, "").replace(/^sources:.*\n(?:[ \\t]+-.*\n)*/m, "");
		expect(withoutProvenance(generated)).toBe(withoutProvenance(reference));
	});

	it("normalises only rejected British spelling, preserving dictionary-approved D&D terms and accepted alternatives", async () => {
		expect(
			await normaliseItemSpelling(
				"Color colors colored coloring ARMOR Armor armor's rumors defense unarmored skillful emphasize",
			),
		).toBe("Colour colours coloured colouring ARMOUR Armour armour's rumours defense unarmored skillful emphasize");
		expect(await normaliseItemSpelling("color `color`\n\n```text\ncolor armor\n```\n\n%% color %%\n")).toBe(
			"colour `color`\n\n```text\ncolor armor\n```\n\n%% color %%\n",
		);
	});

	it("has discoverable examples and actionable missing-input errors", async () => {
		expect((await cf(["convert-items", "--help"])).stdout).toContain("Examples:");
		const missing = await cf(["convert-items", "missing-export.md"]);
		expect(missing.code).toBe(2);
		expect(missing.stderr).toContain("bun run cfcli -- convert-items archive/<file>.md");
	});
});
