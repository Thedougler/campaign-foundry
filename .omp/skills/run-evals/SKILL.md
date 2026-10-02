---
name: run-evals
description: Run or rerun a skill's committed evals/cases.yaml tasks, Check artifacts and independently Grade writing. Use for requested committed-case execution or reported regressions requiring skill evals. Paired authoring belongs to skill-creator; Matrix Narration ranking belongs to dnd-benchmark.
---

# Run skill evals

Read `.omp/AGENTS.md` for native delegation and `evals/README.md` before preparation or dispatch. The README owns access, lifetime and current-source grounding; this skill runs its Eval job. Preserve configured model roles, providers and approvals.

## Steps

1. **Validate.** Resolve an explicit cases path first; an invalid explicit path is a named PREPARATION error. Otherwise discover `.omp/skills/<skill>/evals/cases.yaml`, then `.agents/skills/<skill>/evals/cases.yaml`, then `evals/cases/<skill>.yaml`. Record absolute cases, repository and actual target skill paths. Read `evals/check.ts` at `loadCases` and `toRegExp`, then use that loader/schema and regex convention. Done when every selected case and regex validates, or the exact preparation error is recorded before dispatch.
2. **Prepare.** Open the owning Session's storage with `eval_session` and prepare once per case from the real repo:

   ```bash
   bun run eval:prepare --cases <absolute-cases.yaml> --case <case-id> --session-root <S>
   ```

   Save returned JSON privately: `sessionRoot`, `root` (`$W`), `wiki`, `raw`, `archive`, `baseline`, `manifest`, `runnerInput` and `qmd`. Additional observations clone the frozen preparation with `--from "$W" --session-root <S>`. Follow the README's live-read-only QMD proof; retain source hashes and current skill version. Done when each case has independent content, a private frozen baseline and an immutable public descriptor, or a named PREPARATION error.
3. **Dispatch.** Bind `evals/runner-tools.ts`'s `bindRunnerTools(prepared, options, register)` using the installed parent JS tool registrar. Set `targetSkillRoot` to the exact live candidate; `skillRoot` is that candidate, an assigned revision snapshot, or omitted for a no-skill baseline. Dispatch the returned brief and tool names through native delegation:

   ```js
   agent(runnerBrief, {
     agent: "test-subject",
     isolated: true,
     apply: false,
     tools: toolNames
   })
   ```

   Keep prepared Worlds outside omp worktrees and batch independent handles in waves of at most four. The generated brief carries the DM ask verbatim and public operational paths; supply production preferences/start-here, capability, full File and output instructions without private criteria or failure coaching. Enforcement binds the grant and removes evaluator-only inherited context. If native isolation or inherited enforcement is unavailable, report the exact prerequisite and stop dispatch rather than weakening configuration. Done when every selected case has output or an explicit execution error, with actual completion identity/metrics and observed `isolated: true`, `hasRootChanges: false` evidence. Unexpected root changes invalidate a run.
4. **Check.** From the real repo, run the following for each executed World:

   ```bash
   bun run eval:prepare --verify "$W"
   bun run eval:check <skill> <case-id> "$W/wiki" --cases <absolute-cases.yaml> --root "$W" --templates "$W/wiki/templates"
   diff -ru "$BASELINE" "$W/wiki" -x templates
   ```

   Preserve PASS/FAIL output and the private starting-baseline diff. Diff changes are evidence, not execution failure. Source/access drift invalidates the run; checker exit 2 is a usage/preparation error. Done when every artifact constraint has an observed verdict and every executed World has valid verification, or its invalidation is recorded.
5. **Grade.** Dispatch a fresh independent `prose-grader` with `blocking: true` and `outputSchema` `{grades:[{rubric,pass,reason}]}`. Supply the authored writing and exact rubrics, plus private starting-source excerpts needed for source-relative judgments. Checks and execution logs remain parent evidence. Save Grades under `<S>/control/<id>/`, not in Runner-visible content. Require exactly one entry per rubric with verbatim rubric text, boolean `pass` and a reason quoting the writing/source evidence. Done when every usable output has valid independent Grades and actual grader identity, or an explicit grading error.
6. **Report and close.** Verify executed Worlds again after Grade. Report every case, actual Runner/grader identity, checks and rubrics passed/total, quality failures and separate preparation/execution/isolation errors. Omit unavailable metrics; unexecuted cases are not passes. Save temporary human-review dumps under `<S>/audit/` when requested. After all child jobs, Grades and reporting settle, close the returned `sessionRoot` using the README's lifecycle operation. Done when coverage and verdicts account for every criterion and temporary storage has been closed; only an explicitly requested durable export survives.
7. **Revise and rerun.** Give failing evidence to `skill-writer` as a process-revision brief, keeping it out of later Runner requests. Rerun affected cases in fresh Worlds; once targeted runs pass, run the entire committed suite afresh against the final skill revision. Done when one complete final suite passes all Checks and Grades, or the requested report explicitly records unresolved quality failures or exact unavailable prerequisites.
