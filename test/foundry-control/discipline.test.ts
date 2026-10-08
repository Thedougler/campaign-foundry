import { describe, expect, it } from "vitest";
import { ToolRegistry } from "../../src/foundry-control/daemon/registry.ts";
import { BridgeCallError } from "../../src/foundry-control/bridge/client.ts";
import { ScriptedHost } from "../../src/foundry-control/host/remote.ts";
import { DEFAULT_HOST_CONFIG } from "../../src/foundry-control/host/config.ts";
import type { MutationResult } from "../../src/foundry-control/bridge/schema.ts";

const stoppedHost = () => new ScriptedHost([{ match: "", reply: "" }, { match: "{{json .State}}", reply: '{"Status":"exited"}' }]);

describe("mutation safety at the registry boundary", () => {
	it("previews mutations without a connected world and includes the actual payload", async () => {
		const registry = new ToolRegistry({ host: stoppedHost(), config: DEFAULT_HOST_CONFIG, client: () => null });
		const result = await registry.callTool("document.create", { collection: "actors", data: { name: "Bazzoth" } });
		expect(result).toMatchObject({ dry_run: true, preview: { collection: "actors", data: { name: "Bazzoth" } } });
	});

	it("previews macro.run instead of executing arbitrary code by default", async () => {
		let executed = false;
		const registry = new ToolRegistry({ host: stoppedHost(), config: DEFAULT_HOST_CONFIG, client: () => ({
			call: async <T>() => { executed = true; return {} as T; },
		}) });
		expect(await registry.callTool("macro.run", { uuid: "Macro.a" })).toMatchObject({ dry_run: true });
		expect(executed).toBe(false);
	});

	it("refuses a write when tar failed, instead of treating a failed backup as success", async () => {
		let wrote = false;
		const host = stoppedHost();
		host.replies.push({ match: "tar -C", reply: { code: 2, stdout: "", stderr: "disk full" } });
		const registry = new ToolRegistry({ host, config: DEFAULT_HOST_CONFIG, client: () => ({
			call: async <T>() => { wrote = true; return {} as T; },
		}) });
		await expect(registry.callTool("document.delete", { uuid: "Actor.a", dry_run: false })).rejects.toMatchObject({ code: "backup_failed" });
		expect(wrote).toBe(false);
	});

	it("does not verify deletion as gone when a read is denied", async () => {
		const registry = new ToolRegistry({ host: stoppedHost(), config: DEFAULT_HOST_CONFIG, client: () => ({
			call: async <T>(tool: string) => {
				if (tool === "document.get") throw new BridgeCallError({ code: "permission_denied", message: "denied" });
				return { uuid: "Actor.a", deleted: true } as T;
			},
		}) });
		await expect(registry.callTool("document.delete", { uuid: "Actor.a", dry_run: false })).rejects.toMatchObject({ code: "permission_denied" });
	});

	it("reads back a created document even when it has no name", async () => {
		const calls: string[] = [];
		const registry = new ToolRegistry({ host: stoppedHost(), config: DEFAULT_HOST_CONFIG, client: () => ({
			call: async <T>(tool: string) => {
				calls.push(tool);
				return { uuid: "JournalEntry.a", name: null, data: { pages: [] } } as T;
			},
		}) });
		const result = await registry.callTool("document.create", { collection: "journal", data: { pages: [] }, dry_run: false }) as MutationResult;
		expect(calls).toEqual(["document.create", "document.get"]);
		expect(result.verification[0]?.ok).toBe(true);
	});

	it("rejects malformed preconditions and batches before anything executes", async () => {
		const registry = new ToolRegistry({ host: stoppedHost(), config: DEFAULT_HOST_CONFIG, client: () => null });
		await expect(registry.callTool("document.patch", { uuid: "Actor.a", changes: {}, preconditions: [null] })).rejects.toMatchObject({ code: "invalid_params" });
		await expect(registry.callTool("document.batch", { ops: [{ tool: "macro.run", params: { uuid: "Macro.a" } }] })).rejects.toMatchObject({ code: "invalid_params" });
	});
});
