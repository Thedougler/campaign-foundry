import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { PlanDoc } from "./adventure.ts";

export interface ManifestDoc {
	hash: string;
	name: string;
	/** Vault path of the page the document came from. */
	path: string;
}

/** What the last Push wrote, per document, so the next one carries only what changed. Lives outside `wiki/`, gitignored. */
export interface Manifest {
	version: 1;
	adventureId: string;
	moduleId: string;
	/** How many Pushes have packed something; the module's version. */
	pushes: number;
	/** Keyed `<DocumentType>:<id>`. */
	docs: Record<string, ManifestDoc>;
}

/** Where the last Push's manifest lives: one file per Campaign folder, outside `wiki/`, gitignored. */
export const manifestPath = (root: string, campaignFolder: string): string => join(root, ".push", `${campaignFolder}.json`);
export const docKey = (doc: Pick<PlanDoc, "type" | "id">): string => `${doc.type}:${doc.id}`;

export async function readManifest(path: string): Promise<Manifest | undefined> {
	try {
		const parsed = JSON.parse(await readFile(path, "utf8")) as Manifest;
		return parsed.version === 1 ? parsed : undefined;
	} catch {
		return undefined;
	}
}

export async function writeManifest(path: string, manifest: Manifest): Promise<void> {
	await mkdir(dirname(path), { recursive: true });
	await writeFile(path, `${JSON.stringify(manifest, null, "\t")}\n`);
}

export type Change = "added" | "updated" | "unchanged";

/** How each planned document compares with the last Push. `all` treats every document as changed. */
export function diff(docs: PlanDoc[], previous: Manifest | undefined, all: boolean): { doc: PlanDoc; change: Change }[] {
	return docs.map((doc) => {
		const before = previous?.docs[docKey(doc)];
		if (!before) return { doc, change: "added" };
		return { doc, change: all || before.hash !== doc.hash ? "updated" : "unchanged" };
	});
}
