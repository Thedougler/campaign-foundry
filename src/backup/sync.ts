import { readFileSync } from "node:fs";
import { dirname, posix } from "node:path";
import { type Block, chunkBlocks, type ConvertContext, countBlocks, markdownToBlocks, textFileToBlocks, textItems } from "./blocks.ts";
import { type BackupFile, contentHash, type FileKind, inBackupRoots, titleOf, type WalkResult } from "./files.ts";
import { type BackupMap, type MapEntry, pageUrl } from "./map.ts";
import { contentTypeOf, type NotionApi } from "./notion.ts";

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
	/** Pulls the real bytes of LFS pointer files before their upload (`git lfs pull --include`). */
	lfsPull(paths: string[]): Promise<void>;
	log(line: string): void;
	now?: () => Date;
}

export interface SyncResult {
	created: number;
	written: number;
	uploaded: number;
	deleted: number;
	failures: { path: string; error: string }[];
	syncedCommit?: string;
}

const lower = (s: string): string => s.toLowerCase();
const stripMd = (s: string): string => s.replace(/\.(md|markdown)$/i, "");

/** Indexes the backed-up files by Obsidian name and by path, so `[[Name]]`, `[[Folder/Name]]` and embeds resolve. */
export function linkIndex(files: BackupFile[]): { page(target: string): string | undefined; image(target: string): string | undefined } {
	const pagesByName = new Map<string, string[]>();
	const pagesByPath = new Map<string, string>();
	const imagesByName = new Map<string, string[]>();
	for (const f of files) {
		const name = lower(f.path.slice(f.path.lastIndexOf("/") + 1));
		if (f.kind === "markdown") {
			const key = stripMd(name);
			pagesByName.set(key, [...(pagesByName.get(key) ?? []), f.path]);
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

/** The grey first line of every backed-up page: where it came from and where to edit it. */
export function headerBlock(path: string, commit: string | undefined, url: string | undefined): Block {
	const rich = [
		...textItems("Backup of ", { color: "gray" }),
		...textItems(path, { color: "gray", code: true }, url),
		...textItems(`${commit ? ` at ${commit.slice(0, 7)}` : ""}. Edit it in GitHub: the next change to the file overwrites this page.`, { color: "gray" }),
	];
	return { object: "block", type: "paragraph", paragraph: { rich_text: rich } };
}

/** The blocks a file's page holds, header first. */
export function pageBlocks(file: BackupFile, source: string, ctx: ConvertContext, commit: string | undefined, url: string | undefined): Block[] {
	const header = headerBlock(file.path, commit, url);
	if (file.kind === "markdown") return [header, ...markdownToBlocks(source, ctx)];
	return [header, ...textFileToBlocks(source, file.path)];
}

async function writeBlocks(api: NotionApi, pageId: string, blocks: Block[]): Promise<number> {
	const chunks = chunkBlocks(blocks);
	for (const chunk of chunks) await api.append(pageId, chunk);
	return chunks.length;
}

const message = (error: unknown): string => (error instanceof Error ? error.message : String(error));

/** Applies a plan to Notion, saving the map after every write. Failures are collected; the run carries on with the rest. */
export async function runBackup(options: SyncOptions): Promise<SyncResult> {
	const { walk, map, plan, api, log } = options;
	const now = options.now ?? (() => new Date());
	const result: SyncResult = { created: 0, written: 0, uploaded: 0, deleted: 0, failures: [] };
	const fresh = new Set<string>();
	const fail = (path: string, error: unknown): void => {
		result.failures.push({ path, error: message(error) });
		log(`  ! ${path}: ${message(error)}`);
	};

	if (!map.root) {
		const page = await api.createPage(map.parentPageId, "campaign-foundry backup", ICONS.root);
		map.root = page;
		options.save(map);
		await api.append(page.id, [
			{
				object: "block",
				type: "callout",
				callout: {
					rich_text: textItems("An automatic copy of the campaign-foundry repo's Shattered Sea Wiki and agent skills, written by the Notion backup workflow on every push to main. GitHub is the working copy: edits made here are overwritten. Each page's first line links to its source file."),
					icon: { type: "emoji", emoji: "🗄️" },
					color: "gray_background",
				},
			},
		]);
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
			const page = await api.createPage(parent, titleOf(dir, "dir"), ICONS.dir);
			map.entries[dir] = { kind: "dir", id: page.id, url: page.url };
			options.save(map);
			result.created++;
		} catch (error) {
			fail(dir, error);
		}
	}

	// Pages first, content second: every link target exists before any page that links to it is written.
	for (const file of plan.createFiles) {
		const parent = parentOf(file.path);
		if (!parent) {
			fail(file.path, new Error("parent page missing"));
			continue;
		}
		try {
			const previous = map.entries[file.path];
			if (previous?.deletedAt) {
				await api.retitle(previous.id, titleOf(file.path, file.kind), ICONS[file.kind]);
				const { deletedAt: _, hash: __, ...kept } = previous;
				map.entries[file.path] = { ...kept, kind: file.kind };
			} else {
				const page = await api.createPage(parent, titleOf(file.path, file.kind), ICONS[file.kind]);
				map.entries[file.path] = { kind: file.kind, id: page.id, url: page.url };
				fresh.add(file.path);
				result.created++;
			}
			options.save(map);
		} catch (error) {
			fail(file.path, error);
		}
	}

	const images = plan.writeFiles.filter((f) => f.kind === "image" && map.entries[f.path]);
	const pointers = images.filter((f) => f.lfsPointer).map((f) => f.path);
	if (pointers.length > 0) {
		log(`pulling ${pointers.length} LFS image${pointers.length === 1 ? "" : "s"}`);
		await options.lfsPull(pointers);
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
			const blocks: Block[] = [headerBlock(file.path, options.commit, url)];
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
			if (!fresh.has(file.path)) await api.clear(entry.id);
			await writeBlocks(api, entry.id, blocks);
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
			const blocks = pageBlocks(file, source, contextFor(file, map, index, options.sourceUrl), options.commit, options.sourceUrl(file.path));
			if (!fresh.has(file.path)) await api.clear(entry.id);
			await writeBlocks(api, entry.id, blocks);
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
	let clears = 0;
	for (const file of plan.writeFiles) {
		const live = map.entries[file.path] && !map.entries[file.path]?.deletedAt;
		if (live) clears++;
		if (file.kind === "image") {
			blocks += 2;
			appends += 1;
			continue;
		}
		const list = pageBlocks(file, readSource(file), ctx, "0000000", undefined);
		blocks += list.reduce((n, b) => n + countBlocks(b), 0);
		appends += chunkBlocks(list).length;
	}
	const images = walk.files.filter((f) => f.kind === "image");
	const uploads = plan.writeFiles.filter((f) => f.kind === "image").length;
	const creates = (plan.createRoot ? 2 : 0) + plan.createDirs.length + plan.createFiles.length;
	const requests = creates + appends + clears + uploads * 2 + (uploads > 0 ? 1 : 0) + plan.deletePaths.length * 2;
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
