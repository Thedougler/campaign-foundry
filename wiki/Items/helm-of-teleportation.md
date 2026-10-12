---
title: Helm of Teleportation
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Rare (Requires Attunement).*

This helm has 3 charges. While wearing it, you can expend 1 charge to cast *Teleport* from it. The helm regains 1d3 expended charges daily at dawn.

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
