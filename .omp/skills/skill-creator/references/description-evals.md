# Description evals — trigger testing

Read this when the DM accepts skill-creator step 6. Measure whether the description leads agents to read the candidate, using native observations rather than legacy optimization scripts.

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

Render `.agents/skills/skill-creator/assets/eval_review.html` to a temp file with three substitutions — `__EVAL_DATA_PLACEHOLDER__` → the JSON array (bare; it fills a JS assignment), `__SKILL_NAME_PLACEHOLDER__` → the skill name, `__SKILL_DESCRIPTION_PLACEHOLDER__` → the current description. Open it in the browser. The DM edits queries, toggles should-trigger, adds and removes entries; Export Eval Set downloads `eval_set.json`, which becomes the working set. Bad queries make bad descriptions — don't skip this step.

**Done when** the DM-reviewed export is saved as the working query set.

## 3. Observe

Split the reviewed set 12 train / 8 held-out. Three fresh observations per query: dispatch each query RAW — one `test-subject` item whose text is the query and nothing else, with no skill-invocation instructions of any kind (no "use the <skill> skill", no candidate paths). Batch the dispatches per `.omp/AGENTS.md`.

After each completion, save its delivered evidence and `history://<id>`. Inspect tool-call arguments and resolved resource paths for actual reads of the candidate, including its catalog `skill://` alias and files under the resolved skill directory. Count a read, not a substring in prompt text, catalog listings or tool output. Preserve the triggering call/path per observation. Per query, trigger rate = observations with candidate reads / completed verifiable observations (0, 1/3, 2/3, 1 for three observations). Missing/incomplete history is a missed observation, not a zero; report missing observations and do not present an incomplete query as three observations.

**Done when** each query has three verifiable observations or explicitly reported missing observations, with evidence for every counted read.

## 4. Iterate and select

Apply each candidate through `skill-writer` (frontmatter `description` only), then confirm it in the active catalog before observing. When a refresh is needed, have the DM use the interactive omp reload or a new session and reconfirm the actual path/description there. Keep continuation artifacts in `<workspace>/description-evals/` — query set, per-candidate description and catalog evidence, observation results, current best description — so the next session resumes instead of restarting.

Iterate on train rates; select by held-out rate. Report train and held-out trigger rates for every candidate tried, with the near-misses each one wrongly caught. Apply the winning description through `skill-writer` only.

**Done when** every tried candidate has reported train/held-out rates and false positives, and the winner is applied; if catalog refresh requires another session, saved continuation artifacts identify the exact pending observations.
