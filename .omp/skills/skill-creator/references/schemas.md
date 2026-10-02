# Authoring artifact contracts

Read before writing skill-creator's paired-run or optional diagnostic artifacts. `evals/README.md` owns preparation, protected native dispatch and Session lifetime; [`eval-loop.md`](eval-loop.md) owns evidence and comparability gates. These are private parent artifacts beneath `<S>/authoring/<skill>/`, not eval files installed inside a skill.

## Inputs and review metadata

### `evals.json`

At `<workspace>/evals.json`, generated from selected active YAML case IDs and private criteria. Record integer authoring ID → committed case ID and preparation mapping in `brief.md`.

```json
{
  "skill_name": "example-skill",
  "evals": [{
    "id": 1,
    "prompt": "The natural DM request, verbatim",
    "expected_output": "The requested deliverable and intended behavior",
    "files": [],
    "expectations": ["The writing makes the requested choice clear to the DM."]
  }]
}
```

- `skill_name` matches frontmatter. Each `id` is a unique integer.
- `prompt` is the selected task; `expected_output` is a human-readable target.
- Optional `files` names actual prepared/granted inputs, resolved from the recorded preparation mapping rather than a skill-local files directory.
- `expectations` is the normalized verbatim prose-rubric list. Normalize legacy `assertions` once; keep deterministic constraints in `eval:check`, separate from Grade.

At `<iteration>/<eval-name>/eval_metadata.json`, save `{eval_id, eval_name, prompt, assertions}`. `eval_name` matches its descriptive directory; `assertions` copies the normalized expectations. The static viewer consumes this metadata; it remains private to the parent and human review.

## Grade and completion evidence

### Native Grade → `grading.json`

The parent supplies a strict native `outputSchema` for this result, requiring all shown fields, boolean `pass`, and no extra properties:

```json
{"grades":[{"rubric":"The verbatim rubric","pass":true,"reason":"outputs/scene.md: ‘The bell stops. A boot scrapes behind the door.’ establishes an immediate physical cue."}]}
```

Require exactly one entry per expectation in original order with identical text. Missing required evidence is a grading error, not a fabricated verdict. The parent maps once: `rubric → text`, `pass → passed`, `reason → evidence`, and computes the summary. Save at `<run-dir>/grading.json`:

```json
{
  "expectations": [{"text":"The verbatim rubric","passed":true,"evidence":"The grader's reason, unchanged"}],
  "summary": {"passed":1,"failed":0,"total":1,"pass_rate":1}
}
```

`passed + failed = total`; `pass_rate = passed / total` when total is positive. An empty rubric set has zero counts and no pass rate. This artifact contains Grade, not executor metrics, gate logs or self-reported claims. Graders yield structured results; only the parent writes the authoring artifact.

### `timing.json` and provenance

At `<run-dir>/timing.json`, capture only exact observed native completion fields:

```json
{"total_tokens":3800,"duration_ms":42500,"total_duration_seconds":42.5}
```

Map native `tokens` to `total_tokens`, `durationMs` to `duration_ms`, and divide that observed duration by 1000 for seconds. Omit unavailable fields. Keep transcript-derived usage separate and label its scope; it does not replace completion metrics.

Save the actual native payload as `task-result.json` and complete `history://<id>` as `history.md`. `model.json` records runner provenance `{runner_family, model}`: derive the family from the observed provider prefix and copy the complete observed selector, including a thinking suffix, verbatim. Grader provenance is `grader-model.json`. Record observed resolved identity/thinking and isolation evidence beside the payload; configured roles are requested settings, not observations. Each separate comparator/analysis dispatch keeps its own provenance and evidence. The detailed capture and exclusion rules live in `eval-loop.md`.

## `benchmark.json`

At `<iteration>/benchmark.json`, this is the paired authoring summary, not the cross-family Narration Benchmark. Required keys are `metadata`, `runs` and `notes`; `run_summary` exists only when there are comparable observations.

```json
{
  "metadata": {
    "skill_name":"example-skill",
    "skill_path":"/absolute/candidate/path",
    "timestamp":"2026-10-01T10:30:00Z",
    "evals_run":[1],
    "runs_per_configuration":1
  },
  "runs":[{
    "eval_id":1,
    "eval_name":"clarify-pressure",
    "configuration":"with_skill",
    "run_number":1,
    "result":{"pass_rate":1,"passed":1,"failed":0,"total":1,"time_seconds":42.5,"tokens":3800},
    "expectations":[{"text":"The verbatim rubric","passed":true,"evidence":"The grader's reason"}],
    "notes":[]
  },{
    "eval_id":1,
    "eval_name":"clarify-pressure",
    "configuration":"old_skill",
    "run_number":1,
    "result":{"pass_rate":0,"passed":0,"failed":1,"total":1,"time_seconds":32,"tokens":2100},
    "expectations":[{"text":"The verbatim rubric","passed":false,"evidence":"The grader's reason"}],
    "notes":[]
  }],
  "run_summary":{
    "with_skill":{
      "pass_rate":{"mean":1,"stddev":0,"min":1,"max":1},
      "time_seconds":{"mean":42.5,"stddev":0,"min":42.5,"max":42.5},
      "tokens":{"mean":3800,"stddev":0,"min":3800,"max":3800}
    },
    "old_skill":{
      "pass_rate":{"mean":0,"stddev":0,"min":0,"max":0},
      "time_seconds":{"mean":32,"stddev":0,"min":32,"max":32},
      "tokens":{"mean":2100,"stddev":0,"min":2100,"max":2100}
    },
    "delta":{"pass_rate":"+1.00","time_seconds":"+10.5","tokens":"+1700"}
  },
  "notes":[]
}
```

