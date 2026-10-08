import { extname } from "node:path";
import { type FileKind, IMAGE_EXTENSIONS, titleOf, type WalkResult } from "./files.ts";
import type { BackupMap, MapEntry } from "./map.ts";
import { deletedNote, dirMarker, isRootCallout, markerOf, parseMarker, type ReadBlock, ROOT_TITLE, uploadSkippedNote } from "./markers.ts";
import type { NotionApi } from "./notion.ts";

/** Two or more Notion pages claiming one repo path: one is kept, the rest are reported and never added to. */
export interface Duplicate {
	path: string;
	kept: string;
	extras: { id: string; action: "trashed (empty)" | "left in place" }[];
}

export interface Reconciliation {
	/** The parent page was checked just now and holds no Backup root: the only case in which a run may create one. */
	rootAbsent: boolean;
	/** Map entries filled in or corrected from Notion (lost, partial or stale map). */
	adopted: string[];
	/** Map entries whose page is no longer in the Backup tree (trashed, deleted or moved out): recreated if still needed. */
	dropped: string[];
	/** Folder pages that were missing their marker and got one. */
	markersAdded: number;
	/** Images whose map entry had lost its upload id and got back an upload Notion already holds. */
	uploadsReused: number;
	duplicates: Duplicate[];
	/** Child pages under the Backup root that carry no marker (made by hand): left alone. */
	foreign: number;
}

export interface ReconcileOptions {
	walk: WalkResult;
	map: BackupMap;
	api: NotionApi;
	/** The content hash a file had at a commit (from git), so a page whose header names a commit needs no rewrite. */
	hashAt(commit: string, path: string): string | undefined;
	save(map: BackupMap): void;
	log(line: string): void;
}

interface Candidate {
	id: string;
	path: string;
	kind: "dir" | "file";
	createdTime: string;
	via: "map" | "marker" | "title";
	/** A file page whose header names the commit it was fully written at, or any folder page. */
	complete: boolean;
	commit?: string;
	/** The page's first blocks, when they were read. */
	first?: ReadBlock[];
	/** A folder page's top-level blocks. */
	kids?: ReadBlock[];
}

export const sameId = (a: string | undefined, b: string | undefined): boolean => Boolean(a && b) && a?.replace(/-/g, "").toLowerCase() === b?.replace(/-/g, "").toLowerCase();
const norm = (id: string): string => id.replace(/-/g, "").toLowerCase();
const parentPath = (p: string): string => (p.includes("/") ? p.slice(0, p.lastIndexOf("/")) : "");
const kindByExtension = (path: string): FileKind => {
	const ext = extname(path).toLowerCase();
	if (ext === ".md" || ext === ".markdown") return "markdown";
	return IMAGE_EXTENSIONS.has(ext) ? "image" : "text";
};
const childPages = (blocks: ReadBlock[]): ReadBlock[] => blocks.filter((b) => b.type === "child_page");
const older = (a: { createdTime: string; id: string }, b: { createdTime: string; id: string }): number => a.createdTime.localeCompare(b.createdTime) || norm(a.id).localeCompare(norm(b.id));
const normName = (name: string): string => name.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Makes the map agree with Notion before anything is written: finds the Backup root under the parent page (never a
 * second one), walks the whole Backup tree, identifies every page by the repo path its marker names, adopts pages the
 * map lacks (lost, partial or stale map, or a run stopped between creating a page and saving the map), drops entries
 * whose page is gone, gives old folder pages their marker and recovers image upload ids. Two pages for one path keep
 * one; an extra that is an empty shell goes to Notion's trash (restorable for 30 days), one with content is reported and
 * left alone. The map is a cache: Notion is the record.
 */
