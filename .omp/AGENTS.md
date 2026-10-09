# Campaign Foundry in oh-my-pi

@../AGENTS.md

## Wiki access

**QMD** is the live local index of `wiki/`, `raw/` and `archive/`, re-indexed by the `qmd-refresh` post hook after each `write` or `edit` under them. Every session and subagent searches it through the mounted MCP devices:

- **Query.** Write JSON to `xd://mcp__qmd_query` (`read` the device once for its schema). Give each query an explicit `intent`. Lead with a `lex` sub-query on names and aliases, then add a `vec` or `hyde` sub-query on what the text says of the subject. Write a hyphenated name bare (`Nona Black-Jaw`), because a quoted phrase holding a hyphen skips the document.
- **Collections.** A query without `collections` searches `wiki`. Put `raw`, `archive` or `agentic-co-dm` in `collections` to search those.
- **Retrieve.** Read each hit whole by its path or docid through `xd://mcp__qmd_get`, several at once through `xd://mcp__qmd_multi_get`, or with `read`, and answer from the retrieved text. A snippet only says where to read.

A shell reaches `wiki`, `raw` and `archive` through the CLI, run from this project without `--index`:

```bash
env -u QMD_CONFIG_DIR qmd query $'intent: Find active Shattered Sea Campaign context, not unrelated Campaigns.\nlex: "Shattered Sea" hot' -c wiki --format json --no-rerank -n 3
env -u QMD_CONFIG_DIR qmd get '<docid>'
```

The Wiki is an Obsidian vault; **Wiki access** in `user-config.md`, imported above, defines its vault root and the repo root.

**Notion Backup.** The Backup (`CONTEXT.md`) is a read-only copy of `main`'s Shattered Sea Wiki and agent skills in Notion, under the page "campaign-foundry backup" (`3f20216635ec815c9ba6dacbda0f6f1b`), written by `.github/workflows/notion-backup.yml` (`docs/notion-backup.md`). Its search device, `xd://mcp__notion_search`, runs Notion AI search over it and returns titles, folder paths and short highlights, so one call surveys a subject across the whole World for far fewer tokens than reading QMD hits. The Backup offers search and browsing by folder. The Wiki is the record.

- **Start broad in the Backup.** Search the Backup for the task's subjects before you create or edit pages and for any question spanning many pages. Write the arguments to `xd://mcp__notion_search` with `page_url` set to the Backup root, which keeps the rest of the Second Brain and connected Slack, Mail and Calendar out of the results. Ask in keywords or one plain question under 50 words, one topic per call. To browse a folder, set `page_url` to that folder's page from a hit's `path`.
- **Map each hit to its Wiki page.** The `title` is the page's `title` property and the `path` ends at its folder: title `Nona Black-Jaw` under `… / campaign-foundry backup / wiki / shattered-sea / NPCs` is `wiki/shattered-sea/NPCs/nona-black-jaw.md`, the title's slug. A fetched page (`xd://mcp__notion_fetch`) names the same repo path in its grey header, with the commit it was copied at. A title ending "(deleted from repo)" is a removed file.
- **Read the Wiki before you rely on a page.** Every edit, citation and Canon decision uses the page as read from `wiki/` through `read` or QMD `get`/`multi_get`. The Backup holds `main` as of its last sync, so uncommitted and unpushed work, `raw/` and `archive/` exist only in the repo and QMD.
- **Search QMD** for exact names and aliases (the `lint` Names ladder), `raw/` and `archive/`, and pages changed since the last push.
- **File campaign content in `wiki/`.** The next sync overwrites any edit made on a Backup page, and for this Campaign the Wiki takes precedence over the Second Brain.
- A session or subagent whose tools lack `xd://mcp__notion_search` (Eval Runners, `omp -p` processes) searches QMD alone. The Notion MCP server is configured at user level in `~/.omp/agent/mcp.json`. Keep it there.

Survey a subject (`write` to `xd://mcp__notion_search`):

```json
{"query": "Who leads the Black-Jaw Run and where does she operate?", "page_url": "3f20216635ec815c9ba6dacbda0f6f1b", "page_size": 5, "max_highlight_length": 150}
```

