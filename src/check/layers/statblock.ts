import type { Code, Nodes } from "mdast";
import type { Page } from "../../vault/types.ts";
import { parseStatblock } from "../statblock/parse.ts";
import { corpusProvenance } from "../provenance.ts";
import { checkStatblock } from "../statblock/rules.ts";
import type { CheckContext, Finding, Layer } from "../types.ts";
import { isFixedPage } from "../views.ts";

const LAYER = "statblock";

/** Every ```statblock fence on the page, with its 1-based opening line. */
function fences(page: Page): Code[] {
	const found: Code[] = [];
	const walk = (node: Nodes): void => {
		if (node.type === "code" && node.lang === "statblock" && node.position) found.push(node);
		if ("children" in node) for (const child of node.children) walk(child);
	};
	walk(page.tree);
	return found;
}

export async function run(ctx: CheckContext): Promise<Finding[]> {
	const findings: Finding[] = [];
	const provenance = await corpusProvenance(ctx);
	for (const page of ctx.pages) {
		if (isFixedPage(page)) continue;
		const path = ctx.display(page.path);
		const add = (rule: string, line: number, message: string, hint: string): void => {
			findings.push({ layer: LAYER, severity: "error", rule, path, line, message, hint });
		};
		const blocks = fences(page);
		const type = page.frontmatter?.type;

		if (type !== "Creature" && type !== "NPC") {
			for (const block of blocks) {
				add(
					"statblock-misplaced",
					block.position?.start.line ?? 1,
					`A \`statblock\` block sits on a ${typeof type === "string" && type !== "" ? type : "non-Creature/NPC"} page; stat blocks live on Creature or NPC pages.`,
					"Move the stat block to a Creature or NPC page under `## Statblock`, or embed that section on a Scene, Prep or Location page with `![[Name#Statblock]]`.",
				);
			}
			continue;
		}
		if (blocks.length === 0) continue;
		for (const extra of blocks.slice(1)) {
			add(
				"multiple-statblocks",
				extra.position?.start.line ?? 1,
				`${type} page has more than one \`statblock\` block.`,
				"Keep exactly one stat block per page. A variant with different statistics is its own page.",
			);
		}
		const block = blocks[0] as Code;
		const fenceLine = block.position?.start.line ?? 1;
		const parsed = parseStatblock(block.value);
		const issues = [...parsed.issues, ...(parsed.statblock ? checkStatblock(parsed.statblock) : [])];
		for (const issue of issues) {
			const lines = parsed.statblock?.lines(issue) ?? [];
			const published = provenance.lines.get(page)!;
			if (issue.arithmetic && lines.length > 0 && lines.every((line) => published.has(fenceLine + line))) continue;
			add(issue.rule, fenceLine + (lines[0] ?? 1), issue.message, issue.hint);
		}
	}
	return findings;
}

export const statblockLayer: Layer = {
	name: LAYER,
	scope: "page",
	description: "Optional stat blocks on Creature and NPC pages have derived numbers that add up under the 2024 rules.",
	run,
};
