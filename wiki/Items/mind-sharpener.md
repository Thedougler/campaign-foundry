---
title: Mind Sharpener
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Ring, Uncommon (Requires Attunement).*

The item has 4 charges. When you fail a Constitution saving throw to maintain Concentration, you can take a Reaction and expend 1 of the item's charges to succeed instead. The item regains 1d4 expended charges daily at dawn.

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
