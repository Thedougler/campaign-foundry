import { cp, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cf, realTemplates } from "../check/helpers.ts";

async function vaultCopy(): Promise<string> {
	const dir = await mkdtemp(join(tmpdir(), "cf-pull-cli-"));
	await cp(join(import.meta.dirname, "fixtures/vault"), dir, { recursive: true });
	return dir;
}

const flags = (dir: string): string[] => ["--vault", join(dir, "wiki"), "--root", dir, "--templates", realTemplates];

describe("cf pull", () => {
	it("lists pull in the top-level help and documents itself with examples", async () => {
		expect((await cf(["--help"])).stdout).toMatch(/^\s+pull\b/m);
		const help = await cf(["pull", "--help"]);
		expect(help.code).toBe(0);
		expect(help.stdout).toContain("--campaign <Campaign>");
		expect(help.stdout).toContain("--pc <PC name>");
		expect(help.stdout).toContain("--dry-run");
		expect(help.stdout).toContain("Examples:");
		expect(help.stdout).toContain('cf pull --pc "Tam Brightwater"');
		expect(help.stdout).toMatch(/public/);
	});

	it("exits 2 with a hint that lists the PCs when a --pc name is unknown", async () => {
		const dir = await vaultCopy();
		const result = await cf(["pull", "--pc", "Nobody", ...flags(dir)], dir);
		expect(result.code).toBe(2);
		expect(result.stderr).toContain('No PC named "Nobody"');
		expect(result.stderr).toContain("Wren");
	});

	it("exits 1 naming the PC and the fix when a PC has no dndbeyond_url, without touching the network", async () => {
		const dir = await vaultCopy();
		const result = await cf(["pull", "--pc", "Tam", "--json", ...flags(dir)], dir);
		expect(result.code).toBe(1);
		const report = JSON.parse(result.stdout) as { ok: boolean; pcs: { pc: string; status: string; message: string }[] };
		expect(report.ok).toBe(false);
		expect(report.pcs).toEqual([expect.objectContaining({ pc: "Tam", status: "failed", message: expect.stringContaining("dndbeyond_url") })]);
	});
});
