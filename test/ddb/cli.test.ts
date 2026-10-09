import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { cf, repoRoot } from "../check/helpers.ts";
import { runDdbCreate, runDdbDelete, runDdbReplay, runDdbUpdate, runDdbVerify } from "../../src/commands/ddb.ts";
import type { DdbCliDeps } from "../../src/commands/ddb.ts";
import { DdbAuth, COBALT_TOKEN_URL } from "../../src/ddb/auth.ts";
import type { Fetcher, FetchResult } from "../../src/ddb/auth.ts";
import type { Transport } from "../../src/ddb/transport.ts";
import type { DdbMonsterRecord } from "../../src/ddb/monster.ts";

const FIXTURES = join(repoRoot, "test/ddb/fixtures");

/** One `cf ddb` invocation in this process. */
const runDdb = async (args: string[]) => cf(["ddb", ...args]);

describe("cf ddb --help", () => {
	it("documents the Authentication and Capture procedures with examples", async () => {
		const help = await runDdb(["--help"]);
		expect(help.code).toBe(0);
		expect(help.stdout).toContain("Usage: cf ddb");
		expect(help.stdout).toContain("Authentication");
		expect(help.stdout).toContain("ddb-session.json");
		expect(help.stdout).toContain("Capture");
		expect(help.stdout).toContain("cf-ddb-capture");
		expect(help.stdout).toContain("cf ddb verify --id 4000001 --file monster.json");
	});

	it("runs each subcommand's help", async () => {
		for (const sub of ["status", "verify", "replay"]) {
			const help = await runDdb([sub, "--help"]);
			expect(help.code).toBe(0);
			expect(help.stdout).toContain(`Usage: cf ddb ${sub}`);
		}
	});
});

describe("cf ddb status", () => {
	it("exits 1 with the login remedy when no session is stored", async () => {
		const result = await runDdb(["status", "--session", join(tmpdir(), "no-such-ddb-session.json")]);
		expect(result.code).toBe(1);
		expect(result.stderr).toMatch(/session/i);
		expect(result.stderr).toMatch(/cf ddb --help/);
	});

	it("reports a stored session and exits 0", async () => {
		const result = await runDdb(["status", "--session", join(FIXTURES, "session.json")]);
		expect(result.code).toBe(0);
		expect(result.stdout).toContain("CobaltSession");
		expect(result.stdout).toContain("4242");
	});

	it("prints machine-readable state with --json", async () => {
		const result = await runDdb(["status", "--session", join(FIXTURES, "session.json"), "--json"]);
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
		expect(result.stdout).toContain("POST https://www.dndbeyond.com/api/homebrew/monster/create");
		expect(result.stdout).toMatch(/--yes/);
		expect(result.stdout).not.toMatch(/sent|performed/i);
	});

	it("exits 2 naming the capture procedure for a missing capture file", async () => {
		const result = await runDdb(["replay", join(tmpdir(), "no-such-capture.json")]);
		expect(result.code).toBe(2);
		expect(result.stderr + result.stdout).toMatch(/cf ddb --help|Capture/i);
	});
});

/** A read-back served by the fake monster-service, matching the canonical fixture field for field. */
const readback: DdbMonsterRecord = {
	id: 4000001,
	name: "Young Bloodhawk",
	sizeId: 4,
	armorClass: 14,
	armorClassDescription: "Natural Armor",
	averageHitPoints: 39,
	hitPointDice: { diceCount: 6, diceValue: 8, diceMultiplier: 1, fixedValue: 12, diceString: "6d8+12" },
	stats: [1, 2, 3, 4, 5, 6].map((id, i) => ({ statId: id, name: "", value: [14, 18, 14, 3, 16, 7][i]! })),
	challengeRatingId: 8,
	isHomebrew: true,
	homebrewStatus: 0,
	url: "https://www.dndbeyond.com/monsters/4000001",
};

