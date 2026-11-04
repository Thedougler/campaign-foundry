import type { WebSocket } from "ws";

export interface Transport {
	send(text: string): void;
	onMessage(handler: (text: string) => void): void;
	onClose(handler: () => void): void;
}

/** Adapts ws messages to the bridge's text channel. */
export class WebSocketTransport implements Transport {
	private readonly socket: WebSocket;

	constructor(socket: WebSocket) {
		this.socket = socket;
	}

	send(text: string): void {
		this.socket.send(text);
	}

	onMessage(handler: (text: string) => void): void {
		this.socket.on("message", (data) => handler(data.toString()));
	}

	onClose(handler: () => void): void {
		this.socket.on("close", handler);
	}
}
