---
name: run-evals
description: Fixture evals — run or rerun a skill's committed evals/cases.yaml in scratch Worlds, check every case, independently grade its rubrics, and revise failures to a full-suite pass. Use when asked to execute committed cases or when an issue explicitly requires fixture evals. Skill authoring and paired baseline measurement belong to skill-creator; cross-family Matrix Narration ranking belongs to dnd-benchmark.
---

# Run fixture evals

Run committed cases to one complete passing suite. Before dispatching, read `.omp/AGENTS.md` for native agents, concurrency and completion/model evidence. If the request is authoring or paired baseline measurement, read `skill-creator` instead; for cross-family Matrix Narration ranking, read `dnd-benchmark`. Fixture artifacts stay in scratch workspaces, separate from benchmark caches.

## Steps

1. **Validate the suite.** Resolve `.omp/skills/<skill>/evals/cases.yaml` first, then `.agents/skills/<skill>/evals/cases.yaml`; if neither exists, report both paths and stop. Record absolute `CASES`, `SKILL_ROOT` and repository paths. Before preparation, read `evals/check.ts` at `loadCases` and `toRegExp`: these are the authoritative schema and accepted regex convention. Import and call `loadCases` from the real repo root using Bun; require a nonempty suite. Compile every `canon` and `absent` pattern using the checker's convention (plain patterns use multiline mode; `/pattern/flags` uses its supplied flags), rather than creating a second schema validator. Retain filename, case id and check/page context for any error.
   **Done when** all cases pass the existing schema and every regex compiles, or a named PREPARATION error stops the run before dispatch.

2. **Prepare scratch Worlds.** Give each validated case its own generated workspace name (`mktemp -d`), not a case-id-derived path. From the real repo root, use a fail-fast shell with visible stdout/stderr. A compact required-fixture preparation is:

   ```bash
   set -eu
   W=$(mktemp -d)
   mkdir -p "$W/raw" "$W/.eval" "$W/.qmd"
   cp -R test/fixtures/vault "$W/wiki"
   cp -R wiki/templates "$W/wiki/templates"
   cp -R test/fixtures/archive "$W/archive"
   cp .qmd/index.yml "$W/.qmd/index.yml"
   ```

   Overlay the contents of `$SKILL_ROOT/evals/raw/$CASE_ID/` into `$W/raw/`, and `$SKILL_ROOT/evals/seed/$CASE_ID/` into `$W/wiki/`. An optional overlay is empty only when absent: inspect any present parent and source, including symlinks, for accessible directories. Inaccessible, dangling, non-directory or failed-copy inputs are PREPARATION errors naming their source path; missing required fixtures are also errors. Stop dispatch until preparation succeeds. After overlays, copy `$W/wiki` to `$W/.eval/baseline`.

   **Isolation gate:** inspect `$W/.qmd/index.yml`, then run these commands from `$W`:

   ```bash
   env -u QMD_CONFIG_DIR qmd --index index status
   env -u QMD_CONFIG_DIR qmd --index index collection list
   ```

   Before updating, require the observed database to be `$W/.qmd/index.sqlite` and the `wiki`, `raw` and `archive` collections to resolve to `$W/wiki`, `$W/raw` and `$W/archive`. Stop on any mismatch, external collection path or update hook. QMD discovers `.qmd/index.yml` from the current tree and keeps the database beside it; `--index index` selects that local file. If installed behavior differs, read `qmd --help` and `qmd skill show` before proceeding. Shared model downloads do not prove collection/index isolation.

   Only after the gate passes, run from the same `$W`:

   ```bash
   env -u QMD_CONFIG_DIR qmd --index index update
   env -u QMD_CONFIG_DIR qmd --index index embed
   env -u QMD_CONFIG_DIR qmd --index index status
   ```

   Retain command failures; successful indexing and embedding are required. Save the case-id → absolute workspace mapping. Every content mutation, output and grade belongs to that case's workspace.
   **Done when** every case has an independent seeded World and baseline, successful indexing/embedding and observed scratch-local database/collections, with no unresolved preparation errors.

3. **Execute cases.** Dispatch one `test-subject` per case with concrete absolute paths substituted into this brief:

   > You are the Agent in `AGENTS.md`, working for the DM. For this task the project root is `$W`: Wiki is `$W/wiki`, Raw is `$W/raw`, and Archive is `$W/archive`. Read/edit these filesystem paths directly; use neither live `vault://_/` nor inherited parent QMD MCP tools. Run every QMD command from `$W` with `env -u QMD_CONFIG_DIR qmd --index index <command>`; configuration is `$W/.qmd/index.yml` and database is `$W/.qmd/index.sqlite`. Run repo tooling from `<absolute-repo-root>` with scratch flags (`--vault $W/wiki --root $W`). Use the `<skill>` skill. The DM says: "<case prompt>". Write your final reply to the DM, exactly as you'd send it, to `$W/.eval/output.md`.

   Retain each runner's actual `resolvedModel` with its completion evidence.
   **Done when** every case has `$W/.eval/output.md` or a recorded execution error.

4. **Check artifacts.** For each executed case, run from the real repo root:

   ```bash
   bun run eval:check <skill-name> <case-id> $W/wiki --cases <absolute-cases-file> --root $W --templates $W/wiki/templates
   diff -ru $W/.eval/baseline $W/wiki -x templates
   ```

   Preserve the checker's PASS/FAIL lines verbatim and the seeded-baseline diff. A diff exit indicating changes is evidence, not an execution failure. Checker exit 2 is a usage or cases-file preparation error: fix inputs and re-prepare before grading.
   **Done when** every check of every executed case has a recorded PASS or FAIL, with preparation errors resolved.

5. **Grade rubrics.** Dispatch a fresh `prose-grader` per case, independent of execution, with all that case's rubrics, `$W/.eval/output.md` and the baseline diff. Require `$W/.eval/grades.json` as an array, for example:

   ```json
   [{"rubric":"Exact rubric text from cases.yaml","pass":true,"reason":"Quoted evidence supporting the judgment."}]
   ```

   Validate exactly one entry per rubric, verbatim rubric text, boolean `pass` and a quoted-evidence string `reason`; reject missing, extra or malformed entries before totaling. Retain the grader's actual `resolvedModel` with its completion evidence.
   **Done when** every rubric of every executed case has a valid pass/fail judgment and reason.

6. **Report coverage.** Produce one table with case, actual runner model, actual grader model, checks passed/total, rubrics passed/total and each failure's reason. Include every case and the preserved check evidence; list preparation/execution errors separately from check/rubric failures. Unexecuted cases never count as passes.
   **Done when** the report accounts for every case, check and rubric, both model identities and every miss.

7. **Revise and rerun.** Treat failures as skill defects until evidence shows otherwise. Give `skill-writer` the failing evidence, rerun failing cases in fresh scratch Worlds after revision, and repeat. Once targeted reruns pass, run the entire committed suite afresh against the revised skill; earlier passes do not substitute for this run.
   **Done when** one complete run of the final revision passes every check and rubric, with zero failures and zero unexecuted cases.
