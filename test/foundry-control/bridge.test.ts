import { once } from "node:events";
import { afterEach, describe, expect, it } from "vitest";
import WebSocket from "ws";
import { BridgeListener } from "../../src/foundry-control/bridge/listener.ts";

const TOKEN = "test-shared-token";
const listeners: BridgeListener[] = [];
afterEach(async () => {
	for (const listener of listeners.splice(0)) await listener.close();
});
async function startListener() {
	const listener = new BridgeListener({ token: TOKEN, port: 0 });
	listeners.push(listener);
	return { listener, ...(await listener.start()) };
}
async function moduleSocket(port: number) {
	const socket = new WebSocket(`ws://127.0.0.1:${port}/bridge?token=${TOKEN}`);
	await once(socket, "open");
	return socket;
}
async function hello(socket: WebSocket) {
	const welcome = once(socket, "message");
	socket.send(JSON.stringify({ type: "hello", module: "cf-bridge", version: "0.1.0" }));
	expect(JSON.parse((await welcome)[0].toString())).toEqual({ type: "welcome" });
}

describe("BridgeListener", () => {
	it("welcomes an authenticated module and carries request/reply traffic", async () => {
		const { listener, port } = await startListener();
		const socket = await moduleSocket(port);
		await hello(socket);
		const requestMessage = once(socket, "message");
		const call = listener.client()!.call("document.get", { uuid: "Actor.reef" });
		const request = JSON.parse((await requestMessage)[0].toString());
		expect(request).toMatchObject({ type: "request", tool: "document.get", params: { uuid: "Actor.reef" } });
		expect(typeof request.id).toBe("number");
		socket.send(
			JSON.stringify({ type: "reply", id: request.id, ok: true, result: { uuid: "Actor.reef", name: "Reef" } }),
		);
		await expect(call).resolves.toEqual({ uuid: "Actor.reef", name: "Reef" });
		socket.terminate();
	});
	it("refuses a wrong token before upgrade", async () => {
		const { port } = await startListener();
		const socket = new WebSocket(`ws://127.0.0.1:${port}/bridge?token=wrong`);
		const [, response] = await once(socket, "unexpected-response");
		expect(response.statusCode).toBe(401);
		socket.terminate();
		socket.on("error", () => {});
	});
	it("refuses plain HTTP without upgrade headers", async () => {
		const { port } = await startListener();
		expect((await fetch(`http://127.0.0.1:${port}/healthz`)).status).toBe(400);
	});
	it("keeps the first module and closes the second with policy violation", async () => {
		const { listener, port } = await startListener();
		const first = await moduleSocket(port);
		await hello(first);
		const second = await moduleSocket(port);
		const closed = once(second, "close");
		second.send(JSON.stringify({ type: "hello", module: "cf-bridge" }));
		expect((await closed)[0]).toBe(1008);
		expect(listener.client()).not.toBeNull();
		first.terminate();
	});
	it("closes a connection whose first message is not a hello", async () => {
		const { listener, port } = await startListener();
		const socket = await moduleSocket(port);
		const closed = once(socket, "close");
		socket.send(JSON.stringify({ type: "request", id: 1, tool: "world.inspect", params: {} }));
		expect((await closed)[0]).toBe(1008);
		expect(listener.client()).toBeNull();
	});
	it("clears the client when the module disconnects", async () => {
		const { listener, port } = await startListener();
		const socket = await moduleSocket(port);
		await hello(socket);
		const { promise, resolve } = Promise.withResolvers<void>();
		listener.onClient((client) => {
			if (client === null) resolve();
		});
		socket.terminate();
		await promise;
		expect(listener.client()).toBeNull();
	});
});
