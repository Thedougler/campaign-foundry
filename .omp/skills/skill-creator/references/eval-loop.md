# Eval loop — paired with-skill/baseline runs

Read this when planning or running skill-creator step 4. Before authoring eval data, read `evals/README.md` for grounding, Runner access and lifetime. Before writing artifacts, read [`schemas.md`](schemas.md) for evals.json, grading.json, benchmark.json, comparison.json and analysis.json. `.omp/AGENTS.md` governs delegation.

## Layout

```
<S>/authoring/<skill>/
├── brief.md                          from step 1
├── skill-snapshot/                   from step 2, revisions only
└── iteration-<N>/
    ├── <eval-name>/
    │   ├── eval_metadata.json
    │   ├── with_skill/run-1/         outputs/, report.json, source-hashes.json, grading.json
    │   └── <baseline>/run-1/         same shape
    ├── benchmark.json
    ├── review.html
    └── feedback.json
```

- `<eval-name>` is descriptive (`migrate-legacy-table`), not `eval-0`.
- `<baseline>` is `without_skill` for a new skill (no skill at all) and `old_skill` for a revision (reads `<workspace>/skill-snapshot/`). With-skill runs read the live candidate.
- Repeat observations extend the same shape: `run-2/`, `run-3/`, … with identical contents.

## Inputs

Build `<workspace>/evals.json` in the existing schema from selected case IDs in the skill's `evals/cases.yaml` and their private criteria, recording the ID-to-case mapping in the authoring brief. Save `<iteration-dir>/<eval-name>/eval_metadata.json` with `eval_id`, `eval_name`, the natural `prompt` and `assertions` copied from the normalized expectations; the static viewer reads it.

**Done when** every selected case has its mapping in the brief and its `eval_metadata.json`.

## Run the pair

Each configuration is one `runSkillEvals` call over the same case ids against the same live sources; only the assigned skill differs. From the repository root in omp JS Eval, start both configurations together with deadline `0`, retaining storage for the copy below:

```js
const { runSkillEvals } = await import("./evals/run.ts");
const caseIds = ["<case-id>"];
const [withSkill, baseline] = await Promise.all([
  runSkillEvals({ skill: "<skill>", caseIds, closeSession: false }),
  runSkillEvals({ skill: "<skill>", caseIds, closeSession: false, snapshotRoot: "<workspace>/skill-snapshot" }),
]);
```

For a new skill, the baseline call takes `baseline: true` instead of `snapshotRoot`. Pass `skillRoot` when the candidate lives outside its catalog path. Each call binds Runner tools, dispatches `test-subject`, runs Checks, dispatches the Grade and returns one report entry per case.

For each case report, copy the contents of its `outputRoot` (pages, `reply.md`, `.deleted.json`) into its run directory's `outputs/`, copy `<controlRoot>/source-hashes.json` and the report entry as `report.json`, then map its `grades` into `grading.json` under [`grader.md`](grader.md). An `executionError` or `gradeError` stays an explicit error in `report.json`. Close each returned `sessionRoot` under `evals/README.md` once its artifacts are copied.

**Done when** every selected case has both configurations' outputs, reports and grades or explicit errors copied, and every `runSkillEvals` Session root is closed.

## Comparability

A pair contributes to paired summaries only when all three hold:

1. both reports carry `completionEvidence` and no `executionError`, so isolation held and the live sources were unchanged through Grade;
2. both `source-hashes.json` files agree on every shared path;
3. where actual model identity and thinking are observed for both runs, they match; when unobserved, record them as unavailable in `notes`.

The baseline grant rejects the live candidate and its aliases, so baseline isolation is enforced by access control rather than inferred from histories. Keep every excluded pair visible in `benchmark.json` `runs[]`; `notes[]` names its reason.

**Done when** each pair has a recorded comparable/excluded decision with its reason.

## Aggregate

Build `<iteration-dir>/benchmark.json` in one parent-controlled Node operation using [`schemas.md`](schemas.md) and `calculateStats(values)` from `evals/authoring.ts`. Node owns the import; the omp JS Eval package loader does not load this helper. The parent owns the comparability decision and selects observed metric values before calling it. To calculate one selected metric, set `metric_values_json` to its saved JSON-array path and run from the repo:

```bash
node --input-type=module -e '
  import { calculateStats } from "./evals/authoring.ts";
  import { readFileSync } from "node:fs";
  const values = JSON.parse(readFileSync(process.argv[1], "utf8"));
  console.log(JSON.stringify(calculateStats(values)));
' "$metric_values_json"
```

