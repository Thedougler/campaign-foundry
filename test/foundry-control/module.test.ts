import { describe, expect, it } from "vitest";
import { EventRing } from "../../src/foundry-control/bridge/module/ring.mjs";
import { createHandlers, MODULE_ID, ToolFailure } from "../../src/foundry-control/bridge/module/handlers.mjs";
import { nextBackoffMs, startModule } from "../../src/foundry-control/bridge/module/main.mjs";
import type { ModuleDeps } from "../../src/foundry-control/bridge/module/main.mjs";
import { MODULE_TOOLS } from "../../src/foundry-control/bridge/schema.ts";

// The module plane is plain JS running inside the Foundry client, so every test injects its
// globals: a fake `game`, a fake `fromUuid`, and (for main.mjs) a fake WebSocket class.

interface FakeDoc {
	uuid: string;
	name: string | null;
	documentName: string;
	pack: string | null;
	data: Record<string, unknown>;
	toJSON: () => Record<string, unknown>;
	update: (changes: Record<string, unknown>) => Promise<FakeDoc>;
	delete: () => Promise<FakeDoc>;
}

/** Applies one dot-path update segment by segment, the way Foundry expands update keys. */
function setPath(target: Record<string, unknown>, segments: string[], value: unknown): void {
	const [head, ...rest] = segments;
	if (head === undefined) return;
	if (rest.length === 0) {
		target[head] = value;
		return;
	}
	const child = (target[head] as Record<string, unknown> | undefined) ?? {};
	target[head] = child;
	setPath(child, rest, value);
}
function makeDoc(data: Record<string, unknown>, uuid: string, documentName = "Actor"): FakeDoc {
	const doc = {
		uuid,
		name: (data.name as string) ?? null,
		documentName,
		pack: uuid.startsWith("Compendium") ? uuid.split(".").slice(0, 2).join(".") : null,
		data,
		toJSON: () => structuredClone(data),
	};
	return {
		...doc,
		update: async (changes: Record<string, unknown>) => {
			for (const [path, value] of Object.entries(changes)) setPath(data, path.split("."), structuredClone(value));
			return doc as FakeDoc;
		},
		delete: async () => doc as FakeDoc,
	} as FakeDoc;
}

function fakeScope(docs: FakeDoc[] = []) {
	const byUuid = new Map(docs.map((d) => [d.uuid, d]));
	const settingsStore = new Map<string, unknown>();
	const collections = new Map<string, { documentClass: unknown; contents: unknown[]; size: number }>();
	const packs = new Map<
		string,
		{ metadata: { id: string }; documentClass: unknown; index?: unknown[] | Map<string, unknown>; created?: { data: unknown; options: unknown }[] }
	>();
	const game = {
		world: { id: "my-world", title: "My World", name: "My World" },
		system: { id: "dnd5e", version: "5.3.3" },
		version: "14.368",
		collections,
		packs,
		settings: {
			get: (ns: string, key: string) => settingsStore.get(`${ns}.${key}`),
			set: async (ns: string, key: string, value: unknown) => {
				settingsStore.set(`${ns}.${key}`, value);
				return value;
			},
			store: settingsStore,
		},
	};
	const fromUuid = async (uuid: string): Promise<FakeDoc> => {
		const doc = byUuid.get(uuid);
		if (doc === undefined) throw new ToolFailure("not_found", `No document at uuid ${uuid}`);
		return doc;
	};
	/** Registers a world collection whose documentClass records every create. */
	const addCollection = (id: string, contents: FakeDoc[]) => {
		const created: { data: unknown; options: unknown }[] = [];
		const cls = {
			created,
			create: async (data: Record<string, unknown>, options: Record<string, unknown>) => {
				created.push({ data, options });
				const doc = makeDoc(data, `${id}.${data._id ?? `new${created.length}`}`);
				contents.push(doc);
				return doc;
			},
		};
		collections.set(id, { documentClass: cls, contents, size: contents.length });
		return { created };
	};
	/** Registers a compendium pack whose documentClass records every create. */
	const addPack = (id: string, index: { _id: string; name: string; type?: string }[] = []) => {
		const created: { data: unknown; options: unknown }[] = [];
		const cls = {
			created,
			create: async (data: Record<string, unknown>, options: Record<string, unknown>) => {
				created.push({ data, options });
				return makeDoc(data, `Compendium.${id}.${data._id ?? `new${created.length}`}`, (data.type as string) ?? "Actor");
			},
		};
		const pack = { metadata: { id }, documentClass: cls, index, created };
		packs.set(id, pack);
		return pack;
	};
	return { game, fromUuid, foundry: {}, addCollection, addPack, settingsStore };
}

