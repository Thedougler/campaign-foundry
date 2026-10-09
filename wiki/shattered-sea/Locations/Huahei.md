---
type: Location
kind: Region
summary: "A small overgrown marshy island in the Midchain with a fey presence."
sources:
  - "archive/ssw-midchain.md"
parent: "[[Midchain]]"
revealed: ""
title: ""
---

## At a glance

- **Character.** A small marshy island covered in growth.
- **Held by.**
- **Changing.**
- **Crossing.**
- **Danger.**

> [!narration] Arrival
> A small island breaks the water beside your course. Plants cover the land. Between the plants, marsh water reaches into the island.

## Play

### Encounters

Exploration crosses marsh and overgrowth.

## Depth

A fey presence inhabits the island. Its identity and disposition are not recorded.

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
