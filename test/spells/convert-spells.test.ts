import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { parseSpells } from "../../src/spells/convert.ts";
import { spellPage } from "../../src/spells/page.ts";
import { parsePage } from "../../src/vault/parse.ts";
import { cf, copyFixture, realTemplates, repoRoot } from "../check/helpers.ts";

const casting = "- **Casting Time:** Action\n- **Range:** Self\n- **Components:** V, S\n- **Duration:** 1 hour";
const entry = (title = "Brass Ward", body = "A brass ward.", level = "Level 2 Abjuration"): string =>
	`#### ${title}\n*${level}*\n___\n${casting}\n---\n${body}\n\n---\n`;

describe("5e tool spell export parser", () => {
	it("preserves rules and casting bullets, extracts level and school, and deduplicates classes in first-seen order", () => {
		const description = "A ward.\n\n***Option.*** Choose it.\n***At Higher Levels.*** A stronger ward.";
		expect(parseSpells(entry("Brass Ward", `${description}\n\n**Classes:** Wizard, Artificer, Wizard`))).toEqual([
			{ title: "Brass Ward", level: 2, school: "Abjuration", casting, description, classes: ["Wizard", "Artificer"] },
		]);
	});

	it("reads cantrips and absent class lines under a batch header", () => {
		expect(parseSpells(`# Spells\n\n${entry("Spark", "A spark.", "Evocation Cantrip")}\n${entry()}`)).toEqual([
			{ title: "Spark", level: 0, school: "Evocation", casting, description: "A spark.", classes: [] },
			{ title: "Brass Ward", level: 2, school: "Abjuration", casting, description: "A brass ward.", classes: [] },
		]);
	});

	it("accepts a standalone h1 export, keeps internal separators, and ignores headings or class lines in code", () => {
		const body = "A ward.\n\n---\n\n```md\n#### Not a spell\n**Classes:** Not classes\n```";
		expect(parseSpells(entry("Ward", body).replace("#### Ward", "# Ward"))[0]?.description).toBe(body);
	});

	it("extracts a classes line even when it shares a paragraph with the description", () => {
		expect(parseSpells(entry("Ward", "A ward.\n**Classes:** Wizard, Wizard"))[0]).toMatchObject({
			description: "A ward.",
			classes: ["Wizard"],
		});
	});

	it.each([
		entry().replace("#### Brass Ward", "####"),
		entry().replace("*Level 2 Abjuration*", ""),
		entry().replace("*Level 2 Abjuration*", "*Unknown level*"),
		entry().replace("___\n", ""),
		entry().replace("- **Range:** Self\n", ""),
		entry().replace("- **Range:** Self", "- **Range:**"),
		entry().replace(`${casting}\n---`, casting),
		entry("Ward", ""),
		entry("Ward", "**Classes:** Wizard"),
	])("rejects malformed spell blocks with their name and line", (source) => {
		expect(() => parseSpells(source)).toThrow(/.+ \(line 1\):/);
	});

	it("reports the location of a malformed later block without discarding it", () => {
		const first = entry();
		expect(() => parseSpells(`${first}${entry("Broken", "")}`)).toThrow(
			`Broken (line ${first.split("\n").length}): missing rules text.`,
		);
	});

	it("stops at the first malformed block without reporting later malformed blocks", () => {
		expect(() => parseSpells(`${entry("Broken First", "")}${entry("Broken Second", "")}`)).toThrow(
			"Broken First (line 1): missing rules text.",
		);
		try {
			parseSpells(`${entry("Broken First", "")}${entry("Broken Second", "")}`);
		} catch (error) {
			expect(String(error)).not.toContain("Broken Second");
		}
	});

	it("parses the whole real batch, including Air Bubble's duplicate classes", async () => {
		const archived = join(repoRoot, "archive/all-spells.md");
		const corpus = existsSync(archived) ? archived : join(repoRoot, "raw/all-spells.md");
		const spells = parseSpells(await readFile(corpus, "utf8"));
		expect(spells.length).toBeGreaterThan(400);
		expect(spells.find((spell) => spell.title === "Air Bubble")?.classes).toEqual([
			"Artificer",
			"Druid",
			"Ranger",
			"Sorcerer",
			"Wizard",
		]);
		expect(spells[0]?.classes).toEqual([]);
	});
});

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function fixture(): Promise<string> {
	const root = await mkdtemp(join(tmpdir(), "cf-spells-"));
	roots.push(root);
	await mkdir(join(root, "wiki"));
	await mkdir(join(root, "raw"));
	await writeFile(join(root, "raw/wards.md"), entry());
	return root;
}

