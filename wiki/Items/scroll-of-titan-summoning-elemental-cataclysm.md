---
title: Scroll of Titan Summoning (Elemental Cataclysm)
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Scroll, Legendary.*

When you take a Magic action to read this scroll, an **Elemental Cataclysm** appears in an unoccupied space on the ground or in water that you can see within 1 mile of yourself.

The **Elemental Cataclysm** is Hostile toward all other creatures and disappears when it drops to 0 Hit Points. If the **Elemental Cataclysm** is summoned into a space that isn't large enough to contain it, the summoning fails, and the scroll is wasted.

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
