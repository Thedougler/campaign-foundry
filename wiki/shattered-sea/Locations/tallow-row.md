---
type: Location
kind: Site
summary: "A card house of long-running tables where Thunk won silver, Thassos
  tests the players, and Old Faas holds fifteen years of standing."
sources:
  - "archive/ssw-old-faas.md"
parent: ""
revealed: ""
title: "Tallow Row"
---

## At a glance

- **Draws the Party because.** The card tables run all comers, and silver changes hands.
- **Occupants.** [[thassos|Thassos]], who tests and folds new players, and [[old-faas|Old Faas]], fifteen years standing.
- **Danger.** A table that tests its players before it pays them.
- **Prize.** The silver that left these tables with Thunk.

> [!narration] Entering
> Card tables fill the room, and coins cross the felt in small stacks. The play pauses when a new face shows at the rail, then resumes at half voice. A chair stands open at the nearest table.

## Play

### Areas

The tables. Play runs long and the stakes rest in small stacks.

### Hazards

None established beyond the game itself.

### Occupants

[[thassos|Thassos]] tests and folds players. [[old-faas|Old Faas]] holds fifteen years of standing and has coached a newcomer here.

### Likely actions

Sit in, watch from the rail, or ask after a player's standing.

## Depth

### History

[[thunk|Thunk]] took silver at these tables while Thassos tested and folded him. [[old-faas|Old Faas]] walked him in that night on fifteen years of his own standing. Faas coached Thunk to lose the first hour and folded a hand he should have won rather than tip the table.

### Hidden truths

None established.

### Threads

None established.

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
