import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Page, Vault } from "../vault/types.ts";
import { hash } from "./cache.ts";
import type { CheckContext } from "./types.ts";

/** Published corpus lines, by page, plus the corpus fingerprint for the language caches. */
export interface CorpusProvenance {
	lines: ReadonlyMap<Page, ReadonlySet<number>>;
	salt: string;
}

// Concurrent layers share one literal-source index for this invocation's Vault.
const cache = new WeakMap<Vault, Map<string, Promise<CorpusProvenance>>>();

/** Only exact lines from a page's named local sources confer provenance. */
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

async function load(ctx: CheckContext): Promise<CorpusProvenance> {
	const sources = new Map<Page, string[]>();
	const paths = new Set<string>();
	for (const page of [...ctx.vault.pages, ...ctx.pages]) {
		if (sources.has(page)) continue;
		const named = page.frontmatter?.sources;
		const local = Array.isArray(named)
			? named.filter((source): source is string => typeof source === "string" && !/^\w+:\/\//.test(source))
			: [];
		const resolved = local.map((source) => resolve(ctx.root, source));
		sources.set(page, resolved);
		for (const path of resolved) paths.add(path);
	}
	const corpora = await Promise.all(
		[...paths].sort().map(async (path) => {
			let text: string;
			try {
				text = await readFile(path, "utf8");
			} catch (error) {
				if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
				text = "";
			}
			return { path, hash: hash(text), lines: new Set(text.split("\n").filter((line) => line.trim() !== "")) };
		}),
	);
	const byPath = new Map(corpora.map((corpus) => [corpus.path, corpus.lines]));
	const lines = new Map<Page, ReadonlySet<number>>();
	for (const [page, named] of sources) {
		const published = new Set<number>();
		for (const [index, line] of page.source.split("\n").entries()) {
			if (index < page.frontmatterEndLine || line.trim() === "") continue;
			if (named.some((path) => byPath.get(path)?.has(line))) published.add(index + 1);
		}
		lines.set(page, published);
	}
	return {
		lines,
		salt: hash(JSON.stringify(["corpus-provenance-literal-v1", corpora.map(({ path, hash }) => [path, hash])])),
	};
}

/** Blank proved prose before linting, retaining source lines, offsets and table column delimiters. */
export function blankProvenance(text: string, lines: ReadonlySet<number>): string {
	if (lines.size === 0) return text;
	return text
		.split("\n")
		.map((line, index) => {
			if (!lines.has(index + 1)) return line;
			return line.replace(/^\s*\|/.test(line) ? /[^|]/g : /[^\n]/g, " ");
		})
		.join("\n");
}
