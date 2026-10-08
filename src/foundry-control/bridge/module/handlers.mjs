/**
 * The module-plane tool handlers: thin adapters over the Foundry Public API (globals `game`,
 * `foundry`, `fromUuid`). No discipline logic lives here: the daemon plans, gates and verifies
 * every write (issue #46); these handlers only execute what the daemon sends.
 *
 * Everything is read from `scope` at call time (default `globalThis`) so the daemon's tests can
 * inject a fake world instead of a running Foundry.
 */

export const MODULE_ID = "cf-bridge";
export const MODULE_VERSION = "0.1.0";

/** A handler refused the call: `code` travels to the daemon as the bridge error code. */
export class ToolFailure extends Error {
	constructor(code, message) {
		super(message);
		this.name = "ToolFailure";
		this.code = code;
	}
}

/** World collections the world plane serves. */
const WORLD_COLLECTIONS = ["actors", "items", "scenes", "journal", "tables", "macros", "playlists", "combats"];
const COLLECTION_DOCUMENTS = {
	actors: "Actor", items: "Item", scenes: "Scene", journal: "JournalEntry",
	tables: "RollTable", macros: "Macro", playlists: "Playlist", combats: "Combat",
};

/** The ops a batch may wrap; the discipline applies to the batch as a whole, not per op. */
const BATCH_TOOLS = { "document.create": true, "document.patch": true, "document.delete": true };

function needGame(scope) {
	const game = scope.game;
	if (!game) throw new ToolFailure("no_game", "The game global is not available: the module is not running inside a world.");
	return game;
}

function needCollection(game, id) {
	const collection = COLLECTION_DOCUMENTS[id]
		? game[id] ?? game.collections?.get(COLLECTION_DOCUMENTS[id]) ?? game.collections?.get(id)
		: null;
	if (!collection) throw new ToolFailure("collection_not_found", `No world collection ${id}; world.inspect lists what exists.`);
	return collection;
}

function needPack(game, id) {
	const pack = game.packs?.get(id);
	if (!pack) throw new ToolFailure("pack_not_found", `No compendium pack ${id}; world.inspect lists installed packs.`);
	return pack;
}

async function resolveDoc(scope, uuid) {
	const fromUuid = scope.foundry?.utils?.fromUuid ?? scope.fromUuid;
	if (typeof fromUuid !== "function") throw new ToolFailure("no_game", "fromUuid is not available in this context.");
	const doc = await fromUuid(uuid);
	if (!doc) throw new ToolFailure("not_found", `No document at uuid ${uuid}.`);
	return doc;
}

/** The canonical JSON shape for one document. */
function docData(doc) {
	const data =
		typeof doc.toJSON === "function" ? doc.toJSON() : typeof doc.toObject === "function" ? doc.toObject() : null;
	return { uuid: doc.uuid, name: doc.name ?? null, documentName: doc.documentName ?? null, pack: doc.pack ?? null, data };
}

function packUuid(pack, id) {
	return typeof pack.getUuid === "function"
		? pack.getUuid(id)
		: `Compendium.${pack.collection ?? pack.metadata.id}.${pack.documentName ?? pack.documentClass?.documentName ?? "Actor"}.${id}`;
}

