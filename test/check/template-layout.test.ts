import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { parsePage } from "../../src/vault/parse.ts";
import { cf, type JsonReport, realTemplates, repoRoot } from "./helpers.ts";

let root: string;
let scene: string;
let flags: string[];

beforeAll(async () => {
	root = await mkdtemp(join(tmpdir(), "cf-template-layout-"));
	await mkdir(join(root, "wiki/shattered-sea/Sessions/Session 12"), { recursive: true });
	await mkdir(join(root, "templates"));
	scene = await readFile(join(repoRoot, "wiki/shattered-sea/Sessions/Session 12/session-12-terror-birds.md"), "utf8");
	flags = ["--json", "--layer", "template", "--vault", join(root, "wiki"), "--root", root];
});

afterAll(async () => {
	await rm(root, { recursive: true, force: true });
});

describe("template layout fixes", () => {
	it("shows the template's literal classes in the missing-key fix hint", async () => {
		const path = join(root, "wiki/shattered-sea/Sessions/Session 12/hint.md");
		await writeFile(path, scene);
		const result = await cf(["check", path, ...flags, "--templates", realTemplates], root);
		const report = JSON.parse(result.stdout) as JsonReport;
		const finding = report.findings.find(
			(finding) => finding.rule === "missing-key" && finding.message.includes("cssclasses"),
		);
		expect(finding?.hint).toContain("cf-scene");
		expect(finding?.hint).toContain("cf-cliffhanger");
		expect(finding?.hint).not.toContain("a blank value is fine");
	});

	it("copies a Session 12 Scene's literal classes with --fix and keeps placeholder keys blank", async () => {
		const path = join(root, "wiki/shattered-sea/Sessions/Session 12/fix.md");
		await writeFile(path, scene.replace(/^sources:\n(?:[ \t]+.*\n)+/m, "").replace(/^revealed:.*\n/m, ""));
		const result = await cf(["check", path, ...flags, "--templates", realTemplates, "--fix"], root);
		const report = JSON.parse(result.stdout) as JsonReport;
		const fixed = parsePage("fix.md", await readFile(path, "utf8"));
		expect(fixed.frontmatter?.cssclasses).toEqual(["cf-scene", "cf-cliffhanger"]);
		expect(fixed.frontmatter?.sources).toEqual([]);
		expect(fixed.frontmatter?.revealed).toBe("");
		expect(report.findings.filter((finding) => finding.rule === "missing-key")).toEqual([]);
	});

	it("copies Prep's literal classes with --fix", async () => {
		const path = join(root, "wiki/shattered-sea/prep.md");
		await writeFile(
			path,
			'---\ntype: Prep\ntitle: Session prep\nsummary: The harbour watch changes.\nsources: []\ndate: ""\nrevealed: ""\n---\n',
		);
		await cf(["check", path, ...flags, "--templates", realTemplates, "--fix"], root);
		expect(parsePage("prep.md", await readFile(path, "utf8")).frontmatter?.cssclasses).toEqual(["cf-prep"]);
	});

	it.each(["cast", "tiles", "checks"])("suggests a bold-led list for missing [!%s]", async (type) => {
		await writeFile(
			join(root, "templates/layout.md"),
			`---\ntype: Scene\nkind: Hook\n---\n\n## Cards\n\n> [!${type}] Cards\n>\n> - **Label.** Content.\n`,
		);
		const path = join(root, `wiki/shattered-sea/${type}.md`);
		await writeFile(path, "---\ntype: Scene\nkind: Hook\n---\n\n## Cards\n\nThe harbour watch changes.\n");
		const result = await cf(["check", path, ...flags, "--templates", join(root, "templates")], root);
		const report = JSON.parse(result.stdout) as JsonReport;
		const finding = report.findings.find((finding) => finding.rule === "missing-callout");
		expect(finding?.message).toContain(`[!${type}]`);
		expect(finding?.hint).toMatch(new RegExp(`> \\[!${type}\\] Cards\\n>\\n> - \\*\\*[^*]+\\*\\*`));
		expect(finding?.hint).not.toContain("Spoken text for the table.");
	});
});
