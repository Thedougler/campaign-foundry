# Campaign Foundry in oh-my-pi

@../AGENTS.md
@../user-config.md

## Domain

Before Wiki work, read `user-config.md` for the DM's preferences, then that Campaign's `campaign-config.md` when the work is in a Campaign. Continue with the Campaign/World/log sequence in the shared instructions. An assigned write root supplies those Campaign pages; protected Runner access and lifetime follow `evals/README.md`.

**QMD-first.** Read the `qmd` skill before Wiki search; retrieve a returned path/docid rather than answering from snippets. In a trusted production session, run from the project owning the live index:

```bash
env -u QMD_CONFIG_DIR qmd query $'intent: Find active Shattered Sea Campaign context, not unrelated Campaigns.\nlex: "Shattered Sea" hot' -c wiki --format json --no-rerank -n 3
env -u QMD_CONFIG_DIR qmd get '#6105a3'
```

The docid is an example; retrieve the actual result of this query. Omit `--index`. Trusted MCP queries likewise carry explicit `intent`; protected Runners instead use their bound QMD capabilities, which select the existing source index and map scratch edit paths.

**Lint** — read `skill://wiki-lint` after Ingest, after Prep, after page create, or after page move.

## Native delegation

Use oh-my-pi's native `task` subagents for authors, runners, graders and reviewers. The `omp` skill primarily serves agents in other harnesses; do not launch another omp process for work the current harness can delegate.

Select an agent by its responsibility. Model selection belongs in native agent frontmatter or configured model roles, not invented `task` arguments. The dedicated `skill-writer` subagent owns large or novel work on the agent-facing surface: skills, `.omp/agents/`, `AGENTS.md`, runbooks, and pointers. Every such modification routes through it; the orchestrator never authors those files itself. The orchestrator owns briefs, acceptance criteria and integration.

Skill evals use three native agents: `skill-writer` → `@SKILL-WRITER` for skill edits, `test-subject` → `@TEST-SUBJECT` for each case or baseline, and `prose-grader` → `@PROSE-GRADER` for independent rubric grading. Harness role assignments and fallback chains select their models; `evals/models.yaml` governs other harnesses and explicitly model-pinned runs such as the cross-family Prose Benchmark. Preserve each native completion's model selector, identity and thinking level; pair only matching identities and thinking levels. Blocking runners and graders retain exact completion metrics in `details.results`; batch dispatch still runs independent items concurrently.

Batch independent slices, give writers disjoint files, and pass the brief and artifact paths explicitly. Each eval case gets its own scratch Wiki; writer, test subject and grader are separate agents. Use `agent://` to steer a worker, completion notifications to collect results, and `wait` only when nothing else is actionable.

Use an external CLI only when native delegation cannot provide the required model, isolation or execution capability. State the missing capability and use the documented command. Do not silently change an eval model or build a custom launcher.

## Skill tooling

**Eval default.** This overrides the imported root **Skill verification** rule: require evals by default only for skills whose job is generating D&D content in the Wiki, such as Narration, NPCs, locations, creatures, items, and sessions. For all other skills and agent-facing documents, instruction revision is complete when the body matches the brief. For that non-creative work, require, create, or wait on `evals/cases.yaml` only when the DM asks.

Skill measurement and improvement follow `evals/README.md`, the sole procedure: Design, Eval, Hillclimb, Author, Benchmark and Playtest. Three omp-native skills are its invocation points. Dispatch with native `task` (`context` + `tasks[]`); no second omp process and no Claude CLI.

- **Eval a skill** — read `skill://run-evals` before running committed `evals/cases.yaml` in scratch Worlds and reporting.
- **Benchmark Narration** — read `skill://dnd-benchmark` before ranking Matrix families or refreshing the leaderboard.
- **Author a skill** — read `skill://skill-creator` before creating or revising a skill, planning paired baselines, or testing its description.

The `.agents/` skill copies serve other harnesses.

## Jev judgment

- Use scoped `find` for unknown behavior locations; `grep` for known literals and LSP for references/definitions.
- For bounded classification, yes/no, or ranking over a small state, read `xd://eval/judge` once and use `judge`. Batch independent questions over the same evidence into one call; use `judge_batch` for multiple states.
- Send only the evidence the criteria need. A failed judge item is a tool failure: inspect `item.error` before concluding.
- **Grade** Narration and other authored prose with `prose-grader`, dispatched with `outputSchema`: it reads the writing. Jev is not that Grade. Execution, diffs, isolation and `eval:check` stay with the orchestrator.

## Configuration

Native agent definitions live in `.omp/agents/`. Create or revise them through `skill-writer`. The same writer takes large or novel instruction-file work the orchestrator assigns. Use descriptive agent names and narrow responsibilities; do not override bundled agents for a single job. Inspect the effective settings and agent definitions before changing configuration, preserve unrelated overrides, and never weaken approvals or disable providers to make a task run.

This file imports the shared root instructions because native context shadows a root `AGENTS.md` at the same directory depth. Keep shared project facts in that root file and only oh-my-pi behavior here.
