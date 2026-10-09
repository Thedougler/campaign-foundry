import { spawnSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { mkdir, rename as moveFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { Command } from "commander";
import { UsageError } from "../check/run.ts";
import { isSpecialPage, suggest } from "../check/util.ts";
import { appendLogEntry, formatEntry, today } from "../vault/log.ts";
import { campaignFolders, campaignNames, generateIndexes } from "../vault/indexes.ts";
import { blank, parseWikiLinkText, slugify } from "../vault/parse.ts";
import type { Page, Vault } from "../vault/types.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { resolveVault } from "./vault-flags.ts";

/** `![[target#heading#^block|alias]]`; the inner text never spans lines or nests brackets. */
const WIKILINK = /(!?)\[\[([^[\]\n]*)\]\]/g;

interface RenameFlags {
	title?: string;
	slug?: string;
	campaign?: string;
	dryRun?: boolean;
	vault?: string;
	root?: string;
}

/** One planned `[[old]]` -> `[[new]]` on one line of one file; `start`/`end` offset the pre-rename source. */
interface LinkEdit {
	line: number;
	from: string;
	to: string;
	start: number;
	end: number;
}

/** One file the rename touches: the moved page itself, or any page whose links to it are rewritten. */
interface PlannedFile {
	path: string;
	content: string;
	edits: LinkEdit[];
	/** Set when the file is the renamed page and its path changes. */
	movedFrom?: string;
}

/** Lowercases, drops a leading slash and one trailing `.md`: the form link targets compare in (`links.ts`). */
const targetKey = (target: string): string => target.replace(/^\/+/, "").replace(/\.md$/i, "").toLowerCase();

/** A page named on the command line: `Mara Voss`, `[[Mara Voss]]`, `ashes-of-the-crown/NPCs/Mara Voss.md` or a path from the working directory. */
function resolvePage(vault: Vault, input: string): Page {
	const raw = input.trim().replace(/^\[\[(.*)\]\]$/, "$1");
	if (raw.includes("/") || raw.endsWith(".md")) {
		const rel = raw.endsWith(".md") ? raw : `${raw}.md`;
		for (const candidate of [rel.replace(/^\/+/, ""), relative(vault.dir, resolve(process.cwd(), rel)).split(sep).join("/")]) {
			const page = vault.pageByPath.get(candidate);
			if (page) return page;
		}
	} else {
		const wanted = raw.toLowerCase();
		const named = vault.pages.filter((p) => p.names.some((n) => n.toLowerCase() === wanted));
		if (named.length === 1) return named[0]!;
		if (named.length > 1) {
			throw new UsageError(
				`More than one page is named \`${raw}\`: ${named.map((p) => p.path).join(", ")}.`,
				`Pass the vault path of the one you mean, e.g. cf rename "${named[0]!.path}"`,
			);
		}
	}
	const closest = suggest(raw.replace(/\.md$/, "").split("/").at(-1) ?? raw, vault.pages.flatMap((p) => p.names));
	throw new UsageError(`No page \`${raw}\` in the Wiki.${closest ? ` Did you mean \`${closest}\`?` : ""}`, `Name a page that exists, by name or vault path. Example: cf rename "Mara Voss"`);
}

function collectCodeRanges(node: unknown, out: [number, number][]): void {
	const n = node as { type?: string; position?: { start?: { offset?: number }; end?: { offset?: number } }; children?: unknown[] };
	if ((n.type === "code" || n.type === "inlineCode") && n.position) {
		const start = n.position.start?.offset;
		const end = n.position.end?.offset;
		if (start !== undefined && end !== undefined) out.push([start, end]);
	}
	for (const child of n.children ?? []) collectCodeRanges(child, out);
}

/**
 * Every wikilink on the page at source offsets: code spans, code blocks and `%% %%` comments are masked
 * out first, exactly as `parsePage` masks them. The frontmatter is left in (its fence is not masked), so
 * links in quoted string values rewrite like body links.
 */
function linkSpans(page: Page): { start: number; end: number; raw: string; embed: boolean; inner: string }[] {
	const ranges: [number, number][] = page.comments.map((c) => [c.start, c.end]);
	collectCodeRanges(page.tree, ranges);
	ranges.sort((a, b) => a[0] - b[0]);
	const masked = blank(page.source, ranges, false);
	const spans: { start: number; end: number; raw: string; embed: boolean; inner: string }[] = [];
	for (const match of masked.matchAll(WIKILINK)) {
		const start = match.index ?? 0;
		spans.push({ start, end: start + match[0].length, raw: match[0], embed: match[1] === "!", inner: match[2] ?? "" });
	}
	return spans;
}

/** The targets a link may spell the page by: every pre-rename name (title, aliases, slug) and every suffix of its pre-rename path. */
function oldTargetKeys(page: Page): Set<string> {
	const keys = new Set<string>();
	for (const name of page.names) keys.add(targetKey(name));
	const withoutMd = page.path.replace(/\.md$/, "");
	const parts = withoutMd.split("/");
	parts.forEach((_, i) => keys.add(targetKey(parts.slice(i).join("/"))));
	return keys;
}

/**
 * The new spelling of one rewritten link's target, the bare-vs-piped decision:
 *
 * - A link that already shows its own text (`[[old|text]]`) keeps that text and takes the new slug as its
 *   target — ADR 0028: a link showing text other than the target's title stays `[[slug|text]]`.
 * - A bare link or embed takes the new title, so it reads naturally in source and keeps resolving by name
 *   after the rename. A title that could not sit inside `[[ ]]` (it holds `|`, `#` or brackets) becomes
 *   `[[slug|title]]`, which shows the same text without breaking the link.
 */
function newTargetFor(hasAlias: boolean, newTitle: string, newSlug: string): { target: string; alias?: string } {
	if (hasAlias) return { target: newSlug };
	if (newTitle !== "" && !/[|#[\]]/.test(newTitle)) return { target: newTitle };
	return { target: newSlug, alias: newTitle };
}

/** Every link edit the rename makes, keyed by the file holding the link; files without edits are absent. */
function planLinkEdits(vault: Vault, page: Page, newTitle: string, newSlug: string): Map<string, LinkEdit[]> {
	const keys = oldTargetKeys(page);
	const edits = new Map<string, LinkEdit[]>();
	for (const holder of vault.pages) {
		// index.md is regenerated after the rename; log.md entries are append-only history.
		if (isSpecialPage(holder)) continue;
		const spans = linkSpans(holder);
		if (spans.length === 0) continue;
		const found: LinkEdit[] = [];
		let line = 1;
		let cursor = 0;
		for (const span of spans) {
			line += holder.source.slice(cursor, span.start).split("\n").length - 1;
			cursor = span.start;
			const link = parseWikiLinkText(span.raw, span.embed, span.inner, line, false);
			if (link.target === "" || !keys.has(targetKey(link.target))) continue;
			const bar = span.inner.indexOf("|");
			const head = bar === -1 ? span.inner : span.inner.slice(0, bar);
			const aliasPart = bar === -1 ? undefined : span.inner.slice(bar + 1);
			const segments = head.split("#");
			const head0 = segments[0] ?? "";
			const chosen = newTargetFor(aliasPart !== undefined, newTitle, newSlug);
			const newHead0 = head0.includes(link.target) ? head0.replace(link.target, chosen.target) : chosen.target;
			const newHead = [newHead0, ...segments.slice(1)].join("#");
			const newInner = aliasPart !== undefined ? `${newHead}|${aliasPart}` : chosen.alias !== undefined ? `${newHead}|${chosen.alias}` : newHead;
			const newRaw = `${span.embed ? "!" : ""}[[${newInner}]]`;
			if (newRaw === span.raw) continue;
			found.push({ line, from: span.raw, to: newRaw, start: span.start, end: span.end });
		}
		if (found.length > 0) edits.set(holder.path, found);
	}
	return edits;
}

/** Applies edits back to front, so the offsets of the pre-rename source stay valid. */
function applyEdits(source: string, edits: LinkEdit[]): string {
	let out = source;
	for (const edit of [...edits].sort((a, b) => b.start - a.start)) {
		out = out.slice(0, edit.start) + edit.to + out.slice(edit.end);
	}
	return out;
}

/**
 * The page source with `title` set: an existing `title` key (blank or not) gets the value on its own line;
 * a frontmatter without the key gets it as the first property, where the templates put it; a page without
 * frontmatter gets a minimal block. Nothing else in the file changes. Run after `applyEdits`: it works by
 * line, not offset.
 */
function withTitle(source: string, page: Page, title: string): string {
	const value = `"${title.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
	const line = `title: ${value}`;
	if (page.frontmatterEndLine === 0) return `---\n${line}\n---\n\n${source}`;
	const lines = source.split("\n");
	const keyLine = page.frontmatterKeyLines.title;
	if (keyLine !== undefined) {
		const current = lines[keyLine - 1] ?? "";
		const kept = /^([ \t]*(?:["']?)title(?:["']?)[ \t]*:)/.exec(current)?.[1];
		if (kept === undefined) throw new UsageError(`Cannot set the title on \`${page.path}\`: its \`title\` line reads \`${current.trim()}\`.`, "Fix the frontmatter by hand, then run the rename again.");
		lines[keyLine - 1] = `${kept} ${value}`;
		return lines.join("\n");
	}
	lines.splice(1, 0, line);
	return lines.join("\n");
}

export function renameCommand(): Command {
	return new Command("rename")
		.description(
			"Rename a page to a slug filename (ADR 0028): move <folder>/<Old Name>.md to <folder>/<slug>.md, set its `title`, and rewrite every wikilink and embed across the vault that pointed at any of the page's names, keeping displayed text. Exits 0 done, 2 usage error.",
		)
		.argument("<page>", "the page to rename, by name, alias, slug or vault path")
		.option("--title <Title>", "the page's title after the rename (default: the page's current name: its `title`, else its filename stem)")
		.option("--slug <slug>", "the new filename slug (default: the title, slugified)")
		.option("--campaign <Campaign>", "the Campaign whose log.md records the rename (default: the page's Campaign folder, else the only Campaign)")
		.option("--vault <dir>", "the Wiki folder (default: <root>/wiki)")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.option("--dry-run", "print every planned move, title and link rewrite without touching anything")
		.addHelpText(
			"after",
			`
The rename:
  <folder>/<Old Name>.md -> <folder>/<slug>.md   by \`git mv\`, falling back to a plain rename when the
                                                 file is untracked; the folder never changes
  title: "<Title>"                               set in the frontmatter, replacing a blank value
Links:
  Every wikilink and embed whose target spelled one of the page's pre-rename names (its \`title\`, an
  alias, its filename slug) or its old path is rewritten across the vault. Code spans, code blocks and
  %% %% comments are never touched; links in quoted frontmatter values rewrite like body links; log.md
  entries are history and are never rewritten; index.md is regenerated instead.
    [[Old Name]]                    [[Title]]            bare links and embeds take the new title
    [[Old Name#Head]]               [[Title#Head]]       headings and block refs are kept
    [[Old Name|custom text]]        [[slug|custom text]] displayed text is kept, target becomes the slug
  So bare links read naturally and resolve by title; piped links keep their text on the slug (ADR 0028).
Collisions:
  Refused, touching nothing: a page already at the target path, another page already using the slug, or
  another page already answering to the new title. For twins, keep the distinguishing bracket in the
  title, never the filename: --title "Otar the Foul (Creature)" --slug otar-the-foul-creature
Log:
  Each rename appends \`## [<date>] audit | Renamed <old> to <new>\` to the Campaign folder's log.md.

Exit codes:
  0  done (or nothing to do)    2  usage error

Examples:
  cf rename "Mara Voss"                       migrates to mara-voss.md and sets title: "Mara Voss"
  cf rename "Mara Voss" --dry-run             preview the move and every link rewrite
  cf rename "Otar the Foul (Creature)"        twin whose title holds brackets: title kept, slug derived
  cf rename "The Cold Hearth" --title "Cold Hearth Inn"
                                              retitle and move, rewriting [[The Cold Hearth]] links
  cf rename "The Cold Hearth" --slug cold-hearth-inn --campaign "Ashes of the Crown"`,
		)
		.action(async (pageName: string, flags: RenameFlags) => {
			const { root, vault: vaultDir } = resolveVault(flags, "rename");
			const vault = buildVault(vaultDir, await readVaultFiles(vaultDir));
			const page = resolvePage(vault, pageName);
			const fail = (message: string, hint: string): never => {
				throw new UsageError(message, hint);
			};
			if (isSpecialPage(page)) fail(`\`${page.path}\` is generated or append-only (index, log) and is not renamed.`, "Name a Wiki page, e.g. cf rename \"Mara Voss\".");

			const oldName = page.name;
			const newTitle = (flags.title ?? oldName).trim();
			if (newTitle === "") fail("No --title given, and the page's name is blank.", `Pass --title "<Title>". Example: cf rename "${page.name}" --title "Mara Voss"`);
			if (/[\r\n]/.test(newTitle)) fail("--title must be one line.", `cf rename "${page.name}" --title "Mara Voss"`);
			const newSlug = slugify(flags.slug ?? newTitle);
			if (newSlug === "") fail(`The slug of \`${flags.slug ?? newTitle}\` is empty.`, "Pass --slug <slug>: lowercase letters and hyphens, e.g. --slug cold-hearth-inn");

			const folder = page.path.slice(0, page.path.lastIndexOf("/") + 1);
			const newPath = `${folder}${newSlug}.md`;
			const fromAbs = join(vaultDir, page.path);
			const toAbs = join(vaultDir, newPath);
			if (newPath !== page.path) {
				// On a case-insensitive filesystem the target path may resolve to the page's own file: dev and inode say so.
				const ownFile = (candidate: string): boolean => {
					const a = statSync(fromAbs);
					const b = statSync(candidate);
					return a.dev === b.dev && a.ino === b.ino;
				};
				const taken = vault.pageByPath.has(newPath) || (existsSync(toAbs) && !ownFile(toAbs));
				if (taken) fail(`A page already exists at \`${newPath}\`.`, `Pick another --slug, e.g. cf rename "${page.name}" --slug ${newSlug}-2`);
				const slugClash = vault.pages.filter((p) => p !== page && p.slug.toLowerCase() === newSlug.toLowerCase());
				if (slugClash.length > 0) fail(`Another page already uses the slug \`${newSlug}\`: ${slugClash.map((p) => p.path).join(", ")}.`, "Filenames are slugs and slugs are unique (ADR 0028). Pick another --slug.");
			}
			const titleClash = vault.pages.filter((p) => p !== page && p.names.some((n) => n.toLowerCase() === newTitle.toLowerCase()));
			if (titleClash.length > 0) {
				fail(
					`Another page already answers to the title \`${newTitle}\`: ${titleClash.map((p) => p.path).join(", ")}.`,
					`Keep the distinguishing bracket in the title, not the filename (ADR 0028): --title "${newTitle} (Creature)" --slug <slug>`,
				);
			}

			const editsByPath = planLinkEdits(vault, page, newTitle, newSlug);
			const own = editsByPath.get(page.path) ?? [];
			const newSource = withTitle(applyEdits(page.source, own), page, newTitle);
			const titleWas = typeof page.frontmatter?.title === "string" && page.frontmatter.title.trim() !== "" ? page.frontmatter.title.trim() : undefined;
			const plan: PlannedFile[] = [];
			if (newPath !== page.path || newSource !== page.source) {
				plan.push({ path: newPath, content: newSource, edits: own, ...(newPath !== page.path ? { movedFrom: page.path } : {}) });
			}
			for (const [path, edits] of editsByPath) {
				if (path === page.path || edits.length === 0) continue;
				plan.push({ path, content: applyEdits(vault.pageByPath.get(path)!.source, edits), edits });
			}
			if (plan.length === 0) {
				process.stdout.write(`already renamed: \`${page.path}\` is named \`${newSlug}.md\` and titled \`${newTitle}\`\n`);
				return;
			}

			const dry = flags.dryRun ?? false;
			const show = (path: string): string => relative(process.cwd(), join(vaultDir, path)).split(sep).join("/");
			const would = (verb: string): string => (dry ? `would ${verb}` : verb);
			const out: string[] = [];

			// The renamed page's own title and move, then every other file's link rewrites, then the regenerated
			// indexes over the resulting vault, then the log entry.
			const simulated = new Map(vault.pages.map((p) => [p.path, p.source] as const));
			for (const file of plan) {
				simulated.delete(file.movedFrom ?? file.path);
				simulated.set(file.path, file.content);
			}
			const fresh = buildVault(vaultDir, { markdown: simulated, attachments: vault.attachments });
			const indexWrites: { path: string; content: string }[] = [];
			for (const [path, content] of generateIndexes(fresh)) {
				if (fresh.pageByPath.get(path)?.source === content) continue;
				indexWrites.push({ path, content });
			}

			const folders = campaignFolders(vault);
			const names = campaignNames(vault);
			const containing = [...new Set(folders.values())].filter((f) => page.path.startsWith(`${f}/`)).sort((a, b) => b.length - a.length)[0];
			const sole = names.length === 1 ? folders.get(names[0]!) : undefined;
			const campaignExample = `Example: cf rename "${page.name}" --campaign "${names[0] ?? "<Campaign>"}"`;
			const logFolder = flags.campaign !== undefined
				? (folders.has(flags.campaign) ? folders.get(flags.campaign)! : fail(`No Campaign \`${flags.campaign}\`.`, `Campaigns here: ${names.join(", ") || "none"}. ${campaignExample}`))
				: (containing ?? sole ?? fail("No --campaign given, and the page sits outside every Campaign folder.", `Campaigns here: ${names.join(", ")}. ${campaignExample}`));
			const entry = {
				date: today(),
				op: "audit",
				title: oldName.toLowerCase() === newTitle.toLowerCase() ? `Renamed ${oldName} to ${newSlug}.md` : `Renamed ${oldName} to ${newTitle}`,
				pages: [newTitle],
			};

			if (!dry) {
				for (const file of plan) {
					if (file.movedFrom === undefined) continue;
					const from = join(vaultDir, file.movedFrom);
					await mkdir(dirname(toAbs), { recursive: true });
					// git mv keeps the rename tracked; an untracked file (or no repo) falls back to a plain rename.
					if (spawnSync("git", ["mv", "--", from, toAbs], { cwd: root, stdio: "ignore" }).status !== 0) await moveFile(from, toAbs);
				}
				for (const file of plan) {
					const original = vault.pageByPath.get(file.movedFrom ?? file.path)!.source;
					if (file.content === original) continue;
					await mkdir(dirname(join(vaultDir, file.path)), { recursive: true });
					await writeFile(join(vaultDir, file.path), file.content);
				}
				for (const write of indexWrites) {
					await mkdir(dirname(join(vaultDir, write.path)), { recursive: true });
					await writeFile(join(vaultDir, write.path), write.content);
				}
			}

			for (const file of plan) {
				if (file.movedFrom !== undefined) out.push(`${would("move")}  ${show(file.movedFrom)} -> ${show(file.path)}`);
				const original = vault.pageByPath.get(file.movedFrom ?? file.path)!.source;
				if (file.content !== original) out.push(`${would("rewrite")}  ${show(file.path)}`);
				for (const edit of file.edits) out.push(`  ${edit.line}: ${edit.from} -> ${edit.to}`);
			}
			if (titleWas !== newTitle) out.push(`${would("set")}  title: "${newTitle}"${titleWas === undefined ? "" : ` (was "${titleWas}")`}`);
			for (const write of indexWrites) out.push(`${would("write")}  ${show(write.path)}`);

			const result = await appendLogEntry(vaultDir, logFolder, entry, {
				dryRun: dry,
				show,
				example: `cf log --campaign "${flags.campaign ?? names[0] ?? "<Campaign>"}" --op audit --title "Renamed ${oldName} to ${newSlug}.md" --page "${newTitle}"`,
			});
			if (result.status === "error") throw new UsageError(result.message, result.hint);
			if (result.status === "already-logged") out.push(`already logged  ${show(result.path)}`);
			else {
				if (result.rotated) out.push(`${would("rotate")}  ${show(result.rotated.from)} -> ${show(result.rotated.to)}`);
				out.push(`${would("log")}  ${show(result.path)}`, `  ${formatEntry(entry).split("\n")[0]}`);
			}

			const links = plan.reduce((n, file) => n + file.edits.length, 0);
			out.push(`${would("rename")}  ${oldName} -> ${newSlug}.md  (links rewritten: ${links} in ${plan.length} ${plan.length === 1 ? "file" : "files"})`);
			process.stdout.write(`${out.join("\n")}\n`);
		});
}
