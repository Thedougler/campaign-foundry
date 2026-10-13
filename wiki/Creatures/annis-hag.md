---
title: Annis Hag
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Fey
size: Large
habitat:
  - Hill
  - Mountain
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Annis Hag
size: Large
type: fey
alignment: Typically Chaotic Evil
ac: 17
ac_class: natural armour
hp: 90
hit_dice: 12d10 + 24
modifier: 1
speed: 40 ft.
stats: [ 21, 12, 14, 13, 14, 15 ]
saves:
  - con: 5
skillsaves:
  - deception: 5
  - perception: 5
damage_resistances: cold
senses: darkvision 60 ft., passive Perception 15
languages: Common, Giant, Sylvan
cr: "6"
actions:
  - name: Multiattack
    desc: The annis makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 15 (3d6 + 5) piercing damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 15 (3d6 + 5) slashing damage."
  - name: Crushing Hug
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 36 (9d6 + 5) bludgeoning damage, and the target is grappled (escape DC 15) if it is a Large or smaller creature. Until the grapple ends, the target takes 36 (9d6 + 5) bludgeoning damage at the start of each of the hag's turns. The hag can't make attacks while grappling a creature in this way."
  - name: Spellcasting
    desc: |-
      The hag casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 13):

      **3/day each:** *disguise self* (including the form of a Medium Humanoid), *Fog cloud*
```
