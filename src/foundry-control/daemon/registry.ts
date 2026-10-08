/**
 * The ToolRegistry: one `callTool` entry point that routes every tool by plane and enforces the
 * mutation discipline on module-plane writes (issue #46). The order is fixed: validate → route →
 * plan → dry-run preview → idempotency replay → preconditions → backup → execute → verify.
 * Host-plane mutations never run through the daemon: they refuse with the DM approval command.
 */

import { BridgeCallError } from "../bridge/client.ts";
import { IdempotencyStore, planMutation, withIdempotency, type MutationKind, type MutationPlan } from "../bridge/mutations.ts";
import { ToolError, type MutationResult, type ToolName } from "../bridge/schema.ts";
import type { HostConfig } from "../host/config.ts";
import { createBackup, RefusalError } from "../host/backup.ts";
import { queryLogs } from "../host/logs.ts";
import type { RemoteHost } from "../host/remote.ts";
import { hostStatus } from "../host/status.ts";
import { specFor, validateParams } from "./specs.ts";

/** What the daemon needs from the module connection; `BridgeClient` satisfies this structurally. */
export interface ModuleCall {
	call<T = unknown>(tool: ToolName, params: Record<string, unknown>, opts?: { timeoutMs?: number }): Promise<T>;
}

export interface RegistryDeps {
	host: RemoteHost;
	config: HostConfig;
	/** The active module connection, or null while no module is connected. */
	client: () => ModuleCall | null;
	idempotency?: IdempotencyStore;
}

/** The disciplined writes, keyed by tool name. */
const MUTATION_KINDS: Record<string, MutationKind> = {
	"document.create": "document.create",
	"document.patch": "document.patch",
	"document.delete": "document.delete",
	"document.batch": "document.batch",
	"compendium.import": "compendium.import",
	"setting.set": "setting.set",
	"macro.run": "macro.run",
};

/** Host-plane mutations the daemon refuses, keyed by tool name; each builds the DM approval command. */
const DM_GATES: Record<string, (params: Record<string, unknown>) => string> = {
	"host.restart": () => "cf foundry service restart --yes",
	"package.install": (p) => `cf foundry install module --zip ${p.zipPath} --name ${p.name} --yes`,
	"package.update": (p) => `cf foundry install update${p.version === undefined ? "" : ` --version ${p.version}`} --yes`,
	"backup.create": (p) => `cf foundry backup create${p.stop === true ? " --stop" : ""}${p.dest === undefined ? "" : ` --dest ${p.dest}`} --yes`,
	"backup.restore": (p) => `cf foundry backup restore ${p.archive} --yes`,
	"asset.put": (p) => `cf foundry assets put ${p.sourcePath ?? "<base64 bytes>"} ${p.dest} --yes`,
};

interface Verification {
	uuid: string;
	ok: boolean;
	detail?: string;
}

/** A document read-back: found with its source, or the module's refusal. */
type ReadBack = { found: true; data: unknown; name: unknown } | { found: false; message: string };

/** The module's per-document result shape (create, patch, compendium rows). */
function isDocResult(value: unknown): value is { uuid: string; name: string | null; data: unknown } {
	return (
		typeof value === "object" &&
		value !== null &&
		"uuid" in value &&
		typeof value.uuid === "string" &&
		"name" in value
	);
}

function isDeleteResult(value: unknown): value is { uuid: string; deleted: boolean } {
	return typeof value === "object" && value !== null && "uuid" in value && typeof value.uuid === "string" && "deleted" in value;
}

function isBatchResult(value: unknown): value is { mode: string; results: unknown[] } {
	return typeof value === "object" && value !== null && "results" in value && Array.isArray(value.results);
}

function isBatchOp(value: unknown): value is { tool: string; params: Record<string, unknown> } {
	return typeof value === "object" && value !== null && "tool" in value && typeof value.tool === "string" && "params" in value;
}


function isStringRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Reads a dot-separated path from a JSON-ish value; undefined as soon as a segment is missing. */
function getPath(source: unknown, path: string): unknown {
	let current: unknown = source;
	for (const segment of path.split(".")) {
		if (typeof current !== "object" || current === null || !(segment in current)) return undefined;
		// `in` cannot type a computed key on unknown; the object shape was checked on the line above.
		const record: Record<string, unknown> = current as Record<string, unknown>;
		current = record[segment];
	}
	return current;
}

