import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { drawAliases, renderSample } from "../../src/bench/alias.ts";
import { councilOf, validateGrades, type GradesFile } from "../../src/bench/council.ts";
import { findPromptVersion, listPromptVersions } from "../../src/bench/prompts.ts";
import { runDirName, type Mapping } from "../../src/bench/runs.ts";
import { UsageError } from "../../src/check/errors.ts";
import { cf, cfWithEnv } from "../check/helpers.ts";

/** The committed rubric's bullet shape, six rubrics deep: what the council scores 1–5. */
const RUBRIC = `# Benchmark rubric

- **Request.** The page is the one the DM requests.
- **Mechanics.** Rules text reads as valid 2024 rules wording.
- **Callout fit.** The callout fits its slot.
- **Evidence.** Concrete evidence the table can perceive.
- **Spoken clarity.** The callout is clear on one hearing.
- **Voice.** The callout sounds like the DM at the table.
`;

const SEATS: Record<string, { model: string; thinking: string }> = {
	anthropic: { model: "anthropic/claude-opus-5-5", thinking: "high" },
	openai: { model: "openai-codex/gpt-6.1-sol", thinking: "high" },
	zai: { model: "zai/glm-5.3", thinking: "high" },
	xai: { model: "xai-oauth/grok-4.7", thinking: "high" },
};

const PAGE = (name: string) =>
	`---\ntype: Item\n---\n\n> [!narration] First look\n> The ${name} staff hums.\n\n## Mechanics\n\n+3 weapon.\n`;

/** A fixture repository root: agent pairs, one prompt version and the rubric. */
function fixtureRoot(): string {
	const root = mkdtempSync(join(tmpdir(), "bench-root-"));
	mkdirSync(join(root, ".omp", "agents"), { recursive: true });
	for (const [family, seat] of Object.entries(SEATS))
		for (const role of ["runner", "grader"] as const)
			writeFileSync(
				join(root, ".omp", "agents", `bench-${role}-${family}.md`),
				`---\nname: bench-${role}-${family}\nmodel: ${seat.model}\nthinking-level: ${seat.thinking}\ntools: [read]\n---\n\nBody.\n`,
			);
	mkdirSync(join(root, "evals", "bench", "prompts", "playful-cloud"), { recursive: true });
	writeFileSync(join(root, "evals", "bench", "prompts", "playful-cloud", "v1.md"), "Write the Playful Cloud item.\n");
	writeFileSync(join(root, "evals", "bench", "rubric.md"), RUBRIC);
	return root;
}

function resultFile(root: string, family: string, name: string): string {
	const path = join(root, `${family}.json`);
	writeFileSync(path, JSON.stringify({ page: PAGE(name), sources: ["Items/Playful Cloud.md"] }));
	return path;
}

function gradesFile(runDir: string, family: string, grades: GradesFile): void {
	mkdirSync(join(runDir, "grades"), { recursive: true });
	writeFileSync(join(runDir, "grades", `${family}.json`), JSON.stringify(grades));
}

/** Parses the `run <path>` line `bench alias` prints. */
function runNameOf(stdout: string): string {
	const line = stdout.split(/\r?\n/).find((candidate) => candidate.startsWith("run "));
	if (line === undefined) throw new Error(`no run line in ${JSON.stringify(stdout)}`);
	return line.split(/\s+/).at(-1)!.split("/").at(-1)!;
}

const roots: string[] = [];

afterEach(() => {
	for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
	rmSync(join(tmpdir(), "cf-bench"), { recursive: true, force: true });
});

