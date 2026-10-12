---
title: Potion of Invisibility
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Potion, Rare, ½ lb.*

This potion's container looks empty but feels as though it holds liquid. When you drink the potion, you have the Invisible condition for 1 hour. The effect ends early if you make an attack roll, deal damage, or cast a spell.

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
