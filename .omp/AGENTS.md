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

The Wiki is an Obsidian vault; **Wiki access** in `user-config.md`, imported above, defines its vault root and the repo root. The `qmd-refresh` post hook re-indexes QMD after each `write` or `edit` under `wiki/`, `raw/` or `archive/`, so filing needs no manual `qmd update`.

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

Subagents share one worktree and never change git state: no `stash`, `checkout`, `reset`, `restore`, `switch`, `branch`, `rebase`, `commit` or `clean`. Read-only git (`status`, `diff`, `log`, `show`) is fine, and `git mv` only where the ingest archive step calls for it. To keep a baseline, save `git diff` to a file. Committing is the top-level agent's job.

Select an agent by its responsibility:

- `skill-writer` (`@SKILL-WRITER`) authors every large or novel change to agent-facing text: skills, `.omp/agents/`, `AGENTS.md`, runbooks and pointers. The orchestrator writes its briefs, owns acceptance criteria, eval fixtures, Wiki and integration, and leaves those files to it. When the defect was observed in a run, wait until every ingest subagent in that batch has finished, then pass all of their finished `history://` transcripts together so the writer sees the issues directly; never pass an in-progress transcript, and never pass one run while siblings are still going.
- `test-subject` (`@TEST-SUBJECT`) runs each eval case or baseline and `prose-grader` (`@PROSE-GRADER`) grades rubrics independently; both are native `task` dispatches whose frontmatter `tools:` is read-only except Runner `bash` for diagnostic CLI, batched per `evals/README.md`.
- `creative-writer` takes Seeds, Story drafts and other explicit creative-writing dispatches outside skill evals.
- `persona` plays exactly one NPC in a Simulation, dispatched only by `simulate-npcs`.

Claude Opus 5.5 is reserved for writing skills and agent instructions (`skill-writer`) and orchestration. `creative-writer` and `persona` default to `zai/glm-5.3`, pinned in their frontmatter. Testing runs on `zai/glm-5.3-flash`: `test-subject` gets it through `@TEST-SUBJECT`, and every `task` dispatched as a smoke-run subject, or as a `creative-writer` or `persona` inside a test, passes it as its `model`.

Preserve each completion's model selector, identity and thinking level where observed; pair only matching identities and thinking levels.

Delegation stays native, except description trigger checks and Benchmark runners and Judge: those are read-only `omp -p` processes whose commands `skill-creator` and `dnd-benchmark` document.

## Tools

- **Search code** with scoped `find` for unknown locations, `grep` for known literals, `ast_grep` for structural patterns and `lsp` for references and definitions. Edits report no diagnostics, so request `lsp` diagnostics on touched TypeScript before reporting code complete.
- **Judge** bounded classification, yes/no or ranking over a small state with eval `judge`: read `xd://eval/judge` once, batch independent questions over the same evidence into one call and use `judge_batch` for multiple states. Send only the evidence the criteria need; a failed judge item is a tool failure, so inspect `item.error` before concluding.
- **Extend with TypeSafe** beyond omp's built-in Jev tools, and use those tools first. Eval `judge` and `judge_batch` answer typed questions over a state inside this session's kernel, and judged TTSR rules ask one Noul of each completed output and deliver a yes as a warning. Read `skill://typesafe-ai` and the live docs it links, unprompted, when the work needs something those tools lack:
  - **Judgment in repo code.** `cf` commands, `src/`, tests and eval scripts run outside the session, so they call Jev through TypeSafe's JavaScript SDK (`bun add`) or HTTP API, which also return the answering model's version and token `usage` for reproducible runs. That code reads `TYPESAFE_API_KEY` from its environment. When the key is unset, report it to the DM as the missing prerequisite.
  - **Composed judgments.** `xd://eval/judge` documents single calls. The skill's patterns cover pipelines, such as selecting a value from candidates that code found instead of generating it, reranking retrieved pages, a weighted composite of Scores computed in code, a confidence gate that escalates uncertain cases to a reasoning model or the DM, and classification down a hierarchy.
