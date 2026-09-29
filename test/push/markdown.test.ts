import { describe, expect, it } from "vitest";
import { renderMarkdown } from "../../src/push/markdown.ts";
import type { RenderContext } from "../../src/push/markdown.ts";
import { parsePage } from "../../src/vault/parse.ts";

const ctx: RenderContext = {
	// Only Sable is in the Adventure, as an Actor; the map image ships with the module.
	target: (link) => (link.target === "Sable" ? { uuid: "Actor.abc123def456ghij", label: link.alias ?? "Sable" } : undefined),
	image: (link) => (link.target.endsWith(".webp") ? `modules/m/assets/${link.target}` : undefined),
};

const render = (body: string, options: Parameters<typeof renderMarkdown>[2] = {}): string =>
	renderMarkdown(parsePage("W/Scene.md", `---\ntype: Scene\nsummary: "s"\n---\n\n${body}\n`), ctx, options);

describe("renderMarkdown", () => {
	it("rewrites a wikilink to a UUID link when the target is in the Adventure and to plain text when it is not", () => {
		const html = render("Meet [[Sable]] and [[Nib Ashwater|the tally-keeper]] and [[Nib Ashwater]].");
		expect(html).toContain("@UUID[Actor.abc123def456ghij]{Sable}");
		expect(html).toContain("the tally-keeper");
		expect(html).toContain("Nib Ashwater.");
		expect(html).not.toContain("[[");
	});

	it("renders a narration callout as a styled blockquote with its title", () => {
		const html = render("> [!narration] Opening\n> The mud is grey.\n>\n> A hand comes out.");
		expect(html).toMatch(/<blockquote class="cf-callout cf-narration"[^>]*style="[^"]*border-left/);
		expect(html).toContain('<p class="cf-callout-title">Opening</p>');
		expect(html).toContain("<p>The mud is grey.</p>");
		expect(html).not.toContain("[!narration]");
	});

	it("drops frontmatter, %% comments %%, the Links section and block ids", () => {
		const html = render("## Play\n\nVisible. ^abc\n\n%% DM note %%\n\n## Links\n\n```base\nfilters: x\n```");
		expect(html).toContain("Visible.");
		expect(html).not.toMatch(/DM note|Links|filters|\^abc|summary/);
	});

	it("embeds an attachment image from the module and shows a link line for an embedded page", () => {
		const html = render("![[Battle Map.webp]]\n\n![[Sable#Statblock]]");
		expect(html).toContain('<img src="modules/m/assets/Battle Map.webp"');
		expect(html).toContain("@UUID[Actor.abc123def456ghij]{Sable}");
	});

	it("renders tables", () => {
		const html = render("| If | Then |\n| --- | --- |\n| a | b |");
		expect(html).toContain("<table>");
		expect(html).toContain("<td>b</td>");
	});

	it("can keep only the narration callouts and the image right under each (a Handout)", () => {
		const html = render(
			"## At a glance\n\n- **Kind.** Letter.\n\n> [!narration] Handout text\n> To the three.\n\n![[Note - Handout.webp]]\n\n## Play\n\nDM only.",
			{ narrationOnly: true },
		);
		expect(html).toContain("To the three.");
		expect(html).toContain("<img");
		expect(html).not.toMatch(/Kind|DM only|Play|At a glance/);
	});
});
