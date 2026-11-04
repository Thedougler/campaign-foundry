import { createServer, type IncomingMessage, type Server } from "node:http";
import { WebSocketServer, type WebSocket } from "ws";
import { BridgeClient } from "./client.ts";
import { WebSocketTransport } from "./transport.ts";

export interface BridgeListenerOptions {
	token: string;
	host?: string;
	port?: number;
}

function tokenFrom(request: IncomingMessage): string | null {
	const query = new URL(request.url ?? "/", "http://localhost").searchParams.get("token");
	if (query !== null) return query;
	const authorization = request.headers.authorization;
	if (authorization?.toLowerCase().startsWith("bearer ")) return authorization.slice(7).trim();
	const protocol = request.headers["sec-websocket-protocol"];
	return protocol?.startsWith("cf-bridge.") ? protocol.slice("cf-bridge.".length) : null;
}

/** Token-authenticated listener with one active in-world module. */
export class BridgeListener {
	private readonly options: BridgeListenerOptions;
	private server: Server | null = null;
	private sockets: WebSocketServer | null = null;
	private activeClient: BridgeClient | null = null;
	private readonly clientHandlers: ((client: BridgeClient | null) => void)[] = [];

	constructor(options: BridgeListenerOptions) {
		this.options = options;
	}

	start(): Promise<{ host: string; port: number }> {
		const host = this.options.host ?? "127.0.0.1";
		const sockets = new WebSocketServer({ noServer: true, maxPayload: 32 * 1024 * 1024 });
		const server = createServer((_request, response) => {
			response.writeHead(400, { Connection: "close" });
			response.end();
		});
		server.on("connection", (socket) => socket.setKeepAlive(true, 30_000));
		this.server = server;
		this.sockets = sockets;
		server.on("upgrade", (request, socket, head) => {
			socket.on("error", () => socket.destroy());
			if (tokenFrom(request) !== this.options.token) {
				socket.end("HTTP/1.1 401 Unauthorized\r\nContent-Length: 0\r\nConnection: close\r\n\r\n");
				return;
			}
			sockets.handleUpgrade(request, socket, head, (websocket) => this.accept(websocket));
		});
		const { promise, resolve, reject } = Promise.withResolvers<{ host: string; port: number }>();
		server.once("error", reject);
		server.listen(this.options.port ?? 30426, host, () => {
			const address = server.address();
			if (address === null || typeof address === "string") {
				reject(new Error("The bridge listener could not determine its bound address."));
				return;
			}
			resolve({ host, port: address.port });
		});
		return promise;
	}

	client(): BridgeClient | null {
		return this.activeClient;
	}

	onClient(handler: (client: BridgeClient | null) => void): void {
		this.clientHandlers.push(handler);
	}

	async close(): Promise<void> {
		for (const socket of this.sockets?.clients ?? []) socket.terminate();
		this.sockets?.close();
		this.sockets = null;
		const server = this.server;
		this.server = null;
		if (server !== null) {
			const { promise, resolve } = Promise.withResolvers<void>();
			server.close(() => resolve());
			await promise;
		}
	}

	private accept(socket: WebSocket): void {
		socket.on("error", () => socket.terminate());
		socket.once("message", (data) => {
			let hello: unknown;
			try {
				hello = JSON.parse(data.toString());
			} catch {
				socket.close(1008, "the first message must be a cf-bridge hello");
				return;
			}
			if (
				typeof hello !== "object" ||
				hello === null ||
				!("type" in hello) ||
				hello.type !== "hello" ||
				!("module" in hello) ||
				hello.module !== "cf-bridge"
			) {
				socket.close(1008, "the first message must be a cf-bridge hello");
				return;
			}
			if (this.activeClient !== null) {
				socket.close(1008, "another module connection is already active");
				return;
			}
			const client = new BridgeClient(new WebSocketTransport(socket), { defaultTimeoutMs: 60_000 });
			this.activeClient = client;
			socket.once("close", () => {
				client.dispose();
				if (this.activeClient !== client) return;
				this.activeClient = null;
				for (const handler of this.clientHandlers) handler(null);
			});
			socket.send(JSON.stringify({ type: "welcome" }));
			for (const handler of this.clientHandlers) handler(client);
		});
	}
}
