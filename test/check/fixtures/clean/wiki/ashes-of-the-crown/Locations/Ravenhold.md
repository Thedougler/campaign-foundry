---
type: Location
kind: Settlement
summary: "A walled river port that taxes every barge."
sources: []
parent: "[[Ashen Reach]]"
revealed: ""
title: "Ravenhold"
---

## At a glance

- **Size.** Text.
- **Ruled by.** [[Mara Voss]]
- **Mood.** Text.
- **Unsettled by.** Text.
- **Known for.** Text.

> [!narration] Arrival
> Gulls wheel above the inner harbor wall.

## Play

Text.

### Districts

The chapel ruin lies below, at [[The Sunken Chapel]].

### Services

Text.

### Factions here

[[Ember Court]].

### Local rules

Text.

### Rumors

Text.

## Depth

Text.

### History

Text.

### Hidden truths

Text.

### Threads

Text.

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
