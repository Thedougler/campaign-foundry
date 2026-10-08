import { getDefaultSettings, getDictionary, mergeSettings } from "cspell-lib";

let english: Promise<(word: string) => boolean> | undefined;

/** The British English dictionary, case-sensitive, so a lowercase lookup misses proper names. */
export function englishWords(): Promise<(word: string) => boolean> {
	english ??= getDefaultSettings()
		.then((defaults) => getDictionary(mergeSettings(defaults, { dictionaries: ["en-gb"] })))
		.then((dictionary) => (word: string) => dictionary.has(word, { ignoreCase: false }));
	return english;
}
