import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { captureIO } from "../../src/cli.ts";
import { main as evalCheckCli, createOutcome, runChecks, runStatblock } from "../../evals/check.ts";
import { loadCases } from "../../evals/cases.ts";

const vault = resolve("test/fixtures/vault");
const cases = resolve("test/evals/cases.yaml");
const page = "salt-and-lantern/NPCs/Ilse Corran.md";
const writtenFixture = Object.fromEntries(
	[page, "salt-and-lantern/Creatures/Bandit Captain.md"].map((path) => [path, readFileSync(join(vault, path), "utf8")]),
);
const roots: string[] = [];
afterEach(() => {
	for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});
function output(pages: Record<string, string> = {}, deleted: string[] = [], reply = true) {
	const root = realpathSync(mkdtempSync(join(tmpdir(), "eval-check-")));
	roots.push(root);
	for (const [path, content] of Object.entries(pages)) {
		mkdirSync(dirname(join(root, path)), { recursive: true });
		writeFileSync(join(root, path), content);
	}
	if (reply) writeFileSync(join(root, "reply.md"), "The DM reply.");
	if (deleted.length) writeFileSync(join(root, ".deleted.json"), JSON.stringify(deleted));
	return root;
}
function evalCheck(caseId: string, root: string, extra: string[] = []) {
	return captureIO(() => evalCheckCli(["sample", caseId, vault, "--cases", cases, "--output", root, ...extra]));
}

describe("eval:check Outcome", () => {
	it("reads omitted live pages for content checks but passes pages only for pages the run wrote", () => {
		const item = loadCases(cases).find((item) => item.id === "fixture-holds")!;
		const live = runChecks(item.checks!, createOutcome(vault, output()));
		expect(live.filter((result) => result.kind === "pages").map((result) => result.ok)).toEqual([false, false]);
		expect(live.filter((result) => result.kind !== "pages").every((result) => result.ok)).toBe(true);
		const written = runChecks(item.checks!, createOutcome(vault, output(writtenFixture)));
		expect(written.every((result) => result.ok)).toBe(true);
		expect(written.some((result) => result.kind === "statblock")).toBe(false);
	});
	it("checks output replacements without changing live bytes", () => {
		const original = readFileSync(join(vault, page), "utf8");
		const text = original.replace("## Play", "## Notes").replaceAll("Ilse Marrow", "Ilse Vane");
		const results = runChecks(
			{ sections: { [page]: ["## Play"] }, canon: { [page]: ["Ilse Marrow"] } },
			createOutcome(vault, output({ [page]: text })),
		);
		expect(results.map((result) => result.ok)).toEqual([false, false]);
		expect(readFileSync(join(vault, page), "utf8")).toBe(original);
	});
	it("overlays new and deleted pages across every check kind", () => {
		const outcome = createOutcome(vault, output({ "World/New.md": "## Play\nCanon fact." }, [page]));
		const results = runChecks(
			{
				pages: ["World/New", page],
				sections: { "World/New": ["## Play"] },
				canon: { "World/New": ["Canon"] },
				absent: { "World/New": ["forbidden"] },
			},
			outcome,
		);
		expect(results.map((result) => result.ok)).toEqual([true, false, true, true, true]);
		expect(outcome.readPage(page)).toBeUndefined();
	});

	it("matches pattern page keys against the pages the run wrote", () => {
		const outcome = createOutcome(
			vault,
			output({ "Items/cloud-staff.md": "## Play\ntype: Item", "World/Items/other.md": "## Play\nShattered Sea" }),
		);
		const results = runChecks(
			{
				pages: ["Items/*.md", "Spells/*"],
				sections: { "Items/*.md": ["## Play"], "Spells/*.md": ["## Play"] },
				canon: { "Items/*": ["type: Item"] },
				absent: { "**/Items/*.md": ["Shattered Sea"], "salt-and-lantern/**": ["[\\s\\S]"] },
			},
			outcome,
		);
		expect(results.map((result) => [result.kind, result.ok, result.detail])).toEqual([
			["pages", true, "Items/*.md matched by Items/cloud-staff.md"],
			["pages", false, "Spells/* matches no page the run wrote"],
			["sections", true, "Items/cloud-staff.md: ## Play found"],
			["sections", false, "Spells/*.md: no page the run wrote matches (## Play)"],
			["canon", true, "Items/cloud-staff.md: type: Item still holds"],
			["absent", false, "World/Items/other.md: Shattered Sea matches but must not"],
			["absent", true, "salt-and-lantern/**: no page the run wrote matches ([\\s\\S])"],
		]);
	});

	it("reports CLI pass/fail and malformed outputs as execution errors", async () => {
		const passed = await evalCheck("fixture-holds", output(writtenFixture));
		expect(passed.code).toBe(0);
		expect(passed.stdout).toContain("PASS  pages");
		expect((await evalCheck("fixture-holds", output())).stdout).toContain("FAIL  pages");
		const failed = await evalCheck("every-check-fails", output());
		expect(failed.code).toBe(1);
		expect(failed.stdout).toContain("FAIL  absent");
		const malformed = await evalCheck("fixture-holds", output({}, ["../outside.md"]));
		expect(malformed.code).toBe(2);
		expect(malformed.stderr).toContain("unsafe Wiki-relative");
		expect((await evalCheck("fixture-holds", output({}, [], false))).stderr).toContain("missing reply.md");
		expect((await evalCheck("bad-regex", output())).code).toBe(2);
		expect((await evalCheck("nope", output())).stderr).toContain('no case "nope"');
		expect((await evalCheck("fixture-holds", output(), ["--reply", "obsolete.md"])).code).toBe(2);
	});
});

