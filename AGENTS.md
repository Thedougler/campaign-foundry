# Campaign Foundry

Campaign Foundry is an LLM Wiki for a live D&D table. Its one goal is the best-quality, most fun Sessions for the DM's Campaign, filled with professional-grade content the Players find engaging, memorable and fun. That Campaign content (Narration, NPCs, Locations, Creatures, Items, Sessions) is the product, written as an author writes a book. Judge every piece of work by whether it makes the Sessions better. Evals codify the DM's intent, so revise a criterion whenever that intent changes. Code decides only what is deterministic (chunking, counting, gates, indexes, Push); relevance, meaning and support are the agent's judgement.

## Schema

- **Raw**: `raw/` holds files awaiting Ingest, and `archive/` keeps them once ingested.
- **Wiki**: `wiki/`, the compounding Canon. The DM has final say, and the Agent does the bookkeeping. Each page kind's template in `wiki/templates/` states its required properties and sections. Read `docs/wiki-layout.md` before creating or moving a page.
- **Backup**: the Notion copy of `main`'s Wiki and skills, read first (`.omp/AGENTS.md` § Wiki access).
- **Schema**: this file, `CONTEXT.md` (the glossary, imported below: use its term for every domain concept) and `docs/adr/` (read the decisions touching an area before changing it).
- **Operations**, each through its skill: `ingest` (`pull-pcs` for PCs), `query` and `lint`.

## Sourcing

Campaign content follows the 2024 D&D 5e rules. For a rules figure or new content, take it from the first source that fits the DM's intent:

1. **The Wiki**: its House Rules, homebrew and everything recorded there are Canon.
2. **The web** (`web_search`, then `read` on a result's URL): official content outside the SRD, then homebrew and published material to co-opt.
3. **The SRD** (`dnd5e-srd-api`), a fallback for peers and the efficient source for exact spell text, stat blocks, class tables, items and rules text.
4. **Novel content**, only when nothing found fits, inspired by the closest material found.

Foundry is never a source. Retell every source in fresh words. A page's optional `inspired_by` property names what the DM drew it from (`inspired_by: "Aleksander Anderson from the Hellsing anime"`). Set it only where the DM's own words state that inspiration. Before building on such a page, learn the work it names from the Wiki, QMD or `.cache/inspired-by/<page-slug>.md` (QMD collection `inspired-by`), else its URL or `web_search`, until you can state the DM's concept in a sentence. Save what you learned to that gitignored note, then carry the work's vibes and themes onto the page in fresh words.

## Content stance

The DM sets the content rating and themes. Match the rating of what the DM writes and asks for in every draft and brief. An R-rated ask gets R-rated fiction, where people swear where it fits and violence and cruelty are shown on the page. Named themes (dark, broken, grim) keep their full strength, and you speak to the DM as the adult they are. The only limits are the Campaign's Lines and Veils in its `campaign-config.md`. Villains do evil on the page, so that good can triumph over them.

## In-world voice

Everything a character says, knows or thinks, and every line of Narration or Story prose, uses words the World itself would use. Rules terms (Legendary Resistance, hit points, spell slots, saving throws, DCs, Actions, levels, Challenge Ratings) stay in statblocks and DM-layer notes. Where a mechanic matters to the fiction, write what the people in the scene perceive. A Legendary Resistance becomes a spell that should have dropped him and didn't.

## Orient

Read `user-config.md` (imported below) at the start of a run. In a Campaign, read its `campaign-config.md`, `hot.md` (orientation, not evidence), `index.md` and the last ten `log.md` entries, then the task pages. Start a search for context with the Notion MCP (`xd://mcp__notion_search`): the Second Brain for the DM's context, the Backup for the Wiki (`.omp/AGENTS.md` § Wiki access). For creative work (raw ideas, Stories, Simulations, Session ideas), read `docs/creative-process.md`.

## Working rules

- **Gate scope.** Skills and templates describe what to write in positive craft terms, and the gate repairs the draft (ADR 0036). The agent that edits a file checks and repairs it in the same run, recasting each flagged sentence whole with its meaning and voice (ADR 0047). Each page it was handed or touched passes `bun run cfcli -- check <pages>` at `ok: 0 findings`, warnings included, and each agent-facing file it edited passes `bun run cfcli -- style <paths>`. The whole-Wiki check runs when the DM asks to lint the Wiki.
- **Skills, templates and lint move together.** When a page contract changes, update its template, the skills writing its kind, the `cfcli check` rules enforcing it and the `src/push/` code reading its sections (`grep` `\b<Type>\b` in `src`) in one change, then run `bun run cfcli -- check <kind folders> --layer template` to see which pages it now fails.
- **Flesh out thin pages.** A thin or generic Wiki page met in any task gets a `flesh-out` pass, weaving from the Wiki material tied to its subject before inventing what it leaves open; a World-free page is complete at its minimum, so Campaign work fleshes out its Campaign version.

@user-config.md

@CONTEXT.md
