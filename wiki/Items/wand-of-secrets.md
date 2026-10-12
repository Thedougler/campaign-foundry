---
title: Wand of Secrets
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wand, Uncommon, 1 lb.*

This wand has 3 charges and regains 1d3 expended charges daily at dawn. While holding it, you can take a Magic action to expend 1 charge, and if a secret door or trap is within 60 feet of you, the wand pulses and points at the one nearest to you.

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
