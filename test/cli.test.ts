import { mkdtempSync, realpathSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { afterAll, describe, expect, it } from "vitest";
import { cf, repoRoot } from "./check/helpers.ts";

describe("cf npm script", () => {
	// One smoke test keeps the real channel covered: `bun run cf --` is how every agent invokes the tool,
	// and the npm-script indirection it depends on has no in-process equivalent.
	it("identifies itself as Campaign Foundry and documents the supported invocation", () => {
		const help = spawnSync("bun", ["run", "cf", "--", "--help"], { cwd: repoRoot, encoding: "utf8" });
		expect(help.status).toBe(0);
		expect(help.stdout).toContain("Campaign Foundry");
		expect(help.stdout).toContain("bun run cf --");
		expect(help.stdout).not.toMatch(/^\s+cf (check|log|index)\b/m);
	});

	it("runs the check subcommand through the `--` separator", async () => {
		const help = await cf(["check", "--help"]);
		expect(help.code).toBe(0);
		expect(help.stdout).toContain("Usage: cf check");
		expect(help.stdout).toContain("--fix");
	});
});

const contextVault = ["--vault", "test/fixtures/vault", "--root", "test/fixtures"];
// A small vault keeps the Vale run quick; the whole Wiki would only slow the tests down.
const styleVault = ["--vault", "test/check/fixtures/clean/wiki", "--root", "test/check/fixtures/clean"];
const dashCallout = "> [!narration] Opening\n> The door swings open — slowly.\n";

describe("cf context", () => {
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
		expect(JSON.parse(result.stdout)).toEqual([{ path: "salt-and-lantern/NPCs/Ilse Corran.md", type: "NPC", name: "Ilse Corran" }]);
	});

	it("exits 2 on an unreadable file", async () => {
		const result = await cf(["context", "no-such-notes.md"]);
		expect(result.code).toBe(2);
		expect(result.stderr).toContain("No such file");
	});
});

describe("cf style", () => {
	afterAll(() => rm(".scratch/style-dir", { recursive: true, force: true }));

	it("reports Narration.NoEmDash on stdin and exits 1", async () => {
		const result = await cf(["style", "-", ...styleVault], repoRoot, dashCallout);
		expect(result.code).toBe(1);
		expect(result.stdout).toContain("stdin.md:2");
		expect(result.stdout).toContain("Narration.NoEmDash");
	});

	it("exits 0 on clean text, counting only the file it checked", async () => {
		const result = await cf(["style", "-", ...styleVault], repoRoot, "> [!narration] Opening\n> The door swings open, slowly.\n");
		expect(result.code).toBe(0);
		expect(result.stdout).toContain("ok: 0 findings, 1 page,");
	});

	it("expands a folder and reports the real path", async () => {
		await mkdir(".scratch/style-dir", { recursive: true });
		await writeFile(".scratch/style-dir/note.md", dashCallout);
		const result = await cf(["style", ".scratch/style-dir", ...styleVault]);
		expect(result.code).toBe(1);
		expect(result.stdout).toContain(".scratch/style-dir/note.md:2");
		expect(result.stdout).toContain("Narration.NoEmDash");
	});

	it("skips a skill folder's eval history: climb logs and snapshots quote the prose they judged", async () => {
		await mkdir(".scratch/style-dir/skill/evals/snapshot", { recursive: true });
		await writeFile(".scratch/style-dir/skill/evals/climb.md", dashCallout);
		await writeFile(".scratch/style-dir/skill/evals/snapshot/SKILL.md", dashCallout);
		await writeFile(".scratch/style-dir/skill/SKILL.md", dashCallout);
		const result = await cf(["style", ".scratch/style-dir/skill", ...styleVault]);
		expect(result.stdout).toContain(".scratch/style-dir/skill/SKILL.md:2");
		expect(result.stdout).not.toContain("climb.md");
		expect(result.stdout).not.toContain("snapshot/");
	});

	it("checks a draft outside the repo and reports its absolute path", async () => {
		const drafts = realpathSync(mkdtempSync(join(tmpdir(), "style-drafts-")));
		const page = join(drafts, "The Shattered Sea", "NPCs", "Cobb.md");
		await mkdir(join(drafts, "The Shattered Sea", "NPCs"), { recursive: true });
		await writeFile(page, dashCallout);
		const result = await cf(["style", page, ...styleVault]);
		await rm(drafts, { recursive: true, force: true });
		expect(result.code).toBe(1);
		expect(result.stdout).toContain(`${page}:2`);
		expect(result.stdout).toContain("Narration.NoEmDash");
	});

	it("exits 2 on a missing path", async () => {
		const result = await cf(["style", "no-such-folder"]);
		expect(result.code).toBe(2);
		expect(result.stderr).toContain("No such path");
	});
});
