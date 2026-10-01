# Eval loop — paired with-skill/baseline runs

Read this when planning or running skill-creator step 4. Before writing artifacts, read `.agents/skills/skill-creator/references/schemas.md` for evals.json, grading.json, timing.json, benchmark.json, comparison.json and analysis.json. The native provenance and capture rules below govern observed completion evidence; `.omp/AGENTS.md` governs delegation.

## Layout

```
<skill-name>-workspace/
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

## Dispatch

Create every run directory before dispatching, then send both configurations of every eval out in ONE `task` batch as separate `test-subject` items. Brief template — the task item text and `<run-dir>/brief.md` are identical:

```
Execute this task:
- Skill: read and follow <skill-path>/SKILL.md
- Task: <eval prompt>
- Input files: <eval files, or "none">
- Save outputs to: <run-dir>/outputs/
- Outputs to save: <what the DM cares about, e.g. "the final CSV and a one-paragraph summary">
Keep every file you create or modify inside <run-dir>/.
```

The with-skill run uses the live candidate path. The baseline drops the Skill line and adds:

```
This run is a baseline without the skill under test. Do not read
<skill-path> or any copy of it anywhere; solve the task with your
own approach.
```

The `old_skill` baseline keeps a Skill line pointing at the snapshot and still prohibits the live candidate. Task children inherit the parent's skill catalog, so this prohibition is what makes a baseline a baseline — the control is instructional, and the contamination check below verifies it held.

**Done when** every case has both run directories and saved briefs, and both configurations are dispatched.

## Capture completions before grading

For each runner, grader, comparator or analyzer completion:

1. Save the delivered payload verbatim as `task-result.json` and `history://<id>` as `history.md` in its run or dispatch evidence directory; keep separate dispatches' evidence separate. Consume the actual native `details.results` through `eval` and `await tool.task(...)` when available; blocking agent definitions expose those fields. If configuration changes are needed, request them from the configuration owner. Preserve the actual result object, not a reformatted notification.
2. Capture observed `resolvedModelIdentity` and thinking evidence separately from the raw `resolvedModel` selector in `task-result.json` and `evidence-notes.md`. The provenance contract is `{runner_family, model}`: `model` copies the complete observed selector verbatim, including a reported suffix such as `:high`; derive `runner_family` from the observed provider prefix. Runner provenance is `model.json`; grader provenance is `grader-model.json`; comparison/analysis provenance lives beside its artifact. Configured roles or pins are not observed identity.
3. Write `timing.json` from actual task completion fields only: `tokens` → `total_tokens`; `durationMs` → `duration_ms` and `total_duration_seconds` (`durationMs/1000`). Omit missing exact metrics rather than substituting zero or estimating.
4. When completion fields are absent, save reachable raw session evidence separately as `session-evidence.json` and record sources and missing fields in `evidence-notes.md`. Explicit session identity/selector and thinking evidence may establish provenance; omit fields that remain unavailable. Label transcript usage **transcript-derived usage**, record its scope, and keep it separate from task metrics—even a whole-session sum need not equal task `tokens`.

**Done when** each completion has preserved payload/history evidence and provenance/timing artifacts whose populated fields have identified observed sources.

## Contamination and comparability

Inspect baseline history tool-call arguments and resolved resource paths for actual reads of the live candidate or its copies, including `skill://` aliases, file/archive reads and shell commands that load content. Resolve aliases against the catalog path; revision reads of the allowed snapshot are not contamination. A prohibited path quoted in the baseline brief, catalog listing or prompt is not a read. Retain the tool call and resolved path as evidence for each detected read; absent/incomplete history makes contamination unverifiable, not clean. A pair contributes to paired summaries only when all four hold:

1. both runs completed;
2. the baseline's complete history establishes no candidate reads;
3. both runs carry model evidence;
4. actual identities AND thinking settings match: compare explicit `resolvedModelIdentity` plus observed thinking where available; otherwise require matching complete observed selectors that establish both. Missing or ambiguous identity/thinking evidence is not permission to normalize or guess a match.

Keep every excluded pair visible in `benchmark.json` `runs[]`; `notes[]` names its reason and observed identities/thinking (or unavailable evidence). Record reported fallback substitutions with their actual identity and apply the same matching gate.

**Done when** each pair is marked comparable or excluded with evidence for its gate result.

## Grading

While the runs execute, normalize the case list: `evals/evals.json` may carry `assertions` or `expectations`; unify each case into ONE `expectations` list (update `evals.json` to match) and grade every run of that case against exactly this list.

For each run with usable outputs, dispatch a fresh `prose-grader` that has not seen the run, with `.agents/skills/skill-creator/agents/grader.md` (read when preparing the grading brief), the run's `outputs/` directory and normalized expectations. It writes `grading.json` with `{text, passed, evidence}` expectations. Capture its completion under the rules above, keeping grader provenance separate from runner provenance. Execution errors without gradable outputs remain explicit errors.

**Done when** every run has grades against the same case expectations or an explicit execution error.

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
