import { readFileSync } from "node:fs";
import { dirname, posix } from "node:path";
import { type Block, chunkBlocks, type ConvertContext, countBlocks, markdownToBlocks, textFileToBlocks, textItems } from "./blocks.ts";
import { type BackupFile, contentHash, type FileKind, inBackupRoots, titleOf, type WalkResult } from "./files.ts";
import { type BackupMap, type MapEntry, pageUrl } from "./map.ts";
import { dirMarker, headerBlock, markerOf, pendingHeader, ROOT_TITLE, rootCallout } from "./markers.ts";
import { contentTypeOf, type NotionApi } from "./notion.ts";
import { type Duplicate, type Reconciliation, sameId } from "./reconcile.ts";

export { headerBlock } from "./markers.ts";

/** Single-part uploads carry at most 20 MiB; larger files need multi-part, which the Backup does not do yet. */
export const SINGLE_PART_LIMIT = 20 * 1024 * 1024;

export const ICONS: Record<FileKind | "dir" | "root" | "deleted", string> = { root: "🗄️", dir: "📁", markdown: "📄", text: "🧾", image: "🖼️", deleted: "🗑️" };

/** Which files a run looks at: every file (the first run, `--all`) or the ones a git diff names (a push). */
export type Scope = { kind: "all" } | { kind: "diff"; base: string; changed: Set<string>; deleted: Set<string> };

export interface Plan {
	createRoot: boolean;
	createDirs: string[];
	createFiles: BackupFile[];
	/** Files whose page content is (re)written: new pages and changed files. */
	writeFiles: BackupFile[];
	/** Map paths whose file left the repo: flagged in Notion, never trashed. */
	deletePaths: string[];
}

/** Works out what a run must do from the files on disk, the map and the scope. Pure: no Notion, no git. */
export function planBackup(walk: WalkResult, map: BackupMap, scope: Scope, options: { rewrite?: boolean } = {}): Plan {
	const live = (path: string): MapEntry | undefined => {
		const e = map.entries[path];
		return e && !e.deletedAt ? e : undefined;
	};
	const createDirs = walk.dirs.filter((d) => !live(d));
	const createFiles = walk.files.filter((f) => !live(f.path));
	const inScope = (f: BackupFile): boolean => scope.kind === "all" || scope.changed.has(f.path) || !live(f.path);
	const writeFiles = walk.files.filter((f) => {
		// A page whose path the layout changed is rewritten whatever the scope, so its header names the new path.
		if (live(f.path)?.movedFrom !== undefined) return true;
		if (!inScope(f)) return false;
		const e = live(f.path);
		if (!e || options.rewrite) return true;
		if (e.hash !== f.hash) return true;
		return f.kind === "image" && !e.fileUploadId && scope.kind === "all";
	});
	const onDisk = new Set(walk.files.map((f) => f.path));
	const deletePaths = Object.entries(map.entries)
		.filter(([path, e]) => e.kind !== "dir" && !e.deletedAt && !onDisk.has(path))
		.filter(([path]) => (scope.kind === "all" ? inBackupRoots(path) : scope.deleted.has(path)))
		.map(([path]) => path)
		.sort();
	return { createRoot: !map.root, createDirs, createFiles, writeFiles, deletePaths };
}

export interface SyncOptions {
	walk: WalkResult;
	map: BackupMap;
	plan: Plan;
	api: NotionApi;
	/** The commit being backed up, recorded as `syncedCommit` once every change is in Notion. */
	commit?: string;
	/** A browsable source link for a repo path at the commit (GitHub blob URL). */
	sourceUrl(path: string): string | undefined;
	/** Persists the map; called after every Notion write so a cancelled run never forgets a page it made. */
	save(map: BackupMap): void;
	/** What `reconcile` found in Notion just before this run; the root is created only when it saw none. */
	reconciled: Pick<Reconciliation, "rootAbsent">;
	/** Pulls the real bytes of LFS pointer files before their upload (`git lfs pull --include`). */
	lfsPull(paths: string[]): Promise<void>;
	log(line: string): void;
	now?: () => Date;
}

