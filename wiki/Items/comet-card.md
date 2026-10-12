---
title: Comet Card
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Legendary.*

As an action, you can hold this card aloft and call down a fiery meteor to a point you can see within 120 feet of yourself. Each creature within a 20-foot-radius sphere centred on that point must make a DC 17 Dexterity saving throw. On a failed save, a creature takes 6d6 bludgeoning damage and 6d6 fire damage, or half as much damage on a successful save. Once this property is used, it can't be used again until the next dawn.

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
