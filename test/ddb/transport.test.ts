import { describe, expect, it } from "vitest";
import { DdbAuth, DdbAuthError, COBALT_TOKEN_URL } from "../../src/ddb/auth.ts";
import type { Fetcher, FetchResult } from "../../src/ddb/auth.ts";
import { request, unwrapEnvelope, DdbTransportError } from "../../src/ddb/transport.ts";
import type { Transport } from "../../src/ddb/transport.ts";
import type { Cookie } from "../../src/ddb/session.ts";

const cookies: Cookie[] = [{ name: "CobaltSession", value: "cobalt-1" }];

/** A fake fetcher serving canned responses per URL and recording every call it sees. */
function fakeFetch(routes: (call: { url: string; init?: { headers?: Record<string, string>; body?: string } }) => FetchResult | undefined) {
	const calls: { url: string; init?: { headers?: Record<string, string>; body?: string } }[] = [];
	const fetcher: Fetcher = async (url, init) => {
		calls.push({ url, init });
		return routes({ url, init }) ?? { status: 404, ok: false, text: async () => "{}" };
	};
	return { calls, fetcher };
}

function authOver(fetcher: Fetcher): DdbAuth {
	return new DdbAuth({ cookies, savedAt: "" }, (url, init) => {
		if (url === COBALT_TOKEN_URL) {
			return Promise.resolve({ status: 200, ok: true, text: async () => JSON.stringify({ token: "bearer-1", ttl: 300 }) });
		}
		return fetcher(url, init);
	});
}

function transportOver(fetcher: Fetcher, browser?: Transport["browserFetch"]): Transport {
	return { fetch: fetcher, auth: authOver(fetcher), ...(browser ? { browserFetch: browser } : {}) };
}

const MONSTER_URL = "https://monster-service.dndbeyond.com/v1/Monster/99";

describe("request", () => {
	it("sends auth headers and returns the unwrapped payload on success", async () => {
		const { calls, fetcher } = fakeFetch(() => ({
			status: 200,
			ok: true,
			text: async () => JSON.stringify({ id: 1, success: true, data: { name: "Spiguar" } }),
		}));
		const payload = await request(transportOver(fetcher), MONSTER_URL, { method: "GET" });
		expect(payload).toEqual({ name: "Spiguar" });
		expect(calls[0]?.init?.headers?.Authorization).toBe("Bearer bearer-1");
	});

	it("retries through the browser fetcher when the direct request is refused", async () => {
		const { fetcher } = fakeFetch(() => ({ status: 403, ok: false, text: async () => "forbidden" }));
		const browserCalls: string[] = [];
		const browser: Transport["browserFetch"] = async (url) => {
			browserCalls.push(url);
			return { status: 200, ok: true, text: async () => JSON.stringify({ status: "success", data: { name: "Spiguar" } }) };
		};
		const payload = await request(transportOver(fetcher, browser), MONSTER_URL, { method: "GET" });
		expect(payload).toEqual({ name: "Spiguar" });
		expect(browserCalls).toEqual([MONSTER_URL]);
	});

	it("reports the login remedy on 401 instead of retrying", async () => {
		const { fetcher } = fakeFetch(() => ({ status: 401, ok: false, text: async () => "unauthorized" }));
		const error = await request(transportOver(fetcher), MONSTER_URL, {}).catch((e: DdbTransportError) => e);
		expect(error).toBeInstanceOf(DdbTransportError);
		expect((error as DdbTransportError).status).toBe(401);
		expect((error as DdbTransportError).hint).toMatch(/cf ddb --help/);
	});

	it("reports both failures when the browser fallback is also refused", async () => {
		const { fetcher } = fakeFetch(() => ({ status: 403, ok: false, text: async () => "forbidden" }));
		const browser: Transport["browserFetch"] = async () => ({ status: 403, ok: false, text: async () => "forbidden" });
		const error = await request(transportOver(fetcher, browser), MONSTER_URL, {}).catch((e: DdbTransportError) => e);
		expect((error as DdbTransportError).message).toMatch(/403/);
		expect((error as DdbTransportError).message).toMatch(/browser/);
	});

	it("fails with the browser remedy when 403 strikes and no browser fetcher is wired", async () => {
		const { fetcher } = fakeFetch(() => ({ status: 403, ok: false, text: async () => "forbidden" }));
		const error = await request(transportOver(fetcher), MONSTER_URL, {}).catch((e: DdbTransportError) => e);
		expect((error as DdbTransportError).hint).toMatch(/browser/);
	});
});

describe("unwrapEnvelope", () => {
	it("unwraps the character-service success envelope", () => {
		expect(unwrapEnvelope({ id: 1, success: true, data: { a: 1 } })).toEqual({ a: 1 });
	});

	it("unwraps the waterdeep status envelope", () => {
		expect(unwrapEnvelope({ status: "success", data: { a: 1 } })).toEqual({ a: 1 });
	});

	it("passes through payloads without an envelope", () => {
		expect(unwrapEnvelope({ bare: true })).toEqual({ bare: true });
	});

	it("raises on a failure envelope", () => {
		expect(() => unwrapEnvelope({ id: 1, success: false, message: "no such monster", data: null })).toThrow(/no such monster/);
	});
});
