import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { captureIO } from "../../src/cli.ts";
import { main as evalCheckCli, createOutcome, loadCases, runChecks, runGate } from "../../evals/check.ts";

const vault = resolve("test/fixtures/vault");
const cases = resolve("test/evals/cases.yaml");
const page = "salt-and-lantern/NPCs/Ilse Corran.md";
const writtenFixture = Object.fromEntries([page, "salt-and-lantern/Creatures/Bandit Captain.md"].map((path) => [path, readFileSync(join(vault, path), "utf8")]));
const roots: string[] = [];
afterEach(() => { for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true }); });
function output(pages: Record<string, string> = {}, deleted: string[] = [], reply = true) {
	const root = realpathSync(mkdtempSync(join(tmpdir(), "eval-check-"))); roots.push(root);
	for (const [path, content] of Object.entries(pages)) { mkdirSync(dirname(join(root, path)), { recursive: true }); writeFileSync(join(root, path), content); }
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
		expect(written.some((result) => result.kind === "gate")).toBe(false);
	});
	it("checks output replacements without changing live bytes", () => {
		const original = readFileSync(join(vault, page), "utf8");
		const text = original.replace("## Play", "## Notes").replaceAll("Ilse Marrow", "Ilse Vane");
		const results = runChecks({ sections: { [page]: ["## Play"] }, canon: { [page]: ["Ilse Marrow"] } }, createOutcome(vault, output({ [page]: text })));
		expect(results.map((result) => result.ok)).toEqual([false, false]);
		expect(readFileSync(join(vault, page), "utf8")).toBe(original);
	});
	it("overlays new and deleted pages across every check kind", () => {
		const outcome = createOutcome(vault, output({ "World/New.md": "## Play\nCanon fact." }, [page]));
		const results = runChecks({ pages: ["World/New", page], sections: { "World/New": ["## Play"] }, canon: { "World/New": ["Canon"] }, absent: { "World/New": ["forbidden"] } }, outcome);
		expect(results.map((result) => result.ok)).toEqual([true, false, true, true, true]);
		expect(outcome.readPage(page)).toBeUndefined();
	});
	it("reports CLI pass/fail and malformed outputs as execution errors", async () => {
		const passed = await evalCheck("fixture-holds", output(writtenFixture));
		expect(passed.code).toBe(0); expect(passed.stdout).toContain("PASS  pages");
		expect((await evalCheck("fixture-holds", output())).stdout).toContain("FAIL  pages");
		const failed = await evalCheck("every-check-fails", output());
		expect(failed.code).toBe(1); expect(failed.stdout).toContain("FAIL  absent");
		const malformed = await evalCheck("fixture-holds", output({}, ["../outside.md"]));
		expect(malformed.code).toBe(2); expect(malformed.stderr).toContain("unsafe Wiki-relative");
		expect((await evalCheck("fixture-holds", output({}, [], false))).stderr).toContain("missing reply.md");
		expect((await evalCheck("bad-regex", output())).code).toBe(2);
		expect((await evalCheck("nope", output())).stderr).toContain('no case "nope"');
		expect((await evalCheck("fixture-holds", output(), ["--reply", "obsolete.md"])).code).toBe(2);
	});
});

describe("eval:check gate", () => {
	const flagged = "> [!narration] First look\n> You see a rider approach along the towpath.\n\n## Play\nIlse takes the ledger.";
	const telling = "Her hold on the docks is not just power, it is a rich tapestry of debts.";

	it("reports the gate read-only over output pages only", async () => {
		const original = readFileSync(join(vault, page), "utf8");
		expect(await runGate(vault, output())).toEqual([]);
		const findings = await runGate(vault, output({ [page]: flagged }));
		const filter = findings.find((f) => f.rule === "Narration.FilterVerbs");
		expect(filter?.severity).toBe("warning");
		expect(filter?.path).toBe(page);
		expect(findings.some((f) => f.severity === "error")).toBe(false);
		const errors = await runGate(vault, output({ [page]: telling }));
		expect(errors.some((f) => f.severity === "error")).toBe(true);
		expect(readFileSync(join(vault, page), "utf8")).toBe(original);
	});

	it("returns no findings for an empty overlay even though live pages carry gate errors", async () => {
		// salt-and-lantern/Creatures/Goblin Warrior.md carries ai-tells.BareReaches (an error) on the live fixture;
		// the output-page filter keeps live-Wiki findings off the case, so this fails if the filter is removed.
		expect(await runGate(vault, output())).toEqual([]);
	});

	it("fails gate errors and passes gate warnings through the CLI", async () => {
		const probe = "salt-and-lantern/NPCs/Gate Probe.md";
		const error = await evalCheck("gate-probe", output({ [probe]: telling }));
		expect(error.code).toBe(1); expect(error.stdout).toContain("FAIL  gate");
		const warned = await evalCheck("gate-probe", output({ [probe]: flagged }));
		expect(warned.code).toBe(0);
		expect(warned.stdout).toContain("WARN  gate  Narration.FilterVerbs");
		expect(warned.stdout).toContain("1 gate warnings");
	});
});

it("prints output-directory help", async () => {
	const result = await captureIO(() => evalCheckCli(["--help"]));
	expect(result.code).toBe(0); expect(result.stdout).toContain("cases.yaml is a list of");
	expect(result.stdout).toContain("--output <dir>"); expect(result.stdout).not.toContain("--reply");
});
