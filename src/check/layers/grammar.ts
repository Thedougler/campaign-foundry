import { Dialect, LocalLinter, SuggestionKind } from "harper.js";
import type { Lint } from "harper.js";
import { binary } from "harper.js/binary";
import type { Page } from "../../vault/types.ts";
import { cachedByPage, hash, lockfileSalt } from "../cache.ts";
import type { CachedFinding } from "../cache.ts";
import { lineAt, lineStarts, projectWords, proseView, prosePages, sourceOffset, templateWords, vaultNameWords, vaultWordList } from "../prose.ts";
import type { CheckContext, Finding, Layer } from "../types.ts";

const LAYER = "grammar";

/**
 * Harper rules that are turned off, each with the reason.
 * - `SpellCheck`: the spelling layer (cspell) owns spelling. Harper's checker also flags the possessive of a
 *   name it was given (`Ravenhold's`), which every in-world possessive would trip.
 * - `UseTitleCase`: headings are sentence case by design (`## At a glance`, `### Hidden truths`), and the
 *   templates fix them that way, so the rule contradicts the template layer on every page.
 * - `OxfordComma`: British house style leaves the serial comma out, and the templates do (`Class, species and level`).
 * - `PhrasalVerbAsCompoundNoun`: it reads the domain term Handout (CONTEXT.md) as the verb "hand out". It
 *   cannot tell a page kind from a misused word.
 * - `UseEllipsisCharacter`: `...` is how D&D Beyond and homebrew print an ellipsis, and a pulled Sheet keeps such names as
 *   they are (a feat called `...of the Blood Rapture`). The Unicode `…` is a typing preference, not a grammar fault.
 * - `OrthographicConsistency`: the 5e coin abbreviations are lower case (`5 gp`, `10 sp`), and Harper insists on
 *   `GP`. It also second-guesses the capitalisation of in-world names.
 * - `MergeWords`: a possessive against a page or Scene name (`Session 12's Hook`) is read as `s` plus the next word
 *   (`sHook`). The spelling is already English.
 * - `DisjointPrefixes`: a preposition against a page name (`under [[Taking on Aruhe]]`) is read as a split compound
 *   (`underTaking`). The name is not the DM's wording.
 */
const DISABLED_RULES = ["SpellCheck", "UseTitleCase", "OxfordComma", "PhrasalVerbAsCompoundNoun", "UseEllipsisCharacter", "OrthographicConsistency", "MergeWords", "DisjointPrefixes"] as const;

let linterPromise: Promise<LocalLinter> | undefined;

/** One British-dialect linter for the whole process; the wasm binary compiles once. */
function linter(): Promise<LocalLinter> {
	linterPromise ??= (async () => {
		const l = new LocalLinter({ binary, dialect: Dialect.British });
		await l.setup();
		await l.setLintConfig(Object.fromEntries(DISABLED_RULES.map((rule) => [rule, false])));
		return l;
	})();
	return linterPromise;
}

/** Harper counts Unicode scalar values, JavaScript counts UTF-16 units: convert only when the text has astral characters. */
function toUtf16(text: string): (index: number) => number {
	if (!/[\uD800-\uDFFF]/.test(text)) return (i) => i;
	const offsets: number[] = [];
	let unit = 0;
	for (const ch of text) {
		offsets.push(unit);
		unit += ch.length;
	}
	offsets.push(unit);
	return (i) => offsets[Math.min(i, offsets.length - 1)] ?? unit;
}

function hintFor(lint: Lint): string {
	const problem = lint.get_problem_text();
	const shown = problem.length > 60 ? `${problem.slice(0, 57)}...` : problem;
	const options = lint
		.suggestions()
		.slice(0, 3)
		.map((s) => {
			const text = s.get_replacement_text();
			if (s.kind() === SuggestionKind.Remove) return `remove \`${shown}\``;
			if (s.kind() === SuggestionKind.InsertAfter) return `insert \`${text}\` after \`${shown}\``;
			return `change \`${shown}\` to \`${text}\``;
		});
	const advice = options.length > 0 ? `Harper suggests: ${options.join("; or ")}.` : `Rewrite \`${shown}\` so the sentence reads correctly.`;
	return `${advice} Change the wording only; keep what the text says.`;
}

async function lintPages(l: LocalLinter, pages: Page[]): Promise<Map<Page, CachedFinding[]>> {
	const out = new Map<Page, CachedFinding[]>();
	for (const page of pages) {
		const found: CachedFinding[] = [];
		out.set(page, found);
		const view = proseView(page);
		if (view.text.trim() === "") continue;
		const starts = lineStarts(page.source);
		const utf16 = toUtf16(view.text);
		const groups = await l.organizedLints(view.text, { language: "markdown" });
		for (const [rule, lints] of Object.entries(groups)) {
			for (const lint of lints) {
				found.push({
					layer: LAYER,
					severity: "error",
					rule,
					line: lineAt(starts, sourceOffset(view, utf16(lint.span().start))),
					message: lint.message(),
					hint: hintFor(lint),
				});
			}
		}
	}
	return out;
}

export async function run(ctx: CheckContext): Promise<Finding[]> {
	const words = [...vaultNameWords(ctx.vault), ...templateWords(ctx.templates), ...(await vaultWordList(ctx.vault)), ...(await projectWords())];
	const pages = prosePages(ctx.vault);
	// A page's answer depends on its text, Harper's version, the disabled rules and the name dictionary.
	const salt = hash(`${await lockfileSalt()}|${DISABLED_RULES.join(",")}|${words.join(",")}`);
	const byPage = await cachedByPage(ctx.root, LAYER, salt, pages, async (misses) => {
		const l = await linter();
		await l.importWords(words);
		return lintPages(l, misses);
	});
	return pages.flatMap((page) => (byPage.get(page) ?? []).map((f): Finding => ({ ...f, severity: "error", path: ctx.display(page.path) })));
}

export const grammarLayer: Layer = {
	name: LAYER,
	description: "Harper: grammar and usage in British English, over the prose text.",
	run,
};
