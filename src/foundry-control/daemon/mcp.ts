/**
 * The daemon's MCP surface: JSON-RPC 2.0 over newline-delimited stdio. `handleLine` is the pure
 * seam (one line in, one response line or null for notifications); `runStdioMcp` wires it between
 * any readable and writable stream, so `cf foundry serve` and tests share the exact same path.
 */

import * as readline from "node:readline";
import { ToolError } from "../bridge/schema.ts";
import { TOOL_SPECS } from "./specs.ts";

export const SERVER_INFO = { name: "campaign-foundry-foundry-control", version: "0.1.0" };

/** The default protocol version when the client does not send one. */
const DEFAULT_PROTOCOL_VERSION = "2025-06-18";

/** What the MCP layer needs from the daemon: one tool call. `ToolRegistry` satisfies this. */
export interface McpRegistry {
	callTool(tool: string, params: Record<string, unknown>): Promise<unknown>;
}

interface JsonRpcError {
	code: number;
	message: string;
}

function response(id: number | string | null, result: unknown): string {
	return JSON.stringify({ jsonrpc: "2.0", id, result });
}

function failure(id: number | string | null, code: number, message: string): string {
	const error: JsonRpcError = { code, message };
	return JSON.stringify({ jsonrpc: "2.0", id, error });
}

/** A tool's params schema as MCP `inputSchema`. */
function inputSchemaOf(spec: (typeof TOOL_SPECS)[number]): Record<string, unknown> {
	const properties = Object.fromEntries(Object.entries(spec.params.properties).map(([key, property]) => {
		const { type, ...rest } = property;
		return [key, type === "any" ? rest : { type, ...rest }];
	}));
	return { type: "object", required: spec.params.required, properties };
}

/** A parsed JSON-RPC message with the guards already applied. */
interface Incoming {
	method: string;
	params: Record<string, unknown>;
	id: number | string | null;
	isNotification: boolean;
}

/** Parses one line into an Incoming, or returns the JSON-RPC error line for what it is not. */
function parseIncoming(trimmed: string): { incoming: Incoming } | { error: string } {
	let message: unknown;
	try {
		message = JSON.parse(trimmed);
	} catch {
		return { error: failure(null, -32700, "Parse error: the line is not valid JSON.") };
	}
	if (typeof message !== "object" || message === null || !("method" in message) || typeof message.method !== "string") {
		return { error: failure(null, -32600, "Invalid Request: expected a JSON-RPC 2.0 message.") };
	}
	const isNotification = !("id" in message);
	const rawId = "id" in message ? message.id : null;
	const id = typeof rawId === "number" || typeof rawId === "string" ? rawId : null;
	const params =
		"params" in message && typeof message.params === "object" && message.params !== null
			? (message.params as Record<string, unknown>)
			: {};
	return { incoming: { method: message.method, params, id, isNotification } };
}

/** Handles one stdio line; returns the response line, or null for notifications (no response). */
export async function handleLine(registry: McpRegistry, line: string): Promise<string | null> {
	const trimmed = line.trim();
	if (trimmed === "") return null;
	const parsed = parseIncoming(trimmed);
	if ("error" in parsed) return parsed.error;
	const { method, params, id, isNotification } = parsed.incoming;

	switch (method) {
		case "initialize": {
			const clientVersion = typeof params.protocolVersion === "string" ? params.protocolVersion : DEFAULT_PROTOCOL_VERSION;
			const result = {
				protocolVersion: clientVersion,
				capabilities: { tools: { listChanged: false } },
				serverInfo: SERVER_INFO,
			};
			return isNotification ? null : response(id, result);
		}
		case "ping":
			return isNotification ? null : response(id, {});
		case "tools/list": {
			const result = { tools: TOOL_SPECS.map((spec) => ({ name: spec.name, description: spec.description, inputSchema: inputSchemaOf(spec) })) };
			return isNotification ? null : response(id, result);
		}
		case "tools/call": {
			if (isNotification) return null;
			const name = typeof params.name === "string" ? params.name : "";
			if (name === "" || TOOL_SPECS.every((spec) => spec.name !== name)) {
				return failure(id, -32602, `Invalid params: unknown tool ${String(params.name)}.`);
			}
			const toolParams =
				"arguments" in params && typeof params.arguments === "object" && params.arguments !== null
					? (params.arguments as Record<string, unknown>)
					: {};
			try {
				const result = await registry.callTool(name, toolParams);
				return response(id, { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] });
			} catch (error) {
				// A tool failure is a tool result (isError), not a JSON-RPC error: the call happened, the tool refused.
				const toolError = error instanceof ToolError ? error : null;
				const messageText = toolError?.message ?? (error instanceof Error ? error.message : String(error));
				const text =
					toolError !== null && toolError.approvalCommand !== null
						? `${messageText}\nDM approval command: ${toolError.approvalCommand}`
						: messageText;
				return response(id, { content: [{ type: "text", text }], isError: true });
			}
		}
		default:
			// Known notifications stay silent; unknown requests get -32601.
			if (method.startsWith("notifications/")) return null;
			return isNotification ? null : failure(id, -32601, `Method not found: ${method}.`);
	}
}

/** Pumps newline-delimited JSON-RPC from `input` to `output` until `input` ends. */
export function runStdioMcp(registry: McpRegistry, input: NodeJS.ReadableStream, output: NodeJS.WritableStream): Promise<void> {
	const { promise, resolve } = Promise.withResolvers<void>();
	const lines = readline.createInterface({ input });
	// Responses serialize through one queue, so replies leave in request order.
	let queue = Promise.resolve();
	lines.on("line", (line) => {
		queue = queue.then(async () => {
			const reply = await handleLine(registry, line);
			if (reply !== null) output.write(`${reply}\n`);
		});
	});
	lines.on("close", () => {
		void queue.then(() => resolve());
	});
	return promise;
}
