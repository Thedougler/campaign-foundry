import { closest, distance } from "fastest-levenshtein";
import type { Page } from "../vault/types.ts";

/** Generated or append-only pages: `index.md`, `log.md`, `log-YYYY.md`. They carry no template. */
export function isSpecialPage(page: Page): boolean {
	return page.name === "index" || page.name === "log" || /^log-\d{4}$/.test(page.name);
}

/** The candidate closest to `value`, when it is close enough to be a plausible typo. */
export function suggest(value: string, candidates: Iterable<string>): string | undefined {
	const list = [...candidates];
	if (list.length === 0 || value === "") return undefined;
	const lower = list.map((c) => c.toLowerCase());
	const exact = lower.indexOf(value.toLowerCase());
	if (exact !== -1) return list[exact];
	const best = closest(value.toLowerCase(), lower);
	const max = Math.max(2, Math.floor(value.length * 0.4));
	return distance(value.toLowerCase(), best) <= max ? list[lower.indexOf(best)] : undefined;
}

export function quoteList(values: Iterable<string>): string {
	return [...values].map((v) => `\`${v}\``).join(", ");
}

/** Vault-relative directory of a page path, `""` at the vault root. */
export function dirOf(path: string): string {
	const i = path.lastIndexOf("/");
	return i === -1 ? "" : path.slice(0, i);
}
