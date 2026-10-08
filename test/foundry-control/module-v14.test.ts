import { describe, expect, it } from "vitest";
import { createHandlers } from "../../src/foundry-control/bridge/module/handlers.mjs";
import { EventRing } from "../../src/foundry-control/bridge/module/ring.mjs";

// Literal fixtures follow the official v14 APIs, not guesses about Foundry's internals.
describe("v14 Public API adapter", () => {
	it("finds a world collection through game.actors, not an actors key in game.collections", async () => {
		const actors = { contents: [{ uuid: "Actor.a", name: "Bazzoth" }], size: 1 };
		const handlers = createHandlers(new EventRing(), { game: { actors, collections: new Map([["Actor", actors]]) } });
		expect(await handlers["document.query"]({ collection: "actors" })).toEqual([{ uuid: "Actor.a", name: "Bazzoth" }]);
	});

	it("loads a pack index and uses the pack's getUuid method", async () => {
		let loaded = false;
		const pack = {
			collection: "world.campaign", documentName: "Actor", metadata: { id: "world.campaign" },
			getIndex: async () => { loaded = true; return new Map([["a", { _id: "a", name: "Bazzoth" }]]); },
			getUuid: (id: string) => `Compendium.world.campaign.Actor.${id}`,
		};
		const handlers = createHandlers(new EventRing(), { game: { packs: new Map([[pack.collection, pack]]) } });
		expect(await handlers["compendium.query"]({ pack: pack.collection })).toEqual([
			{ uuid: "Compendium.world.campaign.Actor.a", name: "Bazzoth", type: null },
		]);
		expect(loaded).toBe(true);
	});

	it("translates a mixed document batch into documented DatabaseWriteOperation objects", async () => {
		const submitted: unknown[][] = [];
		const created = { uuid: "Actor.new", name: "New", toJSON: () => ({ name: "New" }) };
		const existing = { id: "a", uuid: "Actor.a", documentName: "Actor", parent: null, pack: null };
		const handlers = createHandlers(new EventRing(), {
			game: { actors: { documentClass: { documentName: "Actor" } } },
			fromUuid: async () => existing,
			foundry: { documents: { modifyBatch: async (operations: unknown[]) => {
				submitted.push(operations);
				return [[created], [{ ...created, uuid: existing.uuid }], [existing]];
			} } },
		});
		const result = await handlers["document.batch"]({ ops: [
			{ tool: "document.create", params: { collection: "actors", data: { name: "New" } } },
			{ tool: "document.patch", params: { uuid: "Actor.a", changes: { name: "Changed" } } },
			{ tool: "document.delete", params: { uuid: "Actor.a" } },
		] });
		expect(submitted).toEqual([[
			{ action: "create", documentName: "Actor", data: [{ name: "New" }], pack: null, broadcast: true, renderSheet: false, keepId: false },
			{ action: "update", documentName: "Actor", updates: [{ name: "Changed", _id: "a" }], parent: null, pack: null, broadcast: true },
			{ action: "delete", documentName: "Actor", ids: ["a"], parent: null, pack: null, broadcast: true },
		]]);
		expect(result).toMatchObject({ mode: "modifyBatch", results: [
			{ uuid: "Actor.new" }, { uuid: "Actor.a" }, { uuid: "Actor.a", deleted: true },
		] });
	});

	it("uses the documented Macro.execute scope object", async () => {
		const calls: unknown[] = [];
		const handlers = createHandlers(new EventRing(), { fromUuid: async () => ({
			uuid: "Macro.a", execute: async (scope: unknown) => { calls.push(scope); return "ran"; },
		}) });
		await handlers["macro.run"]({ uuid: "Macro.a", scope: { speaker: { alias: "DM" } } });
		expect(calls).toEqual([{ speaker: { alias: "DM" } }]);
	});
});
