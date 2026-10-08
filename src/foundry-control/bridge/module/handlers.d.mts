/** Types for `handlers.mjs` (the module plane ships as plain JS; this declares its public surface). */

import { MODULE_TOOLS } from "../schema.ts";
import type { EventRing } from "./ring.mjs";

/** A module-plane tool name (the module serves exactly these). */
export type ModuleToolName = (typeof MODULE_TOOLS)[number];

export declare const MODULE_ID: string;
export declare const MODULE_VERSION: string;

/** A handler refused the call; `code` is the bridge error code the daemon sees. */
export declare class ToolFailure extends Error {
	code: string;
	constructor(code: string, message: string);
}

/** The globals the handlers read at call time; defaults to `globalThis` (Foundry), tests inject fakes. */
export interface HandlerScope {
	game?: any;
	foundry?: any;
	fromUuid?: (uuid: string) => Promise<any>;
}

/** One module tool: takes the tool's params, returns (or resolves with) its result. */
export type ModuleHandler = (params: Record<string, unknown>) => unknown;

/** Keyed by every module tool, so callers index without undefined. */
export type ModuleHandlers = Record<string, ModuleHandler> & { [K in ModuleToolName]: ModuleHandler };

export declare function createHandlers(ring: EventRing, scope?: HandlerScope): ModuleHandlers;