export interface SyncResult {
	created: number;
	written: number;
	moved: number;
	retired: number;
	uploaded: number;
	deleted: number;
	failures: { path: string; error: string }[];
	/** Pages another run made for a path at the same moment as this one (the older page is kept). */
	duplicates: Duplicate[];
	syncedCommit?: string;
}

/** Thrown when a concurrent run made the same page first: this run's copy is trashed and the run stops; rerun it. */
export class ConcurrentRunError extends Error {}

const lower = (s: string): string => s.toLowerCase();
const stripMd = (s: string): string => s.replace(/\.(md|markdown)$/i, "");

/**
 * Indexes the backed-up files by Obsidian name and by path, so `[[Name]]`, `[[Folder/Name]]` and embeds resolve.
 * A markdown page answers to its frontmatter `title` and `aliases` too, before its file name (ADR 0028).
 */
export function linkIndex(files: BackupFile[]): { page(target: string): string | undefined; image(target: string): string | undefined } {
	const pagesByName = new Map<string, string[]>();
	const pagesByPath = new Map<string, string>();
	const imagesByName = new Map<string, string[]>();
	for (const f of files) {
		const name = lower(f.path.slice(f.path.lastIndexOf("/") + 1));
		if (f.kind === "markdown") {
			const key = stripMd(name);
			pagesByName.set(key, [...(pagesByName.get(key) ?? []), f.path]);
			for (const n of [f.title, ...(f.aliases ?? [])]) {
				if (n === undefined || n === "") continue;
				const nameKey = lower(n);
				pagesByName.set(nameKey, [...(pagesByName.get(nameKey) ?? []), f.path]);
			}
			const vaultPath = f.path.startsWith("wiki/") ? f.path.slice(5) : f.path;
			pagesByPath.set(lower(stripMd(vaultPath)), f.path);
			pagesByPath.set(lower(stripMd(f.path)), f.path);
		} else if (f.kind === "image") {
			imagesByName.set(name, [...(imagesByName.get(name) ?? []), f.path]);
		}
	}
	// Obsidian picks the shortest path when a name is ambiguous.
	const shortest = (paths: string[] | undefined): string | undefined => paths?.slice().sort((a, b) => a.length - b.length || a.localeCompare(b))[0];
	return {
		page(target) {
			const t = lower(stripMd(target.trim()));
			return pagesByPath.get(t) ?? shortest(pagesByName.get(t.slice(t.lastIndexOf("/") + 1)));
		},
		image(target) {
			const t = lower(target.trim());
			return shortest(imagesByName.get(t.slice(t.lastIndexOf("/") + 1)));
		},
	};
}

