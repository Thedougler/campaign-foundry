import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Page } from "../vault/types.ts";
import { toolRoot } from "./prose.ts";
import type { Finding } from "./types.ts";

/** A finding without its path: the path is filled in from the page each time, so a moved page still hits the cache. */
export type CachedFinding = Omit<Finding, "path">;

interface CacheFile {
	salt: string;
	entries: Record<string, CachedFinding[]>;
}

/** Bump when a prose view or a layer's mapping changes shape, so stale entries are never reused. */
const CACHE_VERSION = 5;

export const hash = (text: string): string => createHash("sha256").update(text).digest("hex");

let lockSalt: Promise<string> | undefined;

/** A hash of `bun.lock`: any change to a linter's version changes it, so cached answers from an old version are dropped. */
export function lockfileSalt(): Promise<string> {
	lockSalt ??= readFile(join(toolRoot, "bun.lock"), "utf8").then(hash, () => "no-lockfile");
	return lockSalt;
}

async function read(root: string, layer: string, salt: string): Promise<Record<string, CachedFinding[]>> {
	try {
		const file = JSON.parse(await readFile(join(root, ".cache", "check", `${layer}.json`), "utf8")) as CacheFile;
		return file.salt === salt ? file.entries : {};
	} catch {
		return {};
	}
}

async function write(root: string, layer: string, salt: string, entries: Record<string, CachedFinding[]>): Promise<void> {
	try {
		const cacheDir = join(root, ".cache", "check");
		await mkdir(cacheDir, { recursive: true });
		const target = join(cacheDir, `${layer}.json`);
		const scratch = `${target}.${process.pid}.${Math.random().toString(36).slice(2)}`;
		await writeFile(scratch, JSON.stringify({ salt, entries } satisfies CacheFile));
		await rename(scratch, target);
	} catch {
		// A cache that cannot be written only costs speed.
	}
}

/**
 * Per-page memo for a slow layer under the invocation root's `.cache/check`. Each page's findings are stored by the
 * hash of its source, so a moved page still hits the cache. `salt` must change whenever anything but the page can
 * change the answer: the tool's version, its config or the name dictionary. `compute` receives only cache misses.
 */
export async function cachedByPage(
	root: string,
	layer: string,
	salt: string,
	pages: Page[],
	compute: (misses: Page[]) => Promise<Map<Page, CachedFinding[]>>,
	/** Scoped runs must not discard cached answers for pages they did not evaluate. */
	preserveUnused = false,
): Promise<Map<Page, CachedFinding[]>> {
	const fullSalt = `${CACHE_VERSION}:${salt}`;
	const stored = await read(root, layer, fullSalt);
	const keyOf = new Map(pages.map((page) => [page, hash(page.source)]));
	const result = new Map<Page, CachedFinding[]>();
	const misses: Page[] = [];
	for (const page of pages) {
		const hit = stored[keyOf.get(page) ?? ""];
		if (hit) result.set(page, hit);
		else misses.push(page);
	}
	if (misses.length > 0) {
		const computed = await compute(misses);
		for (const page of misses) result.set(page, computed.get(page) ?? []);
	}
	// Only a full run can prune unused entries; scoped runs merge their answers into the existing cache.
	const next: Record<string, CachedFinding[]> = preserveUnused ? { ...stored } : {};
	for (const page of pages) next[keyOf.get(page) ?? ""] = result.get(page) ?? [];
	if (misses.length > 0 || Object.keys(next).length !== Object.keys(stored).length) await write(root, layer, fullSalt, next);
	return result;
}

