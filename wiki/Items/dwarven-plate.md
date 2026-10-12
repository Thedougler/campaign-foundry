---
title: Dwarven Plate
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Very Rare.*

While wearing this armour, you gain a +2 bonus to Armour Class. In addition, if an effect moves you against your will along the ground, you can take a Reaction to reduce the distance you are moved by up to 10 feet.

***Base items.*** This item variant can be applied to the following base items:

- *Half Plate Armour* (*Dwarven Half Plate Armour*)
- *Plate Armour* (*Dwarven Plate Armour*)

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
