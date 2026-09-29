import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { checkFixture, findingsFor, fixtures, type JsonFinding, type JsonReport } from "./helpers.ts";

let report: JsonReport;
let code: number;
let broken: JsonFinding[];
let brokenSource: string[];

const A = "Aldermoor";

beforeAll(async () => {
	({ report, code } = await checkFixture("links", ["--layer", "links"]));
	broken = findingsFor(report, `${A}/NPCs/Broken Links.md`);
	brokenSource = (await readFile(join(fixtures, "links/wiki", A, "NPCs/Broken Links.md"), "utf8")).split("\n");
});

/** The finding on the line containing `text`. */
const at = (text: string): JsonFinding | undefined => {
	const line = brokenSource.findIndex((l) => l.includes(text)) + 1;
	expect(line, `fixture has ${text}`).toBeGreaterThan(0);
	return broken.find((f) => f.line === line);
};

describe("links layer", () => {
	it("exits 1", () => expect(code).toBe(1));

	it("resolves every Obsidian link form", () => {
		// Valid Links holds: name, alias, #heading, #H1#H2, vault path, .md suffix, other case, embeds of a
		// heading and of attachments (plain, sized, by path), same-page heading, #^block, an escaped bar in
		// a table, a frontmatter link, and `[[Nowhere]]` in code and in a %% comment, which must not count.
		expect(findingsFor(report, `${A}/NPCs/Valid Links.md`)).toEqual([]);
	});

	it.each([
		["[[Nowhere Keep]]", "unresolved"],
		["[[Ravenhld]]", "unresolved"],
		["[[black-lotus]]", "unresolved"],
		["[[Ravenhold#Nope]]", "missing-heading"],
		["[[Ravenhold#Areas#Play]]", "missing-heading"],
		["[[Ravenhold#^ghost]]", "missing-block"],
		["![[Bandit Captain#Statblok]]", "missing-heading"],
		["![[ghost.png]]", "missing-attachment"],
		["[[#Missing Heading]]", "missing-heading"],
		["[[]]", "empty-target"],
		["![[Nowhere Statblock]]", "unresolved"],
	])("%s yields %s", (text, rule) => {
		expect(at(text)?.rule).toBe(rule);
	});

	it("counts wikilinks in frontmatter values", () => {
		const parent = broken.find((f) => f.message.includes("Ghost Parent"));
		expect(parent?.rule).toBe("unresolved");
		expect(parent?.line).toBe(brokenSource.findIndex((l) => l.startsWith("parent:")) + 1);
	});

	it("flags an unquoted frontmatter wikilink", () => {
		expect(findingsFor(report, `${A}/NPCs/Unquoted.md`).map((f) => f.rule)).toEqual(["unquoted-frontmatter-link"]);
	});

	it("suggests the near miss, and the headings that exist", () => {
		expect(at("[[Ravenhld]]")?.hint).toContain("Did you mean `[[Ravenhold]]`");
		expect(at("![[Bandit Captain#Statblok]]")?.hint).toContain("`Statblock`");
		expect(at("[[Ravenhold#Nope]]")?.hint).toContain("Headings on Ravenhold");
		expect(at("![[ghost.png]]")?.hint).toContain("attachments/");
	});

	it("reports nothing else in the vault", () => {
		const other = report.findings.filter((f) => !f.path.endsWith("Broken Links.md") && !f.path.endsWith("Unquoted.md"));
		expect(other).toEqual([]);
	});
});
