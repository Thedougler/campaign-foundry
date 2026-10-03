import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { cf, type CliResult, type JsonReport, realTemplates } from "./helpers.ts";

let root: string;
type Result = CliResult & { report: JsonReport };

async function check(): Promise<Result> {
	const result = await cf([
		"check", "--json", "--layer", "boilerplate",
		"--vault", join(root, "wiki"), "--root", root, "--templates", realTemplates,
	]);
	return { ...result, report: JSON.parse(result.stdout) as JsonReport };
}

beforeAll(async () => {
	root = await mkdtemp(join(tmpdir(), "cf-boilerplate-"));
	await mkdir(join(root, "wiki/A"), { recursive: true });
	const shared = "- **Tell.** The swing comes wide and slow, telegraphed long before it lands.\n";
	await writeFile(join(root, "wiki/A/One.md"), `---\ntype: Creature\n---\n\n## Play\n\n${shared}\n`);
	await writeFile(join(root, "wiki/A/Two.md"), `---\ntype: Creature\n---\n\n## Play\n\n- **Tell.** The swing comes wide and slow, telegraphed long before it lands.\n`);
	await writeFile(join(root, "wiki/A/Three.md"), `---\ntype: Creature\n---\n\n## Play\n\n- **Tell.** It answers a question with silence while its hand finds the knife.\n`);
});

afterAll(async () => {
	await rm(root, { recursive: true, force: true });
});

describe("cf check --layer boilerplate", () => {
	it("flags a prose line shared verbatim across pages, on each page holding it", async () => {
		const { report } = await check();
		const shared = report.findings.filter((finding) => finding.rule === "shared-line");
		const paths = shared.map((finding) => finding.path);
		expect(paths.filter((path) => path.endsWith("/A/One.md") || path.endsWith("/A/Two.md")).length).toBe(2);
		expect(paths.length).toBe(2);
		for (const finding of shared) {
			expect(finding.severity).toBe("warning");
			expect(finding.hint).toContain("no two pages read alike");
		}
		expect(report.findings.filter((finding) => finding.path.endsWith("Three.md"))).toEqual([]);
	});
});
