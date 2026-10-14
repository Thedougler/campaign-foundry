# Campaign Foundry

Campaign Foundry is an LLM Wiki for a live D&D table. Its one goal is the best-quality, most fun Sessions for the DM's Campaign, filled with professional-grade content the Players find engaging, memorable and fun. That Campaign content (Narration, NPCs, Locations, Creatures, Items, Sessions) is the product, written as an author writes a book. Judge every piece of work by whether it makes the Sessions better.

Evals codify the DM's intent and steer development, so revise a criterion whenever that intent changes. Code automates every deterministic step (the CLI, Checks and Push), so agents spend their reasoning on judgement and creative work.

## Schema

- **Raw**: `raw/` holds files awaiting Ingest, and `archive/` keeps them once ingested.
- **Wiki**: `wiki/`, the compounding Canon. The DM has final say, and the Agent does the bookkeeping. Each page kind's template in `wiki/templates/` states its required properties and sections. Read `docs/wiki-layout.md` before creating or moving a page.
- **Backup**: the Notion copy of `main`'s Wiki and skills, read first (`.omp/AGENTS.md` § Wiki access).
- **Schema**: this file, `CONTEXT.md` (the glossary, imported below: use its term for every domain concept) and `docs/adr/` (read the decisions touching an area before changing it).

Operations, each through its skill:

- **Ingest** (`ingest`, `pull-pcs` for PCs) is done when every statement sits on its page, the file is in `archive/` and `hot.md` is current.
- **Query** (`query`) is done when every fact cites a page read this run and a keeper answer is filed back.
- **Lint** (`lint`) repairs one slice of pages per run, done when the slice's page gate reports `ok: 0 findings`.

## Sourcing

Campaign content follows the 2024 D&D 5e rules. For a rules figure or new content, take it from the first source that fits the DM's intent:

