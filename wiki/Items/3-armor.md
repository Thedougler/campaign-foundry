---
title: +3 Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Generic Variant, Legendary.*

You have a +3 bonus to AC while wearing this armour.

***Base items.*** This item variant can be applied to the following base items:

- *Breastplate* (*+3 Breastplate*)
- *Chain Mail* (*+3 Chain Mail*)
- *Chain Shirt* (*+3 Chain Shirt*)
- *Half Plate Armour* (*+3 Half Plate Armour*)
- *Hide Armour* (*+3 Hide Armour*)
- *Leather Armour* (*+3 Leather Armor*)
- *Padded Armor* (*+3 Padded Armor*)
- *Plate Armor* (*+3 Plate Armor*)
- *Ring Mail* (*+3 Ring Mail*)
- *Scale Mail* (*+3 Scale Mail*)
- *Splint Armor* (*+3 Splint Armor*)
- *Studded Leather Armor* (*+3 Studded Leather Armor*)

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