function handlersFor(scope: ReturnType<typeof fakeScope>, ring = new EventRing()) {
	return { handlers: createHandlers(ring, scope), ring };
}

describe("EventRing", () => {
	it("assigns increasing sequence numbers and returns only events after a cursor", () => {
		const ring = new EventRing(4);
		ring.push("create", "Actor", "actors.1", "One");
		ring.push("update", "Actor", "actors.1", "One");
		ring.push("delete", "Actor", "actors.1", "One");
		const afterOne = ring.since(1);
		expect(afterOne.events.map((e: { kind: string }) => e.kind)).toEqual(["update", "delete"]);
		expect(afterOne.cursor).toBe(3);
		expect(ring.since(3).events).toEqual([]);
		expect(ring.since(3).cursor).toBe(3);
	});

	it("drops the oldest events when full and reports the true cursor", () => {
		const ring = new EventRing(2);
		for (const n of [1, 2, 3]) ring.push("create", "Actor", `actors.${n}`, `N${n}`);
		expect(ring.size).toBe(2);
		expect(ring.since(0).events.map((e: { uuid: string }) => e.uuid)).toEqual(["actors.2", "actors.3"]);
	});

	it("starts unsubscribed and takes a kinds filter on subscribe", () => {
		const ring = new EventRing();
		expect(ring.kinds).toBeNull();
		ring.setKinds(["create"]);
		expect(ring.kinds).toEqual(["create"]);
	});
});