describe("eval:check statblock", () => {
	const flagged = "> [!narration] First look\n> Her eyes widen as the ledger opens.\n\n## Play\nIlse takes the ledger.";
	const telling = "Her hold on the docks is not just power, it is a rich tapestry of debts.";

	it("reports the statblock layer read-only over output pages only", async () => {
		const original = readFileSync(join(vault, page), "utf8");
		expect(await runStatblock(vault, output())).toEqual([]);
		expect(await runStatblock(vault, output({ [page]: flagged }))).toEqual([]);
		expect(await runStatblock(vault, output({ [page]: telling }))).toEqual([]);
		expect(readFileSync(join(vault, page), "utf8")).toBe(original);
	});

	it("excludes prose lint: a Narration.StockTells hit produces no finding and exits 0", async () => {
		const probe = "salt-and-lantern/NPCs/Gate Probe.md";
		const warned = await evalCheck("gate-probe", output({ [probe]: flagged }));
		expect(warned.code).toBe(0);
		expect(warned.stdout).not.toContain("Narration.StockTells");
		expect(warned.stdout).toContain("ok: 0 passed, 0 failed, 0 skipped, 0 statblock warnings");
	});

	it("fails statblock arithmetic errors on output Creature pages through the CLI", async () => {
		const creature = "salt-and-lantern/Creatures/Bandit Captain.md";
		const clean = await evalCheck("gate-probe", output({ [creature]: writtenFixture[creature] as string }));
		expect(clean.code).toBe(0);
		const wrongHp = (writtenFixture[creature] as string).replace("hp: 52", "hp: 60");
		const failed = await evalCheck("gate-probe", output({ [creature]: wrongHp }));
		expect(failed.code).toBe(1);
		expect(failed.stdout).toContain("FAIL  statblock  hp-average");
	});
});

describe("eval:check case fields", () => {
	it("loads subject: smart and rejects any other subject value", () => {
		const dir = realpathSync(mkdtempSync(join(tmpdir(), "eval-cases-")));
		roots.push(dir);
		const smart = join(dir, "smart.yaml");
		writeFileSync(smart, "- id: s\n  prompt: P\n  subject: smart\n");
		expect(loadCases(smart)).toEqual([{ id: "s", prompt: "P", subject: "smart" }]);
		const big = join(dir, "big.yaml");
		writeFileSync(big, "- id: b\n  prompt: P\n  subject: big\n");
		expect(() => loadCases(big)).toThrow('"subject" must be "smart" when set');
	});

	it("loads fixtures under a skill's evals/fixtures/ and rejects any other path", () => {
		const dir = realpathSync(mkdtempSync(join(tmpdir(), "eval-cases-")));
		roots.push(dir);
		const fixture = ".agents/skills/item-design/evals/fixtures/note.md";
		const good = join(dir, "good.yaml");
		writeFileSync(good, `- id: f\n  prompt: P\n  fixtures:\n    - ${fixture}\n`);
		expect(loadCases(good)).toEqual([{ id: "f", prompt: "P", fixtures: [fixture] }]);
		const bad = join(dir, "bad.yaml");
		writeFileSync(bad, "- id: f\n  prompt: P\n  fixtures:\n    - .cache/inspired-by/note.md\n");
		expect(() => loadCases(bad)).toThrow("fixtures must sit under a skill's evals/fixtures/");
	});
});

it("prints output-directory help", async () => {
	const result = await captureIO(() => evalCheckCli(["--help"]));
	expect(result.code).toBe(0);
	expect(result.stdout).toContain("cases.yaml is a list of");
	expect(result.stdout).toContain("--output <dir>");
	expect(result.stdout).not.toContain("--reply");
});