/** Structural equality over JSON-ish values: missing and undefined compare equal. */
function deepEqual(a: unknown, b: unknown): boolean {
	if (a === b) return true;
	if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
	if (Array.isArray(a) !== Array.isArray(b)) return false;
	const aRecord = a as Record<string, unknown>;
	const bRecord = b as Record<string, unknown>;
	const aKeys = Object.keys(aRecord).filter((key) => aRecord[key] !== undefined);
	const bKeys = Object.keys(bRecord).filter((key) => bRecord[key] !== undefined);
	if (aKeys.length !== bKeys.length) return false;
	return aKeys.every((key) => key in bRecord && deepEqual(aRecord[key], bRecord[key]));
}

export class ToolRegistry {
	private readonly deps: RegistryDeps;
	/** Used when the caller gave no store: survives the registry's life, not the daemon's restarts. */
	private readonly memoryStore = new IdempotencyStore();

	constructor(deps: RegistryDeps) {
		this.deps = deps;
	}

	async callTool(tool: string, params: Record<string, unknown>): Promise<unknown> {
		const spec = specFor(tool);
		if (spec === undefined) throw new ToolError("unknown_tool", `No tool ${tool}; the tools/list answer names every tool.`);
		const invalid = validateParams(spec, params);
		if (invalid !== null) throw new ToolError("invalid_params", invalid);
		if (spec.plane === "host") return this.hostTool(tool, params);
		const kind = MUTATION_KINDS[tool];
		if (kind !== undefined) {
			const plan = planMutation(kind, params);
			if (plan.dry_run) return { ...this.preview(plan), preview: params };
		}
		const client = this.deps.client();
		if (client === null) {
			throw new ToolError(
				"no_module",
				"No module is connected: enable the cf-bridge module in the world, start the daemon with `cf foundry serve`, and retry.",
			);
		}
		if (kind === undefined) return this.forward(tool as ToolName, params, client);
		return this.mutate(kind, tool as ToolName, params, client);
	}

	private async hostTool(tool: string, params: Record<string, unknown>): Promise<unknown> {
		const gate = DM_GATES[tool];
		if (gate !== undefined) {
			const command = gate(params);
			throw new ToolError(
				"dm_gate",
				`${tool} changes the live Foundry instance, which the daemon never does on its own (issue #46: live-instance mutations are DM-gated). After DM approval, run: ${command}`,
				command,
			);
		}
		if (tool === "host.status") return hostStatus(this.deps.host, this.deps.config);
		if (tool === "logs.query") return queryLogs(this.deps.host, this.deps.config, params);
		throw new ToolError("unknown_tool", `No host handler for ${tool}.`);
	}

	private async forward(tool: ToolName, params: Record<string, unknown>, client: ModuleCall): Promise<unknown> {
		try {
			return await client.call(tool, params);
		} catch (error) {
			throw bridgeError(error);
		}
	}

	private async mutate(kind: MutationKind, tool: ToolName, params: Record<string, unknown>, client: ModuleCall): Promise<MutationResult> {
		const plan = planMutation(kind, params);
		if (plan.dry_run) return this.preview(plan);
		const run = async (): Promise<MutationResult> => {
			await this.checkPreconditions(plan, client);
			const backup = await this.backupBefore(plan);
			const result = await this.forward(tool, params, client);
			const verification = plan.verify_after ? await this.verify(kind, params, result, client) : [];
			return this.assemble(kind, params, result, plan, verification, backup);
		};
		if (plan.idempotency_key === undefined) return { ...await run(), replayed: false };
		const store = this.deps.idempotency ?? this.memoryStore;
		return withIdempotency(store, plan.idempotency_key, tool, params, run);
	}

	private preview(plan: MutationPlan): MutationResult {
		return {
			uuids: [],
			state: {},
			warnings: plan.warnings,
			verification: [],
			dry_run: true,
			replayed: false,
			backup: null,
			plan: {
				kind: plan.kind,
				dry_run: true,
				preconditions: plan.preconditions,
				idempotency_key: plan.idempotency_key ?? null,
				backup_before: plan.backup_before,
				verify_after: plan.verify_after,
			},
		};
	}

