/** The message transport under the bridge client: JSON text frames over a socket. */

import type { Duplex } from "node:stream";
import { FrameDecoder, Opcode, encodePong, encodeText } from "./wscodec.ts";

/** A bidirectional text-message channel. The client only needs these three operations. */
export interface Transport {
	send(text: string): void;
	onMessage(handler: (text: string) => void): void;
	onClose(handler: () => void): void;
}

/** Speaks WebSocket text frames over an established (already handshaken) socket. */
export class SocketTransport implements Transport {
	private readonly socket: Duplex;
	private readonly decoder = new FrameDecoder();
	private messageHandlers: ((text: string) => void)[] = [];
	private closeHandlers: (() => void)[] = [];

	constructor(socket: Duplex) {
		this.socket = socket;
		socket.on("data", (chunk: Buffer) => {
			for (const message of this.decoder.push(chunk)) {
				if (message.opcode === Opcode.Ping) {
					this.socket.write(encodePong(message.payload));
					continue;
				}
				if (message.opcode === Opcode.Close || message.opcode === Opcode.Text || message.opcode === Opcode.Binary) {
					const text = message.payload.toString("utf8");
					for (const handler of [...this.messageHandlers]) handler(text);
				}
			}
		});
		socket.on("close", () => {
			for (const handler of [...this.closeHandlers]) handler();
		});
	}

	send(text: string): void {
		this.socket.write(encodeText(text));
	}

	onMessage(handler: (text: string) => void): void {
		this.messageHandlers.push(handler);
	}

	onClose(handler: () => void): void {
		this.closeHandlers.push(handler);
	}
}
