import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

/**
 * The word lists the checker shares with the Narration Vale style (`.vale/styles/Narration/`), read from the
 * rule files themselves so the two never diverge.
 */
interface ValeRule {
	tokens?: string[];
	raw?: string[];
}

function readRule(name: string): ValeRule {
	const file = fileURLToPath(new URL(`../../.vale/styles/Narration/${name}.yml`, import.meta.url));
	return parse(readFileSync(file, "utf8")) as ValeRule;
}

const escape = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

let cached: { compass: RegExp; footMile: RegExp } | undefined;

/** `compass` and `footMile` match what `NoCompass.yml` and `NoFootMileCounts.yml` flag (case-insensitive, global). */
export function valePatterns(): { compass: RegExp; footMile: RegExp } {
	if (cached) return cached;
	// Vale wraps existence tokens in word boundaries, longest first so `northeast` wins over `north`.
	const tokens = [...(readRule("NoCompass").tokens ?? [])].sort((a, b) => b.length - a.length);
	const compass = new RegExp(`\\b(?:${tokens.map((t) => (t.includes("?") ? t : escape(t))).join("|")})\\b`, "gi");
	const footMile = new RegExp((readRule("NoFootMileCounts").raw ?? []).join("|"), "gi");
	cached = { compass, footMile };
	return cached;
}
