import type { CheckContext, Finding, Layer } from "../types.ts";
import { checkedPages } from "../util.ts";
import { bodyLines } from "../text.ts";

const LAYER = "hot";
/** The convention is about 500 words; the gate allows a little slack so it does not nag over a sentence. */
export const HOT_WORD_CAP = 550;

const isWord = (token: string): boolean => /[\p{L}\p{N}]/u.test(token);

export const hotLayer: Layer = {
	name: LAYER,
	description: `hot.md stays orientation: its body is at most ${HOT_WORD_CAP} words (the convention is about 500).`,
	run(ctx: CheckContext): Finding[] {
		const findings: Finding[] = [];
		for (const page of checkedPages(ctx)) {
			if (page.slug !== "hot") continue;
			let count = 0;
			let crossed = 0;
			bodyLines(page).forEach((line, i) => {
				for (const token of line.split(/\s+/)) {
					if (!isWord(token)) continue;
					count++;
					if (count === HOT_WORD_CAP + 1) crossed = i + 1;
				}
			});
			if (count <= HOT_WORD_CAP) continue;
			findings.push({
				layer: LAYER,
				severity: "error",
				rule: "too-long",
				path: ctx.display(page.path),
				line: crossed,
				message: `hot.md body is ${count} words; the cap is ${HOT_WORD_CAP} (the convention is about 500).`,
				hint: "Rewrite hot.md down to orientation: the in-world date, where the Party is, the active Threads, what changed last Session and what is next. Link to the pages for detail instead of restating it.",
			});
		}
		return findings;
	},
};
