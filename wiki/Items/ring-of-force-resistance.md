---
title: Ring of Force Resistance
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Ring, Rare.*

You have Resistance to Force damage while wearing this ring. The ring is set with sapphire.

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
