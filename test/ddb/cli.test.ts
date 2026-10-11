import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { cf, repoRoot } from "../check/helpers.ts";
import { runDdbCreate, runDdbDelete, runDdbUpdate, runDdbVerify } from "../../src/commands/ddb.ts";
import type { DdbCliDeps } from "../../src/commands/ddb.ts";
import { DdbAuth, COBALT_TOKEN_URL } from "../../src/ddb/auth.ts";
import type { Fetcher, FetchResult } from "../../src/ddb/auth.ts";
import type { Transport } from "../../src/ddb/transport.ts";

const FIXTURES = join(repoRoot, "test/ddb/fixtures");

/** One `cf ddb` invocation in this process. */
const runDdb = async (args: string[]) => cf(["ddb", ...args]);

describe("cf ddb status", () => {
	it("exits 1 with the login remedy when no session is stored", async () => {
		const result = await runDdb(["status", "--credentials", join(tmpdir(), "no-such-ddb-session.json")]);
		expect(result.code).toBe(1);
		expect(result.stderr).toMatch(/session/i);
		expect(result.stderr).toMatch(/bun run cf -- ddb --help/);
	});

	it("reports a stored session and exits 0", async () => {
		const result = await runDdb(["status", "--credentials", join(FIXTURES, "session.json")]);
		expect(result.code).toBe(0);
		expect(result.stdout).toContain("CobaltSession");
		expect(result.stdout).toContain("4242");
	});

	it("prints machine-readable state with --json", async () => {
		const result = await runDdb(["status", "--credentials", join(FIXTURES, "session.json"), "--json"]);
		expect(result.code).toBe(0);
		const parsed = JSON.parse(result.stdout) as { session: string; cookies: number; userId: number };
		expect(parsed.session).toBe("present");
		expect(parsed.cookies).toBe(3);
		expect(parsed.userId).toBe(4242);
	});
});

describe("cf ddb replay", () => {
	it("prints the plan and exits 2 without --yes, sending nothing", async () => {
		const result = await runDdb(["replay", join(FIXTURES, "capture.json")]);
		expect(result.code).toBe(2);
		expect(result.stderr).toContain("POST https://www.dndbeyond.com/api/homebrew/monster/create");
		expect(result.stderr).toMatch(/--yes/);
		expect(result.stderr).not.toMatch(/sent|performed/i);
	});

	it("exits 2 naming the capture procedure for a missing capture file", async () => {
		const result = await runDdb(["replay", join(tmpdir(), "no-such-capture.json")]);
		expect(result.code).toBe(2);
		expect(result.stderr + result.stdout).toMatch(/cf ddb --help|Capture/i);
	});
});

/** Fake transport over canned routes, following transport.test.ts's pattern. */
function depsOver(routes: (url: string) => FetchResult | undefined): DdbCliDeps {
	const fetcher: Fetcher = async (url) => routes(url) ?? { status: 404, ok: false, text: async () => "{}" };
	const auth = new DdbAuth({ cookies: [{ name: "CobaltSession", value: "cobalt-1" }], savedAt: "" }, (url) =>
		url === COBALT_TOKEN_URL
			? Promise.resolve({ status: 200, ok: true, text: async () => JSON.stringify({ token: "bearer-1", ttl: 300 }) })
			: Promise.resolve({ status: 404, ok: false, text: async () => "{}" }),
	);
	const transport: Transport = { fetch: fetcher, auth };
	return {
		session: async (path: string) =>
			path.endsWith("session.json")
				? { cookies: [{ name: "CobaltSession", value: "cobalt-1" }], savedAt: "" }
				: undefined,
		transport: () => transport,
	};
}

const VERIFY_FLAGS = { id: "4000001", file: join(FIXTURES, "canonical.json"), credentials: "session.json" };

