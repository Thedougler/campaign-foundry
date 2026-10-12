---
title: Thief's Thimble
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Uncommon (Requires Attunement).*

This magic thimble aids thieves in foiling traps. While wearing this thimble, if you trigger a trap and take damage, the thimble takes the damage instead.

The thimble has 30 Hit Points. If the thimble is reduced to 0 Hit Points, it breaks, and you take any remaining damage.

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
