import { cp, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeEach, describe, expect, it } from "vitest";
import { runCheck, UsageError } from "../../src/check/run.ts";
import type { FetchLike } from "../../src/pull/ddb.ts";
import { runPull } from "../../src/pull/pull.ts";
import type { PullResult } from "../../src/pull/pull.ts";

const fixtures = join(import.meta.dirname, "fixtures");
const templates = join(import.meta.dirname, "../../wiki/templates");
const pcDir = "Aldermoor/Campaigns/Ashes of the Crown/PCs";

const recorded = async (name: string): Promise<unknown> => JSON.parse(await readFile(join(fixtures, name), "utf8"));

/** A fetch that serves the recorded payloads by character id and refuses everything else, as D&D Beyond does for private characters. */
async function fakeFetch(): Promise<{ fetch: FetchLike; calls: string[] }> {
	const bodies: Record<string, unknown> = {
		"1000001": await recorded("character-sorcerer.json"),
		"1000002": await recorded("character-rogue.json"),
	};
	const calls: string[] = [];
	const fetch: FetchLike = async (url) => {
		calls.push(url);
		const id = url.slice(url.lastIndexOf("/") + 1);
		const body = bodies[id];
		if (body === undefined) return { ok: false, status: 403, json: async () => ({ success: false, message: "An unexpected error has occurred" }) };
		return { ok: true, status: 200, json: async () => body };
	};
	return { fetch, calls };
}

let dir: string;
let vault: string;
beforeEach(async () => {
	dir = await mkdtemp(join(tmpdir(), "cf-pull-"));
	await cp(join(fixtures, "vault"), dir, { recursive: true });
	vault = join(dir, "wiki");
});

const read = (path: string): Promise<string> => readFile(join(vault, path), "utf8");
const now = (): Date => new Date(2026, 8, 28, 12, 0, 0);

async function pull(extra: Partial<Parameters<typeof runPull>[0]> = {}): Promise<PullResult & { calls: string[] }> {
	const { fetch, calls } = await fakeFetch();
	const result = await runPull({ vault, templates, root: dir, cwd: dir, dryRun: false, fetch, now, ...extra });
	return { ...result, calls };
}

