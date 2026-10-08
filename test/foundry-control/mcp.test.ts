import { PassThrough } from "node:stream";
import { describe, expect, it } from "vitest";
import { handleLine, runStdioMcp, SERVER_INFO } from "../../src/foundry-control/daemon/mcp.ts";
import type { McpRegistry } from "../../src/foundry-control/daemon/mcp.ts";
import { ToolError } from "../../src/foundry-control/bridge/schema.ts";

/** A registry stand-in: answers from a script, records every call. */
function stubRegistry(script: Record<string, (params: Record<string, unknown>) => unknown> = {}) {
	const calls: { tool: string; params: Record<string, unknown> }[] = [];
	return {
		calls,
		async callTool(tool: string, params: Record<string, unknown>): Promise<unknown> {
			calls.push({ tool, params });
			const reply = script[tool];
			if (reply === undefined) throw new Error(`no scripted reply for ${tool}`);
			return reply(params);
		},
	};
}

function request(id: number | string | null, method: string, params: unknown = {}): string {
	return JSON.stringify(id === null ? { method, params } : { jsonrpc: "2.0", id, method, params });
}

function parse(line: string): Record<string, unknown> {
	return JSON.parse(line) as Record<string, unknown>;
}

/** Awaits one line's response and parses it, failing the test when none came. */
async function replyOf(registry: McpRegistry, line: string): Promise<Record<string, unknown>> {
	const response = await handleLine(registry, line);
	expect(response).not.toBeNull();
	return JSON.parse(response!) as Record<string, unknown>;
}

describe("handleLine", () => {
	it("answers initialize by echoing the client protocol version", async () => {
		const reply = await replyOf(stubRegistry(), request(1, "initialize", { protocolVersion: "2025-03-26", capabilities: {} }));
		expect(reply.id).toBe(1);
		expect(reply.error).toBeUndefined();
		const result = reply.result as { protocolVersion: string; serverInfo: { name: string }; capabilities: Record<string, unknown> };
		expect(result.protocolVersion).toBe("2025-03-26");
		expect(result.serverInfo.name).toBe(SERVER_INFO.name);
		expect(result.capabilities.tools).toBeDefined();
	});

	it("lists every tool with its params as an input schema", async () => {
		const reply = await replyOf(stubRegistry(), request(2, "tools/list"));
		const tools = (reply.result as { tools: { name: string; inputSchema: Record<string, unknown> }[] }).tools;
		expect(tools).toHaveLength(23);
		const patch = tools.find((t) => t.name === "document.patch");
		expect(patch?.inputSchema.type).toBe("object");
		expect((patch?.inputSchema.required as string[]).includes("uuid")).toBe(true);
		expect((patch?.inputSchema.properties as Record<string, unknown>).dry_run).toBeDefined();
	});

	it("runs a tool and returns its result as text content", async () => {
		const registry = stubRegistry({ "document.patch": () => ({ dry_run: true, uuids: [] }) });
		const reply = await replyOf(registry, request(3, "tools/call", { name: "document.patch", arguments: { uuid: "actors.7", changes: {} } }));
		expect(reply.error).toBeUndefined();
		expect(registry.calls).toEqual([{ tool: "document.patch", params: { uuid: "actors.7", changes: {} } }]);
		const result = reply.result as { content: { type: string; text: string }[]; isError?: boolean };
		expect(result.isError).toBeUndefined();
		expect((JSON.parse(result.content[0]!.text) as { dry_run: boolean }).dry_run).toBe(true);
	});

	it("carries a tool error as an isError result with the approval command", async () => {
		const registry = stubRegistry({
			"host.restart": () => {
				throw new ToolError("dm_gate", "host.restart changes the live instance.", "cf foundry service restart --yes");
			},
		});
		const reply = await replyOf(registry, request(4, "tools/call", { name: "host.restart", arguments: {} }));
		const result = reply.result as { content: { text: string }[]; isError: boolean };
		expect(result.isError).toBe(true);
		expect(result.content[0]!.text).toContain("cf foundry service restart --yes");
	});

	it("answers an unknown tool name with -32602", async () => {
		const reply = await replyOf(stubRegistry(), request(5, "tools/call", { name: "world.explode", arguments: {} }));
		expect((reply.error as { code: number }).code).toBe(-32602);
	});

	it("answers an unknown method with -32601 and ping with an empty result", async () => {
		const missing = await replyOf(stubRegistry(), request(6, "resources/list"));
		expect((missing.error as { code: number }).code).toBe(-32601);
		const ping = await replyOf(stubRegistry(), request(7, "ping"));
		expect(ping.result).toEqual({});
	});

	it("stays silent for notifications and reports invalid JSON as -32700", async () => {
		expect(await handleLine(stubRegistry(), request(null, "notifications/initialized"))).toBeNull();
		const broken = await replyOf(stubRegistry(), "{not json");
		expect((broken.error as { code: number }).code).toBe(-32700);
		expect(broken.id).toBeNull();
	});
});

describe("runStdioMcp", () => {
	it("answers newline-delimited requests in order and ends when stdin ends", async () => {
		const input = new PassThrough();
		const output = new PassThrough();
		const chunks: string[] = [];
		output.on("data", (chunk: Buffer) => chunks.push(chunk.toString()));
		const registry = stubRegistry({ "host.status": () => ({ container: "foundry", version: "14.368" }) });
		const done = runStdioMcp(registry, input, output);
		input.write(`${request(1, "initialize", { protocolVersion: "2025-06-18" })}\n`);
		input.write(`${request(2, "tools/call", { name: "host.status", arguments: {} })}\n`);
		input.write(`${request(null, "notifications/initialized")}\n`);
		input.write(`${request(3, "ping")}\n`);
		input.end();
		await done;
		await new Promise((resolve) => setImmediate(resolve));
		const lines = chunks.join("").trim().split("\n");
		expect(lines).toHaveLength(3);
		expect(parse(lines[0]!).id).toBe(1);
		const toolResult = parse(lines[1]!) as { result: { content: { text: string }[] } };
		expect((JSON.parse(toolResult.result.content[0]!.text) as { version: string }).version).toBe("14.368");
		expect(parse(lines[2]!).id).toBe(3);
	});
});
