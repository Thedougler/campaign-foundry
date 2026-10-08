/**
 * Types for `ring.mjs`. The module plane ships as plain JS (Foundry loads `esmodules` as-is),
 * so its public surface is declared here for the TypeScript side (tests, daemon).
 */

export interface RingEvent {
	seq: number;
	at: string;
	kind: string;
	/** The document's `documentName`, e.g. `Actor`. */
	collection: string;
	uuid: string;
	name: string | null;
}

export interface SinceReply {
	events: RingEvent[];
	cursor: number;
}

export declare class EventRing {
	constructor(capacity?: number);
	readonly size: number;
	kinds: string[] | null;
	setKinds(kinds: string[]): void;
	push(kind: string, collection: string, uuid: string, name?: string | null): RingEvent;
	since(cursor?: number, limit?: number): SinceReply;
}
