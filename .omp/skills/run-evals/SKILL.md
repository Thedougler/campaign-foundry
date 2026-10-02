---
name: run-evals
description: Eval — run or rerun committed skill evals after a request or reported regression, and report. Authoring goes to skill-creator; Matrix ranking to dnd-benchmark; improving a live content skill to the Hillclimb in evals/README.md.
---

# Run skill evals

This skill is the Eval branch of `evals/README.md`, which defines the terms and owns grounding, isolation, Check/Grade, evidence and lifetime. An Eval measures and reports; skill text stays as found. After the report, the parent decides whether Design allows a Hillclimb.

`runSkillEvals` owns one skill/case-selection run. `./evals/eval-queue.ts` is plumbing: `EVAL_QUEUE_DEFAULTS`, `jobsForSkill`, and `reportPassed`.

## Steps

1. **Load.** From the repository root in omp JS Eval:

   ```js
   const { runSkillEvals } = await import("./evals/run.ts");
   const { EVAL_QUEUE_DEFAULTS, jobsForSkill, reportPassed } = await import("./evals/eval-queue.ts");
   ```

   Done when those four names are in scope, or the exact load error is recorded.

2. **Queue.** Expand a requested skill with `jobsForSkill(skill)`. When the DM or parent named case ids, those ids are the queue. Each job is one run cell: `runSkillEvals({ skill, caseIds: [id] })`.

   Done when the pending list is one job per selected case.

3. **Fly.** Start run cells until in-flight evals equal `EVAL_QUEUE_DEFAULTS.evalConcurrency` or the pending list is empty. Each run cell uses deadline `0` and returns the report with `reportPassed(report)`:

   ```js
   const report = await runSkillEvals({ skill: "<skill>", caseIds: ["<id>"] });
   ({ report, passed: reportPassed(report) });
   ```

   Done when every started cell is a single-id `runSkillEvals` call and in-flight evals sit at the default cap, or at the remaining job count when that is smaller.

4. **Refill.** The moment a case finishes — pass, Check or Grade quality failure, or named harness, access, isolation or preparation prerequisite — record its report as it stands and start the next pending job, so in-flight evals return to `evalConcurrency` until the queue is empty.

   Done when every finished case has a recorded report and in-flight evals sit at the cap, or at the remaining job count when that is smaller.

5. **Report.** Account for every selected case using the README evidence rules.

   Done when the account covers every selected case, including quality failures, named prerequisites and unexecuted ids; every skill file is byte-identical to its state at Load; and Session storage is closed per the README unless the DM asked to retain it.
