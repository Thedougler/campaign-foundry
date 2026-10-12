---
title: Ring of Dedicated Focus
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Ring, Uncommon (Requires Attunement).*

The magical spike on the side of this ring allows you to sharpen your focus at a moment's notice. When you fail a Constitution saving throw to maintain Concentration, you can roll up to two of your unexpended Hit Dice and add the total rolled to your save, potentially turning the failure into a success. The rolled Hit Dice are then expended.

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
