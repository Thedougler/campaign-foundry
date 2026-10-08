import { describe, expect, it } from "vitest";
import { BridgeCallError } from "../../src/foundry-control/bridge/client.ts";
import { IdempotencyStore } from "../../src/foundry-control/bridge/mutations.ts";
import { ToolError, type ToolName } from "../../src/foundry-control/bridge/schema.ts";
import { ToolRegistry } from "../../src/foundry-control/daemon/registry.ts";
import type { MutationResult } from "../../src/foundry-control/bridge/schema.ts";
import { TOOL_SPECS, specFor, validateParams } from "../../src/foundry-control/daemon/specs.ts";
import type { HostConfig } from "../../src/foundry-control/host/config.ts";
import { ScriptedHost } from "../../src/foundry-control/host/remote.ts";

const CONFIG: HostConfig = {
	ssh: "rpi4",
	composeFile: "/home/nick/compose/foundry/compose.yaml",
	container: "foundry",
	dataPath: "/home/nick/foundry-data",
};

/** A stand-in for the daemon's bridge client: records every call, answers from a script. */
function fakeModuleClient(script: Partial<Record<string, (params: Record<string, unknown>) => unknown>>) {
	const calls: { tool: ToolName; params: Record<string, unknown> }[] = [];
	const client = {
		calls,
		async call<T>(tool: ToolName, params: Record<string, unknown>): Promise<T> {
			calls.push({ tool, params });
			const reply = script[tool];
			if (reply === undefined) throw new Error(`the fake module has no scripted reply for ${tool}`);
			return reply(params) as T;
		},
	};
	return client;
}

/** Docker state replies for the backup paths: running refuses, exited lets the backup run. */
const RUNNING_STATE = JSON.stringify({ Status: "running", StartedAt: "2026-10-05T17:05:32.615Z" });
const STOPPED_STATE = JSON.stringify({ Status: "exited" });

function backupStepsHost(state: string): ScriptedHost {
	return new ScriptedHost([
		{ match: "{{json .State}}", reply: state },
		{ match: "mkdir -p", reply: "" },
		{ match: "tar -C", reply: "" },
		{ match: "sha256sum", reply: "abc123deadbeef  /home/nick/backup-staging/foundry/foundry-data-20261006-220000.tar.gz\n" },
		{ match: "stat -c %s", reply: "12345\n" },
	]);
}

function registry(opts: {
	host?: ScriptedHost;
	client?: ReturnType<typeof fakeModuleClient> | null;
	idempotency?: IdempotencyStore;
}) {
	const host = opts.host ?? backupStepsHost(STOPPED_STATE);
	return {
		host,
		registry: new ToolRegistry({
			host,
			config: CONFIG,
			client: () => opts.client ?? null,
			idempotency: opts.idempotency,
		}),
	};
}

const BAZZOTH = { uuid: "actors.7", name: "Bazzoth", documentName: "Actor", pack: null, data: { name: "Bazzoth", system: { hp: 10 } } };

describe("tool specs", () => {
	it("covers every tool in the bridge contract exactly once", () => {
		const names = TOOL_SPECS.map((s) => s.name).sort();
		const expected = [...new Set([...names])];
		expect(names).toEqual(expected);
		expect(names).toHaveLength(23);
		for (const spec of TOOL_SPECS) {
			expect(spec.description.length, `${spec.name} needs a description agents can act on`).toBeGreaterThan(40);
		}
	});

	it("gives the mutating module tools the discipline fields", () => {
		for (const name of ["document.create", "document.patch", "document.delete", "document.batch", "compendium.import", "setting.set"]) {
			const spec = specFor(name);
			expect(spec?.params.properties.dry_run, `${name} must document dry_run`).toBeDefined();
			expect(spec?.mutating).toBe(true);
		}
		expect(specFor("host.status")?.mutating).toBe(false);
	});

	it("validates required fields and types with the field named", () => {
		const get = specFor("document.get")!;
		expect(validateParams(get, {})).toContain("uuid");
		expect(validateParams(get, { uuid: "actors.1" })).toBeNull();
		expect(validateParams(get, { uuid: 7 })).toContain("uuid");
		expect(validateParams(get, [])).toContain("object");
		const logs = specFor("logs.query")!;
		expect(validateParams(logs, { source: "dreams" })).toContain("container");
	});
});

