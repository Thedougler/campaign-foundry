---
title: Moon Card
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Legendary.*

As an action, you can speak a command word while touching this card and transform into a wolflike biped for 1 minute. For that duration, you have resistance to bludgeoning, piercing, and slashing damage, and when you hit a target with a weapon or an unarmed strike, the target takes an extra 1d6 force damage. Once this property is used, it can't be used again until the next dawn.

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
