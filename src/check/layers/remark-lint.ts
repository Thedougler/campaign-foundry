import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkLint from "remark-lint";
import remarkLintNoUndefinedReferences from "remark-lint-no-undefined-references";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { VFile } from "vfile";
import { isProsePage, lintText } from "../prose.ts";
import type { CheckContext, Finding, Layer } from "../types.ts";
import { checkedPages } from "../util.ts";

const LAYER = "remark-lint";

/**
 * The remark-lint set: the `recommended` preset (mistakes) and the `consistent` preset (one style per page),
 * with frontmatter parsed so it is not read as prose and GitHub-flavoured Markdown (tables, task lists, bare URLs) as Obsidian reads it.
 *
 * Obsidian syntax passes because nothing here reads references beyond the one rule below: `[[wikilinks]]`,
 * `![[embeds]]`, `[!narration]` callout markers and `^block` ids are all shortcut references to remark, and
 * `no-undefined-references` is told to allow them (`allowShortcutLink`). The links layer resolves wikilinks.
 */
const processor = unified()
	.use(remarkParse)
	.use(remarkFrontmatter, ["yaml"])
	.use(remarkGfm)
	.use(remarkLint)
	.use(remarkPresetLintRecommended)
	.use(remarkPresetLintConsistent)
	.use(remarkLintNoUndefinedReferences, { allowShortcutLink: true });

const HINTS: Record<string, string> = {
	"no-blockquote-without-marker": "Start every line of the quote with `> `, e.g.\n> [!narration] First look\n> A broad woman hauls a rope.",
	"no-literal-urls": "Wrap the URL in angle brackets or make it a link, e.g. `<https://example.com>` or `[the harbour site](https://example.com)`.",
	"final-newline": "End the file with a single newline.",
	"no-undefined-references": "Write `[text](url)` for a link, or escape the bracket as `\\[` when it is plain text.",
	"no-duplicate-definitions": "Keep one definition per label; delete the duplicate.",
	"no-unused-definitions": "Delete the unused `[label]: url` definition or link to it.",
	"no-heading-content-indent": "Write one space between the `#` marks and the heading text, e.g. `## At a glance`.",
	"hard-break-spaces": "End the line with a backslash for a line break instead of trailing spaces.",
	"list-item-bullet-indent": "Do not indent list bullets; start them at the left margin.",
	"ordered-list-marker-style": "Use `1.` with a full stop, not `1)`.",
};

function hintFor(ruleId: string, url: string | undefined): string {
	return HINTS[ruleId] ?? `Rewrite the text to satisfy remark-lint rule \`${ruleId}\`${url ? `; see ${url}` : ""}. Keep one style across the page.`;
}

async function lintSource(source: string, path: string) {
	const file = new VFile({ path, value: source });
	const tree = processor.parse(file);
	await processor.run(tree, file);
	return file.messages;
}

export async function run(ctx: CheckContext): Promise<Finding[]> {
	const pages = checkedPages(ctx).filter(isProsePage);
	const perPage = await Promise.all(
		pages.map(async (page) => {
			const { text, lines, skip } = lintText(page);
			const messages = await lintSource(text, page.path);
			return messages
				.map((m) => ({ m, line: lines[(m.line ?? 1) - 1] ?? m.line ?? 1 }))
				.filter(({ line }) => !skip.has(line))
				.map(
					({ m, line }): Finding => ({
						layer: LAYER,
						severity: "error",
						rule: m.ruleId ?? "remark-lint",
						path: ctx.display(page.path),
						line,
						message: m.reason,
						hint: hintFor(m.ruleId ?? "", m.url),
					}),
				);
		}),
	);
	return perPage.flat();
}

export const remarkLintLayer: Layer = {
	name: LAYER,
	description: "remark-lint: recommended and consistent presets, Obsidian syntax allowed.",
	run,
};
