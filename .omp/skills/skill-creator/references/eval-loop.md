# Eval loop — paired with-skill/baseline runs

Read this when planning or running skill-creator step 4. Before authoring or preparing eval data, read `evals/README.md` for the grounding contract. Before writing artifacts, read `.agents/skills/skill-creator/references/schemas.md` for evals.json, grading.json, timing.json, benchmark.json, comparison.json and analysis.json. The native provenance and capture rules below govern observed completion evidence; `.omp/AGENTS.md` governs delegation.

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

Build `<workspace>/evals.json` in the existing schema from selected active YAML case IDs and private criteria, recording the ID-to-case mapping in the authoring brief. From the real repo, prepare each grounded case once in the open Session:

```bash
bun run eval:prepare --cases <absolute-cases.yaml> --case <case-id> --session-root <S>
bun run eval:prepare --from <prepared-root> --session-root <S>
bun run eval:prepare --from <prepared-root> --session-root <S>
```

Save all three JSON responses. Assign the two clones to with-skill and baseline; neither runs in the frozen parent. Repeat observations and later iterations clone that same parent, keeping source inputs fixed across the comparison. Refreshing sources is a separate explicit preparation, identified as a new input snapshot.

For each clone, retain returned paths, `sessionRoot`, `runnerInput`, source hashes and live-read-only QMD evidence under `evals/README.md`. Save case mappings and private manifest paths in parent evidence, separate from `<run-dir>/brief.md`'s Runner-visible operational text. Runners save requested pages and `$W/.eval/output.md`; mirror needed deliverables into `<run-dir>/outputs/` for temporary review, alongside the private starting-baseline diff.

**Done when** each pair has two independent prepared roots with the same frozen source inputs and case, both isolation gates passed, and its ID-to-case mapping is saved.

## Dispatch

Create every run directory before dispatch. Follow `evals/README.md`'s enforced dispatch: bind each clone with `bindRunnerTools`, then call native `agent(runnerBrief, {agent: "test-subject", isolated: true, apply: false, tools: toolNames})`. Batch independent handles in waves of at most four. Prepared Worlds stay outside omp worktrees; preparation and verification run from the real repo. Pin exact candidate/snapshot paths, including the declared uncommitted candidate version. Missing isolation or enforcement is an explicit prerequisite gap, not permission to dispatch unrestricted runners.

Save the model-facing operational text as `<run-dir>/brief.md`; keep the machine grant line/path/token in private control storage. The model receives the natural DM ask verbatim, start-here source paths, supplied preferences, assigned skill when present, write root, available capabilities, full File completion and `$W/.eval/output.md`. Parent-side criteria, source hashes, isolation proof and failure coaching remain separate.

For with-skill, grant `skillRoot === targetSkillRoot`. For `old_skill`, grant `<workspace>/skill-snapshot/` while denying the live target and aliases. For `without_skill`, omit `skillRoot` and deny the target entirely. Catalog access is not baseline isolation: the grant enforces the assignment, and complete histories/capability evidence establish that it held.

**Done when** every case has both run directories and saved briefs identifying its declared skill version and omp isolation status, and both configurations are dispatched with prepared roots outside their omp isolation workspaces.

## Capture completions before grading

For each runner, grader, comparator or analyzer completion:

1. Save the delivered payload verbatim as `task-result.json` and `history://<id>` as `history.md` in its run or dispatch evidence directory; keep separate dispatches' evidence separate. Consume the actual native `details.results` through `eval` and `await tool.task(...)` when available; blocking agent definitions expose those fields. If configuration changes are needed, request them from the configuration owner. Preserve the actual result object, not a reformatted notification.
2. Capture observed `resolvedModelIdentity` and thinking evidence separately from the raw `resolvedModel` selector in `task-result.json` and `evidence-notes.md`. The provenance contract is `{runner_family, model}`: `model` copies the complete observed selector verbatim, including a reported suffix such as `:high`; derive `runner_family` from the observed provider prefix. Runner provenance is `model.json`; grader provenance is `grader-model.json`; comparison/analysis provenance lives beside its artifact. Configured roles or pins are not observed identity.
3. Write `timing.json` from actual task completion fields only: `tokens` → `total_tokens`; `durationMs` → `duration_ms` and `total_duration_seconds` (`durationMs/1000`). Omit missing exact metrics rather than substituting zero or estimating.
4. When completion fields are absent, save reachable raw session evidence separately as `session-evidence.json` and record sources and missing fields in `evidence-notes.md`. Explicit session identity/selector and thinking evidence may establish provenance; omit fields that remain unavailable. Label transcript usage **transcript-derived usage**, record its scope, and keep it separate from task metrics—even a whole-session sum need not equal task `tokens`.
5. For each omp isolation runner, preserve completion metadata `isolated`, `hasRootChanges`, `patchPath` and `branchName`. Require observed `isolated: true` and evidence of no repository-root changes (`hasRootChanges: false` or an observed absence of root patch changes). Missing metadata cannot establish omp isolation. Unexpected root changes invalidate the run: retain recovery artifacts and stop without assuming whether they were applied. If omp isolation was unavailable, preserve that explicit capability gap and the scratch-path isolation evidence instead.

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

