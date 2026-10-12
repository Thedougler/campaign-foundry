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

## At a glance

%% Give the DM a ten-second read, one line per bullet. Domains are the 2024 rules' domains. Asks of followers is the conduct the Deity rewards. %%

- **Domains.**
- **Symbol.**
- **Alignment.**
- **Worshipped by.** %% Optional. Add it when Factions, peoples or Locations in the World worship the Deity, linking each. %%
- **Asks of followers.**

> [!narration] Invocation
> %% Optional. Include it when the Party will hear of the Deity or see its sign. Spoken in second person or a devotee's voice: how a devotee speaks of the Deity, or the sign of its presence. %%

## Play

%% Give the Deity's part at the table, one line per bullet. Boons and Costs give the rules effect and its price. Clergy and shrines link the NPCs and Sites. How it intervenes gives the sign and trigger, and the limit. %%

- **Boons.**
- **Costs.**
- **Clergy and shrines.**
- **How it intervenes.**

## Depth

%% Optional. Include it when the Deity has a myth, rivals or secrets that reach play. DM only. Give the Deity's story and what its worshippers misread. %%

### Myth

%% Give the story its faithful tell, and where the World's Lore differs. Link the Lore page. %%

### Rivals and allies

%% Link each other power it opposes or courts, with the cause. %%

### Hidden truths

%% Give each truth with how the Party can learn it, and link each Thread it drives. %%

## Links

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
