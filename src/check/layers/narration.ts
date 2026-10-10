import { analyzeCallout, narrationSentences } from "../../narration/analyze.ts";
import envelope from "../../narration/envelope.json" with { type: "json" };
import { calloutLines, linkedPages, pageWords } from "../../narration/sources.ts";
import { englishWords } from "../english.ts";
import { maskNames, vaultNameWords } from "../prose.ts";
import type { Finding, Layer } from "../types.ts";
import { checkedPages } from "../util.ts";

/** A Cue longer than this stops being a table beat; the rest belongs in a callout or the DM notes. */
const CUE_MAX_SENTENCES = 3;
const CUE_MAX_WORDS = 60;

const plural = (n: number, one: string, many = `${one}s`): string => `${n} ${n === 1 ? one : many}`;

export const narrationLayer: Layer = {
	name: "narration",
	description: "Narration structure and source echoes (craft warnings; token rules live in style).",
	async run(ctx) {
		const findings: Finding[] = [];
		const names = new Set(vaultNameWords(ctx.vault));
		const isWord = await englishWords();
		for (const page of checkedPages(ctx)) {
			const callouts = page.callouts.filter((callout) => callout.type === "narration");
			if (callouts.length === 0 && page.cues.length === 0) continue;
			const linked = linkedPages(ctx.vault, page).map((source) => pageWords(source));
			for (const callout of callouts) {
				const report = analyzeCallout({
					body: callout.body,
					sources: [pageWords(page, calloutLines(page, callout)), ...linked],
					names,
					isWord,
					envelope,
					maskNames: (text) => maskNames(text, ctx.vault),
				});
				for (const finding of report.findings) {
					findings.push({
						layer: "narration",
						rule: finding.rule,
						severity: "warning",
						path: ctx.display(page.path),
						line: callout.line + 1,
						message: `${callout.title}: ${finding.message}`,
						hint: finding.hint,
					});
				}
			}
			// A Cue is Narration (CONTEXT.md), so the callout analysis gates it, with its own length rule on top.
			for (const cue of page.cues) {
				const report = analyzeCallout({
					body: cue.text,
					sources: [pageWords(page, [cue.line, cue.line]), ...linked],
					names,
					isWord,
					envelope,
					maskNames: (text) => maskNames(text, ctx.vault),
				});
				for (const finding of report.findings) {
					findings.push({
						layer: "narration",
						rule: finding.rule,
						severity: "warning",
						path: ctx.display(page.path),
						line: cue.line,
						message: `Cue (line ${cue.line}): ${finding.message}`,
						hint: finding.hint,
					});
				}
				const sentences = narrationSentences(cue.text);
				const wordCount = (cue.text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? []).length;
				if (sentences.length > CUE_MAX_SENTENCES || wordCount > CUE_MAX_WORDS) {
					findings.push({
						layer: "narration",
						rule: "cue-length",
						severity: "warning",
						path: ctx.display(page.path),
						line: cue.line,
						message: `Cue (line ${cue.line}): ${plural(sentences.length, "sentence")}, ${plural(wordCount, "word")}.`,
						hint: "A Cue is a table beat. Move the rest to a [!narration] callout or the DM notes.",
					});
				}
			}
		}
		return findings;
	},
};