1. **The Wiki**: its House Rules, homebrew and everything recorded there are Canon.
2. **The web** (`web_search`, then `read` on a result's URL): official content outside the SRD, then homebrew and published material to co-opt.
3. **The SRD** (`dnd5e-srd-api`), a fallback for peers. It is also the efficient source for exact spell text, stat blocks, class tables, items and rules text.
4. **Novel content**, only when nothing found fits, inspired by the closest material found.

Foundry is never a source. Retell every source in fresh words.

A page's optional `inspired_by` property names what the DM drew it from (`inspired_by: "Aleksander Anderson from the Hellsing anime"`). Set it only where the DM's own words state that inspiration. Before building on such a page, learn the work it names from the Wiki, QMD or `.cache/inspired-by/<page-slug>.md` (QMD collection `inspired-by`), else its URL or `web_search`, until you can state the DM's concept in a sentence. Save what you learned to that gitignored note, then carry the work's vibes and themes onto the page in fresh words.

## Content stance

The DM sets the content rating and themes. Match the rating of what the DM writes and asks for in every draft and brief. An R-rated ask gets R-rated fiction, where people swear where it fits and violence and cruelty are shown on the page. Named themes (dark, broken, grim) keep their full strength, and you speak to the DM as the adult they are. The only limits are the Campaign's Lines and Veils in its `campaign-config.md`. Villains do evil on the page, so that good can triumph over them.

## In-world voice

Everything a character says, knows or thinks, and every line of Narration or Story prose, uses words the World itself would use. Rules terms (Legendary Resistance, hit points, spell slots, saving throws, DCs, Actions, levels, Challenge Ratings) stay in statblocks and DM-layer notes. Where a mechanic matters to the fiction, write what the people in the scene perceive. A Legendary Resistance becomes a spell that should have dropped him and didn't.

## Orient

Read `user-config.md` (imported below) at the start of a run. In a Campaign, read its `campaign-config.md`, `hot.md` (orientation, not evidence), `index.md` and the last ten `log.md` entries, then the task pages. Start a search for context with the Notion MCP (`xd://mcp__notion_search`): the Second Brain for the DM's context, the Backup for the Wiki (`.omp/AGENTS.md` § Wiki access). For creative work (raw ideas, Stories, Simulations, Session ideas), read `docs/creative-process.md`.

## Working rules

- **Install before building.** Before building a tool, search the web for an established package, CLI, skill or script and co-opt it (`bun add`). Write custom code only for what it leaves undone. Python code is stored in `python/` under uv (`uv add`, the `py:*` scripts).
- **Programmable judgement.** Scripts decide only what is deterministic: chunking, counting, hashing, gates, logs, indexes, file lists and literal existence. Relevance, meaning, membership and support are the agent's judgement, made by reading what search finds or with eval `judge`/`judge_batch`. Script output, Jev answers included, is diagnostic input. For judgements beyond the harness judge, build them with TypeSafe (`skill://typesafe-ai`) unprompted.
- **Rules without exceptions.** When a case needs a carve-out, redefine the rule's terms until the case falls inside them (a PC's backstory counts as revealed once its Player writes it), and record the definition in the rule's own file. Craft guidance in skills and templates points a direction and binds less than a rule.
- **Everything is open to correction.** Every file, statblock value and earlier DM ruling changes when a better fix exists. When your change contradicts something the DM confirmed, report it as a decision with its reason.
- **Scope is the ask.** Do exactly the task named, as the smallest change that meets its acceptance criteria, trying an instruction or message change before new machinery. The ask includes web research for context, the established best method where the DM leaves it open, and each **Fix on sight** repair. Code handles the cases its callers produce with existing helpers, validates input where it enters and lets errors propagate. Add an abstraction, option, fallback or check only for the ask or a present caller. Edit a file another harness reads only when the DM names it.
- **OpenAI-family guardrail.** When your system prompt's `Model:` line is `openai/…` or `openai-codex/…`: each claim about the repo, Wiki, tools or your work stands only on a file and line you read or a command and output you ran this run. Mark any other claim unverified. **Fix on sight** and **Flesh out thin pages** work outside your brief is reported, not made. Return any departure from the brief as a proposal for the DM.
- **Fix on sight.** The agents' experience comes first, and any friction is an error. Broken code, stale or superseded text, a confusing step, a failed tool call, misdirected subagent work and every workaround (hack, shim, special case, manual step, detour) count as friction. The top-level session takes on each one without asking: it reports it with `skill://friction-report` at once and routes it by `.omp/AGENTS.md` **Route friction**, and the `skill-writer` dispatched fixes the root cause at the source. Delete superseded documentation once its owner file states the current truth. Re-brief, redirect or stop a wasting subagent at once. A subagent repairs what its slice owns and reports other friction in its closing friction report.
- **Migrate retired shapes on touch.** A retired section layout is in the registry described in `docs/wiki-layout.md` **Retired shapes**, and the gate reports it. Migrate each page you touch: read its template and move each fact into the section whose guidance asks for it, removing what has no place. The template and the gate are the only authority on layout, and another page's layout is never precedent.
- **Fast feedback.** A full test run over about five minutes is a **Fix on sight** defect. Kill a wedged run as soon as it shows, then repair its cause.
- **Proactive laziness.** Stay lazy outside your objective so the objective gets full effort. Deterministic work done by hand is a **trail**: leave a command or stated fact in its place for the next agent.
- **Behaviour beats labels.** Check a document's claim about a thing against what it does (the pages it creates, the commands it runs, the files it touches). Behaviour wins, and the false document is a **Fix on sight** defect.
- **Ask on ambiguity.** Settle what the repo, tools or Wiki can settle, and state the decision with its one-line evidence. A DM term you don't understand goes through `skill://domain-modeling`, which updates the files its meaning changes. When agent-facing instructions are unclear or contradict, put one batched question to the DM from the top-level session, quoting each with simpler wording. A subagent returns its question.
- **The repo is the memory.** Record every durable fact, preference or decision in the repo. Terms go in `CONTEXT.md` and decisions in `docs/adr/`. Project rules go here and tool mechanics in `.omp/AGENTS.md`.
- **Intent is not the build.** `docs/intent/` records what earlier skills and templates meant to do. Build every v2 from scratch under its README.
- **Less is more.** Agent-facing text (`AGENTS.md` files, skills, agents, rules, hook text, runbooks, prompts) does its job with as few instructions as it can. Consolidate before adding, delete repeats and conflicts, and prefer one general rule to many narrow ones, per `writing-for-agents`.
- **Skills, templates and lint move together.** Review the template of each page kind a changed skill writes and each skill it points at. For a changed template, review every skill writing its kind, the `cfcli check` rules enforcing it and the `src/push/` code reading its sections (`grep` `\b<Type>\b` in `src`). Done when the report lists each related file with its edit or "agrees", and for a template, each page `bun run cfcli -- check <kind folders> --layer template` now fails.
- **Print grade.** Every line of Campaign content you write or touch reads as prose a published adventure would print. A clean gate is the floor. Rewrite odd, stilted or inverted wording on a page you touch, older lines included.
- **Flesh out thin pages.** A thin or generic Wiki page met in any task gets a `flesh-out` pass in the same run. Weave from the Wiki material tied to its subject first, and invent only what it leaves open. A detail that conflicts with no Canon goes straight onto the page. A World-free page is complete at its minimum, so Campaign work fleshes out its Campaign version.
- **Write, then repair.** Skills and templates describe what to write in positive craft terms, and gates repair the draft. `skill://lint/prose.md` is the repair reference for prose findings. A finding traced to wording a skill or template asks for is a **Fix on sight** defect in that text (ADR 0036).
- **Zero findings.** Every `bun run cfcli -- check` finding binds, warnings as much as errors, and passing is `ok: 0 findings` only. Repair each finding on a file the run touched by rewriting the flagged text, and settle a flagged name by the Names ladder in `skill://lint`. A rule changes only when it contradicts what the exemplar DMs do (ADR 0029), or when the DM confirms switching a Vale rule off in `.vale.ini` for a rare, literal false match (a ship that is literally a ship). Work ends when no finding remains, or each one left has failed twice and the report quotes it (`skill://lint` step 7).
- **Gate scope.** The agent that edits a file checks and repairs it in the same run, recasting each flagged sentence whole with its meaning and voice (ADR 0047). A `write` or `edit` to a page under `wiki/` returns its check through the `wiki-check` hook. Run `bun run cfcli -- check "<page>"` yourself when that check is missing, capped, failed, or the page changed by another route. An agent-facing file's check is `bun run lint agents "<path>"`, repaired by each finding's message and `fix:` line. Each run then passes its **page gate**: `bun run cfcli -- check` over every page it was handed or touched, at `ok: 0 findings`, after its last edit. The **full gate** (no paths) belongs to the top-level agent, which hands flagged pages to `lint` runs a slice each. Dispatching the optional `linter` follows `docs/agents/delegation.md` § Linter.
- **Message with work.** Messages run only between an orchestrator and its own workers. The orchestrator coordinates hand-offs, sends a failing result (gate findings included) back to the worker that made it and relays what one worker needs from another. A worker puts its deliverable or blocker in its return. Edit a shared file (`log.md`, `hot.md`, a page another run edits) without asking: re-read it just before the edit and keep every line you aren't changing.
- **Nested dispatch.** A subagent does its own slice itself, lint repair included, and dispatches subagents (within `task.maxRecursionDepth`) only for a large side slice or a truly parallel part. An agent without `task` returns each dispatch it needs as a request with its exact task text, and its caller dispatches and resumes it (`docs/agents/delegation.md` § Nested dispatch).
- **Independent audit.** An audit (`skill://audit`) runs in a fresh subagent, dispatched by the agent that did the work, except an ingest subagent, which returns it as a dispatch request (`skill://ingest` step 13).
- **Skill verification.** An agent-facing document is done when its body matches the brief, and instruction-only changes don't need software tests. Eval cases come only from a DM-started `skill://dogfood` run or the default case `skill://skill-creator` drafts for a new content skill, and committed cases stay. Code gets the tests its ask names, driving behaviour through a public interface. Read `evals/README.md` before authoring, changing or grading a case.
- **Prior iterations.** Claims about project history cite the git log, a file or command output. Earlier iterations are a mine for ideas, code and lore (`docs/research/prior-iterations/README.md`), and mined lore enters the Wiki retold.
- **User edits are intentional.** A DM change to the omp configuration (model roles, settings, `.omp/` files, agents, eval pins) is intent: proceed, and audit it only when asked.
- **Commit everything.** The top-level agent's last step is its commit once the work is checked: `git add -A` (the DM's edits included), then `git commit` with a Conventional Commit message. Close each issue whose acceptance criteria are met with a brief comment citing the commit and verification.

@user-config.md

@CONTEXT.md
