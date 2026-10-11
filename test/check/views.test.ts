import { describe, expect, it } from "vitest";
import {
	bodyLines,
	calloutLines,
	lineAt,
	lintText,
	pageViews,
	proseView,
	sourceOffset,
} from "../../src/check/views.ts";
import { parsePage } from "../../src/vault/parse.ts";

const fixture = [
	"---",
	"type: NPC",
	"title: Gate Watch",
	"---",
	"",
	"## At a glance",
	"",
	"- **Found at.** Dr. Vale waits beside [[Old Ferry|the landing]], counting every rope coil.",
	"",
	"```md",
	"This fenced sentence must never be compared with another page.",
	"```",
	"",
	"~~~md",
	"This tilde-fenced sentence must never be compared with another page.",
	"~~~",
	"",
	"    This indented code sentence must never be compared with another page.",
	"",
	"%% guidance",
	"This comment sentence must never be compared with another page.",
	"%%",
	"",
	"> [!narration] Transition",
	"> You hear the rope slap against the quay.",
	">",
	"> You see a knot slip.",
	"",
	"- Bell: ==You hear one chime.== Then: ==You see the bell swing.==",
	"",
	'**Rumor.** The ferryman says "Never cross here", then coils the frayed rope.',
	"",
	"| Move | Effect |",
	"| --- | --- |",
	"| Haul | The ferryman hauls the frayed rope across the quay. |",
	"",
	"The last coil drops %% private %% beside the empty post.",
	"",
].join("\n");

const page = parsePage("World/NPCs/watch.md", fixture);

describe("shared page views", () => {
	it.each([
		{ label: "frontmatter", line: 2, body: "", prose: false, spoken: false, compared: false },
		{ label: "heading", line: 6, body: "## At a glance", prose: true, spoken: false, compared: false },
		{ label: "list and wikilink", line: 8, body: undefined, prose: true, spoken: false, compared: true },
		{ label: "backtick code", line: 11, body: undefined, prose: false, spoken: false, compared: false },
		{ label: "tilde code", line: 15, body: undefined, prose: false, spoken: false, compared: false },
		{ label: "indented code", line: 18, body: undefined, prose: false, spoken: false, compared: false },
		{ label: "comment", line: 21, body: undefined, prose: false, spoken: false, compared: false },
		{ label: "narration title", line: 24, body: undefined, prose: true, spoken: true, compared: false },
		{ label: "narration body", line: 25, body: undefined, prose: true, spoken: true, compared: false },
		{ label: "narration blank", line: 26, body: ">", prose: true, spoken: true, compared: false },
		{ label: "two Cues", line: 29, body: undefined, prose: true, spoken: true, compared: true },
		{ label: "quoted speech", line: 31, body: undefined, prose: true, spoken: false, compared: true },
		{ label: "table", line: 35, body: undefined, prose: true, spoken: false, compared: false },
		{ label: "inline comment", line: 37, body: undefined, prose: true, spoken: false, compared: true },
	])("keeps the $label policy at source line $line", ({ line, body, prose, spoken, compared }) => {
		const views = pageViews(page);
		if (body !== undefined) expect(bodyLines(page)[line - 1]).toBe(body);
		expect(proseView(page).text.split("\n")[line - 1]!.trim().length > 0).toBe(prose);
		expect(views.spoken.has(line)).toBe(spoken);
		expect(views.sentences.has(line)).toBe(compared);
	});

	it("shares cached views and maps visible aliases and compact lint lines back to source", () => {
		const views = pageViews(page);
		const prose = proseView(page);
		const lint = lintText(page);
		expect(pageViews(page)).toBe(views);
		expect(proseView(page)).toBe(prose);
		expect(bodyLines(page)).toBe(bodyLines(page));
		expect(lintText(page)).toBe(lint);
		expect(views.sentences).toBe(views.sentences);
		expect(views.lines.join("\n")).toBe(fixture);
		expect(sourceOffset(prose, prose.text.indexOf("the landing"))).toBe(fixture.indexOf("the landing"));
		expect(lineAt(views.starts, sourceOffset(prose, prose.text.indexOf("the landing")))).toBe(8);
		expect(prose.text).not.toContain("[!");
		expect(prose.text).not.toContain("[[");
		expect(prose.text).not.toContain("private");
		expect(lint.lines[lint.text.split("\n").findIndex((line) => line.includes("[!narration]"))]).toBe(24);
		expect(lint.lines).not.toContain(21);
		expect(lint.skip).toEqual(new Set([37]));
		expect(calloutLines(page, page.callouts[0]!)).toEqual([24, 27]);
		expect([...views.narration]).toEqual([24, 25, 26, 27]);
		expect([...views.narrationBody]).toEqual([25, 26, 27]);
		expect(views.cues.get(29)).toEqual(["You hear one chime.", "You see the bell swing."]);
		expect(views.sentences.get(8)).toEqual([
			{
				quote: "Dr. Vale waits beside the landing, counting every rope coil.",
				key: "dr. vale waits beside the landing, counting every rope coil.",
			},
		]);
		expect(views.sentences.get(31)?.[0]?.quote).toBe('The ferryman says "", then coils the frayed rope.');
	});
});
