import { describe, expect, it } from "vitest";
import { DdbAuth, DdbAuthError, COBALT_TOKEN_URL } from "../../src/ddb/auth.ts";
import type { Fetcher } from "../../src/ddb/auth.ts";
import type { Cookie } from "../../src/ddb/session.ts";

const cookies: Cookie[] = [
	{ name: "CobaltSession", value: "cobalt-1" },
	{ name: "User.ID", value: "42" },
	{ name: "verification-token", value: "csrf-1" },
];

/** A fake fetcher serving one canned response per URL, recording every call. */
function fakeFetch(responses: Record<string, { status: number; body: string }>) {
	const calls: { url: string; init?: { headers?: Record<string, string>; body?: string } }[] = [];
	const fetcher: Fetcher = async (url, init) => {
		calls.push({ url, init });
		const response = responses[url] ?? { status: 404, body: "{}" };
		return { status: response.status, ok: response.status < 400, text: async () => response.body };
	};
	return { calls, fetcher };
}

describe("DdbAuth", () => {
	it("exchanges the CobaltSession cookie for a bearer token and sends it on service requests", async () => {
		const { calls, fetcher } = fakeFetch({
			[COBALT_TOKEN_URL]: { status: 200, body: JSON.stringify({ token: "bearer-1", ttl: 300 }) },
		});
		const auth = new DdbAuth({ cookies, savedAt: "" }, fetcher);
		const headers = await auth.headers("https://monster-service.dndbeyond.com/v1/Monster/99");
		expect(headers.Authorization).toBe("Bearer bearer-1");
		expect(headers["Content-Type"]).toBe("application/json");
		const exchange = calls.find((c) => c.url === COBALT_TOKEN_URL);
		expect(exchange?.init?.headers?.Cookie).toContain("CobaltSession=cobalt-1");
		expect(exchange?.init?.body).toBe("{}");
	});

	it("caches the bearer token within its ttl and refetches after it lapses", async () => {
		let now = 1_000_000;
		const { calls, fetcher } = fakeFetch({
			[COBALT_TOKEN_URL]: { status: 200, body: JSON.stringify({ token: "bearer-1", ttl: 300 }) },
		});
		const auth = new DdbAuth({ cookies, savedAt: "" }, fetcher, () => now);
		await auth.bearer();
		await auth.bearer();
		expect(calls.filter((c) => c.url === COBALT_TOKEN_URL)).toHaveLength(1);
		now += 300_000; // ttl over: the token lapsed
		await auth.bearer();
		expect(calls.filter((c) => c.url === COBALT_TOKEN_URL)).toHaveLength(2);
	});

	it("sends cookies alongside the bearer token on www.dndbeyond.com requests", async () => {
		const { fetcher } = fakeFetch({
			[COBALT_TOKEN_URL]: { status: 200, body: JSON.stringify({ token: "bearer-1", ttl: 300 }) },
		});
		const auth = new DdbAuth({ cookies, savedAt: "" }, fetcher);
		const headers = await auth.headers("https://www.dndbeyond.com/api/homebrew/...");
		expect(headers.Authorization).toBe("Bearer bearer-1");
		expect(headers.Cookie).toContain("CobaltSession=cobalt-1");
		expect(headers.Cookie).toContain("verification-token=csrf-1");
	});

	it("fails with the login remedy when no session is stored", async () => {
		const { fetcher } = fakeFetch({});
		const auth = new DdbAuth({ cookies: [], savedAt: "" }, fetcher);
		const error = await auth.bearer().catch((e: DdbAuthError) => e);
		expect(error).toBeInstanceOf(DdbAuthError);
		expect((error as DdbAuthError).hint).toMatch(/cf ddb --help/);
	});

	it("fails with the login remedy when the exchange reports the session expired", async () => {
		const { fetcher } = fakeFetch({ [COBALT_TOKEN_URL]: { status: 401, body: "expired" } });
		const auth = new DdbAuth({ cookies, savedAt: "" }, fetcher);
		const error = await auth.bearer().catch((e: DdbAuthError) => e);
		expect(error).toBeInstanceOf(DdbAuthError);
		expect((error as DdbAuthError).hint).toMatch(/cf ddb --help/);
	});
});
