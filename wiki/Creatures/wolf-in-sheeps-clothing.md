---
title: Wolf-in-Sheep's-Clothing
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Plant
size: Medium
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Wolf-in-Sheep's-Clothing
size: Medium
type: plant
alignment: Unaligned
ac: 16
ac_class: natural armour
hp: 112
hit_dice: 15d8 + 45
modifier: -1
speed: 20 ft., climb 20 ft.
stats: [ 20, 9, 16, 5, 12, 5 ]
skillsaves:
  - perception: 7
  - stealth: 5
condition_immunities: prone
senses: darkvision 60 ft., passive Perception 17
cr: "7"
traits:
  - name: False Appearance
    desc: If the wolf-in-sheep's-clothing is motionless (except for its lure) at the start of combat, it has advantage on its initiative roll. Moreover, if a creature hasn't observed the wolf-in-sheep's-clothing move or act (except for the lure), that creature must succeed on a DC 18 Intelligence (Investigation) check to discern that the wolf-in-sheep's-clothing is animate.
actions:
  - name: Multiattack
    desc: The wolf-in-sheep's-clothing makes one Bite attack and two Root Tentacle attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 9 (1d8 + 5) piercing damage plus 7 (2d6) acid damage."
  - name: Root Tentacle
    desc: "*Melee Weapon Attack:* +8 to hit, reach 20 ft., one target. *Hit:* 8 (1d6 + 5) bludgeoning damage, and if the target is a Medium or smaller creature, it has the grappled condition (escape DC 16). While grappled in this way, the target has the restrained condition, and at the start of each of the wolf-in-sheep's-clothing's turns, the wolf-in-sheep's-clothing can pull the target up to 10 feet toward itself (no action required). The wolf-in-sheep's-clothing has four root tentacles, each of which can grapple one target."
bonus_actions:
  - name: Completely Harmless Lure
    desc: The wolf-in-sheep's-clothing can change the colour, texture, and shape of its lure to resemble a Tiny Beast or Tiny object. It can move the lure to reinforce the resemblance (no action required), but the lure must remain within 15 feet of the wolf-in-sheep's-clothing, connected by nearly invisible filament-like tendrils.
```
