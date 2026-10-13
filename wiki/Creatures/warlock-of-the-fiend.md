---
title: Warlock of the Fiend
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Humanoid
size: Medium
habitat:
  - Arctic
  - Desert
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Warlock of the Fiend
size: Medium
type: humanoid
alignment: Any alignment
ac: 13
ac_class: 16 with *mage armour*
hp: 78
hit_dice: 12d8 + 24
modifier: 3
speed: 30 ft.
stats: [ 10, 16, 15, 12, 12, 18 ]
saves:
  - wis: 4
  - cha: 7
skillsaves:
  - arcana: 4
  - deception: 7
  - persuasion: 7
  - religion: 4
gear:
  - scimitar
senses: darkvision 60 ft., passive Perception 11
languages: any two languages (usually Abyssal or Infernal)
cr: "7"
traits:
  - name: Dark One's Own Luck (Recharges after a Short or Long Rest)
    desc: When the warlock makes an ability check or saving throw, it can add a d10 to the roll. It can do this after the roll is made but before any of the roll's effects occur.
actions:
  - name: Multiattack
    desc: The warlock makes three Scimitar attacks.
  - name: Scimitar
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) slashing damage plus 14 (4d6) fire damage."
  - name: Hellfire
    desc: Green flame explodes in a 10-foot-radius sphere centred on a point within 120 feet of the warlock. Each creature in that area must make a DC 15 Dexterity saving throw, taking 16 (3d10) fire damage and 11 (2d10) necrotic damage on a failed save, or half as much damage on a successful one.
  - name: Spellcasting
    desc: |-
      The warlock casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 15): 

      **At will:** *alter self*, *mage armour* (self only), *mage hand*, *minor illusion*, *prestidigitation*

      **1/day each:** *banishment*, *plane shift*, *suggestion*
reactions:
  - name: Fiendish Rebuke (3/Day)
    desc: In response to being damaged by a visible creature within 60 feet of it, the warlock forces that creature to make a DC 15 Constitution saving throw, taking 22 (4d10) necrotic damage on a failed save, or half as much damage on a successful one.
```
