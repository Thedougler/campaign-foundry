---
title: Winter Eladrin
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Fey
size: Medium
habitat:
  - Arctic
  - Forest
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Winter Eladrin
size: Medium
type: fey
subtype: elf
alignment: Typically Chaotic Neutral
ac: 19
ac_class: natural armour
hp: 165
hit_dice: 22d8 + 66
modifier: 3
speed: 30 ft.
stats: [ 11, 16, 16, 18, 17, 13 ]
damage_resistances: cold
gear:
  - longbow
  - longsword
senses: darkvision 60 ft., passive Perception 13
languages: Common, Elvish, Sylvan
cr: "10"
traits:
  - name: Magic Resistance
    desc: The eladrin has advantage on saving throws against spells and other magical effects.
  - name: Sorrowful Presence
    desc: |-
      Any non-eladrin creature that starts its turn within 60 feet of the eladrin must make a DC 13 Wisdom saving throw. On a failed save, the creature becomes charmed by the eladrin for 1 minute. While charmed in this way, the creature has disadvantage on ability checks and saving throws. The charmed creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to any eladrin's Sorrowful Presence for the next 24 hours.

      Whenever the eladrin deals damage to the charmed creature, the charmed creature can repeat the saving throw, ending the effect on itself on a success.
actions:
  - name: Multiattack
    desc: The eladrin makes two Longsword or Longbow attacks. It can replace one attack with a use of Spellcasting.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d8) slashing damage, or 5 (1d10) slashing damage if used with two hands, plus 13 (3d8) cold damage."
  - name: Longbow
    desc: "*Ranged Weapon Attack:* +7 to hit, range 150/600 ft., one target. *Hit:* 7 (1d8 + 3) piercing damage plus 13 (3d8) cold damage."
  - name: Spellcasting
    desc: |-
      The eladrin casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 16):

      **At will:** *fog cloud*, *gust of wind*, *sleet storm*
bonus_actions:
  - name: Fey Step (Recharge 4–6)
    desc: The eladrin teleports, along with any equipment it is wearing or carrying, up to 30 feet to an unoccupied space it can see.
reactions:
  - name: Frigid Rebuke
    desc: When the eladrin takes damage from a creature the eladrin can see within 60 feet of it, the eladrin can force that creature to make a DC 16 Constitution saving throw. On a failed save, the creature takes 11 (2d10) cold damage.
```
