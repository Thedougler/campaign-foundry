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
			const twin = finding.path.endsWith("One.md") ? "B/Two.md:7" : "B/One.md:7";
			expect(finding.message).toContain(twin);
		}
	});

	it("does not mistake text before an abbreviation for a shared sentence", async () => {
		const { report } = await check();
		const shared = report.findings.filter((finding) => finding.rule === "shared-line");
		expect(shared.filter((finding) => finding.path.endsWith("Three.md") || finding.path.endsWith("Four.md")))
			.toEqual([]);
	});

	it("compares a field's content but not its bold label", async () => {
		const labelled = await mkdtemp(join(tmpdir(), "cf-boilerplate-label-"));
		try {
			await mkdir(join(labelled, "wiki/F"), { recursive: true });
			const page = (name: string, lines: string) =>
				writeFile(join(labelled, `wiki/F/${name}.md`), `---\ntype: Faction\n---\n\n## Play\n\n${lines}\n`);
			await page("Gulls", "- **How to notice or interfere.** Gull feathers pinned to a dock post mark a drop.\n- **Offers.** Free passage across the bay, paid back in one favour.");
			await page("Tide", "- **How to notice or interfere.** A tolling bell at low water calls the crews.\n- **Offers.** Free passage across the bay, paid back in one favour.");
			const { report } = await runCheck(labelled);
			const shared = report.findings.filter((finding) => finding.rule === "shared-line");
			expect(shared.map((finding) => finding.line)).toEqual([8, 8]);
			expect(shared.every((finding) => finding.message.includes('"Free passage across the bay, paid back in one favour."'))).toBe(true);
		} finally {
			await rm(labelled, { recursive: true, force: true });
		}
	});

	it("lets two pages quote the same spoken words, and still flags the narration around them", async () => {
		const quoted = await mkdtemp(join(tmpdir(), "cf-boilerplate-quote-"));
		try {
			await mkdir(join(quoted, "wiki/Q"), { recursive: true });
			const page = (name: string, text: string) =>
				writeFile(join(quoted, `wiki/Q/${name}.md`), `---\ntype: NPC\n---\n\n## History\n\n${text}\n`);
			const said = `"I know about the money. I figured guns were useful for protecting yourself, but the break room is unnecessary."`;
			await page("Nona", `Over the sending stone she answered: ${said}`);
			await page("Thread", `Nona's reply came back within the hour: ${said}`);
			await page("Echo", "The harbour bell rang twice before the tide turned. Nobody on the quay looked up.");
			await page("Echo Two", "The harbour bell rang twice before the tide turned. The gulls scattered off the nets.");
			const { report } = await runCheck(quoted);
			const shared = report.findings.filter((finding) => finding.rule === "shared-line");
			expect(shared.map((finding) => finding.path.split("/").pop()).sort()).toEqual(["Echo Two.md", "Echo.md"]);
		} finally {
			await rm(quoted, { recursive: true, force: true });
		}
	});

	it("does not count a linked name as prose: a Thread line marked still recurs on every Recap", async () => {
		const linked = await mkdtemp(join(tmpdir(), "cf-boilerplate-link-"));
		try {
			await mkdir(join(linked, "wiki/R"), { recursive: true });
			const page = (name: string, text: string) =>
				writeFile(join(linked, `wiki/R/${name}.md`), `---\ntype: Recap\n---\n\n## Threads\n\n${text}\n`);
			await page("Session 9", "- [[The Crown Inspection Thread]], still. The warship kept its distance all week.");
			await page("Session 10", "- [[The Crown Inspection Thread]], still. The Party kept to open water by night.");
			await page("Session 11", "- [[Simone]] rowed ahead of the fleet before dawn. Nothing else moved.");
			await page("Session 12", "- [[Simone]] rowed ahead of the fleet before dawn. The Crown sails held back.");
			const { report } = await runCheck(linked);
			const shared = report.findings.filter((finding) => finding.rule === "shared-line");
			expect(shared.map((finding) => finding.path.split("/").pop()).sort()).toEqual(["Session 11.md", "Session 12.md"]);
		} finally {
			await rm(linked, { recursive: true, force: true });
		}
	});
});
