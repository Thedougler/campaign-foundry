import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Command } from "commander";
import { UsageError } from "../check/run.ts";
import { BACKUP_ROOTS, type BackupFile, titleOf, walkBackup, type WalkResult } from "../backup/files.ts";
import { diffSince, hashAt, headCommit, lfsPull, repoWebUrl, usableBase } from "../backup/git.ts";
import { loadMap, MAP_PATH, normalizeId, saveMap, type BackupMap } from "../backup/map.ts";
import { notionClient } from "../backup/notion.ts";
import { reconcile, type Reconciliation } from "../backup/reconcile.ts";
import { estimate, type Plan, planBackup, runBackup, type Scope } from "../backup/sync.ts";
import { findRepoRoot } from "./check.ts";

/** The Second Brain's "Shattered Sea (campaign)" page; the Backup root is created as its child, never written over it. */
export const DEFAULT_PARENT = "3f102166-35ec-8117-af9c-d05f042eea59";

interface BackupFlags {
	dryRun?: boolean;
	all?: boolean;
	rewrite?: boolean;
	since?: string;
	parent?: string;
	map?: string;
	tree?: boolean;
	json?: boolean;
	root?: string;
}

function chooseScope(root: string, map: BackupMap, flags: BackupFlags, walk: WalkResult): { scope: Scope; why: string } {
	if (flags.all) return { scope: { kind: "all" }, why: "--all" };
	const base = flags.since ?? map.syncedCommit;
	if (!base) return { scope: { kind: "all" }, why: "first run: the map has no synced commit" };
	if (!usableBase(root, base)) {
		if (flags.since) throw new UsageError(`${base} is not a commit reachable from HEAD in this clone.`, "cf backup --since <commit> (or --all for a full run)");
		// A squash or rebase merge (or a force push) leaves the synced commit off main's history. Every file is then
		// compared with the content hash the map stored for it, so only files that really changed are written.
		return { scope: { kind: "all" }, why: `synced commit ${base.slice(0, 7)} is not an ancestor of HEAD (squash or rebase merge, force push or shallow clone): comparing content hashes` };
	}
	return { scope: { kind: "diff", base, ...diffSince(root, base, BACKUP_ROOTS, walk.links) }, why: `changes since ${base.slice(0, 7)}` };
}

function tree(walk: WalkResult, plan: Plan): string[] {
	const create = new Set([...plan.createDirs, ...plan.createFiles.map((f) => f.path)]);
	const write = new Set(plan.writeFiles.map((f) => f.path));
	const items: { path: string; kind: string }[] = [...walk.dirs.map((path) => ({ path, kind: "dir" })), ...walk.files.map((f) => ({ path: f.path, kind: f.kind }))];
	items.sort((a, b) => a.path.localeCompare(b.path));
	return items.map(({ path, kind }) => {
		const depth = path.split("/").length - 1;
		const mark = create.has(path) ? "+" : write.has(path) ? "~" : " ";
		const title = titleOf(path, kind === "dir" ? "dir" : (kind as BackupFile["kind"]));
		return `${mark} ${"  ".repeat(depth)}${title}${kind === "dir" ? "/" : ""}`;
	});
}

