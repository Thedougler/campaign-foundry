# Campaign Foundry

Campaign Foundry is an agentic creative-writing project. The product is the D&D content in the Wiki, written the way an author writes a book for a live table: its Narration, NPCs, Locations, Creatures, Items and Sessions. Code exists only to serve that writing. The CLI, Checks, eval tooling and Foundry push all exist to help agents write better content and to help the DM run it. Judge every piece of work by whether the content gets better. Grade writing on intent and craft: retell sources in fresh words, because a book that copies its inspiration is a bad book.

## Sourcing content

Campaign content follows the 2024 D&D 5e rules. Reuse before inventing: whether writing a rules figure or creating new content (a Creature, Item, Spell, NPC, Location, adventure idea), take it from the first source that fits the DM's intent:

1. **The Wiki**: House Rules, homebrew and anything already recorded there is Canon.
2. **The SRD**: `dnd5e-srd-api` fetches SRD spell text, stat blocks, class tables and items.
3. **The web**: official content outside the SRD, then existing homebrew and published material to co-opt. Search with `web_search` and fetch a result page with `read` on its URL.
4. **Novel content**, only when nothing found fits the intent, and inspired by the closest material the search turned up.

Foundry is never a source.

## Domain

At the start of every run, read `user-config.md` for the DM's preferences before any Wiki operation. When the work is in a Campaign, read that Campaign's `campaign-config.md` next. Then read the active Campaign's `hot.md`, the World's `index.md`, the last ten `log.md` entries and task pages.

`CONTEXT.md` is the glossary: name every domain concept with its term. `docs/adr/` holds design decisions; read the ones touching an area before changing it. Read `docs/wiki-layout.md` before creating or moving a page. Find Wiki content with QMD first and retrieve the hits; the `qmd` skill owns mechanics.

## Models

Model selection belongs in configured model roles and native agent frontmatter, never in shared instructions; `evals/models.yaml` pins the cross-family Benchmark Matrix. Image generation uses the `generate-image` skill.

## Working rules

- **Install before building.** When an established package does the job, `bun add` it and use it; write custom code only for what no package covers.
- **Holistic design.** Every rule holds everywhere. A rule that needs a carve-out is too rigid: rework the rule until the case fits.
- **One lint gate.** `cf check` is the only Wiki lint command. Skills carry judgment; Vale and the narration layer carry rules.
- **The repo is the memory.** Record every durable fact, preference or decision in the repo: terms in `CONTEXT.md`, decisions in `docs/adr/`, working rules here, rather than in harness memory files.
- **Intent is not implementation.** `docs/intent/` records what earlier skills and templates were meant to do. Read it for intent and build every v2 from scratch; its README has the rules.
- **Writing for agents.** You MUST read `writing-for-agents` before writing any text intended for agent consumption — skills, agent documents, runbooks, pointers — and follow it.
- **Skill verification.** Evals verify changes to skills whose job is generating D&D content in the Wiki, such as Narration, NPCs, Locations, Creatures, Items and Sessions. For every other skill and agent-facing document, a revision is complete when the body matches the brief; require, create or wait on its `evals/cases.yaml` only when the DM asks. Instruction-only changes need no software tests; verify executable code changes with software tests at their public interfaces.
- **Skill iteration.** Follow `evals/README.md`: an Eval reports failures, and a Hillclimb is what edits skill text.
- **Dogfooding evals.** Read `evals/README.md` before authoring, running or grading skill evals, or processing home-Session feedback; it owns Shattered Sea grounding, the Runner's read-only access and the eval recipe.
- **Clean slate.** Facts come from this repo, the installed tools and the user. Earlier DM-assistant projects elsewhere on this machine are out of bounds: never read, cite or borrow from them.
- **User edits are intentional.** When the DM changes their own harness configuration — model roles, settings, `.omp/` files, agent definitions, eval pins — assume it is intended and proceed. Never audit, re-validate or investigate those changes unless the DM asks.
- **Commit everything.** When committing, include all tracked and untracked worktree changes, including the DM's edits. User changes are intentional work worth committing.
- **Close completed issues.** Once a GitHub issue's acceptance criteria are met and the work is verified and committed, close it with a brief completion comment citing the commit and verification.
