import type { Readable, Writable } from "node:stream";
import { fromJsonSchema, McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { ToolError } from "../bridge/schema.ts";
import { TOOL_SPECS } from "./specs.ts";

export const SERVER_INFO = { name: "campaign-foundry-foundry-control", version: "0.1.0" };

export interface McpRegistry {
	callTool(tool: string, params: Record<string, unknown>): Promise<unknown>;
}

export function createMcpServer(registry: McpRegistry): McpServer {
	const server = new McpServer(SERVER_INFO);
	for (const spec of TOOL_SPECS) {
		const properties = Object.fromEntries(
			Object.entries(spec.params.properties).map(([key, property]) => {
				const { type, ...rest } = property;
				return [key, type === "any" ? rest : { type, ...rest }];
			}),
		);
		server.registerTool(
			spec.name,
			{
				description: spec.description,
				inputSchema: fromJsonSchema<Record<string, unknown>>({
					type: "object",
					required: [...spec.params.required],
					properties,
				}),
			},
			async (params) => {
				try {
					const result = await registry.callTool(spec.name, params);
					return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
				} catch (error) {
					const message = error instanceof Error ? error.message : String(error);
					const text =
						error instanceof ToolError && error.approvalCommand !== null
							? `${message}\nDM approval command: ${error.approvalCommand}`
							: message;
					return { content: [{ type: "text", text }], isError: true };
				}
			},
		);
	}
	return server;
}

/** The SDK owns framing, negotiation and request dispatch; EOF stops the daemon. */
export async function runStdioMcp(registry: McpRegistry, input: Readable, output: Writable): Promise<void> {
	const server = createMcpServer(registry);
	const { promise, resolve } = Promise.withResolvers<void>();
	server.server.onclose = resolve;
	await server.connect(new StdioServerTransport(input, output));
	await promise;
}