Browse one folder, here NPCs:

```json
{"query": "Dravosi naval officers", "page_url": "3f20216635ec81e28fd1d7f82bc7f305", "page_size": 10}
```

Read one Backup page whole, with its repo-path header (`write` to `xd://mcp__notion_fetch`):

```json
{"id": "3f20216635ec81a59bb4df08d56bbaf3"}
```

## Project decision memory

The `sharpshooter` memory backend injects DM decisions drawn from past corrections at session start as the **Project decision memory** block. A background model extracts them from the conversation, so the way a decision is worded is the way it is captured.

- **Follow** each injected decision as standing DM direction. The DM's current instruction overrides it. Check it against current repo state before acting on it.
- **Restate** each DM correction, rejection or decision back in one durable sentence that says what to do and where it applies. Leave out this task's paths, ids and values.
- **Promote** a decision that is a durable project rule to its repo owner in the same change: a term to `CONTEXT.md`, a decision to `docs/adr/` and a working rule to `AGENTS.md`. Where repo text and an injected decision differ, follow the repo and tell the DM which injected decision is stale.
- **Brief** native subagents with the injected decisions that bear on their slice, since they start without the block.
- **Capture** runs through the conversation alone: the consolidator writes the decision files, and the `recall`/`retain`/`learn` tools of other memory backends play no part.

## Native delegation

Delegate through native `task` (`context` + `tasks[]`) or eval `agent()`/`workpool()`. All subagent work stays inside this omp session. Give each item the `effort` (`lo`/`med`/`hi`) and the model (below) its work needs. Configured fallback chains and usage-reset waits absorb rate limits and keep the chosen model.

Give writers disjoint files and pass briefs and artifact paths explicitly. Set `isolated: true` when parallel writers may touch the same files or a change needs review before it is merged. Message a worker through `agent://` only with an instruction or a deliverable, as **Message with work** in the root `AGENTS.md` sets out: steer it with a new instruction, or send follow-up work to an idle agent that already has the context. Collect completion notifications, and `wait` only when nothing else is left to do. A subagent messages a sibling only for a hand-off its brief defines, and otherwise reports to its parent in its return.

Subagents share one worktree and never change git state: no `stash`, `checkout`, `reset`, `restore`, `switch`, `branch`, `rebase`, `commit` or `clean`. Read-only git (`status`, `diff`, `log`, `show`) is fine, and `git mv` only where the ingest archive step calls for it. To keep a baseline, save `git diff` to a file. Committing is the top-level agent's job.

Select an agent by its responsibility:

- `skill-writer` (`@SKILL-WRITER`) authors every large or novel change to agent-facing text: skills, `.omp/agents/`, `AGENTS.md`, runbooks and pointers. The orchestrator writes its briefs, owns acceptance criteria, eval fixtures, Wiki and integration, and leaves those files to it. Briefs leave the writer's own verification on, and the orchestrator reruns those checks only as acceptance. When the defect was observed in a run, wait until every ingest subagent in that batch has finished, then pass all of their finished `history://` transcripts together so the writer sees the issues directly; never pass an in-progress transcript, and never pass one run while siblings are still going.
- `test-subject` (`@TEST-SUBJECT`) runs each eval case or baseline and `prose-grader` (`@PROSE-GRADER`) grades rubrics independently; both are native `task` dispatches whose frontmatter `tools:` is read-only except Runner `bash` for diagnostic CLI, batched per `evals/README.md`.
- `creative-writer` takes Seeds, Story drafts and other explicit creative-writing dispatches outside skill evals.
- `persona` plays exactly one NPC in a Simulation, dispatched only by `simulate-npcs`.
- `transcript-reader` (pinned `zai/glm-5.3-flash`) reads Transcript chunks and verify ranges into Session Ledger files, dispatched by the top-level session as `ingest` `references/transcript.md` sets out.
- A Transcript's ingest runs as flat stages from the top-level session through `ingest` `references/transcript.md`, each stage one subagent turn that returns its outputs and the dispatches it requests. `task.maxRecursionDepth: 1` in `.omp/config.yml` removes `task` from every subagent, as root `AGENTS.md` **Flat dispatch** sets out, so a `skill-writer`, `transcript-reader` or Simulation a subagent needs comes back to the top level as a request in its return.

