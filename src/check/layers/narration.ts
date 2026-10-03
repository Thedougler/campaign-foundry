import { getDefaultSettings, getDictionary, mergeSettings } from "cspell-lib";
import { analyzeCallout } from "../../narration/analyze.ts";
import { calloutLines, linkedPages, pageWords } from "../../narration/sources.ts";
import { maskNames, vaultNameWords } from "../prose.ts";
import type { Finding, Layer } from "../types.ts";

let english: Promise<(word: string) => boolean> | undefined;

/** The British English dictionary, case-sensitive, so a lowercase lookup misses proper names. */
function englishWords(): Promise<(word: string) => boolean> {
	english ??= getDefaultSettings()
		.then((defaults) => getDictionary(mergeSettings(defaults, { dictionaries: ["en-gb"] })))
		.then((dictionary) => (word: string) => dictionary.has(word, { ignoreCase: false }));
	return english;
}

export const narrationLayer: Layer = {
	name: "narration",
	description: "Narration structure and source echoes (craft warnings; token rules live in style).",
	async run(ctx) {
		const findings: Finding[] = [];
		const names = new Set(vaultNameWords(ctx.vault));
		const isWord = await englishWords();
		for (const page of ctx.vault.pages) {
			const callouts = page.callouts.filter((callout) => callout.type === "narration");
			if (callouts.length === 0) continue;
			const linked = linkedPages(ctx.vault, page).map((source) => pageWords(source));
			for (const callout of callouts) {
				const report = analyzeCallout({
					body: callout.body,
					sources: [pageWords(page, calloutLines(page, callout)), ...linked],
					names,
					isWord,
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
		}
		return findings;
	},
};
