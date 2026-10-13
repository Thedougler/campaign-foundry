import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { cf, type JsonReport, repoRoot } from "./check/helpers.ts";

const roots: string[] = [];
afterEach(async () => {
	await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("cfcli style", () => {
	it.each([
		["The PC holds the line.\n", ["ai-tells.FigurativeHolds"]],
		["The PC holds the line.\nThe PC holds a lantern.\n", ["ai-tells.FigurativeHolds"]],
	] as const)("keeps a file's findings identical alone and alongside the PC template: %s", async (source, rules) => {
		const root = await mkdtemp(join(tmpdir(), "cf-style-cli-"));
		roots.push(root);
		await mkdir(join(root, "wiki"));
		const draft = join(root, "draft.md");
		await writeFile(draft, source);
		const flags = ["--json", "--vault", join(root, "wiki"), "--root", root];
		const alone = await cf(["style", draft, ...flags], repoRoot);
		const together = await cf(["style", draft, "wiki/templates/PC.md", ...flags], repoRoot);
		expect(alone.stderr).toBe("");
		expect(together.stderr).toBe("");
		const aloneReport = JSON.parse(alone.stdout) as JsonReport;
		const togetherReport = JSON.parse(together.stdout) as JsonReport;
		const findings = aloneReport.findings.filter((finding) => finding.path === draft);
		expect(findings.map((finding) => finding.rule)).toEqual(rules);
		expect(togetherReport.findings.filter((finding) => finding.path === draft)).toEqual(findings);
	});

	it.each(["title: Ledger", "title: Keeper\naliases: [Ledger]"])(
		"does not add a sibling text's title or aliases to name masking: %s",
		async (names) => {
			const root = await mkdtemp(join(tmpdir(), "cf-style-cli-"));
			roots.push(root);
			await mkdir(join(root, "wiki"));
			const draft = join(root, "artifact.md");
			const sibling = join(root, "keeper.md");
			await writeFile(draft, "The Ledger holds every entry.\n");
			await writeFile(sibling, `---\ntype: PC\n${names}\n---\nA keeper waits.\n`);
			const flags = ["--json", "--vault", join(root, "wiki"), "--root", root];
			const alone = await cf(["style", draft, ...flags], repoRoot);
			const together = await cf(["style", draft, sibling, ...flags], repoRoot);
			expect(alone.stderr).toBe("");
			expect(together.stderr).toBe("");
			const aloneReport = JSON.parse(alone.stdout) as JsonReport;
			const togetherReport = JSON.parse(together.stdout) as JsonReport;
			const findings = aloneReport.findings.filter((finding) => finding.path === draft);
			expect(findings).toContainEqual(expect.objectContaining({ layer: "style", rule: "ai-tells.BareHolds", line: 1 }));
			expect(togetherReport.findings.filter((finding) => finding.path === draft)).toEqual(findings);
		},
	);
});
