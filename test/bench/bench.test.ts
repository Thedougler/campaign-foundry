import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { UsageError } from "../../src/check/errors.ts";
import { findHit, loadCache, upsertRow, type BenchFile, type BenchRow } from "../../src/bench/cache.ts";
import { modelTagOf, parseEvents } from "../../src/bench/events.ts";
import { anonId, renderJudgeBrief } from "../../src/bench/judge.ts";
import { loadPromptSet, promptSha, renderBrief, type PromptSet } from "../../src/bench/prompts.ts";
import { loadGrades, proseScore } from "../../src/bench/record.ts";
import { renderLeaderboard } from "../../src/bench/render.ts";
import type { Matrix } from "../../src/bench/matrix.ts";
import { cf } from "../check/helpers.ts";

const PERSONA = "You are writing for a home D&D 5e campaign wiki.";

const YAML_SET = `- id: npc-first-look
  fixture_page: NPCs/Nib Ashwater.md
  context: |
    summary: "The goblin tally-keeper of Reedholt."
  prompt: |
    ${PERSONA} Using only the facts above, write the [!narration] First look
    block. Reply with only the [!narration] callout block, nothing before or after it.
  rubrics:
    - "True to every fact"
    - "Second person, present tense"
    - "No game mechanics, stats, or meta-commentary in the prose"
    - "Economical: every sentence earns its place"
- id: scene-opening
  context: |
    type: Scene, kind: Hook
  prompt: |
    ${PERSONA} Using only the facts above, write this Scene's opening
    Narration. Reply with only the [!narration] callout block, nothing before or after it.
  rubrics:
    - "True to every fact"
    - "Second person, present tense"
    - "No game mechanics, stats, or meta-commentary in the prose"
    - "Economical: every sentence earns its place"
`;

const MATRIX: Matrix = {
	families: [
		{ name: "openai", top: { model: "openai-codex/gpt-6.1-sol", fallback: "opencode-zen/gpt-6.1-sol" } },
		{ name: "glm", top: { model: "zai/glm-5.3", fallback: "opencode-go/glm-5.3" } },
	],
	judgeFallbackPool: ["zai/glm-5.3"],
};

function writeSet(yaml = YAML_SET): { dir: string; path: string; set: PromptSet } {
	const dir = mkdtempSync(join(tmpdir(), "bench-"));
	const path = join(dir, "prose-bench.yaml");
	writeFileSync(path, yaml);
	return { dir, path, set: loadPromptSet(path) };
}

function turnEnd(overrides: Record<string, unknown> = {}): string {
	return `${JSON.stringify({
		type: "turn_end",
		message: {
			role: "assistant",
			content: [
				{ type: "thinking", thinking: "muse" },
				{ type: "text", text: "> [!narration] First look\n> A goblin counts boats." },
			],
			model: "glm-5.3",
			usage: { totalTokens: 1234 },
			duration: 4200,
			...overrides,
		},
	})}\n`;
}

function row(overrides: Partial<BenchRow> = {}): BenchRow {
	return {
		bench_version: "d6d47fe2b823",
		id: "npc-first-look",
		prompt_sha: "abc123def456",
		family: "glm",
		model: "zai/glm-5.3",
		status: "scored",
		prose_score: 4.0,
		rubrics: [
			{ rubric: "True to every fact", score: 4, reason: "Keeps the goblin and the tally." },
			{ rubric: "Second person, present tense", score: 4, reason: "'A goblin counts boats' addresses you." },
		],
		sample_path: "evals/benchmark-samples/d6d47fe2b823/npc-first-look/glm-5.3.md",
		timing: { total_tokens: 1234, duration_ms: 4200 },
		run_at: "2026-09-30T08:44:54Z",
		judge: "claude-opus-5.5",
		...overrides,
	};
}

