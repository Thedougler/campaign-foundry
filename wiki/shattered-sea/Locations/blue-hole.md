---
type: Location
kind: Site
summary: "A sea mark at Keth-Naar's edge on the eastern road, the one feature
  the charts agree on."
sources:
  - "archive/ssw-outer-reach.md"
  - "archive/ssw-umberlee-shrine.md"
parent: "[[outer-reach|Outer Reach]]"
revealed: ""
title: "Blue Hole"
---

## At a glance

- **Draws the Party because.** [[keth-naar|Keth-Naar]] sits at its edge, and the edge is the mark pilots steer by on the eastern road.
- **Ring.** A ring of five small islands stands around the well, with [[vel-orn|Vel-Orn]] among them.

> [!narration] Entering
> The colour changes before the depth does. Blue opens under the bow, dark as a well, and the city stands at its rim.

## Play

### Areas

The rim, where the city stands, and the well of blue beside it.

## Depth

### Hidden truths

The hole's depth stays beyond the record. Umberlee's older worship here is kept at the [[umberlees-shrine|shrine]] on [[vel-orn|Vel-Orn]].

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
