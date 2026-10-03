import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cf, copyFixture, type JsonReport, realTemplates, vaultFlags } from "./helpers.ts";

const mechanicalLayers = ["template", "placement", "links", "index"].flatMap((layer) => ["--layer", layer]);

async function check(dir: string, extra: string[] = []): Promise<{ code: number; stdout: string; stderr: string; report: JsonReport }> {
	const result = await cf(["check", "--json", ...vaultFlags(dir), "--templates", realTemplates, ...mechanicalLayers, ...extra], dir);
	return { ...result, report: JSON.parse(result.stdout) as JsonReport };
}

describe("cf check: mechanical repair", () => {
	it("does not expose the removed commands", async () => {
		const { stdout } = await cf(["--help"]);
		for (const command of ["lint", "narration"]) {
			expect(stdout).not.toMatch(new RegExp(`^\\s+${command}\\b`, "m"));
			const { code, stderr } = await cf([command]);
			expect(code).toBe(2);
			expect(stderr).toContain(`unknown command '${command}'`);
		}
	});

	it("--fix on a clean vault is idempotent", async () => {
		const dir = await copyFixture("clean");
		const first = await check(dir, ["--fix"]);
		expect(first.code).toBe(0);
		expect(first.report.fixes).toEqual([]);
		const second = await check(dir, ["--fix"]);
		expect(second.code).toBe(0);
		expect(second.report.fixes).toEqual([]);
		expect(second.report.findings).toEqual([]);
	});

	it("--fix does not change what a sentence asserts", async () => {
		const dir = await copyFixture("clean");
		const page = join(dir, "wiki/Aldermoor/NPCs/Mara Voss.md");
		const before = await readFile(page, "utf8");
		await writeFile(page, `${before.trimEnd()}\n\nThe barge-tax is three coppers.\n`);
		const { code } = await check(dir, ["--fix"]);
		expect(code).toBe(0);
		expect(await readFile(page, "utf8")).toContain("The barge-tax is three coppers.");
	});
});
