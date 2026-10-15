import { UsageError } from "../check/run.ts";
import type { WalkResult } from "./files.ts";
import type { BackupMap } from "./map.ts";
import type { NotionApi } from "./notion.ts";
import { reconcile, type Reconciliation } from "./reconcile.ts";
import { followRenames, planBackup, runBackup, type Plan, type Scope, type SyncResult } from "./sync.ts";

/**
 * Git as the pipeline uses it: every answer is about the repo the walk came from. The command binds the real
 * functions from `./git.ts` to the repo root; tests bind fakes.
 */
export interface BackupGit {
	/** The content hash a file had at a commit, so a page whose header names it needs no rewrite. */
	hashAt(commit: string, path: string): string | undefined;
	/** Whether `base` is a commit in this clone and an ancestor of HEAD. */
	usableBase(base: string): boolean;
	/** Paths under the backup roots that changed between `base` and HEAD, renames paired. */
	diffSince(base: string): { changed: Set<string>; deleted: Set<string>; renamed: Map<string, string> };
	headCommit(): string | undefined;
	repoWebUrl(): string | undefined;
}

export interface PipelineOptions {
	walk: WalkResult;
	map: BackupMap;
	/** Writes the map out whenever the run changes it. */
	save(map: BackupMap): void;
	/** The Notion seam; a dry run passes none and plans without repairing the map. */
	api?: NotionApi;
	git: BackupGit;
	/** The scope to run, given outright; otherwise chosen from `all`/`since` and the map's synced commit. */
	scope?: Scope;
	all?: boolean;
	since?: string;
	/** Rewrite every page in scope even when its file is unchanged (after a converter change). */
	rewrite?: boolean;
	/** Plan only: nothing is sent to Notion and the map is not repaired. */
	dryRun?: boolean;
	log(line: string): void;
	now?: () => Date;
}

export interface PipelineRun {
	scope: Scope;
	/** Why the run looked at these files, as the report shows it. */
	why: string;
	/** Entries re-keyed by a rename before planning, so pages move rather than duplicate. */
	renamed: number;
	plan: Plan;
	/** What repairing the map from Notion found; present whenever an api was given. */
	reconciled?: Reconciliation;
	/** The commit pages' headers name. */
	commit?: string;
	/** A browsable source link for a repo path at that commit, as page headers carry. */
	sourceUrl(path: string): string | undefined;
	/** What the run did; present unless it was a dry run. */
	result?: SyncResult;
}

function chooseScope(options: PipelineOptions): { scope: Scope; why: string } {
	if (options.all) return { scope: { kind: "all" }, why: "--all" };
	const base = options.since ?? options.map.syncedCommit;
	if (!base) return { scope: { kind: "all" }, why: "first run: the map has no synced commit" };
	if (!options.git.usableBase(base)) {
		if (options.since)
			throw new UsageError(
				`${base} is not a commit reachable from HEAD in this clone.`,
				"cfcli backup --since <commit> (or --all for a full run)",
			);
		// A squash or rebase merge (or a force push) leaves the synced commit off main's history. Every file is then
		// compared with the content hash the map stored for it, so only files that really changed are written.
		return {
			scope: { kind: "all" },
			why: `synced commit ${base.slice(0, 7)} is not an ancestor of HEAD (squash or rebase merge, force push or shallow clone): comparing content hashes`,
		};
	}
	return { scope: { kind: "diff", base, ...options.git.diffSince(base) }, why: `changes since ${base.slice(0, 7)}` };
}

/**
 * The Backup's run order in one place: reconcile the map with Notion, choose the scope, follow renames, plan,
 * then sync. The command and the tests call this; nothing else sequences the pipeline.
 */
export async function runBackupPipeline(options: PipelineOptions): Promise<PipelineRun> {
	const { walk, map, git, log } = options;
	let reconciled: Reconciliation | undefined;
	if (options.api) {
		// Notion is the record and the map a cache: a real run repairs the map from the Backup tree before planning.
		reconciled = await reconcile({ walk, map, api: options.api, hashAt: git.hashAt, save: options.save, log });
		log(
			`reconciled with Notion: ${reconciled.adopted.length} adopted, ${reconciled.dropped.length} dropped, ${reconciled.markersAdded} markers added, ${reconciled.uploadsReused} uploads reused, ${reconciled.duplicates.length} duplicated paths, ${reconciled.foreign} unmarked pages`,
		);
	}
	const { scope, why } = options.scope
		? { scope: options.scope, why: "the scope handed to the pipeline" }
		: chooseScope(options);
	const renamed = followRenames(walk, map, scope);
	const plan = planBackup(walk, map, scope, { rewrite: options.rewrite ?? false });
	const commit = git.headCommit();
	const web = git.repoWebUrl();
	const sourceUrl = (path: string): string | undefined =>
		web ? `${web}/blob/${commit ?? "main"}/${path.split("/").map(encodeURIComponent).join("/")}` : undefined;
	if (options.dryRun)
		return {
			scope,
			why,
			renamed,
			plan,
			...(reconciled ? { reconciled } : {}),
			...(commit ? { commit } : {}),
			sourceUrl,
		};

	if (!options.api || !reconciled) throw new Error("unreachable: a real run reconciles with Notion first");
	log(
		`backing up (${scope.kind}: ${why}): ${plan.createDirs.length + plan.createFiles.length} pages to create, ${plan.writeFiles.length} to write, ${Object.values(map.entries).filter((e) => e.movedFrom !== undefined).length} to move (${renamed} renamed files), ${plan.supersededPaths.length} rename copies to trash, ${plan.retireDirs.length} folder pages to retire, ${plan.deletePaths.length + plan.deleteDirs.length} to flag deleted`,
	);
	const result = await runBackup({
		walk,
		map,
		plan,
		api: options.api,
		reconciled,
		...(commit ? { commit } : {}),
		sourceUrl,
		save: options.save,
		log,
		...(options.now ? { now: options.now } : {}),
	});
	return { scope, why, renamed, plan, reconciled, sourceUrl, ...(commit ? { commit } : {}), result };
}
