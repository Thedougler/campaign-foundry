import { spawnSync } from "node:child_process";
import { mkdtempSync, realpathSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { repoRoot } from "./check/helpers.ts";

/** Runs `bun run cf -- <args>` — the supported invocation, through the npm script. */
function run(args: string[], stdin = ""): { status: number; stdout: string; stderr: string } {
	const result = spawnSync("bun", ["run", "cf", "--", ...args], { cwd: repoRoot, encoding: "utf8", input: stdin });
	return { status: result.status ?? 1, stdout: result.stdout, stderr: result.stderr };
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

const contextVault = ["--vault", "test/fixtures/vault", "--root", "test/fixtures"];
// A small vault keeps the Vale run quick; the whole Wiki would only slow the tests down.
const styleVault = ["--vault", "test/check/fixtures/clean/wiki", "--root", "test/check/fixtures/clean"];
const dashCallout = "> [!narration] Opening\n> The door swings open — slowly.\n";

describe("cf context", () => {
	it("lists a named page and an alias once each, sorted by type then name", () => {
		const result = run(
			["context", "-", ...contextVault],
			"Ilse Corran met the Ledger Clerk. Ilse Corran paid. Hobb Tarrow watched. Saltwick slept.\n",
		);
		expect(result.status).toBe(0);
		expect(result.stdout.split("\n").filter((line) => line !== "")).toEqual([
			"salt-and-lantern/Locations/Saltwick.md\tLocation\tSaltwick",
			"salt-and-lantern/NPCs/Hobb Tarrow.md\tNPC\tHobb Tarrow",
			"salt-and-lantern/NPCs/Ilse Corran.md\tNPC\tIlse Corran",
		]);
	});

	it("does not list lowercase words, which are not exact names", () => {
		const result = run(["context", "-", ...contextVault], "the saltwick clerk owes nothing.\n");
		expect(result.status).toBe(0);
		expect(result.stdout).toBe("");
	});

	it("prints nothing for empty input", () => {
		const result = run(["context", "-", ...contextVault], "");
		expect(result.status).toBe(0);
		expect(result.stdout).toBe("");
	});

	it("prints [{path,type,name}] with --json", () => {
		const result = run(["context", "-", "--json", ...contextVault], "Ilse Corran.\n");
		expect(result.status).toBe(0);
		expect(JSON.parse(result.stdout)).toEqual([{ path: "salt-and-lantern/NPCs/Ilse Corran.md", type: "NPC", name: "Ilse Corran" }]);
	});

	it("exits 2 on an unreadable file", () => {
		const result = run(["context", "no-such-notes.md"]);
		expect(result.status).toBe(2);
		expect(result.stderr).toContain("No such file");
	});
});

describe("cf style", () => {
	afterAll(() => rm(".scratch/style-dir", { recursive: true, force: true }));

	it("reports Narration.NoEmDash on stdin and exits 1", () => {
		const result = run(["style", "-", ...styleVault], dashCallout);
		expect(result.status).toBe(1);
		expect(result.stdout).toContain("stdin.md:2");
		expect(result.stdout).toContain("Narration.NoEmDash");
	});

	it("exits 0 on clean text", () => {
		const result = run(["style", "-", ...styleVault], "> [!narration] Opening\n> The door swings open, slowly.\n");
		expect(result.status).toBe(0);
		expect(result.stdout).toContain("ok: 0 findings");
	});

	it("expands a folder and reports the real path", async () => {
		await mkdir(".scratch/style-dir", { recursive: true });
		await writeFile(".scratch/style-dir/note.md", dashCallout);
		const result = run(["style", ".scratch/style-dir", ...styleVault]);
		expect(result.status).toBe(1);
		expect(result.stdout).toContain(".scratch/style-dir/note.md:2");
		expect(result.stdout).toContain("Narration.NoEmDash");
	});

	it("skips a skill folder's eval history: climb logs and snapshots quote the prose they judged", async () => {
		await mkdir(".scratch/style-dir/skill/evals/snapshot", { recursive: true });
		await writeFile(".scratch/style-dir/skill/evals/climb.md", dashCallout);
		await writeFile(".scratch/style-dir/skill/evals/snapshot/SKILL.md", dashCallout);
		await writeFile(".scratch/style-dir/skill/SKILL.md", dashCallout);
		const result = run(["style", ".scratch/style-dir/skill", ...styleVault]);
		expect(result.stdout).toContain(".scratch/style-dir/skill/SKILL.md:2");
		expect(result.stdout).not.toContain("climb.md");
		expect(result.stdout).not.toContain("snapshot/");
	});

	it("checks a draft outside the repo and reports its absolute path", async () => {
		const drafts = realpathSync(mkdtempSync(join(tmpdir(), "style-drafts-")));
		const page = join(drafts, "The Shattered Sea", "NPCs", "Cobb.md");
		await mkdir(join(drafts, "The Shattered Sea", "NPCs"), { recursive: true });
		await writeFile(page, dashCallout);
		const result = run(["style", page, ...styleVault]);
		await rm(drafts, { recursive: true, force: true });
		expect(result.status).toBe(1);
		expect(result.stdout).toContain(`${page}:2`);
		expect(result.stdout).toContain("Narration.NoEmDash");
	});

	it("exits 2 on a missing path", () => {
		const result = run(["style", "no-such-folder"]);
		expect(result.status).toBe(2);
		expect(result.stderr).toContain("No such path");
	});
});
