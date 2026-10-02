# Description evals — trigger testing

Read this when the DM accepts skill-creator step 6. Measure whether the description leads agents to read the candidate, using native observations. Read `evals/README.md` before preparation or dispatch; it owns Session storage and protected native execution. This branch measures invocation, not Campaign output quality or cross-family ranking.

**Prerequisite — live catalog.** A trigger observation measures the catalog the subject actually inherits. Resolve the candidate's actual path and confirm its tested description is present in the active catalog before dispatch. An edit alone does not establish a catalog refresh. If the candidate metadata is absent or stale, state the missing refresh to the DM and follow "Iterate and select"; record observed catalog evidence rather than assuming every session edit is live or stale.

## 1. Query set

20 realistic queries the DM would actually type — concrete and detailed: real-looking paths, personal context, column names, URLs, casual speech, abbreviations, typos, mixed lengths. Queries must be substantive enough that consulting a skill plausibly helps; trivial one-step asks don't trigger skills regardless of description quality.

- ~10 should-trigger: varied phrasings of the same intent (some formal, some casual), some that need the skill without naming it, some where a competing skill could answer but this one should win.
- ~10 near-miss should-not-trigger: adjacent domains and keyword overlap where a naive match would fire but another tool or skill is right. No obviously-irrelevant negatives — a negative nothing would mistake for a positive tests nothing.

Save as `<workspace>/description-evals/trigger-eval.json`:

```json
[{"query": "…", "should_trigger": true}, {"query": "…", "should_trigger": false}]
```

**Done when** the saved set covers the skill's trigger branches and adjacent near-misses with explicit expected outcomes.

## 2. DM review

Render the query set with the shared TypeScript command:

```bash
cf eval description-review <workspace>/description-evals/trigger-eval.json \
  --skill-name <name> --description "<current description>" \
  --static <workspace>/description-evals/review.html
```

The command requires `--static`, writes a standalone file and returns its path in JSON. Open that path in the browser. The DM edits queries, toggles should-trigger, adds and removes entries; Export Eval Set downloads `eval_set.json`, which becomes the working set. Complete review before measuring: bad query labels measure a different description target.

**Done when** the DM-reviewed export is saved as the working query set and contains 20 labeled queries; resolve additions/removals with the DM before assigning the 12/8 split.

## 3. Observe

Save a fixed, branch-balanced 12 train / 8 held-out split of the reviewed set. Keep that membership unchanged across candidate descriptions. Three fresh observations per query: dispatch each query RAW — one native `test-subject` item whose task text is the query and nothing else, with no skill-invocation instructions or candidate paths. Batch independent native items per `.omp/AGENTS.md`; model selection comes from the configured role, not Matrix pins.

Before dispatch, prepare the needed independent World inputs under `evals/README.md`, bind protected tools with `bindRunnerTools`, and require `isolated: true`, `apply: false`. Parent preparation/grants and operational context supply the read/write boundary without exposing private expected trigger labels, criteria or candidate-specific hints. Allow catalog discovery and candidate reads through granted capabilities rather than assigning an explicit skill to the subject. Preserve private preparation evidence and observed isolation/no-root-change completion fields; verify each World after observation. Missing catalog exposure, enforcement or isolation is a named prerequisite gap, not permission to launch a different runner.

After each completion, save its delivered evidence and complete `history://<id>`, including actual model identity/thinking and available exact completion metrics. Inspect tool-call arguments and resolved resource paths for actual reads of the candidate, including its catalog `skill://` alias and files under the resolved skill directory. Count a read, not a substring in prompt text, catalog listings or tool output. Preserve the triggering call/path per observation. Per query, trigger rate = observations with candidate reads / completed verifiable observations (0, 1/3, 2/3, 1 for three observations). Missing/incomplete history is a missed observation, not a zero; report missing observations and the actual denominator, and do not present an incomplete query as three observations.

**Done when** each query has three verifiable observations or explicitly reported missing observations, with evidence for every counted read.

## 4. Iterate and select

Apply each candidate through `skill-writer` (frontmatter `description` only), then confirm it in the active catalog before observing. When a refresh is needed, have the DM use interactive omp reload within the owning Session; a new main Session requires explicit durable export first under `evals/README.md`. Save the reviewed set/split, each candidate's exact description and observed catalog evidence, per-observation read evidence/results, and current best description in `<workspace>/description-evals/`. Resume only from those artifacts, reconfirming the catalog and preservation of the split.

Iterate on train evidence; use held-out evidence for final selection, keeping held-out queries out of the description-revision brief. Report train and held-out trigger rates for every candidate observed, alongside should-trigger misses, near-miss false positives, actual denominators and missing observations. Apply the selected description through `skill-writer` and reconfirm its active catalog metadata.

**Done when** every tried candidate has reported evidence-based train/held-out rates and false positives, and the selected description is applied and confirmed; if refresh or missing evidence blocks completion, name the exact pending observations and preserve artifacts only for their permitted Session lifetime or an explicitly requested durable export.
