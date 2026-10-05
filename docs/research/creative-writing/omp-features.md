# OmpFeatures report (verbatim scout output)

# omp features → creative-writing workflow

## Feature table

| Feature | Lives at | Trigger / syntax core | Fit for this workflow |
|---|---|---|---|
| TTSR rules | `.omp/rules/<name>.md` | Frontmatter `condition` (regex), `astCondition`, `question`; fires on violating streamed output | **Strong** — em dashes, PC interior, Narration laws |
| Always-apply rules | same file, `alwaysApply: true` | Full body in every system prompt | Strong for short hard law (existing `user-config.md`) |
| Rulebook rules | same file, `description` only | Listed in system prompt; read via `rule://<name>` | Strong (existing `campaign-config.md`) |
| Skills | `.omp/skills/<name>/SKILL.md` | Model-invoked, `skill://<name>`, `/skill:<name>` | Strong — pipeline stages |
| Agents | `.omp/agents/*.md` | Native `task` dispatch; async + `agent://` steering | **Strong** — per-NPC persistent writers |
| Hooks/extensions | `.omp/hooks/pre\|post/*.ts,js` | `pi.on(event)` factories | Situational — mechanical transforms, audit |
| Custom tools | `.omp/tools/*.ts` | Model-callable, `pi.zod` schema | **Non-fit** — `cf` CLI already covers it via bash |
| Context files | `.omp/AGENTS.md`, `RULES.md` | Auto-injected `<repo-rules>`; `@path` imports | Strong — standing law |
| Magic keywords | user prompt prose | `ultrathink`, `orchestrate`, `workflowz`, `jevify` | Nice-to-have |
| context_notes / new_context | built-in tools | 16 KiB notebook; survives rollover | Complements `local://collab-notes.md` |
| Memory backends | `memory.backend` config | `off\|local\|hindsight\|mnemopi\|sharpshooter` | Sharpshooter already active — keep |
| ask tool | built-in | Option-picker dialog | **Non-fit** in collab (skill forbids it) |
| todo tool | built-in | Phase/task ops (`init/start/done/…`) | Modest — chain tracking |
| Slash commands | `.omp/commands/*.md` | `$ARGUMENTS`, `$1`, `$@[start:length]` | Redundant — `/skill:<name>` suffices |
| System prompt files | `APPEND_SYSTEM.md`, `SYSTEM.md`, `SYSTEM_TEMPLATE.md`, `PERSONALITY.md` | Append vs replace block 0 | APPEND for global prose law |
| Eval judge | eval kernel `judge`/`judge_batch` | Bounded yes/no/ranking over small state | Powers judged TTSR rules and critique batching |

## 1. TTSR rules (the enforcement layer)

**What.** Markdown files in `.omp/rules/*.md` (project; user: `~/.omp/agent/rules/`). Frontmatter fields, verbatim: `description`, `globs`, `alwaysApply`, `condition` (regex; legacy `ttsr_trigger` accepted), `astCondition` (ast-grep patterns), `question` (judged), `scope`, `agents`, `interruptMode`. A rule with a non-empty `condition`/`astCondition`/`question` that registers is **TTSR-only**; it matches the assistant stream (text/thinking/tool args) and injects `<system-interrupt reason="rule_violation" rule="…">` after aborting the turn (or a passive `<system-reminder>` when non-interrupting).

**Trigger patterns.**
- Regex on prose: fires mid-stream, per `interruptMode`.
- Judged `question`: natural-language yes/no answered by the `judge` model role **after** an output completes; never interrupts. A yes ≥ 0.7 delivers the rule via `ttsr-warning.md` as an aside (`deliverAs: "aside"`) — mid-run it joins the next step; idle, it starts a turn.
- Scope tokens, verbatim: `text`, `thinking`, `tool`/`toolcall`, `tool:<name>(<path-glob>)`, e.g. `scope: "tool:edit(*.md)"`. Omitted scope watches `text` + all tools, **not** thinking.

**Settings** (config.yml), defaults: `ttsr.enabled: true`, `ttsr.judge: auto` (`auto` needs a native TypeSafe jev judge; `on` uses whatever the role resolves; `off` never judges), `ttsr.contextMode: discard` (drop violating partial output before retry), `ttsr.interruptMode: always`, `ttsr.repeatMode: once`, `ttsr.repeatGap: 10` (completed turns), `ttsr.disabledRules: []`, `ttsr.builtinRules: true`.

