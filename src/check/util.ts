import { closest, distance } from "fastest-levenshtein";

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
