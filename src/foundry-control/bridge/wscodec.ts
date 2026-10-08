/** Minimal server-side RFC 6455 codec: the handshake answer, client→server frame decoding, server→client frame encoding. Only what the bridge listener needs. */

import { createHash } from "node:crypto";

export const Opcode = {
	Continuation: 0,
	Text: 1,
	Binary: 2,
	Close: 8,
	Ping: 9,
	Pong: 10,
} as const;

const WS_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

/** The largest single message the bridge accepts; a request envelope far above this is abuse or a bug. */
const MAX_MESSAGE_BYTES = 32 * 1024 * 1024;

/** A WebSocket protocol violation: carries the close code the listener should send. */
export class WsProtocolError extends Error {
	readonly closeCode: number;

	constructor(message: string, closeCode: number) {
		super(message);
		this.closeCode = closeCode;
	}
}

/** RFC 6455 §1.3: base64(sha1(key + GUID)). */
export function acceptKey(key: string): string {
	return createHash("sha1").update(`${key}${WS_GUID}`).digest("base64");
}

/** Answers a client's HTTP upgrade request; throws when the request carries no `Sec-WebSocket-Key`. */
export function handshakeResponse(request: string): string {
	const headerLine = request.split("\r\n").find((line) => /^Sec-WebSocket-Key:/i.test(line));
	if (headerLine === undefined) {
		throw new WsProtocolError("The upgrade request carries no Sec-WebSocket-Key header.", 1002);
	}
	const key = headerLine.slice(headerLine.indexOf(":") + 1).trim();
	return [
		"HTTP/1.1 101 Switching Protocols",
		"Upgrade: websocket",
		"Connection: Upgrade",
		`Sec-WebSocket-Accept: ${acceptKey(key)}`,
		"",
		"",
	].join("\r\n");
}

/** One complete message: control frames pass through as-is; data frames arrive fully assembled (fragmentation handled). */
export interface WsMessage {
	opcode: number;
	payload: Buffer;
}

interface DecodedFrame extends WsMessage {
	fin: boolean;
}
export interface FrameDecoderOptions {
	/** Servers must reject unmasked client frames (RFC 6455 §5.1); a peer decoding server frames passes false. Default true. */
	requireMask?: boolean;
}

/** Decodes masked client frames. Feed it raw socket chunks; it returns complete messages and buffers partial ones. */
export class FrameDecoder {
	private buffer = Buffer.alloc(0);
	private fragment: { opcode: number; parts: Buffer[] } | null = null;
	private readonly requireMask: boolean;

	constructor(options: FrameDecoderOptions = {}) {
		this.requireMask = options.requireMask ?? true;
	}

	push(chunk: Buffer): WsMessage[] {
		this.buffer = this.buffer.length === 0 ? Buffer.from(chunk) : Buffer.concat([this.buffer, chunk]);
		const messages: WsMessage[] = [];
		while (true) {
			const frame = this.takeFrame();
			if (frame === null) break;
			const message = this.absorb(frame);
			if (message !== null) messages.push(message);
		}
		return messages;
	}

