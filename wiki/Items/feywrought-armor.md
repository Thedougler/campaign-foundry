---
title: Feywrought Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Rare (Requires Attunement).*

This colourful, flowery armour was forged in the Feywild and is infused with that plane's captivating magic.

While wearing this armour, you have advantage on saving throws you make to avoid or end the charmed condition on yourself.

This armour has 3 charges. You can use an action to expend a charge to cast the *Compulsion* spell (save DC 15) from this armour. The armour regains 1d3 expended charges daily at dawn.

***Base items.*** This item variant can be applied to the following base items:

- *Breastplate* (*Feywrought Breastplate*)
- *Chain Mail* (*Feywrought Chain Mail*)
- *Chain Shirt* (*Feywrought Chain Shirt*)
- *Half Plate Armour* (*Feywrought Half Plate Armour*)
- *Hide Armour* (*Feywrought Hide Armour*)
- *Leather Armour* (*Feywrought Leather Armor*)
- *Padded Armor* (*Feywrought Padded Armor*)
- *Plate Armor* (*Feywrought Plate Armor*)
- *Ring Mail* (*Feywrought Ring Mail*)
- *Scale Mail* (*Feywrought Scale Mail*)
- *Spiked Armor* (*Feywrought Spiked Armor*)
- *Splint Armor* (*Feywrought Splint Armor*)
- *Studded Leather Armor* (*Feywrought Studded Leather Armor*)

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
