import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { DdbAuth, COBALT_TOKEN_URL } from "../../src/ddb/auth.ts";
import type { Fetcher, FetchResult } from "../../src/ddb/auth.ts";
import { DdbCaptureError, loadCapture, loadContract, loadContractFrom, redactHeaders, replay, REDACTED } from "../../src/ddb/capture.ts";
import type { CaptureFile, CapturedRequest } from "../../src/ddb/capture.ts";
import type { Transport } from "../../src/ddb/transport.ts";
import type { Cookie } from "../../src/ddb/session.ts";

const cookies: Cookie[] = [
	{ name: "CobaltSession", value: "cobalt-1", domain: ".dndbeyond.com" },
	{ name: "User.ID", value: "4242", domain: ".dndbeyond.com" },
];

/** A capture as it comes out of the browser recording: sensitive header values still present. */
const recorded: CaptureFile = {
	kind: "cf-ddb-capture",
	version: 1,
	capturedAt: "2026-10-06T12:00:00.000Z",
	notes: "created one private homebrew monster",
	requests: [
		{
			method: "POST",
			url: "https://www.dndbeyond.com/api/homebrew/monster/create",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer abc123",
				Cookie: "CobaltSession=cobalt-1; User.ID=4242",
				"x-csrf-token": "csrf-9",
			},
			body: JSON.stringify({ name: "cf-test Bloodhawk" }),
			status: 200,
			responsePreview: '{"id":4000001}',
		},
	],
};

describe("redactHeaders", () => {
	it("replaces cookie, authorization, token and csrf header values while keeping names", () => {
		const redacted = redactHeaders(recorded.requests[0]!.headers);
		expect(redacted).toEqual({
			"Content-Type": "application/json",
			Authorization: REDACTED,
			Cookie: REDACTED,
			"x-csrf-token": REDACTED,
		});
	});

	it("matches header names case-insensitively", () => {
		expect(redactHeaders({ COOKIE: "a=b", AUTHORIZATION: "Bearer x" })).toEqual({ COOKIE: REDACTED, AUTHORIZATION: REDACTED });
	});

	it("leaves other headers untouched", () => {
		expect(redactHeaders({ Accept: "application/json" })).toEqual({ Accept: "application/json" });
	});
});

describe("loadCapture", () => {
	const dirs: string[] = [];
	afterAll(async () => {
		await Promise.all(dirs.map((d) => rm(d, { recursive: true, force: true })));
	});

	async function scratch(name: string, content: string): Promise<string> {
		const dir = await mkdtemp(join(tmpdir(), "ddb-capture-"));
		dirs.push(dir);
		const path = join(dir, name);
		await writeFile(path, content);
		return path;
	}

	it("reads a capture file back with its requests intact", async () => {
		const path = await scratch("capture.json", JSON.stringify(recorded));
		const capture = await loadCapture(path);
		expect(capture.kind).toBe("cf-ddb-capture");
		expect(capture.requests[0]?.url).toBe(recorded.requests[0]!.url);
	});

	it("refuses a file that is not a cf-ddb-capture", async () => {
		const path = await scratch("wrong.json", JSON.stringify({ kind: "something-else", version: 1, requests: [] }));
		const error = await loadCapture(path).catch((e: unknown) => e);
		expect(error).toBeInstanceOf(DdbCaptureError);
		expect((error as DdbCaptureError).message).toMatch(/cf-ddb-capture/);
	});

	it("names the capture procedure when the file is missing", async () => {
		const error = await loadCapture(join(tmpdir(), "no-such-capture.json")).catch((e: unknown) => e);
		expect(error).toBeInstanceOf(DdbCaptureError);
		expect((error as DdbCaptureError).hint).toMatch(/Capture/);
	});
});

/** The transport fakes reuse the pattern from transport.test.ts. */
function fakeFetch(routes: (url: string) => FetchResult | undefined) {
	const calls: { url: string; init?: { method?: string; headers?: Record<string, string>; body?: string } }[] = [];
	const fetcher: Fetcher = async (url, init) => {
		calls.push({ url, init });
		return routes(url) ?? { status: 404, ok: false, text: async () => "{}" };
	};
	return { calls, fetcher };
}

function transportOver(fetcher: Fetcher): Transport {
	const auth = new DdbAuth({ cookies, savedAt: "" }, (url) =>
		url === COBALT_TOKEN_URL
			? Promise.resolve({ status: 200, ok: true, text: async () => JSON.stringify({ token: "bearer-1", ttl: 300 }) })
			: Promise.resolve({ status: 404, ok: false, text: async () => "{}" }),
	);
	return { fetch: fetcher, auth };
}

function captureOf(requests: Partial<CapturedRequest>[]): CaptureFile {
	return {
		kind: "cf-ddb-capture",
		version: 1,
		capturedAt: "2026-10-06T12:00:00.000Z",
		requests: requests.map((r) => ({
			method: r.method ?? "POST",
			url: r.url ?? "https://www.dndbeyond.com/api/homebrew/monster/create",
			headers: r.headers ?? { Authorization: REDACTED, Cookie: REDACTED },
			...r,
		})),
	};
}

