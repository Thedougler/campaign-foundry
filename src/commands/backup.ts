import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Command } from "commander";
import { UsageError } from "../check/run.ts";
import { BACKUP_ROOTS, type BackupFile, titleOf, walkBackup, type WalkResult } from "../backup/files.ts";
import { backupGit } from "../backup/git.ts";
import { loadMap, MAP_PATH, normalizeId, saveMap } from "../backup/map.ts";
import { notionClient } from "../backup/notion.ts";
import { runBackupPipeline } from "../backup/pipeline.ts";
import { estimate, type Plan } from "../backup/sync.ts";
import { CF, resolveRoot, rootOption } from "./kit.ts";

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

function tree(walk: WalkResult, plan: Plan): string[] {
	const create = new Set([...plan.createDirs, ...plan.createFiles.map((f) => f.path)]);
	const write = new Set(plan.writeFiles.map((f) => f.path));
	const items: { path: string; kind: BackupFile["kind"] | "dir"; title?: string; aliases?: string[] }[] = [
		...walk.dirs.map((path) => ({ path, kind: "dir" as const })),
		...walk.files,
	];
	items.sort((a, b) => a.path.localeCompare(b.path));
	const marked = ({
		path,
		kind,
		title: pageTitle,
		aliases,
	}: {
		path: string;
		kind: BackupFile["kind"] | "dir";
		title?: string;
		aliases?: string[];
	}): string => {
		const depth = path.split("/").length - 1;
		const mark = create.has(path) ? "+" : write.has(path) ? "~" : " ";
		const title = titleOf(path, kind, pageTitle, aliases);
		return `${mark} ${"  ".repeat(depth)}${title}${kind === "dir" ? "/" : ""}`;
	};
	return items.map(marked);
}

