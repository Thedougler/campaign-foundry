---
title: Donjon Card
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Legendary.*

As an action, you can brandish this card at one creature you can see within 30 feet of yourself. The target must succeed on a DC 17 Charisma saving throw, or it vanishes, transported to a prison on another plane of existence. After 1 minute, the target reappears in the space it left or in the nearest unoccupied space if that space is occupied. Once this property is used, it can't be used again until the next dawn.

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
