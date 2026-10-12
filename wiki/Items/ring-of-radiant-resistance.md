---
title: Ring of Radiant Resistance
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Ring, Rare.*

You have Resistance to Radiant damage while wearing this ring. The ring is set with topaz.

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
