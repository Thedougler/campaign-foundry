---
title: Chime of Exile
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Very Rare.*

This silver chime is engraved with delicate magic sigils. While holding the chime, you can use an action to cast the *Banishment* spell (spell save DC 20). If the target of the spell has 50 hit points or fewer, it automatically fails its saving throw. Once the chime has been used to cast the spell, it can't be used this way again until the next dawn.

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
