---
title: Potion of Poison
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Potion, Uncommon, ½ lb.*

This concoction looks, smells, and tastes like a *Potion of Healing* or another beneficial potion. However, it is actually poison masked by illusion magic. *Identify* reveals its true nature.

If you drink this potion, you take 4d6 Poison damage and must succeed on a DC 13 Constitution saving throw or have the Poisoned condition for 1 hour.

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
