import { Document, isSeq, stringify } from "yaml";
import { lintFixLoop } from "../items/page.ts";
import type { CreatureSortKeys } from "./convert.ts";

/** Frontmatter plus `## Statblock`; no other section. */
export async function creaturePage(args: {
	title: string;
	sortKeys: CreatureSortKeys;
	statblock: Record<string, unknown>;
	sources: string[];
}): Promise<string> {
	const frontmatter = stringify({
		title: args.title,
		type: "Creature",
		summary: "",
		sources: args.sources,
		cr: args.sortKeys.cr,
		creature_type: args.sortKeys.creature_type,
		size: args.sortKeys.size,
		habitat: args.sortKeys.habitat,
		sourcebooks: args.sortKeys.sourcebooks,
	});
	const doc = new Document(args.statblock);
	const stats = doc.get("stats", true);
	if (isSeq(stats)) stats.flow = true;
	const yaml = doc.toString({ lineWidth: 0 });
	const page = `---\n${frontmatter.trimEnd()}\n---\n\n## Statblock\n\n\`\`\`statblock\n${yaml.trimEnd()}\n\`\`\`\n`;
	return lintFixLoop(page);
}
