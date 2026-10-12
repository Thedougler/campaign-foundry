---
title: Demon Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Very Rare (Requires Attunement).*

While wearing this armour, you gain a +1 bonus to Armour Class, and you know Abyssal. In addition, the armour's clawed gauntlets allow your Unarmed Strikes to deal 1d8 Slashing damage instead of the usual Bludgeoning damage, and you gain a +1 bonus to the attack and damage rolls of your Unarmed Strikes.

***Curse.*** Once you don this cursed armour, you can't doff it unless you are targeted by a *Remove Curse* spell or similar magic. While wearing the armour, you have Disadvantage on attack rolls against demons and on saving throws against their spells and special abilities.

***Base items.*** This item variant can be applied to the following base items:

- *Breastplate* (*Demon Breastplate*)
- *Chain Mail* (*Demon Chain Mail*)
- *Chain Shirt* (*Demon Chain Shirt*)
- *Half Plate Armour* (*Demon Half Plate Armour*)
- *Hide Armour* (*Demon Hide Armour*)
- *Leather Armor* (*Demon Leather Armor*)
- *Padded Armor* (*Demon Padded Armor*)
- *Plate Armor* (*Demon Plate Armor*)
- *Ring Mail* (*Demon Ring Mail*)
- *Scale Mail* (*Demon Scale Mail*)
- *Splint Armor* (*Demon Splint Armor*)
- *Studded Leather Armor* (*Demon Studded Leather Armor*)

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
