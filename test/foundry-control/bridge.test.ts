import { connect, type Socket } from "node:net";
import { afterEach, describe, expect, it } from "vitest";
import { BridgeListener } from "../../src/foundry-control/bridge/listener.ts";
import { FrameDecoder } from "../../src/foundry-control/bridge/wscodec.ts";

const TOKEN = "test-shared-token";
const listeners: BridgeListener[] = [];

afterEach(async () => {
	for (const listener of listeners.splice(0)) await listener.close();
});

function upgradeRequest(path: string, headers: string[] = []): string {
	return [
		`GET ${path} HTTP/1.1`,
		"Host: 127.0.0.1",
		"Upgrade: websocket",
		"Connection: Upgrade",
		"Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==",
		"Sec-WebSocket-Version: 13",
		...headers,
		"",
		"",
	].join("\r\n");
}

function maskClientFrame(text: string): Buffer {
	const payload = Buffer.from(text, "utf8");
	const key = Buffer.from([0x0f, 0x1e, 0x2d, 0x3c]);
	const masked = Buffer.from(payload);
	for (let i = 0; i < masked.length; i += 1) masked[i] = (masked[i] ?? 0) ^ (key[i & 3] ?? 0);
	const length = payload.length;
	const header = length < 126 ? Buffer.from([0x81, 0x80 | length]) : Buffer.from([0x81, 0x80 | 126, length >> 8, length & 0xff]);
	return Buffer.concat([header, key, masked]);
}

/** Connects and performs the upgrade with the token in the query string, like the browser module does. */
async function moduleSocket(port: number, token = TOKEN): Promise<Socket> {
	const socket = connect(port, "127.0.0.1");
	await new Promise<void>((resolve) => socket.once("connect", resolve));
	socket.write(upgradeRequest(`/bridge?token=${token}`));
	return socket;
}

async function readChunk(socket: Socket): Promise<Buffer> {
	return await new Promise<Buffer>((resolve) => socket.once("data", (chunk: Buffer) => resolve(chunk)));
}

/** Reads server frames until one text message parses as JSON with `type`. */
async function readJson(socket: Socket, decoder: FrameDecoder): Promise<Record<string, unknown>> {
	while (true) {
		const chunk = await readChunk(socket);
		for (const message of decoder.push(chunk)) {
			if (message.opcode !== 1) continue;
			const parsed = JSON.parse(message.payload.toString("utf8")) as Record<string, unknown>;
			if (typeof parsed.type === "string") return parsed;
		}
	}
}

function startListener(): Promise<{ listener: BridgeListener; port: number }> {
	const listener = new BridgeListener({ token: TOKEN });
	listeners.push(listener);
	return listener.start().then((bound) => ({ listener, port: bound.port }));
}

describe("BridgeListener", () => {
	it("upgrades a token-authenticated module, welcomes its hello, and carries request/reply traffic", async () => {
		const { listener, port } = await startListener();
		const socket = await moduleSocket(port);
		const response = (await readChunk(socket)).toString("utf8");
		expect(response).toContain("101 Switching Protocols");
		expect(response).toContain("Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=");

		socket.write(maskClientFrame(JSON.stringify({ type: "hello", module: "cf-bridge", version: "0.1.0" })));
		const decoder = new FrameDecoder({ requireMask: false });
		const welcome = await readJson(socket, decoder);
		expect(welcome).toEqual({ type: "welcome" });
		expect(listener.client()).not.toBeNull();

		const call = listener.client()?.call("document.get", { uuid: "Actor.reef" });
		const request = await readJson(socket, decoder);
		expect(request).toMatchObject({ type: "request", tool: "document.get", params: { uuid: "Actor.reef" } });
		expect(typeof request.id).toBe("number");
		socket.write(maskClientFrame(JSON.stringify({ type: "reply", id: request.id, ok: true, result: { uuid: "Actor.reef", name: "Reef" } })));
		await expect(call).resolves.toEqual({ uuid: "Actor.reef", name: "Reef" });
		socket.destroy();
	});

	it("refuses a wrong token with HTTP 401 before any upgrade", async () => {
		const { port } = await startListener();
		const socket = await moduleSocket(port, "wrong-token");
		const response = (await readChunk(socket)).toString("utf8");
		expect(response).toContain("401");
		expect(await new Promise<"closed">((resolve) => socket.once("close", () => resolve("closed")))).toBe("closed");
	});

	it("refuses a plain HTTP request without upgrade headers", async () => {
		const { port } = await startListener();
		const socket = connect(port, "127.0.0.1");
		await new Promise<void>((resolve) => socket.once("connect", resolve));
		socket.write(`GET /healthz HTTP/1.1\r\nHost: x\r\n\r\n`);
		const response = (await readChunk(socket)).toString("utf8");
		expect(response).toContain("400");
		socket.destroy();
	});

	it("keeps the first module connection; a second is closed with policy violation", async () => {
		const { listener, port } = await startListener();
		const first = await moduleSocket(port);
		await readChunk(first);
		first.write(maskClientFrame(JSON.stringify({ type: "hello", module: "cf-bridge", version: "0.1.0" })));
		const decoder = new FrameDecoder({ requireMask: false });
		await readJson(first, decoder);

		const second = await moduleSocket(port);
		await readChunk(second);
		second.write(maskClientFrame(JSON.stringify({ type: "hello", module: "cf-bridge", version: "0.1.0" })));
		const verdict = await readChunk(second);
		// The refusal arrives as a close frame with policy-violation code 1008.
		expect(verdict[0]! & 0x0f).toBe(8);
		expect(verdict.readUInt16BE(2)).toBe(1008);
		expect(listener.client()).not.toBeNull();
		first.destroy();
		second.destroy();
	});

	it("closes a connection whose first message is not a hello", async () => {
		const { listener, port } = await startListener();
		const socket = await moduleSocket(port);
		await readChunk(socket);
		socket.write(maskClientFrame(JSON.stringify({ type: "request", id: 1, tool: "world.inspect", params: {} })));
		const verdict = await readChunk(socket);
		expect(verdict[0]! & 0x0f).toBe(8);
		expect(verdict.readUInt16BE(2)).toBe(1008);
		expect(listener.client()).toBeNull();
		socket.destroy();
	});

	it("clears the client when the module disconnects", async () => {
		const { listener, port } = await startListener();
		const socket = await moduleSocket(port);
		await readChunk(socket);
		socket.write(maskClientFrame(JSON.stringify({ type: "hello", module: "cf-bridge", version: "0.1.0" })));
		const decoder = new FrameDecoder({ requireMask: false });
		await readJson(socket, decoder);
		expect(listener.client()).not.toBeNull();
		const cleared = new Promise<void>((resolve) => listener.onClient((client) => (client === null ? resolve() : undefined)));
		socket.destroy();
		await cleared;
		expect(listener.client()).toBeNull();
	});
});
