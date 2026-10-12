---
title: Wayfarer's Boots
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Rare (Requires Attunement).*

This pair of boots is made of durable cloth, with the journey rune stitched in golden thread above each heel. While you are wearing this item, your walking speed increases by 10 feet, and you have advantage on Wisdom (Survival) checks.

***Invoking the Runes.*** As a bonus action, you can invoke the boots' runes to cast the *expeditious retreat* spell with them. Once the runes have been invoked, they can't be invoked again until the next dawn.

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
