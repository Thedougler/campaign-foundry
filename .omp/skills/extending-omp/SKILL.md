---
name: extending-omp
description: Extending omp, least-power first. Use when omp's current tools, skills, rules, hooks or settings cannot meet the user's objective; when choosing among context, rule, skill, prompt template, TTSR, setting, model role, agent, Advisor, Prewalk, Vibe, custom tool, hook, extension, MCP, plugin, SDK, RPC or ACP; when a request or plan names adding or changing a tool, hook, skill, plugin, MCP server, extension, model role or agent; or when embedding omp in a Bun/TypeScript app, a Python/Go/Rust host or an editor.
---

# Extending omp

Extend omp with the **least-power** mechanism: the first row of the [ladder](#least-power-ladder) that expresses the requirement. Move down a row only when the row above cannot express the requirement, and state what it cannot express. The running session and the installed release are the source of truth. Where research notes or `main`-branch docs disagree with their tool lists, settings and `omp://` docs, follow the installed release. The extension serves the user's objective, so finish by meeting that objective with it.

## Steps

### 1. Inspect live capability

Establish what this session and this install already have before designing anything:

- Your system prompt lists the loaded tools, skills, rules, MCP routes and agents. Read those first.
- From the repo root, run:

  ```bash
  omp --version
  omp plugin list
  omp ttsr list
  omp config get <key>
  ```

  Run `omp config get` once for each setting the objective touches.
- Glob `.omp/` and `~/.omp/agent/` for agents, skills, rules, prompts, commands, tools, hooks, extensions and `mcp.json`, then read `.omp/config.yml`.
- Read the `omp://` index, then the doc of every built-in that sounds close to the objective, such as `omp://tools/task.md` or `omp://settings.md`. When a published skill may already cover the gap, read `skill://find-skills`.
- `/tools`, `/extensions`, `/mcp test <server>` and `/advisor status` are views the user types. Ask the user for their output only when the commands above cannot show the same state.

Write three lines in your working notes, labelled **Objective**, **Existing** (each relevant capability found) and **Gap** (one sentence: "omp cannot yet …").

**Done when** a built-in or setting meets the objective (use it, report it and stop), or the Gap states a requirement that every listed capability fails, with the reason each one fails.

### 2. Choose the row

Read the ladder's **Need** column from the top and take the first row that matches the Gap. Choose the scope with it. Use project `.omp/` for this repository's behaviour and user `~/.omp/agent/` for the user's behaviour across projects. A capability shipped to other installs becomes a plugin.

**Done when** your notes state the mechanism and scope, with one sentence on why the row above it cannot express the requirement.

### 3. Read the installed API

Read every doc in the chosen row's **Read** column. For code (tool, hook, extension, MCP server, plugin, SDK, RPC), also read `skill://context7-mcp` and query library `/can1357/oh-my-pi` for worked examples and source. Context7 follows `main`, which can run ahead of `omp --version`, so keep only the names that the installed docs or types confirm. Depend on the most public surface that works, in this order:

1. Documented CLI, config and protocol.
2. SDK root exports.
3. Documented extension API and types.
4. Documented package subpaths.
5. Internals.

**Done when** every event, field, function, path and setting you will use appears in an installed `omp://` doc or in the `@oh-my-pi/pi-coding-agent` types at the installed version.

### 4. Build

Write each file at the row's **Where** location for your scope:

- **Agent-facing text** (context, rule, skill, prompt, agent definition). This project routes skills through `skill://skill-creator` and other agent-facing text to the `skill-writer` agent, per `.omp/AGENTS.md` § Native delegation. A subagent returns that dispatch as a request, per root `AGENTS.md` **Flat dispatch**.
- **Settings**: edit `.omp/config.yml` by hand for project keys, since `omp config set` writes the global file. Keep unrelated overrides as they are (`.omp/AGENTS.md` § Configuration).
- **Code**: apply [Authority and cost](#authority-and-cost). Pin `@oh-my-pi/pi-coding-agent` as a dev dependency at the version `omp --version` prints. A globally installed copy can lag the binary. A new package declares its entry points under `omp.extensions` in `package.json`. `.omp/hooks/post/qmd-refresh.js` is this project's model of a bounded hook.
- **Embedding**: apply [Host integration](#host-integration).

**Done when** each file is at its discovered location and you have checked it against each Authority and cost rule that applies to it.

### 5. Verify reach

Hooks and extensions load at session start, so prove each change in a fresh process:

| Mechanism | Command |
|---|---|
| Setting | `omp config get <key>` from the repo root |
| TTSR `condition` or `astCondition` rule | `omp ttsr list`, then `omp ttsr test --rule .omp/rules/<name>.md '<violating snippet>'`, adding `--source tool --path <file>` for a tool scope |
| Plugin | `omp plugin doctor` |
| Everything else, including judged `question` rules | `omp -p --no-session "<prompt that needs the new capability>"`, adding `-e <path>` for an extension or hook still in development |

Report the mechanism, why the rows above it fail, the files written and the verification output. Then return to the user's objective and meet it with the new capability.

**Done when** a fresh run shows the objective reached through the new mechanism and the report quotes that run's output.

## Least-power ladder

Rows run from least to most power. **Where** gives the project location. The user location is the same subpath under `~/.omp/agent/`.

| Need | Mechanism | Move down when | Where | Read |
|---|---|---|---|---|
| Behaviour an existing setting controls | Setting | no setting covers it | `.omp/config.yml` | `omp://settings.md` |
| Invariant every turn needs | Context file, or sticky `RULES.md` | only some tasks need it | `AGENTS.md`, `.omp/AGENTS.md`, `.omp/RULES.md` | `omp://context-files.md` |
| Guidance for one file class or domain | Rule with `description` and `globs` | it is a procedure, not guidance | `.omp/rules/<name>.md` | `omp://rulebook-matching-pipeline.md` |
| Reusable procedure | Skill | it needs logic, state or UI | `.omp/skills/<name>/SKILL.md` | `omp://skills.md` |
| Repeatable prompt | Prompt template or file command | it needs code | `.omp/prompts/`, `.omp/commands/` | `omp://slash-command-internals.md` |
| Rare, recognisable output mistake | TTSR rule (`condition`, `astCondition` or `question`) | it needs state, counters or hard enforcement | `.omp/rules/<name>.md` | `omp://ttsr-injection-lifecycle.md` |
| Specialist cognition or cost routing | Model role or named agent | it needs continuous review (Advisor), a strong plan before routine coding (Prewalk) or persistent parallel workers (Vibe) | `modelRoles` in `.omp/config.yml`, `.omp/agents/<name>.md` | `omp://task-agent-discovery.md`, `omp://models.md`, `omp://advisor-watchdog.md`, `omp://prewalk.md`, `omp://vibe-mode.md` |
| One new model-callable action | Custom tool; for one session's subagents, an eval `tool()` (`xd://eval/helpers`) | several tools, hooks or commands belong together | `.omp/tools/` | `omp://custom-tools.md` |
| Whenever event X happens, inspect or change it, including provider requests | Hook | it needs UI, commands or broader session authority | `.omp/hooks/pre/`, `.omp/hooks/post/` | `omp://hooks.md`, `omp://skills/authoring-hooks.md` |
| Tools, hooks, commands and UI as one feature | Extension | other installs need it | `.omp/extensions/<name>/` | `omp://extensions.md`, `omp://skills/authoring-extensions.md` |
| Service that is external, polyglot, isolated or shared with other clients | MCP server | an omp-only hot path needs native latency (custom tool) | `.omp/mcp.json` | `omp://mcp-config.md`, `omp://mcp-server-tool-authoring.md` |
| Distribution of a cohesive bundle | Plugin, installed with `omp plugin link <dir>` | it needs catalogue and update listing (marketplace) | package root | `omp://plugin-manager-installer-plumbing.md`, `omp://marketplace.md`, `omp://skills/authoring-marketplaces.md` |
| Embedding in a Bun/TypeScript app | SDK | the host needs process isolation | host code | `omp://sdk.md` |
| Embedding from Python, Go or Rust, or in an isolated process | RPC | tool serving alone suffices (MCP) | host code | `omp://rpc.md` |
| Editor integration | ACP | a custom host needs omp's UI (`--mode rpc-ui`) | editor config | `omp acp --help`, `omp://approval-mode.md` |

## Authority and cost

Approval modes gate prompts, not privileges. Hooks, tools, extensions and plugins run with the user's privileges. Build these limits into each one:

- **Minimum authority.** Typed parameters, an explicit approval class, path containment, network allowlists, input and output size caps, and timeouts.
- **Deterministic policy.** Hard rules run as code at the tool or hook boundary, before side effects. TTSR and judged rules repair output after it is written, so pair them with that code wherever safety is at stake.
- **Secrets.** Credentials come from omp login and secret references (`omp://secrets.md`). Model-visible results show references or redacted values in place of secrets.
- **Trust review.** Read project-discovered hooks, plugins and MCP configs before relying on them. A marketplace listing is distribution, not review.
- **Role separation.** Reviewer agents get read-only `tools:`, and mutation stays with the agents whose work needs it.
- **Bounded hot paths.** A hook returns early on events outside its scope and finishes its work within a timeout.
- **Thin adapter.** omp events and session types stay in a small adapter. The policy and transformation logic behind it is pure and unit-tested.
- **Cost fit.** Frequent small local operations suit a custom tool, and service work suits batched MCP calls. Subagents, Advisor and Vibe pay for extra context and inference, so reserve them for work that amortises it.
- **Built-in observability.** SDK and RPC event streams and `omp stats` come before custom logging. Logs record versions, durations and byte counts, and leave prompts and credentials out. `/dump all` output is sensitive.

## Host integration

- **SDK** (Bun/TypeScript, in-process): construct capability explicitly by passing the tool allowlist, skills, hooks and context files. The host then behaves the same wherever it runs. Consume typed session events for UI and observability, and refresh a live session's MCP tools after server changes.
- **RPC** (other languages, process isolation): run `omp --mode rpc`. A production client waits for the ready event and negotiates the protocol version before sending requests. It correlates request ids and tolerates unknown event types. Stdout stays protocol-only, with diagnostics on stderr, and chunked frames are reassembled. Expose capability implemented by the host as host tools and host URI schemes. A scheme without a write handler is read-only.
- **ACP** (editors): the editor launches `omp acp` over stdio. Model credentials and settings stay in omp's configuration, and omp loads its extensions as usual. Approval behaviour under ACP is in `omp://approval-mode.md`.