- **Grade** Narration and other authored prose with `prose-grader`, dispatched as in `evals/README.md`: it reads the writing, which Jev does not. Execution, diffs, isolation and Checks stay with the orchestrator.
- **No browser for verification.** Check generated pages such as `cf eval review` HTML from the command's own output. Open a browser only when the DM asks for it.
- **Long work.** Keep `context_notes` current with the goal, decisions, touched paths and next step, and call `new_context` at phase boundaries. Trigger-check and Benchmark `omp -p` jobs run in the background; continue other work meanwhile.

## Skill tooling

Skill measurement and improvement follow `evals/README.md`, the sole procedure: Design, Eval, Hillclimb, Author, Benchmark and Playtest. Three omp-native skills are its invocation points:

- **Eval a skill** — read `skill://run-evals` before running a skill's committed `evals/cases.yaml` and reporting.
- **Benchmark Narration** — read `skill://dnd-benchmark` before ranking Matrix families or refreshing the leaderboard.
- **Author a skill** — read `skill://skill-creator` before creating or revising a skill, planning paired baselines, or testing its description.

Project skills live in `.omp/skills/` and `.agents/skills/`; where both hold a skill, the `.omp/` copy is the source of truth. `manage_skill` holds the DM's cross-project procedures; project skills, rules and decisions live in the repo.

## Prior iterations

Mine these earlier versions of this project (GitHub search for `Shattered Sea`, newest first) under the root **Prior iterations** rule. Start from `docs/research/prior-iterations/README.md` and the repo's findings file; then read a few files through GitHub, or clone to repo-root `prior/<repo-name>/` (gitignored, never committed) when searching or running across a repo.

- agentic-co-dm — https://github.com/Thedougler/agentic-co-dm — findings: `docs/research/prior-iterations/agentic-co-dm.md` (campaign horizons, travel events, PC interview, trap reveal ladders, transcript discourse)
- shattered-sea-campaign-os — https://github.com/Thedougler/shattered-sea-campaign-os — findings: `docs/research/prior-iterations/shattered-sea-campaign-os.md` (presence pass, canon ladder, transcript reconciliation, prose anti-patterns)
- campaign-os — https://github.com/Thedougler/campaign-os — findings: `docs/research/prior-iterations/campaign-os.md` (Fronts and world-update, player gravity, cold opens, writers-room compete mode)
- shattered-sea-wiki — https://github.com/Thedougler/shattered-sea-wiki — findings: `docs/research/prior-iterations/shattered-sea-wiki.md` (run-guide scene cards, mashup roleplay, gravity wells, anti-slop writing law)
- ai-os — https://github.com/Thedougler/ai-os — findings: `docs/research/prior-iterations/ai-os.md` (umbrella only; routes to shattered-sea-wiki and agent-skills)
- my-wiki — https://github.com/Thedougler/my-wiki — findings: `docs/research/prior-iterations/my-wiki.md` (Session reflection prompts, research briefs, edit boundaries)
- agent-skills — https://github.com/Thedougler/agent-skills — findings: `docs/research/prior-iterations/agent-skills.md` (anti-slop rules, world tick, Three Clue gate, empirical combat calibration)
- dnd-site — https://github.com/Thedougler/dnd-site — findings: `docs/research/prior-iterations/dnd-site.md` (investigation Items, in-world ship manual, festival history, sea-life lore)
- dnd-wiki — https://github.com/Thedougler/dnd-wiki — findings: `docs/research/prior-iterations/dnd-wiki.md` (world tick, Roleplay Prompt + Anchor, tone guide, Revelation and Question situations)
- shattered-sea-site — https://github.com/Thedougler/shattered-sea-site — findings: `docs/research/prior-iterations/shattered-sea-site.md` (tone triad, PC gravity, wiki synthesis scoring (branch `v5`))
- shattered-sea — https://github.com/Thedougler/shattered-sea — findings: `docs/research/prior-iterations/shattered-sea.md` (mashup roleplay, PC gravity, pacing heuristics, strong-start taxonomy)

## Configuration

Native agent definitions live in `.omp/agents/`, with descriptive names and narrow responsibilities; add a project agent rather than overriding a bundled one for a single job. Before changing configuration, inspect the effective settings and agent definitions and preserve unrelated overrides. Keep approvals and providers as configured when making a task run.

This file imports the shared root instructions because native context shadows a root `AGENTS.md` at the same directory depth. Keep project rules in that root file and tool, agent and configuration mechanics here.
