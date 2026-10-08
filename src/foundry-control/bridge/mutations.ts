/** The mutation discipline planner and idempotency store. Discipline lives daemon-side (issue #46); the module only executes approved writes. */

import { appendFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import type { MutationBase, Precondition } from "./schema.ts";

/** The disciplined write tools. */
export type MutationKind =
	| "document.create"
	| "document.patch"
	| "document.delete"
	| "document.batch"
	| "compendium.import"
	| "setting.set"
	| "macro.run";

/** The resolved discipline for one write: what the daemon will do before, during and after it. */
export interface MutationPlan {
	kind: MutationKind;
	dry_run: boolean;
	preconditions: Precondition[];
	idempotency_key?: string;
	backup_before: boolean;
	verify_after: boolean;
	warnings: string[];
}

/** Kinds that always attempt a backup first: they are bulk or destructive. */
const FORCED_BACKUP: Partial<Record<MutationKind, true>> = { "document.batch": true, "document.delete": true };

/** Kinds whose target already exists, so a write without a precondition guards nothing. */
const PRECONDITIONABLE: Partial<Record<MutationKind, true>> = { "document.patch": true, "document.delete": true };

export function planMutation(kind: MutationKind, opts: MutationBase & Record<string, unknown>): MutationPlan {
	const warnings: string[] = [];
	const forced = FORCED_BACKUP[kind] === true;
	const backup_before = forced ? true : (opts.backup_before ?? false);
	if (forced) {
		warnings.push(`backup_before is forced on for ${kind}: bulk and destructive writes always attempt a backup first.`);
	}
	if (PRECONDITIONABLE[kind] === true && (opts.preconditions ?? []).length === 0) {
		warnings.push(
			`No preconditions given for ${kind}: the write proceeds against whatever the document currently contains.`,
		);
	}
	return {
		kind,
		dry_run: opts.dry_run ?? true,
		preconditions: opts.preconditions ?? [],
		idempotency_key: opts.idempotency_key,
		backup_before,
		verify_after: opts.verify_after ?? true,
		warnings,
	};
}

/** One recorded outcome: enough to replay the result and to notice key reuse with different params. */
export interface IdempotencyRecord {
	key: string;
	tool: string;
	/** sha256 of the params (minus the key itself); a mismatch under the same key is key reuse. */
	digest: string;
	ok: boolean;
	result: unknown;
	at: string;
}

export function paramsDigest(params: Record<string, unknown>): string {
	const { idempotency_key: _omit, ...rest } = params;
	const sorted: Record<string, unknown> = {};
	for (const key of Object.keys(rest).sort()) sorted[key] = rest[key];
	return createHash("sha256").update(JSON.stringify(sorted)).digest("hex");
}

/** Remembers successful writes by key. In memory always; appended to a jsonl file when a path is given, and reloaded from it on construction. */
export class IdempotencyStore {
	private readonly path: string | null;
	private readonly records = new Map<string, IdempotencyRecord>();
	/** Resolves when an existing jsonl file is loaded; reads wait for it so records are visible. */
	private readonly loaded: Promise<void>;
	/** Chained appends, so jsonl lines land in record order. */
	private pending: Promise<void> = Promise.resolve();

	constructor(path: string | null = null) {
		this.path = path;
		this.loaded =
			path === null
				? Promise.resolve()
				: readFile(path, "utf8")
						.then((text) => {
							for (const line of text.split("\n")) {
								const trimmed = line.trim();
								if (trimmed === "") continue;
								try {
									const record = JSON.parse(trimmed) as IdempotencyRecord;
									if (typeof record.key === "string") this.records.set(record.key, record);
								} catch {
									// A killed process can leave a half-written trailing line; drop it.
								}
							}
						})
						.catch(() => {
							// No file yet: a fresh store.
						});
	}

	async seen(key: string): Promise<IdempotencyRecord | undefined> {
		await this.loaded;
		return this.records.get(key);
	}

	append(entry: IdempotencyRecord): Promise<void> {
		this.records.set(entry.key, entry);
		const path = this.path;
		if (path !== null) {
			this.pending = this.pending.then(() => appendFile(path, `${JSON.stringify(entry)}\n`, "utf8"));
		}
		return this.pending;
	}
}

// Reserve before the first await: concurrent MCP requests with the same key must not both write.
const IN_FLIGHT = new WeakMap<IdempotencyStore, Map<string, { tool: string; digest: string; task: Promise<object> }>>();

/** Runs `run` under a key: a successful result is recorded and replays on retry; failures are never recorded. */
export async function withIdempotency<T extends object>(
	store: IdempotencyStore,
	key: string,
	tool: string,
	params: Record<string, unknown>,
	run: () => Promise<T>,
): Promise<T & { replayed: boolean }> {
	const digest = paramsDigest(params);
	let flights = IN_FLIGHT.get(store);
	if (flights === undefined) {
		flights = new Map();
		IN_FLIGHT.set(store, flights);
	}
	const pending = flights.get(key);
	if (pending !== undefined) {
		if (pending.digest !== digest || pending.tool !== tool) {
			throw new Error(`idempotency_key \`${key}\` was already used with different params or tool; give a new key.`);
		}
		const result = await pending.task as T;
		return { ...result, replayed: true };
	}
	const task = (async () => {
		const prior = await store.seen(key);
		if (prior !== undefined) {
			if (prior.digest !== digest || prior.tool !== tool) {
				throw new Error(`idempotency_key \`${key}\` was already used with different params or tool; give a new key.`);
			}
			return { ...(prior.result as T), replayed: true };
		}
		const result = await run();
		await store.append({ key, tool, digest, ok: true, result, at: new Date().toISOString() });
		return { ...result, replayed: false };
	})();
	flights.set(key, { tool, digest, task });
	try {
		return await task;
	} finally {
		flights.delete(key);
	}
}
