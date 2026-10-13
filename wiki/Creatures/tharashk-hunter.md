---
title: Tharashk Hunter
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Tharashk Hunter
size: Small or Medium
type: humanoid
subtype: human, orc
alignment: Neutral
ac: 16
hp: 97
hit_dice: 15d8 + 30
modifier: 4
speed: 40 ft.
stats: [ 12, 19, 15, 11, 16, 10 ]
saves:
  - dex: 7
  - con: 5
skillsaves:
  - perception: 6
  - stealth: 7
  - survival: 6
gear:
  - longbow
  - shortsword
  - studded leather armour
senses: Darkvision 60 ft., passive Perception 16
languages: Common, Orc plus one other language
cr: "6"
actions:
  - name: Multiattack
    desc: The hunter makes three attacks, using Shortsword or Longbow in any combination.
  - name: Shortsword
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 11 (2d6 + 4) Piercing damage, and the target has Disadvantage on attack rolls and ability checks until the end of its next turn."
  - name: Longbow
    desc: "*Ranged Attack Roll:* +7, range 150/600 ft. *Hit:* 17 (3d8 + 4) Piercing damage, and the target's Speed is reduced by 10 feet until the end of its next turn."
bonus_actions:
  - name: Mark of Tharashk
    desc: The hunter magically marks one creature it can see within 150 feet. The mark lasts for 1 hour, until the target dies, or until the hunter uses this Bonus Action again. While the target is marked in this way, the hunter has Advantage on attack rolls against the target, and the target gains no benefit from the Invisible condition against the hunter.
reactions:
  - name: Uncanny Dodge
    desc: "Trigger: The hunter is hit by an attack roll. _Response:_ The hunter halves the damage (round down) it takes from that attack."
```
