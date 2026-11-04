# Delegation mechanics

Detail behind `.omp/AGENTS.md`. Dispatch through native `task` or eval `agent()`/`workpool()`. Each brief gives the target and the change, and says what output comes back.

## Agent roster

- `skill-writer` (`@SKILL-WRITER`) writes agent skills and other agent-facing text (`.omp/agents/`, `AGENTS.md`, runbooks and pointers), plus a skill's eval cases in `evals/cases.yaml`. It writes agent-facing text and configuration only, and returns each code change as a `coder` dispatch request. It diagnoses past its brief and fixes the contributing factors it finds in the same patch (`.omp/agents/skill-writer.md` step 1). When the defect was observed in a run, pass it every finished `history://` transcript of that batch together.
- `coder` (`@CODER`) makes code changes: `src/`, `scripts/`, `evals/` code, tests and `python/`, with the configuration and dependencies they need. Brief one narrow change per dispatch with its target files, the change and its acceptance.
- `test-subject` (`@TEST-SUBJECT`) runs each eval case, `smart-test-subject` (`@SMART-TEST-SUBJECT`) a case marked `subject: smart`, and `prose-grader` (`@PROSE-GRADER`) grades rubrics independently. Their `tools:` are read-only except Runner `bash` for diagnostic CLI, batched per `skill://dogfood` `references/evals.md`.
- `creative-writer` (`@CREATIVE-WRITER`) takes Story prose drafts and other explicit creative-writing dispatches outside skill evals.
- `persona` (`@PERSONA`) plays one NPC in a Simulation, dispatched by `simulate-npcs`.
- `transcript-reader` (`@TRANSCRIPT-READER`) reads Transcript chunks and verify ranges into Session Ledger files, dispatched by the top-level session per `ingest` `references/transcript.md`.
- `lookup` (`@LOOKUP`) takes read-only lookups and sweeps, such as a Wiki lore sweep, a legacy-repo search with full git history or a web search, and returns its full findings in its reply.
- `linter` (`@LINTER`) is described in [Linter](#linter).

## Models

A dispatch runs on its agent's model: `task.agentModelOverrides.<agent>`, else the agent's frontmatter `model`, whose `@ROLE` resolves through `modelRoles` in user `~/.omp/agent/config.yml`. Write each definition and brief for the model family its role resolves to, per `skill://agent-design` § Consumer model.

`task` items and eval `agent()` take no `model`. When a batch needs another model, set `task.agentModelOverrides.<agent>` in `.omp/config.yml` to a role alias (`@ROLE`) or an ordered list of selectors before dispatching (the next launch reads it without a restart), and remove that entry once the batch returns.

Choose models for these roles from evidence gathered through `skill://model-evidence`:

- **Test subjects** run on the cheapest model realistically capable of the task, since a weak model exposes unclear instructions a strong one compensates for.
- **Graders** (`prose-grader`) run on a vendor outside every subject they grade. When `@PROSE-GRADER` shares the vendor of a subject's `Model:` line, set another grader for that batch. The Benchmark Council is the exception by design (ADR 0038).
- **Benchmark seats** (`model` and `thinking-level` in each `bench-runner-<family>` and `bench-grader-<family>` definition, identical in the pair) follow `skill://model-evidence` § Refresh Benchmark seats.

## Dispatch requests

An agent without the `task` tool (at `task.maxRecursionDepth`, or a native agent whose definition doesn't declare `spawns`) does any plain `task` part itself and returns each other dispatch as a request with its exact task text. Its caller dispatches each request and briefs a fresh agent with the results. Transcript ingest runs as flat stages from the top-level session (ADR 0021), and each stage returns the dispatches it needs.

## Linter

`linter` (`@LINTER`) repairs the lint findings on the files its brief names, Wiki pages or agent-facing files, and returns its final check output. Each agent lints the files it edits (ADR 0047), so the `linter` suits a run left to lint several files unrelated to its task. Brief it with the file paths, plus the check command when the paths leave it unclear. It applies each rule and template exactly as written, so a return that shows a rule or template out of line with the DM's intent means fixing that rule, template or the instruction behind it at its source.

## Gate detail

The `wiki-check` hook (`.omp/hooks/post/`) appends read-only `bun run cfcli -- check --json "<page>"` findings to a `wiki/` edit's result for every layer but `boilerplate`, and that check meets any skill step that says to check the page. Repairs on a Wiki page follow `skill://lint` § Repairs, § Names and `prose.md`. A page gate over listed pages evaluates only those and reads the rest of the Wiki as context, so editing one page can change another's findings. It leaves out the `index` layer, and `hot`, `log` and `mermaid` when none of its pages is one they check. The full gate runs every layer (`skill://lint`, Whole Wiki).
