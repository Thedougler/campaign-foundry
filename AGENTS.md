# Campaign Foundry

## Sourcing content

Campaign content follows the 2024 D&D 5e rules. Reuse before inventing: whether writing a rules figure or creating new content (a Creature, Item, Spell, NPC, Location, adventure idea), take it from the first source that fits the DM's intent:

1. **The Wiki**: House Rules, homebrew and anything already recorded there is Canon.
2. **The SRD**: `dnd5e-srd-api` fetches SRD spell text, stat blocks, class tables and items.
3. **The web**: official content outside the SRD, then existing homebrew and published material to co-opt. Search with the project's web skills (`tavily-search`, `exa-search`, `firecrawl-scrape` and the rest).
4. **Novel content**, only when nothing found fits the intent, and inspired by the closest material the search turned up.

Foundry is never a source.

## Domain

`CONTEXT.md` is the glossary: name every domain concept with its term. `docs/adr/` holds the decisions behind the design; read the ones touching an area before changing it. `docs/wiki-layout.md` sets where every page lives in `wiki/`; read it before creating or moving a page. Find Wiki content with qmd first (the `qmd` skill, or the `qmd` MCP server). In the omp harness, read and edit Wiki pages directly with `vault://` URIs; `vault://_/` targets the active vault. The project-local index in `.qmd/` searches `wiki/` by default and `raw/` or `archive/` when named, and refreshes itself on session start and after edits. Before working in a World, read the active Campaign's `hot.md`, then the World's `index.md`, then the last 10 `log.md` entries, then the pages the task needs.

## Models

Model selection belongs in harness configuration, native agent frontmatter, and `evals/models.yaml`, not shared instructions. Eval runners use the configured cheap pin and fallback, one family per run with the configured rotation; graders use the configured grader pin and fallback. Keep at most four subagents running at once. Every skill modification is delegated to the dedicated `skill-writer` subagent, which follows `writing-for-agents`; the orchestrator writes every other agent-facing document and never edits skill files itself. Image generation uses the configured image workflow. Claude-specific instructions belong in `CLAUDE.md` and are maintained by Claude.

## Working rules

- **Install before building.** When an established package does the job, `pnpm add` it and use it; write custom code only for what no package covers.
- **Holistic design.** Every rule holds everywhere. A rule that needs a carve-out is too rigid: rework the rule until the case fits.
- **The repo is the memory.** Record every durable fact, preference or decision in the repo: terms in `CONTEXT.md`, decisions in `docs/adr/`, working rules here, rather than in harness memory files.
- **Intent is not implementation.** `docs/intent/` records what earlier skills and templates were meant to do. Read it for intent and build every v2 from scratch; its README has the rules.
- **Clean slate.** Facts come from this repo, the installed tools and the user. Earlier DM-assistant projects elsewhere on this machine are out of bounds: never read, cite or borrow from them.
- **User edits are intentional.** When the DM changes their own harness configuration — model roles, `cfg://` settings, `.omp/` files, agent definitions, eval pins — assume it is intended and proceed. Never audit, re-validate or investigate those changes unless the DM asks.
