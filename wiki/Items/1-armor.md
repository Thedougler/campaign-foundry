---
title: +1 Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Generic Variant, Rare.*

You have a +1 bonus to AC while wearing this armour.

***Base items.*** This item variant can be applied to the following base items:

- *Breastplate* (*+1 Breastplate*)
- *Chain Mail* (*+1 Chain Mail*)
- *Chain Shirt* (*+1 Chain Shirt*)
- *Half Plate Armour* (*+1 Half Plate Armour*)
- *Hide Armour* (*+1 Hide Armour*)
- *Leather Armour* (*+1 Leather Armor*)
- *Padded Armor* (*+1 Padded Armor*)
- *Plate Armor* (*+1 Plate Armor*)
- *Ring Mail* (*+1 Ring Mail*)
- *Scale Mail* (*+1 Scale Mail*)
- *Splint Armor* (*+1 Splint Armor*)
- *Studded Leather Armor* (*+1 Studded Leather Armor*)

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
