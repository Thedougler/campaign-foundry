import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { glob } from "tinyglobby";
import { parsePage } from "./parse.ts";
import type { Page, Template, TemplateSet, Vault } from "./types.ts";

/** The vault's files as plain data, so fixes can be applied in memory before (or instead of) touching disk. */
export interface VaultFiles {
	/** Vault-relative path to page source. */
	markdown: Map<string, string>;
	/** Vault-relative paths of non-markdown files. */
	attachments: string[];
}

/** Every `.md` page under `dir` except `templates/` and `.obsidian/`, plus the non-md files. */
export async function readVaultFiles(dir: string): Promise<VaultFiles> {
	const paths = await glob("**/*", {
		cwd: dir,
		onlyFiles: true,
		dot: false,
		ignore: ["templates/**", ".obsidian/**", "node_modules/**"],
	});
	paths.sort();
	const markdown = new Map<string, string>();
	const attachments: string[] = [];
	const mdPaths = paths.filter((p) => p.endsWith(".md"));
	for (const p of paths) if (!p.endsWith(".md")) attachments.push(p);
	const sources = await Promise.all(mdPaths.map((p) => readFile(join(dir, p), "utf8")));
	mdPaths.forEach((p, i) => markdown.set(p, sources[i] ?? ""));
	return { markdown, attachments };
}

/** Parses the files into a Vault, reusing pages from `previous` whose source is unchanged. */
export function buildVault(dir: string, files: VaultFiles, previous?: Vault): Vault {
	const pages: Page[] = [];
	const pageByPath = new Map<string, Page>();
	for (const [path, source] of [...files.markdown].sort((a, b) => a[0].localeCompare(b[0]))) {
		const cached = previous?.pageByPath.get(path);
		const page = cached && cached.source === source ? cached : parsePage(path, source);
		pages.push(page);
		pageByPath.set(path, page);
	}
	return { dir, pages, pageByPath, attachments: files.attachments };
}

/**
 * The template's optional `##` sections: those whose first guidance comment, before the next heading, opens with
 * `Optional` (`%% Optional. Include when … %%`). Every other `##` section is required.
 */
function optionalSections(page: Page): Set<string> {
	const optional = new Set<string>();
	page.headings.forEach((heading, i) => {
		if (heading.depth !== 2) return;
		const next = page.headings[i + 1]?.line ?? Number.POSITIVE_INFINITY;
		const guidance = page.comments.find((c) => c.line > heading.line && c.line < next);
		if (guidance && /^Optional\b/.test(guidance.text)) optional.add(heading.text);
	});
	return optional;
}

export async function loadTemplates(templatesDir: string): Promise<TemplateSet> {
	const paths = (await glob("*.md", { cwd: templatesDir, onlyFiles: true })).sort();
	const sources = await Promise.all(paths.map((p) => readFile(join(templatesDir, p), "utf8")));
	const byName = new Map<string, Template>();
	const types = new Map<string, string[]>();
	paths.forEach((path, i) => {
		const page = parsePage(path, sources[i] ?? "");
		const name = page.name;
		const [type = name, kind] = name.split(" - ");
		const fm = page.frontmatter ?? {};
		byName.set(name, {
			name,
			type,
			...(kind === undefined ? {} : { kind }),
			keys: Object.entries(fm).map(([key, value]) => ({ key, value })),
			sections: page.headings.filter((h) => h.depth === 2).map((h) => h.text),
			optional: optionalSections(page),
			callouts: [...new Set(page.callouts.map((c) => c.type))],
			page,
		});
		const kinds = types.get(type) ?? [];
		if (kind !== undefined) kinds.push(kind);
		types.set(type, kinds);
	});
	return { byName, types };
}

/** The template for a page's `type` and `kind`, or undefined when the pair matches none. */
export function findTemplate(templates: TemplateSet, type: string, kind?: string): Template | undefined {
	return templates.byName.get(kind === undefined ? type : `${type} - ${kind}`);
}
