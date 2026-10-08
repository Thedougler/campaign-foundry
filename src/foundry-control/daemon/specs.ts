/**
 * The one tool table: name, plane, mutation flag, description and params shape. Both `tools/list`
 * (the MCP surface agents see) and params validation read this table, so the daemon never has two
 * opinions about what a tool takes.
 */

import type { ToolName } from "../bridge/schema.ts";

export type Plane = "host" | "module";

export type ParamType = "string" | "number" | "boolean" | "object" | "array" | "any";

export interface ParamProperty {
	type: ParamType;
	description: string;
	/** When set, the value must be one of these strings. */
	enum?: readonly string[];
}

export interface ParamsSchema {
	/** Params keys that must be present. */
	required: readonly string[];
	properties: Record<string, ParamProperty>;
}

export interface ToolSpec {
	name: ToolName;
	plane: Plane;
	/** True when the tool changes state: module tools run under the mutation discipline, host tools are DM-gated. */
	mutating: boolean;
	/** What the tool does and when to reach for it; this is the text `tools/list` shows. */
	description: string;
	params: ParamsSchema;
}

/** The mutation-discipline params every module-plane write accepts (issue #46). */
const DISCIPLINE_PROPS: Record<string, ParamProperty> = {
	dry_run: { type: "boolean", description: "Preview the write instead of running it. Default true: pass false to execute." },
	preconditions: {
		type: "array",
		description: "State guards: each entry is {uuid, path, equals}; the document must hold equals at path (dot-separated) before anything runs.",
	},
	idempotency_key: {
		type: "string",
		description: "Re-running with the same key and the same params replays the recorded result instead of writing again.",
	},
	backup_before: { type: "boolean", description: "Take a host backup before the write (forced on for document.batch and document.delete)." },
	verify_after: { type: "boolean", description: "Re-read every touched document after the write and compare the changed keys. Default true." },
};

function disciplined(properties: Record<string, ParamProperty>, required: readonly string[]): ParamsSchema {
	return { required, properties: { ...properties, ...DISCIPLINE_PROPS } };
}

const WILDCARD: ParamsSchema = { required: [], properties: {} };

