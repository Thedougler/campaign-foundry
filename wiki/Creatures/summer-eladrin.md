---
title: Summer Eladrin
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Fey
size: Medium
habitat:
  - Desert
  - Forest
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Summer Eladrin
size: Medium
type: fey
subtype: elf
alignment: Typically Chaotic Neutral
ac: 19
ac_class: natural armour
hp: 165
hit_dice: 22d8 + 66
modifier: 5
speed: 50 ft.
stats: [ 19, 21, 16, 14, 12, 18 ]
skillsaves:
  - athletics: 8
  - intimidation: 8
damage_resistances: fire
gear:
  - longbow
  - longsword
senses: darkvision 60 ft., passive Perception 11
languages: Common, Elvish, Sylvan
cr: "10"
traits:
  - name: Fearsome Presence
    desc: Any non-eladrin creature that starts its turn within 60 feet of the eladrin must make a DC 16 Wisdom saving throw. On a failed save, the creature becomes frightened of the eladrin for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to any eladrin's Fearsome Presence for the next 24 hours.
  - name: Magic Resistance
    desc: The eladrin has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The eladrin makes two Longsword or Longbow attacks.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 13 (2d8 + 4) slashing damage, or 15 (2d10 + 4) slashing damage if used with two hands, plus 9 (2d8) fire damage."
  - name: Longbow
    desc: "*Ranged Weapon Attack:* +9 to hit, range 150/600 ft., one target. *Hit:* 14 (2d8 + 5) piercing damage plus 9 (2d8) fire damage."
bonus_actions:
  - name: Fey Step (Recharge 4–6)
    desc: The eladrin teleports, along with any equipment it is wearing or carrying, up to 30 feet to an unoccupied space it can see.
reactions:
  - name: Parry
    desc: The eladrin adds 3 to its AC against one melee attack that would hit it. To do so, the eladrin must see the attacker and be wielding a melee weapon.
```
