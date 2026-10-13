---
title: Stalker of Baphomet
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Fiend
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Stalker of Baphomet
size: Huge
type: fiend
subtype: demon
alignment: typically Chaotic Evil
ac: 17
ac_class: natural armour
hp: 200
hit_dice: 16d12 + 96
modifier: 3
speed: 40 ft.
stats: [ 25, 17, 22, 13, 16, 12 ]
saves:
  - dex: 7
  - wis: 7
skillsaves:
  - athletics: 15
  - perception: 7
  - stealth: 11
condition_immunities: charmed, frightened
gear:
  - glaive
senses: darkvision 120 ft., passive Perception 17
languages: Abyssal, Giant
cr: "12"
traits:
  - name: Labyrinthine Recall
    desc: The stalker can perfectly recall any path it has travelled.
  - name: Magic Resistance
    desc: The stalker has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The stalker makes two Glaive attacks or two Rock attacks.
  - name: Glaive
    desc: "*Melee Weapon Attack:* +11 to hit, reach 15 ft., one target. *Hit:* 18 (2d10 + 7) slashing damage plus 9 (2d8) force damage."
  - name: Rock
    desc: "*Ranged Weapon Attack:* +11 to hit, range 60/240 ft., one target. *Hit:* 23 (3d10 + 7) bludgeoning damage. If the target is a Large or smaller creature, it must succeed on a DC 19 Strength saving throw or have the prone condition. After the stalker throws the rock, roll a d6; on a roll of 3 or lower, the stalker has no more rocks to throw."
  - name: Erupting Horns (Recharge 5–6)
    desc: |-
      The stalker causes the earth to churn at a point on the ground it can see within 60 feet of itself. Six horn-shaped stones erupt in a 30-foot-radius, 30-foot-high cylinder centred on that point and then crumble to dust.

      Each creature in that area must make a DC 15 Dexterity saving throw. On a failed save, a creature takes 33 (6d10) piercing damage and is pushed up to 30 feet upward and then falls. On a successful save, a creature takes half as much damage only.
  - name: Spellcasting
    desc: |-
      The stalker casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save DC 15):

      **1/day each:** *meld into stone*, *stone shape*, *wall of stone*
```
