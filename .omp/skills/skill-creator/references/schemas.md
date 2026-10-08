# Authoring artifact contracts

Read before writing skill-creator's paired-run or optional diagnostic artifacts. [`eval-loop.md`](eval-loop.md) owns the layout and the comparability decision; `bun run cf -- eval review` (`evals/review.ts`) reads `eval_metadata.json`, `grading.json`, `benchmark.json` and `feedback.json` in these shapes. All live under `<workspace>/iteration-<N>/`, outside any skill.

## `eval_metadata.json`

In each run directory:

```json
{"eval_id":"clarify-pressure","prompt":"The case prompt from cases.yaml, verbatim"}
```

`eval_id` is the case id; the viewer groups and sorts runs by it and shows `prompt` above the outputs.

## `grading.json`

In each run directory, written under [`grader.md`](grader.md):

```json
{
  "expectations":[
    {"text":"Checks","passed":true,"evidence":"ok: 3 passed, 0 failed, 0 skipped for npc-design/clarify-pressure"},
    {"text":"The verbatim rubric","passed":true,"evidence":"The grader's reason, unchanged"}
  ],
  "summary":{"passed":2,"failed":0,"total":2,"pass_rate":1}
}
```

`passed + failed = total`; `pass_rate = passed / total`, omitted when `total` is 0.

## `benchmark.json`

At `<iteration-dir>/benchmark.json`: the paired authoring record, not the cross-family Narration Benchmark. Required keys are `metadata`, `runs` and `notes`.

```json
{
  "metadata":{"skill_name":"example-skill","skill_path":".omp/skills/example-skill","timestamp":"2026-10-01T10:30:00Z","evals_run":["clarify-pressure"]},
  "runs":[{
    "eval_id":"clarify-pressure",
    "configuration":"with_skill",
    "result":{"pass_rate":1,"passed":2,"failed":0,"total":2},
    "expectations":[{"text":"Checks","passed":true,"evidence":"ok: 3 passed, 0 failed, 0 skipped for example-skill/clarify-pressure"},{"text":"The verbatim rubric","passed":true,"evidence":"The grader's reason"}],
    "notes":[]
  },{
    "eval_id":"clarify-pressure",
    "configuration":"old_skill",
    "result":{"pass_rate":0.5,"passed":1,"failed":1,"total":2},
    "expectations":[{"text":"Checks","passed":true,"evidence":"ok: 3 passed, 0 failed, 0 skipped for example-skill/clarify-pressure"},{"text":"The verbatim rubric","passed":false,"evidence":"The grader's reason"}],
    "notes":[]
  }],
  "notes":["clarify-pressure: helps on 'The verbatim rubric'; hurts on none."]
}
```

- `runs[]` has one entry per run directory, with-skill before its baseline counterpart; `configuration` is the directory name (`with_skill`, `without_skill`, `old_skill`). `expectations` and `result` copy the run's `grading.json`.
- An execution or grading error keeps its run entry with `result: {"errors": 1}` and the reason in that run's `notes`.
- `result.time_seconds` and `result.tokens` exist only where the Runner task result reported that run's duration and tokens; otherwise omit them.
- Top-level `notes` holds one helps/hurts line per comparable pair ([`eval-loop.md`](eval-loop.md) § Compare) and each excluded pair's reason.

## `feedback.json`

The viewer's **Download feedback.json** export, saved verbatim at `<iteration-dir>/feedback.json`:

```json
{"reviews":[{"run_id":"with_skill-clarify-pressure","feedback":"Make the choice visible sooner."}],"status":"complete"}
```

`run_id` is the run directory's path under the iteration, joined with `-`. Empty feedback means the run looked fine.

## `comparison.json`

The `prose-grader` result of a [`comparator.md`](comparator.md) dispatch, saved unchanged:

```json
{
  "winner":"A",
  "reasoning":"A exposes the choice before consequences; B leaves the choice implicit.",
  "evidence":[{"criterion":"The DM can present the choice immediately.","a":"A: ‘Pay the ferryman or take the flooded stair.’","b":"B: ‘The stair is flooded. The ferryman waits.’"}]
}
```

`winner` is `A`, `B` or `tie`; every `evidence` entry quotes both outputs. The A/B mapping stays in `brief.md`, never in the comparator's prompt.

## `analysis.json`

The `prose-grader` result of an [`analyzer.md`](analyzer.md) dispatch, or the parent's own analysis, in this shape:

```json
{
  "observations":[{"finding":"Both runs postpone the actionable choice.","evidence":["with_skill/clarify-pressure/outputs/reply.md: ‘The ferryman waits.’"],"scope":"Pair clarify-pressure only"}],
  "instruction_following":[{"configuration":"with_skill","finding":"The output misses the skill's completion criterion.","evidence":["SKILL.md: ‘Done when the choice is explicit.’","outputs/: no page states the choice."]}],
  "improvement_suggestions":[{"priority":"high","category":"instructions","suggestion":"End the opening step on a presentable choice.","evidence":["The criterion and output above"],"expected_impact":"Makes the DM's next action explicit."}],
  "limitations":["One pair cannot establish a general effect."]
}
```

All four arrays are required. `priority` is `high | medium | low`; `category` is `instructions | tools | examples | error_handling | structure | references`. Evidence entries quote saved artifacts.
