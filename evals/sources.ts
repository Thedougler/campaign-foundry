/** Live-source drift detection for eval runs. */
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Case } from "./check.ts";
import { wikiPagePath } from "./outputs.ts";

export type SourceHashes = Record<string, string>;

export function caseSourcePaths(item: Case): string[] {
	const paths = (item.source_pages ?? []).map((path) => `wiki/${wikiPagePath(path)}`);
	for (const path of item.raw_sources ?? []) {
		wikiPagePath(path);
		if (!/^(raw|archive)\/.+/u.test(path)) throw new Error(`PREPARATION: raw_sources must identify raw/ or archive/: ${path}`);
		paths.push(path);
	}
	return [...new Set(paths)];
}

export async function hashCaseSources(repositoryRoot: string, item: Case): Promise<SourceHashes> {
	const hashes: SourceHashes = {};
	for (const path of caseSourcePaths(item)) {
		hashes[path] = createHash("sha256").update(await readFile(join(repositoryRoot, path))).digest("hex");
	}
	return hashes;
}

export async function recordSourceHashes(repositoryRoot: string, item: Case, controlRoot: string): Promise<SourceHashes> {
	const hashes = await hashCaseSources(repositoryRoot, item);
	await writeFile(join(controlRoot, "source-hashes.json"), `${JSON.stringify(hashes, null, 2)}\n`, { flag: "wx", mode: 0o600 });
	return hashes;
}

/** Missing or changed sources invalidate execution, never lower a quality score. */
export async function assertSourcesUnchanged(repositoryRoot: string, hashes: SourceHashes): Promise<void> {
	const changed: string[] = [];
	for (const [path, expected] of Object.entries(hashes)) {
		try {
			const actual = createHash("sha256").update(await readFile(join(repositoryRoot, path))).digest("hex");
			if (actual !== expected) changed.push(path);
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
			changed.push(path);
		}
	}
	if (changed.length) throw new Error(`INVALIDATED: live source drift: ${changed.join(", ")}`);
}