describe("bench prompts", () => {
	it("lists version files and resolves a bare id to its highest version", () => {
		const root = fixtureRoot();
		roots.push(root);
		writeFileSync(join(root, "evals", "bench", "prompts", "playful-cloud", "v2.md"), "Rewritten.\n");
		const versions = listPromptVersions(join(root, "evals", "bench", "prompts"), "evals/bench/prompts");
		expect(versions.map((version) => version.name)).toEqual(["playful-cloud/v1", "playful-cloud/v2"]);
		expect(findPromptVersion(versions, "playful-cloud")).toBe(versions[1]);
		expect(findPromptVersion(versions, "playful-cloud/v1")).toBe(versions[0]);
		expect(() => findPromptVersion(versions, "empty-slot")).toThrow(UsageError);
	});

	it("suffixed run dir names for a date that already holds an entry", () => {
		expect(runDirName("2026-10-11", "playful-cloud", 1, [])).toBe("2026-10-11-playful-cloud-v1");
		expect(runDirName("2026-10-11", "playful-cloud", 1, ["2026-10-11-playful-cloud-v1"])).toBe(
			"2026-10-11-playful-cloud-v1-2",
		);
		expect(
			runDirName("2026-10-11", "playful-cloud", 1, ["2026-10-11-playful-cloud-v1", "2026-10-11-playful-cloud-v1-2"]),
		).toBe("2026-10-11-playful-cloud-v1-3");
	});
});

describe("bench anonymisation", () => {
	it("draws fresh, distinct animal aliases", () => {
		const first = drawAliases(3);
		const second = drawAliases(3, first);
		expect(new Set(first).size).toBe(3);
		expect(first).not.toEqual(second);
		for (const alias of second) expect(first).not.toContain(alias);
	});

	it("renders a sample as the page plus its Sources list, with no family or model", () => {
		const sample = renderSample(PAGE("willow"), ["Items/Playful Cloud.md"]);
		expect(sample).toContain("> [!narration] First look");
		expect(sample.endsWith("\n## Sources\n\n- Items/Playful Cloud.md\n")).toBe(true);
		expect(sample).not.toContain("zai");
	});
});

describe("cfcli bench status", () => {
	it("lists each family's seat, its quota and the prompt version", async () => {
		const root = fixtureRoot();
		roots.push(root);
		const run = await cfWithEnv(["bench", "status", "--json", "--root", root], { PATH: "" });
		expect(run.code).toBe(0);
		const status = JSON.parse(run.stdout) as {
			quota_error: string;
			families: {
				family: string;
				model?: string;
				thinking?: string;
				error?: string;
				quota?: { status: string; meter: string; remaining: number | null; resetsAt: string | null };
			}[];
			prompts: { prompt: string; latest: unknown }[];
		};
		expect(status.quota_error).toBeTruthy();
		expect(status.families.map((family) => family.family)).toEqual(["anthropic", "openai", "zai", "xai"]);
		for (const family of status.families) {
			expect(family.error).toBeUndefined();
			expect(family.model).toBe(SEATS[family.family]!.model);
			expect(family.quota!.status).toBe("unknown");
			expect(family.quota!.remaining).toBeNull();
			expect(family.quota!.resetsAt).toBeNull();
		}
		expect(status.prompts).toEqual([
			{ prompt: "playful-cloud/v1", path: "evals/bench/prompts/playful-cloud/v1.md", latest: null },
		]);
	});

	it("exits 1 when a runner and grader pair seat different models", async () => {
		const root = fixtureRoot();
		roots.push(root);
		writeFileSync(
			join(root, ".omp", "agents", "bench-grader-xai.md"),
			"---\nname: bench-grader-xai\nmodel: xai-oauth/grok-4.5\nthinking-level: high\n---\n\nBody.\n",
		);
		const run = await cfWithEnv(["bench", "status", "--json", "--root", root], { PATH: "" });
		expect(run.code).toBe(1);
		expect(run.stderr).toContain("xai");
		const status = JSON.parse(run.stdout) as { families: { family: string; error?: string }[] };
		expect(status.families.find((family) => family.family === "xai")!.error).toContain("grok-4.5");
	});
});