describe("module handlers", () => {
	it("serves exactly the module tools from the bridge contract", () => {
		const { handlers } = handlersFor(fakeScope());
		expect(Object.keys(handlers).sort()).toEqual([...MODULE_TOOLS].sort());
	});

	it("inspects the world: ids, versions and collection counts", async () => {
		const scope = fakeScope();
		scope.addCollection("actors", [makeDoc({ name: "Bazzoth" }, "actors.1")]);
		scope.addCollection("items", []);
		const { handlers } = handlersFor(scope);
		const result = (await handlers["world.inspect"]({})) as Record<string, unknown>;
		expect(result.world).toMatchObject({ id: "my-world", title: "My World" });
		expect(result.system).toMatchObject({ id: "dnd5e", version: "5.3.3" });
		expect(result.core).toMatchObject({ version: "14.368" });
		expect(result.collections).toEqual([
			{ id: "actors", count: 1 },
			{ id: "items", count: 0 },
		]);
	});

	it("searches names case-insensitively across collections with a limit", async () => {
		const scope = fakeScope();
		scope.addCollection("actors", [makeDoc({ name: "Bazzoth the Steeped" }, "actors.1"), makeDoc({ name: "Moucheron" }, "actors.2")]);
		scope.addCollection("journal", [makeDoc({ name: "bazzoth notes" }, "journal.9", "JournalEntry")]);
		const { handlers } = handlersFor(scope);
		const hits = (await handlers["world.search"]({ name: "BAZZOTH" })) as { uuid: string; collection: string }[];
		expect(hits.map((h) => h.uuid)).toEqual(["actors.1", "journal.9"]);
		const limited = (await handlers["world.search"]({ name: "", collections: ["actors"], limit: 1 })) as unknown[];
		expect(limited).toHaveLength(1);
	});

	it("queries one collection, filtering by name and applying the limit", async () => {
		const scope = fakeScope();
		scope.addCollection("actors", [makeDoc({ name: "Alpha" }, "actors.1"), makeDoc({ name: "Beta" }, "actors.2")]);
		const { handlers } = handlersFor(scope);
		expect(await handlers["document.query"]({ collection: "actors" })).toEqual([
			{ uuid: "actors.1", name: "Alpha" },
			{ uuid: "actors.2", name: "Beta" },
		]);
		expect(await handlers["document.query"]({ collection: "actors", name: "alp" })).toEqual([{ uuid: "actors.1", name: "Alpha" }]);
		await expect(handlers["document.query"]({ collection: "nope" })).rejects.toMatchObject({ code: "collection_not_found" });
	});

	it("reads a document through fromUuid and returns its JSON source", async () => {
		const scope = fakeScope();
		scope.addCollection("actors", []);
		const doc = makeDoc({ name: "Bazzoth", system: { hp: 10 } }, "actors.7");
		const { handlers } = handlersFor({ ...scope, fromUuid: async () => doc });
		const result = (await handlers["document.get"]({ uuid: "actors.7" })) as Record<string, unknown>;
		expect(result).toMatchObject({ uuid: "actors.7", name: "Bazzoth" });
		expect(result.data).toEqual({ name: "Bazzoth", system: { hp: 10 } });
	});

	it("fails a read of an unknown uuid with a coded error", async () => {
		const { handlers } = handlersFor(fakeScope());
		await expect(handlers["document.get"]({ uuid: "actors.missing" })).rejects.toMatchObject({ code: "not_found" });
	});

	it("creates a world document through the collection's documentClass", async () => {
		const scope = fakeScope();
		const { created } = scope.addCollection("actors", []);
		const { handlers } = handlersFor(scope);
		const result = (await handlers["document.create"]({ collection: "actors", data: { name: "Grung Elite", type: "npc" } })) as Record<string, unknown>;
		expect(result.uuid).toBe("actors.new1");
		expect(created[0]?.data).toEqual({ name: "Grung Elite", type: "npc" });
	});

	it("creates into a compendium pack, keeping ids only when the source carries one", async () => {
		const scope = fakeScope();
		const pack = scope.addPack("world.my-campaign");
		const { handlers } = handlersFor(scope);
		await handlers["document.create"]({ collection: "actors", data: { name: "With Id", _id: "wiki1" }, pack: "world.my-campaign" });
		await handlers["document.create"]({ collection: "actors", data: { name: "No Id" }, pack: "world.my-campaign" });
		expect(pack.created?.[0]?.options).toMatchObject({ pack: "world.my-campaign", keepId: true });
		expect(pack.created?.[1]?.options).toMatchObject({ pack: "world.my-campaign", keepId: false });
	});

	it("patches through doc.update and returns the fresh state", async () => {
		const doc = makeDoc({ name: "Bazzoth", system: { hp: 10 } }, "actors.7");
		const { handlers } = handlersFor({ ...fakeScope(), fromUuid: async () => doc });
		const result = (await handlers["document.patch"]({ uuid: "actors.7", changes: { "system.hp": 20 } })) as Record<string, unknown>;
		expect(doc.data.system).toEqual({ hp: 20 });
		expect((result.data as Record<string, unknown>).system).toEqual({ hp: 20 });
	});

	it("deletes through doc.delete and reports the uuid", async () => {
		const doc = makeDoc({ name: "Gone" }, "actors.7");
		let deleted = false;
		doc.delete = async () => {
			deleted = true;
			return doc;
		};
		const { handlers } = handlersFor({ ...fakeScope(), fromUuid: async () => doc });
		await expect(handlers["document.delete"]({ uuid: "actors.7" })).resolves.toEqual({ uuid: "actors.7", deleted: true });
		expect(deleted).toBe(true);
	});

	it("runs a batch op by op, in order, through the wrapped handlers", async () => {
		const scope = fakeScope();
		scope.addCollection("actors", []);
		const { handlers } = handlersFor(scope);
		const result = (await handlers["document.batch"]({
			label: "session 12",
			ops: [
				{ tool: "document.create", params: { collection: "actors", data: { name: "First" } } },
				{ tool: "document.create", params: { collection: "actors", data: { name: "Second" } } },
			],
		})) as { mode: string; results: { name: string | null }[] };
		expect(result.mode).toBe("sequential");
		expect(result.results.map((r) => r.name)).toEqual(["First", "Second"]);
	});

	it("rejects a batch holding an op it does not serve", async () => {
		const { handlers } = handlersFor(fakeScope());
		await expect(
			handlers["document.batch"]({ ops: [{ tool: "world.inspect", params: {} }] }),
		).rejects.toMatchObject({ code: "unknown_tool" });
	});

	it("queries a pack index by name and builds compendium uuids", async () => {
		const scope = fakeScope();
		scope.addPack("world.my-campaign", [
			{ _id: "aaa", name: "Bazzoth the Steeped", type: "npc" },
			{ _id: "bbb", name: "Commoner", type: "npc" },
		]);
		const { handlers } = handlersFor(scope);
		const rows = (await handlers["compendium.query"]({ pack: "world.my-campaign", name: "baz" })) as { uuid: string; name: string }[];
		expect(rows).toEqual([{ uuid: "Compendium.world.my-campaign.Actor.aaa", name: "Bazzoth the Steeped", type: "npc" }]);
	});

	it("imports documents into a pack keeping their ids", async () => {
		const scope = fakeScope();
		const pack = scope.addPack("world.my-campaign");
		const { handlers } = handlersFor(scope);
		const result = (await handlers["compendium.import"]({
			pack: "world.my-campaign",
			documents: [{ _id: "wiki-bazzoth", name: "Bazzoth" }],
		})) as { documents: { uuid: string }[] };
		expect(result.documents[0]?.uuid).toBe("Compendium.world.my-campaign.wiki-bazzoth");
		expect(pack.created?.[0]?.options).toMatchObject({ pack: "world.my-campaign", keepId: true });
	});

	it("maps the module setting scope onto the cf-bridge namespace", async () => {
		const scope = fakeScope();
		const { handlers } = handlersFor(scope);
		await handlers["setting.set"]({ scope: "module", key: "url", value: "ws://x" });
		await handlers["setting.set"]({ scope: "world", key: "intro", value: "hi" });
		expect(scope.settingsStore.get(`${MODULE_ID}.url`)).toBe("ws://x");
		expect(scope.settingsStore.get("world.intro")).toBe("hi");
		expect(await handlers["setting.get"]({ scope: "module", key: "url" })).toBe("ws://x");
		expect(await handlers["setting.get"]({ scope: "world", key: "intro" })).toBe("hi");
	});

	it("executes a macro with its v14 scope", async () => {
		const calls: unknown[][] = [];
		const macro = { documentName: "Macro", uuid: "macros.3", name: "Roll", execute: async (...args: unknown[]) => {
			calls.push(args);
			return "rolled";
		} };
		const { handlers } = handlersFor({ ...fakeScope(), fromUuid: async () => macro as unknown as FakeDoc });
		await expect(handlers["macro.run"]({ uuid: "macros.3", scope: { damage: 6, type: "fire" } })).resolves.toMatchObject({ uuid: "macros.3", executed: true, result: "rolled" });
		expect(calls).toEqual([[{ damage: 6, type: "fire" }]]);
	});

	it("refuses to run something that is not a macro", async () => {
		const doc = makeDoc({ name: "Not a macro" }, "actors.1");
		const { handlers } = handlersFor({ ...fakeScope(), fromUuid: async () => doc });
		await expect(handlers["macro.run"]({ uuid: "actors.1" })).rejects.toMatchObject({ code: "not_found" });
	});

	it("subscribes events and reads them back by cursor", async () => {
		const ring = new EventRing();
		const { handlers } = handlersFor(fakeScope(), ring);
		ring.push("create", "Actor", "actors.1", "One");
		const sub = (await handlers["events.subscribe"]({ kinds: ["create"] })) as { kinds: string[]; buffered: number };
		expect(sub).toEqual({ kinds: ["create"], buffered: 1 });
		ring.push("create", "Actor", "actors.2", "Two");
		const since = (await handlers["events.since"]({ cursor: 1 })) as { events: { uuid: string }[]; cursor: number };
		expect(since.events.map((e) => e.uuid)).toEqual(["actors.2"]);
		expect(since.cursor).toBe(2);
	});
});

