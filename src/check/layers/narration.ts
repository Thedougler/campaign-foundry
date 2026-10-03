import { analyzeCallout } from "../../narration/analyze.ts";
import { calloutLines, linkedPages, pageWords } from "../../narration/sources.ts";
import type { Finding, Layer } from "../types.ts";

export const narrationLayer: Layer = {
	name: "narration",
	description: "Narration structure and source echoes (craft warnings; token rules live in style).",
	run(ctx) {
		const findings: Finding[] = [];
		for (const page of ctx.vault.pages) {
			const callouts = page.callouts.filter((callout) => callout.type === "narration");
			if (callouts.length === 0) continue;
			const linked = linkedPages(ctx.vault, page).map((source) => pageWords(source));
			for (const callout of callouts) {
				const report = analyzeCallout({
					body: callout.body,
					sources: [pageWords(page, calloutLines(page, callout)), ...linked],
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
