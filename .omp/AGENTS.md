# Campaign Foundry in oh-my-pi

@../AGENTS.md

## Wiki access

Read from the Backup and write to `wiki/`. `user-config.md` **Wiki access** defines the vault and repo roots. Before a run's first Backup or QMD search, read `docs/agents/wiki-search.md` for query grammar and citation mapping.

- **Read from the Backup**, the Notion page "campaign-foundry backup" (`3f20216635ec815c9ba6dacbda0f6f1b`), synced on each push to `main` (`docs/notion-backup.md`). Answer general questions, surveys and task context through `xd://mcp__notion_search` scoped to that root, citing each page by the repo path its header gives. Read `campaign-config.md`, `hot.md`, `index.md` and `log.md` by path from `wiki/`.
- **Write to `wiki/`.** Read each page from `wiki/` immediately before editing it there, since the next sync overwrites any edit made in Notion. For this Campaign the Wiki takes precedence over the Second Brain.
- **QMD and `wiki/`** answer what the Backup can't: unpushed Wiki work (`git status --short wiki/`, `git diff --name-only @{u} -- wiki/`), pages outside the Shattered Sea Wiki, `raw/`, `archive/`, aliases, and every read in a session without `xd://mcp__notion_search` (Eval Runners, `omp -p`).

## Memory

The `mnemopi` backend injects a `<memories>` block on a session's first turn and retains completed turns. Each step that uses a memory device (`xd://recall`, `xd://retain`, `xd://memory_edit`) runs only when your system prompt lists it.

- **Follow** the injected block as background. A DM decision in it stands until the DM's current instruction overrides it. Check it against the repo before acting on it.
- **Recall** once per DM request with one specific query about its subject, and again when the task turns on a past decision the repo doesn't show.
- **Restate** each DM correction or decision back in one durable sentence saying what to do and where it applies.
- **Promote** a durable project rule to its repo owner (root `AGENTS.md` **The repo is the memory**) in the same change.
- **Maintain** recalled memories: repair one that is stale or conflicts with the repo or the DM (they win) by reading `memory://<id>` whole and using `memory_edit`.
- **Write** only durable facts with no repo home, after a `recall` shows they aren't stored. Keep task state in `context_notes`. Set `scope: "global"` only for a lesson true in every project.
- **Brief** each subagent with the memories bearing on its slice.

## Native delegation

Delegate through native `task` or eval `agent()`/`workpool()`, and give each item the `effort` its work needs. Agent roster, model mechanics, revive-or-fresh, nested dispatch and the `linter` protocol: `docs/agents/delegation.md`.

**Split by domain.** Code goes to `coder` and agent-facing text to `skill-writer`, **Fix on sight** errors included, each with a brief complete enough to finish it. The top-level session dispatches that work, a subagent returns it as a dispatch request (root `AGENTS.md` **Nested dispatch**), and each run carries on with its own task meanwhile.

**Route friction.** A `task`, `wait` or `proc` result ends on `Model: <model>`, the authority for which model ran. When any closing line is a `Gap:` line or a `Friction:` line other than `Friction: none`, start a friction-started `skill://dogfood` run (at once for your own lines, after the batch returns for reported ones). It dispatches your `skill-writer` with every issue and the finished `history://` transcripts, then each `coder` request the writer returns, while you keep to your task. A subagent with its own workers passes their lines up in its return.

Give writers disjoint files, or `isolated: true` when they may overlap. Message a worker only with work, and steer a running one with `write agent://<id>`. Subagents use read-only git, and the top-level agent commits.

**Model choice.** The DM's provider tiers, set in `modelRoles` and `retry.fallbackChains`, pick each role's model, with Opus 5.5 for skill writing and orchestration, GPT-6.1 Sol for code, `zai/glm-5.3` for creative and default work, `zai/glm-5.3-flash` for mechanical work and test subjects, Codex Luna for tightly scoped judgement-free tasks. Give each item the cheapest model capable of it. Graders run on a vendor outside every subject they grade. Overrides and seat criteria: `docs/agents/delegation.md` § Models.

## Tools

- **Internal first.** Use the harness tools (LSP, judge, QMD devices) and this repo's `cfcli`. The shell blocks `grep`, `rg`, `cat`, `head` and `tail`. Run `omp` only for the `omp -p` processes a skill names, such as description trigger checks.
- **Read whole files.** Follow every `read` footer (`Use :N to continue`, `artifact://<id>`) until none remains. Read `:raw` when exact text matters, and take an edit's tag from a plain `read`.
- **TypeScript diagnostics.** Request `lsp` diagnostics on touched TypeScript before reporting code complete.
- **Lint** with `bun run lint [agents|prose|code] [paths…]`, and apply safe fixes with `bun run fix`.
- **Library docs** come from Context7 (`skill://context7-mcp`) whenever code touches a library, framework, CLI or API.
- **Judge** bounded classification with eval `judge`/`judge_batch` (`xd://eval/judge`), batching questions over the same evidence, and inspect `item.error` before concluding. Beyond that, build with TypeSafe (`skill://typesafe-ai`), whose code outside the session reads `TYPESAFE_API_KEY`.
- **Grade** authored prose with `prose-grader` (`skill://dogfood` `references/evals.md`). Check generated pages from the command's output, and open a browser only when the DM asks.
- **Track goals.** The top-level session turns each goal and acceptance criterion into a `todo` and finishes only when none is pending.
- **Long work.** Keep `context_notes` current and call `new_context` at phase boundaries.
- **Waiting.** Results and messages arrive on their own, so call `wait` only when they alone unblock you. A worker reports a blocker to its parent (**Message with work**). Give a command past 300 s a covering `timeout`.

## Skill tooling

Read `skill://dogfood` before changing a skill, agent definition or process or running its `evals/cases.yaml` (ADR 0034), `skill://skill-creator` before creating a skill, and `skill://dnd-benchmark` before ranking Matrix families. Where `.omp/skills/` and `.agents/skills/` both hold a skill, the `.omp/` copy is the source of truth. `manage_skill` stores only the DM's cross-project procedures.

## Configuration

When the DM asks to change what the repo or harness can do, read `skill://extending-omp` first. Native agents are defined in `.omp/agents/` with narrow responsibilities. Add a project agent rather than overriding a bundled one. Before changing configuration, inspect the effective settings and preserve unrelated overrides, approvals and providers. The Notion MCP server stays in user-level `~/.omp/agent/mcp.json`. This file imports the root `AGENTS.md`; keep project rules there and tool, agent and configuration mechanics here.
