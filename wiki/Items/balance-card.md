---
title: Balance Card
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Legendary.*

As an action, you can brandish this card at one creature you can see within 30 feet of yourself and drain its life force. The target must succeed on a DC 17 Constitution saving throw or take 4d8 necrotic damage. You then regain a number of hit points equal to the necrotic damage the target takes. Once this property is used, it can't be used again until the next dawn."

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
