import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Nodes } from "mdast";
import { normaliseStructure } from "../items/page.ts";
import { normaliseItemSpelling } from "../items/spelling.ts";
import { parsePage } from "../vault/parse.ts";
import type { Page, Vault } from "../vault/types.ts";
import { hash } from "./cache.ts";
import type { CheckContext } from "./types.ts";

/** Published corpus lines, by page, plus the corpus fingerprint for the language caches. */
export interface CorpusProvenance {
	lines: ReadonlyMap<Page, ReadonlySet<number>>;
	salt: string;
}

// A rebuilt Vault starts a fresh pre-pass, including source changes between check invocations.
// Concurrent layers share the promise: a corpus serving hundreds of pages is read and indexed once.
const cache = new WeakMap<Vault, Map<string, Promise<CorpusProvenance>>>();
const normalise = (line: string): string =>
	line
		.replace(/[-\u2013\u2014]/g, "-")
		.replace(/\s+/g, " ")
		.trim();

/** Named local sources alone confer provenance; only exact text or closed converter transforms match. */
export function corpusProvenance(ctx: CheckContext): Promise<CorpusProvenance> {
	let roots = cache.get(ctx.vault);
	if (!roots) {
		roots = new Map();
		cache.set(ctx.vault, roots);
	}
	let result = roots.get(ctx.root);
	if (!result) {
		result = load(ctx);
		roots.set(ctx.root, result);
	}
	return result;
}

/** The producer's spelling-only map, completed beyond cspell's per-document reporting caps. */
async function converterSpelling(line: string): Promise<string> {
	for (;;) {
		const converted = await normaliseItemSpelling(line);
		if (converted === line) return line;
		line = converted;
	}
}

/** Mirror the converter's punctuation and exact scaling run-in repairs; code and attributions stay literal. */
function converterText(text: string): string {
	const edits: [number, number, string][] = [];
	const collect = (node: Nodes, previous?: Nodes): void => {
		if (node.type === "text" && node.position) {
			const start = node.position.start.offset!;
			const end = node.position.end.offset!;
			const raw = text.slice(start, end);
			// Mirror src/spells/page.ts normalisePunctuation's closed transform set and order.
			const clauses = raw.replace(/[ \t]*(—|(?<!-)--(?!-))[ \t]*/g, (match, dash: string, offset: number) => {
				const before = raw.slice(0, offset).trimEnd();
				const after = raw.slice(offset + match.length).trimStart();
				if (
					(!before && !after) ||
					(/\d$/.test(before) && /^\d/.test(after)) ||
					(dash === "—" && !before && /^[ \t]*—[ \t]/.test(match) && previous?.type === "emphasis")
				)
					return match;
				return ", ";
			});
			const fixed = clauses.replace(/(?<=\d)-(?=\d)/g, "–").replace(/[ \t]+---[ \t]+/g, " — ");
			if (fixed !== raw) edits.push([start, end, fixed]);
		} else if (
			node.type === "emphasis" &&
			node.position &&
			text.slice(node.position.start.offset, node.position.end.offset) === "***At Higher Levels.***"
		) {
			edits.push([node.position.start.offset!, node.position.end.offset!, "***Using a Higher-Level Spell Slot.***"]);
		} else if ("children" in node) {
			for (let index = 0; index < node.children.length; index++) {
				collect(node.children[index]!, node.children[index - 1]);
			}
		}
	};
	collect(parsePage("corpus.md", text).tree);
	let output = text;
	for (const [start, end, fixed] of edits.toReversed()) {
		output = output.slice(0, start) + fixed + output.slice(end);
	}
	return output;
}

async function load(ctx: CheckContext): Promise<CorpusProvenance> {
	const sources = new Map<Page, string[]>();
	const paths = new Set<string>();
	// Text targets can sit outside the Wiki context, but still need their own provenance view.
	for (const pages of [ctx.vault.pages, ctx.pages]) {
		for (const page of pages) {
			if (sources.has(page)) continue;
			const named = page.frontmatter?.sources;
			const local = Array.isArray(named)
				? named.filter((source): source is string => typeof source === "string" && !/^\w+:\/\//.test(source))
				: [];
			const resolved = local.map((source) => resolve(ctx.root, source));
			sources.set(page, resolved);
			for (const path of resolved) paths.add(path);
		}
	}
	const corpora = await Promise.all(
		[...paths].sort().map(async (path) => {
			let text: string;
			try {
				text = await readFile(path, "utf8");
			} catch (error) {
				// An unavailable source proves nothing; the page remains fully gated.
				if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
				text = "";
			}
			// Reuse the producer's spelling-only translator, including its accepted-word and case policy.
			// Translate distinct lines, not a whole corpus: cspell caps repeated problems per document.
			// Index both source and produced text, so original published lines remain valid too.
			const lines = new Set(text.split("\n").map(normalise).filter(Boolean));
			const produced = converterText(text).split("\n");
			const spellings = new Map<string, string>();
			for (const line of new Set(produced)) {
				if (line.trim() !== "") spellings.set(line, await converterSpelling(line));
			}
			const converted = normaliseStructure(produced.map((line) => spellings.get(line) ?? line).join("\n"), 3, true);
			for (const line of converted.split("\n")) {
				const key = normalise(line);
				if (key) lines.add(key);
			}
			return { path, hash: hash(JSON.stringify([text, [...lines].sort()])), lines };
		}),
	);
	const byPath = new Map(corpora.map((corpus) => [corpus.path, corpus.lines]));
	const lines = new Map<Page, ReadonlySet<number>>();
	for (const [page, named] of sources) {
		const published = new Set<number>();
		if (named.length > 0) {
			for (const [index, line] of page.source.split("\n").entries()) {
				if (index < page.frontmatterEndLine) continue;
				let key = normalise(line);
				if (!key) continue;
				let matches = named.some((path) => byPath.get(path)?.has(key));
				if (!matches) {
					// A produced field can hit cspell's duplicate cap part-way through a line (Dueling Ground).
					// Canonicalise only its spelling, so partially Britishised output still has its corpus twin.
					key = normalise(await converterSpelling(line));
					matches = named.some((path) => byPath.get(path)?.has(key));
				}
				if (matches) published.add(index + 1);
			}
		}
		lines.set(page, published);
	}
	return {
		lines,
		salt: hash(JSON.stringify(["corpus-provenance-converter-v6", corpora.map(({ path, hash }) => [path, hash])])),
	};
}

/** Blank proved prose before linting, retaining source lines, offsets and table column delimiters. */
export function blankProvenance(text: string, lines: ReadonlySet<number>): string {
	if (lines.size === 0) return text;
	return text
		.split("\n")
		.map((line, index) => {
			if (!lines.has(index + 1)) return line;
			// Keep a blank table header recognisable: otherwise its unproved, reformatted separator becomes
			// orphan prose and the linters mistake its syntax hyphens for punctuation.
			return line.replace(/^\s*\|/.test(line) ? /[^|]/g : /[^\n]/g, " ");
		})
		.join("\n");
}
