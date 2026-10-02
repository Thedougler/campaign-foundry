import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cf, copyFixture, type JsonReport, realTemplates, vaultFlags } from "./helpers.ts";

const LINT_LAYERS = ["template", "placement", "links", "index"];

interface LintReport extends JsonReport {
	layers: string[];
}

async function lint(dir: string, extra: string[] = []): Promise<{ code: number; stdout: string; stderr: string; report: LintReport }> {
	const result = await cf(["lint", "--json", ...vaultFlags(dir), "--templates", realTemplates, ...extra], dir);
	return { ...result, report: JSON.parse(result.stdout) as LintReport };
}

describe("cf lint", () => {
	it("is listed in the top-level help and documents itself with examples", async () => {
		expect((await cf(["--help"])).stdout).toMatch(/^\s+lint\b/m);
		const { code, stdout } = await cf(["lint", "--help"]);
		expect(code).toBe(0);
		for (const option of ["--world", "--fix", "--dry-run", "--json", "--vault", "--root", "--templates"]) expect(stdout).toContain(option);
		expect(stdout).toContain("Examples:");
		expect(stdout).toMatch(/^ {2}cf lint --world \S+$/m);
		expect(stdout).toMatch(/^ {2}cf lint --world \S+ --fix$/m);
		expect(stdout).toContain("Exit codes:");
		expect(stdout).not.toContain("--layer");
	});

	it("runs only template, placement, links and index", async () => {
		const dir = await copyFixture("clean");
		const { code, report } = await lint(dir);
		expect(code).toBe(0);
		expect(report.ok).toBe(true);
		expect(report.layers).toEqual(LINT_LAYERS);
		expect(report.layers).not.toContain("style");
		expect(report.layers).not.toContain("spelling");
		expect(report.layers).not.toContain("orphans");
	});

	it("--fix on a clean vault is idempotent", async () => {
		const dir = await copyFixture("clean");
		const first = await cf(["lint", "--fix", ...vaultFlags(dir), "--templates", realTemplates], dir);
		expect(first.code).toBe(0);
		expect(first.stdout).not.toContain("fixed  ");
		const second = await lint(dir, ["--fix"]);
		expect(second.code).toBe(0);
		expect(second.report.fixes).toEqual([]);
		expect(second.report.findings).toEqual([]);
	});

	it("--fix does not change what a sentence asserts", async () => {
		const dir = await copyFixture("clean");
		const page = join(dir, "wiki/Aldermoor/NPCs/Mara Voss.md");
		const before = await readFile(page, "utf8");
		await writeFile(page, `${before.trimEnd()}\n\nThe barge-tax is three coppers.\n`);
		const { code } = await cf(["lint", "--fix", ...vaultFlags(dir), "--templates", realTemplates], dir);
		expect(code).toBe(0);
		expect(await readFile(page, "utf8")).toContain("The barge-tax is three coppers.");
	});

	it("--world limits findings to that World", async () => {
		const dir = await copyFixture("placement");
		const { code, report } = await lint(dir, ["--world", "Aldermoor"]);
		expect(code).toBe(1);
		expect(report.findings.some((f) => f.path.includes("Ironvale"))).toBe(false);
		expect(report.findings.some((f) => f.path.includes("Aldermoor"))).toBe(true);
	});

	it("rejects an unknown World, listing the Worlds", async () => {
		const dir = await copyFixture("clean");
		const { code, stderr } = await cf(["lint", ...vaultFlags(dir), "--world", "Nowhere"], dir);
		expect(code).toBe(2);
		expect(stderr).toContain("Aldermoor");
		expect(stderr).toContain("cf lint --world");
	});

	it("--dry-run only applies with --fix", async () => {
		const dir = await copyFixture("clean");
		const { code, stderr } = await cf(["lint", ...vaultFlags(dir), "--dry-run"], dir);
		expect(code).toBe(2);
		expect(stderr).toContain("cf lint --fix --dry-run");
	});
});
