---
type: Location
kind: Region
summary: ""
sources: []
parent: ""
---

## At a glance

%% 3-5 facts. Crossing is travel time and the route that matters. %%

- **Character.**
- **Held by.**
- **Changing.**
- **Crossing.**
- **Danger.**

> [!narration] Arrival
> %% Spoken: the land as a traveler first meets it and the one feature that sets it apart. Second person, present tense. %%

## Play

%% What the Party does here. Only what changes a travel choice; routes with different trade-offs. %%

### Travel

### Places worth reaching

%% Link child Locations. %%

### Encounters

%% A d6 table of Creatures and Factions found here, each linked. %%

### Rumors

## Depth

%% History that still bites, hidden truths (each with the Clue that reveals it), Threads that touch the Region. %%

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
