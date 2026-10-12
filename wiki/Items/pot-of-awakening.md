---
title: Pot of Awakening
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Common.*

If you plant an ordinary shrub in this 10-pound clay pot and let it grow for 30 days, the shrub magically transforms into an **Awakened Shrub** at the end of that time. When the shrub awakens, its roots break the pot, destroying it.

The awakened shrub is Friendly toward you and obeys your commands. Absent commands from you, it does nothing.

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
