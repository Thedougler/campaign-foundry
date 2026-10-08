/** The daemon's WebSocket listener: the in-world module connects out to it (browsers cannot listen). Token-authenticated, single active module. */

import { createServer, type Server, type Socket } from "node:net";
import { BridgeClient } from "./client.ts";
import { SocketTransport } from "./transport.ts";
import { WsProtocolError, encodeClose, handshakeResponse } from "./wscodec.ts";

export interface BridgeListenerOptions {
	/** The shared secret; the module sends it in the upgrade request. */
	token: string;
	/** Interface to bind. Default `127.0.0.1`: the daemon and the Foundry client run on trusted machines. */
	host?: string;
	/** Port to bind; 0 picks a free one (tests). Default 30426. */
	port?: number;
}

const HTTP_400 = "HTTP/1.1 400 Bad Request\r\nContent-Length: 0\r\nConnection: close\r\n\r\n";
const HTTP_401 = "HTTP/1.1 401 Unauthorized\r\nContent-Length: 0\r\nConnection: close\r\n\r\n";

function httpHeaders(request: string): Map<string, string> {
	const headers = new Map<string, string>();
	for (const line of request.split("\r\n").slice(1)) {
		const colon = line.indexOf(":");
		if (colon > 0) headers.set(line.slice(0, colon).trim().toLowerCase(), line.slice(colon + 1).trim());
	}
	return headers;
}

/** The token travels three ways because browsers cannot set WebSocket headers: query param, bearer header (non-browser clients), or subprotocol. */
function tokenFrom(path: string, headers: Map<string, string>): string | null {
	const match = /(?:^|&)token=([^&]*)/.exec(path.slice(path.indexOf("?") + 1));
	if (match !== null) return decodeURIComponent(match[1] ?? "");
	const authorization = headers.get("authorization");
	if (authorization !== undefined && authorization.toLowerCase().startsWith("bearer ")) return authorization.slice(7).trim();
	const protocol = headers.get("sec-websocket-protocol");
	if (protocol !== undefined && protocol.startsWith("cf-bridge.")) return protocol.slice("cf-bridge.".length);
	return null;
}

export class BridgeListener {
	private readonly token: string;
	private readonly host: string;
	private readonly port: number;
	private server: Server | null = null;
	private activeSocket: Socket | null = null;
	private activeClient: BridgeClient | null = null;
	private readonly clientHandlers: ((client: BridgeClient | null) => void)[] = [];

	constructor(options: BridgeListenerOptions) {
		this.token = options.token;
		this.host = options.host ?? "127.0.0.1";
		this.port = options.port ?? 30426;
	}

	/** Starts listening; resolves with the bound address. */
	start(): Promise<{ host: string; port: number }> {
		const { promise, resolve, reject } = Promise.withResolvers<{ host: string; port: number }>();
		const server = createServer((socket) => this.accept(socket));
		server.once("error", reject);
		server.listen(this.port, this.host, () => {
			const address = server.address();
			if (address === null || typeof address === "string") {
				reject(new Error("The bridge listener could not determine its bound address."));
				return;
			}
			this.server = server;
			resolve({ host: this.host, port: address.port });
		});
		return promise;
	}

	/** The active module client, or null when no module is connected. */
	client(): BridgeClient | null {
		return this.activeClient;
	}

	/** Notified whenever the active client appears or goes away. */
	onClient(handler: (client: BridgeClient | null) => void): void {
		this.clientHandlers.push(handler);
	}

	/** Stops listening and drops any active module connection. */
	async close(): Promise<void> {
		const server = this.server;
		this.server = null;
		this.dropActive();
		if (server === null) return;
		const { promise, resolve } = Promise.withResolvers<void>();
		server.close(() => resolve());
		await promise;
	}

	private accept(socket: Socket): void {
		socket.setKeepAlive(true, 30_000);
		let headerBuffer = "";
		const onData = (chunk: Buffer): void => {
			headerBuffer += chunk.toString("latin1");
			const endOfHead = headerBuffer.indexOf("\r\n\r\n");
			if (endOfHead < 0) {
				if (headerBuffer.length > 16 * 1024) socket.end(HTTP_400);
				return;
			}
			socket.off("data", onData);
			const head = headerBuffer.slice(0, endOfHead);
			const rest = Buffer.from(headerBuffer.slice(endOfHead + 4), "latin1");
			this.upgrade(socket, head, rest);
		};
		socket.on("data", onData);
		socket.on("error", () => socket.destroy());
	}

	private upgrade(socket: Socket, head: string, rest: Buffer): void {
		const requestLine = head.split("\r\n")[0] ?? "";
		const headers = httpHeaders(head);
		const path = requestLine.split(" ")[1] ?? "/";
		const isUpgrade =
			requestLine.startsWith("GET ") &&
			(headers.get("upgrade") ?? "").toLowerCase().includes("websocket") &&
			(headers.get("connection") ?? "").toLowerCase().includes("upgrade");
		if (!isUpgrade) {
			socket.end(HTTP_400);
			return;
		}
		if (headers.get("sec-websocket-version") !== "13") {
			socket.end("HTTP/1.1 426 Upgrade Required\r\nSec-WebSocket-Version: 13\r\nContent-Length: 0\r\nConnection: close\r\n\r\n");
			return;
		}
		if (tokenFrom(path, headers) !== this.token) {
			socket.end(HTTP_401);
			return;
		}
		let response: string;
		try {
			response = handshakeResponse(head);
		} catch (error) {
			if (error instanceof WsProtocolError) {
				socket.end(HTTP_400);
				return;
			}
			throw error;
		}
		socket.write(response);
		this.awaitHello(socket, rest);
		socket.on("close", () => {
			if (this.activeSocket === socket) this.dropActive();
		});
	}

	/** Reads frames from the freshly upgraded socket until a valid hello arrives, then activates the client. */
	private awaitHello(socket: Socket, rest: Buffer): void {
		const transport = new SocketTransport(socket);
		let state: "awaiting-hello" | "active" | "refused" = "awaiting-hello";
		transport.onMessage((text) => {
			if (state !== "awaiting-hello") return;
			let message: unknown;
			try {
				message = JSON.parse(text);
			} catch {
				state = "refused";
				socket.end(encodeClose(1008, "the first message must be a cf-bridge hello"));
				return;
			}
			const isHello =
				typeof message === "object" &&
				message !== null &&
				"type" in message &&
				message.type === "hello" &&
				"module" in message &&
				message.module === "cf-bridge";
			if (!isHello) {
				state = "refused";
				socket.end(encodeClose(1008, "the first message must be a cf-bridge hello"));
				return;
			}
			if (this.activeClient !== null) {
				// Decision (conservative): the first authenticated module stays; a second is refused, so a stray connection never steals the bridge.
				state = "refused";
				socket.end(encodeClose(1008, "another module connection is already active"));
				return;
			}
			state = "active";
			const client = new BridgeClient(transport, { defaultTimeoutMs: 60_000 });
			transport.send(JSON.stringify({ type: "welcome" }));
			this.activeSocket = socket;
			this.activeClient = client;
			for (const handler of this.clientHandlers) handler(client);
		});
		if (rest.length > 0) socket.unshift(rest);
	}

	private dropActive(): void {
		const client = this.activeClient;
		const socket = this.activeSocket;
		this.activeClient = null;
		this.activeSocket = null;
		client?.dispose();
		socket?.destroy();
		if (client !== null) for (const handler of this.clientHandlers) handler(null);
	}
}
