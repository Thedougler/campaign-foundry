# Eval loop — paired with-skill/baseline runs

Read this for skill-creator step 4. Every run is one pass of the per-case recipe in `evals/README.md` § [Run a case](../../../../evals/README.md#run-a-case); read that section first. Read [`schemas.md`](schemas.md) before writing artifacts.

## Layout

```
<workspace>/                          from step 1, under OS temp
├── brief.md
├── skill-snapshot/                   from step 2, revisions only
└── iteration-<N>/
    ├── with_skill/<case-id>/         eval_metadata.json, reply.txt, outputs/, checks.txt, grading.json
    ├── <baseline>/<case-id>/         same shape
    ├── benchmark.json
    ├── review.html
    └── feedback.json
```

- `<baseline>` is `without_skill` for a new skill and `old_skill` for a revision.
- Each `<config>/<case-id>/` directory is the recipe's `$out`. Repeat observations use `<case-id>-run<k>/` beside it, each a full run directory.

## Run the pair

Both configurations run the recipe with the same case prompt, model role and live Wiki; only the Runner task's skill line differs:

| Configuration | Skill line in the Runner task |
| --- | --- |
| `with_skill` | `Read <live skill path>/SKILL.md and follow it.` |
| `old_skill` | `Read <workspace>/skill-snapshot/SKILL.md and follow it.` |
| `without_skill` | none |

The iteration follows the recipe's [Concurrency and cleanliness](../../../../evals/README.md#concurrency-and-cleanliness) with `<workspace>/iteration-<N>` as its Eval root: record the Wiki state before the Runner batch and diff it after the last grade.

1. **Runners.** Dispatch every selected case's two Runners in one `task` call, as the recipe's Runner step specifies, naming each item `<CaseCamel>With` or `<CaseCamel>Base` (repeat observations append `Run<k>`). Names can repeat across iterations, so take each run's `agent://` id from the task result. Done when every item has settled.
2. **Save, split and Check.** In one Bash call, per run, set `out=<workspace>/iteration-<N>/<config>/<case-id>` as the recipe's `$out`, then run its Save and split and Checks steps; Checks land in `$out/checks.txt`. Write `$out/eval_metadata.json` per [`schemas.md`](schemas.md) so the viewer shows the prompt. A Runner task that failed or was aborted, or Checks exit 2, is that run's execution error. Done when every run directory holds `reply.txt` and `checks.txt`, or its execution error is recorded.
3. **Graders.** For every run whose case has rubrics and whose `outputs/reply.md` exists, dispatch the recipe's Grade in one `task` call, named `<CaseCamel>WithGrade` or `<CaseCamel>BaseGrade`, then `cp agent://<id> "$out/grades.json"` per run. Done when each such run holds `grades.json` or a named grading error.

**Done when** every selected case has both run directories, each holding `eval_metadata.json`, `reply.txt`, `checks.txt`, and `outputs/reply.md` or a recorded execution error, plus `grades.json` where the case has rubrics.

## Grade

Map each run's Checks result and `grades.json` into `grading.json` under [`grader.md`](grader.md).

**Done when** every run has a `grading.json` or a recorded execution or grading error, and no run directory still holds `grades.json`.

## Comparability

A pair counts toward paired summaries only when neither run has an execution or grading error. Both runs share the live Wiki and the `@TEST-SUBJECT` role, so no further admission test applies. Keep excluded pairs in `benchmark.json` `runs[]` with the reason in `notes[]`.

**Done when** each pair has a recorded comparable/excluded decision.

## Aggregate

Write `<iteration-dir>/benchmark.json` by hand per [`schemas.md`](schemas.md) from the iteration's `grading.json` files and pair decisions. Compute each summary with `calculateStats` over the comparable observations, from the repo root:

```bash
bun -e 'import { calculateStats } from "./evals/authoring.ts"; console.log(JSON.stringify(calculateStats([1, 0.5, 1])))'
```

**Done when** `benchmark.json` accounts for every run directory, and its summaries use only comparable pairs.

## Viewer and feedback

```bash
bun run cf -- eval review <iteration-dir> --skill-name <name> --benchmark <iteration-dir>/benchmark.json
```

From iteration 2 on, add `--previous-workspace <workspace>/iteration-<N-1>`. The page is written to `<iteration-dir>/review.html` (override with `--static`); its path comes back in JSON.

1. Open the page in the browser and confirm the Outputs and Benchmark tabs show this iteration's runs and stats.
2. Hand the DM the controls: Outputs walks each run (prompt, pages, `reply.md`, grading, feedback box, previous iteration's output and feedback from iteration 2 on); Benchmark shows per-configuration stats and notes. **Download feedback.json** exports the review.
3. Save the download verbatim as `<iteration-dir>/feedback.json`.

**Done when** both tabs show this iteration, the DM has reviewed the outputs, and the downloaded feedback is saved verbatim. Rendering the page is not review.

## Optional comparison and diagnosis

For "is the revision actually better?" on a comparable pair, follow [`comparator.md`](comparator.md); for an explanation of results, follow [`analyzer.md`](analyzer.md). Each is a native `task` dispatch to `prose-grader` with that reference's assignment as the task and its [`schemas.md`](schemas.md) shape as `outputSchema`; `cp agent://<id>` to `<iteration-dir>/comparison.json` or `analysis.json`. Both are advisory and leave Grades and `benchmark.json` unchanged.

**Done when** each requested comparison or analysis is saved and its A/B mapping recorded in `brief.md`.

## Report

Report per-case results, pair exclusions and paired deltas in chat. The workspace is scratch under OS temp; copy out whatever the DM asks to keep.
