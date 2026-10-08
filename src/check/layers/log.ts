import { ENTRY_BULLET, ENTRY_HEADING, isLogOp, isRealDate, LOG_OPS } from "../../vault/log.ts";
import type { CheckContext, Finding, Layer } from "../types.ts";
import { checkedPages } from "../util.ts";
import { bodyLines } from "../text.ts";

const LAYER = "log";
const FORMAT = "## [2026-01-05] ingest | Session 1 transcript";
const OPS = LOG_OPS.join(", ");

export const logLayer: Layer = {
	name: LAYER,
	description: "log.md and log-YYYY.md: entry headings are `## [YYYY-MM-DD] op | Title`, bullets are `- [[Page]]`, entries run in date order, and a log-YYYY.md holds only that year.",
	run(ctx: CheckContext): Finding[] {
		const findings: Finding[] = [];
		for (const page of checkedPages(ctx)) {
			const rotatedYear = /^log-(\d{4})$/.exec(page.name)?.[1];
			if (page.name !== "log" && rotatedYear === undefined) continue;
			const add = (line: number, rule: string, message: string, hint: string): void => {
				findings.push({ layer: LAYER, severity: "error", rule, path: ctx.display(page.path), line, message, hint });
			};
			let previous: string | undefined;
			let inEntry = false;
			bodyLines(page).forEach((text, i) => {
				const line = i + 1;
				const trimmed = text.trimEnd();
				if (trimmed.trim() === "") return;
				if (trimmed.startsWith("## ")) {
					inEntry = true;
					const m = ENTRY_HEADING.exec(trimmed);
					if (!m) {
						add(line, "bad-heading", `Entry heading \`${trimmed}\` does not match the log format.`, `Write it as \`## [YYYY-MM-DD] op | Title\`, e.g. \`${FORMAT}\`. Ops: ${OPS}.`);
						return;
					}
					const [, date, op] = m as unknown as [string, string, string];
					if (!isLogOp(op)) add(line, "unknown-op", `Unknown op \`${op}\` in the entry heading.`, `Use one of ${OPS}, e.g. \`${FORMAT}\`.`);
					if (!isRealDate(date)) {
						add(line, "bad-date", `\`${date}\` is not a real date.`, "Use the real-world date of the operation as YYYY-MM-DD, e.g. `2026-01-05`.");
						return;
					}
					if (previous !== undefined && date < previous) {
						add(line, "out-of-order", `Entry dated ${date} comes after one dated ${previous}; a log runs oldest first.`, "The log is append-only: move this entry above the later ones, or correct its date.");
					}
					previous = date;
					if (rotatedYear !== undefined && date.slice(0, 4) !== rotatedYear) {
						add(line, "wrong-year", `${page.name}.md holds ${rotatedYear} entries only, but this one is dated ${date}.`, `Move it to log-${date.slice(0, 4)}.md (or log.md for the current year).`);
					}
					return;
				}
				if (inEntry && trimmed.startsWith("- ")) {
					if (!ENTRY_BULLET.test(trimmed)) {
						add(line, "bad-bullet", `Bullet \`${trimmed}\` is not a bare page link.`, "One bullet per page touched, as `- [[Page]]`, with nothing after the link.");
					}
					return;
				}
				add(line, "stray-line", inEntry ? `Unexpected text \`${trimmed}\` in the log.` : "Text before the first log entry.", `A log holds only entry headings (\`${FORMAT}\`) and \`- [[Page]]\` bullets under them.`);
			});
		}
		return findings;
	},
};
