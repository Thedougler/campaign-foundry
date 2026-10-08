/** The typed bridge contract between the control daemon and the in-world module. This is the agent-facing surface: Foundry internals stay behind it. */

/** Every tool the daemon serves. `host.*`/`package.*`/`backup.*`/`logs.query`/`asset.put` run over SSH; the rest forward to the module. */
export type ToolName =
	| "world.inspect"
	| "world.search"
	| "document.get"
	| "document.query"
	| "document.create"
	| "document.patch"
	| "document.delete"
	| "document.batch"
	| "compendium.query"
	| "compendium.import"
	| "setting.get"
	| "setting.set"
	| "asset.put"
	| "macro.run"
	| "events.subscribe"
	| "events.since"
	| "host.status"
	| "host.restart"
	| "package.install"
	| "package.update"
	| "backup.create"
	| "backup.restore"
	| "logs.query";

/** Tools the in-world module answers; the module's handler table must serve exactly these. */
export const MODULE_TOOLS: readonly ToolName[] = [
	"world.inspect",
	"world.search",
	"document.get",
	"document.query",
	"document.create",
	"document.patch",
	"document.delete",
	"document.batch",
	"compendium.query",
	"compendium.import",
	"setting.get",
	"setting.set",
	"macro.run",
	"events.subscribe",
	"events.since",
] as const;

/** Tools the daemon answers itself over the SSH host adapter. */
export const HOST_TOOLS: readonly ToolName[] = [
	"host.status",
	"host.restart",
	"package.install",
	"package.update",
	"backup.create",
	"backup.restore",
	"logs.query",
	"asset.put",
] as const;

/** A state guard in front of a mutation: the document at `uuid` must have `equals` at `path` (dot-separated keys). */
export interface Precondition {
	uuid: string;
	path: string;
	equals: unknown;
}

/** The mutation discipline every write accepts (issue #46). Defaults are chosen by `planMutation`, never here. */
export interface MutationBase {
	/** Preview the write instead of running it. Defaults to true. */
	dry_run?: boolean;
	preconditions?: Precondition[];
	/** Re-running with the same key and params replays the recorded result instead of writing again. */
	idempotency_key?: string;
	/** Take a host backup first (batch/delete force this on). */
	backup_before?: boolean;
	/** Re-read the touched documents after the write and compare. Defaults to true. */
	verify_after?: boolean;
}

/** What a dry-run preview shows: the resolved discipline the write would run under. */
export interface MutationPlanPreview {
	kind: string;
	dry_run: true;
	preconditions: Precondition[];
	idempotency_key: string | null;
	backup_before: boolean;
	verify_after: boolean;
}

/** What every disciplined write returns: what it touched, the canonical state, and how it was checked. */
export interface MutationResult {
	uuids: string[];
	/** Canonical post-write documents, keyed by uuid (dry runs carry the would-be uuids where known). */
	state: Record<string, unknown>;
	warnings: string[];
	verification: { uuid: string; ok: boolean; detail?: string }[];
	/** True when an idempotency_key replayed a recorded result and nothing was written. */
	replayed?: boolean;
	/** True when this is a preview; nothing ran. */
	dry_run?: boolean;
	/** The resolved discipline, present on dry-run previews. */
	plan?: MutationPlanPreview;
	/** The host backup taken before the write, when one ran. */
	backup?: { dest: string } | null;
}

// --- Tool params (module plane) ---

export interface WorldInspectParams {
	/** Empty params; the world answers about itself. */
}

export interface WorldSearchParams {
	/** Substring matched against document names, case-insensitive. */
	name: string;
	/** Collection ids to search, e.g. `actors`, `items`, `scenes`, `journal`. Defaults to all. */
	collections?: string[];
	limit?: number;
}

export interface DocumentGetParams {
	uuid: string;
}

export interface DocumentQueryParams {
	/** Collection id: `actors`, `items`, `scenes`, `journal`, `tables`, `macros`, `playlists`. */
	collection: string;
	/** Optional name substring filter. */
	name?: string;
	limit?: number;
}

export interface DocumentCreateParams extends MutationBase {
	collection: string;
	/** The document data, Foundry source shape (e.g. `{ name, type: "character", system: {...} }`). */
	data: Record<string, unknown>;
	/** Compendium pack id (e.g. `world.my-campaign`); omit to create in the world. */
	pack?: string;
}

export interface DocumentPatchParams extends MutationBase {
	uuid: string;
	/** The update payload passed to `doc.update`. */
	changes: Record<string, unknown>;
}

export interface DocumentDeleteParams extends MutationBase {
	uuid: string;
}

/** One op inside a batch: the params of the wrapped tool minus its discipline fields (discipline applies to the batch as a whole). */
export type DocumentBatchOp =
	| { tool: "document.create"; params: Omit<DocumentCreateParams, keyof MutationBase> }
	| { tool: "document.patch"; params: Omit<DocumentPatchParams, keyof MutationBase> }
	| { tool: "document.delete"; params: Omit<DocumentDeleteParams, keyof MutationBase> };

