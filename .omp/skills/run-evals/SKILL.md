---
name: run-evals
description: Run or rerun committed skill evals after a request or reported regression. Paired authoring belongs to skill-creator; Matrix Narration ranking belongs to dnd-benchmark.
---

# Run skill evals

Read `evals/README.md` for shared access, grounding, Check/Grade, evidence and lifetime policy. Use the native roles and protected grants it requires.

## Steps

1. **Load.** In omp JS Eval, from the repository root:

   ```js
   const { runSkillEvals } = await import("./evals/run.ts");
   ```

   Done when the module's entry is available, or its exact loading error is recorded.
2. **Run and report.** Set the JS Eval call's deadline to `0`, then:

   ```js
   const report = await runSkillEvals({ skill: "theatre-of-the-mind" });
   report;
   ```

   Substitute the requested skill. The entry owns preparation, protected native dispatch, Checks, independent Grades, completion verification and cleanup. For targeted reruns, add `caseIds: ["<case-id>"]`; omit it for the full suite. Report every selected case using the README's evidence rules. Done when the returned report accounts for every selected case, or the exact prerequisite/execution error is reported.

## Failure-driven iteration

For quality failures, send evidence to native `skill-writer` as a process-revision brief. Keep evaluator criteria and failure coaching out of Runner requests. Rerun affected cases in fresh Worlds through the same entry; after targeted passes, run the entire committed suite afresh against the final skill revision. Harness or access failures need their exact prerequisite resolved, not a skill workaround or unrestricted CLI substitute.

Done when one complete final suite passes every Check and Grade, or the requested report explicitly accounts for unresolved quality failures and unavailable prerequisites.
