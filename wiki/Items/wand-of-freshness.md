---
title: Wand of Freshness
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wand, Uncommon.*

This wand has 4 charges and regains 1d4 + 1 expended charges daily at dawn. While holding it, you can expend 1 charge to cast the *Purify Food and Drink* spell from it.

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
