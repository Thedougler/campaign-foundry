---
type: Location
kind: Settlement
summary: "A tabaxi city at the Blue Hole's edge, the furthest reliable landmark
  east of the Drowned Maw and the last harbour on the eastern road."
sources:
  - "archive/ssw-outer-reach.md"
  - "archive/ssw-umberlee-shrine.md"
parent: "[[Outer Reach]]"
revealed: "Backstory"
title: ""
---

## At a glance

- **Size.** A city, the only one east of the Maw's chart edge.
- **Ruled by.** Its [[Tabaxi|tabaxi]].
- **Known for.** The furthest reliable landmark eastward, at the [[Blue Hole]]'s edge.

> [!narration] Arrival
> A city rises ahead, the one mark out here that every chart agrees on. Tabaxi work its harbour.

## Play

### Services

Water and hull repairs for coin or salvage, the only supply east of the [[Drowned Maw]].

## Depth

### History

[[Perrin Black-Jaw]] washed up on Keth-Naar after the Vestra went down and reached the Saltwright's hold from there.

### Hidden truths

The city keeps a channel to [[Umberlee]] at the [[Umberlee's Shrine|shrine]] on [[Vel-Orn]], petitioning her for terms. That channel is compromised without the [[Pearl of Souls]].

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