export const TOOL_SPECS: readonly ToolSpec[] = [
	{
		name: "world.inspect",
		plane: "module",
		mutating: false,
		description: "The world answers about itself: world id and title, system id and version, core version, and every world collection and compendium pack with its count. Read-only; run it first to learn what exists.",
		params: WILDCARD,
	},
	{
		name: "world.search",
		plane: "module",
		mutating: false,
		description: "Case-insensitive substring search over document names across world collections (actors, items, scenes, journal, tables, macros, playlists, combats). Read-only.",
		params: {
			required: ["name"],
			properties: {
				name: { type: "string", description: "Substring matched against document names, case-insensitive." },
				collections: { type: "array", description: "Collection ids to search, e.g. actors, items, scenes. Defaults to all." },
				limit: { type: "number", description: "Maximum hits (default 20)." },
			},
		},
	},
	{
		name: "document.get",
		plane: "module",
		mutating: false,
		description: "Read one document by uuid (world uuid like actors.<id> or Compendium.<pack>.<id>) and return its canonical JSON source. Read-only.",
		params: { required: ["uuid"], properties: { uuid: { type: "string", description: "The document's uuid." } } },
	},
	{
		name: "document.query",
		plane: "module",
		mutating: false,
		description: "List the documents of one world collection, optionally filtered by a name substring. Read-only.",
		params: {
			required: ["collection"],
			properties: {
				collection: { type: "string", description: "Collection id: actors, items, scenes, journal, tables, macros, playlists." },
				name: { type: "string", description: "Optional name substring filter." },
				limit: { type: "number", description: "Maximum rows (default 50)." },
			},
		},
	},
	{
		name: "document.create",
		plane: "module",
		mutating: true,
		description: "Create one document from Foundry source data in a world collection, or in a compendium pack when pack is given. Mutating: dry run by default, full discipline available.",
		params: disciplined(
			{
				collection: { type: "string", description: "Collection id, e.g. actors. Ignored when pack is given." },
				data: { type: "object", description: "The document source, e.g. { name, type: \"npc\", system: {...} }. An _id is kept as the document id." },
				pack: { type: "string", description: "Compendium pack id, e.g. world.my-campaign; create in the pack instead of the world." },
			},
			["collection", "data"],
		),
	},
	{
		name: "document.patch",
		plane: "module",
		mutating: true,
		description: "Update one document by uuid with an update payload (dot-path keys, as doc.update takes them). Mutating: dry run by default; give preconditions so the write lands on the state you read.",
		params: disciplined(
			{
				uuid: { type: "string", description: "The document's uuid." },
				changes: { type: "object", description: "The update payload, e.g. { \"system.attributes.hp.value\": 20 }." },
			},
			["uuid", "changes"],
		),
	},
	{
		name: "document.delete",
		plane: "module",
		mutating: true,
		description: "Delete one document by uuid. Destructive: a host backup is forced before it runs (dry run by default).",
		params: disciplined({ uuid: { type: "string", description: "The document's uuid." } }, ["uuid"]),
	},
	{
		name: "document.batch",
		plane: "module",
		mutating: true,
		description: "Run several create, patch and delete ops as one disciplined write: one plan, one forced backup, one verification pass. Ops run in order; the first failure stops the batch.",
		params: disciplined(
			{
				label: { type: "string", description: "Human label for logs and previews." },
				ops: {
					type: "array",
					description: "Ops in order: { tool: \"document.create\"|\"document.patch\"|\"document.delete\", params: {...} } without discipline fields.",
				},
			},
			["ops"],
		),
	},
	{
		name: "compendium.query",
		plane: "module",
		mutating: false,
		description: "List one compendium pack's index (uuid, name, type), optionally filtered by a name substring. Read-only.",
		params: {
			required: ["pack"],
			properties: {
				pack: { type: "string", description: "Pack id, e.g. world.my-campaign." },
				name: { type: "string", description: "Optional name substring filter." },
				limit: { type: "number", description: "Maximum rows (default 50)." },
			},
		},
	},
	{
		name: "compendium.import",
		plane: "module",
		mutating: true,
		description: "Create documents inside a compendium pack, keeping their _id values: the campaign-compendium landing zone from ADR 0008 (world placement is a separate explicit step). Mutating: dry run by default.",
		params: disciplined(
			{
				pack: { type: "string", description: "Pack id, e.g. world.my-campaign." },
				documents: { type: "array", description: "Document sources to create inside the pack." },
			},
			["pack", "documents"],
		),
	},
	{
		name: "setting.get",
		plane: "module",
		mutating: false,
		description: "Read one world or module setting. Read-only.",
		params: {
			required: ["scope", "key"],
			properties: {
				scope: { type: "string", description: "\"module\" for the cf-bridge module's own settings, or a world setting scope.", enum: ["module", "world"] },
				key: { type: "string", description: "The setting key." },
			},
		},
	},
	{
		name: "setting.set",
		plane: "module",
		mutating: true,
		description: "Write one world or module setting. Mutating: dry run by default.",
		params: disciplined(
			{
				scope: { type: "string", description: "\"module\" for the cf-bridge module's own settings, or a world setting scope.", enum: ["module", "world"] },
				key: { type: "string", description: "The setting key." },
				value: { type: "any", description: "The value to store." },
			},
			["scope", "key", "value"],
		),
	},
	{
		name: "asset.put",
		plane: "host",
		mutating: true,
		description: "Place one file under the host's Data/assets (tokens, art) from a daemon-local path or base64 bytes. Host-plane and DM-gated through the daemon: run `cf foundry assets put <src> <dest> --yes` instead.",
		params: {
			required: ["dest"],
			properties: {
				sourcePath: { type: "string", description: "Daemon-local file to send." },
				dataB64: { type: "string", description: "Raw bytes, base64-encoded (for callers with no daemon-local file)." },
				dest: { type: "string", description: "Path relative to Data/assets, e.g. tokens/hero.png." },
			},
		},
	},
	{
		name: "macro.run",
		plane: "module",
		mutating: true,
		description: "Execute one Macro by UUID using the v14 execution scope. Arbitrary script requires DM instruction. Dry run by default, with the full mutation discipline.",
		params: disciplined({
			uuid: { type: "string", description: "The Macro document's UUID." },
			scope: { type: "object", description: "Macro.execute scope, e.g. { speaker: { alias: \"DM\" } }." },
		}, ["uuid"]),
	},
	{
		name: "events.subscribe",
		plane: "module",
		mutating: false,
		description: "Subscribe to document events (create, update, delete); the module buffers them and pushes the subscribed kinds. Returns how much is already buffered.",
		params: {
			required: [],
			properties: { kinds: { type: "array", description: "Event kinds to subscribe to: create, update, delete. Defaults to all three." } },
		},
	},
	{
		name: "events.since",
		plane: "module",
		mutating: false,
		description: "Read buffered document events after a cursor (poll with the returned cursor). Read-only.",
		params: {
			required: [],
			properties: {
				cursor: { type: "number", description: "Cursor from a previous events.since; omit for everything buffered." },
				limit: { type: "number", description: "Maximum events (default 100)." },
			},
		},
	},
	{
		name: "host.status",
		plane: "host",
		mutating: false,
		description: "Read-only snapshot of the DM's Foundry host: container state and health, Foundry version, ports, compose file, data path, installed worlds and any probe warnings. Safe to run any time.",
		params: WILDCARD,
	},
	{
		name: "host.restart",
		plane: "host",
		mutating: true,
		description: "Restart the Foundry container (stops every connected session). DM-gated: the daemon refuses and returns the approval command `cf foundry service restart --yes`.",
		params: WILDCARD,
	},
	{
		name: "package.install",
		plane: "host",
		mutating: true,
		description: "Install a module archive from a host-local zip into Data/modules. DM-gated: the daemon refuses and returns the approval command `cf foundry install module --zip <zip> --name <name> --yes`.",
		params: {
			required: ["zipPath", "name"],
			properties: {
				zipPath: { type: "string", description: "Host-local path to the module zip." },
				name: { type: "string", description: "Plain directory name inside Data/modules." },
			},
		},
	},
	{
		name: "package.update",
		plane: "host",
		mutating: true,
		description: "Update Foundry, optionally pinning a version in the compose .env, then pull and recreate the container. DM-gated: the daemon refuses and returns the approval command `cf foundry install update --yes`.",
		params: { required: [], properties: { version: { type: "string", description: "Version to pin, e.g. 14.369; omit to float on the image tag." } } },
	},
	{
		name: "backup.create",
		plane: "host",
		mutating: true,
		description: "Archive the Foundry data directory (stopping the world first when stop is true, the only allowed way to back up a running world). DM-gated: the daemon refuses and returns the approval command `cf foundry backup create --stop --yes`.",
		params: {
			required: [],
			properties: {
				stop: { type: "boolean", description: "Stop the world for the backup and start it again after." },
				dest: { type: "string", description: "Archive path on the host; defaults under the backup-staging directory." },
			},
		},
	},
	{
		name: "backup.restore",
		plane: "host",
		mutating: true,
		description: "Restore an archive over the Foundry data directory (the current directory is kept aside; the world must be stopped). DM-gated: the daemon refuses and returns the approval command `cf foundry backup restore <archive> --yes`.",
		params: { required: ["archive"], properties: { archive: { type: "string", description: "Host-local archive path." } } },
	},
	{
		name: "logs.query",
		plane: "host",
		mutating: false,
		description: "Read container or on-disk Foundry logs, optionally windowed by time and filtered by a case-insensitive grep -E pattern. Read-only.",
		params: {
			required: [],
			properties: {
				lines: { type: "number", description: "Tail this many lines (container source only)." },
				since: { type: "string", description: "Docker --since value, e.g. 10m or an ISO timestamp." },
				until: { type: "string", description: "Docker --until value." },
				grep: { type: "string", description: "Case-insensitive grep -E pattern over the output." },
				source: { type: "string", description: "container (docker logs), error or debug (on-disk logs).", enum: ["container", "error", "debug"] },
			},
		},
	},
];

