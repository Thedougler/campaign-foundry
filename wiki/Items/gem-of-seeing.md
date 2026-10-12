---
title: Gem of Seeing
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Rare (Requires Attunement).*

This gem has 3 charges. As a Magic action, you can expend 1 charge. For the next 10 minutes, you have Truesight out to 120 feet when you peer through the gem.

The gem regains 1d3 expended charges daily at dawn.

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
