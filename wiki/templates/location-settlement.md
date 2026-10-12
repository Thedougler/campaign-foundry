---
title: ""
type: Location
kind: Settlement
summary: ""
sources: []
parent: "" # Campaign-bound. Link the containing Location; a World-free page leaves it out.
revealed: "" # Campaign-bound. Set it per CONTEXT.md **Revealed**; a World-free page leaves it out.
---

%% Optional. Add `inspired_by: "<work>"` to the frontmatter only when the DM names what inspired this page. Root `AGENTS.md` **Sourcing** sets its use. %%

%% Optional. Include it when the Settlement has a banner from `skill://visuals`: the bare embed below, named with the page's slug. %%

![[<slug>-banner.webp]]

> [!narration] Arrival
> %% Optional. Include it when the Party will arrive here. Spoken, second person, present tense. Give the approach or overlook, then the landmark a newcomer steers by. %%

## Districts

%% Give what the Party can seek here on purpose, scaled to the Settlement. The `summary` property gives its size, as village, town or city with its rough count, and what it is known for. Give one line per district with where it lies and what the Party sees walking in; a hamlet keeps one line. Add why they would go and its current opportunity or trouble. Close with crossing times and transport, and what changes after dark. %%

## Services

%% Optional. Include it when the visit needs lodging and supplies, buying and selling, healers and fences, transport or information. Each service gives its keeper and location and its hours or access. Give its cost, and link its Site or NPC. A missing service points to the nearest alternative. %%

## Factions here

%% Optional. Include it when a Faction acts here. Link each, with its local objective and leverage, and the NPC in charge of its current move. Name who controls the work or trade. %%

## Local rules

%% Optional. Include it when a law or custom changes a choice. Give each with its enforcer and method and the penalty. %%

## Disputes

%% Optional. Include it when something here is going wrong right now. Give each live situation with who seeks what and who opposes it. Add the signs a visitor notices and the next consequence with its time. Give at least two approaches, or a costly way around. %%

## Rumors

%% Optional. Include it when the streets carry claims the Party can test. Give each claim with the DM's truth and the person, record or Site that can reveal it. %%

## History

%% Optional. Include it when past events still decide who rules or what people fear. DM only. Give those events. Closed crises belong here. %%

## Hidden truths

%% Optional. Include it when the Settlement hides a truth the Party can learn. DM only. Give each truth with the Clue that reveals it, and the district or service where the Party finds that Clue. %%

## Threads

%% Optional. Include it when a Thread touches the Settlement. DM only. Link each Thread, with what it changes here. %%

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Contains
    filters:
      and:
        - parent == this
    groupBy:
      property: note.kind
      direction: ASC
    order:
      - file.name
      - note.summary
  - type: table
    name: Linked from
    filters:
      and:
        - parent != this
    groupBy:
      property: note.type
      direction: ASC
    order:
      - file.name
      - note.summary
```
