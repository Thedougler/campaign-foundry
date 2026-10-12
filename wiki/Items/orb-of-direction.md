---
title: Orb of Direction
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Common, 3 lb.*

This orb can be used as an Arcane Focus.

While holding this orb, you can take a Magic action to determine which way is magnetic north. Nothing happens if the orb is used in a location that has no magnetic north.

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
