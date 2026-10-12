---
title: Euryale Card
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Legendary.*

As an action, you can brandish this card at one creature you can see within 30 feet of yourself and attempt to turn it to stone. The target must succeed on a DC 17 Constitution saving throw, or it begins to turn to stone and has the restrained condition. The affected target must repeat the saving throw at the end of its next turn. On a successful save, the effect ends on the target. On a failed save, the target has the petrified condition (instead of the restrained condition) until it is removed by the *Greater Restoration* spell or similar magic. Once this property is used, it can't be used again until the next dawn.

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
