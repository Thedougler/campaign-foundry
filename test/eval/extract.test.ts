import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cf, repoRoot } from "../check/helpers.ts";

const vault = join(repoRoot, "test/narration/fixtures/wiki");
const root = join(repoRoot, "test/narration/fixtures");
const flags = ["--vault", vault, "--root", root];

describe("cf eval extract", () => {
	it("prints the callout body for a grader to read", async () => {
		const { code, stdout, stderr } = await cf(["eval", "extract", "Crossing", "--callout", "Clean", ...flags], repoRoot);
		expect(code).toBe(0);
		expect(stderr).toBe("");
		expect(stdout).toContain("# Clean");
		expect(stdout).toContain("Crossing.md:");
		expect(stdout.toLowerCase()).not.toContain("fail");
		expect(stdout.toLowerCase()).not.toContain("pass");
	});

	it("emits page, title, line and body as JSON", async () => {
		const { code, stdout } = await cf(["eval", "extract", "Crossing", "--callout", "Clean", "--json", ...flags], repoRoot);
		expect(code).toBe(0);
		const payload = JSON.parse(stdout) as { page: string; callouts: { title: string; line: number; body: string }[] };
		expect(payload.page).toContain("Crossing.md");
		expect(payload.callouts).toHaveLength(1);
		expect(payload.callouts[0]!.title).toBe("Clean");
		expect(payload.callouts[0]!.body.length).toBeGreaterThan(20);
	});

	it("fails fast with an example when the callout title is missing", async () => {
		const { code, stderr } = await cf(["eval", "extract", "Crossing", "--callout", "No Such Slot", ...flags], repoRoot);
		expect(code).toBe(2);
		expect(stderr).toContain("cf eval extract");
		expect(stderr).toContain("--callout");
	});
});
