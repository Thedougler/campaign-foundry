import type { DdbAuth, FetchInit, FetchResult } from "./auth.ts";

/**
 * A fetch issued through an authenticated browser context (the omp browser tab the DM is logged in
 * with), used as the fallback when D&D Beyond refuses the direct HTTP transport. The adapter never
 * drives the page: it only re-issues the captured request through the browser's network stack.
 */
export interface BrowserFetcher {
	(url: string, init: FetchInit & { method: string; headers: Record<string, string> }): Promise<FetchResult>;
}

/** How adapter requests reach D&D Beyond: direct HTTP first, the authenticated browser on refusal. */
export interface Transport {
	fetch: (url: string, init?: FetchInit) => Promise<FetchResult>;
	auth: DdbAuth;
	/** Present only inside an omp session with the browser device; `cf` alone has no browser to fall back to. */
	browserFetch?: BrowserFetcher;
}

/** Why a DDB request failed at the transport layer, with the remedy the DM or agent needs. */
export class DdbTransportError extends Error {
	hint: string;
	status?: number;
	constructor(message: string, hint: string, status?: number) {
		super(message);
		this.hint = hint;
		this.status = status;
	}
}

const LOGIN_HINT = "the stored session was refused; re-login and save the session (cf ddb --help has the Authentication steps)";
const BROWSER_HINT = "D&D Beyond refused the direct request; retry inside the omp browser session, whose authenticated tab issues the same request (docs/adr/0022 has the steps)";

/** Character-service and Waterdeep envelope both carry `data`; character-service also carries `success`. */
export function unwrapEnvelope(json: unknown): unknown {
	if (json === null || typeof json !== "object") return json;
	const record = json as Record<string, unknown>;
	if (!("data" in record)) return json;
	if ("success" in record) {
		if (record.success !== true) {
			throw new DdbTransportError(`D&D Beyond rejected the request: ${String(record.message ?? "unknown error")}`, "check the request payload");
		}
		return record.data;
	}
	if (record.status === "success") return record.data;
	return json;
}

/**
 * Performs one adapter request: direct HTTP with auth headers first; on a 403/429 refusal (anti-bot or
 * CSRF) through the authenticated browser context when one is wired. A 401 is never retried: the stored
 * session itself is stale and needs the DM's re-login.
 */
export async function request<T = unknown>(transport: Transport, url: string, init: { method?: string; headers?: Record<string, string>; body?: string }): Promise<T> {
	const method = init.method ?? "GET";
	const headers = { ...(await transport.auth.headers(url)), ...init.headers };
	let direct: FetchResult;
	try {
		direct = await transport.fetch(url, { method, headers, ...(init.body === undefined ? {} : { body: init.body }) });
	} catch (error) {
		throw new DdbTransportError(`The request to ${url} failed: ${(error as Error).message}`, "check the network, then retry");
	}
	if (direct.ok) return unwrapEnvelope(JSON.parse(await direct.text())) as T;
	if (direct.status === 401) {
		throw new DdbTransportError(`D&D Beyond refused the request: HTTP 401.`, LOGIN_HINT, 401);
	}
	if ((direct.status === 403 || direct.status === 429) && transport.browserFetch) {
		const browser = await transport.browserFetch(url, { method, headers, ...(init.body === undefined ? {} : { body: init.body }) });
		if (browser.ok) return unwrapEnvelope(JSON.parse(await browser.text())) as T;
		throw new DdbTransportError(
			`D&D Beyond refused both the direct request and the browser fallback: HTTP ${browser.status}.`,
			"the captured contract may be stale; re-capture the request (see docs/adr/0022)",
			browser.status,
		);
	}
	if (direct.status === 403 || direct.status === 429) {
		throw new DdbTransportError(`D&D Beyond refused the direct request: HTTP ${direct.status}.`, BROWSER_HINT, direct.status);
	}
	throw new DdbTransportError(`D&D Beyond answered HTTP ${direct.status} for ${url}.`, "check the request and the captured contract", direct.status);
}