describe("runPull", () => {
	it("refreshes the sheet side of every PC with a D&D Beyond link and leaves the story side alone", async () => {
		const wrenBefore = await read(`${pcDir}/Wren.md`);
		const result = await pull();

		const byPc = Object.fromEntries(result.outcomes.map((o) => [o.pc, o.status]));
		expect(byPc).toEqual({ Hollow: "failed", Tam: "skipped", Vale: "updated", Wren: "updated" });

		const wren = await read(`${pcDir}/Wren.md`);
		expect(wren).toContain("Level 9 Halfling Sorcerer (Wild Magic Sorcery)");
		expect(wren).toContain('summary: "Halfling Sorcerer 9."');
		expect(wren.slice(wren.indexOf("## Story"))).toBe(wrenBefore.slice(wrenBefore.indexOf("## Story")));

		const vale = await read(`${pcDir}/Vale.md`);
		expect(vale).toContain("Level 5 Human Rogue (Mastermind)");
		expect(vale).toContain('summary: "The crew\'s quiet knife."');

		// Not on D&D Beyond, or private: untouched.
		expect(await read(`${pcDir}/Tam.md`)).toContain("Text.");
		expect(await read(`${pcDir}/Hollow.md`)).toContain("**Class, species and level.** Text.");
	});

	it("tells the DM which PC to fix and to make the character public, and carries on with the others", async () => {
		const result = await pull();
		const hollow = result.outcomes.find((o) => o.pc === "Hollow");
		expect(hollow?.status).toBe("failed");
		expect(hollow?.message).toMatch(/Hollow/);
		expect(hollow?.message).toMatch(/public/i);
		expect(hollow?.message).toMatch(/cf pull --pc "Hollow"/);
		expect(result.outcomes.filter((o) => o.status === "updated")).toHaveLength(2);
	});

	it("logs the operation as pull in the World's log.md and runs the gate over the pulled pages", async () => {
		const result = await pull();
		const log = await read("Aldermoor/log.md");
		expect(log).toBe(
			"## [2026-01-05] ingest | Session 1 transcript\n\n- [[Ashes of the Crown]]\n\n## [2026-09-28] pull | Pulled PCs from D&D Beyond\n\n- [[Vale]]\n- [[Wren]]\n",
		);
		expect(result.logged).toEqual(["Aldermoor/log.md"]);
		expect(result.gate?.findings).toEqual([]);
	});

	it("regenerates the World index for the summary it filled and leaves the index and log layers clean", async () => {
		expect((await read("Aldermoor/index.md")).split("\n")).toContain("- [[Wren]]");
		const result = await pull();
		expect(result.indexed).toEqual(["Aldermoor/index.md"]);
		expect((await read("Aldermoor/index.md")).split("\n")).toContain("- [[Wren]] — Halfling Sorcerer 9.");

		// The whole Wiki, not just the pulled pages.
		const gate = await runCheck({ vault, templates, root: dir, cwd: dir, layers: ["index", "log"] });
		expect(gate.findings).toEqual([]);
		expect(result.gate?.findings).toEqual([]);
	});

	it("writes the log entry exactly as cf log does", async () => {
		const { cf } = await import("../check/helpers.ts");
		await pull();
		const viaPull = await read("Aldermoor/log.md");
		// The same entry through the command: already logged, so the file is unchanged.
		const again = await cf(["log", "--world", "Aldermoor", "--op", "pull", "--title", "Pulled PCs from D&D Beyond", "--page", "Vale", "--page", "Wren", "--date", "2026-09-28", "--vault", vault, "--root", dir], dir);
		expect(again.stdout).toContain("already logged");
		expect(await read("Aldermoor/log.md")).toBe(viaPull);
	});

	it("is idempotent: a second pull with the same payload changes nothing and logs nothing", async () => {
		await pull();
		const snapshot = await Promise.all(["Wren", "Vale", "Hollow", "Tam"].map((n) => read(`${pcDir}/${n}.md`)));
		const log = await read("Aldermoor/log.md");

		const again = await pull();
		expect(again.outcomes.filter((o) => o.pc === "Wren" || o.pc === "Vale").map((o) => o.status)).toEqual(["unchanged", "unchanged"]);
		expect(await Promise.all(["Wren", "Vale", "Hollow", "Tam"].map((n) => read(`${pcDir}/${n}.md`)))).toEqual(snapshot);
		expect(await read("Aldermoor/log.md")).toBe(log);
		expect(again.logged).toEqual([]);
	});

	it("previews with --dry-run: a per-PC summary, no writes, no log, no gate", async () => {
		const before = await Promise.all(["Wren", "Vale"].map((n) => read(`${pcDir}/${n}.md`)));
		const result = await pull({ dryRun: true });
		const wren = result.outcomes.find((o) => o.pc === "Wren");
		expect(wren).toMatchObject({ status: "would-update", sections: ["Sheet", "Spells", "Inventory"], summarySet: true });
		expect(wren?.added).toBeGreaterThan(20);
		expect(await Promise.all(["Wren", "Vale"].map((n) => read(`${pcDir}/${n}.md`)))).toEqual(before);
		expect(await read("Aldermoor/log.md")).not.toContain("pull");
		expect(result.gate).toBeUndefined();
	});

	it("pulls only the PCs asked for", async () => {
		const result = await pull({ pcs: ["vale"] });
		expect(result.outcomes.map((o) => o.pc)).toEqual(["Vale"]);
		expect(result.calls).toEqual(["https://character-service.dndbeyond.com/character/v5/character/1000002"]);
		expect(await read(`${pcDir}/Wren.md`)).toContain("**Class, species and level.** Text.");
	});

	it("rejects an unknown PC or Campaign with what is available", async () => {
		await expect(pull({ pcs: ["Nobody"] })).rejects.toThrow(UsageError);
		await expect(pull({ pcs: ["Nobody"] })).rejects.toMatchObject({ hint: expect.stringMatching(/Wren/) });
		await expect(pull({ campaign: "Nowhere" })).rejects.toMatchObject({ hint: expect.stringMatching(/Ashes of the Crown/) });
	});

	it("fails a PC named with --pc that has no D&D Beyond link, and says how to add it", async () => {
		const result = await pull({ pcs: ["Tam"] });
		expect(result.outcomes[0]).toMatchObject({ pc: "Tam", status: "failed" });
		expect(result.outcomes[0]?.message).toMatch(/dndbeyond_url/);
	});

	it("keeps going and reports the gate's findings when a pulled page is left failing the gate", async () => {
		const path = join(vault, pcDir, "Wren.md");
		await writeFile(path, (await readFile(path, "utf8")).replace("## Plans", "## Notes"));
		const result = await pull();
		expect(result.gate?.findings.length).toBeGreaterThan(0);
		expect(result.gate?.findings.every((f) => f.path.endsWith("Wren.md"))).toBe(true);
	});
});
