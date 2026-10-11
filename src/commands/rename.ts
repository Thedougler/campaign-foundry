import { existsSync, statSync } from "node:fs";
import { mkdir, rename as moveFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { Command } from "commander";
import { UsageError } from "../check/run.ts";
import { isFixedPage } from "../check/views.ts";
import { gitMove } from "../backup/git.ts";
import { slugify } from "../vault/dialect.ts";
import { appendLogEntry, formatEntry, today } from "../vault/log.ts";
import { campaignFolders, campaignNames, generateIndexes } from "../vault/indexes.ts";
import { pageKeys } from "../vault/links.ts";
import { resolvePage } from "../vault/resolve.ts";
import { applyEdits, type LinkEdit, planLinkEdits, type LinkSpan } from "../vault/rewrite.ts";
import type { Page, Vault } from "../vault/types.ts";
import { buildVault, readVaultFiles } from "../vault/vault.ts";
import { campaignFolderOf, CF, envOptions, resolveEnv } from "./kit.ts";

interface RenameFlags {
	title?: string;
	slug?: string;
	campaign?: string;
	dryRun?: boolean;
	json?: boolean;
	vault?: string;
	root?: string;
}

/** One file the rename touches: the moved page itself, or any page whose links to it are rewritten. */
interface PlannedFile {
	path: string;
	content: string;
	edits: LinkEdit[];
	/** Set when the file is the renamed page and its path changes. */
	movedFrom?: string;
}

/** The link renamed to the page's new slug: fragments survive, custom display text survives, a bare link gains the title. */
function renamedLink(span: LinkSpan, newTitle: string, newSlug: string): string {
	const link = span.link;
	const bar = span.inner.indexOf("|");
	const head = bar === -1 ? span.inner : span.inner.slice(0, bar).replace(/\\$/, "");
	const aliasPart = bar === -1 ? undefined : span.inner.slice(bar + 1);
	const segments = head.split("#");
	const head0 = segments[0] ?? "";
	const newHead0 = head0.includes(link.target) ? head0.replace(link.target, newSlug) : newSlug;
	const newHead = [newHead0, ...segments.slice(1)].join("#");
	// Every rewritten target is the stable slug; existing custom text survives, otherwise show the title.
	const separator = span.table || (bar !== -1 && span.inner[bar - 1] === "\\") ? "\\|" : "|";
	return `${link.embed ? "!" : ""}[[${newHead}${separator}${aliasPart ?? newTitle}]]`;
}

/** Every link edit the rename makes, keyed by the page holding the link; pages without edits are absent. */
function planPageLinkEdits(vault: Vault, page: Page, newTitle: string, newSlug: string): Map<Page, LinkEdit[]> {
	// index.md is regenerated after the rename; log.md entries are append-only history.
	return planLinkEdits(
		vault.pages.filter((holder) => !isFixedPage(holder)),
		new Set(pageKeys(page)),
		(span) => renamedLink(span, newTitle, newSlug),
	);
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
		if (kept === undefined)
			throw new UsageError(
				`Cannot set the title on \`${page.path}\`: its \`title\` line reads \`${current.trim()}\`.`,
				"Fix the frontmatter by hand, then run the rename again.",
			);
		lines[keyLine - 1] = `${kept} ${value}`;
		return lines.join("\n");
	}
	lines.splice(1, 0, line);
	return lines.join("\n");
}

