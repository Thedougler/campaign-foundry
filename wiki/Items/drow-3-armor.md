---
title: Drow +3 Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant.*

You have a +3 bonus to AC while wearing this armour. This armour loses its enchantment bonus permanently if it is exposed to sunlight for 1 hour or longer.

***Base items.*** This item variant can be applied to the following base items:

- *Breastplate* (*Drow +3 Breastplate*)
- *Chain Mail* (*Drow +3 Chain Mail*)
- *Chain Shirt* (*Drow +3 Chain Shirt*)
- *Half Plate Armour* (*Drow +3 Half Plate Armour*)
- *Hide Armour* (*Drow +3 Hide Armour*)
- *Leather Armour* (*Drow +3 Leather Armor*)
- *Padded Armor* (*Drow +3 Padded Armor*)
- *Plate Armor* (*Drow +3 Plate Armor*)
- *Ring Mail* (*Drow +3 Ring Mail*)
- *Scale Mail* (*Drow +3 Scale Mail*)
- *Spiked Armor* (*Drow +3 Spiked Armor*)
- *Splint Armor* (*Drow +3 Splint Armor*)
- *Studded Leather Armor* (*Drow +3 Studded Leather Armor*)

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
