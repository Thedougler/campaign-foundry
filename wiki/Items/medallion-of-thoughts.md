---
title: Medallion of Thoughts
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Uncommon (Requires Attunement), 1 lb.*

The medallion has 5 charges. While wearing it, you can expend 1 charge to cast *Detect Thoughts* (save DC 13) from it. The medallion regains 1d4 expended charges daily at dawn.

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
