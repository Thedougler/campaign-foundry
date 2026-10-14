# Delegation mechanics

On-demand detail behind `.omp/AGENTS.md` § Native delegation. Read it before you choose a batch's model or revive an agent. Read it also before you dispatch a `linter` or return nested dispatch requests.

## Agent roster

- `skill-writer` (`@SKILL-WRITER`) authors every change to agent skills and every large or novel change to other agent-facing text: `.omp/agents/`, `AGENTS.md`, runbooks and pointers, plus a skill's eval cases in `evals/cases.yaml`. It writes agent-facing text and configuration only, and returns each code change as a `coder` dispatch request. The orchestrator writes its briefs and owns acceptance criteria, Wiki and integration. The writer diagnoses past each brief and fixes the contributing factors it finds in the same patch (`.omp/agents/skill-writer.md` step 1). Briefs leave the writer's own verification on, and the orchestrator reruns those checks only as acceptance. When the defect was observed in a run, wait until every ingest subagent in that batch has finished, then pass all their finished `history://` transcripts together.
- `coder` (`@CODER`) makes every code change: `src/`, `scripts/`, `evals/` code, tests and `python/`, with the configuration and dependencies they need. Brief one narrow change per dispatch with its target files, the change and its acceptance. It proves the change with the targeted test that fails before and passes after, or the one command the change needs, and runs broader checks only for a cross-cutting change.
- `test-subject` (`@TEST-SUBJECT`) runs each eval case, `smart-test-subject` (`@SMART-TEST-SUBJECT`) a case marked `subject: smart`, and `prose-grader` (`@PROSE-GRADER`) grades rubrics independently. Their `tools:` are read-only except Runner `bash` for diagnostic CLI, batched per `skill://dogfood` `references/evals.md`.
- `creative-writer` (`@CREATIVE-WRITER`) takes Story prose drafts and other explicit creative-writing dispatches outside skill evals.
- `persona` (`@PERSONA`) plays exactly one NPC in a Simulation, dispatched only by `simulate-npcs`.
- `transcript-reader` (`@TRANSCRIPT-READER`) reads Transcript chunks and verify ranges into Session Ledger files, dispatched by the top-level session per `ingest` `references/transcript.md`.
- `linter` (`@LINTER`) is described in [Linter](#linter).

## Models

A dispatch runs on its agent's model: `task.agentModelOverrides.<agent>`, else the agent's frontmatter `model`, whose `@ROLE` resolves through `modelRoles` in user `~/.omp/agent/config.yml`. Roles hotlink to a small concrete base through `@` aliases: `slow`, `advisor` and `SKILL-WRITER` → `@plan`, `vision` → `@commit`, `memory` → `@TEST-SUBJECT`, `PERSONA` → `@default`, `SMART-TEST-SUBJECT` → `@task`. Changing a base changes each alias of it.

Each role has a `retry.fallbackChains.<ROLE>` chain that moves a rate-limited or quota-dead primary across providers, stepping down the DM's tiers (`usageAwareFallback`). OpenAI selectors never appear in a decision-class chain (`plan`, `slow`, `advisor`, `skill-author`, `SKILL-WRITER`). GitHub Copilot selectors, whose quota is scarce, sit mid-chain only, never as a chain's last stop or sole entry. That fallback is the DM's policy, so keep dispatching as normal.

`task` items and eval `agent()` take no `model`. When a batch needs another model, set `task.agentModelOverrides.<agent>` in `.omp/config.yml` to a role alias (`@ROLE`) or an ordered list of selectors before dispatching (the next launch reads it without a restart), and remove that entry once the batch returns. An override set to one `provider/model` selector falls back only along the `default` chain.

Codex Luna takes routine, judgement-free tasks (commit messages, memory titles, vision descriptions, transcript chunks, single-file lint repair, test subjects), each brief extremely tightly scoped with clear acceptance. Luna never takes repo plans, decisions or skill writing.

Choose models for these roles from evidence gathered through `skill://model-evidence`:

- **Test subjects** alternate between GLM and Codex as usage allows: `@TEST-SUBJECT` pins Codex GPT-6-luna with a GLM-5.3-flash chain. The model is the cheapest realistically capable of the task, since a weak model exposes unclear instructions a strong one compensates for.
- **Graders** (`prose-grader`) run on a vendor outside every subject they grade. When `@PROSE-GRADER` shares the vendor of a subject's `Model:` line, set another grader for that batch. The Benchmark Council is the exception by design (ADR 0038).
- **Benchmark seats** (`model` and `thinking-level` in each `bench-runner-<family>` and `bench-grader-<family>` definition, identical in the pair) get the best reasonable model and reasoning effort per family with confirmed usage. Fable is never seated.

Preserve each completion's model selector, identity and thinking level where observed, and pair only matching identities and thinking levels.

## Revive or dispatch fresh

Place each follow-up by context use, reasoning quality and token cost together. **Revive** the idle or parked agent that holds the context when the work builds on files it read and decisions it made: it pays only for the new instruction. A worker whose result names a next step it could have taken is revived with the instruction to take it; after two such revivals on one task, read its `history://` transcript for the blocker before sending more. Before re-briefing an agent or fixing the skill it ran, check what it did (tool errors, cost, friction) with `skill://oh-my-pi-session-history`.

**Dispatch fresh**, with a distilled brief, when the work is unrelated or fits a different specialist, and for each alternative approach to the same work. A slice that must run in parallel or a holder whose context is near full also gets a fresh agent.

## Nested dispatch

Within `task.maxRecursionDepth: 3` in `.omp/config.yml`, a subagent dispatches its own subagents (`task` or eval `agent()`) only for work inside its slice that would otherwise pull its focus: a large mechanical side slice or an independent part that truly runs in parallel. Splitting a small task across workers costs more tokens than it saves. Transcript ingest runs as flat stages from the top-level session (ADR 0021): each stage returns the dispatches it needs. An agent without the `task` tool (at the depth limit, or a native agent whose definition doesn't declare `spawns`) does any plain `task` part itself and returns each other dispatch as a request with its exact task text. Its caller dispatches each request it judges fit, then resumes the requester by message with the results.

## Linter

`linter` (`@LINTER`) repairs every lint finding on one file per dispatch, a Wiki page or an agent-facing file, and returns its final check output. It is an optional convenience for a run left to lint several files unrelated to its task, since each agent lints the files it edits (root `AGENTS.md` **Gate scope**, ADR 0047). Brief it with one file path, plus the check command when the path leaves it unclear.

It applies each rule and template exactly as written, including one a migration left behind the DM's intent. Before the first dispatch, bring the rules and templates its files are checked against in line with the DM's current intent. Dispatch one `linter` and read how its return treats the file before you send more. When a return shows a rule or template out of line with that intent, fix it or the instruction behind it at the source, or return a `coder` request or a DM question. The dispatcher carries out the linter's handoffs to other files.

## Gate detail

The `wiki-check` hook (`.omp/hooks/post/`) appends read-only `bun run cfcli -- check --json "<page>"` findings to a `wiki/` edit's result for every layer but `boilerplate`, and that check meets any skill step that says to check the page. Repairs on a Wiki page follow `skill://lint` § Repairs, § Names and `prose.md`. A page gate over listed pages evaluates only those and reads the rest of the Wiki as context, so editing one page can change another's findings. It leaves out the `index` layer, and `hot`, `log` and `mermaid` when none of its pages is one they check. The full gate runs every layer (`skill://lint`, Whole Wiki).