export function createHandlers(ring, scope = globalThis) {
	const handlers = {
		"world.inspect": async () => {
			const game = needGame(scope);
			const collections = [];
			for (const id of WORLD_COLLECTIONS) {
				const collection = game[id] ?? game.collections?.get(COLLECTION_DOCUMENTS[id]) ?? game.collections?.get(id);
				if (!collection) continue;
				collections.push({ id, count: collection.size ?? (collection.contents ?? []).length });
			}
			const packs = [];
			for (const pack of game.packs?.values?.() ?? []) {
				packs.push({ id: pack.metadata?.id ?? null, count: pack.size ?? pack.index?.size ?? null });
			}
			return {
				world: { id: game.world?.id ?? null, title: game.world?.title ?? game.world?.name ?? null },
				system: game.system
					? { id: game.system.id ?? null, version: game.system.version ?? game.system.data?.version ?? null }
					: null,
				core: { version: game.version ?? game.data?.version ?? null },
				collections,
				packs,
				bridge: { module: MODULE_ID, version: MODULE_VERSION },
			};
		},

		"world.search": async ({ name, collections, limit }) => {
			const game = needGame(scope);
			const ids = Array.isArray(collections) && collections.length > 0 ? collections : WORLD_COLLECTIONS;
			const needle = String(name ?? "").toLowerCase();
			const max = limit ?? 20;
			const hits = [];
			for (const id of ids) {
				const collection = game[id] ?? game.collections?.get(COLLECTION_DOCUMENTS[id]) ?? game.collections?.get(id);
				if (!collection) continue;
				for (const doc of collection.contents ?? []) {
					if (!String(doc.name ?? "").toLowerCase().includes(needle)) continue;
					hits.push({ uuid: doc.uuid, name: doc.name ?? null, collection: id });
					if (hits.length >= max) return hits;
				}
			}
			return hits;
		},

		"document.get": async ({ uuid }) => docData(await resolveDoc(scope, uuid)),

		"document.query": async ({ collection, name, limit }) => {
			const game = needGame(scope);
			const docs = needCollection(game, collection).contents ?? [];
			const needle = name ? String(name).toLowerCase() : null;
			const rows = [];
			for (const doc of docs) {
				if (needle && !String(doc.name ?? "").toLowerCase().includes(needle)) continue;
				rows.push({ uuid: doc.uuid, name: doc.name ?? null });
				if (rows.length >= (limit ?? 50)) break;
			}
			return rows;
		},

		"document.create": async ({ collection, data, pack }) => {
			const game = needGame(scope);
			if (pack !== undefined && pack !== null && pack !== "") {
				const target = needPack(game, pack);
				const doc = await target.documentClass.create(data, {
					pack: target.collection ?? target.metadata.id,
					keepId: data?._id !== undefined,
					renderSheet: false,
				});
				return docData(doc);
			}
			const cls = needCollection(game, collection).documentClass;
			if (typeof cls?.create !== "function") {
				throw new ToolFailure("collection_not_found", `Collection ${collection} has no documentClass.`);
			}
			return docData(await cls.create(data, { renderSheet: false, keepId: data?._id !== undefined }));
		},

		"document.patch": async ({ uuid, changes }) => {
			const doc = await resolveDoc(scope, uuid);
			const updated = await doc.update(changes);
			return docData(updated ?? doc);
		},

		"document.delete": async ({ uuid }) => {
			const doc = await resolveDoc(scope, uuid);
			await doc.delete();
			return { uuid, deleted: true };
		},

		/** v14 batches use DatabaseWriteOperation objects and are atomic. Older versions run in order. */
		"document.batch": async ({ ops, label }) => {
			for (const op of ops ?? []) {
				if (!BATCH_TOOLS[op?.tool]) {
					throw new ToolFailure("unknown_tool", `document.batch wraps create, patch and delete; got ${op?.tool}.`);
				}
			}
			const modifyBatch = scope.foundry?.documents?.modifyBatch;
			if (typeof modifyBatch === "function") {
				const operations = [];
				for (const op of ops ?? []) {
					const params = op.params;
					if (op.tool === "document.create") {
						const target = params.pack ? needPack(needGame(scope), params.pack) : needCollection(needGame(scope), params.collection);
						operations.push({
							action: "create", documentName: target.documentClass.documentName,
							data: [params.data], pack: params.pack ?? null, broadcast: true,
							renderSheet: false, keepId: params.data._id !== undefined,
						});
					} else {
						const doc = await resolveDoc(scope, params.uuid);
						const context = { documentName: doc.documentName, parent: doc.parent ?? null, pack: doc.pack ?? null, broadcast: true };
						operations.push(op.tool === "document.patch"
							? { action: "update", ...context, updates: [{ ...params.changes, _id: doc.id }] }
							: { action: "delete", ...context, ids: [doc.id] });
					}
				}
				const groups = await modifyBatch(operations);
				const results = groups.map((docs, index) => {
					if (docs.length !== 1) throw new ToolFailure("batch_failed", `Batch operation ${index} did not return one document.`);
					return ops[index].tool === "document.delete" ? { uuid: docs[0].uuid, deleted: true } : docData(docs[0]);
				});
				return { mode: "modifyBatch", label: label ?? null, results };
			}
			const results = [];
			for (const op of ops ?? []) results.push(await handlers[op.tool](op.params));
			return { mode: "sequential", label: label ?? null, results };
		},

		"compendium.query": async ({ pack, name, limit }) => {
			const game = needGame(scope);
			const target = needPack(game, pack);
			const index = typeof target.getIndex === "function" ? await target.getIndex() : target.index ?? [];
			const entries = typeof index.values === "function" ? [...index.values()] : [...index];
			const needle = name ? String(name).toLowerCase() : null;
			const rows = [];
			for (const entry of entries) {
				if (needle && !String(entry.name ?? "").toLowerCase().includes(needle)) continue;
				rows.push({ uuid: packUuid(target, entry._id), name: entry.name ?? null, type: entry.type ?? null });
				if (rows.length >= (limit ?? 50)) break;
			}
			return rows;
		},

		"compendium.import": async ({ pack, documents }) => {
			const game = needGame(scope);
			const target = needPack(game, pack);
			const created = [];
			for (const data of documents ?? []) {
				// keepId: Adventure import keeps Wiki ids (ADR 0008); compendium imports do the same.
				const doc = await target.documentClass.create(data, { pack: target.collection ?? target.metadata.id, keepId: true, renderSheet: false });
				created.push(docData(doc));
			}
			return { pack: target.metadata.id, documents: created };
		},

		"setting.get": async ({ scope: settingScope, key }) => {
			const game = needGame(scope);
			return game.settings.get(settingScope === "module" ? MODULE_ID : settingScope, key);
		},

		"setting.set": async ({ scope: settingScope, key, value }) => {
			const game = needGame(scope);
			await game.settings.set(settingScope === "module" ? MODULE_ID : settingScope, key, value);
			return { scope: settingScope, key, value };
		},

		"macro.run": async ({ uuid, scope: executionScope }) => {
			const doc = await resolveDoc(scope, uuid);
			if (typeof doc.execute !== "function") throw new ToolFailure("not_found", `${uuid} is not a Macro.`);
			const result = await doc.execute(executionScope ?? {});
			return { uuid, executed: true, result: result ?? null };
		},

		"events.subscribe": async ({ kinds }) => {
			ring.setKinds(kinds ?? ["create", "update", "delete"]);
			return { kinds: ring.kinds, buffered: ring.size };
		},

		"events.since": async ({ cursor, limit }) => ring.since(cursor ?? 0, limit ?? 100),
	};
	return handlers;
}
