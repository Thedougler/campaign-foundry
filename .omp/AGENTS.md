# Campaign Foundry in oh-my-pi

@../AGENTS.md
@../user-config.md

## Wiki access

**QMD-first.** Read the `qmd` skill before Wiki search. Search with the mounted QMD MCP tools (`query`, `get`, `multi_get`), giving each query an explicit `intent`, and retrieve each returned path or docid rather than answering from snippets. The CLI equivalent runs from this project, which owns the live index:

```bash
env -u QMD_CONFIG_DIR qmd query $'intent: Find active Shattered Sea Campaign context, not unrelated Campaigns.\nlex: "Shattered Sea" hot' -c wiki --format json --no-rerank -n 3
env -u QMD_CONFIG_DIR qmd get '#6105a3'
```

The docid is an example; retrieve the actual result of this query. Omit `--index`. Eval Runners reach the same live index through the `xd://mcp__qmd_query` and `xd://mcp__qmd_get` devices (`evals/README.md`).

Read and edit Wiki pages through `vault://_/` (the active vault) or their `wiki/` paths. The `qmd-refresh` post hook re-indexes QMD after each `write` or `edit` under `wiki/`, `raw/` or `archive/`, so filing needs no manual `qmd update`.

**Lint** — read `skill://lint` after Ingest, after Prep, after page create, or after page move.

## Project decision memory

The `sharpshooter` memory backend injects friction-earned DM decisions at session start as the **Project decision memory** block. A background model extracts them from the conversation, so the way a decision is worded is the way it is captured.

- **Follow** each injected decision as standing DM direction; the DM's current instruction overrides it. Check it against current repo state before acting on it.
- **Restate** each DM correction, rejection or decision back in one durable sentence: what to do and where it applies, leaving out this task's paths, ids and values.
- **Promote** a decision that is a durable project rule to its repo owner in the same change: a term to `CONTEXT.md`, a decision to `docs/adr/`, a working rule to `AGENTS.md`. Where repo text and an injected decision differ, follow the repo and name the stale decision to the DM.
- **Brief** native subagents with the injected decisions that bear on their slice; they start without the block.
- **Capture** runs through the conversation alone: the consolidator owns the decision files, and the `recall`/`retain`/`learn` tools of other memory backends play no part.

## Native delegation

Delegate through native `task` (`context` + `tasks[]`) or eval `agent()`/`workpool()`; all subagent work stays inside this omp session. Give each item the `effort` (`lo`/`med`/`hi`) its work needs. Models come from native agent frontmatter, configured model roles and `task.agentModelOverrides`; configured fallback chains and usage-reset waits absorb rate limits, so keep the configured model. Concurrency is capped per provider in configuration (four in-flight requests each for Anthropic, OpenAI and OpenAI Codex), with no global cap: dispatch every independent item and let each provider queue its own.

Give writers disjoint files and pass briefs and artifact paths explicitly. Set `isolated: true` when parallel writers may touch the same files or a change needs review before it lands. Steer a worker with `agent://`, send follow-up work to an idle agent that already holds the context, collect completion notifications, and `wait` only when nothing else is actionable.

Select an agent by its responsibility:

- `skill-writer` (`@SKILL-WRITER`) authors every large or novel change to agent-facing text: skills, `.omp/agents/`, `AGENTS.md`, runbooks and pointers. The orchestrator writes its briefs, owns acceptance criteria, eval fixtures, Wiki and integration, and leaves those files to it.
- `test-subject` (`@TEST-SUBJECT`) runs each eval case or baseline and `prose-grader` (`@PROSE-GRADER`) grades rubrics independently; both are native `task` dispatches whose frontmatter `tools:` is read-only, batched per `evals/README.md`.
- `creative-writer` (`@CREATIVE-WRITER`) takes explicit creative-writing dispatches outside skill evals.

Preserve each completion's model selector, identity and thinking level where observed; pair only matching identities and thinking levels.

Delegation stays native, except description trigger checks and Benchmark runners and Judge: those are read-only `omp -p` processes whose commands `skill-creator` and `dnd-benchmark` document.

## Tools

- **Search code** with scoped `find` for unknown locations, `grep` for known literals, `ast_grep` for structural patterns and `lsp` for references and definitions. Edits report no diagnostics, so request `lsp` diagnostics on touched TypeScript before reporting code complete.
- **Judge** bounded classification, yes/no or ranking over a small state with eval `judge`: read `xd://eval/judge` once, batch independent questions over the same evidence into one call and use `judge_batch` for multiple states. Send only the evidence the criteria need; a failed judge item is a tool failure, so inspect `item.error` before concluding.
- **Grade** Narration and other authored prose with `prose-grader`, dispatched as in `evals/README.md`: it reads the writing, which Jev does not. Execution, diffs, isolation and Checks stay with the orchestrator.
- **No browser for verification.** Check generated pages such as `cf eval review` HTML from the command's own output. Open a browser only when the DM asks for it.
- **Long work.** Keep `context_notes` current with the goal, decisions, touched paths and next step, and call `new_context` at phase boundaries. Trigger-check and Benchmark `omp -p` jobs run in the background; continue other work meanwhile.

## Skill tooling

Skill measurement and improvement follow `evals/README.md`, the sole procedure: Design, Eval, Hillclimb, Author, Benchmark and Playtest. Three omp-native skills are its invocation points:

- **Eval a skill** — read `skill://run-evals` before running a skill's committed `evals/cases.yaml` and reporting.
- **Benchmark Narration** — read `skill://dnd-benchmark` before ranking Matrix families or refreshing the leaderboard.
- **Author a skill** — read `skill://skill-creator` before creating or revising a skill, planning paired baselines, or testing its description.

Project skills live in `.omp/skills/` and `.agents/skills/`; where both hold a skill, the `.omp/` copy is the source of truth. `manage_skill` holds the DM's cross-project procedures; project skills, rules and decisions live in the repo.

## Configuration

Native agent definitions live in `.omp/agents/`, with descriptive names and narrow responsibilities; add a project agent rather than overriding a bundled one for a single job. Before changing configuration, inspect the effective settings and agent definitions and preserve unrelated overrides. Keep approvals and providers as configured when making a task run.

This file imports the shared root instructions because native context shadows a root `AGENTS.md` at the same directory depth. Keep project rules in that root file and tool, agent and configuration mechanics here.