describe("cfcli bench alias → reveal → render", () => {
	it("runs a two-family council end to end, then an amendment that carries a sample", async () => {
		const root = fixtureRoot();
		roots.push(root);
		const zaiResult = resultFile(root, "zai", "willow");
		const xaiResult = resultFile(root, "xai", "ironbell");
		const aliased = await cfWithEnv(
			[
				"bench",
				"alias",
				"--prompt",
				"playful-cloud/v1",
				`zai=${zaiResult}`,
				`xai=${xaiResult}`,
				"--pending",
				'anthropic="quota exhausted"',
				"--pending",
				'openai="quota exhausted"',
				"--root",
				root,
			],
			{ PATH: "" },
		);
		expect(aliased.code).toBe(0);
		const firstName = runNameOf(aliased.stdout);
		const firstDir = join(root, "evals", "bench", "runs", firstName);
		const firstRun = JSON.parse(readFileSync(join(firstDir, "run.json"), "utf8")) as {
			prompt: string;
			seats: Record<string, { model: string; thinking: string }>;
			pending: { family: string; reason: string; resetsAt: string | null }[];
		};
		expect(firstRun.prompt).toBe("playful-cloud/v1");
		expect(Object.keys(firstRun.seats)).toEqual(["zai", "xai"]);
		expect(firstRun.seats.zai).toEqual(SEATS.zai);
		expect(firstRun.pending.map((entry) => entry.family)).toEqual(["anthropic", "openai"]);
		const firstAliases = readdirSync(join(firstDir, "samples"))
			.map((file) => file.replace(/\.md$/, ""))
			.sort();
		expect(firstAliases).toHaveLength(2);
		for (const alias of firstAliases)
			expect(readFileSync(join(firstDir, "samples", `${alias}.md`), "utf8")).toContain("## Sources");
		const firstMapping = JSON.parse(
			readFileSync(join(tmpdir(), "cf-bench", firstName, "mapping.json"), "utf8"),
		) as Mapping;
		expect(
			Object.values(firstMapping)
				.map((entry) => entry.family)
				.sort(),
		).toEqual(["xai", "zai"]);
		for (const family of ["zai", "xai"]) {
			const brief = readFileSync(join(tmpdir(), "cf-bench", firstName, `brief-${family}.md`), "utf8");
			expect(brief).toContain("Write the Playful Cloud item.");
			expect(brief).toContain("- **Request.**");
			for (const alias of firstAliases) expect(brief).toContain(`## Sample ${alias}`);
		}

		const zaiAlias = Object.keys(firstMapping).find((alias) => firstMapping[alias]!.family === "zai")!;
		const xaiAlias = Object.keys(firstMapping).find((alias) => firstMapping[alias]!.family === "xai")!;
		gradesFile(firstDir, "zai", {
			grades: [
				{ alias: zaiAlias, scores: [5, 5, 5, 5, 5, 5], reasons: Array(6).fill("vivid") },
				{ alias: xaiAlias, scores: [3, 3, 3, 3, 3, 3], reasons: Array(6).fill("adequate") },
			],
			ranking: [zaiAlias, xaiAlias],
		});
		gradesFile(firstDir, "xai", {
			grades: [
				{ alias: zaiAlias, scores: [4, 4, 4, 4, 4, 4], reasons: Array(6).fill("vivid") },
				{ alias: xaiAlias, scores: [2, 2, 2, 2, 2, 2], reasons: Array(6).fill("thin") },
			],
			ranking: [zaiAlias, xaiAlias],
		});
		const revealed = await cf(["bench", "reveal", "--run", firstName, "--root", root]);
		expect(revealed.code).toBe(0);
		expect(revealed.stdout).toContain(`1. ${zaiAlias} (zai) mean 4.50`);
		const council = JSON.parse(readFileSync(join(firstDir, "council.json"), "utf8")) as {
			council: string[];
			empty_seats: string[];
			order: string[];
			samples: Record<string, { family: string; scores: number[]; overall: number; mean_rank: number }>;
		};
		expect(council.council).toEqual(["xai", "zai"]);
		expect(council.empty_seats).toEqual([]);
		expect(council.order).toEqual([zaiAlias, xaiAlias]);
		expect(council.samples[zaiAlias]).toMatchObject({ family: "zai", overall: 4.5, mean_rank: 1 });
		expect(council.samples[xaiAlias]!.scores).toEqual([2.5, 2.5, 2.5, 2.5, 2.5, 2.5]);
		expect(existsSync(join(firstDir, "mapping.json"))).toBe(true);
		expect(existsSync(join(tmpdir(), "cf-bench", firstName, "mapping.json"))).toBe(false);
		const report = readFileSync(join(firstDir, "report.md"), "utf8");
		expect(report).toContain("Council: xai, zai");
		expect(report).toContain("**anthropic** — quota exhausted");
		const leaderboard = readFileSync(join(root, "evals", "bench", "leaderboard.md"), "utf8");
		expect(leaderboard).toContain(`### ${firstName}`);

		// The amendment: one pending family recovered, the other carries forward; both samples carry byte for byte.
		const anthropicResult = resultFile(root, "anthropic", "stormglass");
		const amended = await cfWithEnv(
			[
				"bench",
				"alias",
				"--prompt",
				"playful-cloud/v1",
				`anthropic=${anthropicResult}`,
				"--amend",
				firstName,
				"--root",
				root,
			],
			{ PATH: "" },
		);
		expect(amended.code).toBe(0);
		const secondName = runNameOf(amended.stdout);
		expect(secondName).toMatch(/-2$/);
		expect(amended.stdout).toContain(`carried xai        from ${firstName}`);
		const secondDir = join(root, "evals", "bench", "runs", secondName);
		const secondRun = JSON.parse(readFileSync(join(secondDir, "run.json"), "utf8")) as {
			seats: Record<string, { model: string }>;
			pending: { family: string; reason: string; resetsAt: string | null }[];
			amends: string;
			carried: Record<string, string>;
		};
		expect(secondRun.amends).toBe(firstName);
		expect(secondRun.carried).toEqual({ xai: firstName, zai: firstName });
		expect(Object.keys(secondRun.seats).sort()).toEqual(["anthropic", "xai", "zai"]);
		expect(secondRun.pending).toEqual([{ family: "openai", reason: "quota exhausted", resetsAt: null }]);
		const secondMapping = JSON.parse(
			readFileSync(join(tmpdir(), "cf-bench", secondName, "mapping.json"), "utf8"),
		) as Mapping;
		const carriedZai = Object.keys(secondMapping).find((alias) => secondMapping[alias]!.family === "zai")!;
		expect(secondMapping[carriedZai]!.source_run).toBe(firstName);
		expect(readFileSync(join(secondDir, "samples", `${carriedZai}.md`), "utf8")).toBe(
			readFileSync(join(firstDir, "samples", `${zaiAlias}.md`), "utf8"),
		);
		const carriedXai = Object.keys(secondMapping).find((alias) => secondMapping[alias]!.family === "xai")!;
		const thirdAlias = Object.keys(secondMapping).find((alias) => secondMapping[alias]!.family === "anthropic")!;
		const allAliases = [carriedZai, carriedXai, thirdAlias].sort();
		expect(thirdAlias).not.toBe(zaiAlias);
		for (const alias of allAliases) expect(firstAliases).not.toContain(alias);

		// Grades that miss a sample: reveal exits 1 naming the grades file.
		for (const family of ["anthropic", "xai", "zai"])
			gradesFile(secondDir, family, {
				grades: [carriedZai, thirdAlias].map((alias) => ({
					alias,
					scores: [4, 4, 4, 4, 4, 4],
					reasons: Array(6).fill("solid"),
				})),
				ranking: [carriedZai, thirdAlias],
			});
		const rejected = await cf(["bench", "reveal", "--run", secondName, "--root", root]);
		expect(rejected.code).toBe(1);
		expect(rejected.stderr).toContain(join("grades", "anthropic.json"));
		expect(rejected.stderr).toContain("the run holds");

		for (const family of ["anthropic", "xai", "zai"])
			gradesFile(secondDir, family, {
				grades: allAliases.map((alias) => ({
					alias,
					scores: [4, 4, 4, 4, 4, 4],
					reasons: Array(6).fill("solid"),
				})),
				ranking: allAliases,
			});
		const secondReveal = await cf(["bench", "reveal", "--run", secondName, "--root", root]);
		expect(secondReveal.code).toBe(0);
		const secondCouncil = JSON.parse(readFileSync(join(secondDir, "council.json"), "utf8")) as {
			order: string[];
			samples: Record<string, { family: string; overall: number }>;
		};
		expect([...Object.keys(secondCouncil.samples)].sort()).toEqual(allAliases);
		expect(secondCouncil.samples[carriedZai]!.family).toBe("zai");
		const leaderboard2 = readFileSync(join(root, "evals", "bench", "leaderboard.md"), "utf8");
		expect(leaderboard2).toContain(`### ${secondName} — amends ${firstName}`);
		expect(leaderboard2).toContain(`- **${firstName}** — 1. zai 4.50`);

		const rendered = await cf(["bench", "render", "--root", root]);
		expect(rendered.code).toBe(0);
		expect(rendered.stdout).toContain("(2 entries)");
	});

	it("rejects a result without a narration callout and an unknown prompt", async () => {
		const root = fixtureRoot();
		roots.push(root);
		const broken = join(root, "broken.json");
		writeFileSync(broken, JSON.stringify({ page: "No callout.", sources: [] }));
		const noCallout = await cf(["bench", "alias", "--prompt", "playful-cloud/v1", `zai=${broken}`, "--root", root]);
		expect(noCallout.code).toBe(2);
		expect(noCallout.stderr).toContain("narration");
		const empty = await cf(["bench", "alias", "--prompt", "empty-slot/v1", `zai=${broken}`, "--root", root]);
		expect(empty.code).toBe(2);
		expect(empty.stderr).toContain("No Benchmark prompt");
	});
});

