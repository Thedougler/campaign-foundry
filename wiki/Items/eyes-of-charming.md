---
title: Eyes of Charming
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Uncommon (Requires Attunement).*

These crystal lenses fit over the eyes. They have 3 charges. While wearing them, you can expend 1 or more charges to cast *Charm Person* (save DC 13). For 1 charge, you cast the level 1 version of the spell. You increase the spell's level by one for each additional charge you expend. The lenses regain all expended charges daily at dawn.

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