describe("bench prompts", () => {
	it("hashes the yaml into bench_version and renders byte-exact briefs", () => {
		const { set } = writeSet();
		const entry = set.entries[0]!;
		expect(set.version).toMatch(/^[0-9a-f]{12}$/);
		expect(set.entries.map((e) => e.id)).toEqual(["npc-first-look", "scene-opening"]);
		expect(renderBrief(entry)).toBe(`summary: "The goblin tally-keeper of Reedholt."\n\n${PERSONA} Using only the facts above, write the [!narration] First look\nblock. Reply with only the [!narration] callout block, nothing before or after it.\n`);
		expect(promptSha(entry)).toMatch(/^[0-9a-f]{12}$/);
	});

	it("renders the same brief for the same entry twice: the render is deterministic", () => {
		const { set } = writeSet();
		expect(renderBrief(set.entries[1]!)).toBe(renderBrief(set.entries[1]!));
	});

	it("rejects a prompt without the persona line and duplicate ids", () => {
		const noPersona = YAML_SET.replace(`${PERSONA} Using only the facts above, write the [!narration] First look\n    block.`, "Write the block.");
		expect(() => writeSet(noPersona)).toThrow(/persona line/);
		expect(() => writeSet(YAML_SET.replace("- id: scene-opening", "- id: npc-first-look"))).toThrow(/Duplicate entry id/);
	});
});

describe("bench events", () => {
	it("extracts the final assistant text, tokens and duration of the last turn_end", () => {
		const run = parseEvents(`${turnEnd()}\n{"type":"agent_end","messages":[]}\n${turnEnd({ usage: { totalTokens: 9999 }, duration: 65190 })}`, "run.events.jsonl");
		expect(run.sample).toBe("> [!narration] First look\n> A goblin counts boats.\n");
		expect(run.totalTokens).toBe(9999);
		expect(run.durationMs).toBe(65190);
		expect(run.model).toBe("glm-5.3");
		expect(run.narrated).toBe(true);
		expect(run.fenced).toBe(false);
	});

	it("falls back to the last non-null usage in the stream and strips a code fence", () => {
		const text = [
			'{"type":"session"}',
			turnEnd({ usage: null, duration: 0, content: [{ type: "text", text: "```markdown\n> [!narration] First look\n> A goblin counts boats.\n```" }] }),
			'{"type":"agent_end","messages":[{"role":"assistant","usage":{"totalTokens": 18116}}]}',
		].join("\n");
		const run = parseEvents(text, "run.events.jsonl");
		expect(run.totalTokens).toBe(18116);
		expect(run.durationMs).toBe(0);
		expect(run.fenced).toBe(true);
		expect(run.sample).toBe("> [!narration] First look\n> A goblin counts boats.\n");
	});

	it("fails actionably on a dead run and a broken stream", () => {
		expect(() => parseEvents('{"type":"session"}\n', "r.jsonl")).toThrow(UsageError);
		expect(() => parseEvents("not json\n", "r.jsonl")).toThrow(/r\.jsonl:1 is not JSON/);
	});

	it("derives the model tag from the events filename", () => {
		expect(modelTagOf("evals/benchmark-samples/v/npc-first-look/npc-first-look.glm-5.3.events.jsonl")).toBe("glm-5.3");
		expect(modelTagOf("x/npc-first-look.grok-4.7.rerun.events.jsonl")).toBe("grok-4.7");
	});
});

describe("bench cache", () => {
	it("hits only on version, entry, family, pin and prompt_sha together", () => {
		const cache: BenchFile = { schema: 1, hit_rule: "rule", results: [row()] };
		const key = { version: "d6d47fe2b823", id: "npc-first-look", family: "glm", model: "zai/glm-5.3", promptSha: "abc123def456" };
		expect(findHit(cache, key)?.prose_score).toBe(4.0);
		expect(findHit(cache, { ...key, promptSha: "different1sha" })).toBeUndefined();
		expect(findHit(cache, { ...key, model: "opencode-go/glm-5.3" })).toBeUndefined();
		expect(findHit(cache, { ...key, id: "scene-opening" })).toBeUndefined();
	});

	it("replaces the row for the same version, entry, family and pin", () => {
		const cache: BenchFile = { schema: 1, hit_rule: "rule", results: [row()] };
		upsertRow(cache, row({ prose_score: 2.5, judge: "zai/glm-5.3" }));
		upsertRow(cache, row({ id: "scene-opening" }));
		expect(cache.results).toHaveLength(2);
		expect(cache.results[0]?.judge).toBe("zai/glm-5.3");
	});

	it("treats a missing cache as empty", () => {
		expect(loadCache(join(mkdtempSync(join(tmpdir(), "bench-")), "benchmark.json")).results).toEqual([]);
	});
});