export function backupCommand(): Command {
	const command = new Command("backup")
		.description(
			"Back up the Shattered Sea Wiki, the agent skills and their images to Notion, under a child page of the Second Brain's Shattered Sea (campaign) page. Each directory becomes a page and each file a page; the committed map .notion/backup-map.json keys every page by repo path, so reruns update instead of duplicating. Needs NOTION_TOKEN except for a dry run. Exits 0 on success, 1 when any page failed, 2 on a usage error.",
		)
		.option("--dry-run", "plan only: print counts and the block and request estimate without calling Notion")
		.option("--all", "look at every file, not only the ones changed since the map's synced commit")
		.option("--rewrite", "rewrite every page in scope even when its file is unchanged (after a converter change)")
		.option("--since <commit>", "diff from this commit instead of the map's synced commit")
		.option(
			"--parent <page>",
			`Notion page id or URL to put the Backup root under (default: $NOTION_BACKUP_PARENT or ${DEFAULT_PARENT})`,
		)
		.option("--map <file>", `the path-to-page map (default: <root>/${MAP_PATH})`)
		.option("--tree", "also print the planned page tree (+ create, ~ write)")
		.option("--json", "print machine-readable JSON instead of text");
	rootOption(command);
	return command
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
  Wiki content uses its frontmatter title (or first alias); technical documents and attachments keep filename labels.
  Slug paths key the map, and a deleted content page retains its last backed-up title.
  Before planning, a real run reads the Backup tree in Notion and repairs the map from each page's marker, so a lost or
  stale map never makes a page twice. A push run diffs the map's synced commit to HEAD and touches only those files; a
  file deleted from the repo keeps its page, retitled "(deleted from repo)". Requests are throttled to about 3 a second
  and retried on 429 and 5xx.

Examples:
  ${CF} backup --dry-run                       counts and estimate for the next run
  ${CF} backup --dry-run --all --tree          the full planned page tree
  NOTION_TOKEN=... ${CF} backup                back up what changed since the last run (everything on the first run)
  NOTION_TOKEN=... ${CF} backup --all          re-check every file against the map`,
		)
		.action(async (flags: BackupFlags) => {
			const root = resolveRoot(flags.root);
			let parent: string;
			try {
				parent = normalizeId(flags.parent || process.env.NOTION_BACKUP_PARENT || DEFAULT_PARENT);
			} catch (error) {
				throw new UsageError((error as Error).message, `${CF} backup --parent <Notion page id or URL>`);
			}
			const mapFile = resolve(root, flags.map ?? MAP_PATH);
			const map = loadMap(mapFile, parent);
			const token = process.env.NOTION_TOKEN;
			if (!flags.dryRun && !token)
				throw new UsageError(
					"NOTION_TOKEN is not set.",
					`Set it to a Notion internal integration token shared with the parent page, or run ${CF} backup --dry-run.`,
				);

			const walk = walkBackup(root);
			const log = (line: string): void => {
				if (!flags.json) process.stderr.write(`${line}\n`);
			};
			const run = await runBackupPipeline({
				walk,
				map,
				save: (m) => saveMap(mapFile, m),
				...(flags.dryRun ? { dryRun: true } : { api: notionClient(token ?? "") }),
				git: backupGit(root, walk),
				...(flags.all ? { all: true } : {}),
				...(flags.since ? { since: flags.since } : {}),
				...(flags.rewrite ? { rewrite: true } : {}),
				log,
			});
			const { scope, why, plan, renamed } = run;
			const summary = {
				scope: scope.kind,
				why,
				create: { root: plan.createRoot, dirs: plan.createDirs.length, files: plan.createFiles.length },
				write: plan.writeFiles.length,
				move: Object.values(map.entries).filter((e) => e.movedFrom !== undefined).length,
				renamed,
				retire: plan.retireDirs.length,
				superseded: plan.supersededPaths.length,
				delete: plan.deletePaths.length + plan.deleteDirs.length,
				skipped: walk.skipped.length,
			};

			if (flags.dryRun) {
				const est = estimate(walk, map, plan, (f) => readFileSync(f.abs, "utf8"));
				if (flags.json) {
					process.stdout.write(
						`${JSON.stringify({ ok: true, dryRun: true, ...summary, estimate: est, skippedPaths: walk.skipped, deletePaths: plan.deletePaths, tree: flags.tree ? tree(walk, plan) : undefined }, null, 2)}\n`,
					);
					return;
				}
				const mb = (est.imageBytes / 1024 / 1024).toFixed(1);
				const out = [
					`would back up (${scope.kind}: ${why}) under ${parent}`,
					`  files      ${est.markdown} Markdown, ${est.text} other text, ${est.images} images (${mb} MB)`,
					`  skills     ${est.skills} under .agents/skills (.claude/skills not walked: its entries link here)`,
					`  pages      ${plan.createRoot ? "backup root + " : ""}${plan.createDirs.length} directory and ${plan.createFiles.length} file pages to create`,
					`  write      ${plan.writeFiles.length} pages, ~${est.blocks} blocks`,
					...(summary.move > 0 ? [`  move       ${summary.move} pages to re-parent under their new folder pages`] : []),
					...(summary.retire > 0
						? [`  retire     ${summary.retire} folder pages the repo no longer holds, trashed once empty`]
						: []),
					...(summary.superseded > 0
						? [`  trash      ${summary.superseded} copies a rename left beside the file's live page`]
						: []),
					`  delete     ${summary.delete} pages to flag as deleted from repo`,
					`  requests   ~${est.requests} at 3/s, about ${est.minutes} min`,
					`  skipped    ${walk.skipped.length} paths (${[...new Set(walk.skipped.map((s) => s.reason))].join("; ") || "none"})`,
				];
				if (flags.tree) out.push("", ...tree(walk, plan));
				out.push(
					"",
					"(dry run: nothing sent to Notion, and only the map read; a real run first repairs the map from the Backup tree in Notion)",
				);
				process.stdout.write(`${out.join("\n")}\n`);
				return;
			}

			const result = run.result;
			if (!result) throw new Error("unreachable: a real run syncs with Notion");
			if (flags.json)
				process.stdout.write(
					`${JSON.stringify({ ok: result.failures.length === 0, ...summary, result, root: map.root ?? null }, null, 2)}\n`,
				);
			else {
				process.stdout.write(
					`${[
						`backed up: ${result.created} pages created, ${result.written} written, ${result.moved} moved, ${result.superseded} rename copies trashed, ${result.retired} retired, ${result.uploaded} images uploaded, ${result.deleted} flagged deleted`,
						`root: ${map.root?.url ?? "(not created)"}`,
						result.syncedCommit
							? `synced commit: ${result.syncedCommit.slice(0, 7)}`
							: "synced commit unchanged: rerun to retry the failures",
						...(result.failures.length > 0
							? ["", "failures:", ...result.failures.map((f) => `  - ${f.path}: ${f.error}`)]
							: []),
					].join("\n")}\n`,
				);
			}
			if (result.failures.length > 0) process.exitCode = 1;
		});
}
