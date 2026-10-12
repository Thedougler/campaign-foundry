---
title: Staff of the Woodlands
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Staff, Weapon, Rare (Requires Attunement By a Druid), Simple Weapon, Melee Weapon, 4 lb.*

1d6 Bludgeoning

Versatile (1d8)

Mastery:  Topple

This staff has 6 charges and can be wielded as a magic Quarterstaff that grants a +2 bonus to attack rolls and damage rolls made with it. While holding it, you have a +2 bonus to spell attack rolls.

***Spells.*** While holding the staff, you can cast one of the spells on the following table from it, using your spell save DC. The table indicates how many charges you must expend to cast the spell.

| | Spell                      | | Charge Cost | |
| ---------------------------- | :-------------: |
| | *Animal Friendship*        | |      1      | |
| | *Awaken*                   | |      5      | |
| | *Barkskin*                 | |      2      | |
| | *Locate Animals or Plants* | |      2      | |
| | *Pass without Trace*       | |      2      | |
| | *Speak with Animals*       | |      1      | |
| | *Speak with Plants*        | |      3      | |
| | *Wall of Thorns*           | |      6      | |

***Tree Form.*** You can take a Magic action to plant one end of the staff in earth in an unoccupied space and expend 1 charge to transform the staff into a healthy tree. The tree is 60 feet tall and has a 5-foot-diameter trunk, and its branches at the top spread out in a 20-foot radius. The tree appears ordinary but radiates a faint aura of Transmutation magic that can be discerned with the *Detect Magic* spell. While touching the tree and using a Magic action, you return the staff to its normal form. Any creature in the tree falls when the tree reverts to a staff.

***Regaining Charges.*** The staff regains 1d6 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the staff loses its properties and becomes a nonmagical Quarterstaff.

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