describe("bench judge brief", () => {
	it("fills the committed template with brief, rubrics, sample and grades path, anonymized", () => {
		const { dir, set } = writeSet();
		const template = join(dir, "judge-brief.md");
		writeFileSync(template, "BRIEF\n{{brief}}\nSAMPLE {{sample_id}}\n{{sample}}\nRUBRICS\n{{rubrics}}\nOUT {{grades_path}}\n");
		const entry = set.entries[0]!;
		const sample = "> [!narration] First look\n> A goblin counts boats.\n";
		const filled = renderJudgeBrief(template, { entry, brief: renderBrief(entry), sample, gradesPath: "/tmp/judge/sample-x.grades.json" });
		expect(filled).toContain(renderBrief(entry));
		expect(filled).toContain(`SAMPLE ${anonId(sample)}`);
		expect(anonId(sample)).toMatch(/^sample-[0-9a-f]{8}$/);
		expect(filled).toContain("- True to every fact\n- Second person, present tense");
		expect(filled).toContain("OUT /tmp/judge/sample-x.grades.json");
		expect(filled).not.toContain("{{");
	});
});

describe("bench record", () => {
	it("validates grades against the entry's rubrics and averages to one decimal, half-up", () => {
		const { dir, set } = writeSet();
		const grades = join(dir, "grades.json");
		writeFileSync(grades, JSON.stringify(set.entries[0]!.rubrics.map((rubric, i) => ({ rubric, score: [4, 4, 5, 4][i] ?? 4, reason: `quote ${i}` }))));
		const loaded = loadGrades(grades, set.entries[0]!);
		expect(proseScore(loaded)).toBe(4.3);
		writeFileSync(grades, JSON.stringify(set.entries[0]!.rubrics.map((rubric, i) => ({ rubric: i === 1 ? "a different rubric" : rubric, score: 4, reason: "x" }))));
		expect(() => loadGrades(grades, set.entries[0]!)).toThrow(/does not match the entry/);
		writeFileSync(grades, JSON.stringify(set.entries[0]!.rubrics.map((rubric, i) => ({ rubric, score: i === 1 ? 9 : 4, reason: "x" }))));
		expect(() => loadGrades(grades, set.entries[0]!)).toThrow(/scores 9/);
	});
});

describe("bench leaderboard", () => {
	it("renders the newest run's version, ranks by mean, marks cached rows and notes dark families", () => {
		const cache: BenchFile = {
			schema: 1,
			hit_rule: "a scored row matches",
			results: [
				row(),
				row({ family: "openai", model: "openai-codex/gpt-6.1-sol", prose_score: 4.5, run_at: "2026-09-30T09:00:00Z" }),
				row({ id: "scene-opening", family: "openai", model: "openai-codex/gpt-6.1-sol", status: "dark", prose_score: undefined, rubrics: undefined, run_at: "2026-09-30T09:00:00Z", reason: "quota exhausted on both pins" }),
			],
		};
		const { set } = writeSet();
		const md = renderLeaderboard(cache, set, MATRIX);
		expect(md).toContain("## Prose Benchmark — 2026-09-30T09:00:00Z");
		expect(md).toContain("| openai | openai-codex/gpt-6.1-sol | 1 / 2 | 4.5 | npc-first-look 4.5 | 1 |");
		expect(md).toContain("| glm | zai/glm-5.3 | 1 / 2 (cached) | 4.0 | npc-first-look 4.0 | 2 |");
		expect(md).toContain("> openai — dark: scene-opening (quota exhausted on both pins)");
	});

	it("says plainly when nothing is scored yet", () => {
		const { set } = writeSet();
		const md = renderLeaderboard({ schema: 1, hit_rule: "a scored row matches", results: [] }, set, MATRIX);
		expect(md).toContain(`## Prose Benchmark — not yet run for bench_version ${set.version}`);
	});
});

describe("cf bench (committed repo state)", () => {
	it("committed briefs match evals/prose-bench.yaml: no drift", async () => {
		const run = await cf(["bench", "briefs", "--check"]);
		expect(run.code).toBe(0);
		expect(run.stdout.trim()).not.toMatch(/^DRIFT/m);
	});
});