/** The spec for one tool, or undefined when no such tool exists. */
export function specFor(name: string): ToolSpec | undefined {
	return TOOL_SPECS.find((spec) => spec.name === name);
}

function typeOf(value: unknown): ParamType {
	if (Array.isArray(value)) return "array";
	if (value === null) return "any";
	const kind = typeof value;
	if (kind === "string" || kind === "number" || kind === "boolean" || kind === "object") return kind;
	return "any";
}

/**
 * Checks params against a spec. Returns null when they fit, or a message naming the first problem
 * (the field, what it takes, what arrived).
 */
export function validateParams(spec: ToolSpec, params: unknown): string | null {
	if (typeof params !== "object" || params === null || Array.isArray(params)) {
		return `Params for ${spec.name} must be an object; got ${Array.isArray(params) ? "an array" : typeof params}.`;
	}
	const given = params as Record<string, unknown>;
	for (const key of spec.params.required) {
		if (given[key] === undefined) return `Params for ${spec.name} are missing the required field \`${key}\`.`;
	}
	for (const [key, value] of Object.entries(given)) {
		if (value === undefined) continue;
		const property = spec.params.properties[key];
		if (property === undefined) continue; // discipline-adjacent extras travel as-is; the planner reads what it knows.
		if (property.type !== "any" && typeOf(value) !== property.type) {
			return `Field \`${key}\` of ${spec.name} must be ${property.type}; got ${typeOf(value)}.`;
		}
		if (property.enum !== undefined && (typeof value !== "string" || !property.enum.includes(value))) {
			return `Field \`${key}\` of ${spec.name} must be one of ${property.enum.join(", ")}.`;
		}
		if (property.type === "number" && (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0)) {
			return `Field \`${key}\` of ${spec.name} must be a non-negative safe integer.`;
		}
	}
	if (Array.isArray(given.preconditions)) {
		for (const guard of given.preconditions) {
			if (typeof guard !== "object" || guard === null || !("uuid" in guard) || typeof guard.uuid !== "string"
				|| !("path" in guard) || typeof guard.path !== "string" || !("equals" in guard)) {
				return "Every precondition requires uuid (string), path (string) and equals.";
			}
		}
	}
	if (spec.name === "document.batch" && Array.isArray(given.ops)) {
		for (const op of given.ops) {
			if (typeof op !== "object" || op === null || !("tool" in op) || typeof op.tool !== "string"
				|| !["document.create", "document.patch", "document.delete"].includes(op.tool) || !("params" in op)) {
				return "Each batch operation must be document.create, document.patch or document.delete with params.";
			}
			const child = specFor(op.tool);
			if (child !== undefined) {
				const problem = validateParams(child, op.params);
				if (problem !== null) return problem;
			}
		}
	}
	return null;
}
