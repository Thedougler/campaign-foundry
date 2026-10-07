import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { createOutcome, loadCases, runChecks, runGate } from "../../evals/check.ts";

const vault = resolve("test/fixtures/vault");
const cases = resolve("test/evals/cases.yaml");
const page = "Lowtide/NPCs/Ilse Corran.md";
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
	return spawnSync("bun", ["evals/check.ts", "sample", caseId, vault, "--cases", cases, "--output", root, ...extra], { encoding: "utf8" });
}

describe("eval:check Outcome", () => {
	it("reads omitted live pages and preserves existing deterministic checks", () => {
		const item = loadCases(cases).find((item) => item.id === "fixture-holds")!;
		const results = runChecks(item.checks!, createOutcome(vault, output()));
		expect(results.length).toBeGreaterThan(4); expect(results.every((result) => result.ok)).toBe(true);
		expect(results.some((result) => result.kind === "gate")).toBe(false);
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
	it("reports CLI pass/fail and malformed outputs as execution errors", () => {
		const passed = evalCheck("fixture-holds", output());
		expect(passed.status).toBe(0); expect(passed.stdout).toContain("PASS  pages");
		const failed = evalCheck("every-check-fails", output());
		expect(failed.status).toBe(1); expect(failed.stdout).toContain("FAIL  absent");
		const malformed = evalCheck("fixture-holds", output({}, ["../outside.md"]));
		expect(malformed.status).toBe(2); expect(malformed.stderr).toContain("unsafe Wiki-relative");
		expect(evalCheck("fixture-holds", output({}, [], false)).stderr).toContain("missing reply.md");
		expect(evalCheck("bad-regex", output()).status).toBe(2);
		expect(evalCheck("nope", output()).stderr).toContain('no case "nope"');
		expect(evalCheck("fixture-holds", output(), ["--reply", "obsolete.md"]).status).toBe(2);
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
		// Lowtide/Creatures/Goblin Warrior.md carries ai-tells.BareReaches (an error) on the live fixture;
		// the output-page filter keeps live-Wiki findings off the case, so this fails if the filter is removed.
		expect(await runGate(vault, output())).toEqual([]);
	});

	it("fails gate errors and passes gate warnings through the CLI", async () => {
		const probe = "Lowtide/NPCs/Gate Probe.md";
		const error = evalCheck("fixture-holds", output({ [probe]: telling }));
		expect(error.status).toBe(1); expect(error.stdout).toContain("FAIL  gate");
		const warned = evalCheck("fixture-holds", output({ [probe]: flagged }));
		expect(warned.status).toBe(0);
		expect(warned.stdout).toContain("WARN  gate  Narration.FilterVerbs");
		expect(warned.stdout).toContain("1 gate warnings");
	});
});

it("prints output-directory help", () => {
	const result = spawnSync("bun", ["evals/check.ts", "--help"], { encoding: "utf8" });
	expect(result.status).toBe(0); expect(result.stdout).toContain("cases.yaml is a list of");
	expect(result.stdout).toContain("--output <dir>"); expect(result.stdout).not.toContain("--reply");
});