Claude Opus 5.5 is reserved for writing skills and agent instructions (`skill-writer`) and orchestration. Native agents bring their own models: `creative-writer` and `persona` pin `zai/glm-5.3` in their frontmatter, `transcript-reader` pins `zai/glm-5.3-flash`, and `test-subject` runs on `@TEST-SUBJECT`. The orchestrator chooses each `task` item's model by its work:

- **Default.** Leave `model` out to run the item on its native agent's model or the configured `task` model. Use it for judgement-heavy or multi-step work such as lint slices, Print-grade prose and investigation.
- **`zai/glm-5.3`** for creative drafting and mid-weight work.
- **`zai/glm-5.3-flash`** for cheap, tightly scoped or mechanical runs.

Test subjects in `dogfood` runs and evals run on the weakest model realistically capable of the task, usually `zai/glm-5.3-flash`, because a weak model exposes unclear instructions that a strong one quietly compensates for at token cost.

Preserve each completion's model selector, identity and thinking level where observed, and pair only matching identities and thinking levels.

Delegation stays native, except description trigger checks and Benchmark runners and Judge: those are read-only `omp -p` processes whose commands `skill-creator` and `dnd-benchmark` document.

## Tools

- **Search code** with scoped `find` for unknown locations, `grep` for known literals, `ast_grep` for structural patterns and `lsp` for references and definitions. Edits don't report diagnostics, so request `lsp` diagnostics on touched TypeScript before reporting code complete.
- **Library docs** come from Context7 before memory or web search: read `skill://context7-mcp`, then write to `xd://mcp__context7_resolve_library_id` and `xd://mcp__context7_query_docs` whenever code touches a library, framework, SDK, CLI or API (Bun, vitest, Vale, Foundry VTT, Playwright, the TypeSafe SDK). Training data lags releases, so fetch even for a familiar API, and brief code-writing subagents to do the same.
- **Judge** bounded classification, yes/no or ranking over a small state with eval `judge`: read `xd://eval/judge` once, batch independent questions over the same evidence into one call and use `judge_batch` for multiple states. Send only the evidence the criteria need; a failed judge item is a tool failure, so inspect `item.error` before concluding.
- **Extend with TypeSafe** beyond omp's built-in Jev tools, and use those tools first. Eval `judge` and `judge_batch` answer typed questions over a state inside this session's kernel, and judged TTSR rules ask one Noul of each completed output and deliver a yes as a warning. Read `skill://typesafe-ai` and the live docs it links, unprompted, when the work needs something those tools lack:
  - **Judgment in repo code.** `cf` commands, `src/`, tests and eval scripts run outside the session, so they call Jev through TypeSafe's JavaScript SDK (`bun add`) or HTTP API, which also return the answering model's version and token `usage` for reproducible runs. That code reads `TYPESAFE_API_KEY` from its environment. When the key is unset, report it to the DM as the missing prerequisite.
  - **Composed judgments.** `xd://eval/judge` documents single calls. The skill's patterns cover pipelines, such as selecting a value from candidates that code found instead of generating it, reranking retrieved pages, a weighted composite of Scores computed in code, a confidence gate that escalates uncertain cases to a reasoning model or the DM, and classification down a hierarchy.
- **Grade** Narration and other authored prose with `prose-grader`, dispatched as in `evals/README.md`: it reads the writing, which Jev does not. Execution, diffs, isolation and Checks stay with the orchestrator.
- **No browser for verification.** Check generated pages such as `cf eval review` HTML from the command's own output. Open a browser only when the DM asks for it.
- **Long work.** Keep `context_notes` current with the goal, decisions, touched paths and next step, and call `new_context` at phase boundaries. Trigger-check and Benchmark `omp -p` jobs run in the background; continue other work meanwhile.

## Skill tooling

