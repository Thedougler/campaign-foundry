import { existsSync } from "node:fs";
import type { Doc } from "../../src/push/foundry.ts";

export const FOUNDRY_APP = "/Applications/Foundry Virtual Tabletop.app/Contents/Resources/app";
export const foundryInstalled = existsSync(`${FOUNDRY_APP}/common/server.mjs`);

type Documents = Record<string, new (data: Doc, options?: Record<string, unknown>) => { toObject(): Doc }>;
let cached: Promise<{ documents: Documents; packages: Record<string, new (data: Doc) => unknown> }> | undefined;

/**
 * Foundry's own data models (`common/`, the code its server validates every document with), loaded in Node with just enough
 * stubs (`CONFIG`, `game.system`) for them to run. The dnd5e `system` data is not validated here: that model lives in the
 * client-only system code.
 */
export function foundryCore(): Promise<{ documents: Documents; packages: Record<string, new (data: Doc) => unknown> }> {
	cached ??= (async () => {
		await import(`${FOUNDRY_APP}/common/primitives/_module.mjs`);
		const foundry = (await import(`${FOUNDRY_APP}/common/server.mjs`)) as Record<string, any>;
		const g = globalThis as Record<string, unknown>;
		g.foundry = foundry;
		g.CONST = foundry.CONST;
		g.CONFIG = { Token: { movement: {} } };
		g.getDocumentClass = (name: string) => foundry.documents[`Base${name}`];
		const types = (...names: string[]): Record<string, object> => Object.fromEntries(names.map((n) => [n, {}]));
		const model: Record<string, Record<string, object>> = {
			Actor: types("base", "character", "npc", "vehicle", "group", "encounter"),
			Item: types("base", "weapon", "equipment", "consumable", "tool", "loot", "container", "feat", "spell"),
			JournalEntryPage: types("text", "image", "pdf", "video"),
			Folder: types(...(Object.values(foundry.CONST.FOLDER_DOCUMENT_TYPES) as string[])),
		};
		g.game = {
			model: new Proxy(model, { get: (target, key) => target[key as string] ?? types("base") }),
			system: { id: "dnd5e", grid: { type: 1, distance: 5, units: "ft" }, documentTypes: {} },
			release: { generation: 14, build: 367 },
		};
		return { documents: foundry.documents as Documents, packages: foundry.packages as Record<string, new (data: Doc) => unknown> };
	})();
	return cached;
}
