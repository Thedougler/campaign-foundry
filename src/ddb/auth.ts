import type { DdbSession } from "./session.ts";
import { cookieHeader } from "./session.ts";

/** The endpoint that swaps the long-lived CobaltSession cookie for a short-lived bearer token. */
export const COBALT_TOKEN_URL = "https://auth-service.dndbeyond.com/v1/cobalt-token";

/** A minimal HTTP response: the seam tests inject fakes through. */
export interface FetchResult {
	status: number;
	ok: boolean;
	text: () => Promise<string>;
	/** Response headers, when the transport exposes them; create reads the 302 `Location` through it. */
	headers?: { get(name: string): string | null };
}

/** A minimal HTTP fetch: the seam tests inject fakes through. */
export type FetchInit = { method?: string; headers?: Record<string, string>; body?: string; redirect?: "manual" | "follow" | "error" };

/** A minimal HTTP fetch: the seam tests inject fakes through. */
export interface Fetcher {
	(url: string, init?: FetchInit): Promise<FetchResult>;
}

/** Why a DDB request could not be authenticated, in a form the caller can show the DM. */
export class DdbAuthError extends Error {
	hint: string;
	constructor(message: string, hint: string) {
		super(message);
		this.hint = hint;
	}
}

const LOGIN_HINT = "save the DM's D&D Beyond login to the session file (the cf ddb --help Authentication section has the steps)";

interface CobaltTokenResponse {
	token?: string;
	ttl?: number;
}

/**
 * Turns the persisted login into request headers: exchanges the CobaltSession cookie for a short-lived
 * bearer token (cached until shortly before its ttl), and carries the full cookie jar on dndbeyond.com
 * requests so verification-token CSRF cookies ride along. Reuse of the dndbeyond-mcp approach; see
 * docs/adr/0022-ddb-homebrew-writes-through-captured-contracts.md.
 */
export class DdbAuth {
	private cached: { token: string; expiresAtMs: number } | undefined;

	private readonly session: DdbSession;
	private readonly fetcher: Fetcher;
	private readonly now: () => number;

	constructor(session: DdbSession, fetcher: Fetcher, now: () => number = Date.now) {
		this.session = session;
		this.fetcher = fetcher;
		this.now = now;
	}

	/** A current bearer token, exchanging and caching on demand. */
	async bearer(): Promise<string> {
		if (this.cached && this.now() < this.cached.expiresAtMs) return this.cached.token;
		if (this.session.cookies.length === 0) {
			throw new DdbAuthError("No D&D Beyond session is stored.", LOGIN_HINT);
		}
		let response: FetchResult;
		try {
			response = await this.fetcher(COBALT_TOKEN_URL, {
				method: "POST",
				headers: { Cookie: cookieHeader(this.session.cookies), "Content-Type": "application/json" },
				body: "{}",
			});
		} catch (error) {
			throw new DdbAuthError(`The cobalt token exchange failed: ${(error as Error).message}`, "check the network, then retry");
		}
		if (response.status === 401 || response.status === 403) {
			throw new DdbAuthError(`The stored D&D Beyond session was refused (${response.status}).`, LOGIN_HINT);
		}
		if (!response.ok) {
			throw new DdbAuthError(`The cobalt token exchange failed: HTTP ${response.status}`, "check the network, then retry");
		}
		const data = JSON.parse(await response.text()) as CobaltTokenResponse;
		if (!data.token) {
			throw new DdbAuthError("The cobalt token exchange returned no token.", LOGIN_HINT);
		}
		const ttlSeconds = data.ttl ?? 300;
		// Refresh 30s before expiry so requests never carry a token that lapses mid-flight.
		this.cached = { token: data.token, expiresAtMs: this.now() + Math.max(ttlSeconds - 30, 0) * 1000 };
		return data.token;
	}

	/** Headers for one DDB request: bearer everywhere, cookies added on dndbeyond.com hosts. */
	async headers(url: string): Promise<Record<string, string>> {
		const headers: Record<string, string> = {
			Authorization: `Bearer ${await this.bearer()}`,
			Accept: "application/json",
			"Content-Type": "application/json",
		};
		if (url.includes("dndbeyond.com")) headers.Cookie = cookieHeader(this.session.cookies);
		return headers;
	}

	/** One cookie's value from the persisted jar, e.g. RequestVerificationToken for the delete write. */
	cookieValue(name: string): string | undefined {
		return this.session.cookies.find((c) => c.name === name)?.value;
	}
}