	/** Guards in front of the write: each precondition's document must hold `equals` at `path`. */
	private async checkPreconditions(plan: MutationPlan, client: ModuleCall): Promise<void> {
		for (const precondition of plan.preconditions) {
			if (
				typeof precondition.uuid !== "string" ||
				typeof precondition.path !== "string" ||
				!("equals" in precondition)
			) {
				throw new ToolError("invalid_params", "Every precondition needs uuid (string), path (string) and equals.");
			}
			const read = await this.moduleGet(client, precondition.uuid);
			if (!read.found) {
				throw new ToolError("precondition_failed", `Precondition target ${precondition.uuid} could not be read: ${read.message}`);
			}
			const actual = getPath(read.data, precondition.path);
			if (!deepEqual(actual, precondition.equals)) {
				throw new ToolError(
					"precondition_failed",
					`Precondition failed for ${precondition.uuid} at ${precondition.path}: expected ${JSON.stringify(precondition.equals)}, found ${JSON.stringify(actual)}.`,
				);
			}
		}
	}

	/** The pre-write backup. A running world refuses (official guidance: shut down before copying). */
	private async backupBefore(plan: MutationPlan): Promise<{ dest: string } | null> {
		if (!plan.backup_before) return null;
		try {
			const result = await createBackup(this.deps.host, this.deps.config, {});
			if (!result.ok) throw new ToolError("backup_failed", `The pre-write backup failed: ${result.error ?? "unknown error"}`);
			return { dest: result.dest };
		} catch (error) {
			if (error instanceof RefusalError) throw new ToolError("backup_refused", error.message, error.command);
			throw error;
		}
	}

	/** Reads one document through the module; a not-found read is an answer, not a transport error. */
	private async moduleGet(client: ModuleCall, uuid: string): Promise<ReadBack> {
		try {
			const result = await client.call<{ data?: unknown; name?: unknown } & object>("document.get", { uuid });
			return { found: true, data: result.data ?? null, name: result.name ?? null };
		} catch (error) {
			if (error instanceof BridgeCallError && error.code === "not_found") return { found: false, message: error.message };
			throw bridgeError(error);
		}
	}

	private async verify(
		kind: MutationKind,
		params: Record<string, unknown>,
		result: unknown,
		client: ModuleCall,
	): Promise<Verification[]> {
		if (kind === "macro.run") {
			return [{ uuid: params.uuid as string, ok: false, detail: "Arbitrary macro side effects cannot be verified automatically. Inspect the affected documents." }];
		}
		if (kind === "setting.set") return [await this.verifySetting(params, client)];
		if (kind === "document.patch") {
			const paths = Object.entries(params.changes as Record<string, unknown>);
			return [await this.verifyPaths(params.uuid as string, paths, client)];
		}
		if (kind === "document.delete") return [await this.verifyGone(params.uuid as string, client)];
		if (kind === "document.create") {
			if (!isDocResult(result)) return [{ uuid: "<unknown>", ok: false, detail: "the module returned no document" }];
			const paths = isStringRecord(params.data) ? Object.entries(params.data) : [];
			return [await this.verifyPaths(result.uuid, paths, client)];
		}
		if (kind === "compendium.import") return this.verifyImport(result, client);
		if (kind === "document.batch") return this.verifyBatch(params, result, client);
		return [];
	}

	private async verifySetting(params: Record<string, unknown>, client: ModuleCall): Promise<Verification> {
		const key = `${params.scope}.${params.key}`;
		try {
			const readBack = await client.call<unknown>("setting.get", { scope: params.scope, key: params.key });
			return deepEqual(readBack, params.value)
				? { uuid: key, ok: true, detail: "read back equal" }
				: { uuid: key, ok: false, detail: `read back ${JSON.stringify(readBack)}` };
		} catch (error) {
			throw bridgeError(error);
		}
	}

	private async verifyPaths(uuid: string, paths: [string, unknown][], client: ModuleCall): Promise<Verification> {
		const read = await this.moduleGet(client, uuid);
		if (!read.found) return { uuid, ok: false, detail: `unreadable after write: ${read.message}` };
		const mismatched: string[] = [];
		for (const [path, expected] of paths) {
			if (!deepEqual(getPath(read.data, path), expected)) mismatched.push(path);
		}
		return mismatched.length === 0
			? { uuid, ok: true, detail: paths.map(([path]) => path).join(", ") }
			: { uuid, ok: false, detail: mismatched.join(", ") };
	}

