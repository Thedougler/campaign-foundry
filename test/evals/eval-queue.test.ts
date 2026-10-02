import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { EVAL_QUEUE_DEFAULTS, jobsForSkill, reportPassed } from "../../evals/eval-queue.ts";
import type { SkillEvalReport } from "../../evals/run.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

function report(pass: boolean, extra: Partial<SkillEvalReport["cases"][0]> = {}): SkillEvalReport {
	return {
		skill: "demo",
		skillRoot: "/tmp/demo",
		casesFile: "/tmp/demo/evals/cases.yaml",
		sessionRoot: "/tmp/session",
		cases: [
			{
				id: "a",
				worldRoot: "/tmp/a",
				checks: [],
				checkFailed: 0,
				grades: pass ? [{ rubric: "ok", pass: true, reason: "ok" }] : [{ rubric: "ok", pass: false, reason: "fail" }],
				...extra,
			},
		],
	};
}

describe("eval-queue plumbing", () => {
	it("defaults to four in-flight evals", () => {
		expect(EVAL_QUEUE_DEFAULTS).toEqual({ evalConcurrency: 4 });
	});

	it("reads pass/fail from the structured report only", () => {
		expect(reportPassed(report(true))).toBe(true);
		expect(reportPassed(report(false))).toBe(false);
		expect(reportPassed(report(true, { checkFailed: 1 }))).toBe(false);
		expect(reportPassed(report(true, { executionError: "verify failed" }))).toBe(false);
		expect(reportPassed(report(true, { gradeError: "no grades" }))).toBe(false);
	});

	it("lists one job per committed case", () => {
		expect(jobsForSkill("theatre-of-the-mind", { repositoryRoot: repoRoot })).toEqual([
			{ skill: "theatre-of-the-mind", caseIds: ["narration-slots"] },
			{ skill: "theatre-of-the-mind", caseIds: ["fatespinner-chat"] },
			{ skill: "theatre-of-the-mind", caseIds: ["gold-caste-handout"] },
			{ skill: "theatre-of-the-mind", caseIds: ["wolfrabbit-opening"] },
			{ skill: "theatre-of-the-mind", caseIds: ["wolfrabbit-first-sight"] },
			{ skill: "theatre-of-the-mind", caseIds: ["bloodhawk-first-sight"] },
			{ skill: "theatre-of-the-mind", caseIds: ["landing-sign-opening"] },
			{ skill: "theatre-of-the-mind", caseIds: ["session12-previously-on"] },
			{ skill: "theatre-of-the-mind", caseIds: ["way-out-closing"] },
		]);
	});
});