- `configuration` is exactly `with_skill`, `without_skill` (new skill) or `old_skill` (revision). Keep every dispatched run, including excluded/error runs, with with-skill before its baseline counterpart. `run_number` starts at 1.
- `result` nests observed grading counts/rate and available `time_seconds`, `tokens`, `tool_calls`, `errors`. Count tool calls/errors only from complete relevant evidence; an omitted field means unavailable, not zero. Ungraded runs omit grade fields and carry the error in `notes`.
- Optional metadata `executor_model` requires a common observed runner identity; optional `analyzer_model` requires an actual analysis dispatch. Keep mixed or missing identities in provenance and notes.
- The parent admits pairs only after completion, contamination, actual identity/thinking, frozen-input and verification gates. Per metric, both configurations use exactly the same comparable observations with that metric available on both sides.
- Import `calculateStats(values)` from `evals/authoring.ts`; it returns `{mean,stddev,min,max}` with sample standard deviation (one observation: zero) and four-decimal rounding. Omit unavailable summaries instead of passing empty/fabricated values.
- `delta` belongs inside `run_summary`: with-skill mean minus baseline mean, signed strings with two decimals for pass rate, one for seconds and none for tokens. Omit unavailable metrics. With no comparable pairs, omit the entire summary and explain why in `notes`.

The existing `benchmark.md` is a concise rendering of these same results and exclusions. The static reviewer reads `benchmark.json`; Markdown does not supply missing metrics.

## Human feedback

The static Outputs reviewer downloads `feedback.json`. Import it verbatim at `<iteration>/feedback.json`:

```json
{"reviews":[{"run_id":"clarify-pressure-with_skill-run-1","feedback":"Make the choice visible sooner."}],"status":"complete"}
```

Preserve the renderer's actual run IDs and any other exported fields. Empty feedback is approval for that run. Only a DM export establishes review; generating HTML does not.

## Optional comparison and diagnosis

### `comparison.json`

The comparator yields this strict `outputSchema` contract; the parent validates and saves it at the assigned private comparison path:

```json
{
  "winner":"A",
  "reasoning":"A exposes the choice before consequences; B leaves the choice implicit.",
  "evidence":[{"criterion":"The DM can present the choice immediately.","a":"A: ‘Pay the ferryman or take the flooded stair.’","b":"B: ‘The stair is flooded. The ferryman waits.’"}]
}
```

Require `winner` enum `A | B | tie`, nonempty `reasoning` and an `evidence` array of `{criterion,a,b}` strings quoting both outputs. For an absent feature, quote the nearest relevant passage and explain the absence. A tie is a valid outcome. Keep the A/B mapping outside the comparator input. This is advisory quoted evidence, not numeric scores or a second Grade ledger.

### `analysis.json`

The parent performs diagnosis itself or asks a fresh native `prose-grader` for this structured `outputSchema` result, then validates and saves it at the assigned private analysis path:

```json
{
  "observations":[{"finding":"Both runs postpone the actionable choice.","evidence":["run-1/outputs/scene.md: ‘The ferryman waits.’"],"scope":"Comparable pair 1 only"}],
  "instruction_following":[{"configuration":"with_skill","finding":"The output misses the skill's completion criterion.","evidence":["SKILL.md: ‘Done when the choice is explicit.’","history.md: the saved output contains no explicit choice."]}],
  "improvement_suggestions":[{"priority":"high","category":"instructions","suggestion":"End the opening step on a presentable choice.","evidence":["The cited criterion and output above"],"expected_impact":"Would make the DM's next action explicit."}],
  "limitations":["One pair cannot establish a general effect."]
}
```

Require all four top-level arrays. `observations` entries have `{finding,evidence,scope}`; `instruction_following` entries have `{configuration,finding,evidence}`; `improvement_suggestions` entries have `{priority,category,suggestion,evidence,expected_impact}`. Evidence is an array of cited quotations or exact observed artifact fields. Priority is `high | medium | low`; category is `instructions | tools | examples | error_handling | structure | references`. `limitations` is a string array. An aggregate-only assignment leaves diagnosis arrays empty when the evidence cannot support them. A tie needs no invented winner/loser. Grade and comparison results remain unchanged.
