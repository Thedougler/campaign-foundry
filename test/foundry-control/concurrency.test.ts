import { describe, expect, it } from "vitest";
import { IdempotencyStore, withIdempotency } from "../../src/foundry-control/bridge/mutations.ts";

describe("idempotency concurrency seam", () => {
	it("coalesces concurrent identical requests and does not reuse a key for another tool", async () => {
		const store = new IdempotencyStore();
		const barrier = Promise.withResolvers<void>();
		let writes = 0;
		const execute = async () => { writes += 1; await barrier.promise; return { uuid: "Actor.a" }; };
		const first = withIdempotency(store, "push-a", "document.create", { data: {} }, execute);
		const retry = withIdempotency(store, "push-a", "document.create", { data: {} }, execute);
		barrier.resolve();
		const results = await Promise.all([first, retry]);
		expect(writes).toBe(1);
		expect(results.map((result) => result.replayed)).toEqual([false, true]);
		await expect(withIdempotency(store, "push-a", "setting.set", { data: {} }, execute)).rejects.toThrow("different params or tool");
	});
});
