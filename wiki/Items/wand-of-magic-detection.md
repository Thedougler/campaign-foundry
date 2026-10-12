---
title: Wand of Magic Detection
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wand, Uncommon, 1 lb.*

This wand has 3 charges. While holding it, you can expend 1 charge to cast *Detect Magic* from it. The wand regains 1d3 expended charges daily at dawn.

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
