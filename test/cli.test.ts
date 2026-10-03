import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { repoRoot } from "./check/helpers.ts";

/** Runs `bun run cf -- <args>` — the supported invocation, through the npm script. */
function run(args: string[]): { status: number; stdout: string } {
	const result = spawnSync("bun", ["run", "cf", "--", ...args], { cwd: repoRoot, encoding: "utf8" });
	return { status: result.status ?? 1, stdout: result.stdout };
}

describe("cf npm script", () => {
	it("identifies itself as Campaign Foundry and documents the supported invocation", () => {
		const help = run(["--help"]);
		expect(help.status).toBe(0);
		expect(help.stdout).toContain("Campaign Foundry");
		expect(help.stdout).toContain("bun run cf --");
		expect(help.stdout).not.toMatch(/^\s+cf (check|log|index)\b/m);
	});

	it("runs the check subcommand through the `--` separator", () => {
		const help = run(["check", "--help"]);
		expect(help.status).toBe(0);
		expect(help.stdout).toContain("Usage: cf check");
		expect(help.stdout).toContain("--fix");
	});
});
