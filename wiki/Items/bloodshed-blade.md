---
title: Bloodshed Blade
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Generic Variant, Very Rare (Requires Attunement).*

The hilt of this sword bears a carnelian engraved with the blood rune.

You can add your Constitution modifier (minimum of +1) to the damage rolls of attacks made with this weapon.

***Invoking the Rune.*** When you target a creature with an attack using this weapon, you can invoke the sword's rune, causing it to flare with crimson light and infusing your attack with bloodthirsty precision. You then spend and roll one of your unspent Hit Dice and add the number rolled to the attack roll. You can choose to invoke the rune after rolling the d20.

If this attack hits, you can also spend and roll any number of your unspent Hit Dice and add the total rolled to the weapon's damage.

Once the rune has been invoked, it can't be invoked again until the next dawn.

***Base items.*** This item variant can be applied to the following base items:

- *Double-Bladed Scimitar* (*Bloodshed Double-Bladed Scimitar*)
- *Greatsword* (*Bloodshed Greatsword*)
- *Longsword* (*Bloodshed Longsword*)
- *Rapier* (*Bloodshed Rapier*)
- *Scimitar* (*Bloodshed Scimitar*)
- *Shortsword* (*Bloodshed Shortsword*)

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
