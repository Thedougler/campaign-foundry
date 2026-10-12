---
title: Staff of Charming
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Staff, Weapon, Rare (Requires Attunement By a Bard, Cleric, Druid, Sorcerer, Warlock, or Wizard), Simple Weapon, Melee Weapon, 4 lb.*

1d6 Bludgeoning

Versatile (1d8)

Mastery:  Topple

This staff has 10 charges. While holding the staff, you can use any of its properties:

- **Cast Spell.** You can expend 1 of the staff's charges to cast *Charm Person*, *Command*, or *Comprehend Languages* from it using your spell save DC.
- **Reflect Enchantment.** If you succeed on a saving throw against an Enchantment spell that targets only you, you can take a Reaction to expend 1 charge from the staff and turn the spell back on its caster as if you had cast the spell.
- **Resist Enchantment.** If you fail a saving throw against an Enchantment spell that targets only you, you can turn your failed save into a successful one. You can't use this property of the staff again until the next dawn.

***Regaining Charges.*** The staff regains 1d8 + 2 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the staff crumbles to dust and is destroyed.

***Versatile.*** A Versatile weapon can be used with one or two hands. A damage value in parentheses appears with the property. The weapon deals that damage when used with two hands to make a melee attack.

***Mastery: Topple.*** If you hit a creature with this weapon, you can force the creature to make a Constitution saving throw (DC 8 plus the ability modifier used to make the attack roll and your Proficiency Bonus). On a failed save, the creature has the Prone condition.

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
