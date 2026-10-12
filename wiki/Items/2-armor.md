---
title: +2 Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Very Rare.*

You have a +2 bonus to AC while wearing this armour.

***Base items.*** This item variant can be applied to the following base items:

- *Breastplate* (*+2 Breastplate*)
- *Chain Mail* (*+2 Chain Mail*)
- *Chain Shirt* (*+2 Chain Shirt*)
- *Half Plate Armour* (*+2 Half Plate Armour*)
- *Hide Armour* (*+2 Hide Armour*)
- *Leather Armour* (*+2 Leather Armor*)
- *Padded Armor* (*+2 Padded Armor*)
- *Plate Armor* (*+2 Plate Armor*)
- *Ring Mail* (*+2 Ring Mail*)
- *Scale Mail* (*+2 Scale Mail*)
- *Splint Armor* (*+2 Splint Armor*)
- *Studded Leather Armor* (*+2 Studded Leather Armor*)

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
