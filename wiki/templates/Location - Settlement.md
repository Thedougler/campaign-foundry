---
type: Location
kind: Settlement
summary: ""
sources: []
parent: ""
---

## At a glance

%% 3-5 facts. Unsettled by is what is going wrong right now. %%

- **Size.**
- **Ruled by.**
- **Mood.**
- **Unsettled by.**
- **Known for.**

> [!narration] Arrival
> %% Spoken: the approach or overlook, then the landmark that orients a newcomer. Second person, present tense. %%

## Play

%% What the Party does here. Districts and services by what the Party can seek on purpose. %%

### Districts

%% One line per district: what the Party sees walking in. %%

### Services

%% Inns, shops, healers, fences, transport, information. Link each. %%

### Factions here

### Local rules

### Rumors

## Depth

%% History that still bites, hidden truths (each with the Clue that reveals it), live conflicts and next changes if nobody acts. %%

### History

### Hidden truths

### Threads

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
