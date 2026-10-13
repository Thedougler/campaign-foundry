---
title: Meazel
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Monstrosity
size: Medium
habitat:
  - Desert
  - Forest
  - Grassland
  - Hill
  - Mountain
  - Swamp
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Meazel
size: Medium
type: monstrosity
alignment: Typically Neutral Evil
ac: 13
hp: 35
hit_dice: 10d8 - 10
modifier: 3
speed: 30 ft.
stats: [ 8, 17, 9, 14, 13, 10 ]
skillsaves:
  - perception: 3
  - stealth: 5
gear:
  - shortsword
senses: darkvision 120 ft., passive Perception 13
languages: Common
cr: "1"
actions:
  - name: Garrote
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target of the meazel's size or smaller. *Hit:* 6 (1d6 + 3) bludgeoning damage, and the target is grappled (escape DC 13 with disadvantage). Until the grapple ends, the target takes 10 (2d6 + 3) bludgeoning damage at the start of each of the meazel's turns. The meazel can't make weapon attacks while grappling a creature in this way."
  - name: Shortsword
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage plus 3 (1d6) necrotic damage."
  - name: Shadow Teleport (Recharge 5–6)
    desc: |-
      The meazel, any equipment it is wearing or carrying, and any creature it is grappling teleport to an unoccupied space within 500 feet of it, provided that the starting space and the destination are in dim light or darkness. The destination must be a place the meazel has seen before, but it need not be within line of sight. If the destination space is occupied, the teleportation leads to the nearest unoccupied space.

      Any other creature the meazel teleports becomes cursed for 1 hour or until the curse is ended by *remove curse* or *greater restoration*. Until this curse ends, every Undead and every creature native to the Shadowfell within 300 feet of the cursed creature can sense it, which prevents that creature from hiding from them.
bonus_actions:
  - name: Shadow Stealth
    desc: While in dim light or darkness, the meazel takes the Hide action.
```