// --- main.mjs: connection wiring over an injected WebSocket ---

class FakeWebSocket {
	url: string;
	sent: string[] = [];
	closed = false;
	onopen: (() => void) | null = null;
	onmessage: ((event: { data: string }) => void) | null = null;
	onclose: (() => void) | null = null;
	onerror: (() => void) | null = null;
	static instances: FakeWebSocket[] = [];

	constructor(url: string) {
		this.url = url;
		FakeWebSocket.instances.push(this);
	}
	send(text: string): void {
		this.sent.push(text);
	}
	close(): void {
		if (this.closed) return;
		this.closed = true;
		this.onclose?.();
	}
	open(): void {
		this.onopen?.();
	}
	message(text: string): void {
		this.onmessage?.({ data: text });
	}
}

function moduleUnderTest(overrides: Partial<ModuleDeps> = {}) {
	FakeWebSocket.instances.length = 0;
	const timers: { fn: () => void; ms: number }[] = [];
	const scope = fakeScope();
	scope.settingsStore.set(`${MODULE_ID}.url`, "ws://127.0.0.1:30426");
	scope.settingsStore.set(`${MODULE_ID}.token`, "seekrit");
	scope.settingsStore.set(`${MODULE_ID}.autoconnect`, true);
	const mod = startModule({
		WebSocketCtor: FakeWebSocket,
		scope,
		schedule: (fn: () => void, ms: number) => {
			timers.push({ fn, ms });
		},
		cancel: () => {},
		...overrides,
	});
	return { mod, timers, scope };
}

