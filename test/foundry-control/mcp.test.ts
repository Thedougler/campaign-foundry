import { afterEach, describe, expect, it } from "vitest";
import { Client, InMemoryTransport } from "@modelcontextprotocol/client";
import { createMcpServer, SERVER_INFO } from "../../src/foundry-control/daemon/mcp.ts";
import { ToolError } from "../../src/foundry-control/bridge/schema.ts";

const clients: Client[] = [];
afterEach(async () => {
	for (const client of clients.splice(0)) await client.close();
});
function stubRegistry(script: Record<string, (params: Record<string, unknown>) => unknown> = {}) {
	const calls: { tool: string; params: Record<string, unknown> }[] = [];
	return {
		calls,
		async callTool(tool: string, params: Record<string, unknown>) {
			calls.push({ tool, params });
			const reply = script[tool];
			if (reply === undefined) throw new Error(`no scripted reply for ${tool}`);
			return reply(params);
		},
	};
}
async function connect(registry = stubRegistry()) {
	const server = createMcpServer(registry);
	const client = new Client({ name: "test", version: "1" });
	clients.push(client);
	const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
	await server.connect(serverTransport);
	await client.connect(clientTransport);
	return client;
}

describe("MCP server", () => {
	it("negotiates a connection with server identity and tool capability", async () => {
		const client = await connect();
		expect(client.getServerVersion()).toEqual(SERVER_INFO);
		expect(client.getServerCapabilities()?.tools).toBeDefined();
		await expect(client.ping()).resolves.toEqual({});
	});
	it("lists every tool with its input schema", async () => {
		const { tools } = await (await connect()).listTools();
		expect(tools).toHaveLength(23);
		const patch = tools.find((tool) => tool.name === "document.patch")!;
		expect(patch.inputSchema.type).toBe("object");
		expect(patch.inputSchema.required).toContain("uuid");
		expect(patch.inputSchema.properties?.dry_run).toBeDefined();
	});
	it("routes a tool and returns text content", async () => {
		const registry = stubRegistry({ "document.patch": () => ({ dry_run: true, uuids: [] }) });
		const client = await connect(registry);
		const result = await client.callTool({ name: "document.patch", arguments: { uuid: "actors.7", changes: {} } });
		expect(registry.calls).toEqual([{ tool: "document.patch", params: { uuid: "actors.7", changes: {} } }]);
		expect(result).toMatchObject({
			content: [{ type: "text", text: JSON.stringify({ dry_run: true, uuids: [] }, null, 2) }],
		});
		expect(result.isError).toBeUndefined();
	});
	it("carries tool errors and the approval command", async () => {
		const client = await connect(
			stubRegistry({
				"host.restart": () => {
					throw new ToolError(
						"dm_gate",
						"host.restart changes the live instance.",
						"cfcli foundry service restart --yes",
					);
				},
			}),
		);
		expect(await client.callTool({ name: "host.restart", arguments: {} })).toMatchObject({
			isError: true,
			content: [{ text: expect.stringContaining("cfcli foundry service restart --yes") }],
		});
	});
	it("rejects unknown tools without calling the registry", async () => {
		const registry = stubRegistry();
		await expect((await connect(registry)).callTool({ name: "world.explode", arguments: {} })).rejects.toThrow();
		expect(registry.calls).toEqual([]);
	});
});
