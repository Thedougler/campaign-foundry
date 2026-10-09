---
title: ""
type: Location
kind: Settlement
summary: ""
sources: []
parent: ""
revealed: ""
---

## At a glance

%% Give the DM a ten-second read, one line per bullet. Size is village, town or city with its rough count. Ruled by links who controls the work or trade. Unsettled by is what is going wrong right now. Known for is its trade or industry. %%

- **Size.**
- **Ruled by.**
- **Mood.**
- **Unsettled by.**
- **Known for.**

> [!narration] Arrival
> %% Spoken, second person, present tense. Give the approach or overlook, then the landmark a newcomer steers by. %%

## Play

%% Give what the Party can seek here on purpose, scaled to the Settlement. A hamlet keeps a hamlet's few places and services. %%

### Districts

%% Give one line per district with where it lies and what the Party sees walking in. Add why they would go and its current opportunity or trouble. Close with crossing times and transport, and what changes after dark. %%

### Services

%% Cover lodging and supplies, buying and selling, healers and fences, transport and information, as the visit needs. Each service gives its keeper and location and its hours or access. Give its cost, and link its Site or NPC. A missing service points to the nearest alternative. %%

### Factions here

%% Link each Faction, with its local objective and leverage, and the NPC in charge of its current move. %%

### Local rules

%% Give each law or custom that changes a choice, with its enforcer and method and the penalty. %%

### Disputes

%% Give each live situation with who seeks what and who opposes it. Add the signs a visitor notices and the next consequence with its time. Give at least two approaches, or a costly way around. %%

### Rumors

%% Give each street claim with the DM's truth and the person, record or Site that can reveal it. %%

## Depth

%% DM only. Give the Settlement's past and what it hides. %%

### History

%% Give past events that still decide who rules or what people fear. Closed crises belong here. %%

### Hidden truths

%% Give each truth with the Clue that reveals it, and the district or service where the Party finds that Clue. %%

### Threads

%% Link each Thread that touches the Settlement, with what it changes here. %%

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
