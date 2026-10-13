---
title: Girallon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Monstrosity
size: Large
habitat:
  - Forest
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Girallon
size: Large
type: monstrosity
alignment: Unaligned
ac: 13
hp: 59
hit_dice: 7d10 + 21
modifier: 3
speed: 40 ft., climb 40 ft.
stats: [ 18, 16, 16, 5, 12, 7 ]
skillsaves:
  - perception: 5
  - stealth: 5
senses: darkvision 60 ft., passive Perception 15
cr: "4"
actions:
  - name: Multiattack
    desc: The girallon makes one Bite attack and four Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one creature. *Hit:* 7 (1d6 + 4) piercing damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +6 to hit, reach 10 ft., one target. *Hit:* 7 (1d6 + 4) slashing damage."
bonus_actions:
  - name: Aggressive
    desc: The girallon moves up to its speed toward a hostile creature that it can see.
```
