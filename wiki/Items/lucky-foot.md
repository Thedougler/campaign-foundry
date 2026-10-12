---
title: Lucky Foot
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Common.*

When you roll a 1 on a saving throw or ability check, you can use this preserved rabbit foot's magic to reroll the die. You must use the new roll, and the foot disintegrates.

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