/** Fake transport over canned routes, following transport.test.ts's pattern. */
function depsOver(routes: (url: string) => FetchResult | undefined): DdbCliDeps {
	const fetcher: Fetcher = async (url) => routes(url) ?? { status: 404, ok: false, text: async () => "{}" };
	const auth = new DdbAuth(
		{ cookies: [{ name: "CobaltSession", value: "cobalt-1" }], savedAt: "" },
		(url) =>
			url === COBALT_TOKEN_URL
				? Promise.resolve({ status: 200, ok: true, text: async () => JSON.stringify({ token: "bearer-1", ttl: 300 }) })
				: Promise.resolve({ status: 404, ok: false, text: async () => "{}" }),
	);
	const transport: Transport = { fetch: fetcher, auth };
	return {
		session: async (path: string) => (path.endsWith("session.json") ? { cookies: [{ name: "CobaltSession", value: "cobalt-1" }], savedAt: "" } : undefined),
		transport: () => transport,
	};
}

const VERIFY_FLAGS = { id: "4000001", file: join(FIXTURES, "canonical.json"), session: "session.json" };

describe("runDdbVerify", () => {
	it("reports every matched field and exits 0", async () => {
		const deps = depsOver((url) =>
			url.includes("/v1/Monster/4000001")
				? { status: 200, ok: true, text: async () => JSON.stringify({ data: readback }) }
				: undefined,
		);
		const result = await runDdbVerify(VERIFY_FLAGS, deps);
		expect(result.exitCode).toBe(0);
		expect(result.out.join("\n")).toContain("name");
		expect(result.out.join("\n")).toMatch(/6\/6|all/i);
	});

	it("names each mismatched field and exits 1", async () => {
		const drifted = { ...readback, name: "Old Bloodhawk", armorClass: 15 };
		const deps = depsOver((url) =>
			url.includes("/v1/Monster/4000001")
				? { status: 200, ok: true, text: async () => JSON.stringify({ data: drifted }) }
				: undefined,
		);
		const result = await runDdbVerify(VERIFY_FLAGS, deps);
		expect(result.exitCode).toBe(1);
		expect(result.out.join("\n")).toMatch(/name/);
		expect(result.out.join("\n")).toMatch(/ac/);
	});

	it("exits 1 with the Authentication remedy when no session is stored", async () => {
		const result = await runDdbVerify({ ...VERIFY_FLAGS, session: "missing" }, depsOver(() => undefined));
		expect(result.exitCode).toBe(1);
		expect(result.err.join("\n")).toMatch(/cf ddb --help/);
	});

	it("exits 2 naming both flags when neither --id nor --name is given", async () => {
		const result = await runDdbVerify({ file: VERIFY_FLAGS.file }, depsOver(() => undefined));
		expect(result.exitCode).toBe(2);
		expect(result.err.join("\n")).toMatch(/--id|--name/);
	});

	it("exits 2 describing the canonical shape for a malformed canonical file", async () => {
		const dirs: string[] = [];
		const dir = await mkdtemp(join(tmpdir(), "ddb-canonical-"));
		dirs.push(dir);
		const path = join(dir, "bad.json");
		await writeFile(path, JSON.stringify({ name: "No Size" }));
		const result = await runDdbVerify({ ...VERIFY_FLAGS, file: path }, depsOver(() => undefined));
		expect(result.exitCode).toBe(2);
		expect(result.err.join("\n")).toMatch(/size|ac|hitDice/);
		afterAll(async () => {
			await Promise.all(dirs.map((d) => rm(d, { recursive: true, force: true })));
		});
	});
});

