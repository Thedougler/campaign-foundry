---
title: Elemental Gem, Emerald
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Uncommon.*

This gem contains a mote of elemental energy. When you take a Utilize action to break the gem, a **Water Elemental** is summoned, and the gem ceases to be magical. The elemental appears in an unoccupied space as close to the broken gem as possible, understands your languages, obeys your commands, and takes its turn immediately after you on your Initiative count. The elemental disappears after 1 hour, when it dies, or when you dismiss it as a Bonus Action.

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
