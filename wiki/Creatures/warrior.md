---
title: Warrior
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - ESK
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Warrior
size: Medium
type: humanoid
alignment: Unaligned
ac: 16
ac_class: chain shirt, shield
hp: 13
hit_dice: 2d8 + 4
modifier: 1
speed: 30 ft.
stats: [ 15, 13, 14, 10, 12, 10 ]
saves:
  - con: 4
skillsaves:
  - athletics: 4
  - perception: 3
  - survival: 3
gear:
  - longbow
  - longsword
senses: passive Perception 13
languages: Common, plus one of your choice
traits:
  - name: Martial Role
    desc: |-
      The warrior has one of the following traits of your choice:

      - **Attacker.** The warrior gains a +2 bonus to attack rolls.  
      - **Defender.** The warrior gains the Protection reaction below.  
actions:
  - name: Longsword
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 6 (1d8 + 2) slashing damage, or 7 (1d10 + 2) slashing damage if used with two hands."
  - name: Longbow
    desc: "*Ranged Weapon Attack:* +3 to hit, range 150/600 ft., one target. *Hit:* 5 (1d8 + 1) piercing damage."
reactions:
  - name: Protection (Defender Only)
    desc: The warrior imposes disadvantage on the attack roll of a creature within 5 feet of it whose target isn't the warrior. The warrior must be able to see the attacker.
```
