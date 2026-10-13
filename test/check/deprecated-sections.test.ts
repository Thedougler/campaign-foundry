import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cf, type JsonReport, realTemplates } from "./helpers.ts";

const headings: Record<string, string> = {
	"At a glance": "AtAGlance",
	Play: "Play",
	Depth: "Depth",
	"In use": "InUse",
	Story: "Story",
	Changes: "Changes",
	Next: "Next",
};

const legal =
	"---\ntitle: Target\ntype: NPC\nsummary: A keeper.\nsources: []\n---\n\n## Roleplaying\n\nA keeper waits.\n\n" +
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

describe("deprecated template sections: template layer through the CLI", () => {
	it("reports seven errors for exact level-two headings, then none after their removal", async () => {
		const root = await mkdtemp(join(tmpdir(), "cf-deprecated-"));
		try {
			const vault = join(root, "wiki");
			await mkdir(join(vault, "NPCs"), { recursive: true });
			const path = join(vault, "NPCs/target.md");
			const args = [
				"check",
				path,
				"--json",
				"--layer",
				"template",
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
			expect(report.counts.findings, before.stdout).toBe(7);
			expect(report.findings.map((finding) => finding.rule)).toEqual(Array(7).fill("retired-heading"));
			for (const finding of report.findings) {
				expect(finding.severity).toBe("error");
				expect(finding.message).toMatch(/^Deprecated(?: section)?: /);
				expect(finding.hint).toContain("Migrate");
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
