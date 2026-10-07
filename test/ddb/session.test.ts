import { describe, expect, it } from "vitest";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
	cookieHeader,
	defaultSessionPath,
	dndbeyondCookies,
	loadSession,
	saveSession,
	sessionUserId,
} from "../../src/ddb/session.ts";

const browserCookies = [
	{ name: "CobaltSession", value: "cobalt-1", domain: ".dndbeyond.com", path: "/" },
	{ name: "User.ID", value: "123456", domain: ".dndbeyond.com", path: "/" },
	{ name: "verification-token", value: "csrf-1", domain: ".dndbeyond.com", path: "/" },
	{ name: "unrelated", value: "x", domain: "example.com", path: "/" },
];

describe("DDB session store", () => {
	it("round-trips cookies through the session file", async () => {
		const dir = await mkdtemp(join(tmpdir(), "cf-ddb-"));
		const path = join(dir, "ddb-session.json");
		await saveSession({ cookies: browserCookies, savedAt: "2026-10-06T12:00:00.000Z" }, path);
		const raw = JSON.parse(await readFile(path, "utf8")) as { cookies: unknown[]; savedAt: string };
		expect(raw.savedAt).toBe("2026-10-06T12:00:00.000Z");
		const loaded = await loadSession(path);
		expect(loaded?.cookies).toHaveLength(4);
		expect(loaded?.cookies.find((c) => c.name === "CobaltSession")?.value).toBe("cobalt-1");
	});

	it("returns undefined, not a throw, when no session is saved", async () => {
		expect(await loadSession(join(tmpdir(), "cf-ddb-none", "ddb-session.json"))).toBeUndefined();
	});

	it("keeps only dndbeyond.com cookies when importing a browser cookie jar", () => {
		const kept = dndbeyondCookies(browserCookies);
		expect(kept.map((c) => c.name)).toEqual(["CobaltSession", "User.ID", "verification-token"]);
	});

	it("builds a Cookie header from the session's cookies", () => {
		expect(cookieHeader(browserCookies)).toBe("CobaltSession=cobalt-1; User.ID=123456; verification-token=csrf-1; unrelated=x");
		expect(cookieHeader(dndbeyondCookies(browserCookies))).not.toContain("unrelated");
	});

	it("reads the account id from the User.ID cookie", () => {
		expect(sessionUserId(browserCookies)).toBe(123456);
		expect(sessionUserId([{ name: "other", value: "1" }])).toBeUndefined();
		expect(sessionUserId([{ name: "User.ID", value: "not-a-number" }])).toBeUndefined();
	});

	it("stores the session beside the repo in the user's home by default", () => {
		expect(defaultSessionPath()).toContain(".campaign-foundry/ddb-session.json");
	});
});