export function renameCommand(): Command {
	const command = new Command("rename")
		.description(
			"Rename a page to a slug filename (ADR 0028): move <folder>/<Old Name>.md to <folder>/<slug>.md, set its `title`, and rewrite every wikilink and embed across the vault that pointed at any of the page's names, keeping displayed text. Exits 0 done, 2 usage error.",
		)
		.argument("<page>", "the page to rename, by name, alias, slug or vault path")
		.option(
			"--title <Title>",
			"the page's title after the rename (default: its current title, else first alias; required if neither exists)",
		)
		.option("--slug <slug>", "the new filename slug (default: the title, slugified)")
		.option(
			"--campaign <Campaign>",
			"the Campaign whose log.md records the rename (default: the page's Campaign folder, else the only Campaign)",
		);
	envOptions(command);
	return command
		.option("--dry-run", "print every planned move, title and link rewrite without touching anything")
		.option("--json", "print {status,move,title,rewrites,indexes,log} JSON instead of text")
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
    [[Old Name]]                    [[slug|Title]]            bare links gain the display title
    [[Old Name#Head]]               [[slug#Head|Title]]       headings and block refs are kept
    ![[Old Name]]                   ![[slug|Title]]           embeds keep their ! marker
    [[Old Name|custom text]]        [[slug|custom text]]       custom displayed text is kept
  Every rewritten target is the stable slug; the pipe keeps the title or existing custom text visible.
  In Markdown tables the alias pipe is escaped as \\| so it does not split the cell. Existing escaped
  custom labels stay escaped, without doubling the backslash.
Collisions:
  Refused, touching nothing: a page already at the target path, another page already using the slug, or
  another page already answering to the new title. For twins, keep the distinguishing bracket in the
  title, never the filename: --title "Otar the Foul (Creature)" --slug otar-the-foul-creature
Log:
  Each rename appends \`## [<date>] audit | Renamed <old> to <new>\` to the Campaign folder's log.md,
  with a \`[[slug|Title]]\` page reference.

Exit codes:
  0  done (or nothing to do)    2  usage error

Examples:
  ${CF} rename "Mara Voss" --title "Mara Voss"   migrate a titleless page using its explicit display title
  ${CF} rename "Mara Voss" --title "Mara Voss" --dry-run
                                              preview the move and every link rewrite
  ${CF} rename "Otar the Foul (Creature)" --title "Otar the Foul (Creature)"
                                              keep the distinguishing title, derive the slug
  ${CF} rename "The Cold Hearth" --title "Cold Hearth Inn"
                                              retitle and move, rewriting [[The Cold Hearth]] links
  ${CF} rename "The Cold Hearth" --title "The Cold Hearth" --slug cold-hearth-inn --campaign "Ashes of the Crown"`,
		)
		.action(async (pageName: string, flags: RenameFlags) => {
			const { root, vault: vaultDir } = resolveEnv(flags, "rename");
			const vault = buildVault(vaultDir, await readVaultFiles(vaultDir));
			const page = resolvePage(vault, pageName, {
				hint: (candidate) => (candidate ? `${CF} rename "${candidate}"` : `Example: ${CF} rename "Mara Voss"`),
			});
			const fail = (message: string, hint: string): never => {
				throw new UsageError(message, hint);
			};
			if (isFixedPage(page))
				fail(
					`\`${page.path}\` is generated or append-only (index, log) and is not renamed.`,
					`Name a Wiki page, e.g. ${CF} rename "Mara Voss".`,
				);

			const oldName = page.name || page.path;
			const newTitle = (flags.title ?? page.name).trim();
			if (newTitle === "")
				fail("The page has no title or alias; --title is required.", `${CF} rename "${page.path}" --title "<Title>"`);
			if (/[\r\n]/.test(newTitle)) fail("--title must be one line.", `${CF} rename "${page.path}" --title "<Title>"`);
			const newSlug = slugify(flags.slug ?? newTitle);
			if (newSlug === "")
				fail(
					`The slug of \`${flags.slug ?? newTitle}\` is empty.`,
					"Pass --slug <slug>: lowercase letters and hyphens, e.g. --slug cold-hearth-inn",
				);

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
				const taken = existsSync(toAbs) && !ownFile(toAbs);
				if (taken)
					fail(
						`A page already exists at \`${newPath}\`.`,
						`Pick another --slug, e.g. ${CF} rename "${page.name}" --slug ${newSlug}-2`,
					);
				const slugClash = vault.pages.filter((p) => p !== page && p.slug.toLowerCase() === newSlug.toLowerCase());
				if (slugClash.length > 0)
					fail(
						`Another page already uses the slug \`${newSlug}\`: ${slugClash.map((p) => p.path).join(", ")}.`,
						"Filenames are slugs and slugs are unique (ADR 0028). Pick another --slug.",
					);
			}
			const titleClash = vault.pages.filter(
				(p) => p !== page && p.names.some((n) => n.toLowerCase() === newTitle.toLowerCase()),
			);
			if (titleClash.length > 0) {
				fail(
					`Another page already answers to the title \`${newTitle}\`: ${titleClash.map((p) => p.path).join(", ")}.`,
					`Keep the distinguishing bracket in the title, not the filename (ADR 0028): --title "${newTitle} (Creature)" --slug <slug>`,
				);
			}

			const edits = planPageLinkEdits(vault, page, newTitle, newSlug);
			const own = edits.get(page) ?? [];
			const newSource = withTitle(applyEdits(page.source, own), page, newTitle);
			const titleWas =
				typeof page.frontmatter?.title === "string" && page.frontmatter.title.trim() !== ""
					? page.frontmatter.title.trim()
					: undefined;
			const plan: PlannedFile[] = [];
			if (newPath !== page.path || newSource !== page.source) {
				plan.push({
					path: newPath,
					content: newSource,
					edits: own,
					...(newPath !== page.path ? { movedFrom: page.path } : {}),
				});
			}
			for (const [holder, holderEdits] of edits) {
				if (holder === page || holderEdits.length === 0) continue;
				plan.push({ path: holder.path, content: applyEdits(holder.source, holderEdits), edits: holderEdits });
			}
			if (plan.length === 0) {
				if (flags.json)
					process.stdout.write(
						`${JSON.stringify({ status: "already-renamed", page: page.path, slug: newSlug, title: newTitle }, null, 2)}\n`,
					);
				else
					process.stdout.write(
						`already renamed: \`${page.path}\` is named \`${newSlug}.md\` and titled \`${newTitle}\`\n`,
					);
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
			const containing = [...new Set(folders.values())]
				.filter((f) => page.path.startsWith(`${f}/`))
				.sort((a, b) => b.length - a.length)[0];
			const sole = names.length === 1 ? folders.get(names[0]!) : undefined;
			const campaignExample = `Example: ${CF} rename "${page.name}" --campaign "${names[0] ?? "<Campaign>"}"`;
			const logFolder =
				flags.campaign !== undefined
					? campaignFolderOf(vault, flags.campaign, campaignExample)
					: (containing ??
						sole ??
						fail(
							"No --campaign given, and the page sits outside every Campaign folder.",
							`Campaigns here: ${names.join(", ")}. ${campaignExample}`,
						));
			const entry = {
				date: today(),
				op: "audit",
				title:
					oldName.toLowerCase() === newTitle.toLowerCase()
						? `Renamed ${oldName} to ${newSlug}.md`
						: `Renamed ${oldName} to ${newTitle}`,
				pages: [`${newSlug}|${newTitle}`],
			};

			if (!dry) {
				for (const file of plan) {
					if (file.movedFrom === undefined) continue;
					const from = join(vaultDir, file.movedFrom);
					await mkdir(dirname(toAbs), { recursive: true });
					// git mv keeps the rename tracked; an untracked file (or no repo) falls back to a plain rename.
					if (!gitMove(root, from, toAbs)) await moveFile(from, toAbs);
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
			if (titleWas !== newTitle)
				out.push(`${would("set")}  title: "${newTitle}"${titleWas === undefined ? "" : ` (was "${titleWas}")`}`);
			for (const write of indexWrites) out.push(`${would("write")}  ${show(write.path)}`);

			const result = await appendLogEntry(vaultDir, logFolder, entry, {
				dryRun: dry,
				show,
				example: `${CF} log --campaign "${flags.campaign ?? names[0] ?? "<Campaign>"}" --op audit --title "Renamed ${oldName} to ${newSlug}.md" --page "${newTitle}"`,
			});
			if (result.status === "error") throw new UsageError(result.message, result.hint);
			if (result.status === "already-logged") out.push(`already logged  ${show(result.path)}`);
			else {
				if (result.rotated) out.push(`${would("rotate")}  ${show(result.rotated.from)} -> ${show(result.rotated.to)}`);
				out.push(`${would("log")}  ${show(result.path)}`, `  ${formatEntry(entry).split("\n")[0]}`);
			}

			const links = plan.reduce((n, file) => n + file.edits.length, 0);
			out.push(
				`${would("rename")}  ${oldName} -> ${newSlug}.md  (links rewritten: ${links} in ${plan.length} ${plan.length === 1 ? "file" : "files"})`,
			);
			if (flags.json) {
				process.stdout.write(
					`${JSON.stringify(
						{
							status: "renamed",
							dryRun: dry,
							move: newPath !== page.path ? { from: page.path, to: newPath } : null,
							title:
								titleWas !== newTitle ? { to: newTitle, ...(titleWas === undefined ? {} : { was: titleWas }) } : null,
							rewrites: plan.map((file) => ({
								page: file.path,
								edits: file.edits.map((e) => ({ line: e.line, from: e.from, to: e.to })),
							})),
							indexes: indexWrites.map((w) => w.path),
							log: {
								status: result.status,
								path: result.path,
								rotated: result.status === "already-logged" ? null : (result.rotated ?? null),
							},
							links,
							files: plan.length,
						},
						null,
						2,
					)}\n`,
				);
				return;
			}
			process.stdout.write(`${out.join("\n")}\n`);
		});
}
