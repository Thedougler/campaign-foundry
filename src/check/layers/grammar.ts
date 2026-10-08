import { Dialect, LocalLinter, SuggestionKind } from "harper.js";
import type { Lint } from "harper.js";
import { binary } from "harper.js/binary";
import type { Page } from "../../vault/types.ts";
import { cachedByPage, hash, lockfileSalt } from "../cache.ts";
import type { CachedFinding } from "../cache.ts";
import { isProsePage, lineAt, lineStarts, projectWords, proseView, sourceOffset, templateWords, vaultNameWords, vaultWordList } from "../prose.ts";
import type { CheckContext, Finding, Layer } from "../types.ts";
import { checkedPages } from "../util.ts";

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
 * - `OneOfTheSingular`: "one of the two" and "one of the three rivers" are standard English, but the rule flags the
 *   number standing alone and the noun that is already plural, and its suggestion is wrong ("two" → "twos"). The DM
 *   confirmed the disable; `ai-tells.VerbTricolon`, raised by the same run, stays on.
 */
const DISABLED_RULES = ["SpellCheck", "UseTitleCase", "OxfordComma", "PhrasalVerbAsCompoundNoun", "UseEllipsisCharacter", "OrthographicConsistency", "MergeWords", "DisjointPrefixes", "OneOfTheSingular"] as const;

/**
 * Two DM-confirmed Harper misfires on literal campaign meaning, dropped per lint so each rule keeps catching real
 * cases. MassNouns reads "a gold grung" as the metal used like a mass noun; "gold" is a caste colour there.
 * Harper's word data misses some past-tense verbs, so PronounVerbAgreement reads them as agreement errors and
 * offers no fix ("she tore the magic loose", "she dug a second grave"; probing found the rest of the set, which
 * includes "cast"). Real agreement errors ("she have", "he don't") still come through.
 */
const CASTE_COLOUR = /^(?:a|an) (?:gold|red|blue|green|purple|orange)$/i;
const MISREAD_PAST: Record<string, true> = { burnt: true, cast: true, clung: true, dug: true, froze: true, ground: true, lent: true, leapt: true, shone: true, sprang: true, stuck: true, struck: true, swore: true, tore: true, woke: true };

function isConfirmedMisfire(rule: string, text: string, start: number, end: number): boolean {
	if (rule === "MassNouns") return CASTE_COLOUR.test(text.slice(start, end)) && /^\s+grungs?\b/i.test(text.slice(end));
	if (rule === "PronounVerbAgreement") return text.slice(start, end).toLowerCase() in MISREAD_PAST;
	return false;
}

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

/** The style layer fails every em or en dash (`ai-tells.EmDashUsage`), so a Harper suggestion that inserts one is never offered. */
const DASH = /[\u2013\u2014]/u;

function hintFor(lint: Lint): string {
	const problem = lint.get_problem_text();
	const shown = problem.length > 60 ? `${problem.slice(0, 57)}...` : problem;
	const suggestions = lint.suggestions();
	const options = suggestions
		.filter((s) => !DASH.test(s.get_replacement_text()))
		.slice(0, 3)
		.map((s) => {
			const text = s.get_replacement_text();
			if (s.kind() === SuggestionKind.Remove) return `remove \`${shown}\``;
			if (s.kind() === SuggestionKind.InsertAfter) return `insert \`${text}\` after \`${shown}\``;
			return `change \`${shown}\` to \`${text}\``;
		});
	const dashed = suggestions.length > 0 && options.length === 0;
	const advice = options.length > 0
		? `Harper suggests: ${options.join("; or ")}.`
		: dashed
			? `Rewrite \`${shown}\` without a dash: the style layer fails en and em dashes, so write a range as \`3 to 5\` and join clauses with a comma or a full stop.`
			: `Rewrite \`${shown}\` so the sentence reads correctly.`;
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
				const span = lint.span();
				const [start, end] = [utf16(span.start), utf16(span.end)];
				// A page name is not the DM's wording: a lint inside one (`config` in `[[campaign-config]]`) is dropped.
				if (view.names.some(([s, e]) => start >= s && end <= e)) continue;
				if (isConfirmedMisfire(rule, view.text, start, end)) continue;
				found.push({
					layer: LAYER,
					severity: "error",
					rule,
					line: lineAt(starts, sourceOffset(view, start)),
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
	const pages = checkedPages(ctx).filter(isProsePage);
	// A page's answer depends on its text, Harper's version, the disabled rules, the name dictionary and the misfire filters.
	const salt = hash(`${await lockfileSalt()}|${DISABLED_RULES.join(",")}|${words.join(",")}|${Object.keys(MISREAD_PAST).join(",")}|${CASTE_COLOUR.source}`);
	const byPage = await cachedByPage(ctx.root, LAYER, salt, pages, async (misses) => {
		const l = await linter();
		await l.importWords(words);
		return lintPages(l, misses);
	}, ctx.target !== undefined);
	return pages.flatMap((page) => (byPage.get(page) ?? []).map((f): Finding => ({ ...f, severity: "error", path: ctx.display(page.path) })));
}

export const grammarLayer: Layer = {
	name: LAYER,
	description: "Harper: grammar and usage in British English, over the prose text.",
	run,
};