export async function reconcile(options: ReconcileOptions): Promise<Reconciliation> {
	const { walk, map, api, log } = options;
	const result: Reconciliation = { rootAbsent: false, adopted: [], dropped: [], markersAdded: 0, uploadsReused: 0, duplicates: [], foreign: 0 };

	// 1. The root: a child page of the parent titled ROOT_TITLE, or the map's root, or one opening with the root note.
	const roots: { block: ReadBlock; kids: ReadBlock[] }[] = [];
	for (const page of childPages(await api.children(map.parentPageId))) {
		const isRoot = page.title === ROOT_TITLE || sameId(page.id, map.root?.id) || isRootCallout((await api.children(page.id, 1))[0]);
		if (isRoot) roots.push({ block: page, kids: await api.children(page.id) });
	}
	if (roots.length === 0) {
		result.dropped = Object.keys(map.entries).sort();
		if (map.root || result.dropped.length > 0) log(`no Backup root under the parent page: dropping the map's ${result.dropped.length} entries`);
		map.root = undefined;
		map.entries = {};
		map.syncedCommit = undefined;
		result.rootAbsent = true;
		options.save(map);
		return result;
	}
	roots.sort((a, b) => Number(sameId(b.block.id, map.root?.id)) - Number(sameId(a.block.id, map.root?.id)) || childPages(b.kids).length - childPages(a.kids).length || older(a.block, b.block));
	const [root, ...extraRoots] = roots as [(typeof roots)[0], ...typeof roots];
	if (extraRoots.length > 0) {
		const extras: Duplicate["extras"] = [];
		for (const extra of extraRoots) {
			const empty = childPages(extra.kids).length === 0 && extra.kids.length <= 1;
			if (empty) await api.trash(extra.block.id);
			extras.push({ id: extra.block.id, action: empty ? "trashed (empty)" : "left in place" });
		}
		result.duplicates.push({ path: "(backup root)", kept: root.block.id, extras });
	}
	if (!sameId(map.root?.id, root.block.id)) {
		const info = await api.getPage(root.block.id);
		map.root = { id: root.block.id, url: info?.url ?? `https://www.notion.so/${norm(root.block.id)}` };
		log(`found the Backup root in Notion: ${map.root.url}`);
	}

	// 2. Walk the tree. A page the map knows, in the folder the map expects, is taken on the map's word; any other page
	// is identified by its marker, or (an empty page, or one holding only child pages) by its title in that folder.
	const pathById = new Map(Object.entries(map.entries).map(([path, e]) => [norm(e.id), path]));
	const walkDirs = new Set(walk.dirs);
	const candidates = new Map<string, Candidate[]>();
	const queue: { path: string; kids: ReadBlock[] }[] = [{ path: "", kids: root.kids }];
	const byTitle = (folder: string, title: string, first: ReadBlock[]): { path: string; kind: "dir" | "file" } | undefined => {
		if (first.some((b) => b.type !== "child_page")) return undefined;
		const matches: { path: string; kind: "dir" | "file" }[] = [];
		for (const d of walkDirs) if (parentPath(d) === folder && titleOf(d, "dir") === title) matches.push({ path: d, kind: "dir" });
		if (first.length === 0) for (const f of walk.files) if (parentPath(f.path) === folder && titleOf(f.path, f.kind) === title) matches.push({ path: f.path, kind: "file" });
		return matches.length === 1 ? matches[0] : undefined;
	};
	while (queue.length > 0) {
		const { path: folder, kids } = queue.shift() as (typeof queue)[0];
		for (const page of childPages(kids)) {
			let c: Candidate | undefined;
			const known = pathById.get(norm(page.id));
			const knownEntry = known === undefined ? undefined : map.entries[known];
			if (known !== undefined && knownEntry && parentPath(known) === folder) {
				c = { id: page.id, path: known, kind: knownEntry.kind === "dir" ? "dir" : "file", createdTime: page.createdTime, via: "map", complete: true };
			} else {
				const first = await api.children(page.id, 4);
				const marker = markerOf(first);
				if (marker) {
					const commit = marker.kind === "file" ? marker.commit : undefined;
					c = { id: page.id, path: marker.path, kind: marker.kind, createdTime: page.createdTime, via: "marker", complete: marker.kind === "dir" || Boolean(commit), ...(commit ? { commit } : {}), first };
				} else {
					const match = byTitle(folder, page.title ?? "", first);
					if (match) c = { id: page.id, ...match, createdTime: page.createdTime, via: "title", complete: false, first };
					else result.foreign++;
				}
			}
			if (!c) continue;
			candidates.set(c.path, [...(candidates.get(c.path) ?? []), c]);
			if (c.kind === "dir") {
				c.kids = await api.children(c.id);
				queue.push({ path: c.path, kids: c.kids });
			}
		}
	}

	// 3. One page per path: the map's own page first, then a fully written one, then the oldest.
	const rank = (c: Candidate, entry: MapEntry | undefined): number => (sameId(c.id, entry?.id) ? 0 : 4) + (c.complete ? 0 : 2) + (c.via === "title" ? 1 : 0);
	for (const [path, list] of candidates) {
		const entry = map.entries[path];
		list.sort((a, b) => rank(a, entry) - rank(b, entry) || older(a, b));
		const [kept, ...extras] = list as [Candidate, ...Candidate[]];
		if (extras.length > 0) {
			const out: Duplicate["extras"] = [];
			for (const extra of extras) {
				const blocks = extra.kind === "dir" ? (extra.kids ?? []) : (extra.first ?? (await api.children(extra.id, 4)));
				const onlyMarker = blocks.length === 0 || (blocks.length === 1 && Boolean(parseMarker(blocks[0] as ReadBlock)));
				const empty = onlyMarker && childPages(blocks).length === 0 && !(extra.kind === "file" && extra.complete);
				if (empty) await api.trash(extra.id);
				out.push({ id: extra.id, action: empty ? "trashed (empty)" : "left in place" });
			}
			result.duplicates.push({ path, kept: kept.id, extras: out });
		}
		if (kept.kind === "dir" && !(kept.kids?.[0] && parseMarker(kept.kids[0])?.kind === "dir")) {
			await api.append(kept.id, [dirMarker(path)], true);
			result.markersAdded++;
		}
		if (entry && sameId(entry.id, kept.id)) continue;
		const info = await api.getPage(kept.id);
		const file = walk.files.find((f) => f.path === path);
		const adopted: MapEntry = { kind: kept.kind === "dir" ? "dir" : (file?.kind ?? kindByExtension(path)), id: kept.id, url: info?.url ?? `https://www.notion.so/${norm(kept.id)}` };
		if (kept.kind === "file") {
			const hash = kept.commit ? options.hashAt(kept.commit, path) : undefined;
			if (hash) adopted.hash = hash;
			const first = kept.first ?? (await api.children(kept.id, 4));
			const deletedAt = deletedNote(first);
			if (deletedAt) adopted.deletedAt = deletedAt;
			const skipped = uploadSkippedNote(first);
			if (skipped) adopted.uploadSkipped = skipped;
		}
		map.entries[path] = adopted;
		result.adopted.push(path);
	}

	// 4. Entries Notion no longer has under the root.
	for (const path of Object.keys(map.entries)) {
		if (candidates.has(path)) continue;
		delete map.entries[path];
		result.dropped.push(path);
	}

	// 5. Images that lost their upload id: reuse the attached upload with the same name and size rather than uploading again.
	const needUpload = walk.files.filter((f) => {
		const e = map.entries[f.path];
		return f.kind === "image" && e && !e.deletedAt && !e.fileUploadId && !e.uploadSkipped && e.hash === f.hash;
	});
	if (needUpload.length > 0) {
		const uploads = (await api.listUploads()).filter((u) => u.status === "uploaded" && !u.expiryTime).sort((a, b) => b.createdTime.localeCompare(a.createdTime));
		for (const f of needUpload) {
			const name = normName(titleOf(f.path, "image"));
			const match = uploads.find((u) => normName(u.filename) === name && (u.contentLength === undefined || u.contentLength === f.size));
			const e = map.entries[f.path];
			if (match && e) {
				e.fileUploadId = match.id;
				result.uploadsReused++;
			}
		}
	}

	options.save(map);
	const parts = [
		result.adopted.length > 0 ? `${result.adopted.length} map entries rebuilt from Notion` : "",
		result.dropped.length > 0 ? `${result.dropped.length} dropped (page gone from the tree)` : "",
		result.markersAdded > 0 ? `${result.markersAdded} folder markers added` : "",
		result.uploadsReused > 0 ? `${result.uploadsReused} uploads reused` : "",
		result.duplicates.length > 0 ? `${result.duplicates.length} paths with duplicate pages` : "",
		result.foreign > 0 ? `${result.foreign} hand-made pages left alone` : "",
	].filter(Boolean);
	log(`checked the Backup tree in Notion: ${parts.join(", ") || "map matches"}`);
	return result;
}
