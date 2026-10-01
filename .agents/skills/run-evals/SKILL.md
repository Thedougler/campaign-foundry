---
name: run-evals
description: Evaluates a skill against the fixture World, alongside `pnpm eval:check`. Use when a skill is new or changed, when an issue's Done asks for evals, or when the DM asks how well a skill works.
---

# Run evals

A skill's cases live in `.agents/skills/<skill>/evals/cases.yaml` (the format is in `evals/check.ts` and `test/evals/cases.yaml`). Every case runs in its own scratch copy of the fixture World, `test/fixtures/`, so no run touches `wiki/`. You orchestrate: runners execute the cases, GLM 5.3 Flash grades them, scripts check. Inside oh-my-pi every runner and grader is a native `task` subagent, never a nested omp process (`.omp/AGENTS.md` owns the transport policy); the omp CLI serves other harnesses, or a native gap — say which.

## Steps

1. **Workspaces.** For each case, from the repo root:

   ```bash
   W=$(mktemp -d)/<case-id>; mkdir -p "$W/raw" "$W/.eval" "$W/.qmd"
   cp -R test/fixtures/vault "$W/wiki"; cp -R wiki/templates "$W/wiki/templates"
   cp -R test/fixtures/archive "$W/archive"; cp .qmd/index.yml "$W/.qmd/"
   cp -R .agents/skills/<skill>/evals/raw/<case-id>/. "$W/raw/" 2>/dev/null
   cp -R .agents/skills/<skill>/evals/seed/<case-id>/. "$W/wiki/" 2>/dev/null
   cp -R "$W/wiki" "$W/.eval/baseline"
   (cd "$W" && qmd update && qmd embed) >/dev/null
   ```

   A case that needs Raw keeps it in `evals/raw/<case-id>/` beside its `cases.yaml`; a case that needs the World changed first (a seeded contradiction) keeps the changed pages, at their vault paths, in `evals/seed/<case-id>/`.
2. **Run** the cases, one runner each (unless the case names a model), at most four at a time. The runner is a cheap Codex or GLM model: the `cheap` pin of `openai` or `glm` in `evals/models.yaml`, one family per run, rotating openai → glm (record the family in the report). The `task` wire has no `model` argument: the configured task routing or a `.omp/agents/` definition supplies the model, so inspect the effective routing for the family's pin before dispatching; a family — or case-named model — that native routing can't supply takes the CLI leg, with the gap stated. Check the result's `resolvedModel` against the pin. The brief is the one below with `Use the \`<skill>\` skill.` replaced by `Read and follow /Users/nick/campaign-foundry/.agents/skills/<skill>/SKILL.md and use it.` CLI leg, from the repo root: `omp -p --auto-approve --no-session --max-time 900 --thinking high --model <pin> "$(cat $W/.eval/brief.md)" > $W/.eval/omp-events.jsonl 2> $W/.eval/omp-error.log`, pre-creating `$W/.eval/output.md` first (`: > "$W/.eval/output.md"`): omp print mode diverts the final reply into any file path the brief names, and a run killed before producing one (quota, auth, dead pin) exits rc=1 with a `failed to redirect` error that masks the real cause sitting in the error log. A dead pin retries once on that family's `fallback`. If both pins are dead — or the CLI leg is required and omp is absent — record the miss and do not substitute another model. Brief:

   > You are the Agent in `AGENTS.md`, working for the DM. For this task the project root is `$W`: the Wiki is `$W/wiki`, Raw is `$W/raw`, the Archive is `$W/archive`, and qmd runs from `$W`. Run repo commands from `/Users/nick/campaign-foundry` with `--vault $W/wiki --root $W` (for example `pnpm check --vault $W/wiki --root $W <page>`). Use the `<skill>` skill. The DM says: "<prompt>". When you're done, write your final reply to the DM, exactly as you'd send it, to `$W/.eval/output.md`.

