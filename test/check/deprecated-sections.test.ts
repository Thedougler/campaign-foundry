import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cf, type JsonReport, realTemplates } from "./helpers.ts";

const headings: Record<string, string> = {
	Depth: "Depth",
	"In use": "InUse",
	Story: "Story",
	Changes: "Changes",
	Next: "Next",
};

const legal =
	"- **Casting Time:** Action\n\n**Classes:** Artificer, Sorcerer, Wizard\n\n*Level 2 Transmutation.*\n\n" +
	Object.keys(headings)
		.flatMap((heading) => [
			`# ${heading}`,
			"",
			`The clerk wrote "${heading}" on the page.`,
			"",
			`- ${heading}`,
			"",
			`### ${heading}`,
			"",
			"A keeper waits.",
			"",
			`## ${heading} notes`,
			"",
			"A keeper waits.",
			"",
		])
		.join("\n");

const deprecated = Object.keys(headings)
	.map((heading) => `## ${heading}\n\nA keeper waits.\n`)
	.join("\n");

describe("deprecated template sections: real Vale through the CLI", () => {
	it("reports exactly five errors for exact level-two headings, then none after their removal", async () => {
		const root = await mkdtemp(join(tmpdir(), "cf-deprecated-"));
		try {
			const vault = join(root, "wiki");
			await mkdir(vault);
			const path = join(vault, "target.md");
			const args = [
				"check",
				path,
				"--json",
				"--layer",
				"style",
				"--root",
				root,
				"--vault",
				vault,
				"--templates",
				realTemplates,
			];
			await writeFile(path, `${legal}\n${deprecated}`);
			const before = await cf(args, root);
			const report = JSON.parse(before.stdout) as JsonReport;
			expect(before.code, before.stderr).toBe(1);
			expect(report.counts.findings, before.stdout).toBe(5);
			expect(report.findings.map((finding) => finding.rule).sort()).toEqual(
				Object.values(headings)
					.map((rule) => `Narration.${rule}`)
					.sort(),
			);
			for (const finding of report.findings) {
				expect(finding.severity).toBe("error");
				expect(finding.message).toMatch(/^Deprecated: .+\. Migrate to the shape of wiki\/templates\/.+\.md — see .+; /);
				expect(finding.hint).toContain("Migrate to the shape of wiki/templates/");
			}
			await writeFile(path, legal);
			const after = await cf(args, root);
			expect(after.code, after.stderr).toBe(0);
			expect(JSON.parse(after.stdout)).toMatchObject({ ok: true, findings: [], counts: { findings: 0 } });
		} finally {
			await rm(root, { recursive: true, force: true });
		}
	});
});
