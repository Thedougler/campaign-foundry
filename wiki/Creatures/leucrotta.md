---
title: Leucrotta
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Large
habitat:
  - Desert
  - Grassland
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Leucrotta
size: Large
type: monstrosity
alignment: Typically Chaotic Evil
ac: 14
ac_class: natural armour
hp: 67
hit_dice: 9d10 + 18
modifier: 2
speed: 50 ft.
stats: [ 18, 14, 15, 9, 12, 6 ]
skillsaves:
  - deception: 2
  - perception: 5
senses: darkvision 60 ft., passive Perception 15
languages: Abyssal, Gnoll
cr: "3"
traits:
  - name: Mimicry
    desc: The leucrotta can mimic Beast sounds and Humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 14 Wisdom (Insight) check.
  - name: Stench
    desc: Any creature other than a leucrotta or gnoll that starts its turn within 5 feet of the leucrotta must succeed on a DC 12 Constitution saving throw or be poisoned until the start of the creature's next turn. On a successful saving throw, the creature is immune to the Stench of all leucrottas for 1 hour.
actions:
  - name: Multiattack
    desc: The leucrotta makes one Bite attack and one Hooves attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) piercing damage. If the leucrotta scores a critical hit, it rolls the damage dice three times, instead of twice."
  - name: Hooves
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) bludgeoning damage."
bonus_actions:
  - name: Kicking Retreat
    desc: Immediately after the leucrotta makes a Hooves attack, it takes the Disengage action.
```
