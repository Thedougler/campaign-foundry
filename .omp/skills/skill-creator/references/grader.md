# Grade → `grading.json`

Read when turning a paired run's Checks output and `grades.json` into `grading.json`, or when running a second Grade on a saved run. The grader is the `prose-grader` native `task` dispatch of the recipe's Grade step in `evals/README.md` § [Run a case](../../../../evals/README.md#run-a-case); its task carries only the case rubrics verbatim and numbered, the run's `outputs/` path and the case sources. Configuration names, Checks and `reply.txt` stay out of it, so the grader judges the writing alone.

## Map

1. **Validate.** `grades.json` must parse as `{"grades":[{"rubric","pass","reason"}]}` with exactly one entry per case rubric, in order, with identical rubric text and a boolean `pass`. Anything else — an empty file, prose, a fenced block, a missing rubric — is a grading error for that run: record it in the run's `benchmark.json` notes, write no `grading.json`, and go to step 3. Done when the file is valid or the run carries a named grading error.
2. **Write.** Build `grading.json` per [`schemas.md`](schemas.md): first, when the case has `checks`, one `{"text":"Checks","passed":<summary line starts with "ok:">,"evidence":<the summary line of checks.txt plus every FAIL line>}`; then one entry per grade, mapping `rubric → text`, `pass → passed`, `reason → evidence` unchanged. Compute `summary` from the booleans. Done when every rubric and the Checks result appear once and the counts agree with the booleans.
3. **Rename.** Move `grades.json` to `grades.raw.json`; `bun run cf -- eval review` reads `grades.json` first and fails on invalid JSON. Done when the run directory holds no `grades.json`.

A `checks.txt` ending in `exit 2` is a Checks usage or execution error. The run gets no `grading.json`, only a note in `benchmark.json`.

## Second Grade

To test grader variance, dispatch the same Grade task again on the same saved `outputs/`, `cp agent://<id>` into a second file (`grades.2.json`), and compare verdicts rubric by rubric. A disagreement means the rubric is defective; repair it in the case.
