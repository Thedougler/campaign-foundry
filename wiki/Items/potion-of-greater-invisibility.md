---
title: Potion of Greater Invisibility
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Potion, Very Rare, ½ lb.*

This potion's container looks empty but feels as though it holds liquid. When you drink the potion, you have the Invisible condition for 1 hour.

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
