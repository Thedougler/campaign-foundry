---
name: run-evals
description: Evaluates a skill against the fixture World by running each case in a subagent and grading it with another, alongside `pnpm eval:check`. Use when a skill is new or changed, when an issue's Done asks for evals, or when the DM asks how well a skill works.
---

# Run evals

A skill's cases live in `.agents/skills/<skill>/evals/cases.yaml` (the format is in `evals/check.ts` and `test/evals/cases.yaml`). Every case runs in its own scratch copy of the fixture World, `test/fixtures/`, so no run touches `wiki/`. You orchestrate: subagents run and grade, scripts check.

## Steps

1. **Workspaces.** For each case, from the repo root:

   ```bash
   W=$(mktemp -d)/<case-id>; mkdir -p "$W/raw" "$W/.eval" "$W/.qmd"
   cp -R test/fixtures/vault "$W/wiki"; cp -R wiki/templates "$W/wiki/templates"
   cp -R test/fixtures/archive "$W/archive"; cp .qmd/index.yml "$W/.qmd/"
   cp -R .agents/skills/<skill>/evals/raw/<case-id>/. "$W/raw/" 2>/dev/null
   (cd "$W" && qmd update && qmd embed) >/dev/null
   ```

   A case that needs Raw keeps it in `evals/raw/<case-id>/` beside its `cases.yaml`.
2. **Run** every case at once, one background subagent each (Sonnet unless the case says otherwise), with this brief:

   > You are the Agent in `AGENTS.md`, working for the DM. For this task the project root is `$W`: the Wiki is `$W/wiki`, Raw is `$W/raw`, the Archive is `$W/archive`, and qmd runs from `$W`. Run repo commands from `/Users/nick/campaign-foundry` with `--vault $W/wiki --root $W` (for example `pnpm check --vault $W/wiki --root $W <page>`). Use the `<skill>` skill. The DM says: "<prompt>". When you're done, write your final reply to the DM, exactly as you'd send it, to `$W/.eval/output.md`.

3. **Check** each finished case: `pnpm eval:check <skill> <case-id> $W/wiki`. Keep its PASS and FAIL lines.
4. **Grade** each case with a fresh subagent that never saw the run, briefed with the case's rubrics, `$W/.eval/output.md`, and the Wiki diff (`diff -ru test/fixtures/vault $W/wiki -x templates`). It grades each rubric pass or fail with a one-sentence reason quoting the evidence, strictly, as a DM who will run the Session from this output would. It writes `$W/.eval/grades.json` as `[{ "rubric", "pass", "reason" }]`.
5. **Report** a table: case, checks passed, rubrics passed, and each failure's reason.
6. **Improve.** A failure is the skill's fault until shown otherwise. Fix the skill (following `writing-for-agents`), rerun only the failing cases, and repeat until every case passes. Done when a full run passes every check and rubric.

## Writing cases

Three to six cases per skill, each one distinct branch of the skill: a fresh page, an update to an existing fixture page, a Canon conflict, a thin or odd request. Deterministic `checks` cover what a script can see (pages, sections, fixture Canon that must survive, text that must be absent). `rubrics` cover craft, each a single observable claim a grader can mark pass or fail from the output and the diff. Assert against the fixture's own facts: `test/fixtures/README.md` points to them.