export function backupCommand(): Command {
	return new Command("backup")
		.description(
			"Back up the Shattered Sea Wiki, the agent skills and their images to Notion, under a child page of the Second Brain's Shattered Sea (campaign) page. Each directory becomes a page and each file a page; the committed map .notion/backup-map.json keys every page by repo path, so reruns update instead of duplicating. Needs NOTION_TOKEN except for a dry run. Exits 0 on success, 1 when any page failed, 2 on a usage error.",
		)
		.option("--dry-run", "plan only: print counts and the block and request estimate without calling Notion")
		.option("--all", "look at every file, not only the ones changed since the map's synced commit")
		.option("--rewrite", "rewrite every page in scope even when its file is unchanged (after a converter change)")
		.option("--since <commit>", "diff from this commit instead of the map's synced commit")
		.option("--parent <page>", `Notion page id or URL to put the Backup root under (default: $NOTION_BACKUP_PARENT or ${DEFAULT_PARENT})`)
		.option("--map <file>", `the path-to-page map (default: <root>/${MAP_PATH})`)
		.option("--tree", "also print the planned page tree (+ create, ~ write)")
		.option("--json", "print machine-readable JSON instead of text")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.addHelpText(
			"after",
			`
What it does:
  Walks ${BACKUP_ROOTS.join(" and ")} (symlinks followed once; .obsidian/, node_modules/, src/ and lockfiles skipped),
  creates a page per directory and per file under the Backup root, then writes each file's content:
    Markdown   converted to Notion blocks: [[wikilinks]] become links to the backed-up page, > [!type] callouts become
               callouts, statblock and base fences stay as YAML code, frontmatter becomes a YAML code block
    images     uploaded once through the File Upload API and shown on their own page and inline wherever embedded
    other text YAML, JSON, scripts and licences as code blocks
  Before planning, a real run reads the Backup tree in Notion and repairs the map from each page's marker, so a lost or
  stale map never makes a page twice. A push run diffs the map's synced commit to HEAD and touches only those files; a
  file deleted from the repo keeps its page, retitled "(deleted from repo)". Requests are throttled to about 3 a second
  and retried on 429 and 5xx.

Examples:
  cf backup --dry-run                       counts and estimate for the next run
  cf backup --dry-run --all --tree          the full planned page tree
  NOTION_TOKEN=... cf backup                back up what changed since the last run (everything on the first run)
  NOTION_TOKEN=... cf backup --all          re-check every file against the map`,
		)
		.action(async (flags: BackupFlags) => {
			const root = flags.root ? resolve(process.cwd(), flags.root) : findRepoRoot(process.cwd());
			let parent: string;
			try {
				parent = normalizeId(flags.parent || process.env.NOTION_BACKUP_PARENT || DEFAULT_PARENT);
			} catch (error) {
				throw new UsageError((error as Error).message, "cf backup --parent <Notion page id or URL>");
			}
			const mapFile = resolve(root, flags.map ?? MAP_PATH);
			const map = loadMap(mapFile, parent);
			const token = process.env.NOTION_TOKEN;
			if (!flags.dryRun && !token) throw new UsageError("NOTION_TOKEN is not set.", "Set it to a Notion internal integration token shared with the parent page, or run cf backup --dry-run.");

			const walk = walkBackup(root);
			const log = (line: string): void => {
				if (!flags.json) process.stderr.write(`${line}\n`);
			};
			// Notion is the record and the map a cache: a real run repairs the map from the Backup tree before planning.
			const api = flags.dryRun ? undefined : notionClient(token ?? "");
			let reconciled: Reconciliation | undefined;
			if (api) {
				reconciled = await reconcile({ walk, map, api, hashAt: (commit, path) => hashAt(root, commit, path, walk.links), save: (m) => saveMap(mapFile, m), log });
				log(`reconciled with Notion: ${reconciled.adopted.length} adopted, ${reconciled.dropped.length} dropped, ${reconciled.markersAdded} markers added, ${reconciled.uploadsReused} uploads reused, ${reconciled.duplicates.length} duplicated paths, ${reconciled.foreign} unmarked pages`);
			}
			const { scope, why } = chooseScope(root, map, flags, walk);
			const plan = planBackup(walk, map, scope, { rewrite: flags.rewrite ?? false });
			const commit = headCommit(root);
			const web = repoWebUrl(root);
			const sourceUrl = (path: string): string | undefined => (web ? `${web}/blob/${commit ?? "main"}/${path.split("/").map(encodeURIComponent).join("/")}` : undefined);
			const est = estimate(walk, map, plan, (f) => readFileSync(f.abs, "utf8"));
			const summary = {
				scope: scope.kind,
				why,
				create: { root: plan.createRoot, dirs: plan.createDirs.length, files: plan.createFiles.length },
				write: plan.writeFiles.length,
				delete: plan.deletePaths.length,
				skipped: walk.skipped.length,
			};

			if (flags.dryRun) {
				if (flags.json) {
					process.stdout.write(`${JSON.stringify({ ok: true, dryRun: true, ...summary, estimate: est, skippedPaths: walk.skipped, deletePaths: plan.deletePaths, tree: flags.tree ? tree(walk, plan) : undefined }, null, 2)}\n`);
					return;
				}
				const mb = (est.imageBytes / 1024 / 1024).toFixed(1);
				const out = [
					`would back up (${scope.kind}: ${why}) under ${parent}`,
					`  files      ${est.markdown} Markdown, ${est.text} other text, ${est.images} images (${mb} MB, ${est.lfsPointers} as LFS pointers here)`,
					`  skills     ${est.skills} under .agents/skills (.claude/skills not walked: its entries link here)`,
					`  pages      ${plan.createRoot ? "backup root + " : ""}${plan.createDirs.length} directory and ${plan.createFiles.length} file pages to create`,
					`  write      ${plan.writeFiles.length} pages, ~${est.blocks} blocks`,
					`  delete     ${plan.deletePaths.length} pages to flag as deleted from repo`,
					`  requests   ~${est.requests} at 3/s, about ${est.minutes} min`,
					`  skipped    ${walk.skipped.length} paths (${[...new Set(walk.skipped.map((s) => s.reason))].join("; ") || "none"})`,
				];
				if (flags.tree) out.push("", ...tree(walk, plan));
				out.push("", "(dry run: nothing sent to Notion, and only the map read; a real run first repairs the map from the Backup tree in Notion)");
				process.stdout.write(`${out.join("\n")}\n`);
				return;
			}

			if (!api || !reconciled) throw new Error("unreachable: a real run reconciles with Notion first");
			log(`backing up (${scope.kind}: ${why}): ${plan.createDirs.length + plan.createFiles.length} pages to create, ${plan.writeFiles.length} to write, ${plan.deletePaths.length} to flag deleted`);
			const result = await runBackup({
				walk,
				map,
				plan,
				api,
				reconciled,
				...(commit ? { commit } : {}),
				sourceUrl,
				save: (m) => saveMap(mapFile, m),
				// git knows a file under a followed symlink by its target path.
				lfsPull: async (paths) =>
					lfsPull(
						root,
						paths.map((p) => {
							const link = walk.links.find((l) => p.startsWith(`${l.alias}/`));
							return link ? link.target + p.slice(link.alias.length) : p;
						}),
					),
				log,
			});
			if (flags.json) process.stdout.write(`${JSON.stringify({ ok: result.failures.length === 0, ...summary, result, root: map.root ?? null }, null, 2)}\n`);
			else {
				process.stdout.write(
					[
						`backed up: ${result.created} pages created, ${result.written} written, ${result.uploaded} images uploaded, ${result.deleted} flagged deleted`,
						`root: ${map.root?.url ?? "(not created)"}`,
						result.syncedCommit ? `synced commit: ${result.syncedCommit.slice(0, 7)}` : "synced commit unchanged: rerun to retry the failures",
						...(result.failures.length > 0 ? ["", "failures:", ...result.failures.map((f) => `  - ${f.path}: ${f.error}`)] : []),
					].join("\n") + "\n",
				);
			}
			if (result.failures.length > 0) process.exitCode = 1;
		});
}