/** The conversion context for one file: links resolve to Notion pages in the map, embeds to uploaded images. */
export function contextFor(file: { path: string }, map: BackupMap, index: ReturnType<typeof linkIndex>, sourceUrl: (path: string) => string | undefined): ConvertContext {
	const dir = dirname(file.path);
	const resolveRelative = (href: string): string | undefined => {
		let decoded = href;
		try {
			decoded = decodeURI(href);
		} catch {
			/* keep as written */
		}
		const clean = decoded.split("#")[0] ?? "";
		if (!clean || /^[a-z]+:/i.test(clean)) return undefined;
		return posix.normalize(posix.join(dir, clean));
	};
	return {
		link: (target) => {
			const path = index.page(target);
			return path ? pageUrl(map, path) : undefined;
		},
		relative: (href) => {
			const path = resolveRelative(href);
			if (!path) return undefined;
			return pageUrl(map, path) ?? (inBackupRoots(path) ? undefined : sourceUrl(path));
		},
		image: (target) => {
			if (/^https?:\/\//i.test(target)) return { url: target };
			const path = index.image(target) ?? resolveRelative(target);
			const upload = path ? map.entries[path]?.fileUploadId : undefined;
			return upload ? { fileUploadId: upload } : undefined;
		},
	};
}

/** The blocks a file's page holds below its header. */
export function pageBody(file: BackupFile, source: string, ctx: ConvertContext): Block[] {
	return file.kind === "markdown" ? markdownToBlocks(source, ctx) : textFileToBlocks(source, file.path);
}

/**
 * Rewrites a page in place: empties it, writes the pending header and the body, then turns the header into the
 * finished one naming the commit. A run stopped partway leaves a pending header, which the next run rewrites.
 */
async function writePage(api: NotionApi, pageId: string, path: string, body: Block[], header: Block): Promise<void> {
	await api.clear(pageId);
	let headerId: string | undefined;
	for (const [i, chunk] of chunkBlocks([pendingHeader(path), ...body]).entries()) {
		const ids = await api.append(pageId, chunk);
		if (i === 0) headerId = ids[0];
	}
	if (!headerId) throw new Error("Notion returned no id for the header block");
	await api.updateBlock(headerId, header);
}

const message = (error: unknown): string => (error instanceof Error ? error.message : String(error));

/** Applies a plan to Notion, saving the map after every write. Failures are collected; the run carries on with the rest. */
export async function runBackup(options: SyncOptions): Promise<SyncResult> {
	const { walk, map, plan, api, log } = options;
	const now = options.now ?? (() => new Date());
	const result: SyncResult = { created: 0, written: 0, moved: 0, retired: 0, uploaded: 0, deleted: 0, failures: [], duplicates: [] };
	const createdHere = new Map<string, { id: string; parentId: string; createdTime: string }>();
	const fail = (path: string, error: unknown): void => {
		result.failures.push({ path, error: message(error) });
		log(`  ! ${path}: ${message(error)}`);
	};

	if (!map.root) {
		if (!options.reconciled.rootAbsent) throw new Error("The map has no Backup root and Notion was not checked for one: refusing to risk a second root.");
		const page = await api.createPage(map.parentPageId, ROOT_TITLE, ICONS.root, [rootCallout()]);
		map.root = { id: page.id, url: page.url };
		options.save(map);
		log(`created backup root: ${page.url}`);
	}
	const rootId = map.root.id;
	const parentOf = (path: string): string | undefined => {
		const parent = path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "";
		return parent ? map.entries[parent]?.id : rootId;
	};

	for (const dir of plan.createDirs) {
		const parent = parentOf(dir);
		if (!parent) {
			fail(dir, new Error("parent page missing"));
			continue;
		}
		try {
			const page = await api.createPage(parent, titleOf(dir, "dir"), ICONS.dir, [dirMarker(dir)]);
			map.entries[dir] = { kind: "dir", id: page.id, url: page.url };
			createdHere.set(dir, { id: page.id, parentId: parent, createdTime: page.createdTime ?? "" });
			options.save(map);
			result.created++;
		} catch (error) {
			fail(dir, error);
		}
	}

	await checkConcurrentCreates(options, createdHere, result);

	// Pages the layout moved: re-parent each under its new folder, retitling folder pages (whose title is the old
	// folder's name), then clear movedFrom once every write below has refreshed the page. Parents go first, so a
	// folder is in place before its children re-parent under it.
	const moved = Object.entries(map.entries)
		.filter(([, e]) => e.movedFrom !== undefined)
		.sort(([a], [b]) => a.split("/").length - b.split("/").length || (a < b ? -1 : 1));
	for (const [path, entry] of moved) {
		const parent = parentOf(path);
		if (!parent) {
			fail(path, new Error("parent page missing"));
			continue;
		}
		try {
			// When the old path's parent page became the new parent page (a folder renamed around its children),
			// the page already sits in place and Notion rejects a same-parent move. The map sees that without
			// asking Notion: the old parent path is either a kept key or a renamed entry's movedFrom.
			const old = entry.movedFrom!;
			const slash = old.lastIndexOf("/");
			const oldParentPath = slash === -1 ? "" : old.slice(0, slash);
			const oldParent = map.entries[oldParentPath]?.id ?? Object.values(map.entries).find((e) => e.movedFrom === oldParentPath)?.id;
			if (oldParent !== parent) {
				try {
					await api.move(entry.id, parent);
				} catch (error) {
					// Without old-parent data the lookups cannot see it; Notion's own answer settles it.
					if (!message(error).includes("New parent must be different from the current parent")) throw error;
				}
			}
			if (entry.kind === "dir") await api.retitle(entry.id, titleOf(path, "dir"), ICONS.dir);
			result.moved++;
		} catch (error) {
			fail(path, error);
		}
	}

	// Folder pages the layout left behind: trashed once their pages have moved out, so no empty shell remains.
	for (const [path, entry] of Object.entries(map.entries).filter(([, e]) => e.retired)) {
		try {
			const children = (await api.children(entry.id)).filter((b) => b.type === "child_page");
			if (children.length > 0) {
				fail(path, new Error(`still holds ${children.length} page${children.length === 1 ? "" : "s"}; it is left until a run has moved them out`));
				continue;
			}
			await api.trash(entry.id);
			delete map.entries[path];
			options.save(map);
			result.retired++;
		} catch (error) {
			fail(path, error);
		}
	}

	// Pages first, content second: every link target exists before any page that links to it is written.
	const filesCreated = new Map<string, { id: string; parentId: string; createdTime: string }>();
	for (const file of plan.createFiles) {
		const parent = parentOf(file.path);
		if (!parent) {
			fail(file.path, new Error("parent page missing"));
			continue;
		}
		try {
			const previous = map.entries[file.path];
			if (previous?.deletedAt) {
				await api.retitle(previous.id, titleOf(file.path, file.kind, file.title), ICONS[file.kind]);
				const { deletedAt: _, hash: __, ...kept } = previous;
				map.entries[file.path] = { ...kept, kind: file.kind };
			} else {
				const page = await api.createPage(parent, titleOf(file.path, file.kind, file.title), ICONS[file.kind], [pendingHeader(file.path)]);
				map.entries[file.path] = { kind: file.kind, id: page.id, url: page.url };
				filesCreated.set(file.path, { id: page.id, parentId: parent, createdTime: page.createdTime ?? "" });
				result.created++;
			}
			options.save(map);
		} catch (error) {
			fail(file.path, error);
		}
	}
	await checkConcurrentCreates(options, filesCreated, result);

	const images = plan.writeFiles.filter((f) => f.kind === "image" && map.entries[f.path]);
	const pointers = images.filter((f) => f.lfsPointer).map((f) => f.path);
	if (pointers.length > 0) {
		log(`pulling ${pointers.length} LFS image${pointers.length === 1 ? "" : "s"}`);
		try {
			await options.lfsPull(pointers);
		} catch (error) {
			// Carry on: each image still a pointer fails on its own below, and the rest of the run is not lost.
			log(`  ! git lfs pull: ${message(error)}`);
		}
	}
	let limit: number | undefined;
	if (images.length > 0) {
		try {
			limit = await api.maxUploadBytes();
		} catch {
			limit = undefined;
		}
	}
	const ceiling = Math.min(limit ?? SINGLE_PART_LIMIT, SINGLE_PART_LIMIT);

	for (const file of images) {
		const entry = map.entries[file.path];
		if (!entry) continue;
		try {
			const bytes = readFileSync(file.abs);
			const actual = contentHash(bytes);
			if (actual.lfsPointer) throw new Error("still a Git LFS pointer after `git lfs pull`; the LFS object is missing");
			const url = options.sourceUrl(file.path);
			const blocks: Block[] = [];
			const name = titleOf(file.path, "image");
			if (bytes.length > ceiling) {
				const mb = (n: number): string => `${(n / 1024 / 1024).toFixed(1)} MB`;
				entry.uploadSkipped = `${mb(bytes.length)} is over the ${mb(ceiling)} upload limit`;
				delete entry.fileUploadId;
				blocks.push({ object: "block", type: "paragraph", paragraph: { rich_text: textItems(`Not uploaded: ${entry.uploadSkipped}. The image is in GitHub.`, {}, url) } });
			} else {
				entry.fileUploadId = await api.upload(name, bytes, contentTypeOf(name));
				delete entry.uploadSkipped;
				result.uploaded++;
				blocks.push({ object: "block", type: "image", image: { type: "file_upload", file_upload: { id: entry.fileUploadId }, caption: textItems(name) } });
			}
			await writePage(api, entry.id, file.path, blocks, headerBlock(file.path, options.commit, url));
			entry.hash = file.hash;
			options.save(map);
			result.written++;
		} catch (error) {
			fail(file.path, error);
		}
	}

	const index = linkIndex(walk.files);
	for (const file of plan.writeFiles.filter((f) => f.kind !== "image")) {
		const entry = map.entries[file.path];
		if (!entry) continue;
		try {
			const source = readFileSync(file.abs, "utf8");
			const body = pageBody(file, source, contextFor(file, map, index, options.sourceUrl));
			await writePage(api, entry.id, file.path, body, headerBlock(file.path, options.commit, options.sourceUrl(file.path)));
			entry.hash = file.hash;
			options.save(map);
			result.written++;
		} catch (error) {
			fail(file.path, error);
		}
	}

	for (const path of plan.deletePaths) {
		const entry = map.entries[path];
		if (!entry || entry.kind === "dir") continue;
		try {
			const when = now().toISOString().slice(0, 10);
			await api.retitle(entry.id, `${titleOf(path, entry.kind)} (deleted from repo)`, ICONS.deleted);
			await api.append(
				entry.id,
				[{ object: "block", type: "callout", callout: { rich_text: textItems(`Deleted from the repo${options.commit ? ` at ${options.commit.slice(0, 7)}` : ""} on ${when}. This page is kept as the last backed-up copy.`), icon: { type: "emoji", emoji: ICONS.deleted }, color: "red_background" } }],
				true,
			);
			entry.deletedAt = when;
			options.save(map);
			result.deleted++;
		} catch (error) {
			fail(path, error);
		}
	}

	// A moved page keeps `movedFrom` until both its re-parenting and its rewrite succeeded, so a failed run retries it.
	const failed = new Set(result.failures.map((f) => f.path));
	for (const [path, entry] of Object.entries(map.entries)) {
		if (entry.movedFrom !== undefined && !failed.has(path)) delete entry.movedFrom;
	}

	if (result.failures.length === 0 && options.commit) {
		map.syncedCommit = options.commit;
		map.syncedAt = now().toISOString();
		result.syncedCommit = options.commit;
	}
	options.save(map);
	return result;
}

/** Counts for a dry run: what a run would create and write, and roughly how many blocks and requests it costs. */
export interface Estimate {
	markdown: number;
	text: number;
	images: number;
	imageBytes: number;
	lfsPointers: number;
	skills: number;
	dirs: number;
	blocks: number;
	requests: number;
	minutes: number;
}

export function estimate(walk: WalkResult, map: BackupMap, plan: Plan, readSource: (file: BackupFile) => string): Estimate {
	const index = linkIndex(walk.files);
	// Pretend every link and embed resolves, so the count matches a first run once every page exists.
	const ctx: ConvertContext = { link: (t) => (index.page(t) ? "https://www.notion.so/x" : undefined), relative: () => undefined, image: (t) => (index.image(t) ? { fileUploadId: "x" } : undefined) };
	let blocks = 0;
	let appends = 0;
	for (const file of plan.writeFiles) {
		if (file.kind === "image") {
			blocks += 2;
			appends += 1;
			continue;
		}
		const list = [pendingHeader(file.path), ...pageBody(file, readSource(file), ctx)];
		blocks += list.reduce((n, b) => n + countBlocks(b), 0);
		appends += chunkBlocks(list).length;
	}
	const images = walk.files.filter((f) => f.kind === "image");
	const uploads = plan.writeFiles.filter((f) => f.kind === "image").length;
	const creates = (plan.createRoot ? 1 : 0) + plan.createDirs.length + plan.createFiles.length;
	// Each write is a clear, its appends and the header update; the Notion check lists every folder page once.
	const writes = plan.writeFiles.length;
	const check = 2 + Object.values(map.entries).filter((e) => e.kind === "dir").length;
	// A moved page costs a re-parent (plus a folder retitle); a retired folder a children read and a trash.
	const movedCount = Object.values(map.entries).filter((e) => e.movedFrom !== undefined).length;
	const retiredCount = Object.values(map.entries).filter((e) => e.retired).length;
	const requests = check + creates + appends + writes * 2 + uploads * 2 + (uploads > 0 ? 1 : 0) + plan.deletePaths.length * 2 + movedCount * 2 + retiredCount * 2;
	const skills = new Set(walk.files.filter((f) => f.path.startsWith(".agents/skills/")).map((f) => f.path.split("/")[2])).size;
	return {
		markdown: walk.files.filter((f) => f.kind === "markdown").length,
		text: walk.files.filter((f) => f.kind === "text").length,
		images: images.length,
		imageBytes: images.reduce((n, f) => n + f.size, 0),
		lfsPointers: images.filter((f) => f.lfsPointer).length,
		skills,
		dirs: walk.dirs.length,
		blocks,
		requests,
		minutes: Math.ceil(requests / 3 / 60),
	};
}

/**
 * Two runs at once (a local run beside the workflow) could each create a page for the same new path. After creating,
 * look at each folder that got a new page: if another page there carries the same marker and is older, this run's copy
 * (still an empty shell) goes to the trash and the run stops, so the next run adopts the older page. Both runs keep the
 * older page, so exactly one survives.
 */
async function checkConcurrentCreates(options: SyncOptions, created: Map<string, { id: string; parentId: string; createdTime: string }>, result: SyncResult): Promise<void> {
	if (created.size === 0) return;
	const { api, map } = options;
	const known = new Set(Object.values(map.entries).map((e) => e.id.replace(/-/g, "")));
	const lost: string[] = [];
	for (const parentId of new Set([...created.values()].map((c) => c.parentId))) {
		for (const page of (await api.children(parentId)).filter((b) => b.type === "child_page" && !known.has(b.id.replace(/-/g, "")))) {
			const marker = markerOf(await api.children(page.id, 4));
			const mine = marker ? created.get(marker.path) : undefined;
			if (!marker || !mine || sameId(mine.id, page.id)) continue;
			const theirsOlder = page.createdTime.localeCompare(mine.createdTime) < 0 || (page.createdTime === mine.createdTime && page.id.replace(/-/g, "") < mine.id.replace(/-/g, ""));
			if (theirsOlder) {
				await api.trash(mine.id);
				delete map.entries[marker.path];
				lost.push(marker.path);
				result.duplicates.push({ path: marker.path, kept: page.id, extras: [{ id: mine.id, action: "trashed (empty)" }] });
			} else {
				result.duplicates.push({ path: marker.path, kept: mine.id, extras: [{ id: page.id, action: "left in place" }] });
			}
		}
	}
	options.save(map);
	if (lost.length > 0) throw new ConcurrentRunError(`another backup run created ${lost.length} of the same pages first (${lost.slice(0, 3).join(", ")}${lost.length > 3 ? ", …" : ""}); this run's copies are in the trash. Rerun to adopt them.`);
}
