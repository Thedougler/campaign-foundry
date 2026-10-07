import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { cf, type CliResult, type JsonReport, realTemplates } from "./helpers.ts";

let root: string;
type Result = CliResult & { report: JsonReport };

function runCheck(vaultRoot: string): Promise<Result> {
	return cf([
		"check", "--json", "--layer", "boilerplate",
		"--vault", join(vaultRoot, "wiki"), "--root", vaultRoot, "--templates", realTemplates,
	]).then((result) => ({ ...result, report: JSON.parse(result.stdout) as JsonReport }));
}

const check = (): Promise<Result> => runCheck(root);

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

describe("cf check --layer boilerplate, sentences inside paragraphs", () => {
	let root: string;
	const check = (): Promise<Result> => runCheck(root);

	beforeAll(async () => {
		root = await mkdtemp(join(tmpdir(), "cf-boilerplate-sentence-"));
		await mkdir(join(root, "wiki/B"), { recursive: true });
		const page = (name: string, tactics: string) =>
			writeFile(join(root, `wiki/B/${name}.md`), `---\ntype: Creature\n---\n\n## Play\n\n- **Tactics.** ${tactics}\n`);
		await page("One", "It opens from the high ground and dives when the shield line wavers. Let the Party answer with positioning, cover, or focused fire. It withdraws into the surf once the tide turns.");
		await page("Two", "It circles the boats and strikes at whichever swimmer lags behind. Let the Party answer with positioning, cover, or focused fire. It never lingers after the first wound tells.");
		await page("Three", "The eel hauls its catch 30 ft. upstream before it feeds. It lurks beneath the weir until dusk.");
		await page("Four", "The eel hauls its catch 30 ft. downstream before it feeds. It lurks beneath the mill until dawn.");
	});

	afterAll(async () => {
		await rm(root, { recursive: true, force: true });
	});

	it("flags one sentence shared inside different paragraphs, on each page holding it", async () => {
		const { report } = await check();
		const shared = report.findings.filter((finding) => finding.rule === "shared-line");
		expect(shared.length).toBe(2);
		expect(shared.map((finding) => finding.path.split("/").slice(-2).join("/")).sort())
			.toEqual(["B/One.md", "B/Two.md"]);
		for (const finding of shared) {
			expect(finding.line).toBe(7);
			expect(finding.severity).toBe("warning");
			expect(finding.message).toContain('"Let the Party answer with positioning, cover, or focused fire."');
			expect(finding.hint).toContain("no two pages read alike");
		}
	});

	it("does not mistake text before an abbreviation for a shared sentence", async () => {
		const { report } = await check();
		const shared = report.findings.filter((finding) => finding.rule === "shared-line");
		expect(shared.filter((finding) => finding.path.endsWith("Three.md") || finding.path.endsWith("Four.md")))
			.toEqual([]);
	});
});
