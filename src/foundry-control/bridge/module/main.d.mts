/** Types for `main.mjs` (the module plane ships as plain JS; this declares its public surface). */

import type { EventRing, RingEvent } from "./ring.mjs";
import type { ModuleHandlers } from "./handlers.mjs";

export declare function nextBackoffMs(attempt: number): number;

/** Everything `startModule` accepts so tests can inject fakes; Foundry runs it bare. */
export interface ModuleDeps {
	WebSocketCtor?: new (url: string) => { send(text: string): void; close(): void };
	scope?: any;
	schedule?: (fn: () => void, ms: number) => unknown;
	cancel?: (timer: unknown) => void;
	ring?: EventRing;
}

export interface ModuleStatus {
	connected: boolean;
	attempt: number;
	url: string | null;
}

export interface PushedEvent {
	kind: string;
	documentName: string;
	uuid: string;
	name?: string | null;
}

export interface RunningModule {
	handlers: ModuleHandlers;
	ring: EventRing;
	connect(): void;
	connectIfConfigured(): "disabled" | "no-token" | "not-gm" | "connecting";
	disconnect(): void;
	pushEvent(event: PushedEvent): RingEvent;
	flush(): Promise<void>;
	status(): ModuleStatus;
}

export declare function startModule(deps?: ModuleDeps): RunningModule;
export declare function installDocumentHooks(scope: any, mod: RunningModule): void;
