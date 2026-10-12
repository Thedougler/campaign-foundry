---
title: Fool Card
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Legendary.*

As an action, you can brandish this card at one creature you can see within 30 feet of yourself. The target must succeed on a DC 17 Wisdom saving throw, or for the next minute, the target can't cast spells or activate magic items, it has disadvantage on all saving throws, and other creatures have resistance to all damage it deals. Once this property is used, it can't be used again until the next dawn.

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
