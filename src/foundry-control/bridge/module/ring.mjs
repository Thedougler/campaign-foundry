/** A bounded ring buffer of document events, ordered by sequence number. Pure: no Foundry, no sockets. */

export class EventRing {
	constructor(capacity = 500) {
		this.capacity = capacity;
		/** @type {Array<{seq: number, at: string, kind: string, collection: string, uuid: string, name: string | null}>} */
		this.events = [];
		this.nextSeq = 1;
		/** Null until events.subscribe sets a filter; the connection pushes only subscribed kinds. */
		this.kinds = null;
	}

	get size() {
		return this.events.length;
	}

	/** Sets which event kinds the daemon subscribed to (`create`, `update`, `delete`). */
	setKinds(kinds) {
		this.kinds = kinds;
	}

	/** Appends one event, dropping the oldest when full; returns the stored event with its sequence number. */
	push(kind, collection, uuid, name = null) {
		const event = { seq: this.nextSeq++, at: new Date().toISOString(), kind, collection, uuid, name };
		this.events.push(event);
		if (this.events.length > this.capacity) this.events.shift();
		return event;
	}

	/** The events after `cursor`, plus the cursor to pass next time. */
	since(cursor = 0, limit = 100) {
		const events = this.events.filter((e) => e.seq > cursor).slice(0, limit);
		const last = events.length > 0 ? events[events.length - 1].seq : cursor;
		return { events, cursor: last };
	}
}