export interface DocumentBatchParams extends MutationBase {
	/** Human label for logs and plans. */
	label?: string;
	ops: DocumentBatchOp[];
}

export interface CompendiumQueryParams {
	/** Pack id, e.g. `world.my-campaign`. */
	pack: string;
	name?: string;
	limit?: number;
}

export interface CompendiumImportParams extends MutationBase {
	pack: string;
	/** Document sources to create inside the pack. */
	documents: Record<string, unknown>[];
}

export interface SettingGetParams {
	/** Usually `module` (module settings) or `world`. */
	scope: string;
	key: string;
}

export interface SettingSetParams extends MutationBase {
	scope: string;
	key: string;
	value: unknown;
}

export interface MacroRunParams extends MutationBase {
	/** The Macro document's uuid. */
	uuid: string;
	/** Scope passed to the v14 Macro.execute Public API. */
	scope?: Record<string, unknown>;
}

export interface EventsSubscribeParams {
	/** Document event kinds to buffer: `create`, `update`, `delete`. Defaults to all. */
	kinds?: string[];
}

export interface EventsSinceParams {
	/** Cursor from a previous `events.since`; omit for everything buffered. */
	cursor?: number;
	limit?: number;
}

// --- Tool params (host plane) ---

export interface AssetPutParams {
	/** Daemon-local file to send. */
	sourcePath?: string;
	/** Raw bytes, base64-encoded (for MCP callers that have no daemon-local file). */
	dataB64?: string;
	/** Path relative to `Data/assets`, e.g. `tokens/hero.png`. */
	dest: string;
}

export interface PackageInstallParams {
	/** Host-local path to the module zip. */
	zipPath: string;
	/** Plain directory name inside `Data/modules`. */
	name: string;
}

export interface PackageUpdateParams {
	/** Pin a Foundry version (e.g. `14.369`); omit to float on the image tag. */
	version?: string;
}

export interface BackupCreateParams {
	/** Stop a running world for the backup and start it again after (the only allowed way to back up a running world). */
	stop?: boolean;
	dest?: string;
}

export interface BackupRestoreParams {
	archive: string;
}

export interface LogsQueryParams {
	lines?: number;
	since?: string;
	until?: string;
	/** `grep -E` pattern, case-insensitive. */
	grep?: string;
	source?: "container" | "error" | "debug";
}

/** Union of every tool's params, keyed by tool name; `callTool` params are validated against this shape. */
export interface ToolParams {
	"world.inspect": WorldInspectParams;
	"world.search": WorldSearchParams;
	"document.get": DocumentGetParams;
	"document.query": DocumentQueryParams;
	"document.create": DocumentCreateParams;
	"document.patch": DocumentPatchParams;
	"document.delete": DocumentDeleteParams;
	"document.batch": DocumentBatchParams;
	"compendium.query": CompendiumQueryParams;
	"compendium.import": CompendiumImportParams;
	"setting.get": SettingGetParams;
	"setting.set": SettingSetParams;
	"asset.put": AssetPutParams;
	"macro.run": MacroRunParams;
	"events.subscribe": EventsSubscribeParams;
	"events.since": EventsSinceParams;
	"host.status": Record<string, never>;
	"host.restart": Record<string, never>;
	"package.install": PackageInstallParams;
	"package.update": PackageUpdateParams;
	"backup.create": BackupCreateParams;
	"backup.restore": BackupRestoreParams;
	"logs.query": LogsQueryParams;
}

// --- Wire envelope ---

/** Daemon → module over the bridge socket. */
export interface BridgeRequest {
	type: "request";
	id: number;
	tool: ToolName;
	params: Record<string, unknown>;
}

/** Module → daemon: the answer to a request, or a push (currently only `event` batches are pushed). */
export interface BridgeReply {
	type: "reply";
	id: number;
	ok: true;
	result: unknown;
}

export interface BridgeReplyError {
	type: "reply";
	id: number;
	ok: false;
	error: BridgeErrorShape;
}

export interface BridgeErrorShape {
	code: string;
	message: string;
	/** The exact command the DM would approve, when this error is a mutation gate. */
	approvalCommand?: string;
}

export type BridgeResponse = BridgeReply | BridgeReplyError;

/** The module's first message after the socket opens. */
export interface BridgeHello {
	type: "hello";
	module: "cf-bridge";
	version: string;
}

export type BridgeWireMessage = BridgeRequest | BridgeResponse | BridgeHello | { type: string; [key: string]: unknown };

/** A tool call failed. `approvalCommand` is the DM gate when the failure is a deliberate refusal. */
export class ToolError extends Error {
	readonly code: string;
	readonly approvalCommand: string | null;

	constructor(code: string, message: string, approvalCommand: string | null = null) {
		super(message);
		this.code = code;
		this.approvalCommand = approvalCommand;
	}
}
