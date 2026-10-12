---
title: Periapt of Wound Closure
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Uncommon (Requires Attunement), 1 lb.*

While wearing this pendant, you gain the following benefits.

***Life Preservation.*** Whenever you make a Death Saving Throw, you can change a roll of 9 or lower to a 10, turning a failed save into a successful one.

***Natural Healing Boost.*** Whenever you roll a Hit Point Die to regain Hit Points, double the number of Hit Points it restores.

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
