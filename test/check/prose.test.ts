import { describe, expect, it } from "vitest";
import { lineAt, lineStarts, nameWords, proseView, sourceOffset, vaultNameWords } from "../../src/check/prose.ts";
import { buildVault } from "../../src/vault/vault.ts";
import { parsePage } from "../../src/vault/parse.ts";

const page = (source: string) => parsePage("Aldermoor/NPCs/Test.md", source);

describe("proseView", () => {
	const source = `---
type: NPC
summary: "Zzxq frontmatter."
---

## At a glance

- **Found at.** [[Ravenhold#Docks|the docks]] and [[Old Ferry]]. ^found

> [!narration] First look
> A broad woman hauls a rope past [[Tam Brightwater|the newcomer]].

![[wanted-poster.png|300]]

%% guidance
more %%

| Move | Effect |
| ---- | ------ |
| [[Ravenhold\\|the port]] | Opens doors. |

\`\`\`statblock
name: Xyzzyq
\`\`\`
`;
	const view = proseView(page(source));

	it("drops frontmatter, code fences, comments, embeds, callout markers and block ids", () => {
		for (const gone of ["Zzxq", "Xyzzyq", "guidance", "wanted-poster", "[!narration]", "^found", "type: NPC"]) {
			expect(view.text, gone).not.toContain(gone);
		}
	});

	it("shows what Obsidian shows for a wikilink: the alias, else the page name", () => {
		expect(view.text).toContain("**Found at.** the docks and Old Ferry.");
		expect(view.text).toContain("past the newcomer.");
		expect(view.text).toContain("| the port | Opens doors. |");
		expect(view.text).not.toContain("[[");
	});

	it("keeps every line break, so a view line is the page's line", () => {
		expect(view.text.split("\n").length).toBe(source.split("\n").length);
		const lines = view.text.split("\n");
		expect(lines.findIndex((l) => l.includes("the newcomer"))).toBe(source.split("\n").findIndex((l) => l.includes("newcomer")));
	});

	it("maps a view index back to the line of the source", () => {
		const starts = lineStarts(source);
		const at = view.text.indexOf("newcomer");
		expect(lineAt(starts, sourceOffset(view, at))).toBe(source.split("\n").findIndex((l) => l.includes("newcomer")) + 1);
		const alias = source.indexOf("the newcomer");
		expect(sourceOffset(view, view.text.indexOf("the newcomer"))).toBe(alias);
	});
});

describe("proseView masked for wording rules", () => {
	const files = {
		markdown: new Map([
			["A/Countless.md", ""],
			["A/Grung.md", ""],
			["A/Test.md", "Countless agents watch the Grung. [[Grung]] hops. A countless crowd waits. Countlessly.\n"],
		]),
		attachments: [],
	};
	const vault = buildVault("/v", files);
	const text = proseView(vault.pageByPath.get("A/Test.md")!, vault).text;

	it("masks bare and linked page names, each name to its own word", () => {
		expect(text).not.toMatch(/Countless |Grung/);
		const [countless, grung, linked] = text.match(/Placename\w*/g)!;
		expect(countless).not.toBe(grung);
		expect(linked).toBe(grung);
	});

	it("leaves lowercase words and longer words that only contain a name", () => {
		expect(text).toContain("A countless crowd");
		expect(text).toContain("Countlessly.");
	});
});

describe("name dictionary", () => {
	it("splits page names into the words in them, possessives included", () => {
		expect(nameWords("Gull's Errand").sort()).toEqual(["Errand", "Gull", "Gull's"]);
		expect(nameWords("Session 1 - Storm at the Crossing")).toContain("Storm");
		expect(nameWords("2026-01-05")).toEqual([]);
	});

	it("collects every page name and alias in the vault", () => {
		const files = {
			markdown: new Map([
				["A/Zorvath Keep.md", "---\naliases: [\"the Grey Hold\"]\n---\n"],
				["A/index.md", ""],
			]),
			attachments: [],
		};
		const words = vaultNameWords(buildVault("/v", files));
		expect(words).toEqual(expect.arrayContaining(["Zorvath", "Keep", "Grey", "Hold", "index"]));
	});
});
