import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getDefaultSettings, mergeSettings, readSettings, spellCheckDocument } from "cspell-lib";
import type { CSpellSettings } from "cspell-lib";
import { toolRoot } from "../check/prose.ts";
import { proseView, sourceOffset } from "../check/views.ts";
import { parsePage } from "../vault/parse.ts";

let settings: Promise<CSpellSettings> | undefined;
let replacements: Promise<Record<string, string>> | undefined;

/** The established translator's spelling-only data; no vocabulary substitutions or guessed corrections. */
function britishSpellings(): Promise<Record<string, string>> {
	replacements ??= readFile(
		new URL(import.meta.resolve("american-british-english-translator/data/american_spellings.json")),
		"utf8",
	).then((text) =>
		Object.assign(JSON.parse(text) as Record<string, string>, {
			// Published export spellings absent from the translator's data; still gated by cspell.
			counterclockwise: "anticlockwise",
			crisscrossed: "criss-crossed",
			eyelike: "eye-like",
			skillfully: "skilfully",
			willful: "wilful",
			worshipers: "worshippers",
			furor: "furore",
			grayscale: "greyscale",
			varicolored: "varicoloured",
			hematite: "haematite",
			rowboat: "rowing boat",
		}),
	);
	return replacements;
}

/** Preserve accepted spellings (including D&D terms), punctuation and case; never guess from spellchecker suggestions. */
export async function normaliseItemSpelling(text: string): Promise<string> {
	settings ??= Promise.all([getDefaultSettings(), readSettings(join(toolRoot, "cspell.json"))]).then(
		([defaults, configured]) => mergeSettings(defaults, configured),
	);
	const data = await britishSpellings();
	const view = proseView(parsePage("item.md", text));
	const result = await spellCheckDocument(
		// Prose is natural language: Markdown's HTML dictionary otherwise accepts US "color".
		{ uri: "file:///item.txt", text: view.text, languageId: "plaintext", locale: "en-GB" },
		{ noConfigSearch: true, generateSuggestions: false },
		await settings,
	);
	let output = text;
	for (const issue of result.issues.toReversed()) {
		const word = issue.text;
		const spelling = /^([A-Za-z]+)(['’]s)?$/.exec(word);
		let replacement = spelling ? data[spelling[1]!.toLowerCase()] : undefined;
		if (replacement === undefined) continue;
		if (word === word.toUpperCase()) replacement = replacement.toUpperCase();
		else if (word[0] === word[0]?.toUpperCase()) replacement = replacement[0]?.toUpperCase() + replacement.slice(1);
		replacement += spelling?.[2] ?? "";
		const at = sourceOffset(view, issue.offset);
		output = output.slice(0, at) + replacement + output.slice(at + word.length);
	}
	return output;
}