	/** Returns the next complete frame in the buffer, or null when more bytes are needed. Throws on protocol violations. */
	private takeFrame(): DecodedFrame | null {
		if (this.buffer.length < 2) return null;
		const b0 = this.buffer[0] ?? 0;
		const b1 = this.buffer[1] ?? 0;
		const fin = (b0 & 0x80) !== 0;
		const opcode = b0 & 0x0f;
		const masked = (b1 & 0x80) !== 0;
		const len7 = b1 & 0x7f;
		if (!masked && this.requireMask) {
			throw new WsProtocolError("Client frames must be masked (RFC 6455 §5.1).", 1002);
		}
		let length = len7;
		let offset = 2;
		if (len7 === 126) {
			if (this.buffer.length < 4) return null;
			length = this.buffer.readUInt16BE(2);
			offset = 4;
		} else if (len7 === 127) {
			if (this.buffer.length < 10) return null;
			const big = this.buffer.readBigUInt64BE(2);
			if (big > BigInt(MAX_MESSAGE_BYTES)) {
				throw new WsProtocolError(`Message of ${big} bytes is too large; the cap is ${MAX_MESSAGE_BYTES}.`, 1009);
			}
			length = Number(big);
			offset = 10;
		}
		if (length > MAX_MESSAGE_BYTES) {
			throw new WsProtocolError(`Message of ${length} bytes is too large; the cap is ${MAX_MESSAGE_BYTES}.`, 1009);
		}
		if (opcode >= 8 && length > 125) {
			throw new WsProtocolError("Control frames must be 125 bytes or fewer (RFC 6455 §5.5).", 1002);
		}
		const payloadStart = masked ? offset + 4 : offset;
		if (this.buffer.length < payloadStart + length) return null;
		const payload = Buffer.alloc(length);
		if (masked) {
			const maskKey = this.buffer.subarray(offset, offset + 4);
			const maskedPayload = this.buffer.subarray(payloadStart, payloadStart + length);
			for (let i = 0; i < length; i += 1) payload[i] = (maskedPayload[i] ?? 0) ^ (maskKey[i & 3] ?? 0);
		} else {
			this.buffer.copy(payload, 0, payloadStart, payloadStart + length);
		}
		this.buffer = this.buffer.subarray(payloadStart + length);
		return { opcode, payload, fin };
	}

	/** Applies fragmentation rules: control frames pass through; data frames assemble until FIN. */
	private absorb(frame: DecodedFrame): WsMessage | null {
		if (frame.opcode >= 8) {
			if (!frame.fin) throw new WsProtocolError("Control frames must not be fragmented (RFC 6455 §5.5).", 1002);
			return frame;
		}
		if (frame.opcode === Opcode.Continuation && this.fragment === null) {
			throw new WsProtocolError("A continuation frame arrived with no message to continue.", 1002);
		}
		if (frame.opcode !== Opcode.Continuation && this.fragment !== null) {
			throw new WsProtocolError("A new data frame arrived mid-message.", 1002);
		}
		if (!frame.fin) {
			this.fragment = this.fragment ?? { opcode: frame.opcode, parts: [] };
			this.fragment.parts.push(frame.payload);
			return null;
		}
		if (this.fragment === null) return frame;
		this.fragment.parts.push(frame.payload);
		const assembled: WsMessage = { opcode: this.fragment.opcode, payload: Buffer.concat(this.fragment.parts) };
		this.fragment = null;
		return assembled;
	}
}

function dataFrame(opcode: number, payload: Buffer): Buffer {
	const length = payload.length;
	let header: Buffer;
	if (length < 126) {
		header = Buffer.from([0x80 | opcode, length]);
	} else if (length < 65536) {
		header = Buffer.alloc(4);
		header[0] = 0x80 | opcode;
		header[1] = 126;
		header.writeUInt16BE(length, 2);
	} else {
		header = Buffer.alloc(10);
		header[0] = 0x80 | opcode;
		header[1] = 127;
		header.writeBigUInt64BE(BigInt(length), 2);
	}
	return Buffer.concat([header, payload]);
}

/** A server→client text frame, unmasked (RFC 6455 §5.1: servers do not mask). */
export function encodeText(payload: string | Buffer): Buffer {
	return dataFrame(Opcode.Text, typeof payload === "string" ? Buffer.from(payload, "utf8") : payload);
}

/** A close frame carrying a status code and a short reason. */
export function encodeClose(code: number, reason = ""): Buffer {
	const codeBytes = Buffer.alloc(2);
	codeBytes.writeUInt16BE(code);
	return dataFrame(Opcode.Close, Buffer.concat([codeBytes, Buffer.from(reason, "utf8").subarray(0, 123)]));
}

/** A pong frame answering a ping with its payload. */
export function encodePong(payload: Buffer): Buffer {
	return dataFrame(Opcode.Pong, payload);
}
