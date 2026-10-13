---
title: ""
type: Deity
summary: ""
sources: []
revealed: "" # Campaign-bound. Set it per CONTEXT.md **Revealed**; a World-free page leaves it out.
---

%% Optional. Add `inspired_by: "<work>"` to the frontmatter only when the DM names what inspired this page. Root `AGENTS.md` **Sourcing** sets its use. %%

%% Optional. Include it when the Deity has a symbol from `skill://visuals`: the bare embed below, named with the page's slug. %%

![[<slug>-symbol.webp]]

> [!narration] Invocation
> %% Optional. Include it when the Party will hear of the Deity or see its sign. Spoken in second person or a devotee's voice: how a devotee speaks of the Deity, or the sign of its presence. %%

## Worship

%% Give the Deity's part at the table, one line per bullet. Boons and Costs give the rules effect and its price, and the conduct the Deity rewards. Clergy and shrines link the NPCs and Sites, and the Factions, peoples and Locations that worship it. How it intervenes gives the sign and trigger, and the limit. %%

- **Domains.** %% Optional. Add it when a source or the DM sets them, as the 2024 rules' domains. %%
- **Alignment.** %% Optional. Add it when a source or the DM sets it. %%
- **Symbol.** %% Optional. Add it when a source or the DM describes the holy symbol. %%
- **Boons.**
- **Costs.**
- **Clergy and shrines.**
- **How it intervenes.**

## Myth

%% Optional. Include it when the faithful tell a story of the Deity. DM only. Give the story they tell, and where the World's Lore differs. Link the Lore page. %%

## Rivals and allies

%% Optional. Include it when the Deity opposes or courts another power. DM only. Link each, with the cause. %%

## Hidden truths

%% Optional. Include it when the Deity hides a truth its worshippers misread. DM only. Give each truth with how the Party can learn it, and link each Thread it drives. %%

## Links

%% Optional. Include it when the DM wants this page's backlinks listed here. %%

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Linked from
    groupBy:
      property: note.type
      direction: ASC
    order:
      - file.name
      - note.summary
```
