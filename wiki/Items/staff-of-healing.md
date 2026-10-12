---
title: Staff of Healing
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Staff, Weapon, Rare (Requires Attunement By a Bard, Cleric, or Druid), Simple Weapon, Melee Weapon, 4 lb.*

1d6 Bludgeoning

Versatile (1d8)

Mastery:  Topple

This staff has 10 charges. While holding the staff, you can cast one of the spells on the following table from it, using your spellcasting ability modifier. The table indicates how many charges you must expend to cast the spell.

| | Spell                | |                        Charge Cost                       | |
| ---------------------- | :----------------------------------------------------------: |
| | *Cure Wounds*        | | 1 charge per spell level (maximum 4 for a level 4 spell) | |
| | *Lesser Restoration* | |                             2                            | |
| | *Mass Cure Wounds*   | |                             5                            | |

***Regaining Charges.*** The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the staff vanishes in a flash of light, lost forever.

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
