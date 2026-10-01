---
name: run-evals
description: Fixture evals — execute committed cases in isolated Shattered Sea copies, check artifacts and independently grade rubrics. Use when the DM requests committed case verification or an issue requires it. Paired skill measurement belongs to skill-creator.
---

# Run evals

Committed cases may live beside a skill or under `evals/cases/`; the resolution step below selects the suite. Before authoring or preparing eval data, read `evals/README.md` for the shared grounding contract; `evals/check.ts` owns the checker schema. Inside oh-my-pi, read `.omp/skills/run-evals/SKILL.md` and use its native runners and graders instead of the CLI workflow below. Other harnesses preserve the Matrix pins and artifact contracts here. Fixture results stay separate from the Narration benchmark cache.

## Steps

1. **Validate and prepare.** Use an explicitly supplied cases-file path (`--cases` or equivalent) when present; a missing or invalid explicit file is a preparation error. Otherwise resolve `.agents/skills/<skill>/evals/cases.yaml`, then `.omp/skills/<skill>/evals/cases.yaml`, then `evals/cases/<skill>.yaml`; report all searched paths and stop only if none exists. Record the absolute cases-file, target skill and repo paths independently. Read and call `loadCases` in `evals/check.ts`, require a nonempty suite and compile its `canon`/`absent` patterns using `toRegExp`'s convention. For each validated case, from the real repo:

   ```bash
   bun run eval:prepare --cases <absolute-cases.yaml> --case <case-id>
   ```

   Save the JSON response and use its absolute `root`, `wiki`, `raw`, `archive`, `baseline` and `manifest` paths; `$W` below is `root`, and `$BASELINE` is the returned Wiki `baseline` path. Follow `evals/README.md`'s scratch-local QMD and isolation gate before dispatch.
   **Done when** every case has a manifest, baseline and observed scratch-local index, or a named preparation error stops it before execution.

2. **Run.** Launch one runner per case, at most four at once. Outside oh-my-pi, read `evals/models.yaml` and use one family's `cheap` pin, rotating openai → glm and recording the family, unless the case names a model. Read the `omp` skill for the supported CLI launch. A dead pin retries once on its `fallback`; preserve a miss if neither answers. Record actual completion model evidence, not the intended pin. Supply this brief with absolute paths:

   > You are the Agent in `AGENTS.md`, working for the DM. The orchestrator's prepared project root is `$W` and its manifest is `<absolute-manifest-path-returned-by-eval:prepare>`; read that manifest before execution. Wiki is `$W/wiki`, Raw is `$W/raw`, Archive is `$W/archive`. Use these filesystem paths, not the live vault or inherited QMD MCP. Run QMD from `$W` with `env -u QMD_CONFIG_DIR qmd <command>` for scratch-local discovery. An explicit named index overrides local discovery; use the observed status/collection-path gate in `evals/README.md` before update/embed. Run executable repo tooling from `<absolute-repo-root>` with explicit `--vault $W/wiki --root $W` flags. Use `<absolute-skill-path>/SKILL.md`. The DM says: "<case prompt>". Keep content mutations and outputs inside `$W`; save your final DM reply to `$W/.eval/output.md`.

   **Done when** every case has its output and observed model evidence, or a preserved execution error.

3. **Check.** From the real repo, run:

   ```bash
   bun run eval:check <skill> <case-id> "$W/wiki" --cases <absolute-cases.yaml> --root "$W" --templates "$W/wiki/templates"
   diff -ru "$BASELINE" "$W/wiki" -x templates
   ```

   Preserve PASS/FAIL lines and the diff. A diff showing changes is evidence; checker usage errors require corrected preparation.
   **Done when** every executed case's deterministic checks and starting-state diff are recorded.

4. **Grade.** Launch a fresh independent grader with the `glm` `cheap` pin in `evals/models.yaml`, then its `fallback` if needed; record its actual model separately. Give it the case rubrics, `$W/.eval/output.md` and baseline diff. Require `$W/.eval/grades.json` as `[{"rubric":"<verbatim rubric>","pass":true,"reason":"<quoted evidence>"}]`, exactly one valid entry per rubric.
   **Done when** every rubric has a valid judgment or its execution/grading error is explicit.