**Snippet — em-dash law (regex, non-interrupting coach):**
```yaml
---
description: Narration must not contain em dashes.
condition: "—"
scope: text
interruptMode: never
repeatMode: after-gap
repeatGap: 3
---
Rewrite the passage replacing every em dash with plainer punctuation...
```
With `interruptMode: never`, prose matches queue a **deferred hidden injection** after the successful message — the DM-visible riff is never aborted mid-stream.

**Snippet — PC interior (judged, no regex can express it):**
```yaml
---
description: The Players own their characters; never narrate a PC's inner life.
question: "Does the narration state a player character's inner thoughts, feelings, or decisions?"
scope: text
---
Never speak a PC's interior. Show their outward words and actions only...
```

**Fit notes.** Target these rules at the writing agents with `agents:` (glob against the agent definition name, e.g. `agents: [creative-writer]`; literal `main` = top-level session; omitted = every agent). Critique passes fit the judged form; divergent-alternative checks could be a `question` over tool outputs. `/omfg` can author candidate rules from conversation history.

**Gotchas.** Judged rules never fire mid-stream and cost a judge call per in-scope output; `ttsr.judge: auto` silently no-ops judging without the native judge. `repeatMode: once` is the default — a rule fires once per session unless `after-gap`; after reload, restored ages restart at zero. A TTSR rule with `globs` requires a file path in the match context — **never set `globs` on prose rules**. Rule dedupe is name-based first-wins (filename = name); never name a rule `RULES`/`RULES@project` (shadows the sticky files). A `condition` value that looks like a file glob is silently converted to `tool:edit(...)`/`tool:write(...)` scope. Invalid regex: skipped with warning. `ttsr.disabledRules` is the DM's per-rule kill switch — exactly the "switch that rule off?" relay the collab skill already anticipates.

## 2. Always-apply and rulebook rules

`alwaysApply: true` → full body auto-injected into the system prompt (existing `user-config.md` works this way). `description` only → rulebook: rendered as `- <name> (<globs>): <description>` under `<domain-rules>`, read on demand via `rule://<name>`. Both `alwaysApply` and `description` → always-apply only. `agents:` filters per agent at session creation.

**Fit.** Campaign-wide hard law that must survive long collab sessions (story-first principle) belongs always-apply; keep it short — it rides every request. Per-campaign pointers stay rulebook (`campaign-config.md` precedent).

## 3. Skills — and yes, they are slash-commands

Layout: `.omp/skills/<name>/SKILL.md`, one level deep, **non-recursive**. Frontmatter, verbatim: `name`, `description` (required for native discovery), `globs`, `alwaysApply`, `hide`, `disable-model-invocation` (kebab normalized to `disableModelInvocation`), `enabled: false`. `globs`/`alwaysApply` are inert metadata on skills, not invocation controls.

**Slash-commands:** when `skills.enableSkillCommands` is true, every discovered skill registers `/skill:<name> [args]`. Delivery follows the submission keybinding: **Enter** → steer while streaming; **Ctrl+Q/Ctrl+Enter** → followUp; both idle → normal prompt. Mid-prose tokens (`... /skill:collab-with-me ...`) are recognized too. `collab-with-me` already uses `disable-model-invocation: true`, so only the DM can summon it — exactly right for a DM-activated entrypoint. Pipeline stages (story-first draft, D&D adaptation, divergent alternatives, critique) fit as skills or skill references (`skill://<name>/<path>` for shared reference docs), injected into workers via agent `autoloadSkills`.

**Gotchas.** `hide: true` does **not** disable — the skill stays reachable via `skill://` and `/skill:`. Nested `group/skill/SKILL.md` is not discovered unless `skills.customDirectories` points at the nested parent. Name collisions: higher precedence keeps the bare name, the loser gets `skill://<namespace>/<name>`. `name` cannot contain `/`.

## 4. Agents — isolation and persistence

