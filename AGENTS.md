# Campaign Foundry

## Rules source

Campaign content follows the 2024 D&D 5e rules. Before writing any rules figure into the Wiki or an answer, take it from the first source that has it:

1. **The Wiki**: homebrew and anything already recorded there is Canon.
2. **The SRD**: `dnd5e-srd-api` fetches SRD spell text, stat blocks, class tables and items.
3. **The web**, for official content outside the SRD.

Foundry is never a rules source.

## Domain

`CONTEXT.md` is the glossary: name every domain concept with its term. `docs/adr/` holds the decisions behind the design; read the ones touching an area before changing it.

## Working rules

- **Holistic design.** Every rule holds everywhere. A rule that needs a carve-out is too rigid: rework the rule until the case fits.
- **The repo is the memory.** Record every durable fact, preference or decision in the repo: terms in `CONTEXT.md`, decisions in `docs/adr/`, working rules here, rather than in harness memory files.
- **Clean slate.** Facts come from this repo, the installed tools and the user. Earlier DM-assistant projects elsewhere on this machine are out of bounds: never read, cite or borrow from them.
