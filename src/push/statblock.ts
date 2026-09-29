import { parseStatblock } from "../check/statblock/parse.ts";
import type { Statblock } from "../check/statblock/parse.ts";
import type { Code } from "mdast";
import type { Page } from "../vault/types.ts";

/** The parsed Fantasy Statblocks block of a Creature page, or undefined when the page has none or it does not parse. */
export function statblockOf(page: Page): Statblock | undefined {
	const fence = page.tree.children.find((n): n is Code => n.type === "code" && n.lang === "statblock");
	if (!fence) return undefined;
	return parseStatblock(fence.value).statblock;
}
