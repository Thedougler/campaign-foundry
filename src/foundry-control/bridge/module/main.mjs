/**
 * The cf-bridge module entry: registers its settings, connects out to the control daemon's
 * WebSocket listener (browsers cannot listen), answers tool requests through the handler table,
 * and feeds document hooks into the event ring.
 *
 * `startModule(deps)` takes every external dependency (WebSocket class, globals, scheduler) so
 * tests drive it with fakes; the Hooks wiring at the bottom is the only Foundry-coupled part.
 */

import { createHandlers, MODULE_ID, MODULE_VERSION, ToolFailure } from "./handlers.mjs";
import { EventRing } from "./ring.mjs";

const DEFAULT_URL = "ws://127.0.0.1:30426";
const BACKOFF_MS = [1000, 2000, 5000, 10000, 30000];

/** The reconnect delay after `attempt` failed connections, capped at 30 s. */
export function nextBackoffMs(attempt) {
	return BACKOFF_MS[Math.min(Math.max(attempt, 0), BACKOFF_MS.length - 1)];
}

export function startModule(deps = {}) {
	const WebSocketCtor = deps.WebSocketCtor ?? globalThis.WebSocket;
	const scope = deps.scope ?? globalThis;
	const schedule = deps.schedule ?? ((fn, ms) => setTimeout(fn, ms));
	const cancel = deps.cancel ?? ((timer) => clearTimeout(timer));
	const ring = deps.ring ?? new EventRing();
	const handlers = createHandlers(ring, scope);

	let socket = null;
	let connected = false;
	let wantConnected = false;
	let reconnectTimer = null;
	let attempt = 0;
	let reconnectFn = null;
	const inflight = [];

	function setting(name, fallback) {
		const settings = scope.game?.settings;
		if (settings && typeof settings.get === "function") {
			const value = settings.get(MODULE_ID, name);
			if (value !== undefined && value !== null && value !== "") return value;
		}
		return fallback;
	}

	/** The bridge URL with the token in the query string (browsers cannot set WebSocket headers). */
	function bridgeUrl() {
		const base = String(setting("url", DEFAULT_URL));
		const token = String(setting("token", ""));
		const joiner = base.includes("?") ? "&" : "?";
		return `${base}${joiner}token=${encodeURIComponent(token)}`;
	}

	function send(message) {
		if (socket && connected) socket.send(JSON.stringify(message));
	}

	function track(promise) {
		inflight.push(promise);
		promise.then(() => {
			const at = inflight.indexOf(promise);
			if (at >= 0) inflight.splice(at, 1);
		});
	}

	async function dispatch(request) {
		const handler = handlers[request.tool];
		if (handler === undefined) {
			send({ type: "reply", id: request.id, ok: false, error: { code: "unknown_tool", message: `No module tool ${request.tool}.` } });
			return;
		}
		try {
			const result = await handler(request.params ?? {});
			send({ type: "reply", id: request.id, ok: true, result: result ?? null });
		} catch (error) {
			send({
				type: "reply",
				id: request.id,
				ok: false,
				error: {
					code: error instanceof ToolFailure ? error.code : "module_error",
					message: error?.message ?? String(error),
				},
			});
		}
	}

	function onMessage(text) {
		let message;
		try {
			message = JSON.parse(text);
		} catch {
			return;
		}
		if (message?.type !== "request" || typeof message.id !== "number") return;
		track(dispatch(message));
	}

	function openSocket() {
		if (typeof WebSocketCtor !== "function") {
			console.warn(`[${MODULE_ID}] No WebSocket implementation available; bridge stays offline.`);
			return;
		}
		let ws;
		try {
			ws = new WebSocketCtor(bridgeUrl());
		} catch {
			scheduleReconnect();
			return;
		}
		socket = ws;
		ws.onopen = () => {
			connected = true;
			attempt = 0;
			ws.send(JSON.stringify({ type: "hello", module: MODULE_ID, version: MODULE_VERSION }));
		};
		ws.onmessage = (event) => onMessage(String(event.data));
		ws.onerror = () => {};
		ws.onclose = () => {
			connected = false;
			socket = null;
			if (wantConnected) scheduleReconnect();
		};
	}

	function scheduleReconnect() {
		const delay = nextBackoffMs(attempt);
		attempt += 1;
		reconnectFn = () => {
			reconnectFn = null;
			if (wantConnected) openSocket();
		};
		reconnectTimer = schedule(reconnectFn, delay);
	}

	function connect() {
		if (socket !== null) return;
		wantConnected = true;
		openSocket();
	}

	function disconnect() {
		wantConnected = false;
		if (reconnectFn !== null) {
			cancel(reconnectTimer);
			reconnectFn = null;
		}
		const ws = socket;
		socket = null;
		connected = false;
		if (ws) ws.close();
	}

	/** Reads the settings and connects when they allow it; returns why it did not, when it did not. */
	function connectIfConfigured() {
		if (scope.game?.user?.isGM === false) return "not-gm";
		if (setting("autoconnect", true) !== true) return "disabled";
		if (String(setting("token", "")) === "") return "no-token";
		connect();
		return "connecting";
	}

	/** Buffers one document event and pushes it to the daemon when it subscribed to the kind. */
	function pushEvent(event) {
		const buffered = ring.push(event.kind, event.documentName, event.uuid, event.name ?? null);
		if (connected && Array.isArray(ring.kinds) && ring.kinds.includes(buffered.kind)) {
			send({ type: "event", event: buffered });
		}
		return buffered;
	}

	/** Resolves when every in-flight request has been answered (tests and graceful shutdown). */
	async function flush() {
		while (inflight.length > 0) await Promise.all([...inflight]);
	}

	return {
		handlers,
		ring,
		connect,
		connectIfConfigured,
		disconnect,
		pushEvent,
		flush,
		status: () => ({ connected, attempt, url: socket ? socket.url : null }),
	};
}

