import { buildLinkGraph } from "../../vault/links.ts";
import type { Page } from "../../vault/types.ts";
import type { CheckContext, Finding, Layer } from "../types.ts";
import { isSpecialPage, suggest } from "../util.ts";

const LAYER = "links";

function headingList(page: Page): string {
	const list = page.headings.filter((h) => h.depth >= 2).map((h) => h.text);
	return list.length === 0 ? "none" : list.slice(0, 12).map((h) => `\`${h}\``).join(", ");
}

export function run(ctx: CheckContext): Finding[] {
	const graph = buildLinkGraph(ctx.vault);
	const findings: Finding[] = [];
	for (const page of ctx.vault.pages) {
		const path = ctx.display(page.path);
		const add = (rule: string, line: number, message: string, hint: string): void => {
			findings.push({ layer: LAYER, severity: "error", rule, path, line, message, hint });
		};
		for (const { key, line } of page.unquotedFrontmatterLinks) {
			add("unquoted-frontmatter-link", line, `Property \`${key}\` holds an unquoted wikilink, which YAML reads as a nested list.`, `Quote it: \`${key}: "[[Page Name]]"\`.`);
		}
		for (const { link, resolution } of graph.links.get(page) ?? []) {
			const shown = link.raw;
			switch (resolution.status) {
				case "ok":
				case "attachment":
					break;
				case "empty":
					add("empty-target", link.line, `Link ${shown} names nothing.`, "Put a page name inside, e.g. `[[Ravenhold]]`, or delete the brackets.");
					break;
				case "no-page": {
					// The log is append-only history: `cf log` checked each page when the entry was written, and a page later merged away stays named there.
					if (isSpecialPage(page) && page.name !== "index") break;
					const name = link.target.split("/").pop()!.replace(/\.md$/i, "");
					const near = suggest(name, graph.pageNames);
					add("unresolved", link.line, `${link.embed ? "Embed" : "Link"} ${shown} points at no page.`, `${near ? `Did you mean \`[[${near}]]\`? ` : ""}Links use the page name (\`[[Ravenhold]]\`), not a file slug. If the page does not exist yet, create it from its template in wiki/templates/, or remove the link.`);
					break;
				}
				case "no-attachment": {
					const name = link.target.split("/").pop()!;
					const near = suggest(name, graph.attachmentNames);
					add("missing-attachment", link.line, `Embed ${shown} points at no file in the Wiki.`, `${near ? `Did you mean \`![[${near}]]\`? ` : ""}Images live in the World's \`attachments/\` folder, e.g. wiki/Aldermoor/attachments/${name}. Add the file there or fix the name.`);
					break;
				}
				case "no-heading": {
					const near = suggest(resolution.heading, resolution.page.headings.map((h) => h.text));
					add("missing-heading", link.line, `${shown} points at a heading that \`${resolution.page.name}\` does not have: \`${resolution.heading}\`.`, `${near ? `Did you mean \`[[${resolution.page.name}#${near}]]\`? ` : ""}Headings on ${resolution.page.name}: ${headingList(resolution.page)}. Example: \`[[${resolution.page.name}#${resolution.page.headings.find((h) => h.depth >= 2)?.text ?? "Heading"}]]\`.`);
					break;
				}
				case "no-block":
					add("missing-block", link.line, `${shown} points at block \`^${link.block}\`, which \`${resolution.page.name}\` does not define.`, `Add \` ^${link.block}\` at the end of the target paragraph or list item in ${resolution.page.name}, on the same line as its text.`);
					break;
			}
		}
	}
	return findings;
}

export const linksLayer: Layer = {
	name: LAYER,
	description: "Every wikilink and embed resolves: page, heading, block or attachment.",
	run,
};
