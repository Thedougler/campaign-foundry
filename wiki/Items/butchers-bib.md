---
title: Butcher's Bib
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Rare (Requires Attunement).*

This black leather apron is perpetually covered by blood, even after being washed off. You gain the following benefits while wearing the apron:

- Once per turn when you roll damage for a melee attack with a weapon, you can reroll the weapon's damage dice. If you do so, you must use the second total.
- Your weapon attacks that deal slashing damage score a critical hit on a roll of 19 or 20 on the d20.

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
