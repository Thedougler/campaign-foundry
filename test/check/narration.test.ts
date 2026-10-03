import { cp, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { cf, type CliResult, type JsonReport, realTemplates, repoRoot } from "./helpers.ts";

const fixtureRoot = join(repoRoot, "test/narration/fixtures");
type Result = CliResult & { report: JsonReport };

async function check(root: string): Promise<Result> {
	const result = await cf([
		"check", "--json", "--layer", "narration",
		"--vault", join(root, "wiki"), "--root", root, "--templates", realTemplates,
	]);
	return { ...result, report: JSON.parse(result.stdout) as JsonReport };
}

function findings(result: Result, page: string, title: string, rule: string) {
	return result.report.findings.filter((finding) =>
		finding.path.endsWith(`/Drown/Scenes/${page}.md`) &&
		finding.message.startsWith(`${title}:`) && finding.rule === rule,
	);
}

function twin(result: Result, rule: string, dirty: [string, string], clean: [string, string], item: string) {
	const hits = findings(result, ...dirty, rule);
	expect(hits.length).toBeGreaterThan(0);
	for (const finding of hits) {
		expect(finding.layer).toBe("narration");
		expect(finding.severity).toBe("warning");
		expect(finding.line).toBeGreaterThan(0);
		expect(finding.hint).toContain(item);
		expect(finding.hint).toContain("For example");
	}
	expect(findings(result, ...clean, rule)).toEqual([]);
}

// Missing twins stay local to the public-interface test rather than changing the shared fixture vault.
const structuralTwins = [
	["Relative dirty", "A tower that leans toward the road which climbs the hill blocks the way."],
	["Relative clean", "A tower leans over the uphill road."],
	["Names dirty", "Mara meets Tovin beside Hobb while Ilse watches."],
	["Names clean", "Mara meets Tovin beside Hobb."],
	["Traps dirty", "Six slick silver snakes slide past Eileen Dover, who must ring the wring bell."],
	["Traps clean", "Snakes glide past the watchman beside a brass bell."],
	["Dialogue clean", 'The ferryman grips his pole and mutters, "Coins first."'],
	["Non narration", "You cross the yard. In the tower, a bell rings. Back in the yard, guards gather."],
];

let existing: Result;
let added: Result;
let temporaryRoot: string;
beforeAll(async () => {
	existing = await check(fixtureRoot);
	temporaryRoot = await mkdtemp(join(tmpdir(), "cf-narration-"));
	await cp(join(fixtureRoot, "wiki"), join(temporaryRoot, "wiki"), { recursive: true });
	for (const [title, body] of structuralTwins) {
		const type = title === "Non narration" ? "note" : "narration";
		await writeFile(join(temporaryRoot, `wiki/Drown/Scenes/${title}.md`), `> [!${type}] ${title}\n> ${body}\n`);
	}
	added = await check(temporaryRoot);
}, 30_000);
afterAll(async () => {
	if (temporaryRoot) await rm(temporaryRoot, { recursive: true, force: true });
});

describe("cf check --layer narration", () => {
	it("registers a one-line help description", async () => {
		const help = await cf(["check", "--help"]);
		expect(help.code).toBe(0);
		expect(help.stdout).toMatch(/narration\s+Narration structure and source echoes/);
	});

	it("reports warnings without failing the gate, including echo", () => {
		for (const result of [existing, added]) {
			expect(result.code).toBe(0);
			expect(result.report.ok).toBe(true);
			expect(result.report.findings.length).toBeGreaterThan(0);
			expect(result.report.findings.every((finding) => finding.severity === "warning")).toBe(true);
		}
	});

	it("warns on echoes, not on the clean callout's own text", () => {
		twin(existing, "echo", ["Crossing", "Echo"], ["Crossing", "Clean"], "Fresh words");
		const [echo] = findings(existing, "Crossing", "Echo", "echo");
		expect(echo?.line).toBe(17);
		expect(echo?.message).toContain("mud slick as butter coats every plank of the dock");
		expect(echo?.message).toContain("Drown/Scenes/Crossing.md:7");
		expect(echo?.message).toContain("the ferry hangs from a chain of rusted links");
		expect(echo?.message).toContain("Drown/Locations/Old Ferry.md:6");
	});

	it("ignores shared runs made only of stop words", () => {
		expect(findings(existing, "Crossing", "Stop words", "echo")).toEqual([]);
	});

	it("exempts quoted speech but detects unquoted echoes of a frontmatter-linked page", () => {
		twin(existing, "echo", ["Speech unquoted", "Speech unquoted"], ["Speech", "Speech"], "Fresh words");
		const [echo] = findings(existing, "Speech unquoted", "Speech unquoted", "echo");
		expect(echo?.message).toContain("poor hobb never paid his toll");
		expect(echo?.message).toContain("Drown/NPCs/Ferryman.md:");
	});

	it("does not use unlinked pages as sources", () => {
		expect(findings(existing, "Unlinked", "Unlinked", "echo")).toEqual([]);
	});

	it("warns on a run of three fresh starts, not a run broken before three", () => {
		twin(existing, "fresh-starts", ["List", "List"], ["Short list", "Short list"], "Told");
		expect(findings(existing, "List", "List", "fresh-starts")[0]?.message)
			.toContain('Sentences 1 to 3 open like a list: "You cross", "In the", "Back in"');
	});

	it("warns on evaluative stacks while exempting quoted speech", () => {
		twin(existing, "evaluative-stack", ["Judgement", "Judgement"], ["Judgement in speech", "Judgement in speech"], "Evidence");
		expect(findings(existing, "Judgement", "Judgement", "evaluative-stack")[0]?.message)
			.toContain("ancient mysterious barge");
	});

	it("warns on relative chains, not direct clauses", () => {
		twin(added, "relative-chain", ["Relative dirty", "Relative dirty"], ["Relative clean", "Relative clean"], "Speakable");
	});

	it("warns above three proper-name candidates, not at three", () => {
		twin(added, "invented-names", ["Names dirty", "Names dirty"], ["Names clean", "Names clean"], "Speakable");
		expect(findings(added, "Names dirty", "Names dirty", "invented-names")[0]?.message)
			.toContain("Mara, Tovin, Hobb, Ilse");
	});

	it("warns on spoken traps, not a speakable rewrite", () => {
		twin(added, "spoken-word-trap", ["Traps dirty", "Traps dirty"], ["Traps clean", "Traps clean"], "Speakable");
		const message = findings(added, "Traps dirty", "Traps dirty", "spoken-word-trap")[0]?.message;
		for (const type of ["alliteration", "tongue-twister", "pun-name", "homophone"]) expect(message).toContain(type);
	});

	it("warns on post-quote dialogue attribution, not speaker-first delivery", () => {
		twin(added, "dialogue-attribution", ["Speech", "Speech"], ["Dialogue clean", "Dialogue clean"], "People/Delivery");
	});

	it("ignores callouts other than narration", () => {
		expect(added.report.findings.filter((finding) => finding.message.startsWith("Non narration:"))).toEqual([]);
	});

	it("leaves token rules and length bands out of structural analysis", () => {
		const structuralRules = [
			"echo", "fresh-starts", "evaluative-stack", "relative-chain", "invented-names", "spoken-word-trap", "dialogue-attribution",
		];
		expect(added.report.findings.every((finding) => structuralRules.includes(finding.rule))).toBe(true);
	});
});