Location: `.omp/agents/*.md` (project, wins) over `~/.omp/agent/agents/*.md`. Required frontmatter: `name`, `description` (body = system prompt). Optional, verbatim: `tools` (CSV/array; `yield` auto-added; `tools: []` grants only `yield`), `spawns` (`*`/CSV/array; implied `*` if `tools` includes `task`), `model` (one selector, CSV, or prioritized array; `@role` expands through `modelRoles.<role>` in config.yml; `:high`-style suffix allowed), `thinking-level`/`thinking`, `output` (schema), `blocking: true`, `autoloadSkills` (list, injected before first child prompt via the `autoload.md` template), `read-summarize: false`, `prewalk`, `advisor`.

**Persistence.** With `blocking: false` the parent dispatches async and keeps chatting: the agent parks with its accumulated context, receives follow-up work via `agent://<id>` messages (status/progress readable there; `history://<id>` for transcripts), is steerable from the Agent Hub (Alt+A), and revives on message. **Idle TTL:** no idle TTL or expiry is documented in the read doc set [INFERENCE — parked agents persist for the session; `proc://<id>/kill`-style cancellation and the `wait` tool are the lifecycle controls]. Repo precedent: `creative-writer` already pairs a model fallback chain, `autoloadSkills: [humanizer]`, and `tools: [read, yield]`.

**Fit.** Per-NPC character agents = one agent def (or per-dispatch briefs to `creative-writer`) with the NPC's voice/canon sources in `autoloadSkills` or the brief; async so the DM's chat stays free (the collab skill already mandates "dispatched work reports in on its own"). Model precedence: per-call `model` > `task.agentModelOverrides[agentName]` > frontmatter `model` > parent's model.

**Gotchas.** `main`/`sub` are reserved agent names. `task.maxRecursionDepth` default 2. Subagents don't inherit `todo`. Parent rules are re-evaluated under the agent's name via the rules' `agents:` field. Plan mode clamps child tools to read/grep/glob/web_search (+ `ast_grep` if declared). Session-defined agents append after discovered ones (name collision: existing agent wins); names are case-sensitive.

## 5. Hooks / extensions

Layout: **only** `.omp/hooks/pre/*.{ts,js}` and `.omp/hooks/post/*.{ts,js}` (project) and the same under `~/.omp/agent/hooks/` — a factory directly in `hooks/` is not discovered. Contract: default-exported factory registering `pi.on(...)`; loaded through the extension runner, so prefer `ExtensionAPI` types (`HookAPI` is legacy).

Events: `tool_call` → `{ block?, reason?, input?, additionalContext? }`; `tool_result` → `{ content?, details?, isError?, additionalContext? }`; `context` → `{ messages? }` before each LLM call; `session_start`, `before_agent_start` → hidden injected message; `ttsr_triggered`; extension-only `assistant_message` (rewrite finalized text blocks in place, count/order fixed) and `input` (submission ingress).

**Fit.** qmd-refresh.js already covers post-write reindexing. A mechanical em-dash stripper fits `assistant_message` — but it silently rewrites what the DM saw streaming, so it conflicts with "the reply is the writing": TTSR's visible rule-violation loop is the better owner of style law. Keep hooks for non-negotiable mechanics (audit log, redaction).

**Gotchas.** Use `ctx.setTimeout`/`ctx.setInterval` — a throw from a raw timer is a fatal uncaughtException that tears down the session. `additionalContext` from `tool_result` is discarded when the call is blocked/denied/fails. `context` transforms don't rewrite persisted history. `session_stop` never fires for task/subagent sessions.

## 6–7. Custom tools, context files

Custom tools (`.omp/tools/*.ts`, `pi.zod` schema, globally unique names, `loadMode: "discoverable"` default): **non-fit** — `cf` already exposes filing/lint/encounter flows through bash; a wrapper tool would be a second convention.

Context files: `.omp/AGENTS.md` is native project context (priority 100), injected in `<repo-rules>`; discovery stops at the **nearest non-empty `.omp/`** walking to repo root. `@path` imports expand inline (relative to the importing file, 5 hops, cycles skipped, code spans untouched). Sticky `RULES.md` exists only at `~/.omp/agent/RULES.md` and the nearest non-empty project `.omp/RULES.md`, forced always-apply. `.omp/AGENTS.md` imports `@../AGENTS.md` precisely because native shadows a root `AGENTS.md` at the same depth. **Fit:** standing workflow law (story-first, players-own-PCs) goes in these files; enforcement goes TTSR.

