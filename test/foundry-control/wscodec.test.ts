import { describe, expect, it } from "vitest";
import {
	Opcode,
	acceptKey,
	encodeClose,
	encodeText,
	FrameDecoder,
	handshakeResponse,
	WsProtocolError,
} from "../../src/foundry-control/bridge/wscodec.ts";

const RFC_KEY = "dGhlIHNhbXBsZSBub25jZQ==";
const RFC_ACCEPT = "s3pPLMBiTxaQ9kYGzzhZRbK+xOo=";

/** Masks a server→client frame so the (server-side) decoder accepts it, as a real client would. */
function mask(frame: Buffer): Buffer {
	const b0 = frame[0] ?? 0;
	const b1 = frame[1] ?? 0;
	let len = b1 & 0x7f;
	let header = 2;
	if (len === 126) {
		len = frame.readUInt16BE(2);
		header = 4;
	} else if (len === 127) {
		len = Number(frame.readBigUInt64BE(2));
		header = 10;
	}
	const key = Buffer.from([0x37, 0xfa, 0x21, 0x3d]);
	const payload = Buffer.from(frame.subarray(header, header + len));
	for (let i = 0; i < len; i += 1) payload[i] = (payload[i] ?? 0) ^ (key[i & 3] ?? 0);
	return Buffer.concat([Buffer.from([b0, (b1 & 0x7f) | 0x80]), frame.subarray(2, header), key, payload]);
}

describe("acceptKey", () => {
	it("produces the RFC 6455 §1.3 test vector", () => {
		expect(acceptKey(RFC_KEY)).toBe(RFC_ACCEPT);
	});
});

describe("handshakeResponse", () => {
	it("answers an upgrade request with the computed accept key", () => {
		const request = [
			"GET /bridge?token=seekrit HTTP/1.1",
			"Host: 127.0.0.1:30426",
			"Upgrade: websocket",
			"Connection: Upgrade",
			`Sec-WebSocket-Key: ${RFC_KEY}`,
			"Sec-WebSocket-Version: 13",
			"",
			"",
		].join("\r\n");
		const response = handshakeResponse(request);
		expect(response).toContain("101 Switching Protocols");
		expect(response).toContain(`Sec-WebSocket-Accept: ${RFC_ACCEPT}`);
		expect(response.endsWith("\r\n\r\n")).toBe(true);
	});

	it("refuses a request without a key", () => {
		expect(() => handshakeResponse("GET / HTTP/1.1\r\nHost: x\r\n\r\n")).toThrow(WsProtocolError);
	});
});

describe("FrameDecoder", () => {
	it("decodes the RFC 6455 §5.7 masked Hello frame", () => {
		const decoder = new FrameDecoder();
		const hello = Buffer.from([0x81, 0x85, 0x37, 0xfa, 0x21, 0x3d, 0x7f, 0x9f, 0x4d, 0x51, 0x58]);
		const messages = decoder.push(hello);
		expect(messages).toHaveLength(1);
		expect(messages[0]?.opcode).toBe(Opcode.Text);
		expect(messages[0]?.payload.toString("utf8")).toBe("Hello");
	});

	it("reassembles a frame split across chunks and several frames in one chunk", () => {
		const decoder = new FrameDecoder();
		const split = mask(encodeText("first message"));
		const at = Math.floor(split.length / 2);
		const second = mask(encodeText("second"));
		const messages = [...decoder.push(split.subarray(0, at)), ...decoder.push(split.subarray(at)), ...decoder.push(second)];
		expect(messages.map((m) => m.payload.toString("utf8"))).toEqual(["first message", "second"]);
	});

	it("decodes a 16-bit-length frame", () => {
		const decoder = new FrameDecoder();
		const text = "x".repeat(300);
		const messages = decoder.push(mask(encodeText(text)));
		expect(messages[0]?.payload.toString("utf8")).toBe(text);
	});

	it("decodes a 64-bit-length frame", () => {
		const decoder = new FrameDecoder();
		const text = "y".repeat(70_000);
		const messages = decoder.push(mask(encodeText(text)));
		expect(messages[0]?.payload.length).toBe(70_000);
	});

	it("assembles a fragmented message from continuation frames", () => {
		const decoder = new FrameDecoder();
		const part1 = Buffer.from([0x01, 0x81, 0x11, 0x11, 0x11, 0x11, 0x59]); // text, not FIN; "H" (0x48) masked with 0x11s
		const part2 = Buffer.from([0x80, 0x81, 0x22, 0x22, 0x22, 0x22, 0x4b]); // FIN continuation; "i" (0x69) masked with 0x22s
		const messages = decoder.push(part1);
		expect(messages).toEqual([]);
		const done = decoder.push(part2);
		expect(done).toHaveLength(1);
		expect(done[0]?.opcode).toBe(Opcode.Text);
		expect(done[0]?.payload.toString("utf8")).toBe("Hi");
	});

	it("passes control frames through with their opcode", () => {
		const decoder = new FrameDecoder();
		const ping = Buffer.from([0x89, 0x81, 0x00, 0x00, 0x00, 0x00, 0x70]); // ping "p", masked with zero key
		const close = mask(encodeClose(1000, "bye"));
		const messages = decoder.push(Buffer.concat([ping, close]));
		expect(messages.map((m) => m.opcode)).toEqual([Opcode.Ping, Opcode.Close]);
		expect(messages[0]?.payload.toString("utf8")).toBe("p");
		expect(messages[1]?.payload.readUInt16BE(0)).toBe(1000);
		expect(messages[1]?.payload.subarray(2).toString("utf8")).toBe("bye");
	});

	it("rejects an unmasked client frame (protocol error)", () => {
		const decoder = new FrameDecoder();
		expect(() => decoder.push(encodeText("hello"))).toThrow(WsProtocolError);
	});

	it("rejects a message above the size cap", () => {
		const decoder = new FrameDecoder();
		const length = Buffer.alloc(8);
		length.writeBigUInt64BE(40n * 1024n * 1024n);
		const oversized = Buffer.concat([
			Buffer.from([0x82, 0xff]), // binary, masked, 64-bit length
			length,
			Buffer.from([1, 2, 3, 4]), // mask key; the payload is declared but never arrives
		]);
		expect(() => decoder.push(oversized)).toThrow(/too large/i);
	});
});
