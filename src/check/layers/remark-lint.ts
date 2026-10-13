import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkLint from "remark-lint";
import remarkLintCheckboxCharacterStyle from "remark-lint-checkbox-character-style";
import remarkLintLinkTitleStyle from "remark-lint-link-title-style";
import remarkLintNoBlockquoteWithoutMarker from "remark-lint-no-blockquote-without-marker";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { VFile } from "vfile";
import { isProsePage, lintText } from "../views.ts";
import type { CheckContext, Finding, Layer } from "../types.ts";

const LAYER = "remark-lint";

/** Only checks markdownlint does not provide; markdownlint owns shared syntax and formatting rules. */
const processor = unified()
	.use(remarkParse)
	.use(remarkFrontmatter, ["yaml"])
	.use(remarkGfm)
	.use(remarkLint)
	.use(remarkLintNoBlockquoteWithoutMarker)
	.use(remarkLintCheckboxCharacterStyle, "consistent")
	.use(remarkLintLinkTitleStyle, "consistent");

const HINTS: Record<string, string> = {
	"no-blockquote-without-marker":
		"Start every line of the quote with `> `, e.g.\n> [!narration] First look\n> A broad woman hauls a rope.",
};

function hintFor(ruleId: string, url: string | undefined): string {
	return (
		HINTS[ruleId] ??
		`Rewrite the text to satisfy remark-lint rule \`${ruleId}\`${url ? `; see ${url}` : ""}. Keep one style across the page.`
	);
}

async function lintSource(source: string, path: string) {
	const file = new VFile({ path, value: source });
	const tree = processor.parse(file);
	await processor.run(tree, file);
	return file.messages;
}

export async function run(ctx: CheckContext): Promise<Finding[]> {
	const pages = ctx.pages.filter(isProsePage);
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
	scope: "page",
	description: "remark-lint: quote markers, checkbox character consistency and link-title quote consistency.",
	run,
};