## 8–10. Magic keywords, notes, memory

**Magic keywords:** `ultrathink` (highest reasoning effort for the turn), `orchestrate` (multi-agent contract, needs `task`), `workflowz` (eval-kernel workflow; settings key `magicKeywords.workflow`), `jevify` (bulk judge classification; needs `eval`). Exact lowercase, standalone prose, turn-scoped; synthetic prompts never trigger; global switch `magicKeywords.enabled`. **Fit:** DM typing `ultrathink` inside collab when an idea needs depth; `jevify` for bulk rubric audits over many pages.

**context_notes / new_context:** experimental notebook tool, 16,384-byte cap, replace-on-write, branch-scoped; requires `compaction.experimentalContextManagement: true` and all four tools active (`context_notes`, `new_context`, `read`, `grep`) for rollover. **Fit:** complements `local://collab-notes.md` — the collab notes are the workflow's durable artifact; context_notes is what survives a rollover mid-session. Gotchas: writes replace the whole notebook; oversized writes fail.

**Memory:** the repo already runs `memory.backend: sharpshooter` (friction-gated DM decision files, injected as the **Project decision memory** block, governed by `.omp/AGENTS.md`). Keep it. `autolearn.enabled`/`learn` (local backend only) and `memory.backend: local` are alternatives, not needed.

## 11–12. ask, todo

**ask:** option-picker dialog (`questions[]` with `id/question/options/multi/recommended`); needs `hasUI`; `ask.timeout` default 0; concurrency exclusive. **Non-fit in collab** — the skill explicitly forbids it ("never as a numbered list and never through the `ask` tool"). Legitimate elsewhere: config decisions (which lint rule to disable).

**todo:** single-op params (`init/start/done/drop/block/unblock/rm/append/view`), phases with one active task. Modest fit for tracking the ingest→lint chain in-session (collab currently tracks chain state in the notes). Gotchas: subagents don't inherit `todo` (except prewalk-armed); a failed op discards all its mutations; gated by `todo.enabled`.

## 13–15. Slash commands, system prompt, eval judge

**File slash commands** (`.omp/commands/*.md`, `$ARGUMENTS`/`$1`/`$@[start:length]`): redundant — `/skill:collab-with-me` already invokes the entrypoint; add a command only if you want argument templating. Built-ins are dispatched before file commands; unknown `/x` falls through as prose.

**System prompt files:** `APPEND_SYSTEM.md` adds standing text while keeping the whole default prompt (the right route for global prose law); `SYSTEM.md` replaces the default instruction block and **loses** its tool policy/workflow sections; `SYSTEM_TEMPLATE.md` is Handlebars (`{{toolInventory}}`, `{{skills}}`, … — only referenced fields render); `PERSONALITY.md` is user-dir only. Policy statement in APPEND, enforcement in TTSR.

**Eval judge:** `xd://eval/judge` is not mounted in this session (read tool returned "Tool 'eval' has no doc topics"; `xd://` itself unmounted). Quoting `.omp/AGENTS.md` verbatim: "**Judge** bounded classification, yes/no or ranking over a small state with eval `judge`: read `xd://eval/judge` once, batch independent questions over the same evidence into one call and use `judge_batch` for multiple states. Send only the evidence the criteria need; a failed judge item is a tool failure, so inspect `item.error` before concluding." This is the same judge machinery judged TTSR rules use via the `judge` model role and `ttsr.judge`.

## Recommended split

| Constraint | Mechanism |
|---|---|
| No em dashes in Narration | TTSR regex rule, `scope: text`, `interruptMode: never`, `repeatMode: after-gap` |
| Players own their PCs | TTSR judged `question` rule, `scope: text` |
| Story-first then D&D adaptation | Skill stages (`skill://…`), orchestrated by collab-with-me |
| Divergent alternatives + critique | Parallel async agents (`blocking: false`) + `prose-grader`-style judged dispatches |
| Per-NPC persistence | Async task agent + `agent://` steering, context kept in its session |
| Standing law | `.omp/AGENTS.md` / always-apply rule; enforcement TTSR |
| Long-session memory | `local://collab-notes.md` (workflow) + `context_notes` (rollover) + sharpshooter (decisions) |
| Filing | Existing ingest→lint chain; `qmd-refresh` hook keeps the index live |