import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import type { FileKind } from "./files.ts";

/** Where the committed path-to-page map lives, relative to the repo root. */
export const MAP_PATH = ".notion/backup-map.json";

export interface MapEntry {
	kind: FileKind | "dir";
	/** Notion page id (dashed UUID). */
	id: string;
	url: string;
	/** Content hash last written to the page (files only). */
	hash?: string;
	/** Notion file upload id holding an image's bytes, reused by every page that embeds it. */
	fileUploadId?: string;
	/** Set when the file left the repo: the page stays in Notion, retitled and flagged, never trashed. */
	deletedAt?: string;
	/** Why an image could not be uploaded (too large for the workspace); a later run retries it. */
	uploadSkipped?: string;
}

export interface BackupMap {
	version: 1;
	/** The existing Notion page the Backup root hangs under. */
	parentPageId: string;
	/** The Backup root page the run created under the parent. */
	root?: { id: string; url: string };
	/** The last commit every change up to which is in Notion; the next push diffs from here. */
	syncedCommit?: string;
	syncedAt?: string;
	entries: Record<string, MapEntry>;
}

export function emptyMap(parentPageId: string): BackupMap {
	return { version: 1, parentPageId, entries: {} };
}

export function loadMap(file: string, parentPageId: string): BackupMap {
	if (!existsSync(file)) return emptyMap(parentPageId);
	const map = JSON.parse(readFileSync(file, "utf8")) as BackupMap;
	if (map.version !== 1) throw new Error(`${file} has map version ${String(map.version)}; this cf understands version 1.`);
	if (normalizeId(map.parentPageId) !== normalizeId(parentPageId)) {
		throw new Error(`${file} belongs to parent page ${map.parentPageId}, not ${parentPageId}. Move the map aside to start a new Backup tree.`);
	}
	map.entries ??= {};
	return map;
}

const FIELD_ORDER: (keyof MapEntry)[] = ["kind", "id", "url", "hash", "fileUploadId", "deletedAt", "uploadSkipped"];

/** Stable JSON: entries sorted by path and fields in one order, so a map rebuilt from Notion is byte-for-byte the same. */
export function serializeMap(map: BackupMap): string {
	const entries: Record<string, MapEntry> = {};
	for (const key of Object.keys(map.entries).sort()) {
		const entry = map.entries[key];
		if (!entry) continue;
		const ordered: Record<string, unknown> = {};
		for (const field of FIELD_ORDER) if (entry[field] !== undefined) ordered[field] = entry[field];
		entries[key] = ordered as unknown as MapEntry;
	}
	return `${JSON.stringify({ ...map, entries }, null, "\t")}\n`;
}

/** Writes through a temp file and a rename, so a cancelled run never leaves half a map. */
export function saveMap(file: string, map: BackupMap): void {
	mkdirSync(dirname(file), { recursive: true });
	const tmp = `${file}.tmp`;
	writeFileSync(tmp, serializeMap(map));
	renameSync(tmp, file);
}

/** `3f10216635ec8117af9cd05f042eea59`, a dashed UUID or a Notion URL ending in either, as a dashed UUID. */
export function normalizeId(input: string): string {
	const hex = /([0-9a-f]{32})(?:[?#].*)?$/i.exec(input.replace(/-/g, ""))?.[1];
	if (!hex) throw new Error(`"${input}" is not a Notion page id or URL.`);
	const h = hex.toLowerCase();
	return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

/** Lookup tables a run builds from the map: link targets by Obsidian name, so `[[Ilse Corran]]` finds its page. */
export function pageUrl(map: BackupMap, path: string): string | undefined {
	const entry = map.entries[path];
	return entry && !entry.deletedAt ? entry.url : undefined;
}
