---
title: Male Steeder
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Monstrosity
size: Medium
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Male Steeder
size: Medium
type: monstrosity
alignment: Unaligned
ac: 12
ac_class: natural armour
hp: 13
hit_dice: 2d8 + 4
modifier: 1
speed: 30 ft., climb 30 ft.
stats: [ 15, 12, 14, 2, 10, 3 ]
skillsaves:
  - stealth: 5
  - perception: 4
senses: darkvision 120 ft., passive Perception 14
cr: 1/4
traits:
  - name: Extraordinary Leap
    desc: The distance of the steeder's long jumps is tripled; every foot of its walking speed that it spends on the jump allows it to jump 3 feet.
  - name: Spider Climb
    desc: The steeder can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 6 (1d8 + 2) piercing damage plus 4 (1d8) poison damage."
  - name: Sticky Leg
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one Small or Tiny creature. *Hit:* The target is stuck to the steeder's leg and grappled (escape DC 12). The steeder can have only one creature grappled at a time."
```
