---
title: Potion of Frost Giant Strength
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Potion, Rare, ½ lb.*

When you drink this potion, your Strength score changes to 23 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score.

This potion's transparent liquid has floating in it a sliver of fingernail from a frost giant.

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
