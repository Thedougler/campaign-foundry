---
title: Cinder Hulk
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Elemental
size: Large
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cinder Hulk
size: Large
type: elemental
alignment: typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 84
hit_dice: 8d10 + 40
modifier: 1
speed: 40 ft.
stats: [ 20, 12, 20, 9, 14, 10 ]
saves:
  - dex: 4
  - con: 8
  - wis: 5
skillsaves:
  - perception: 5
damage_immunities: fire, poison
condition_immunities: exhaustion, poisoned
senses: passive Perception 15
languages: Giant, Ignan
cr: "7"
traits:
  - name: Death Burst
    desc: When the cinder hulk dies, it leaves behind a cloud of cinders and smoke that fills a 10-foot-radius sphere centred on its space. The sphere is heavily obscured. Any creature that moves into the area for the first time on a turn or starts its turn there must succeed on a DC 16 Constitution saving throw or take 10 (3d6) fire damage. The cloud lasts for 1 minute or until it is dispersed by strong wind.
actions:
  - name: Multiattack
    desc: The cinder hulk makes two Slam attacks.
  - name: Slam
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 16 (2d10 + 5) bludgeoning damage plus 10 (3d6) fire damage."
  - name: Wave of Cinders (Recharge 5–6)
    desc: The cinder hulk emits a wave of smouldering ash from its face, hands, or chest in a 30-foot cone. Each creature in that area must make a DC 16 Dexterity saving throw. On a failed save, a creature takes 31 (7d8) fire damage and has the blinded condition until the end of its next turn. On a successful save, a creature takes half as much damage only.
```