describe("ToolRegistry routing", () => {
	it("refuses an unknown tool", async () => {
		const { registry: reg } = registry({});
		await expect(reg.callTool("world.explode", {})).rejects.toMatchObject({ code: "unknown_tool" });
	});

	it("refuses params that do not fit the spec, naming the field", async () => {
		const { registry: reg } = registry({});
		const error = await reg.callTool("document.get", {}).catch((e: unknown) => e);
		expect(error).toBeInstanceOf(ToolError);
		expect((error as ToolError).code).toBe("invalid_params");
		expect((error as ToolError).message).toContain("uuid");
	});

	it("answers host.status through the host plane", async () => {
		const host = new ScriptedHost([
			{ match: "{{json .State}}", reply: RUNNING_STATE },
			{ match: "{{json .Config.Labels}}", reply: JSON.stringify({ "com.foundryvtt.version": "14.368" }) },
			{ match: "{{.Config.Image}}", reply: "felddy/foundryvtt:release\n" },
			{ match: "com.foundryvtt.version\"", reply: "14.368\n" },
			{ match: "{{json .NetworkSettings.Ports}}", reply: JSON.stringify({ "30000/tcp": [{ HostPort: "30000" }] }) },
			{ match: "options.json", reply: JSON.stringify({ port: 30000 }) },
			{ match: "Data/worlds", reply: "\n" },
		]);
		const { registry: reg } = registry({ host });
		const status = (await reg.callTool("host.status", {})) as Record<string, unknown>;
		expect(status.container).toBe("foundry");
		expect(status.version).toBe("14.368");
		expect(status.state).toBe("running");
	});

	it("refuses every host-plane mutation with the DM approval command", async () => {
		const cases: [string, Record<string, unknown>, RegExp][] = [
			["host.restart", {}, /cf foundry service restart --yes/],
			["package.install", { zipPath: "/home/nick/cf-bridge.zip", name: "cf-bridge" }, /cf foundry install module --zip \/home\/nick\/cf-bridge\.zip --name cf-bridge --yes/],
			["package.update", { version: "14.369" }, /cf foundry install update --version 14\.369 --yes/],
			["backup.create", { stop: true }, /cf foundry backup create --stop --yes/],
			["backup.restore", { archive: "/home/nick/backup.tar.gz" }, /cf foundry backup restore \/home\/nick\/backup\.tar\.gz --yes/],
			["asset.put", { sourcePath: "/tmp/tok.png", dest: "tokens/tok.png" }, /cf foundry assets put \/tmp\/tok\.png tokens\/tok\.png --yes/],
		];
		for (const [tool, params, command] of cases) {
			const { registry: reg } = registry({});
			const error = (await reg.callTool(tool, params).catch((e: unknown) => e)) as ToolError;
			expect(error.code, tool).toBe("dm_gate");
			expect(error.approvalCommand, tool).toMatch(command);
		}
	});

	it("refuses a module tool while no module is connected, with the remedy", async () => {
		const { registry: reg } = registry({ client: null });
		const error = (await reg.callTool("world.inspect", {}).catch((e: unknown) => e)) as ToolError;
		expect(error.code).toBe("no_module");
		expect(error.message).toContain("cf foundry serve");
	});

	it("forwards a read-only module tool to the connected module", async () => {
		const client = fakeModuleClient({ "world.inspect": () => ({ world: { id: "my-world" } }) });
		const { registry: reg } = registry({ client });
		await expect(reg.callTool("world.inspect", {})).resolves.toEqual({ world: { id: "my-world" } });
		expect(client.calls).toEqual([{ tool: "world.inspect", params: {} }]);
	});

	it("maps a module error into a ToolError with its code", async () => {
		const client = fakeModuleClient({
			"document.get": () => {
				throw new BridgeCallError({ code: "not_found", message: "No document at uuid actors.9." });
			},
		});
		const { registry: reg } = registry({ client });
		await expect(reg.callTool("document.get", { uuid: "actors.9" })).rejects.toMatchObject({ code: "not_found" });
	});
});

