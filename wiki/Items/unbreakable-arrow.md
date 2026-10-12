---
title: Unbreakable Arrow
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Ammunition, Common, Minor Tier.*

This arrow can't be broken, except when it is within an *antimagic field*.

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
