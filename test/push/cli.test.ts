import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cf } from "../check/helpers.ts";
import { CAMPAIGN, workspace } from "./helpers.ts";

const flags = (root: string): string[] => ["--campaign", CAMPAIGN, "--session", "2", "--vault", join(root, "wiki"), "--root", root];

describe("cf push", () => {
	it("is listed in the top-level help and documents itself with examples", async () => {
		expect((await cf(["--help"])).stdout).toMatch(/^\s+push\b/m);
		const help = await cf(["push", "--help"]);
		expect(help.code).toBe(0);
		for (const flag of ["--campaign <Campaign>", "--session <N>", "--out <dir>", "--install <modules-dir>", "--dry-run", "--json", "--vault <dir>", "--root <dir>", "--all"]) {
			expect(help.stdout).toContain(flag);
		}
		expect(help.stdout).toContain("Examples:");
		expect(help.stdout).toContain('cf push --campaign "Salt and Lantern" --session 2 --dry-run');
	});

	it("exits 2 with an example when the Campaign or Session is missing or wrong", async () => {
		const ws = await workspace();
		const noCampaign = await cf(["push", "--session", "2", "--vault", ws.vaultDir, "--root", ws.root], ws.root);
		expect(noCampaign.code).toBe(2);
		expect(noCampaign.stderr).toContain("No Campaign given");
		expect(noCampaign.stderr).toContain('cf push --campaign "<Campaign>" --session <N>');
		const badSession = await cf(["push", "--campaign", CAMPAIGN, "--session", "two", "--vault", ws.vaultDir, "--root", ws.root], ws.root);
		expect(badSession.code).toBe(2);
		expect(badSession.stderr).toContain('"two" is not a Session number');
		const unknown = await cf(["push", "--campaign", "Nope", "--session", "2", "--vault", ws.vaultDir, "--root", ws.root], ws.root);
		expect(unknown.code).toBe(2);
		expect(unknown.stderr).toContain(`Campaigns: ${CAMPAIGN}`);
	});

	it("builds the module and reports counts, warnings, the module path and the next steps", async () => {
		const ws = await workspace();
		const result = await cf(["push", ...flags(ws.root)], ws.root);
		expect(result.code).toBe(0);
		expect(result.stdout).toContain("pushed: Session 2 of Salt and Lantern (folder salt-and-lantern)");
		expect(result.stdout).toMatch(/foundry scenes\s+1 added, 0 updated, 0 unchanged/);
		expect(result.stdout).toContain("warnings:");
		expect(result.stdout).toContain("module: build/push/cf-salt-and-lantern (version 0.1.0)");
		expect(result.stdout).toContain("next:");
		expect(result.stdout).toContain("Import");
		expect(existsSync(join(ws.root, "build/push/cf-salt-and-lantern/module.json"))).toBe(true);
	});

	it("says up to date on a second Push and packs nothing", async () => {
		const ws = await workspace();
		await cf(["push", ...flags(ws.root)], ws.root);
		const again = await cf(["push", ...flags(ws.root), "--json"], ws.root);
		expect(again.code).toBe(0);
		const report = JSON.parse(again.stdout) as { ok: boolean; upToDate: boolean; changed: unknown[]; module: { path: string | null }; next: string[] };
		expect(report).toMatchObject({ ok: true, upToDate: true, changed: [], module: { path: null }, next: [] });
		const text = await cf(["push", ...flags(ws.root)], ws.root);
		expect(text.stdout).toContain("up to date");
	});

	it("prints JSON for an agent, with the changed documents by ID", async () => {
		const ws = await workspace();
		const result = await cf(["push", ...flags(ws.root), "--dry-run", "--json"], ws.root);
		const report = JSON.parse(result.stdout) as { dryRun: boolean; changed: { type: string; id: string; name: string; change: string }[]; counts: Record<string, Record<string, number>>; warnings: string[] };
		expect(report.dryRun).toBe(true);
		expect(report.changed.find((c) => c.name === "Sable" && c.type === "Actor")?.id).toMatch(/^[A-Za-z0-9]{16}$/);
		expect(report.counts.Scene).toEqual({ added: 1, updated: 0, unchanged: 0 });
		expect(report.warnings.length).toBeGreaterThan(0);
		expect(existsSync(join(ws.root, "build"))).toBe(false);
	});
});
