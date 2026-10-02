import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cf, checkFixture, copyFixture, type JsonReport, realTemplates, vaultFlags } from "./helpers.ts";

const HOT = "wiki/Aldermoor/Ashes of the Crown/hot.md";

/** The clean fixture's hot.md with `extra` words appended to its `## Next` section. */
async function withWords(extra: number, comment = ""): Promise<{ dir: string; report: JsonReport; code: number }> {
	const dir = await copyFixture("clean");
	const path = join(dir, HOT);
	await writeFile(path, `${await readFile(path, "utf8")}${comment}\n${Array.from({ length: extra }, (_, i) => `word${i}`).join(" ")}\n`);
	const result = await cf(["check", "--json", "--layer", "hot", ...vaultFlags(dir), "--templates", realTemplates], dir);
	return { dir, code: result.code, report: JSON.parse(result.stdout) as JsonReport };
}

describe("hot layer", () => {
	it("passes the clean fixture's short hot.md", async () => {
		const { code, report } = await checkFixture("clean", ["--layer", "hot"]);
		expect(code).toBe(0);
		expect(report.findings).toEqual([]);
	});

	it("passes a hot.md a little over 500 words but within the 550 cap", async () => {
		// The fixture body is about 40 words; 500 more stays under 550.
		const { code } = await withWords(500);
		expect(code).toBe(0);
	});

	it("fails a hot.md whose body exceeds 550 words, pointing at the line the cap is crossed, with a hint to cut back", async () => {
		const { code, report } = await withWords(600);
		expect(code).toBe(1);
		expect(report.findings).toHaveLength(1);
		const [finding] = report.findings;
		expect(finding).toMatchObject({ layer: "hot", rule: "too-long", path: HOT });
		expect(finding!.message).toMatch(/6\d\d words/);
		expect(finding!.message).toContain("550");
		expect(finding!.hint).toContain("orientation");
		expect(finding!.line).toBeGreaterThan(20);
	});

	it("does not count %% comments, frontmatter or markdown punctuation", async () => {
		const guidance = `\n%% ${Array.from({ length: 800 }, () => "guidance").join(" ")} %%\n`;
		const { code } = await withWords(0, guidance);
		expect(code).toBe(0);
	});
});