const flags = (root: string): string[] => ["--root", root, "--vault", join(root, "wiki"), "--templates", realTemplates];

async function archive(root: string, text = entry()): Promise<void> {
	await mkdir(join(root, "archive"), { recursive: true });
	await writeFile(join(root, "archive/wards.md"), text);
}

describe("convert-spells CLI", () => {
	it("previews without writing files or requiring an archive twin", async () => {
		const root = await fixture();
		const result = await cf(["convert-spells", "raw/wards.md", ...flags(root), "--dry-run"], root);
		expect(result.code, result.stderr).toBe(0);
		expect(result.stdout).toContain("would-create\twiki/Spells/brass-ward.md");
		expect(result.stdout).toContain("created: 0, skipped: 0, would-create: 1");
		expect(await readdir(join(root, "wiki"))).toEqual([]);
		expect(await readdir(root)).not.toContain("archive");
	});

	it("requires archive provenance and reports the exact archive-first instruction", async () => {
		const root = await fixture();
		const result = await cf(["convert-spells", "raw/wards.md", ...flags(root)], root);
		expect(result.code).toBe(2);
		expect(result.stderr).toContain("mv raw/wards.md archive/wards.md");
		expect(await readdir(join(root, "wiki"))).toEqual([]);
	});

	it("writes ordered World-free frontmatter and casting layout, then skips without changing the page", async () => {
		const root = await fixture();
		await archive(root, entry("Brass Ward", "A ward.\n\n**Classes:** Wizard, Wizard, Artificer"));
		const args = ["convert-spells", "archive/wards.md", ...flags(root)];
		expect((await cf(args, root)).stdout).toContain("created: 1, skipped: 0");
		const original = await readFile(join(root, "wiki/Spells/brass-ward.md"), "utf8");
		const page = parsePage("Spells/brass-ward.md", original);
		expect(page.frontmatter).toEqual({
			title: "Brass Ward",
			type: "Spell",
			summary: "",
			sources: ["archive/wards.md"],
			level: 2,
			school: "Abjuration",
			classes: ["Wizard", "Artificer"],
		});
		expect(Object.keys(page.frontmatter!)).toEqual([
			"title",
			"type",
			"summary",
			"sources",
			"level",
			"school",
			"classes",
		]);
		expect(original).toContain(
			`# Brass Ward\n\n*Level 2 Abjuration.*\n\n___\n\n${casting}\n\n___\n\nA ward.\n\n**Classes:** Wizard, Artificer\n`,
		);
		const repeated = await cf(args, root);
		expect(repeated.stdout).toContain("skip\twiki/Spells/brass-ward.md");
		expect(repeated.stdout).toContain("created: 0, skipped: 1");
		expect(await readFile(join(root, "wiki/Spells/brass-ward.md"), "utf8")).toBe(original);
	});

	it("skips vault, destination and input slug collisions without overwriting anything", async () => {
		const root = await fixture();
		const out = join(root, "other");
		await mkdir(out);
		await writeFile(join(out, "bright-ward.md"), "keep destination");
		await mkdir(join(root, "wiki/NPCs"));
		await writeFile(join(root, "wiki/NPCs/copper-ward.md"), "keep vault");
		await archive(
			root,
			["Bright Ward", "Copper Ward", "Silver Ward", "Silver-Ward"].map((name) => entry(name)).join("\n"),
		);
		const result = await cf(["convert-spells", "archive/wards.md", ...flags(root), "--out", out], root);
		expect(result.code, result.stderr).toBe(0);
		expect(result.stdout).toContain("created: 1, skipped: 3");
		expect(await readFile(join(out, "bright-ward.md"), "utf8")).toBe("keep destination");
		expect(await readFile(join(root, "wiki/NPCs/copper-ward.md"), "utf8")).toBe("keep vault");
		expect(await readdir(out)).toEqual(["bright-ward.md", "silver-ward.md"]);
	});

	it("prints only created repo-relative paths suitable for log --page -", async () => {
		const root = await copyFixture("clean");
		roots.push(root);
		await archive(root, ["Brass Ward", "Copper Ward", "Copper-Ward"].map((title) => entry(title)).join("\n"));
		const args = ["convert-spells", "archive/wards.md", ...flags(root), "--paths"];
		expect((await cf([...args, "--dry-run"], root)).stdout).toBe("");
		const converted = await cf(args, root);
		expect(converted.code, converted.stderr).toBe(0);
		expect(converted.stdout).toBe("wiki/Spells/brass-ward.md\nwiki/Spells/copper-ward.md\n");
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
				"Spells",
				"--page",
				"-",
				"--dry-run",
			],
			root,
			converted.stdout,
		);
		expect(logged.code, logged.stderr).toBe(0);
		expect(logged.stdout).toContain("[[brass-ward|Brass Ward]]");
		expect(logged.stdout).toContain("[[copper-ward|Copper Ward]]");
		expect((await cf(args, root)).stdout).toBe("");
	});

	it("reuses spelling, nested heading, export-tag, table and scaling normalisations without changing prose or code", async () => {
		const root = await fixture();
		const literal =
			"`***At Higher Levels.*** color`\n\n```md\n***At Higher Levels.*** color\n```\n\n<!-- exported <a> -->";
		await archive(
			root,
			entry(
				"Ward",
				`A <a href="spells.html">color</a> ward.\n\n##### Rolls\n| Roll | Effect |\n|:----:|-------:|\n| 1 | *A\\|B* |\n\n***At Higher Levels.*** A stronger ward.\n\n${literal}`,
			),
		);
		const result = await cf(["convert-spells", "archive/wards.md", ...flags(root)], root);
		expect(result.code, result.stderr).toBe(0);
		const page = await readFile(join(root, "wiki/Spells/ward.md"), "utf8");
		expect(page).toContain("A colour ward.");
		expect(page).toContain("## Rolls\n\n");
		expect(page).toContain("*A\\|B*");
		expect(page).toContain("| Roll | Effect |\n| :---: | ---: |\n| 1 | *A\\|B* |");
		expect(page).toContain("***Using a Higher-Level Spell Slot.*** A stronger ward.");
		expect(page).toContain(literal);
		const checked = await cf(
			[
				"check",
				join(root, "wiki/Spells"),
				...flags(root),
				"--layer",
				"markdownlint",
				"--layer",
				"remark-lint",
				"--layer",
				"spelling",
			],
			root,
		);
		expect(checked.stdout).toContain("ok: 0 findings");
	});

	it("emits compact real tables without empty border columns, padding runs or changes to cell wording", async () => {
		const template = await readFile(join(realTemplates, "spell.md"), "utf8");
		const body =
			"An omen.\n\n##### Omens\n| Omen         | Result |\n|--------------|--------|\n| Weal         | Good   |\n| Woe          | Bad    |";
		const page = await spellPage(parseSpells(entry("Omen", body))[0]!, "archive/omen.md", template);
		expect(page).toContain("| Omen | Result |\n| --- | --- |\n| Weal | Good |\n| Woe | Bad |");
		expect(page).not.toContain("| |");
	});

	it("normalises plain and non-breaking spaces in text, leaving list indentation and code intact", async () => {
		const template = await readFile(join(realTemplates, "spell.md"), "utf8");
		const body =
			"A  ward\u00a0\u00a0holds.\n\n- A   choice.\n  - A\u202f\u202fsecond choice.\n\n`A  literal\u00a0space`\n\n```text\nA  literal\u202fspace\n```";
		const page = await spellPage(parseSpells(entry("Ward", body))[0]!, "archive/ward.md", template);
		expect(page).toContain("A ward holds.");
		expect(page).toContain("- A choice.\n  - A second choice.");
		expect(page).toContain("`A  literal\u00a0space`");
		expect(page).toContain("```text\nA  literal\u202fspace\n```");
	});

	it("substitutes double hyphens and em-dash clause punctuation without rewriting words or code", async () => {
		const template = await readFile(join(realTemplates, "spell.md"), "utf8");
		const body =
			"A ward -- called the ward -- holds. A ward--called the ward--holds.\n\nA ward — called the ward — holds. A ward—called the ward—holds.\n\n`a -- b — c`\n\n```text\na -- b — c\n```";
		const spell = parseSpells(entry("Ward", body))[0]!;
		spell.casting = spell.casting.replace("V, S", "V, S, M (tools—such as cards—worth 100 GP)");
		const page = await spellPage(spell, "archive/ward.md", template);
		expect(page).toContain("A ward, called the ward, holds. A ward, called the ward, holds.");
		expect(page).toContain("M (tools, such as cards, worth 100 GP)");
		expect(page).toContain("`a -- b — c`");
		expect(page).toContain("```text\na -- b — c\n```");
	});

	it("uses en dashes for digit ranges and em dashes for in-prose triple hyphens, preserving Markdown syntax and code", async () => {
		const template = await readFile(join(realTemplates, "spell.md"), "utf8");
		const body =
			"Roll 4-6 or 10-20. A ward --- called the ward --- holds.\n\n| Roll | Result |\n| --- | --- |\n| 1-3 | A ward. |\n\n`4-6 --- code`\n\n```text\n4-6 --- code\n```";
		const page = await spellPage(parseSpells(entry("Ward", body))[0]!, "archive/ward.md", template);
		expect(page).toContain("Roll 4–6 or 10–20. A ward — called the ward — holds.");
		expect(page).toContain("| Roll | Result |\n| --- | --- |\n| 1–3 | A ward. |");
		expect(page).toContain("`4-6 --- code`");
		expect(page).toContain("```text\n4-6 --- code\n```");
	});

	it("leaves numeric ranges, quoted attributions and unavailable table-result dashes intact", async () => {
		const template = await readFile(join(realTemplates, "spell.md"), "utf8");
		const body = "Roll 1—6 or 1--6.\n\n*A quotation.*— Name\n\n| Roll | Result |\n| --- | --- |\n| 1 | — |";
		const page = await spellPage(parseSpells(entry("Ward", body))[0]!, "archive/ward.md", template);
		expect(page).toContain("Roll 1—6 or 1--6.");
		expect(page).toContain("*A quotation.*— Name");
		expect(page).toContain("| 1 | — |");
	});

	it("emits cantrips without inventing Classes and preserves Cantrip Upgrade", async () => {
		const template = await readFile(join(realTemplates, "spell.md"), "utf8");
		const [spell] = parseSpells(entry("Spark", "A spark.\n***Cantrip Upgrade.*** Another spark.", "Evocation Cantrip"));
		const page = await spellPage(spell!, "archive/spark.md", template);
		expect(page).toContain("*Evocation Cantrip.*");
		expect(page).toContain("***Cantrip Upgrade.*** Another spark.");
		expect(page).toContain("classes: []");
		expect(page).not.toContain("**Classes:**");
	});

	it("preserves the archived Alter Self rules rather than reproducing the hand page's prose repairs", async () => {
		const raw = await readFile(join(repoRoot, "archive/alter-self.md"), "utf8");
		const template = await readFile(join(realTemplates, "spell.md"), "utf8");
		const generated = await spellPage(parseSpells(raw)[0]!, "archive/alter-self.md", template);
		const reference = await readFile(join(repoRoot, "wiki/Spells/alter-self.md"), "utf8");
		const differences = generated
			.split("\n")
			.flatMap((line, index) => (line === reference.split("\n")[index] ? [] : [index + 1]));
		expect(differences).toEqual([4, 25, 29, 31]);
		expect(generated).toContain("Its effects last for the duration, during which");
		expect(generated).toContain("your basic shape stays the same;");
		expect(generated).toContain("colouration");
	});

	it("refuses the entire batch when block three of five is malformed, naming its original source line", async () => {
		const root = await fixture();
		const prefix = entry("First Ward") + entry("Second Ward");
		await archive(root, prefix + entry("Broken Ward", "") + entry("Fourth Ward") + entry("Fifth Ward"));
		const result = await cf(["convert-spells", "archive/wards.md", ...flags(root)], root);
		expect(result.code).toBe(2);
		expect(result.stderr).toContain(`Broken Ward (line ${prefix.split("\n").length}): missing rules text.`);
		expect(result.stdout).toBe("");
		expect(await readdir(join(root, "wiki"))).toEqual([]);
	});

	it("has archive-first help, actionable missing-file errors and malformed input errors", async () => {
		const help = await cf(["convert-spells", "--help"]);
		expect(help.stdout).toContain("Examples:");
		expect(help.stdout).toContain("mv raw/all-spells.md archive/all-spells.md");
		const missing = await cf(["convert-spells", "missing-export.md"]);
		expect(missing.code).toBe(2);
		expect(missing.stderr).toContain("bun run cfcli -- convert-spells archive/<file>.md");
		const root = await fixture();
		await writeFile(join(root, "raw/wards.md"), entry("Broken", ""));
		const malformed = await cf(["convert-spells", "raw/wards.md", ...flags(root), "--dry-run"], root);
		expect(malformed.code).toBe(2);
		expect(malformed.stderr).toContain("Broken (line 1): missing rules text.");
		expect(await readdir(join(root, "wiki"))).toEqual([]);
	});
});
