import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { cf, repoRoot } from "./check/helpers.ts";

describe("cfcli npm script", () => {
	// One smoke test keeps the real channel covered: `bun run cfcli --` is how every agent invokes the tool,
	// and the npm-script indirection it depends on has no in-process equivalent.
	it("identifies itself as Campaign Foundry and documents the supported invocation", () => {
		const help = spawnSync("bun", ["run", "cfcli", "--", "--help"], { cwd: repoRoot, encoding: "utf8" });
		expect(help.status).toBe(0);
		expect(help.stdout).toContain("Campaign Foundry");
		expect(help.stdout).toContain("bun run cfcli --");
		expect(help.stdout).not.toMatch(/^\s+cfcli (check|log|index)\b/m);
	});

	it("runs the check subcommand through the `--` separator", async () => {
		const help = await cf(["check", "--help"]);
		expect(help.code).toBe(0);
		expect(help.stdout).toContain("Usage: cfcli check");
		expect(help.stdout).toContain("--fix");
	});
});

const contextVault = ["--vault", "test/fixtures/vault", "--root", "test/fixtures"];

describe("cfcli context", () => {
	it("lists a named page and an alias once each, sorted by type then name", async () => {
		const result = await cf(
			["context", "-", ...contextVault],
			repoRoot,
			"Ilse Corran met the Ledger Clerk. Ilse Corran paid. Hobb Tarrow watched. Saltwick slept.\n",
		);
		expect(result.code).toBe(0);
		expect(result.stdout.split("\n").filter((line) => line !== "")).toEqual([
			"salt-and-lantern/Locations/Saltwick.md\tLocation\tSaltwick",
			"salt-and-lantern/NPCs/Hobb Tarrow.md\tNPC\tHobb Tarrow",
			"salt-and-lantern/NPCs/Ilse Corran.md\tNPC\tIlse Corran",
		]);
	});

	it("does not list lowercase words, which are not exact names", async () => {
		const result = await cf(["context", "-", ...contextVault], repoRoot, "the saltwick clerk owes nothing.\n");
		expect(result.code).toBe(0);
		expect(result.stdout).toBe("");
	});

	it("prints nothing for empty input", async () => {
		const result = await cf(["context", "-", ...contextVault], repoRoot, "");
		expect(result.code).toBe(0);
		expect(result.stdout).toBe("");
	});

	it("prints [{path,type,name}] with --json", async () => {
		const result = await cf(["context", "-", "--json", ...contextVault], repoRoot, "Ilse Corran.\n");
		expect(result.code).toBe(0);
		expect(JSON.parse(result.stdout)).toEqual([
			{ path: "salt-and-lantern/NPCs/Ilse Corran.md", type: "NPC", name: "Ilse Corran" },
		]);
	});

	it("exits 2 on an unreadable file", async () => {
		const result = await cf(["context", "no-such-notes.md"]);
		expect(result.code).toBe(2);
		expect(result.stderr).toContain("No such file");
	});
});
