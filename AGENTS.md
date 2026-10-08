# Campaign Foundry

Campaign Foundry is an LLM Wiki for a live D&D table: the product is the Campaign content (Narration, NPCs, Locations, Creatures, Items, Sessions), written as an author writes a book, and all code (CLI, Checks, evals, Push) serves that writing, so judge every piece of work by whether the content gets better.

## Schema

Layers:

- **Raw**: `raw/` holds files awaiting Ingest; `archive/` keeps them once ingested, as provenance.
- **Wiki**: `wiki/`, the compounding Canon. The DM edits it and has final say. The Agent does the bookkeeping. Each page kind's shape is its template in `wiki/templates/`; each World has a generated `index.md` catalog, an append-only `log.md`, and its Campaign's `hot.md`. Read `docs/wiki-layout.md` before creating or moving a page.
- **Backup**: a read-only copy of `main`'s Wiki and skills in Notion (`docs/notion-backup.md`), searched and browsed by folder for quick context. The Wiki stays the primary record: the Backup trails it by the last push, and every edit and citation uses the page in `wiki/`.
- **Schema**: this file, `CONTEXT.md` (the glossary, imported at the end of this file: use its term for every domain concept) and `docs/adr/` (decisions: read those touching an area before changing it).

Operations:

- **Ingest** digests Raw, or D&D Beyond PC updates, into the Wiki through the `ingest` skill (`pull-pcs` for PCs). Done when every statement sits on its page, the file is in `archive/`, and `hot.md` is current.
- **Query** answers from the Wiki through the `query` skill, searching the Backup and QMD (`qmd` skill) and reading the Wiki page behind every hit. Done when every fact cites a page read this run and a keeper answer is filed back.
- **Lint** repairs Wiki mechanics through the `lint` skill after Ingest, Prep, or a page create or move, one slice of pages per run. `bun run cf -- check` is the one gate. Skills guide judgment, and Vale and the narration layer define the rules. Done when the slice's page gate reports `ok: 0 findings`.

## Sourcing

Campaign content follows the 2024 D&D 5e rules. Reuse before inventing: for a rules figure or new content (a Creature, Item, Spell, NPC, Location, adventure idea), take it from the first source that fits the DM's intent:

1. **The Wiki**: House Rules, homebrew and everything already recorded there is Canon.
2. **The SRD**: `dnd5e-srd-api` for spell text, stat blocks, class tables, items and rules text.
3. Search **the web** for official content outside the SRD, then homebrew and published material to co-opt. Search with `web_search`. Fetch a result with `read` on its URL.
4. **Novel content**, only when nothing found fits, inspired by the closest material the search turned up.

Foundry is never a source. Retell every source in fresh words: a book that copies its inspiration is a bad book.

## Content stance

Content rating and themes come from the DM. Match the rating of what the DM writes and asks for, in your own words. An R-rated ask gets R-rated fiction through every draft and brief: people in the World swear where it fits, and violence and cruelty are shown on the page. It is never softened to PG-13. Speak to the DM as the adult they are. Themes the DM names (dark, broken, grim) keep their full strength. This is fiction among friends, and the DM has final authority. Everything is allowed except the Campaign's Lines and Veils, which the Players submit and the DM reviews, recorded in its `campaign-config.md`. Villains are evil and do evil on the page, so that good can triumph over them.

## In-world voice

Characters live in the fiction, and the rules engine stays outside it. Everything a character says, knows or thinks, and every line of Narration or Story prose, uses words the World itself would use. Rules terms such as Legendary Resistance, hit points, spell slots, saving throws, DCs, Actions, levels and Challenge Ratings stay in statblocks and DM-layer notes. When a mechanic matters to the fiction, write what the people in the scene would perceive. A Legendary Resistance becomes a spell that should have dropped him and didn't. Lost hit points become blood and ragged breath.

## Orient

Read order at the start of every run: `user-config.md` (imported at the end of this file) before any Wiki operation; in a Campaign, its `campaign-config.md`; then the Campaign's `hot.md` (orientation, not evidence), the World's `index.md`, the last ten `log.md` entries, then task pages. Survey the task's subjects in the Backup before you create or edit pages, where your harness mounts the Notion MCP (`.omp/AGENTS.md` § Wiki access). Then read each page you rely on in `wiki/`.

