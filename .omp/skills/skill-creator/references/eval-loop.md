# Eval loop — paired with-skill/baseline runs

Read this when planning or running skill-creator step 4. Before authoring or preparing eval data, read `evals/README.md` for the grounding contract. Before writing artifacts, read [`schemas.md`](schemas.md) for evals.json, grading.json, timing.json, benchmark.json, comparison.json and analysis.json. The native provenance and capture rules below govern observed completion evidence; `.omp/AGENTS.md` governs delegation.

## Layout

```
<S>/authoring/<skill>/
├── brief.md                          from step 1
├── skill-snapshot/                   from step 2, revisions only
└── iteration-<N>/
    ├── <eval-name>/
    │   ├── with_skill/run-1/         brief.md, outputs/, model.json, timing.json, grading.json
    │   └── <baseline>/run-1/         same shape
    ├── benchmark.json
    ├── review.html
    └── feedback.json
```

- `<eval-name>` is descriptive (`migrate-legacy-table`), not `eval-0`.
- `<baseline>` is `without_skill` for a new skill (no skill at all) and `old_skill` for a revision (reads the snapshot). The with-skill brief reads the live candidate; the `old_skill` brief reads `<workspace>/skill-snapshot/SKILL.md`.
- Repeat observations extend the same shape: `run-2/`, `run-3/`, … with identical contents.

## Prepare frozen inputs

Build `<workspace>/evals.json` in the existing schema from selected active YAML case IDs and private criteria, recording the ID-to-case mapping in the authoring brief.

Save `<iteration-dir>/<eval-name>/eval_metadata.json` with `eval_id`, `eval_name`, the natural `prompt` and `assertions` copied from the normalized expectations. This private review metadata keeps the static viewer's prompt and criteria aligned with the selected case.

From the real repo, prepare each grounded case once in the open Session:

```bash
bun run eval:prepare --cases <absolute-cases.yaml> --case <case-id> --session-root <S>
bun run eval:prepare --from <prepared-root> --session-root <S>
bun run eval:prepare --from <prepared-root> --session-root <S>
```

Save all three JSON responses. Assign the two clones to with-skill and baseline; neither runs in the frozen parent. Repeat observations and later iterations clone that same parent, keeping source inputs fixed across the comparison. Refreshing sources is a separate explicit preparation, identified as a new input snapshot.

For each clone, retain returned paths, `sessionRoot`, `runnerInput`, source hashes and live-read-only QMD evidence under `evals/README.md`. Save case mappings and private manifest paths in parent evidence, separate from `<run-dir>/brief.md`'s Runner-visible operational text. Runners save requested pages and `$W/.eval/output.md`; mirror needed deliverables into `<run-dir>/outputs/` for temporary review, alongside the private starting-baseline diff.

**Done when** each pair has two independent prepared roots with the same frozen source inputs and case, both isolation gates passed, and its ID-to-case mapping is saved.

## Dispatch

Create every run directory before dispatch. Follow `evals/README.md`'s enforced dispatch: bind each clone with `bindRunnerTools`, then call native `agent(runnerBrief, {agent: "test-subject", isolated: true, apply: false, tools: toolNames})`. Batch independent handles. Prepared Worlds stay outside omp worktrees; preparation and verification run from the real repo. Pin exact candidate/snapshot paths, including the declared uncommitted candidate version. Missing isolation or enforcement is an explicit prerequisite gap, not permission to dispatch unrestricted runners.

Save the model-facing operational text as `<run-dir>/brief.md`; keep the machine grant line/path/token in private control storage. The model receives the natural DM ask verbatim, start-here source paths, supplied preferences, assigned skill when present, write root, available capabilities, full File completion and `$W/.eval/output.md`. Parent-side criteria, source hashes, isolation proof and failure coaching remain separate.

For with-skill, grant `skillRoot === targetSkillRoot`. For `old_skill`, grant `<workspace>/skill-snapshot/` while denying the live target and aliases. For `without_skill`, omit `skillRoot` and deny the target entirely. Catalog access is not baseline isolation: the grant enforces the assignment, and complete histories/capability evidence establish that it held.

**Done when** every case has both run directories and saved briefs identifying its declared skill version and omp isolation status, and both configurations are dispatched with prepared roots outside their omp isolation workspaces.

## Capture completions before grading

For each runner, grader, comparator or analyzer completion:

1. Save the delivered payload verbatim as `task-result.json` and `history://<id>` as `history.md` in its run or dispatch evidence directory; keep separate dispatches' evidence separate. Consume the actual native `details.results` through `eval` and `await tool.task(...)` when available; blocking agent definitions expose those fields. If configuration changes are needed, request them from the configuration owner. Preserve the actual result object, not a reformatted notification.
2. Capture observed `resolvedModelIdentity` and thinking evidence separately from the raw `resolvedModel` selector in `task-result.json` and `evidence-notes.md`. The provenance contract is `{runner_family, model}`: `model` copies the complete observed selector verbatim, including a reported suffix such as `:high`; derive `runner_family` from the observed provider prefix. Runner provenance is `model.json`; grader provenance is `grader-model.json`; comparison/analysis provenance lives beside its artifact. Configured roles or pins are not observed identity.
3. Write `timing.json` from actual task completion fields only: `tokens` → `total_tokens`; `durationMs` → `duration_ms` and `total_duration_seconds` (`durationMs/1000`). Omit missing exact metrics rather than substituting zero or estimating.
4. When completion fields are absent, save reachable raw session evidence separately as `session-evidence.json` and record sources and missing fields in `evidence-notes.md`. Explicit session identity/selector and thinking evidence may establish provenance; omit fields that remain unavailable. Label transcript usage **transcript-derived usage**, record its scope, and keep it separate from task metrics—even a whole-session sum need not equal task `tokens`.
5. For each omp isolation runner, preserve completion metadata `isolated`, `hasRootChanges`, `patchPath` and `branchName`. Require observed `isolated: true` and `hasRootChanges: false`. Missing metadata cannot establish omp isolation. Unexpected root changes invalidate the run: retain recovery artifacts and stop without assuming whether they were applied. Missing omp isolation is an explicit prerequisite gap; scratch-path isolation is additional evidence, not a substitute.

**Done when** each completion has preserved payload/history evidence and provenance/timing artifacts whose populated fields have identified observed sources, and omp isolation runners have observed isolation/no-root-change evidence.

## Contamination and comparability

Inspect baseline history tool-call arguments and resolved resource paths for actual reads of the live candidate or its copies, including `skill://` aliases, file/archive reads and shell commands that load content. Resolve aliases against the catalog path; revision reads of the allowed snapshot are not contamination. A prohibited path quoted in the baseline brief, catalog listing or prompt is not a read. Retain the tool call and resolved path as evidence for each detected read; absent/incomplete history makes contamination unverifiable, not clean. A pair contributes to paired summaries only when all five hold:

1. both runs completed;
2. the baseline's complete history establishes no candidate reads;
3. both runs carry model evidence;
4. actual identities AND thinking settings match: compare explicit `resolvedModelIdentity` plus observed thinking where available; otherwise require matching complete observed selectors that establish both. Missing or ambiguous identity/thinking evidence is not permission to normalize or guess a match.
5. both workspaces pass `bun run eval:prepare --verify <scratch-root>` after execution and grading, and their saved preparation evidence establishes the same frozen inputs.

Keep every excluded pair visible in `benchmark.json` `runs[]`; `notes[]` names its reason and observed identities/thinking (or unavailable evidence). Record reported fallback substitutions with their actual identity and apply the same matching gate.

**Done when** contamination and model/input comparability are evidenced for each pair; finalize its comparable/excluded decision after post-grading verification below.

## Grading

Normalize `<workspace>/evals.json` into one `expectations` list per selected case. It is authoring input generated from active YAML, not a live repository intent file. Grade both configurations against the identical private criteria.

Before Grade, run `bun run eval:prepare --verify <scratch-root>` for every clone and preserve the result; verify the frozen baseline and run `eval:check` against its selected case. A source/isolation failure stops the workflow separately from quality failures.

For each usable output, read [`grader.md`](grader.md) and dispatch a fresh native `prose-grader` with that brief, the authored writing and identical normalized expectations, using its `{grades:[{rubric,pass,reason}]}` `outputSchema`. Include private current-run starting-source excerpts where fidelity requires them; the grader quotes the writing/source evidence for each verdict. Transcripts, gate logs and Check verdicts stay parent evidence.

The parent validates rubric text/count/order and maps the native result once into `grading.json`'s `{text, passed, evidence}` expectations plus computed summary; the grader yields rather than writing that file. Capture separate grader provenance. Execution errors without gradable outputs remain explicit errors.

After grading, run `bun run eval:prepare --verify <scratch-root>` for each clone and preserve the result. Finalize the matching gate before aggregation; a failed source/isolation verification invalidates the run and stops the workflow under `evals/README.md`.

**Done when** every run has grades against the same case expectations or an explicit execution error, and every pair's final gate result is saved with verification evidence.

## Aggregate