For each usable output, dispatch a fresh `prose-grader` with `.agents/skills/skill-creator/agents/grader.md`, the authored writing and normalized expectations. Include private current-run source excerpts where fidelity requires them; the grader quotes the writing/source evidence for each verdict. Transcripts, gate logs and Check verdicts stay parent evidence. Save `grading.json` with `{text, passed, evidence}` expectations in the private authoring run directory, and capture separate grader provenance. Execution errors without gradable outputs remain explicit errors.

After grading, run `bun run eval:prepare --verify <scratch-root>` for each clone and preserve the result. Finalize the matching gate before aggregation; a failed source/isolation verification invalidates the run and stops the workflow under `evals/README.md`.

**Done when** every run has grades against the same case expectations or an explicit execution error, and every pair's final gate result is saved with verification evidence.

## Aggregate

Build `<iteration-dir>/benchmark.json` in one Python `eval` operation using the schemas.md shape and the existing `calculate_stats` helper below. The legacy aggregation CLI estimates missing metrics and bypasses the matching gate; reuse only its stats helper.

```python
import sys
sys.path.insert(0, '<absolute-repo-root>/.agents/skills/skill-creator/scripts')
from aggregate_benchmark import calculate_stats
# calculate_stats([values]) -> {"mean", "stddev", "min", "max"}
```

Populate from the iteration's artifacts:

- `metadata` — skill name and path, timestamp, evals run, runs per configuration; `executor_model` only when observed with-skill identities establish a common model. Record an observed analyzer identity only after analysis runs. Derive identities and counts from artifacts; mixed/missing identities are explained in `notes`, not assigned a fictitious common model.
- `runs[]` — one entry per dispatched run, none silently dropped. Preserve schema fields `eval_id`, `eval_name`, `configuration`, `run_number`, nested `result`, `expectations` and per-run `notes`. `configuration` is the directory name (`with_skill` / `without_skill` / `old_skill`); order with-skill before its baseline counterpart. Populate observed grading counts/rate and observed `time_seconds`, `tokens`, `tool_calls`, `errors` only; unavailable grades or metrics are omitted, with errors/evidence limitations in notes. Keep model identities in provenance artifacts and mention pair mismatches in notes rather than adding a new benchmark schema.
- `run_summary` — insert `with_skill` then the baseline configuration; each contains `calculate_stats` results for `pass_rate`, `time_seconds`, `tokens` from comparable pairs only. For each metric, include a pair only when both sides have that metric, so the two means use identical paired observations. Omit unobserved metric summaries.
- `run_summary.delta` — INSIDE `run_summary`, after the configurations, never top-level. With-skill mean minus baseline mean for the same paired observations, formatted as schema strings (`pass_rate`: `"+0.50"`, `time_seconds`: `"+13.0"`, `tokens`: `"+1700"`); omit unavailable metrics.
- `notes[]` — pair exclusions established by the matching gate, plus evidence limitations. With no comparable pairs, omit `run_summary` and its delta and report “Paired summary and delta unavailable” in Markdown.

Write `<iteration-dir>/benchmark.md` from the same data. The reused module's `generate_markdown(benchmark)` requires `run_summary` and defaults missing metrics to zero: use it only when both summaries contain every metric it renders. Otherwise write a concise report in the same `eval` operation containing observed per-run results, available paired stats/deltas and exclusion notes; label missing values unavailable.

**Done when** both benchmark artifacts account for every dispatched run and agree on observed metrics, paired summaries and exclusions.

## Viewer and feedback

```bash
python3 .agents/skills/skill-creator/eval-viewer/generate_review.py <iteration-dir> \
  --skill-name <name> \
  --benchmark <iteration-dir>/benchmark.json \
  --static <iteration-dir>/review.html
```

From iteration 2 on, add `--previous-workspace <workspace>/iteration-<N-1>`. `--static` writes a standalone file instead of starting a server, whose startup evicts unrelated processes from its port.

Then:

1. Open the file in the browser and confirm the Outputs and Benchmark tabs render this iteration's runs and stats.
2. Hand the DM the controls: the Outputs tab walks each case (prompt, outputs, formal grades, feedback box, previous iteration's output and feedback from iteration 2 on); the Benchmark tab shows the per-configuration stats and notes. Submit All Reviews downloads `feedback.json`.
3. Import the download verbatim as `<iteration-dir>/feedback.json`. Its `reviews[]` entries carry `run_id` and `feedback`; empty feedback means the run looked fine.

**Done when** both tabs visibly show this iteration, the DM has reviewed the outputs, and the downloaded feedback is saved verbatim. Rendering a viewer alone is not human review.

## Optional blind comparison

For "is the revision actually better?" on a comparable pair, read `.agents/skills/skill-creator/agents/comparator.md` and dispatch a fresh `prose-grader` with that brief and outputs labeled A/B. Remove version identity and revealing path headers before dispatch. It writes `comparison.json` in the iteration directory. When diagnosing the result, read `.agents/skills/skill-creator/agents/analyzer.md` and dispatch its brief with the benchmark data for `analysis.json`. Capture each completion under the rules above.

**Done when** the requested comparison/analysis artifacts and their separate observed provenance are saved.

## Close Session storage

After requested grading, review and reporting settle, close the returned `sessionRoot` under `evals/README.md`. Review mirrors, histories, frozen parents, clones and authoring artifacts share the creating Session's temporary lifetime. Durable export or cross-Session continuation requires an explicit DM request.

**Done when** all child jobs have settled, the coverage/comparability report is delivered and temporary storage has been closed, or the explicitly requested durable export has been recorded before closing.