	private async verifyGone(uuid: string, client: ModuleCall): Promise<Verification> {
		const read = await this.moduleGet(client, uuid);
		return read.found ? { uuid, ok: false, detail: "still present" } : { uuid, ok: true, detail: "gone" };
	}

	private async verifyImport(result: unknown, client: ModuleCall): Promise<Verification[]> {
		if (typeof result !== "object" || result === null || !("documents" in result) || !Array.isArray(result.documents)) {
			return [{ uuid: "<unknown>", ok: false, detail: "the module returned no documents" }];
		}
		const verifications: Verification[] = [];
		for (const row of result.documents) {
			if (!isDocResult(row)) continue;
			const read = await this.moduleGet(client, row.uuid);
			verifications.push(
				read.found
					? { uuid: row.uuid, ok: true, detail: typeof row.name === "string" ? row.name : "read back" }
					: { uuid: row.uuid, ok: false, detail: `unreadable after write: ${read.message}` },
			);
		}
		return verifications;
	}

	private async verifyBatch(params: Record<string, unknown>, result: unknown, client: ModuleCall): Promise<Verification[]> {
		const ops = Array.isArray(params.ops) ? params.ops : [];
		if (!isBatchResult(result)) return [{ uuid: "<unknown>", ok: false, detail: "the module returned no results" }];
		const verifications: Verification[] = [];
		for (const [index, opValue] of ops.entries()) {
			const op = isBatchOp(opValue) ? opValue : null;
			const opResult = result.results[index];
			if (op === null) continue;
			if (op.tool === "document.delete" && isDeleteResult(opResult)) {
				verifications.push(await this.verifyGone(opResult.uuid, client));
			} else if (opResult !== undefined && isDocResult(opResult)) {
				const changes = isStringRecord(op.params.changes) ? Object.entries(op.params.changes)
					: isStringRecord(op.params.data) ? Object.entries(op.params.data) : [];
				verifications.push(await this.verifyPaths(opResult.uuid, changes, client));
			}
		}
		return verifications;
	}

	private assemble(
		kind: MutationKind,
		params: Record<string, unknown>,
		result: unknown,
		plan: MutationPlan,
		verification: Verification[],
		backup: { dest: string } | null,
	): MutationResult {
		const state: Record<string, unknown> = {};
		const uuids: string[] = [];
		if (kind === "macro.run") {
			uuids.push(params.uuid as string);
			state[params.uuid as string] = result;
			plan.warnings.push("The macro may affect documents outside its own UUID. Review its script before executing.");
		}
		if (kind === "setting.set") {
			const key = `${params.scope}.${params.key}`;
			uuids.push(key);
			state[key] = params.value;
		} else if (kind === "document.delete" || kind === "document.patch") {
			uuids.push(params.uuid as string);
			if (isDocResult(result)) state[result.uuid] = result.data;
		} else if (kind === "document.create" || kind === "compendium.import") {
			const rows = kind === "document.create" ? (isDocResult(result) ? [result] : []) : importRows(result);
			for (const row of rows) {
				uuids.push(row.uuid);
				state[row.uuid] = row.data;
			}
		} else if (kind === "document.batch") {
			const ops = Array.isArray(params.ops) ? params.ops : [];
			const results = isBatchResult(result) ? result.results : [];
			for (const [index] of ops.entries()) {
				const opResult = results[index];
				if (isDocResult(opResult)) {
					uuids.push(opResult.uuid);
					state[opResult.uuid] = opResult.data;
				} else if (isDeleteResult(opResult)) {
					uuids.push(opResult.uuid);
				}
			}
		}
		return { uuids, state, warnings: plan.warnings, verification, dry_run: false, replayed: false, backup };
	}
}

/** The compendium rows of an import result. */
function importRows(result: unknown): { uuid: string; name: string | null; data: unknown }[] {
	if (typeof result !== "object" || result === null || !("documents" in result) || !Array.isArray(result.documents)) return [];
	return result.documents.filter(isDocResult);
}

/** Any error a module call produced, as the daemon's uniform tool error. */
function bridgeError(error: unknown): Error {
	if (error instanceof ToolError) return error;
	if (error instanceof BridgeCallError) return new ToolError(error.code, error.message, error.approvalCommand);
	return error instanceof Error ? new ToolError("module_error", error.message) : new ToolError("module_error", String(error));
}