describe("runDdbReplay", () => {
	it("performs the captured requests with --yes and exits 0 when all succeed", async () => {
		const calls: string[] = [];
		const deps = depsOver((url) => {
			calls.push(url);
			return { status: 200, ok: true, text: async () => JSON.stringify({ id: 4000001 }) };
		});
		const result = await runDdbReplay({ yes: true, session: "session.json" }, join(FIXTURES, "capture.json"), deps);
		expect(result.exitCode).toBe(0);
		expect(calls).toEqual(["https://www.dndbeyond.com/api/homebrew/monster/create"]);
		expect(result.out.join("\n")).toMatch(/POST/);
	});

	it("exits 1 and keeps the remedy when the write is refused", async () => {
		const deps = depsOver(() => ({ status: 403, ok: false, text: async () => "forbidden" }));
		const result = await runDdbReplay({ yes: true, session: "session.json" }, join(FIXTURES, "capture.json"), deps);
		expect(result.exitCode).toBe(1);
		expect(result.out.join("\n") + result.err.join("\n")).toMatch(/403|browser/);
	});
});

/** A minimal builder form carrying every field applyMonsterCanonical overrides. */
const EDIT_FORM = `<form id="monster-form" method="post" action="/homebrew/creations/monsters/4000009-cf-test-hawk/edit">
<input id="field-security-token" name="security-token" type="hidden" value="sec-1" />
<input type="text" name="Name" id="field-Name" value="COPY_OF_Blood Hawk" />
<select id="field-size" name="size"><option value="">—</option><option value="4" selected="selected">Medium</option><option value="3">Small</option></select>
<input type="text" name="armor-class" id="field-armor-class" value="12" />
<input type="text" name="armor-class-type" id="field-armor-class-type" value="" />
<input type="text" name="average-hit-points" id="field-average-hit-points" value="7" />
<input type="text" name="hit-points-die-count" id="field-hit-points-die-count" value="2" />
<select id="field-hit-points-die-value" name="hit-points-die-value"><option value="8">d8</option><option value="6" selected="selected">d6</option></select>
<input type="text" name="hit-points-modifier" id="field-hit-points-modifier" value="0" />
<input type="text" name="hash1" id="field-strength" value="6" />
<input type="text" name="hash2" id="field-dexterity" value="14" />
<input type="text" name="hash3" id="field-constitution" value="10" />
<input type="text" name="hash4" id="field-intelligence" value="3" />
<input type="text" name="hash5" id="field-wisdom" value="14" />
<input type="text" name="hash6" id="field-charisma" value="5" />
</form>`;

const CREATE_PAGE = `<input name="security-token" type="hidden" value="sec-9" /><input name="authenticity-token" type="hidden" value="auth-9" />`;

const VIEW_WITH_DELETE = `<a class="modal-link homebrew-creation-actions-item homebrew-creation-actions-item-delete" href="/homebrew/creations/delete?entityTypeId=779871897&id=4000009">Delete</a>`;

/** A read-back that matches fixtures/canonical.json once the write has been applied. */
const appliedReadback: DdbMonsterRecord = {
	...readback,
	id: 4000009,
	url: "https://www.dndbeyond.com/monsters/4000009-cf-test-young-bloodhawk",
};

/** Full write-flow deps: monster-service reads, site pages, the create redirect and the delete oracle. */
function writeDeps(routes: (url: string, init?: { method?: string }) => FetchResult | undefined): DdbCliDeps {
	const session = { cookies: [{ name: "CobaltSession", value: "cobalt-1" }, { name: "RequestVerificationToken", value: "rvt-1" }], savedAt: "" };
	const fetcher: Fetcher = async (url, init) => routes(url, init) ?? { status: 404, ok: false, text: async () => "{}" };
	const auth = new DdbAuth(
		session,
		(url) => (url === COBALT_TOKEN_URL ? Promise.resolve({ status: 200, ok: true, text: async () => JSON.stringify({ token: "bearer-1", ttl: 300 }) }) : Promise.resolve({ status: 404, ok: false, text: async () => "{}" })),
	);
	return {
		session: async (path: string) => (path.endsWith("session.json") ? session : undefined),
		transport: () => ({ fetch: fetcher, auth }),
	};
}

