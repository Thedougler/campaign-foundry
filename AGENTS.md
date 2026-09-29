# Campaign Foundry

## Sourcing content

Campaign content follows the 2024 D&D 5e rules. Reuse before inventing: whether writing a rules figure or creating new content (a Creature, Item, Spell, NPC, Location, adventure idea), take it from the first source that fits the DM's intent:

1. **The Wiki**: House Rules, homebrew and anything already recorded there is Canon.
2. **The SRD**: `dnd5e-srd-api` fetches SRD spell text, stat blocks, class tables and items.
3. **The web**: official content outside the SRD, then existing homebrew and published material to co-opt. Search with the project's web skills (`tavily-search`, `exa-search`, `firecrawl-scrape` and the rest).
4. **Novel content**, only when nothing found fits the intent, and inspired by the closest material the search turned up.

Foundry is never a source.

## Domain

`CONTEXT.md` is the glossary: name every domain concept with its term. `docs/adr/` holds the decisions behind the design; read the ones touching an area before changing it. `docs/wiki-layout.md` sets where every page lives in `wiki/`; read it before creating or moving a page. Before working in a World, read the active Campaign's `hot.md`, then the World's `index.md`, then the last 10 `log.md` entries, then the pages the task needs.

## Models

Orchestrate with Claude Opus 5.5 and dispatch Claude Sonnet 5.5 subagents. Generate images with Codex (luna 5.6) as a subagent through the `codex` CLI. These are current choices, not commitments: evals will revisit them.

## Working rules

- **Holistic design.** Every rule holds everywhere. A rule that needs a carve-out is too rigid: rework the rule until the case fits.
- **The repo is the memory.** Record every durable fact, preference or decision in the repo: terms in `CONTEXT.md`, decisions in `docs/adr/`, working rules here, rather than in harness memory files.
- **Intent is not implementation.** `docs/intent/` records what earlier skills and templates were meant to do. Read it for intent and build every v2 from scratch; its README has the rules.
- **Clean slate.** Facts come from this repo, the installed tools and the user. Earlier DM-assistant projects elsewhere on this machine are out of bounds: never read, cite or borrow from them.
