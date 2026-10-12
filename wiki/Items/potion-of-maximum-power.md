---
title: Potion of Maximum Power
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Potion, Rare.*

The first time you cast a damage-dealing spell of 4th level or lower within 1 minute after drinking the potion, instead of rolling dice to determine the damage dealt, you can instead use the highest number possible for each die.

This glowing purple liquid smells of sugar and plum, but it has a muddy taste.

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
