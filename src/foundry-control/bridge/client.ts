/** The daemon's client to the in-world module: JSON request/reply envelopes with id correlation and timeouts. */

import { type ToolName, type BridgeErrorShape } from "./schema.ts";
import type { Transport } from "./transport.ts";

/** The module answered with an error. `approvalCommand` is set when the error is a mutation gate. */
export class BridgeCallError extends Error {
	readonly code: string;
	readonly approvalCommand: string | null;

	constructor(error: BridgeErrorShape) {
		super(error.message);
		this.code = error.code;
		this.approvalCommand = error.approvalCommand ?? null;
	}
}

/** The module connection dropped or a call outlived its timeout. */
export class BridgeTransportError extends Error {}

interface Pending {
	resolve: (value: unknown) => void;
	reject: (error: Error) => void;
	timer: NodeJS.Timeout;
}

const DEFAULT_TIMEOUT_MS = 30_000;

export class BridgeClient {
	private readonly transport: Transport;
	private readonly defaultTimeoutMs: number;
	private nextId = 1;
	private readonly pending = new Map<number, Pending>();
	private disposed = false;

	constructor(transport: Transport, opts: { defaultTimeoutMs?: number } = {}) {
		this.defaultTimeoutMs = opts.defaultTimeoutMs ?? DEFAULT_TIMEOUT_MS;
		this.transport = transport;
		transport.onMessage((text) => this.receive(text));
		transport.onClose(() => this.failAllPending(new BridgeTransportError("The bridge module connection dropped.")));
	}

	/** Calls one module tool; resolves with its result, rejects on error, timeout, or disconnect. */
	call<T = unknown>(tool: ToolName, params: Record<string, unknown>, opts: { timeoutMs?: number } = {}): Promise<T> {
		if (this.disposed) return Promise.reject(new BridgeTransportError("The bridge client was disposed."));
		const id = this.nextId;
		this.nextId += 1;
		const timeoutMs = opts.timeoutMs ?? this.defaultTimeoutMs;
		const { promise, resolve, reject } = Promise.withResolvers<unknown>();
		const timer = setTimeout(() => {
			this.pending.delete(id);
			reject(new BridgeTransportError(`The module did not answer ${tool} within ${timeoutMs} ms.`));
		}, timeoutMs);
		this.pending.set(id, { resolve, reject, timer });
		this.transport.send(JSON.stringify({ type: "request", id, tool, params }));
		return promise as Promise<T>;
	}

	/** Stops answering: rejects outstanding calls and ignores late replies. */
	dispose(): void {
		this.disposed = true;
		this.failAllPending(new BridgeTransportError("The bridge client was disposed."));
	}

	private receive(text: string): void {
		let message: unknown;
		try {
			message = JSON.parse(text);
		} catch {
			return;
		}
		if (typeof message !== "object" || message === null) return;
		if (!("type" in message) || message.type !== "reply") return;
		if (!("id" in message) || typeof message.id !== "number") return;
		const id = message.id;
		const pending = this.pending.get(id);
		if (pending === undefined) return;
		this.pending.delete(id);
		clearTimeout(pending.timer);
		const errorShape = this.errorShapeOf(message);
		if (errorShape === null) {
			pending.resolve("result" in message ? message.result : undefined);
		} else {
			pending.reject(new BridgeCallError(errorShape));
		}
	}

	/** Null when the reply is an ok; a shape (or a stand-in) when it is an error. */
	private errorShapeOf(message: object): BridgeErrorShape | null {
		if (!("ok" in message) || message.ok === true) return null;
		const error = "error" in message ? message.error : undefined;
		if (typeof error === "object" && error !== null && "code" in error && typeof error.code === "string" && "message" in error && typeof error.message === "string") {
			const approvalCommand = "approvalCommand" in error && typeof error.approvalCommand === "string" ? error.approvalCommand : undefined;
			return { code: error.code, message: error.message, ...(approvalCommand === undefined ? {} : { approvalCommand }) };
		}
		return { code: "module_error", message: "The module returned an error without a shape." };
	}

	private failAllPending(error: BridgeTransportError): void {
		for (const pending of this.pending.values()) {
			clearTimeout(pending.timer);
			pending.reject(error);
		}
		this.pending.clear();
	}
}