The helper returns `{mean, stddev, min, max}` with sample standard deviation. Use the same Node import in the parent aggregation operation; selected arrays contain only observed, comparable values.

Populate from the iteration's artifacts:

- `metadata` — skill name and path, timestamp, evals run, runs per configuration; `executor_model` only when observed with-skill identities establish a common model. Record an observed analyzer identity only after analysis runs. Derive identities and counts from artifacts; mixed/missing identities are explained in `notes`, not assigned a fictitious common model.
- `runs[]` — one entry per dispatched run, none silently dropped. Preserve schema fields `eval_id`, `eval_name`, `configuration`, `run_number`, nested `result`, `expectations` and per-run `notes`. `configuration` is the directory name (`with_skill` / `without_skill` / `old_skill`); order with-skill before its baseline counterpart. Populate observed grading counts/rate and observed `time_seconds`, `tokens`, `tool_calls`, `errors` only; unavailable grades or metrics are omitted, with errors/evidence limitations in notes.
- `run_summary` — insert `with_skill` then the baseline configuration; each contains `calculateStats` results for `pass_rate`, `time_seconds`, `tokens` from comparable pairs only. For each metric, include a pair only when both sides have that metric, so the two means use identical paired observations. Omit unobserved metric summaries rather than calling the helper with an empty list or fabricated values.
- `run_summary.delta` — INSIDE `run_summary`, after the configurations, never top-level. With-skill mean minus baseline mean for the same paired observations, formatted as schema strings (`pass_rate`: `"+0.50"`, `time_seconds`: `"+13.0"`, `tokens`: `"+1700"`); omit unavailable metrics.
- `notes[]` — pair exclusions established by the comparability decision, plus evidence limitations. With no comparable pairs, omit `run_summary` and its delta and report “Paired summary and delta unavailable” in Markdown.

Write the existing `<iteration-dir>/benchmark.md` from the same data in that parent operation: observed per-run results, available paired stats/deltas and exclusion notes. Label missing values unavailable; a Markdown report is a view of the saved data, not another aggregation pipeline.

**Done when** both benchmark artifacts account for every dispatched run and agree on observed metrics, paired summaries and exclusions.

## Viewer and feedback

```bash
cf eval review <iteration-dir> \
  --skill-name <name> \
  --benchmark <iteration-dir>/benchmark.json \
  --static <iteration-dir>/review.html
```

From iteration 2 on, add `--previous-workspace <workspace>/iteration-<N-1>`. Review always writes a standalone static file; omitting `--static` uses `<iteration-dir>/review.html`. The viewer renders each run's `outputs/` pages and `reply.md`. Use the JSON-reported path for browser review.

Then:

1. Open the file in the browser and confirm the Outputs and Benchmark tabs render this iteration's runs and stats.
2. Hand the DM the controls: the Outputs tab walks each case (prompt, outputs, formal grades, feedback box, previous iteration's output and feedback from iteration 2 on); the Benchmark tab shows the per-configuration stats and notes. **Download feedback.json** downloads the review export.
3. Import the download verbatim as `<iteration-dir>/feedback.json`. Its `reviews[]` entries carry `run_id` and `feedback`; empty feedback means the run looked fine.

**Done when** both tabs visibly show this iteration, the DM has reviewed the outputs, and the downloaded feedback is saved verbatim. Rendering a viewer alone is not human review.

## Optional blind comparison

For "is the revision actually better?" on a comparable pair, read [`comparator.md`](comparator.md) and dispatch a fresh native `prose-grader` with that blind assignment's `outputSchema` and outputs labeled A/B. Keep the label-to-configuration mapping private; remove version identity and revealing path headers from copies while preserving substantive text. The parent saves the yielded winner (`A`, `B` or `tie`) and quoted evidence as `comparison.json`; comparison is advisory, separate from pass/fail Grades and summaries. When diagnosis is requested, read [`analyzer.md`](analyzer.md): the parent analyzes the saved evidence or briefs a fresh `prose-grader` with its analysis `outputSchema`, then maps the result into `analysis.json`. Use the configured native role, not another agent definition. Capture separate dispatch evidence whenever a grader is used.

**Done when** the requested comparison/analysis artifacts and their separate observed provenance are saved.

## Close Session storage

After requested grading, review and reporting settle, close the authoring Session root under `evals/README.md`. Copied replies, grades, snapshots and authoring artifacts share the creating Session's temporary lifetime. Durable export or cross-Session continuation requires an explicit DM request.

**Done when** all child jobs have settled, the coverage/comparability report is delivered and every Session root has been closed, or the explicitly requested durable export has been recorded before closing.
