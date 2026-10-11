import { describe, expect, it } from "vitest";
import { pageKeys } from "../../src/vault/links.ts";
import { parsePage } from "../../src/vault/parse.ts";
import { applyEdits, type LinkEdit, linkSpans, planLinkEdits } from "../../src/vault/rewrite.ts";

const page = (path: string, source: string) => parsePage(path, source);

describe("linkSpans", () => {
	it.each([
		["a body link", "Sees [[Old One]] here.\n", ["[[Old One]]"]],
		["an embed", "![[Old One#Statblock]]\n", ["![[Old One#Statblock]]"]],
		["a quoted frontmatter value", '---\ncreature: "[[Old One]]"\n---\n\nText.\n', ["[[Old One]]"]],
		["a code span", "`[[Old One]]` stays put.\n", []],
		["a fenced code block", "```\n[[Old One]]\n```\n", []],
		["a %% comment", "%% [[Old One]] stays put %%\n", []],
	])("finds %s and nothing else", (_label, source, raws) => {
		expect(linkSpans(page("C/NPCs/Holder.md", source)).map((s) => s.link.raw)).toEqual(raws);
	});

	it("records offsets that splice the raw link out of the source", () => {
		const source = "Text [[Old One]] and ![[Old One#Head|alias]] end.";
		for (const span of linkSpans(page("C/H.md", source))) {
			expect(source.slice(span.start, span.end)).toBe(span.link.raw);
		}
	});

	it.each([
		[2, '---\ncreature: "[[Old One]]"\n---\n\nText.\n'],
		[5, "One\n\nTwo\n\n[[Old One]]\n"],
	])("counts the link on line %i from the page top", (line, source) => {
		expect(linkSpans(page("C/H.md", source))[0]?.link.line).toBe(line);
	});

	it("flags the links inside GFM table rows, pipes and pipeless rows alike", () => {
		const source =
			"| A | B |\n| --- | --- |\n| [[Old One]] | ![[Old One]] |\n\nA | B\n--- | ---\n[[Old One]] | x\n\nPlain [[Old One]].\n";
		const inTable = linkSpans(page("C/H.md", source)).filter((s) => s.table);
		expect(inTable.map((s) => s.link.raw)).toEqual(["[[Old One]]", "![[Old One]]", "[[Old One]]"]);
	});
});

describe("planLinkEdits", () => {
	const target = page("C/NPCs/Old One.md", '---\ntitle: "Old One"\naliases: ["The Elder"]\n---\n\nBody.\n');
	const keys = new Set(pageKeys(target));

	it.each([
		["a name link", "- [[Old One]]"],
		["an alias link", "- [[The Elder]]"],
		["a path-suffix link", "- [[C/NPCs/Old One]]"],
		["a leading-slash path link", "- [[/C/NPCs/Old One]]"],
	])("rewrites %s", (_label, line) => {
		const holder = page("C/H.md", `---\ntitle: "H"\n---\n\n${line}\n`);
		const edits = planLinkEdits([holder], keys, (span) => `[[new-one|${span.link.raw}]]`);
		expect(edits.get(holder)?.length).toBe(1);
	});

	it.each([
		["a same-page fragment link", "- [[#Heading]]"],
		["another page's link", "- [[Other]]"],
		["an attachment link", "![[map.webp]]"],
	])("leaves %s alone", (_label, line) => {
		const holder = page("C/H.md", `---\ntitle: "H"\n---\n\n${line}\n`);
		expect(planLinkEdits([holder], keys, () => "[[new-one]]").has(holder)).toBe(false);
	});

	it("skips pages with no matching link, and edits that render the link unchanged or undefined", () => {
		const untouched = page("C/H.md", '---\ntitle: "H"\n---\n\nNo links.\n');
		expect(planLinkEdits([untouched], keys, () => "[[new-one]]").size).toBe(0);
		const holder = page("C/H.md", '---\ntitle: "H"\n---\n\n[[Old One]]\n');
		expect(planLinkEdits([holder], keys, () => undefined).size).toBe(0);
		expect(planLinkEdits([holder], keys, (span) => span.link.raw).size).toBe(0);
	});

	it("carries the line, the old and the new spelling into the edit", () => {
		const holder = page("C/H.md", '---\ntitle: "H"\n---\n\nOne\n\n[[Old One]]\n');
		const edit = planLinkEdits([holder], keys, () => "[[new-one]]").get(holder)![0]!;
		expect(edit).toMatchObject({ line: 7, from: "[[Old One]]", to: "[[new-one]]" });
		expect(holder.source.slice(edit.start, edit.end)).toBe(edit.from);
	});
});

describe("applyEdits", () => {
	it("applies edits back to front, so earlier offsets stay valid", () => {
		const edits: LinkEdit[] = [
			{ line: 1, from: "[[x]]", to: "[[X]]", start: 2, end: 7 },
			{ line: 1, from: "[[y]]", to: "[[Y]]", start: 10, end: 15 },
		];
		expect(applyEdits("a [[x]] b [[y]] c", edits)).toBe("a [[X]] b [[Y]] c");
	});
});
