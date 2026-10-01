---
name: run-evals
description: Fixture evals — run or rerun a skill's committed evals/cases.yaml in scratch Worlds, check every case, independently grade its rubrics, and revise failures to a full-suite pass. Use when asked to execute committed cases or when an issue explicitly requires fixture evals. Skill authoring and paired baseline measurement belong to skill-creator; cross-family Matrix Narration ranking belongs to dnd-benchmark.
---

# Run fixture evals

Run committed cases to one complete passing suite. Before dispatching, read `.omp/AGENTS.md` for native agents, concurrency and completion/model evidence. If the request is authoring or paired baseline measurement, read `skill-creator` instead; for cross-family Matrix Narration ranking, read `dnd-benchmark`. Fixture artifacts stay in scratch workspaces, separate from benchmark caches.

## Steps

1. **Validate the suite.** Before authoring or preparing eval data, read `evals/README.md` for the grounding contract. Use an explicitly supplied cases-file path (`--cases` or equivalent) when present; a missing or invalid explicit file is a named preparation error, not a fallback request. Otherwise resolve `.omp/skills/<skill>/evals/cases.yaml`, then `.agents/skills/<skill>/evals/cases.yaml`, then `evals/cases/<skill>.yaml`; report all searched paths and stop only if none exists. Record absolute `CASES`, the target skill's actual `SKILL_ROOT` and repository paths independently of the case-file location. Before preparation, read `evals/check.ts` at `loadCases` and `toRegExp`: these are the authoritative schema and accepted regex convention. Import and call `loadCases` from the real repo root using Bun; require a nonempty suite. Compile every `canon` and `absent` pattern using the checker's convention (plain patterns use multiline mode; `/pattern/flags` uses its supplied flags), rather than creating a second schema validator. Retain filename, case id and check/page context for any error.
   **Done when** all cases pass the existing schema and every regex compiles, or a named PREPARATION error stops the run before dispatch.

2. **Prepare scratch Worlds.** From the real repo root, call the shared preparer once per validated case:

   ```bash
   bun run eval:prepare --cases <absolute-cases.yaml> --case <case-id>
   ```

   Save its JSON response and the case-id → workspace mapping. Use its absolute `root`, `wiki`, `raw`, `archive`, `baseline` and `manifest` paths in subsequent steps; `$W` below is `root`, and `$BASELINE` is the returned Wiki `baseline` path. Follow `evals/README.md` for scratch-local QMD setup and runner isolation. A failed preparation or isolation gate is a named PREPARATION error and stops that case before dispatch.
   **Done when** every case has a prepared manifest and baseline, successful scratch-local indexing/embedding and no unresolved preparation errors.