describe("replay", () => {
	it("replays requests in capture order, refilling redacted headers from the live session", async () => {
		const { calls, fetcher } = fakeFetch(() => ({ status: 200, ok: true, text: async () => JSON.stringify({ id: 4000001 }) }));
		const capture = captureOf([
			{ url: "https://www.dndbeyond.com/api/homebrew/monster/create", headers: { Cookie: REDACTED, Authorization: REDACTED, "Content-Type": "application/json" }, body: '{"name":"cf-test A"}' },
			{ method: "PUT", url: "https://www.dndbeyond.com/api/homebrew/monster/4000001", headers: { Cookie: REDACTED }, body: '{"name":"cf-test A v2"}' },
		]);
		const outcomes = await replay(transportOver(fetcher), capture);
		expect(outcomes).toHaveLength(2);
		expect(outcomes.every((o) => o.ok)).toBe(true);
		expect(calls.map((c) => c.url)).toEqual(capture.requests.map((r) => r.url));
		expect(calls[0]?.init?.headers?.Authorization).toBe("Bearer bearer-1");
		expect(calls[0]?.init?.headers?.Cookie).toContain("CobaltSession=cobalt-1");
		expect(calls[0]?.init?.headers?.Cookie).not.toContain(REDACTED);
		expect(calls[0]?.init?.headers?.["Content-Type"]).toBe("application/json");
		expect(calls[1]?.init?.method).toBe("PUT");
	});

	it("keeps captured header values that were not redacted", async () => {
		const { calls, fetcher } = fakeFetch(() => ({ status: 200, ok: true, text: async () => "{}" }));
		await replay(transportOver(fetcher), captureOf([{ headers: { Cookie: REDACTED, "x-custom": "keep-me" } }]));
		expect(calls[0]?.init?.headers?.["x-custom"]).toBe("keep-me");
	});

	it("stops at the first failed request and reports it without continuing", async () => {
		const { calls, fetcher } = fakeFetch((url) =>
			url.includes("create")
				? { status: 200, ok: true, text: async () => JSON.stringify({ id: 4000001 }) }
				: { status: 429, ok: false, text: async () => "slow down" },
		);
		const capture = captureOf([
			{ url: "https://www.dndbeyond.com/api/homebrew/monster/create" },
			{ url: "https://www.dndbeyond.com/api/homebrew/monster/update" },
			{ url: "https://www.dndbeyond.com/api/homebrew/monster/delete" },
		]);
		const outcomes = await replay(transportOver(fetcher), capture);
		expect(outcomes).toHaveLength(2);
		expect(outcomes[0]?.ok).toBe(true);
		expect(outcomes[1]?.ok).toBe(false);
		expect(outcomes[1]?.status).toBe(429);
		expect(calls).toHaveLength(2);
	});

	it("carries the transport error's remedy hint into the outcome", async () => {
		const { fetcher } = fakeFetch(() => ({ status: 401, ok: false, text: async () => "unauthorized" }));
		const outcomes = await replay(transportOver(fetcher), captureOf([{}]));
		expect(outcomes[0]?.hint).toMatch(/re-login|session/);
	});
});

describe("loadContract", () => {
	const dirs: string[] = [];
	afterAll(async () => {
		await Promise.all(dirs.map((d) => rm(d, { recursive: true, force: true })));
	});

	async function contractDir(file: string, content: string): Promise<string> {
		const dir = await mkdtemp(join(tmpdir(), "ddb-contracts-"));
		dirs.push(dir);
		await mkdir(join(dir, "monster"), { recursive: true });
		await writeFile(join(dir, "monster", file), content);
		return dir;
	}

	it("names the capture procedure and the contract path when a contract is missing", async () => {
		const error = await loadContract("monster", "create-version").catch((e: unknown) => e);
		expect(error).toBeInstanceOf(DdbCaptureError);
		expect((error as DdbCaptureError).message).toMatch(/monster\/create-version\.json/);
		expect((error as DdbCaptureError).hint).toMatch(/cf ddb --help/);
	});

	it("loads the committed monster contracts, bodies redacted", async () => {
		for (const op of ["create", "update", "delete"]) {
			const contract = await loadContract("monster", op);
			expect(contract.requests.length).toBeGreaterThan(0);
		}
	});

	it("refuses a contract holding a live token value in its body", async () => {
		const unredactedBody = JSON.stringify({
			...recorded,
			requests: [
				{ ...recorded.requests[0]!, headers: redactHeaders(recorded.requests[0]!.headers), body: "security-token=cb94cc362d0cbc866355368743230f89&monster-type=2&monster=16810" },
			],
		});
		const dir = await contractDir("create.json", unredactedBody);
		const error = await loadContractFrom(dir, "monster", "create").catch((e: unknown) => e);
		expect(error).toBeInstanceOf(DdbCaptureError);
		expect((error as DdbCaptureError).message).toMatch(/body/);
	});

	it("loads a committed contract as a capture file", async () => {
		const committed = { ...recorded, requests: recorded.requests.map((r) => ({ ...r, headers: redactHeaders(r.headers) })) };
		const dir = await contractDir("create.json", JSON.stringify(committed));
		const contract = await loadContractFrom(dir, "monster", "create");
		expect(contract.requests[0]?.method).toBe("POST");
	});

	it("refuses a contract holding unredacted session values", async () => {
		const unredacted = JSON.stringify({
			...recorded,
			requests: [{ ...recorded.requests[0]!, headers: { Cookie: "CobaltSession=real" } }],
		});
		const dir = await contractDir("create.json", unredacted);
		const error = await loadContractFrom(dir, "monster", "create").catch((e: unknown) => e);
		expect(error).toBeInstanceOf(DdbCaptureError);
		expect((error as DdbCaptureError).message).toMatch(/redact/i);
	});
});
