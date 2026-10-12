---
title: Diamond Staff
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Staff, Weapon, Legendary (Requires Attunement By a Sorcerer, Warlock, or Wizard), Simple Weapon, Melee Weapon, 4 lb.*

1d6 Bludgeoning

Versatile (1d8)

Mastery:  Topple

This 6-foot-long sceptre is carved from a single enormous crystal, with a perfect transparent globe at its head. This staff has 20 charges and can be wielded as a magic *Quarterstaff* that grants a +3 bonus to attack rolls and damage rolls made with it.

***Adept.*** While holding the staff, you have Advantage on Intelligence (Arcana) checks.

***Dazzling Light.*** While holding the staff, you can expend 1 charge and use a command word to cause light to shine from the staff. The staff emits Bright Light in a 40-foot radius and Dim Light for an additional 40 feet. The staff stops glowing after 1 minute or when you use a command word to deactivate it.

***Spells.*** While holding the staff, you can cast one of the spells on the following table from it, using your spell save DC. The table indicates how many charges you must expend to cast the spell.

| | Spell                 | | Charge Cost | |
| ----------------------- | :-------------: |
| | *Detect Magic*        | |      0      | |
| | *Light*               | |      0      | |
| | *Identify*            | |      1      | |
| | *Maze*                | |      8      | |
| | *Knock*               | |      2      | |
| | *Tongues* (self only) | |      0      | |
| | *Legend Lore*         | |      5      | |
| | *True Seeing*         | |      3      | |

***Stunning Hit.*** When you hit with a melee attack using the staff, you can expend 2 charges, and the target must succeed on a DC 17 Constitution saving throw or have the Stunned condition until the end of your next turn.

***Regaining Charges.*** The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the staff is destroyed.

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