3. **Execute cases.** Dispatch one `test-subject` per case with `isolated: true` when the omp task interface supports it. Keep the prepared scratch root and all runner outputs outside its omp isolation workspace; repository files remain read-only. The parent performs preparation and final verification from the original real repo, not from a task workspace. The brief names the absolute target skill path, including the declared uncommitted candidate version; omp isolation must not silently substitute a different version. Preserve that version in the run evidence. If omp isolation is unavailable, state the missing capability explicitly and retain the same scratch-path/QMD gates without changing harness configuration. Read `omp://tools/task.md` only when troubleshooting omp isolation. omp isolation does not isolate live vault access or inherited QMD MCP. Substitute concrete absolute paths into this brief:

   > You are the Agent in `AGENTS.md`, working for the DM. The orchestrator's prepared project root is `$W` and its manifest is `<absolute-manifest-path-returned-by-eval:prepare>`; read that manifest before execution. Wiki is `$W/wiki`, Raw is `$W/raw`, and Archive is `$W/archive`. Read/edit these filesystem paths directly; use neither live `vault://_/` nor inherited parent QMD MCP tools. Run every QMD command from `$W` with `env -u QMD_CONFIG_DIR qmd <command>` so QMD discovers `$W/.qmd/index.yml` and `$W/.qmd/index.sqlite` locally. An explicit named index overrides this local discovery; use the observed status/collection-path gate in `evals/README.md` before update/embed. Run repo tooling from `<absolute-repo-root>` with scratch flags (`--vault $W/wiki --root $W`). Use `<absolute-SKILL_ROOT>/SKILL.md`. The DM says: "<case prompt>". Write your final reply to the DM, exactly as you'd send it, to `$W/.eval/output.md`.

   Include the dispatch's omp isolation status in the brief and evidence. Keep repository/omp isolation workspace files read-only; content mutations, indexes and outputs belong only to `$W`. The absolute skill and tooling paths above refer to the declared original-repo versions, not implicit workspace-relative replacements.

   Retain each runner's actual `resolvedModel` with its completion evidence. For omp isolation dispatches, preserve observed `isolated`, `hasRootChanges`, `patchPath` and `branchName` metadata; require `isolated: true` and evidence of no repository-root changes (`hasRootChanges: false` or an observed absence of root patch changes). Missing evidence cannot establish omp isolation. Unexpected root changes invalidate the run: preserve recovery artifacts and stop; do not infer whether changes were applied. If omp isolation is unavailable, report that gap alongside the preserved scratch isolation evidence.
   **Done when** every case has `$W/.eval/output.md` or a recorded execution error, and each omp isolation execution has observed isolation/no-root-change evidence.

4. **Check artifacts.** For each executed case, run from the real repo root:

   ```bash
   bun run eval:prepare --verify "$W"
   bun run eval:check <skill-name> <case-id> $W/wiki --cases <absolute-cases-file> --root $W --templates $W/wiki/templates
   diff -ru "$BASELINE" "$W/wiki" -x templates
   ```

   Preserve verification output, the checker's PASS/FAIL lines verbatim and the prepared-baseline diff. A diff exit indicating changes is evidence, not an execution failure. Failed source/isolation verification is a PREPARATION error, not a skill grade. Checker exit 2 is a usage or cases-file preparation error: fix inputs and re-prepare before grading.
   **Done when** every executed workspace passes source/isolation verification and every check has a recorded PASS or FAIL, with preparation errors resolved.

5. **Grade rubrics.** Dispatch a fresh `prose-grader` per case, independent of execution, with all that case's rubrics, `$W/.eval/output.md` and the baseline diff. Require `$W/.eval/grades.json` as an array, for example:

   ```json
   [{"rubric":"Exact rubric text from cases.yaml","pass":true,"reason":"Quoted evidence supporting the judgment."}]
   ```

   Validate exactly one entry per rubric, verbatim rubric text, boolean `pass` and a quoted-evidence string `reason`; reject missing, extra or malformed entries before totaling. Retain the grader's actual `resolvedModel` with its completion evidence.
   **Done when** every rubric of every executed case has a valid pass/fail judgment and reason.

6. **Verify and report coverage.** After execution and grading, run `bun run eval:prepare --verify "$W"` for every executed workspace and retain the output. A source/isolation mismatch invalidates the run; preserve it and stop. Produce one table with case, actual runner model, actual grader model, checks passed/total, rubrics passed/total and each failure's reason. Include every case and the preserved check evidence; list preparation/execution errors separately from check/rubric failures. Unexecuted cases never count as passes.
   **Done when** the report accounts for every case, check and rubric, both model identities and every miss, and every executed workspace passes final source/isolation verification.

7. **Revise and rerun.** Treat failures as skill defects until evidence shows otherwise. Give `skill-writer` the failing evidence, rerun failing cases in fresh scratch Worlds after revision, and repeat. Once targeted reruns pass, run the entire committed suite afresh against the revised skill; earlier passes do not substitute for this run.
   **Done when** one complete run of the final revision passes every check and rubric, with zero failures and zero unexecuted cases.
