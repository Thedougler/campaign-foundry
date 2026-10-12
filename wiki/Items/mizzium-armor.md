---
title: Mizzium Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Rare.*

This suit of armour is reinforced with a magically enhanced metal alloy called mizzium, which is made in Izzet foundries. While you're wearing the armour, any critical hit against you becomes a normal hit. In addition, when you are subjected to a magical effect that allows you to make a Strength or Constitution saving throw to take only half damage, you instead take no damage if you succeed on the saving throw.

***Base items.*** This item variant can be applied to the following base items:

- *Breastplate* (*Mizzium Breastplate*)
- *Chain Mail* (*Mizzium Chain Mail*)
- *Chain Shirt* (*Mizzium Chain Shirt*)
- *Half Plate Armour* (*Mizzium Half Plate Armour*)
- *Plate Armour* (*Mizzium Plate Armour*)
- *Ring Mail* (*Mizzium Ring Mail*)
- *Scale Mail* (*Mizzium Scale Mail*)
- *Spiked Armour* (*Mizzium Spiked Armor*)
- *Splint Armor* (*Mizzium Splint Armor*)

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
