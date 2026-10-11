import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { TemplateSet, Vault } from "../vault/types.ts";
import { proseView } from "./views.ts";

/** Splits a page name into the words a reader would spell-check: `Gull's Errand` gives `Gull's`, `Gull`, `Errand`. */
export function nameWords(name: string): string[] {
	const words = new Set<string>();
	for (const token of name.split(/[\s\-–—_/,:;()[\]"“”]+/)) {
		const word = token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
		if (!/\p{L}/u.test(word)) continue;
		words.add(word);
		for (const part of word.split(/['’]/)) if (/\p{L}{2,}/u.test(part)) words.add(part);
	}
	return [...words];
}

const dictionaryCache = new WeakMap<Vault, string[]>();

/**
 * Every word in the vault's page names (and in each page's `aliases`), so in-world names pass the spelling
 * and grammar layers without a hand-kept list.
 */
export function vaultNameWords(vault: Vault): string[] {
	const cached = dictionaryCache.get(vault);
	if (cached) return cached;
	const words = new Set<string>();
	for (const page of vault.pages) {
		for (const name of page.names) for (const word of nameWords(name)) words.add(word);
	}
	const list = [...words].sort();
	dictionaryCache.set(vault, list);
	return list;
}

/** The gate's own repository root, where the committed prose configs live (`.markdownlint.yaml`, `cspell.json`, `.vale.ini`). */
export const toolRoot = fileURLToPath(new URL("../../", import.meta.url));

let projectWordsPromise: Promise<string[]> | undefined;

/** The committed D&D term list (`.cspell/dnd-terms.txt`), shared by the spelling and grammar layers. */
export function projectWords(): Promise<string[]> {
	projectWordsPromise ??= readFile(join(toolRoot, ".cspell", "dnd-terms.txt"), "utf8").then(
		(text) =>
			text
				.split("\n")
				.map((line) => line.trim())
				.filter((line) => line !== "" && !line.startsWith("#")),
		() => [],
	);
	return projectWordsPromise;
}

/** The vault's own word list: in-world coinages that are not page names, one word per line, `#` starts a comment. */
export const VAULT_WORDS_FILE = ".cspell-words.txt";

const vaultWordCache = new WeakMap<Vault, Promise<string[]>>();

/**
 * Words the World invented that no page is named for (a Calendar's months and weekdays, a name mentioned in
 * passing) and real-world words no dictionary in the gate has (`bodhran`), read from `.cspell-words.txt` at the
 * vault root and committed with the vault. It sits beside the page
 * names in the spelling and grammar dictionaries. D&D rules terms belong in `.cspell/dnd-terms.txt` instead.
 */
export function vaultWordList(vault: Vault): Promise<string[]> {
	let list = vaultWordCache.get(vault);
	if (!list) {
		list = readFile(join(vault.dir, VAULT_WORDS_FILE), "utf8").then(
			(text) =>
				text
					.split("\n")
					.map((line) => line.trim())
					.filter((line) => line !== "" && !line.startsWith("#")),
			() => [],
		);
		vaultWordCache.set(vault, list);
	}
	return list;
}

const templateCache = new WeakMap<TemplateSet, string[]>();

/**
 * Every word in the templates' headings, labels and guidance. The templates define page shape, so the words they
 * use (`Armor Class`, a section named `Rumors`) are the gate's own vocabulary and cannot be misspellings.
 */
export function templateWords(templates: TemplateSet): string[] {
	const cached = templateCache.get(templates);
	if (cached) return cached;
	const words = new Set<string>();
	for (const template of templates.byName.values()) {
		for (const match of proseView(template.page).text.matchAll(/\p{L}[\p{L}'’]*\p{L}|\p{L}/gu)) words.add(match[0]);
		for (const word of nameWords(`${template.type} ${template.kind ?? ""}`)) words.add(word);
	}
	const list = [...words].sort();
	templateCache.set(templates, list);
	return list;
}