describe("runDdbCreate", () => {
	it("prints the create plan and exits 2 without --yes, sending nothing", async () => {
		const calls: string[] = [];
		const deps = writeDeps((url) => {
			calls.push(url);
			return undefined;
		});
		const result = await runDdbCreate({ file: join(FIXTURES, "canonical.json"), from: "16810", session: "session.json" }, deps);
		expect(result.exitCode).toBe(2);
		expect(result.out.join("\n")).toMatch(/Create plan/);
		expect(result.out.join("\n")).toMatch(/--yes/);
		expect(calls).toEqual([]);
	});

	it("creates, saves and verifies end-to-end, printing the id and url", async () => {
		const deps = writeDeps((url, init) => {
			if (url.endsWith("/v1/Monster/16810")) return { status: 200, ok: true, text: async () => JSON.stringify({ data: { ...readback, id: 16810, name: "Blood Hawk", isHomebrew: false } }) };
			if (url.endsWith("/create-monster") && (init?.method ?? "GET") === "GET") return { status: 200, ok: true, text: async () => CREATE_PAGE };
			if (url.endsWith("/create-monster")) return { status: 302, ok: false, text: async () => "", headers: { get: (name: string) => (name === "location" ? "/homebrew/creations/edit?entityTypeId=779871897&id=4000009" : null) } };
			if (url.endsWith("/v1/Monster/4000009")) return { status: 200, ok: true, text: async () => JSON.stringify({ data: appliedReadback }) };
			if (url.endsWith("/edit") && (init?.method ?? "GET") === "GET") return { status: 200, ok: true, text: async () => EDIT_FORM };
			if (url.endsWith("/edit")) return { status: 303, ok: false, text: async () => "" };
			return undefined;
		});
		const result = await runDdbCreate({ file: join(FIXTURES, "canonical.json"), from: "16810", yes: true, session: "session.json" }, deps);
		expect(result.exitCode).toBe(0);
		const out = result.out.join("\n");
		expect(out).toMatch(/created  4000009/);
		expect(out).toMatch(/6\/6 fields match/);
		expect(out).toContain("https://www.dndbeyond.com/monsters/4000009");
	});

	it("exits 1 when the read-back mismatches the canonical monster", async () => {
		const deps = writeDeps((url, init) => {
			if (url.endsWith("/v1/Monster/16810")) return { status: 200, ok: true, text: async () => JSON.stringify({ data: { ...readback, id: 16810, name: "Blood Hawk", isHomebrew: false } }) };
			if (url.endsWith("/create-monster") && (init?.method ?? "GET") === "GET") return { status: 200, ok: true, text: async () => CREATE_PAGE };
			if (url.endsWith("/create-monster")) return { status: 302, ok: false, text: async () => "", headers: { get: () => "/homebrew/creations/edit?entityTypeId=779871897&id=4000009" } };
			if (url.endsWith("/v1/Monster/4000009")) return { status: 200, ok: true, text: async () => JSON.stringify({ data: { ...appliedReadback, name: "COPY_OF_Blood Hawk" } }) };
			if (url.endsWith("/edit") && (init?.method ?? "GET") === "GET") return { status: 200, ok: true, text: async () => EDIT_FORM };
			if (url.endsWith("/edit")) return { status: 303, ok: false, text: async () => "" };
			return undefined;
		});
		const result = await runDdbCreate({ file: join(FIXTURES, "canonical.json"), from: "16810", yes: true, session: "session.json" }, deps);
		expect(result.exitCode).toBe(1);
		expect(result.out.join("\n")).toMatch(/MISMATCH|mismatch/);
	});

	it("exits 2 naming --from for a missing or non-numeric base monster", async () => {
		expect((await runDdbCreate({ file: join(FIXTURES, "canonical.json"), session: "session.json" }, writeDeps(() => undefined))).exitCode).toBe(2);
		const bad = await runDdbCreate({ file: join(FIXTURES, "canonical.json"), from: "blood-hawk", session: "session.json" }, writeDeps(() => undefined));
		expect(bad.exitCode).toBe(2);
		expect(bad.err.join("\n")).toMatch(/--from/);
	});

	it("exits 1 with the login remedy when no session is stored", async () => {
		const result = await runDdbCreate({ file: join(FIXTURES, "canonical.json"), from: "16810", yes: true, session: "missing" }, writeDeps(() => undefined));
		expect(result.exitCode).toBe(1);
		expect(result.err.join("\n")).toMatch(/cf ddb --help/);
	});
});

