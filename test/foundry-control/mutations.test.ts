import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { IdempotencyStore, planMutation, withIdempotency } from "../../src/foundry-control/bridge/mutations.ts";

const CLEANUP: string[] = [];
afterEach(async () => {
	for (const dir of CLEANUP.splice(0)) await rm(dir, { recursive: true, force: true });
});

async function tmpDir(): Promise<string> {
	const dir = await mkdtemp(join(tmpdir(), "cf-mutations-"));
	CLEANUP.push(dir);
	return dir;
}

describe("planMutation", () => {
	it("defaults to a dry run with verification on and no backup for a plain create", () => {
		const plan = planMutation("document.create", { collection: "actors", data: { name: "Reef" } });
		expect(plan.dry_run).toBe(true);
		expect(plan.verify_after).toBe(true);
		expect(plan.backup_before).toBe(false);
		expect(plan.preconditions).toEqual([]);
		expect(plan.warnings).toEqual([]);
	});

	it("honours explicit opt-ins", () => {
		const plan = planMutation("document.patch", {
			uuid: "Actor.xyz",
			changes: { name: "Reef" },
			dry_run: false,
			verify_after: false,
			backup_before: true,
			preconditions: [{ uuid: "Actor.xyz", path: "name", equals: "Old" }],
		});
		expect(plan.dry_run).toBe(false);
		expect(plan.verify_after).toBe(false);
		expect(plan.backup_before).toBe(true);
		expect(plan.preconditions).toEqual([{ uuid: "Actor.xyz", path: "name", equals: "Old" }]);
	});

	it("forces backup_before on for batch, with a warning naming why", () => {
		const plan = planMutation("document.batch", { ops: [{ tool: "document.create", params: { collection: "actors", data: { name: "A" } } }] });
		expect(plan.backup_before).toBe(true);
		expect(plan.warnings.join("\n")).toMatch(/batch/i);
	});

	it("forces backup_before on for delete even when the caller opted out, and says so", () => {
		const plan = planMutation("document.delete", { uuid: "Actor.xyz", backup_before: false });
		expect(plan.backup_before).toBe(true);
		expect(plan.warnings.some((w) => /forced/i.test(w))).toBe(true);
	});

	it("warns when a patch or delete carries no preconditions (the write guards nothing)", () => {
		const patch = planMutation("document.patch", { uuid: "Actor.xyz", changes: {} });
		expect(patch.warnings.some((w) => /precondition/i.test(w))).toBe(true);
		const del = planMutation("document.delete", { uuid: "Actor.xyz" });
		expect(del.warnings.some((w) => /precondition/i.test(w))).toBe(true);
	});

	it("does not ask for preconditions on creates or setting writes", () => {
		expect(planMutation("document.create", { collection: "actors", data: {} }).warnings).toEqual([]);
		expect(planMutation("setting.set", { scope: "world", key: "k", value: 1 }).warnings).toEqual([]);
	});

	it("keeps the idempotency key in the plan", () => {
		const plan = planMutation("document.patch", { uuid: "Actor.xyz", changes: {}, idempotency_key: "push-2026-10-06" });
		expect(plan.idempotency_key).toBe("push-2026-10-06");
	});
});

describe("IdempotencyStore", () => {
	it("records successes and replays them under the same key", async () => {
		const dir = await tmpDir();
		const store = new IdempotencyStore(join(dir, "idem.jsonl"));
		let ran = 0;
		const params = { uuid: "Actor.xyz", changes: { name: "Reef" } };
		const first = await withIdempotency(store, "scene-3-push", "document.patch", params, async () => {
			ran += 1;
			return { uuids: ["Actor.xyz"] };
		});
		expect(first.replayed).toBe(false);
		const second = await withIdempotency(store, "scene-3-push", "document.patch", params, async () => {
			ran += 1;
			return { uuids: ["something-else"] };
		});
		expect(ran).toBe(1);
		expect(second.replayed).toBe(true);
		expect(second.uuids).toEqual(["Actor.xyz"]);
	});

	it("refuses a key reused with different params instead of silently replaying", async () => {
		const store = new IdempotencyStore();
		await withIdempotency(store, "k", "document.patch", { uuid: "Actor.a", changes: {} }, async () => ({ uuids: [] }));
		await expect(
			withIdempotency(store, "k", "document.patch", { uuid: "Actor.b", changes: {} }, async () => ({ uuids: [] })),
		).rejects.toThrow(/different params|idempotency_key/i);
	});

	it("does not record a failed run, so a retry executes again", async () => {
		const store = new IdempotencyStore();
		let ran = 0;
		const attempt = () =>
			withIdempotency(store, "flaky", "document.patch", { uuid: "Actor.a", changes: {} }, async () => {
				ran += 1;
				if (ran === 1) throw new Error("socket died");
				return { uuids: [] };
			});
		await expect(attempt()).rejects.toThrow("socket died");
		await expect(attempt()).resolves.toMatchObject({ replayed: false });
		expect(ran).toBe(2);
	});

	it("persists records as jsonl and reloads them in a new store", async () => {
		const dir = await tmpDir();
		const path = join(dir, "idem.jsonl");
		const store = new IdempotencyStore(path);
		await withIdempotency(store, "persist-me", "document.patch", { uuid: "Actor.a", changes: {} }, async () => ({ uuids: ["Actor.a"] }));
		const line = await readFile(path, "utf8");
		expect(JSON.parse(line.trim())).toMatchObject({ key: "persist-me", tool: "document.patch", ok: true });

		const reopened = new IdempotencyStore(path);
		let ran = 0;
		const replayed = await withIdempotency(reopened, "persist-me", "document.patch", { uuid: "Actor.a", changes: {} }, async () => {
			ran += 1;
			return { uuids: [] };
		});
		expect(ran).toBe(0);
		expect(replayed.replayed).toBe(true);
	});

	it("tolerates a corrupt trailing line from a killed process", async () => {
		const dir = await tmpDir();
		const path = join(dir, "idem.jsonl");
		const params = { uuid: "Actor.a", changes: {} };
		const writer = new IdempotencyStore(path);
		await withIdempotency(writer, "good", "document.patch", params, async () => ({ uuids: [] }));
		// Simulate a daemon killed mid-append: a half-written trailing line after the good record.
		await writeFile(path, `${await readFile(path, "utf8")}{broken\n`, "utf8");

		const store = new IdempotencyStore(path);
		let ran = 0;
		const replayed = await withIdempotency(store, "good", "document.patch", params, async () => {
			ran += 1;
			return { uuids: [] };
		});
		expect(ran).toBe(0);
		expect(replayed.replayed).toBe(true);
	});
});