describe("runDdbVerify", () => {
	it("exits 1 with the Authentication remedy when no session is stored", async () => {
		const result = await runDdbVerify(
			{ ...VERIFY_FLAGS, credentials: "missing" },
			depsOver(() => undefined),
		);
		expect(result.exitCode).toBe(1);
		expect(result.err.join("\n")).toMatch(/bun run cf -- ddb --help/);
	});

	it("exits 2 naming both flags when neither --id nor --name is given", async () => {
		const result = await runDdbVerify(
			{ file: VERIFY_FLAGS.file },
			depsOver(() => undefined),
		);
		expect(result.exitCode).toBe(2);
		expect(result.err.join("\n")).toMatch(/--id|--name/);
	});

	it("exits 2 describing the canonical shape for a malformed canonical file", async () => {
		const dirs: string[] = [];
		const dir = await mkdtemp(join(tmpdir(), "ddb-canonical-"));
		dirs.push(dir);
		const path = join(dir, "bad.json");
		await writeFile(path, JSON.stringify({ name: "No Size" }));
		const result = await runDdbVerify(
			{ ...VERIFY_FLAGS, file: path },
			depsOver(() => undefined),
		);
		expect(result.exitCode).toBe(2);
		expect(result.err.join("\n")).toMatch(/size|ac|hitDice/);
		afterAll(async () => {
			await Promise.all(dirs.map((d) => rm(d, { recursive: true, force: true })));
		});
	});
});

function emptyWriteDeps(): DdbCliDeps {
	const session = {
		cookies: [
			{ name: "CobaltSession", value: "cobalt-1" },
			{ name: "RequestVerificationToken", value: "rvt-1" },
		],
		savedAt: "",
	};
	const fetcher: Fetcher = async () => ({ status: 404, ok: false, text: async () => "{}" });
	const auth = new DdbAuth(session, (url) =>
		url === COBALT_TOKEN_URL
			? Promise.resolve({ status: 200, ok: true, text: async () => JSON.stringify({ token: "bearer-1", ttl: 300 }) })
			: Promise.resolve({ status: 404, ok: false, text: async () => "{}" }),
	);
	return {
		session: async (path: string) => (path.endsWith("session.json") ? session : undefined),
		transport: () => ({ fetch: fetcher, auth }),
	};
}

describe("runDdbCreate", () => {
	it("prints the create plan and exits 2 without --yes, sending nothing", async () => {
		const result = await runDdbCreate(
			{ file: join(FIXTURES, "canonical.json"), from: "16810", credentials: "session.json" },
			emptyWriteDeps(),
		);
		expect(result.exitCode).toBe(2);
		expect(result.err.join("\n")).toMatch(/Create plan/);
		expect(result.err.join("\n")).toMatch(/--yes/);
	});

	it("exits 2 naming --from for a missing or non-numeric base monster", async () => {
		expect(
			(await runDdbCreate({ file: join(FIXTURES, "canonical.json"), credentials: "session.json" }, emptyWriteDeps()))
				.exitCode,
		).toBe(2);
		const bad = await runDdbCreate(
			{ file: join(FIXTURES, "canonical.json"), from: "blood-hawk", credentials: "session.json" },
			emptyWriteDeps(),
		);
		expect(bad.exitCode).toBe(2);
		expect(bad.err.join("\n")).toMatch(/--from/);
	});

	it("exits 1 with the login remedy when no session is stored", async () => {
		const result = await runDdbCreate(
			{ file: join(FIXTURES, "canonical.json"), from: "16810", yes: true, credentials: "missing" },
			emptyWriteDeps(),
		);
		expect(result.exitCode).toBe(1);
		expect(result.err.join("\n")).toMatch(/bun run cf -- ddb --help/);
	});
});

describe("runDdbUpdate", () => {
	it("prints the update plan and exits 2 without --yes", async () => {
		const result = await runDdbUpdate(
			{ id: "4000009", file: join(FIXTURES, "canonical.json"), credentials: "session.json" },
			emptyWriteDeps(),
		);
		expect(result.exitCode).toBe(2);
		expect(result.err.join("\n")).toMatch(/Update plan for monster 4000009/);
	});

	it("exits 2 for a non-numeric id", async () => {
		const result = await runDdbUpdate(
			{ id: "hawk", file: join(FIXTURES, "canonical.json"), credentials: "session.json" },
			emptyWriteDeps(),
		);
		expect(result.exitCode).toBe(2);
		expect(result.err.join("\n")).toMatch(/--id/);
	});
});

describe("runDdbDelete", () => {
	it("prints the delete plan and exits 2 without --yes", async () => {
		const result = await runDdbDelete({ id: "4000009", credentials: "session.json" }, emptyWriteDeps());
		expect(result.exitCode).toBe(2);
		expect(result.err.join("\n")).toMatch(/Delete plan for monster 4000009/);
	});
});
