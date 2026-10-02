import { buildLinkGraph } from "../../vault/links.ts";
import type { Page } from "../../vault/types.ts";
import type { CheckContext, Finding, Layer } from "../types.ts";
import { dirOf, isSpecialPage } from "../util.ts";

const LAYER = "orphans";

/** Where a link to each page kind normally lives, for the hint. */
const LINK_FROM: Record<string, string> = {
	Location: "its parent Location: `### Places worth reaching` on a Region, `### Districts` or `### Services` on a Settlement, `### Areas` on a Site",
	NPC: "the Location where they are found, or the Faction they belong to",
	Creature: "an NPC that uses it (`creature: \"[[Name]]\"`) or a Scene's or Site's occupants",
	Faction: "a Location, NPC or Lore page that mentions it",
	Deity: "a Location, NPC or Lore page that mentions it",
	Item: "the NPC or Location that holds it",
	Spell: "the NPC or Lore page that knows it",
	Vehicle: "the Location where it berths, or its captain's NPC page",
	Lore: "a Location, NPC or Faction page that draws on it",
	"House Rule": "the World or Campaign overview, under `- **House Rules.**`",
	PC: "the Campaign overview, on its `- **Party.**` line",
	"campaign-config": "the Campaign overview",
	Thread: "`hot.md` under `## Active Threads`",
	Quest: "the Thread it advances, or `hot.md`",
	Prep: "`hot.md` under `## Next`",
	Scene: "its Prep's Scene Chart",
	Recap: "the next Session's Previously On, on its `- **Covers.**` line",
	"Previously On": "the Session's Prep",
	Handout: "the Scene that hands it over",
};

/** Pages that need no inbound link: the roots of the Wiki (World and Campaign overviews, DM Settings, indexes, logs) and hot.md. */
function isRoot(page: Page): boolean {
	if (isSpecialPage(page)) return true;
	if (page.name === "hot" || page.name === "DM Settings") return true;
	const segments = dirOf(page.path).split("/").filter(Boolean);
	if (page.frontmatter?.type === "World" || page.frontmatter?.type === "Campaign") return true;
	if (segments.length === 1 && segments[0] === page.name) return true;
	return segments.length === 2 && segments[1] === page.name;
}

export function run(ctx: CheckContext): Finding[] {
	const graph = buildLinkGraph(ctx.vault);
	const findings: Finding[] = [];
	for (const page of ctx.vault.pages) {
		if (isRoot(page)) continue;
		const sources = [...(graph.inbound.get(page) ?? [])].filter((p) => !isSpecialPage(p));
		if (sources.length > 0) continue;
		const type = typeof page.frontmatter?.type === "string" ? page.frontmatter.type : undefined;
		const where = type ? LINK_FROM[type] : undefined;
		findings.push({
			layer: LAYER,
			rule: "orphan",
			path: ctx.display(page.path),
			line: 1,
			message: `No other page links to \`${page.name}\` (index.md and log.md links do not count).`,
			hint: `Link it from a page that mentions it${where ? `, usually ${where}` : ""}. Example: add \`[[${page.name}]]\` to that page's text.`,
		});
	}
	return findings;
}

export const orphansLayer: Layer = {
	name: LAYER,
	description: "Every page has an inbound link from another page (index.md and log.md links do not count).",
	run,
};
