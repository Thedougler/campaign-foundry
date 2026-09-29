import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { getDefaultSettings, mergeSettings, readSettings, spellCheckDocument } from "cspell-lib";
import type { CSpellSettings } from "cspell-lib";
import type { Page } from "../../vault/types.ts";
import { cachedByPage, hash, lockfileSalt } from "../cache.ts";
import type { CachedFinding } from "../cache.ts";
import { lineAt, lineStarts, proseView, prosePages, sourceOffset, templateWords, toolRoot, vaultNameWords } from "../prose.ts";
import type { CheckContext, Finding, Layer } from "../types.ts";

const LAYER = "spelling";
const MAX_SUGGESTED_WORDS = 40;

let baseSettings: Promise<CSpellSettings> | undefined;

/**
 * cspell's defaults, the committed `cspell.json` (British English, D&D term list) and, for this check, every
 * word in a page name or a template. Names of in-world people and places therefore pass with no list to keep.
 */
async function settingsFor(words: string[]): Promise<CSpellSettings> {
	baseSettings ??= (async () => mergeSettings(await getDefaultSettings(), await readSettings(join(toolRoot, "cspell.json"))))();
	return mergeSettings(await baseSettings, { words });
}

interface Issue {
	page: Page;
	word: string;
	line: number;
}

async function misspellings(vaultDir: string, pages: Page[], settings: CSpellSettings): Promise<Issue[]> {
	const perPage = await Promise.all(
		pages.map(async (page): Promise<Issue[]> => {
			const view = proseView(page);
			const starts = lineStarts(page.source);
			const result = await spellCheckDocument(
				{ uri: pathToFileURL(join(vaultDir, page.path)).toString(), text: view.text, languageId: "markdown", locale: "en-GB" },
				{ noConfigSearch: true, generateSuggestions: false },
				settings,
			);
			return result.issues.map((issue) => ({ page, word: issue.text, line: lineAt(starts, sourceOffset(view, issue.offset)) }));
		}),
	);
	return perPage.flat();
}

/** One cspell pass over the distinct misspelt words gives suggestions cheaply; checking each page with suggestions on is slow. */
async function suggestionsFor(settings: CSpellSettings, words: string[]): Promise<Map<string, string[]>> {
	const out = new Map<string, string[]>();
	if (words.length === 0) return out;
	const result = await spellCheckDocument(
		{ uri: "file:///suggestions.txt", text: words.join("\n"), languageId: "plaintext", locale: "en-GB" },
		{ noConfigSearch: true, generateSuggestions: true },
		{ ...settings, suggestionsTimeout: 2000, numSuggestions: 3 },
	);
	for (const issue of result.issues) {
		if (!out.has(issue.text)) out.set(issue.text, issue.suggestions ?? []);
	}
	return out;
}

function finding(word: string, line: number, near: string[]): CachedFinding {
	return {
		layer: LAYER,
		rule: "misspelt",
		line,
		message: `\`${word}\` is not in the British English dictionary, the D&D term list, a template or any page name.`,
		hint: [
			near.length > 0 ? `Did you mean ${near.map((s) => `\`${s}\``).join(", ")}? Use British spelling (harbourmaster, organised).` : "Correct the spelling; use British English (harbourmaster, organised).",
			"For an in-world name, give it a page (a Wiki page named for it makes it a known word); for a rules term, add it to .cspell/dnd-terms.txt.",
		].join(" "),
	};
}

export async function run(ctx: CheckContext): Promise<Finding[]> {
	const words = [...vaultNameWords(ctx.vault), ...templateWords(ctx.templates)];
	const pages = prosePages(ctx.vault);
	const config = await Promise.all([".cspell/dnd-terms.txt", "cspell.json"].map((file) => readFile(join(toolRoot, file), "utf8").catch(() => "")));
	// A page's answer depends on its text, cspell's version, the committed config and word list, and the name dictionary.
	const salt = hash(`${await lockfileSalt()}|${config.join("\n")}|${words.join(",")}`);
	const byPage = await cachedByPage(LAYER, salt, pages, async (misses) => {
		const settings = await settingsFor(words);
		const issues = await misspellings(ctx.vault.dir, misses, settings);
		const distinct = [...new Set(issues.map((i) => i.word))].slice(0, MAX_SUGGESTED_WORDS);
		const suggestions = await suggestionsFor(settings, distinct);
		const out = new Map<Page, CachedFinding[]>();
		for (const { page, word, line } of issues) {
			const list = out.get(page) ?? [];
			list.push(finding(word, line, suggestions.get(word) ?? []));
			out.set(page, list);
		}
		return out;
	});
	return pages.flatMap((page) => (byPage.get(page) ?? []).map((f): Finding => ({ ...f, path: ctx.display(page.path) })));
}

export const spellingLayer: Layer = {
	name: LAYER,
	description: "cspell: British English, with a dictionary built from every page name plus .cspell/dnd-terms.txt.",
	run,
};
