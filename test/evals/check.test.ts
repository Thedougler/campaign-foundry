import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "../..");
const fixtures = join(repoRoot, "test/fixtures");
const vault = join(fixtures, "vault");
const cases = join(here, "cases.yaml");
const gateExists = existsSync(join(repoRoot, "src/cli.ts"));

/** Runs `node evals/check.ts` exactly as an agent would. */
function evalCheck(caseId: string, vaultDir: string, extra: string[] = []) {
	const run = spawnSync(
		"node",
		[join(repoRoot, "evals/check.ts"), "sample", caseId, vaultDir, "--cases", cases, "--root", fixtures, ...extra],
		{ cwd: repoRoot, encoding: "utf8" },
	);
	return { code: run.status, out: run.stdout, err: run.stderr };
}

describe("evals/check.ts", () => {
	it("passes a case whose fixture facts still hold, and says what it checked", () => {
		const { code, out } = evalCheck("fixture-holds", vault);
		expect(out).toMatch(/^PASS {2}pages {2}Lowtide\/NPCs\/Ilse Corran\.md exists$/m);
		expect(out).toMatch(/^PASS {2}sections {2}Lowtide\/NPCs\/Ilse Corran\.md: ## Play found$/m);
		expect(out).toMatch(/^PASS {2}canon {2}Lowtide\/Creatures\/Bandit Captain\.md: \/\^hp: 52\$\/m still holds$/m);
		expect(out).toMatch(/^PASS {2}absent {2}Lowtide\/Lowtide\.md: Emberfen is absent$/m);
		expect(out).not.toMatch(/^FAIL/m);
		expect(code).toBe(0);
	});

	it("runs the gate on the fixture, or says plainly that it skipped it", () => {
		const { out } = evalCheck("fixture-holds", vault);
		if (gateExists) expect(out).toMatch(/^PASS {2}gate {2}0 findings across \d+ pages$/m);
		else expect(out).toMatch(/^SKIP {2}gate {2}src\/cli\.ts not found/m);
	});

	it("fails every kind of check that does not hold and exits 1", () => {
		const { code, out } = evalCheck("every-check-fails", vault);
		expect(out).toMatch(/^FAIL {2}pages {2}Lowtide\/NPCs\/Nobody\.md is missing$/m);
		expect(out).toMatch(/^FAIL {2}sections {2}Lowtide\/NPCs\/Ilse Corran\.md: ### Play not found$/m);
		expect(out).toMatch(/^FAIL {2}sections {2}Lowtide\/NPCs\/Ilse Corran\.md: Epilogue not found$/m);
		expect(out).toMatch(/^FAIL {2}canon {2}Lowtide\/NPCs\/Ilse Corran\.md: Ilse Marrow was born in Vessen no longer matches$/m);
		expect(out).toMatch(/^FAIL {2}absent {2}Lowtide\/NPCs\/Ilse Corran\.md: Bandit Captain matches but must not$/m);
		expect(out).toMatch(/^failed: /m);
		expect(code).toBe(1);
	});

	it("catches a page a run edited: a lost section and a changed fact", () => {
		const scratch = mkdtempSync(join(tmpdir(), "eval-check-"));
		const copy = join(scratch, "wiki");
		cpSync(vault, copy, { recursive: true });
		const page = join(copy, "Lowtide/NPCs/Ilse Corran.md");
		writeFileSync(page, readFileSync(page, "utf8").replace("## Play", "## Notes").replace("Ilse Marrow", "Ilse Vane"));
		const { code, out } = evalCheck("fixture-holds", copy, ["--root", scratch]);
		expect(out).toMatch(/^FAIL {2}sections {2}Lowtide\/NPCs\/Ilse Corran\.md: ## Play not found$/m);
		expect(out).toMatch(/^FAIL {2}canon {2}Lowtide\/NPCs\/Ilse Corran\.md: Ilse Marrow no longer matches$/m);
		expect(code).toBe(1);
	});

	it.skipIf(!gateExists)("fails when the gate reports findings, naming the finding", () => {
		const scratch = mkdtempSync(join(tmpdir(), "eval-check-"));
		const copy = join(scratch, "wiki");
		cpSync(vault, copy, { recursive: true });
		cpSync(join(fixtures, "archive"), join(scratch, "archive"), { recursive: true });
		const page = join(copy, "Lowtide/NPCs/Sable.md");
		writeFileSync(page, readFileSync(page, "utf8").replace("## Depth", "## Backstory"));
		const { code, out } = evalCheck("fixture-holds", copy, ["--root", scratch]);
		expect(out).toMatch(/^FAIL {2}gate {2}.*Sable\.md:\d+ template\//m);
		expect(code).toBe(1);
	});

	it("exits 2 with usage for an unknown case, a missing vault and a regex that does not compile", () => {
		const unknown = evalCheck("nope", vault);
		expect(unknown.code).toBe(2);
		expect(unknown.err).toContain('no case "nope"');
		expect(unknown.err).toContain("fixture-holds, every-check-fails, bad-regex");
		const noVault = evalCheck("fixture-holds", join(tmpdir(), "no-such-vault-dir"));
		expect(noVault.code).toBe(2);
		expect(noVault.err).toContain("vault directory not found");
		const badRegex = evalCheck("bad-regex", vault);
		expect(badRegex.code).toBe(2);
		expect(badRegex.err).toContain("invalid regex (unclosed");
	});

	it("prints its usage with --help and exits 0", () => {
		const run = spawnSync("node", [join(repoRoot, "evals/check.ts"), "--help"], { cwd: repoRoot, encoding: "utf8" });
		expect(run.status).toBe(0);
		expect(run.stdout).toContain("cases.yaml is a list of");
	});
});
