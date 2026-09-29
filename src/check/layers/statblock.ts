import type { Code, Nodes } from "mdast";
import type { Page } from "../../vault/types.ts";
import { parseStatblock } from "../statblock/parse.ts";
import type { Issue } from "../statblock/parse.ts";
import { checkStatblock } from "../statblock/rules.ts";
import type { CheckContext, Finding, Layer } from "../types.ts";
import { isSpecialPage } from "../util.ts";

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

export function run(ctx: CheckContext): Finding[] {
	const findings: Finding[] = [];
	for (const page of ctx.vault.pages) {
		if (isSpecialPage(page)) continue;
		const path = ctx.display(page.path);
		const add = (rule: string, line: number, message: string, hint: string): void => {
			findings.push({ layer: LAYER, rule, path, line, message, hint });
		};
		const blocks = fences(page);
		const type = page.frontmatter?.type;

		if (type !== "Creature") {
			for (const block of blocks) {
				add(
					"statblock-misplaced",
					block.position?.start.line ?? 1,
					`A \`statblock\` block sits on a ${typeof type === "string" && type !== "" ? type : "non-Creature"} page; stat blocks live only on Creature pages.`,
					"Move the stat block to a Creature page (`## Statblock` in Creatures/<Name>.md). Link it from an NPC with `creature: \"[[Name]]\"`, or embed it on a Scene, Prep or Location page with `![[Name#Statblock]]`.",
				);
			}
			continue;
		}
		if (blocks.length === 0) {
			add("missing-statblock", 1, "Creature page has no `statblock` block.", "Add a ```statblock fence under `## Statblock` with the Fantasy Statblocks `Basic 5e Layout` fields; copy it from templates/Creature.md.");
			continue;
		}
		for (const extra of blocks.slice(1)) {
			add("multiple-statblocks", extra.position?.start.line ?? 1, "Creature page has more than one `statblock` block.", "Keep exactly one per Creature. A variant (a Creature with a different stat block) is its own Creature page.");
		}
		const block = blocks[0] as Code;
		const fenceLine = block.position?.start.line ?? 1;
		const parsed = parseStatblock(block.value);
		const lineOf = (issue: Issue): number => {
			const lines = parsed.statblock?.lines;
			if (!lines) return fenceLine + 1;
			if (issue.feature) return fenceLine + lines.feature(issue.feature.section, issue.feature.name);
			return fenceLine + (issue.key ? lines.key(issue.key) : 1);
		};
		const issues = [...parsed.issues, ...(parsed.statblock ? checkStatblock(parsed.statblock) : [])];
		for (const issue of issues) add(issue.rule, lineOf(issue), issue.message, issue.hint);
	}
	return findings;
}

export const statblockLayer: Layer = {
	name: LAYER,
	description: "Stat blocks sit only on Creature pages, and their derived numbers add up under the 2024 rules.",
	run,
};