describe("council validation", () => {
	const grades = (alias: string, scores: number[]): GradesFile => ({
		grades: [{ alias, scores, reasons: Array(scores.length).fill("why") }],
		ranking: [alias],
	});

	it("rejects wrong alias sets, out-of-range scores and rankings that are not permutations", () => {
		const aliases = ["otter", "zoril"];
		expect(() => validateGrades(grades("otter", [1, 2, 3, 4, 5, 5]), aliases, "g.json")).toThrow(
			/grades cover \[otter\]/,
		);
		expect(() => validateGrades({ ...grades("otter", [3, 3, 3, 3, 3, 3]), ranking: ["otter"] }, aliases, "g.json")).not
			.toThrow;
		expect(() =>
			validateGrades({ ...grades("otter", [0, 3, 3, 3, 3, 3]), ranking: ["otter"] }, ["otter"], "g.json"),
		).toThrow(/scores 0/);
		expect(() =>
			validateGrades(
				{ grades: [{ alias: "otter", scores: [3, 3, 3, 3, 3, 3], reasons: ["a"] }], ranking: ["otter"] },
				["otter"],
				"g.json",
			),
		).toThrow(/reasons, not 6/);
		expect(() =>
			validateGrades({ ...grades("otter", [3, 3, 3, 3, 3, 3]), ranking: ["otter", "otter"] }, ["otter"], "g.json"),
		).toThrow(/not a ranking/);
	});

	it("averages scores and ranks across the graders who sat", () => {
		const otter: GradesFile = {
			grades: [
				{ alias: "otter", scores: [5, 5, 5, 5, 5, 5], reasons: [] },
				{ alias: "zoril", scores: [1, 1, 1, 1, 1, 1], reasons: [] },
			],
			ranking: ["otter", "zoril"],
		};
		const zoril: GradesFile = {
			grades: [
				{ alias: "otter", scores: [3, 3, 3, 3, 3, 3], reasons: [] },
				{ alias: "zoril", scores: [5, 5, 5, 5, 5, 5], reasons: [] },
			],
			ranking: ["zoril", "otter"],
		};
		const council = councilOf(["zai", "xai"], { xai: zoril, zai: otter }, ["otter", "zoril"], {
			otter: { family: "zai", model: "zai/glm-5.3", thinking: "high" },
			zoril: { family: "xai", model: "xai-oauth/grok-4.7", thinking: "high" },
		});
		expect(council.council).toEqual(["xai", "zai"]);
		expect(council.samples.otter).toMatchObject({ overall: 4, mean_rank: 1.5 });
		expect(council.samples.zoril!.scores).toEqual([3, 3, 3, 3, 3, 3]);
	});
});