For creative work (raw ideas, Stories, NPCs played in Simulation, Session ideas), read `docs/creative-process.md`: it maps the stages, agents and the file that defines each rule.

## Working rules

- **Install before building.** `bun add` an established package that does the job. Write custom code only for what no package covers. Python code goes in `python/` under uv: add its dependencies with `uv add`, run it through the `py:*` scripts in `package.json`.
- **Programmable judgment.** A script decides only what is deterministic over its input: chunking, counting, hashing, gates, logs, indexes, file lists and literal existence checks. Relevance, meaning, membership and support over natural-language input are judgements, and the agent makes them by reading, by Backup or QMD search (`skill://qmd`), or with eval `judge` and `judge_batch` for a quick bounded call (a pick from a set, a yes or no, a degree, a ranking). A script's output is input the agent reads, and the decision stays with the agent. Scripts are diagnostic: an agent explores the Wiki by reading pages and searching the Backup and QMD, never through shell `ls`, `find` or `grep` pipelines that pick what to read. For what the harness judge cannot do, read the `typesafe-ai` skill and build the judgment with TypeSafe without waiting to be asked. In omp, **Tools** in `.omp/AGENTS.md` sets out which side of that line a need is on. Code keeps the workflow and the policy. A `cf` command that calls Jev reports its answers and probabilities as findings, and the agent makes the call.
- **Rules without exceptions.** Every rule applies everywhere. When a case needs a carve-out, rework the rule until the case fits.
- **Scope is the ask.** Execute exactly the task the DM names and only what serves that goal. Keep edits to what the ask names, including a file read by another harness or agent only if the DM names it.
- **Fix obvious breakage now.** A defect spotted mid-task that is clearly broken or works against the DM's goals is repaired immediately in the same run, without asking leave and without reporting it as a finding. Deferring or asking uses tokens without benefit.
- **Behaviour beats labels.** Treat a document's classification of a thing as a claim to check against what the thing actually does before acting on the label. Check the pages it creates and the commands it runs, along with any files it touches. Where a document and observable behaviour conflict, behaviour wins: repair the false document in the same run and record the repair where it belongs.
- **Decide, then act.** State the decision and its one-line evidence, then execute. If the evidence cannot settle a question, ask the DM once, with your proposed answer included.
- **The repo is the memory.** Record every durable fact, preference or decision in the repo (terms in `CONTEXT.md`, decisions in `docs/adr/`, working rules here), not in harness memory files.
- **Intent is not the build.** `docs/intent/` records what earlier skills and templates were meant to do. Build every v2 from scratch under its README.
- **Writing for agents.** Read `writing-for-agents` before writing any agent-facing text (skills, agent documents, runbooks, pointers), and follow it.
- **Skills, templates and lint move together.** A change to a skill or a template reviews its related skills, templates and lint rules in the same change. For a skill, that is the template of each page kind it writes plus each skill it hands off to or points at. Templates pair with every skill that writes their page kind and with the `cf check` layers and rules that enforce that page kind. Lint reads page shape (sections, optional markers, callouts) from the template itself. The template is the source of truth, and a template edit doesn't need a matching code edit. Update each related file that no longer agrees. Done when the change's report lists every related file with its edit or "agrees".
- **Zero findings.** The gate's rules are correct, and every `bun run cf -- check` finding binds: Vale's `ai-tells` and every other Vale rule, Harper, cspell, markdownlint, remark-lint and the narration layer, warnings as much as errors. Fix every finding on a page you touch in the same run by rewriting the flagged text. For a flagged name, follow the Names ladder in `skill://lint`. Rule files and layer settings stay as they are. Switching off a Vale rule in `.vale.ini` requires an obvious false match on literal campaign meaning (a ship that is literally a ship) and the DM's confirmation. Such cases are rare. The top-level session puts a suspected false match to the DM. Subagents include it in their reply for the top-level session to ask. Until the DM confirms, rewrite the flagged text like any other finding. The gate passes at `ok: 0 findings` only. Exit 0 with warnings left is a failing gate. Work ends when the gate passes, rather than with a list of findings.
- **Gate scope.** Check each page as you finish editing it, and repair every finding the check reports before you open the next page. A successful `write`, `edit` or `apply_patch` to a page under `wiki/` returns that check: the `wiki-check` hook in `.omp/hooks/post/` runs the read-only `bun run cf -- check --json "<page>"` and appends its findings to the tool result. The check returned by a page's latest edit is that page's check, and it meets any skill step that says to check the page. Run `bun run cf -- check "<page>"` yourself when that edit returned no check, a capped list, an error or a timeout, or when the page last changed by another route (`--fix`, `cf index`, a shell command, a vault named by `--vault`). A page passes its check at zero findings, warnings included, so `"ok": true` with warnings left still fails. The hook only reports, and every repair is yours, made by the rules above and the skill responsible for the finding's layer (`skill://lint` for the gate's layers). Each run then passes its **page gate**: `bun run cf -- check` given the path of every page the run was handed or touched, at `ok: 0 findings`, after its last edit. A check over a list of pages evaluates only those pages and reads the rest of the Wiki as context for links, orphans and shared lines, so a later edit to one page can change another page's findings. The **full gate**, `bun run cf -- check` with no paths, evaluates every page and belongs to the top-level agent, which hands the pages it flags to `lint` runs, a slice each (`skill://lint`, Whole Wiki). The Wiki comes clean across many slices and sessions.
- **Message with work.** Every message from one agent to another gives an instruction or a deliverable. A hand-off that a brief or contract defines qualifies, such as a gate finding sent to the writer editing that page or a failing result sent back with its failure, and so does the orchestrator's next instruction to a worker. Otherwise a subagent works its own slice and reports in its return, and its parent follows progress by reading `agent://` and `proc://`. Check-ins and status pings are never sent, and nobody asks leave to edit. A shared file (`log.md`, `hot.md`, a page another run also edits) is edited without asking: re-read it just before the edit and keep every line you are not changing.
- **Flat dispatch.** Only the top-level session, the one the DM talks to, dispatches subagents (`task` or an eval `agent()`), and `task.maxRecursionDepth: 1` in `.omp/config.yml` enforces that limit for every subagent. A subagent does its own task, then returns. Where a skill it follows hands part of the work to a plain `task` subagent, it does that part itself. Where the work needs a native agent (`skill-writer`, `persona`, `transcript-reader`) or more hands than its own, it finishes everything else it can, and its return requests each dispatch with its exact task text. The top-level session dispatches each request it judges fit, then resumes the requester by message or dispatches the next stage with the results.
- **Skill verification.** Evals verify skills that generate Wiki content (Narration, NPCs, Locations, Creatures, Items, Sessions). Any other skill or agent-facing document is done when its body matches the brief. Its `evals/cases.yaml` comes only when the DM asks. Instruction-only changes don't need software tests. Test executable code at its public interfaces.
- **Evals.** Read `evals/README.md` before authoring, running or grading evals or processing home-Session feedback. It defines the recipe, Shattered Sea grounding and the Runner's read-only access. An Eval reports failures. Only a Hillclimb edits skill text.
- **Prior iterations.** Facts come from this repo, the installed tools and the DM. The earlier iterations listed in `.omp/AGENTS.md` are a mine for ideas, code and lore, mapped in `docs/research/prior-iterations/`; the live Wiki is Canon, mined lore enters it retold, and this repo's code and skills are built here with prior ones as reference.
- **Models in configuration.** Model selection is set in configured model roles and native agent frontmatter. `evals/models.yaml` pins the Benchmark Matrix. Images come from the `generate-image` skill.
- **User edits are intentional.** When the DM changes their harness configuration (model roles, settings, `.omp/` files, agent definitions, eval pins), proceed as intended. Audit or re-validate it only when asked.
- **Commit everything.** A commit includes every tracked and untracked worktree change, the DM's edits included.
- **Close completed issues.** Once an issue's acceptance criteria are met, verified and committed, close it with a brief comment citing the commit and the verification.

@user-config.md

@CONTEXT.md