describe("ToolRegistry mutation discipline", () => {
	it("previews by default and calls nothing", async () => {
		const client = fakeModuleClient({ "document.patch": () => BAZZOTH });
		const { registry: reg } = registry({ client });
		const result = (await reg.callTool("document.patch", { uuid: "actors.7", changes: { "system.hp": 20 } })) as MutationResult;
		expect(result.dry_run).toBe(true);
		expect(result.plan).toMatchObject({ kind: "document.patch", dry_run: true, backup_before: false, verify_after: true });
		expect(result.warnings.join(" ")).toContain("preconditions");
		expect(client.calls).toEqual([]);
	});

	it("checks preconditions, runs the write and verifies the read-back", async () => {
		let hp = 10;
		const client = fakeModuleClient({
			"document.get": () => ({ ...BAZZOTH, data: { name: "Bazzoth", system: { hp } } }),
			"document.patch": () => {
				hp = 20;
				return { ...BAZZOTH, data: { name: "Bazzoth", system: { hp } } };
			},
		});
		const { registry: reg } = registry({ client });
		const result = (await reg.callTool("document.patch", {
			uuid: "actors.7",
			changes: { "system.hp": 20 },
			preconditions: [{ uuid: "actors.7", path: "system.hp", equals: 10 }],
			dry_run: false,
		})) as Record<string, unknown>;
		expect(client.calls.map((c) => c.tool)).toEqual(["document.get", "document.patch", "document.get"]);
		expect(result.dry_run).toBe(false);
		expect(result.uuids).toEqual(["actors.7"]);
		expect(result.state).toMatchObject({ "actors.7": { system: { hp: 20 } } });
		expect(result.verification).toEqual([{ uuid: "actors.7", ok: true, detail: "system.hp" }]);
		expect(result.warnings).toEqual([]);
	});

	it("stops at a failed precondition without writing", async () => {
		const client = fakeModuleClient({
			"document.get": () => ({ ...BAZZOTH, data: { name: "Someone Else", system: { hp: 10 } } }),
		});
		const { registry: reg } = registry({ client });
		const error = (await reg
			.callTool("document.patch", {
				uuid: "actors.7",
				changes: { "system.hp": 20 },
				preconditions: [{ uuid: "actors.7", path: "name", equals: "Bazzoth" }],
				dry_run: false,
			})
			.catch((e: unknown) => e)) as ToolError;
		expect(error.code).toBe("precondition_failed");
		expect(error.message).toContain("Someone Else");
		expect(client.calls.map((c) => c.tool)).toEqual(["document.get"]);
	});

	it("flags a read-back that does not match the write", async () => {
		const client = fakeModuleClient({
			"document.get": () => ({ ...BAZZOTH, data: { name: "Bazzoth", system: { hp: 10 } } }),
			"document.patch": () => ({ ...BAZZOTH, data: { name: "Bazzoth", system: { hp: 10 } } }),
		});
		const { registry: reg } = registry({ client });
		const result = (await reg.callTool("document.patch", {
			uuid: "actors.7",
			changes: { "system.hp": 20 },
			dry_run: false,
		})) as Record<string, unknown>;
		expect(result.verification).toEqual([{ uuid: "actors.7", ok: false, detail: "system.hp" }]);
	});

	it("takes a backup first when asked, with a stopped world", async () => {
		const client = fakeModuleClient({
			"document.patch": () => ({ ...BAZZOTH, data: { name: "Bazzoth", system: { hp: 20 } } }),
			"document.get": () => ({ ...BAZZOTH, data: { name: "Bazzoth", system: { hp: 20 } } }),
		});
		const { host, registry: reg } = registry({ client });
		const result = (await reg.callTool("document.patch", {
			uuid: "actors.7",
			changes: { "system.hp": 20 },
			dry_run: false,
			backup_before: true,
		})) as MutationResult;
		expect(host.ran.join(" ")).toContain("tar -C /home/nick -czf");
		expect(result.backup?.dest).toContain("backup-staging/foundry/foundry-data-");
	});

	it("refuses the whole write when the pre-write backup finds a running world", async () => {
		const client = fakeModuleClient({ "document.batch": () => ({ mode: "sequential", results: [] }) });
		const { registry: reg } = registry({ client, host: backupStepsHost(RUNNING_STATE) });
		const error = (await reg
			.callTool("document.batch", { ops: [], dry_run: false })
			.catch((e: unknown) => e)) as ToolError;
		expect(error.code).toBe("backup_refused");
		expect(error.approvalCommand).toBe("cf foundry backup create --stop --yes");
		expect(client.calls).toEqual([]);
	});

	it("forces the backup for batch and delete and warns when the caller opted out", async () => {
		const client = fakeModuleClient({
			"document.delete": () => ({ uuid: "actors.7", deleted: true }),
			"document.get": () => {
				throw new BridgeCallError({ code: "not_found", message: "No document at uuid actors.7." });
			},
		});
		const { registry: reg } = registry({ client });
		const result = (await reg.callTool("document.delete", { uuid: "actors.7", dry_run: false, backup_before: false })) as MutationResult;
		expect(result.warnings.join(" ")).toContain("forced");
		expect(result.verification).toEqual([{ uuid: "actors.7", ok: true, detail: "gone" }]);
		expect(result.uuids).toEqual(["actors.7"]);
		expect(result.state).toEqual({});
	});

	it("verifies a delete as gone only when the read-back says not found", async () => {
		const client = fakeModuleClient({
			"document.delete": () => ({ uuid: "actors.7", deleted: true }),
			"document.get": () => BAZZOTH,
		});
		const { registry: reg } = registry({ client });
		const result = (await reg.callTool("document.delete", { uuid: "actors.7", dry_run: false })) as MutationResult;
		expect(result.verification).toEqual([{ uuid: "actors.7", ok: false, detail: "still present" }]);
	});

	it("replays a repeated idempotency key without touching the module", async () => {
		const client = fakeModuleClient({
			"document.get": () => BAZZOTH,
			"setting.set": () => ({ scope: "module", key: "url", value: "ws://x" }),
			"setting.get": () => "ws://x",
		});
		const { registry: reg } = registry({ client });
		const params = { scope: "module", key: "url", value: "ws://x", dry_run: false, idempotency_key: "cfg-1" };
		const first = (await reg.callTool("setting.set", { ...params })) as Record<string, unknown>;
		const second = (await reg.callTool("setting.set", { ...params })) as Record<string, unknown>;
		expect(first.replayed).toBe(false);
		expect(second.replayed).toBe(true);
		expect(client.calls.filter((c) => c.tool === "setting.set")).toHaveLength(1);
	});

	it("refuses to reuse an idempotency key with different params", async () => {
		const client = fakeModuleClient({
			"document.get": () => BAZZOTH,
			"document.patch": () => BAZZOTH,
		});
		const { registry: reg } = registry({ client });
		await reg.callTool("document.patch", { uuid: "actors.7", changes: { a: 1 }, dry_run: false, idempotency_key: "k" });
		await expect(
			reg.callTool("document.patch", { uuid: "actors.7", changes: { a: 2 }, dry_run: false, idempotency_key: "k" }),
		).rejects.toThrow(/already used with different params/);
	});

	it("collects uuids and state across a batch", async () => {
		const client = fakeModuleClient({
			"document.get": (params) => {
				if (params.uuid === "actors.1") throw new BridgeCallError({ code: "not_found", message: "gone" });
				return { uuid: params.uuid as string, name: "Kept", data: { name: "Kept", touched: true } };
			},
			"document.batch": () => ({
				mode: "sequential",
				results: [
					{ uuid: "actors.2", name: "Kept", data: { name: "Kept", touched: true } },
					{ uuid: "actors.1", deleted: true },
				],
			}),
		});
		const { registry: reg } = registry({ client });
		const result = (await reg.callTool("document.batch", {
			label: "session 12 push",
			dry_run: false,
			ops: [
				{ tool: "document.patch", params: { uuid: "actors.2", changes: { touched: true } } },
				{ tool: "document.delete", params: { uuid: "actors.1" } },
			],
		})) as Record<string, unknown>;
		expect(result.uuids).toEqual(["actors.2", "actors.1"]);
		expect(result.state).toEqual({ "actors.2": { name: "Kept", touched: true } });
		expect(result.verification).toEqual([
			{ uuid: "actors.2", ok: true, detail: "touched" },
			{ uuid: "actors.1", ok: true, detail: "gone" },
		]);
	});
});
