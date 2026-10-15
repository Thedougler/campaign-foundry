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
	it.each([
		["Spell", "Tradition", true],
		["Spell", "Who knows it", true],
		["Lore", "Tradition", false],
		["Lore", "Who knows it", false],
	] as const)("scopes %s's %s retirement correctly", async (type, heading, retired) => {
		const root = await mkdtemp(join(tmpdir(), "cf-deprecated-spell-"));
		try {
			const vault = join(root, "wiki");
			await mkdir(vault, { recursive: true });
			const path = join(vault, "target.md");
			const spellKeys = type === "Spell" ? "level: 1\nschool: Abjuration\nclasses: [Wizard]\n" : "";
			const loreSection = type === "Lore" ? "## Truth, Clues and accounts\n\nA keeper teaches the ward.\n\n" : "";
			await writeFile(
				path,
				`---\ntitle: Target\ntype: ${type}\nsummary: A test page.\nsources: []\nrevealed: ""\n${spellKeys}---\n\n${loreSection}## ${heading}\n\nA keeper teaches the ward.\n`,
			);
			const result = await cf(
				[
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
				],
				root,
			);
			const report = JSON.parse(result.stdout) as JsonReport;
			expect(result.code, result.stderr).toBe(retired ? 1 : 0);
			if (retired) {
				expect(report.findings).toHaveLength(1);
				expect(report.findings[0]).toMatchObject({
					layer: "template",
					rule: "retired-heading",
					severity: "error",
				});
				expect(report.findings[0]?.message).toMatch(/^Deprecated/);
				expect(report.findings[0]?.hint).toContain("caster, source or target");
				expect(report.findings[0]?.hint).toContain("links the Spell");
				expect(report.findings[0]?.hint).toContain("ADR 0051");
				expect(report.findings[0]?.hint).toContain("spell-design steps 4 and 7");
			} else {
				expect(report.findings).toEqual([]);
			}
		} finally {
			await rm(root, { recursive: true, force: true });
		}
	});

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