5. **Verify and report.** Run `bun run eval:prepare --verify "$W"` after execution and grading; failed source/isolation verification invalidates that run. Report every case, actual runner/grader models, checks and rubrics passed/total, and failure reasons. Keep preparation/execution errors separate from skill failures; unexecuted cases are not passes.
   **Done when** every case and criterion is accounted for and originals pass verification.

6. **Improve.** Give failing evidence to `skill-writer`, rerun failing cases in fresh preparations, then run the entire committed suite against the final revision.
   **Done when** one complete final run passes every check and rubric with no invalid or unexecuted cases.

## Prose benchmark

The Prose Benchmark ranks Matrix families on Narration quality. Run it on the DM's request; prompt or pin changes invalidate affected cache entries but do not request a run. Before authoring or refreshing benchmark inputs, read `evals/README.md` for real-source grounding and explicit source refresh, and `docs/adr/0012-benchmark-prompts-are-committed-and-deterministic.md` for byte/cache identity. Migration alone does not benchmark current skills. Every run consumes committed bytes: `cf bench briefs` renders the YAML into `evals/benchmark-samples/<bench_version>/`, and the Judge uses `evals/bench/judge-brief.md`. Historical sample versions remain immutable. The subcommands own rendering and caching; their `--help` documents flags. Ordinary skill evals never enter this cache. Complete and report every family in a Round before starting the next.

1. **Preflight.** `cf bench status` from the repo root: `bench_version`, the Judge fallback pool, whether `omp` answers, and every Round's per-family HIT/MISS with the exact omp command each MISS runs. `omp` missing → "benchmark SKIPPED: no omp on PATH", stop. Seat the Judge once for the whole run: a fresh native Opus 5.5 subagent when the claude CLI answers; otherwise one random pick from the Matrix's `judge_fallback_pool` holds the whole run (recorded as `judge`), through omp with `--thinking high`.
2. **Briefs.** `cf bench briefs --check` must pass. On DRIFT, run `cf bench briefs`, commit the briefs, and re-run `status` — a moved `prompt_sha` is a MISS by design. Then run every MISS's omp command verbatim from the repo root, at most four omp processes at once, one Round (one content type, every family's `top` pin, yaml order) at a time. A dead pin retries once on the family's `fallback`, then the entry is SKIPPED and uncached.
3. **Extract.** For each finished run: `cf bench extract <events.jsonl>` writes the sample `<model-tag>.md` beside it and prints timing JSON. An extract that exits 1 produced something other than a bare `[!narration]` block — inspect the sample, and record it only if the Judge should score the breach.
4. **Failures.** A usage-limit, quota, or auth failure on both pins puts the family dark for the session: later Rounds skip it without retry, the report says so once, nothing caches. Record the row `cf bench record --id <id> --family <f> --status dark --reason "<why>"` (or `--status skipped` for a dead pin); the leaderboard shows the types it completed and the reason.
5. **Judge the Round.** `cf bench judge-brief --id <id> --sample <model-tag>.md` writes an anonymized judge brief into the sample's `judge/` folder. Dispatch a fresh subagent per sample as the seated Judge — native Opus 5.5 subagent when the claude CLI answers, else the fallback pin through omp with `--thinking high` — giving it exactly that brief file; the template fixes its blindness, its rubrics and its output path. It never saw the runs.
6. **Close the Round.** `cf bench record --id <id> --family <f> --grades <grades.json> --judge <who> --events <events.jsonl>` per judged sample: it validates the grades, writes the row (`prose_score` = mean rubric score) and regenerates `benchmark.md`. A Round is complete when every family is scored, skipped, or dark; report the side-by-side to the DM, then begin the next Round. Stopping after any Round is clean — the cache resumes the rest. When the DM acts on the leaderboard, that change records the model choice as an ADR plus the AGENTS.md Models update.

## Writing cases

Before adding or revising cases, read `evals/README.md`; it owns source provenance and the weekly home Session regression policy. Select the smallest set covering the reported issue, not a case quota. Use the checker's existing schema: deterministic `checks` cover observable artifacts and preserved Canon; each `rubric` states one claim decidable from output and the starting-state diff. **Done when** each case has real source paths, traceable reported evidence where required, and criteria that distinguish the reported defect from success.