Build `<iteration-dir>/benchmark.json` in one parent-controlled Node operation using [`schemas.md`](schemas.md) and `calculateStats(values)` from `evals/authoring.ts`. Node owns the import; the omp JS Eval package loader does not load this helper. The parent owns the matching gate and selects observed metric values before calling it. To calculate one selected metric, set `metric_values_json` to its saved JSON-array path and run from the repo:

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
- `runs[]` — one entry per dispatched run, none silently dropped. Preserve schema fields `eval_id`, `eval_name`, `configuration`, `run_number`, nested `result`, `expectations` and per-run `notes`. `configuration` is the directory name (`with_skill` / `without_skill` / `old_skill`); order with-skill before its baseline counterpart. Populate observed grading counts/rate and observed `time_seconds`, `tokens`, `tool_calls`, `errors` only; unavailable grades or metrics are omitted, with errors/evidence limitations in notes. Keep model identities in provenance artifacts and mention pair mismatches in notes rather than adding a new benchmark schema.
- `run_summary` — insert `with_skill` then the baseline configuration; each contains `calculateStats` results for `pass_rate`, `time_seconds`, `tokens` from comparable pairs only. For each metric, include a pair only when both sides have that metric, so the two means use identical paired observations. Omit unobserved metric summaries rather than calling the helper with an empty list or fabricated values.
- `run_summary.delta` — INSIDE `run_summary`, after the configurations, never top-level. With-skill mean minus baseline mean for the same paired observations, formatted as schema strings (`pass_rate`: `"+0.50"`, `time_seconds`: `"+13.0"`, `tokens`: `"+1700"`); omit unavailable metrics.
- `notes[]` — pair exclusions established by the matching gate, plus evidence limitations. With no comparable pairs, omit `run_summary` and its delta and report “Paired summary and delta unavailable” in Markdown.

Write the existing `<iteration-dir>/benchmark.md` from the same data in that parent operation: observed per-run results, available paired stats/deltas and exclusion notes. Label missing values unavailable; a Markdown report is a view of the saved data, not another aggregation pipeline.

**Done when** both benchmark artifacts account for every dispatched run and agree on observed metrics, paired summaries and exclusions.

## Viewer and feedback

```bash
cf eval review <iteration-dir> \
  --skill-name <name> \
  --benchmark <iteration-dir>/benchmark.json \
  --static <iteration-dir>/review.html
```

From iteration 2 on, add `--previous-workspace <workspace>/iteration-<N-1>`. Review always writes a standalone static file; omitting `--static` uses `<iteration-dir>/review.html`. Use the JSON-reported path for browser review.

Then:

1. Open the file in the browser and confirm the Outputs and Benchmark tabs render this iteration's runs and stats.
2. Hand the DM the controls: the Outputs tab walks each case (prompt, outputs, formal grades, feedback box, previous iteration's output and feedback from iteration 2 on); the Benchmark tab shows the per-configuration stats and notes. **Download feedback.json** downloads the review export.
3. Import the download verbatim as `<iteration-dir>/feedback.json`. Its `reviews[]` entries carry `run_id` and `feedback`; empty feedback means the run looked fine.

**Done when** both tabs visibly show this iteration, the DM has reviewed the outputs, and the downloaded feedback is saved verbatim. Rendering a viewer alone is not human review.

## Optional blind comparison

For "is the revision actually better?" on a comparable pair, read [`comparator.md`](comparator.md) and dispatch a fresh native `prose-grader` with that blind assignment's `outputSchema` and outputs labeled A/B. Keep the label-to-configuration mapping private; remove version identity and revealing path headers from copies while preserving substantive text. The parent saves the yielded winner (`A`, `B` or `tie`) and quoted evidence as `comparison.json`; comparison is advisory, separate from pass/fail Grades and summaries. When diagnosis is requested, read [`analyzer.md`](analyzer.md): the parent analyzes the saved evidence or briefs a fresh `prose-grader` with its analysis `outputSchema`, then maps the result into `analysis.json`. Use the configured native role, not another agent definition. Capture separate dispatch evidence whenever a grader is used.

**Done when** the requested comparison/analysis artifacts and their separate observed provenance are saved.

## Close Session storage

After requested grading, review and reporting settle, close the returned `sessionRoot` under `evals/README.md`. Review mirrors, histories, frozen parents, clones and authoring artifacts share the creating Session's temporary lifetime. Durable export or cross-Session continuation requires an explicit DM request.

**Done when** all child jobs have settled, the coverage/comparability report is delivered and temporary storage has been closed, or the explicitly requested durable export has been recorded before closing.