3. **Check** each finished case: `pnpm eval:check <skill> <case-id> $W/wiki`. Keep its PASS and FAIL lines.
4. **Grade** each case with a fresh GLM 5.3 Flash grader — the `glm` `cheap` pin in `evals/models.yaml`, then its `fallback` — that never saw the run. Inside oh-my-pi, dispatch the `skill-eval-grader` agent from `.omp/agents/`, confirming its definition resolves to that pin; on the CLI leg, launch it the same way as the runner, with `--model` set to that pin. Brief it with the case's rubrics, `$W/.eval/output.md`, and the Wiki diff against the case's starting point (`diff -ru $W/.eval/baseline $W/wiki -x templates`). It grades each rubric pass or fail with a one-sentence reason quoting the evidence, strictly, as a DM who will run the Session from this output would. It writes `$W/.eval/grades.json` as `[{ "rubric", "pass", "reason" }]`.
5. **Report** a table: case, checks passed, rubrics passed, and each failure's reason.
6. **Improve.** A failure is the skill's fault until shown otherwise. Delegate the fix to the `skill-writer` subagent (it follows `writing-for-agents` and owns the edit), rerun only the failing cases, and repeat until every case passes. Done when a full run passes every check and rubric.

## Prose benchmark

The Prose Benchmark ranks Matrix families on Narration quality (the DM's "boxed text"). It runs rarely — on the DM's ask, or when the Matrix's `top` pins or `evals/prose-bench.yaml` change (`bench_version`, the yaml's hash, moves with it). Every prompt is committed: `cf bench briefs` renders each entry's brief byte-exact from the yaml into `evals/benchmark-samples/<bench_version>/`, and the Judge scores from the committed template `evals/bench/judge-brief.md`. A cached row counts only when its `prompt_sha` matches the rendered brief — the `cf bench` subcommands own every byte; each `--help` documents its own flags. Ordinary skill evals never enter the benchmark cache. Work goes Round by Round — the whole benchmark is deliberately beyond any one command — so cost and results stay observable.

1. **Preflight.** `cf bench status` from the repo root: `bench_version`, the Judge fallback pool, whether `omp` answers, and every Round's per-family HIT/MISS with the exact omp command each MISS runs. `omp` missing → "benchmark SKIPPED: no omp on PATH", stop. Seat the Judge once for the whole run: a fresh native Opus 5.5 subagent when the claude CLI answers; otherwise one random pick from the Matrix's `judge_fallback_pool` holds the whole run (recorded as `judge`), through omp with `--thinking high`.
2. **Briefs.** `cf bench briefs --check` must pass. On DRIFT, run `cf bench briefs`, commit the briefs, and re-run `status` — a moved `prompt_sha` is a MISS by design. Then run every MISS's omp command verbatim from the repo root, at most four omp processes at once, one Round (one content type, every family's `top` pin, yaml order) at a time. A dead pin retries once on the family's `fallback`, then the entry is SKIPPED and uncached.
3. **Extract.** For each finished run: `cf bench extract <events.jsonl>` writes the sample `<model-tag>.md` beside it and prints timing JSON. An extract that exits 1 produced something other than a bare `[!narration]` block — inspect the sample, and record it only if the Judge should score the breach.
4. **Failures.** A usage-limit, quota, or auth failure on both pins puts the family dark for the session: later Rounds skip it without retry, the report says so once, nothing caches. Record the row `cf bench record --id <id> --family <f> --status dark --reason "<why>"` (or `--status skipped` for a dead pin); the leaderboard shows the types it completed and the reason.
5. **Judge the Round.** `cf bench judge-brief --id <id> --sample <model-tag>.md` writes an anonymized judge brief into the sample's `judge/` folder. Dispatch a fresh subagent per sample as the seated Judge — native Opus 5.5 subagent when the claude CLI answers, else the fallback pin through omp with `--thinking high` — giving it exactly that brief file; the template fixes its blindness, its rubrics and its output path. It never saw the runs.
6. **Close the Round.** `cf bench record --id <id> --family <f> --grades <grades.json> --judge <who> --events <events.jsonl>` per judged sample: it validates the grades, writes the row (`prose_score` = mean rubric score) and regenerates `benchmark.md`. A Round is complete when every family is scored, skipped, or dark; report the side-by-side to the DM, then begin the next Round. Stopping after any Round is clean — the cache resumes the rest. When the DM acts on the leaderboard, that change records the model choice as an ADR plus the AGENTS.md Models update.

## Writing cases

Three to six cases per skill, each one distinct branch of the skill: a fresh page, an update to an existing fixture page, a Canon conflict, a thin or odd request. Deterministic `checks` cover what a script can see (pages, sections, fixture Canon that must survive, text that must be absent). `rubrics` cover craft, each a single observable claim a grader can mark pass or fail from the output and the diff. Assert against the fixture's own facts: `test/fixtures/README.md` points to them.
