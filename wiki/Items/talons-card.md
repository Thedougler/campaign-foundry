---
title: Talons Card
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Legendary.*

As an action, you can brandish this card and target one magic item you can see within 120 feet of yourself. If the item isn't an artifact, its magical properties are suppressed for 1 minute. Once this property is used, it can't be used again until the next dawn.

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