Skill measurement and improvement (Design, Eval, Hillclimb, Author, Benchmark and Playtest) follow the procedure in `evals/README.md`. The omp-native skills below are its invocation points:

- **Eval a skill.** Read `skill://run-evals` before running a skill's committed `evals/cases.yaml` and reporting.
- **Benchmark Narration.** Read `skill://dnd-benchmark` before ranking Matrix families or refreshing the leaderboard.
- **Author a skill.** Read `skill://skill-creator` before creating or revising a skill, planning paired baselines or testing its description.

Project skills live in `.omp/skills/` and `.agents/skills/`; where both hold a skill, the `.omp/` copy is the source of truth. `manage_skill` holds the DM's cross-project procedures; project skills, rules and decisions live in the repo.

## Prior iterations

Mine these earlier versions of this project (GitHub search for `Shattered Sea`, newest first) under the root **Prior iterations** rule. Start from `docs/research/prior-iterations/README.md` and the repo's findings file; then read a few files through GitHub, or clone to repo-root `prior/<repo-name>/` (gitignored, never committed) when searching or running across a repo.

- agentic-co-dm: https://github.com/Thedougler/agentic-co-dm, findings in `docs/research/prior-iterations/agentic-co-dm.md` (campaign horizons, travel events, PC interview, trap reveal ladders, transcript discourse)
- shattered-sea-campaign-os: https://github.com/Thedougler/shattered-sea-campaign-os, findings in `docs/research/prior-iterations/shattered-sea-campaign-os.md` (presence pass, canon ladder, transcript reconciliation, prose anti-patterns)
- campaign-os: https://github.com/Thedougler/campaign-os, findings in `docs/research/prior-iterations/campaign-os.md` (Fronts and world-update, player gravity, cold opens, writers-room compete mode)
- shattered-sea-wiki: https://github.com/Thedougler/shattered-sea-wiki, findings in `docs/research/prior-iterations/shattered-sea-wiki.md` (run-guide scene cards, mashup roleplay, gravity wells, anti-slop writing law)
- ai-os: https://github.com/Thedougler/ai-os, findings in `docs/research/prior-iterations/ai-os.md` (umbrella only; routes to shattered-sea-wiki and agent-skills)
- my-wiki: https://github.com/Thedougler/my-wiki, findings in `docs/research/prior-iterations/my-wiki.md` (Session reflection prompts, research briefs, edit boundaries)
- agent-skills: https://github.com/Thedougler/agent-skills, findings in `docs/research/prior-iterations/agent-skills.md` (anti-slop rules, world tick, Three Clue gate, empirical combat calibration)
- dnd-site: https://github.com/Thedougler/dnd-site, findings in `docs/research/prior-iterations/dnd-site.md` (investigation Items, in-world ship manual, festival history, sea-life lore)
- dnd-wiki: https://github.com/Thedougler/dnd-wiki, findings in `docs/research/prior-iterations/dnd-wiki.md` (world tick, Roleplay Prompt + Anchor, tone guide, Revelation and Question situations)
- shattered-sea-site: https://github.com/Thedougler/shattered-sea-site, findings in `docs/research/prior-iterations/shattered-sea-site.md` (tone triad, PC gravity, wiki synthesis scoring (branch `v5`))
- shattered-sea: https://github.com/Thedougler/shattered-sea, findings in `docs/research/prior-iterations/shattered-sea.md` (mashup roleplay, PC gravity, pacing heuristics, strong-start taxonomy)

## Configuration

**Extend omp.** When the DM asks to change what this repo or the harness can do (a tool, hook, rule, skill, setting, agent, MCP server, extension or plugin), you MUST read `skill://extending-omp` before acting and follow it to build the change.

Native agent definitions live in `.omp/agents/`, with descriptive names and narrow responsibilities. Add a project agent for a new job rather than overriding a bundled one. Before changing configuration, inspect the effective settings and agent definitions and preserve unrelated overrides. Keep approvals and providers as configured when making a task run.

This file imports the shared root instructions because native context shadows a root `AGENTS.md` at the same directory depth. Keep project rules in that root file and tool, agent and configuration mechanics here.