describe("module connection", () => {
	it("backs off capped at 30s", () => {
		expect([0, 1, 2, 3, 4, 5, 9].map(nextBackoffMs)).toEqual([1000, 2000, 5000, 10000, 30000, 30000, 30000]);
	});

	it("sends hello after the socket opens, with the token in the query string", () => {
		const { mod } = moduleUnderTest();
		mod.connect();
		const ws = FakeWebSocket.instances[0]!;
		expect(ws.url).toBe("ws://127.0.0.1:30426?token=seekrit");
		ws.open();
		expect(JSON.parse(ws.sent[0]!)).toMatchObject({ type: "hello", module: MODULE_ID });
	});

	it("answers a request through the handler table and replies with the same id", async () => {
		const { mod } = moduleUnderTest();
		mod.connect();
		const ws = FakeWebSocket.instances[0]!;
		ws.open();
		ws.message(JSON.stringify({ type: "request", id: 41, tool: "document.get", params: { uuid: "actors.x" } }));
		await mod.flush();
		const reply = JSON.parse(ws.sent[1]!) as { type: string; id: number; ok: boolean; error?: { code: string } };
		expect(reply).toMatchObject({ type: "reply", id: 41, ok: false });
		expect(reply.error?.code).toBe("not_found");
	});

	it("closes with policy code when the daemon sends a close frame", async () => {
		const { mod } = moduleUnderTest();
		mod.connect();
		const ws = FakeWebSocket.instances[0]!;
		ws.open();
		// The daemon closes refused connections; the module treats that as a normal drop.
		ws.close();
		expect(mod.status().connected).toBe(false);
	});

	it("schedules a reconnect with backoff after a drop and reconnects when it fires", () => {
		const { mod, timers } = moduleUnderTest();
		mod.connect();
		const ws = FakeWebSocket.instances[0]!;
		ws.open();
		ws.close();
		expect(timers.map((t) => t.ms)).toEqual([1000]);
		timers[0]!.fn();
		expect(FakeWebSocket.instances).toHaveLength(2);
	});

	it("stops reconnecting after an explicit disconnect", () => {
		const { mod, timers } = moduleUnderTest();
		mod.connect();
		const ws = FakeWebSocket.instances[0]!;
		ws.open();
		mod.disconnect();
		expect(ws.closed).toBe(true);
		const pending = timers.length;
		ws.close();
		expect(timers).toHaveLength(pending);
	});

	it("does not connect while autoconnect is off or the token is empty", () => {
		FakeWebSocket.instances.length = 0;
		const scope = fakeScope();
	scope.settingsStore.set(`${MODULE_ID}.token`, "seekrit");
	scope.settingsStore.set(`${MODULE_ID}.autoconnect`, false);
		const off = startModule({
			WebSocketCtor: FakeWebSocket,
			scope,
			schedule: () => {},
			cancel: () => {},
		});
		expect(off.connectIfConfigured()).toBe("disabled");
		scope.settingsStore.set(`${MODULE_ID}.autoconnect`, true);
		scope.settingsStore.set(`${MODULE_ID}.token`, "");
		expect(off.connectIfConfigured()).toBe("no-token");
		expect(FakeWebSocket.instances).toHaveLength(0);
	});

	it("pushes buffered document events once subscribed and connected", async () => {
		const { mod } = moduleUnderTest();
		mod.connect();
		const ws = FakeWebSocket.instances[0]!;
		ws.open();
		mod.handlers["events.subscribe"]({ kinds: ["create"] });
		mod.pushEvent({ kind: "create", documentName: "Actor", uuid: "actors.9", name: "New" });
		mod.pushEvent({ kind: "update", documentName: "Actor", uuid: "actors.9", name: "New" });
		await mod.flush();
		const pushes = ws.sent.slice(1).map((t) => JSON.parse(t)).filter((m) => m.type === "event");
		expect(pushes).toHaveLength(1);
		expect(pushes[0]).toMatchObject({ type: "event", event: { kind: "create", uuid: "actors.9" } });
	});
});
