---
title: Robe of the Archmagi
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Legendary (Requires Attunement By a Sorcerer, Warlock, or Wizard).*

This elegant garment is made from exquisite cloth and adorned with runes.

You gain these benefits while wearing the robe.

***Armour.*** If you aren't wearing armour, your base Armour Class is 15 plus your Dexterity modifier.

***Magic Resistance.*** You have Advantage on saving throws against spells and other magical effects.

***War Mage.*** Your spell save DC and spell attack bonus each increase by 2.

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
