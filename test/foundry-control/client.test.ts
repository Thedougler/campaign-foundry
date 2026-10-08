import { describe, expect, it, vi } from "vitest";
import { BridgeClient, BridgeCallError } from "../../src/foundry-control/bridge/client.ts";
import type { Transport } from "../../src/foundry-control/bridge/transport.ts";

/** An in-memory transport: records sent frames, lets the test deliver replies and drop the connection. */
class FakeTransport implements Transport {
	readonly sent: string[] = [];
	private messageHandlers: ((text: string) => void)[] = [];
	private closeHandlers: (() => void)[] = [];

	send(text: string): void {
		this.sent.push(text);
	}

	onMessage(handler: (text: string) => void): void {
		this.messageHandlers.push(handler);
	}

	onClose(handler: () => void): void {
		this.closeHandlers.push(handler);
	}

	deliver(text: string): void {
		for (const handler of [...this.messageHandlers]) handler(text);
	}

	drop(): void {
		for (const handler of [...this.closeHandlers]) handler();
	}
}

describe("BridgeClient", () => {
	it("sends a request envelope and resolves the reply by id", async () => {
		const transport = new FakeTransport();
		const client = new BridgeClient(transport);
		const pending = client.call("document.get", { uuid: "Actor.abc" });
		await Promise.resolve();
		expect(JSON.parse(transport.sent[0] ?? "{}")).toEqual({
			type: "request",
			id: 1,
			tool: "document.get",
			params: { uuid: "Actor.abc" },
		});
		transport.deliver(JSON.stringify({ type: "reply", id: 1, ok: true, result: { uuid: "Actor.abc", name: "Reef" } }));
		await expect(pending).resolves.toEqual({ uuid: "Actor.abc", name: "Reef" });
	});

	it("correlates out-of-order replies to their own calls", async () => {
		const transport = new FakeTransport();
		const client = new BridgeClient(transport);
		const first = client.call("world.inspect", {});
		const second = client.call("world.search", { name: "Reef" });
		await Promise.resolve();
		transport.deliver(JSON.stringify({ type: "reply", id: 2, ok: true, result: [{ uuid: "Actor.reef" }] }));
		transport.deliver(JSON.stringify({ type: "reply", id: 1, ok: true, result: { id: "shattered-sea" } }));
		await expect(first).resolves.toEqual({ id: "shattered-sea" });
		await expect(second).resolves.toEqual([{ uuid: "Actor.reef" }]);
	});

	it("rejects an error reply carrying its code and approval command", async () => {
		const transport = new FakeTransport();
		const client = new BridgeClient(transport);
		const pending = client.call("document.delete", { uuid: "Actor.abc" });
		await Promise.resolve();
		transport.deliver(
			JSON.stringify({
				type: "reply",
				id: 1,
				ok: false,
				error: { code: "not_found", message: "No document at Actor.abc" },
			}),
		);
		await expect(pending).rejects.toBeInstanceOf(BridgeCallError);
		await expect(pending).rejects.toMatchObject({ code: "not_found", approvalCommand: null });
	});

	it("times out a call the module never answers", async () => {
		vi.useFakeTimers();
		try {
			const transport = new FakeTransport();
			const client = new BridgeClient(transport);
			const pending = client.call("document.get", { uuid: "Actor.abc" }, { timeoutMs: 5_000 });
		const assertion = expect(pending).rejects.toThrow(/did not answer/i);
			await vi.advanceTimersByTimeAsync(5_001);
			await assertion;
			// A late reply for the timed-out id is ignored instead of throwing on an unknown id.
			transport.deliver(JSON.stringify({ type: "reply", id: 1, ok: true, result: {} }));
		} finally {
			vi.useRealTimers();
		}
	});

	it("rejects every pending call when the socket drops", async () => {
		const transport = new FakeTransport();
		const client = new BridgeClient(transport);
		const first = client.call("document.get", { uuid: "Actor.a" });
		const second = client.call("world.search", { name: "x" });
		await Promise.resolve();
		transport.drop();
		await expect(first).rejects.toThrow(/dropped/i);
		await expect(second).rejects.toThrow(/dropped/i);
	});

	it("ignores frames that are not replies (hello/welcome/event pushes)", async () => {
		const transport = new FakeTransport();
		const client = new BridgeClient(transport);
		const pending = client.call("document.get", { uuid: "Actor.a" });
		await Promise.resolve();
		transport.deliver(JSON.stringify({ type: "welcome" }));
		transport.deliver(JSON.stringify({ type: "event", cursor: 41 }));
		transport.deliver("not json at all");
		transport.deliver(JSON.stringify({ type: "reply", id: 1, ok: true, result: { uuid: "Actor.a" } }));
		await expect(pending).resolves.toEqual({ uuid: "Actor.a" });
	});
});
