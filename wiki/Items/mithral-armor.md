---
title: Mithral Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Uncommon.*

Mithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes.

If the armour normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armour doesn't.

***Base items.*** This item variant can be applied to the following base items:

- *Breastplate* (*Mithral Breastplate*)
- *Chain Mail* (*Mithral Chain Mail*)
- *Chain Shirt* (*Mithral Chain Shirt*)
- *Half Plate Armour* (*Mithral Half Plate Armour*)
- *Plate Armour* (*Mithral Plate Armour*)
- *Ring Mail* (*Mithral Ring Mail*)
- *Scale Mail* (*Mithral Scale Mail*)
- *Splint Armour* (*Mithral Splint Armor*)

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
