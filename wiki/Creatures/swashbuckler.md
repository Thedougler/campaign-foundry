---
title: Swashbuckler
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Medium
habitat:
  - Coastal
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Swashbuckler
size: Medium
type: humanoid
alignment: Any alignment
ac: 17
ac_class: leather armour, suave defense
hp: 66
hit_dice: 12d8 + 12
modifier: 4
speed: 30 ft.
stats: [ 12, 18, 12, 14, 11, 15 ]
skillsaves:
  - acrobatics: 8
  - athletics: 5
  - persuasion: 6
gear:
  - dagger
  - rapier
senses: passive Perception 10
languages: any one language (usually Common)
cr: "3"
traits:
  - name: Suave Defense
    desc: While the swashbuckler is wearing light or no armour and wielding no shield, its AC includes its Charisma modifier.
actions:
  - name: Multiattack
    desc: The swashbuckler makes one Dagger attack and two Rapier attacks.
  - name: Dagger
    desc: "*Melee or Ranged Weapon Attack:* +6 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 6 (1d4 + 4) piercing damage."
  - name: Rapier
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) piercing damage."
bonus_actions:
  - name: Lightfooted
    desc: The swashbuckler takes the Dash or Disengage action.
```
