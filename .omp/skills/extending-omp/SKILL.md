---
name: extending-omp
description: Extending omp, least-power first. Use when omp's current tools, skills, rules, hooks or settings cannot meet the user's objective; when choosing among context, rule, skill, prompt template, TTSR, setting, model role, agent, Advisor, Prewalk, Vibe, custom tool, hook, extension, MCP, plugin, SDK, RPC or ACP; when a request or plan names adding or changing a tool, hook, skill, plugin, MCP server, extension, model role or agent; or when embedding omp in a Bun/TypeScript app, a Python/Go/Rust host or an editor.
---

# Extending omp

Extend omp with the **least-power** mechanism: the first row of the [ladder](#least-power-ladder) that expresses the requirement. The running session and the installed release are the source of truth; where research notes or `main`-branch docs disagree with their tool lists, settings and `omp://` docs, follow the installed release. The extension serves the user's objective, so finish by meeting that objective with it.

CLI administration and host launch commands below belong to the human terminal or external host, except the isolated `omp -p` checks this skill names. Read configuration files for discovery, and ask for human-terminal output only when those files and the installed docs cannot resolve the required state.

## Steps

### 1. Inspect live capability

Establish what this session and this install already have before designing anything:

- Your system prompt lists the loaded tools, skills, rules, MCP routes and agents. Read those first.
- Glob `.omp/` and `~/.omp/agent/` for agents, skills, rules, prompts, commands, tools, hooks, extensions and `mcp.json`. Read `.omp/config.yml`, user `~/.omp/agent/config.yml` and the installed `omp://settings.md` for the settings the objective touches.
- Establish the installed version from the running session or installed package metadata.
- Read the `omp://` index, then the doc of every built-in that sounds close to the objective, such as `omp://tools/task.md`. When a published skill may already cover the gap, read `skill://find-skills`.
- `/tools`, `/extensions`, `/mcp test <server>` and `/advisor status` are views the user types. Ask for their output when the files and installed docs cannot show the same state.

When a built-in or setting already meets the objective, use it and stop.

### 2. Choose the row

Read the ladder's **Need** column from the top and take the first row that matches the gap. Choose the scope with it: project `.omp/` for this repository's behaviour, user `~/.omp/agent/` for the user's behaviour across projects. A capability shipped to other installs becomes a plugin.

### 3. Read the installed API

Read every doc in the chosen row's **Read** column. For code (tool, hook, extension, MCP server, plugin, SDK, RPC), also query worked examples and source with `ctx7 docs /can1357/oh-my-pi "<one-topic question>"`; `ctx7 library oh-my-pi "<question>"` lists the indexed versions, and `/can1357/oh-my-pi/<version>` pins one when it matches the installed release. The unversioned library follows `main`, which can run ahead of the installed release. Use only events, fields, functions, paths and settings that an installed `omp://` doc or the `@oh-my-pi/pi-coding-agent` types at the installed version confirm. Depend on the most public surface that works, in this order:

1. Documented CLI, config and protocol.
2. SDK root exports.
3. Documented extension API and types.
4. Documented package subpaths.
5. Internals.

### 4. Build

Write each file at the row's **Where** location for your scope:

- **Settings**: edit `.omp/config.yml` by hand for project keys, since `omp config set` writes the global file. Keep unrelated overrides as they are.
- **Code**: build it to every [Authority and cost](#authority-and-cost) rule that applies. Pin `@oh-my-pi/pi-coding-agent` as a dev dependency at the installed version. A globally installed copy can lag the binary. A new package declares its entry points under `omp.extensions` in `package.json`.
- **Embedding**: apply [Host integration](#host-integration).

### 5. Verify reach

Hooks and extensions load at session start, so prove each change in a fresh process:

| Mechanism | Command |
|---|---|
| Setting | Read the edited configuration and ask the user for resolved state when necessary |
| TTSR `condition` or `astCondition` rule | Ask the user to run `omp ttsr list`, then `omp ttsr test --rule .omp/rules/<name>.md '<violating snippet>'`, adding `--source tool --path <file>` for a tool scope |
| Plugin | Ask the user to run `omp plugin doctor` |
| Everything else, including judged `question` rules | `omp -p --no-session "<prompt that needs the new capability>"`, adding `-e <path>` for an extension or hook still in development |

Report the files written and quote the fresh run's output showing the objective reached through the new mechanism. Then meet the user's objective with it.

## Least-power ladder

Rows run from least to most power. **Where** gives the project location. The user location is the same subpath under `~/.omp/agent/`.

| Need | Mechanism | Move down when | Where | Read |
|---|---|---|---|---|
| Behaviour an existing setting controls | Setting | no setting covers it | `.omp/config.yml` | `omp://settings.md` |
| Invariant every turn needs | Context file, or sticky `RULES.md` | only some tasks need it | `AGENTS.md`, `.omp/AGENTS.md`, or a sticky `RULES.md` created in `.omp/` when needed | `omp://context-files.md` |
| Guidance for one file class or domain | Rule with `description` and `globs` | it is a procedure, not guidance | `.omp/rules/<name>.md` | `omp://rulebook-matching-pipeline.md` |
| Reusable procedure | Skill | it needs logic, state or UI | `.omp/skills/<name>/SKILL.md` | `omp://skills.md` |
| Repeatable prompt | Prompt template or file command | it needs code | Optional prompts directory, created when needed for `.omp/prompts/<name>.md`; optional commands directory, created when needed for `.omp/commands/<name>.md` | `omp://slash-command-internals.md` |
| Rare, recognisable output mistake | TTSR rule (`condition`, `astCondition` or `question`) | it needs state, counters or hard enforcement | `.omp/rules/<name>.md` | `omp://ttsr-injection-lifecycle.md` |
| Specialist cognition or cost routing | Model role or named agent | it needs continuous review (Advisor), a strong plan before routine coding (Prewalk) or persistent parallel workers (Vibe) | `modelRoles` in user `~/.omp/agent/config.yml` (this repo keeps its roles there), `.omp/agents/<name>.md` | `skill://agent-design`, `omp://task-agent-discovery.md`, `omp://models.md`, `omp://advisor-watchdog.md`, `omp://prewalk.md`, `omp://vibe-mode.md` |
| One new model-callable action | Custom tool; for one session's subagents, an eval `tool()` (`xd://eval/helpers`) | several tools, hooks or commands belong together | Optional tools directory, created when needed for `.omp/tools/<name>.ts` | `omp://custom-tools.md` |
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
