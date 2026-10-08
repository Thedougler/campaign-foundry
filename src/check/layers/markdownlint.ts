import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { applyFixes } from "markdownlint";
import type { Configuration, LintError } from "markdownlint";
import { lint } from "markdownlint/promise";
import { parse } from "yaml";
import type { Page } from "../../vault/types.ts";
import { isProsePage, lintText, toolRoot } from "../prose.ts";
import type { CheckContext, Finding, Fix, FixResult, Layer } from "../types.ts";
import { checkedPages } from "../util.ts";

const LAYER = "markdownlint";

let configPromise: Promise<Configuration> | undefined;

/** The committed `.markdownlint.yaml`, which also drives editors. */
function loadConfig(): Promise<Configuration> {
	configPromise ??= readFile(join(toolRoot, ".markdownlint.yaml"), "utf8").then((text) => parse(text) as Configuration);
	return configPromise;
}

const HINTS: Record<string, string> = {
	MD009: "Delete the spaces at the end of the line. For a hard line break, end the line with a backslash instead.",
	MD010: "Replace the tab with spaces.",
	MD012: "Leave a single blank line between blocks; delete the extra blank lines.",
	MD022: "Put a blank line above and below the heading.",
	MD031: "Put a blank line above and below the fenced code block.",
	MD032: "Put a blank line above and below the list.",
	MD047: "End the file with exactly one newline.",
};

/** markdownlint's errors for each page, with line numbers in the page source and comment noise dropped. */
async function lintPages(pages: Page[]): Promise<Map<Page, LintError[]>> {
	const config = await loadConfig();
	const strings: Record<string, string> = {};
	const texts = new Map<Page, ReturnType<typeof lintText>>();
	for (const page of pages) {
		const lintable = lintText(page);
		texts.set(page, lintable);
		strings[page.path] = lintable.text;
	}
	const results = await lint({ strings, config, handleRuleFailures: true });
	const byPage = new Map<Page, LintError[]>();
	for (const page of pages) {
		const { lines, skip } = texts.get(page)!;
		const errors = (results[page.path] ?? [])
			.map((e) => ({ ...e, lineNumber: lines[e.lineNumber - 1] ?? e.lineNumber }))
			.filter((e) => !skip.has(e.lineNumber));
		byPage.set(page, errors);
	}
	return byPage;
}

export async function run(ctx: CheckContext): Promise<Finding[]> {
	const findings: Finding[] = [];
	for (const [page, errors] of await lintPages(checkedPages(ctx).filter(isProsePage))) {
		for (const e of errors) {
			const rule = e.ruleNames[0] ?? "markdownlint";
			const detail = e.errorDetail ? ` ${e.errorDetail}` : "";
			const advice = HINTS[rule] ?? `See ${e.ruleInformation}.`;
			findings.push({
				layer: LAYER,
				severity: "error",
				rule,
				path: ctx.display(page.path),
				line: e.lineNumber,
				message: `${e.ruleDescription} (${e.ruleNames[1] ?? rule})${detail ? `.${detail}` : ""}`,
				hint: `${advice}${e.fixInfo ? " `cf check --fix` applies it." : ""}`,
			});
		}
	}
	return findings;
}

export async function fix(ctx: CheckContext): Promise<FixResult> {
	const fixes: Fix[] = [];
	for (const [page, errors] of await lintPages(checkedPages(ctx).filter(isProsePage))) {
		const fixable = errors.filter((e) => e.fixInfo);
		if (fixable.length === 0) continue;
		const content = applyFixes(page.source, fixable);
		if (content === page.source) continue;
		const rules = [...new Set(fixable.map((e) => e.ruleNames[0]))].join(", ");
		fixes.push({
			layer: LAYER,
			rule: "autofix",
			path: ctx.display(page.path),
			description: `applied markdownlint's own fixes (${rules})`,
			edit: { type: "write", path: page.path, content },
		});
	}
	return { fixes };
}

export const markdownlintLayer: Layer = {
	name: LAYER,
	description: "markdownlint: Markdown structure and whitespace, tuned for Obsidian (.markdownlint.yaml).",
	run,
	fix,
};