describe("runDdbUpdate", () => {
	it("prints the update plan and exits 2 without --yes", async () => {
		const result = await runDdbUpdate({ id: "4000009", file: join(FIXTURES, "canonical.json"), session: "session.json" }, writeDeps(() => undefined));
		expect(result.exitCode).toBe(2);
		expect(result.out.join("\n")).toMatch(/Update plan for monster 4000009/);
	});

	it("saves and verifies, exiting 0 only on a full match", async () => {
		const deps = writeDeps((url, init) => {
			if (url.endsWith("/v1/Monster/4000009")) return { status: 200, ok: true, text: async () => JSON.stringify({ data: appliedReadback }) };
			if (url.endsWith("/edit") && (init?.method ?? "GET") === "GET") return { status: 200, ok: true, text: async () => EDIT_FORM };
			if (url.endsWith("/edit")) return { status: 303, ok: false, text: async () => "" };
			return undefined;
		});
		const result = await runDdbUpdate({ id: "4000009", file: join(FIXTURES, "canonical.json"), yes: true, session: "session.json" }, deps);
		expect(result.exitCode).toBe(0);
		expect(result.out.join("\n")).toMatch(/saved    4000009/);
	});

	it("exits 2 for a non-numeric id", async () => {
		const result = await runDdbUpdate({ id: "hawk", file: join(FIXTURES, "canonical.json"), session: "session.json" }, writeDeps(() => undefined));
		expect(result.exitCode).toBe(2);
		expect(result.err.join("\n")).toMatch(/--id/);
	});
});

describe("runDdbDelete", () => {
	it("prints the delete plan and exits 2 without --yes", async () => {
		const result = await runDdbDelete({ id: "4000009", session: "session.json" }, writeDeps(() => undefined));
		expect(result.exitCode).toBe(2);
		expect(result.out.join("\n")).toMatch(/Delete plan for monster 4000009/);
	});

	it("deletes and confirms gone, exiting 0", async () => {
		let deleted = false;
		const deps = writeDeps((url, init) => {
			if (url.includes("/homebrew/creations/view")) return { status: 200, ok: true, text: async () => (deleted ? "<html>shell</html>" : VIEW_WITH_DELETE) };
			if (url.includes("/homebrew/creations/delete") && (init?.method ?? "GET") === "GET") return { status: 200, ok: true, text: async () => `<div class="ddb-modal">sure?</div>` };
			if (url.includes("/homebrew/creations/delete")) {
				deleted = true;
				return { status: 200, ok: true, text: async () => "" };
			}
			return undefined;
		});
		const result = await runDdbDelete({ id: "4000009", yes: true, session: "session.json" }, deps);
		expect(result.exitCode).toBe(0);
		expect(result.out.join("\n")).toMatch(/confirmed gone/);
	});

	it("exits 1 when the creation page still offers the delete action after the POST", async () => {
		const deps = writeDeps((url) => {
			if (url.includes("/homebrew/creations/view")) return { status: 200, ok: true, text: async () => VIEW_WITH_DELETE };
			if (url.includes("/homebrew/creations/delete")) return { status: 200, ok: true, text: async () => "" };
			return undefined;
		});
		const result = await runDdbDelete({ id: "4000009", yes: true, session: "session.json" }, deps);
		expect(result.exitCode).toBe(1);
		expect(result.out.join("\n") + result.err.join("\n")).toMatch(/still offers/);
	});
});
