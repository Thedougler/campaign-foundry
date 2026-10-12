---
title: Gloomwrought Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Rare (Requires Attunement).*

This intricate greyscale armour was forged in the Shadowfell and is infused with that plane's gloom.

While you're wearing this armour, you have advantage on saving throws you make to avoid or end the frightened condition on yourself.

This armour has 3 charges. You can expend a charge to cast the *Calm Emotions* spell (save DC 15) from the armour. This armour regains 1d3 expended charges daily at dawn.

***Base items.*** This item variant can be applied to the following base items:

- *Breastplate* (*Gloomwrought Breastplate*)
- *Chain Mail* (*Gloomwrought Chain Mail*)
- *Chain Shirt* (*Gloomwrought Chain Shirt*)
- *Half Plate Armour* (*Gloomwrought Half Plate Armour*)
- *Hide Armour* (*Gloomwrought Hide Armour*)
- *Leather Armour* (*Gloomwrought Leather Armor*)
- *Padded Armor* (*Gloomwrought Padded Armor*)
- *Plate Armor* (*Gloomwrought Plate Armor*)
- *Ring Mail* (*Gloomwrought Ring Mail*)
- *Scale Mail* (*Gloomwrought Scale Mail*)
- *Spiked Armor* (*Gloomwrought Spiked Armor*)
- *Splint Armor* (*Gloomwrought Splint Armor*)
- *Studded Leather Armor* (*Gloomwrought Studded Leather Armor*)

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