// --- Foundry wiring (the only part that touches Hooks) ---

function registerSettings() {
	const game = globalThis.game;
	if (!game?.settings) return;
	game.settings.register(MODULE_ID, "url", {
		name: "Bridge URL",
		hint: "The control daemon's WebSocket, e.g. ws://127.0.0.1:30426",
		scope: "world",
		config: true,
		default: DEFAULT_URL,
		type: String,
	});
	game.settings.register(MODULE_ID, "token", {
		name: "Bridge token",
		hint: "The shared secret the daemon was started with (cf foundry serve --token).",
		scope: "client",
		config: true,
		restricted: true,
		default: "",
		type: String,
	});
	game.settings.register(MODULE_ID, "autoconnect", {
		name: "Autoconnect",
		hint: "Connect to the control daemon when the world is ready.",
		scope: "client",
		config: true,
		restricted: true,
		default: true,
		type: Boolean,
	});
}

let liveModule = null;
function ensureStarted() {
	if (liveModule === null) liveModule = startModule();
	return liveModule;
}

/** Document hook names substitute the document type, e.g. createActor, not createDocument. */
export function installDocumentHooks(scope, mod) {
	for (const [documentName, config] of Object.entries(scope.CONFIG ?? {})) {
		if (!config?.documentClass) continue;
		for (const kind of ["create", "update", "delete"]) {
			scope.Hooks.on(`${kind}${documentName}`, (doc) => {
				if (doc?.uuid) mod.pushEvent({ kind, documentName, uuid: doc.uuid, name: doc.name ?? null });
			});
		}
	}
}

const Hooks = globalThis.Hooks;
if (typeof Hooks !== "undefined") {
	Hooks.once("init", registerSettings);
	Hooks.once("ready", () => {
		if (!globalThis.game?.user?.isGM) return;
		const mod = ensureStarted();
		const outcome = mod.connectIfConfigured();
		if (outcome !== "connecting") {
			console.info(`[${MODULE_ID}] Bridge not connecting (${outcome}): set the token in the module settings.`);
		}
		installDocumentHooks(globalThis, mod);
	});
}
