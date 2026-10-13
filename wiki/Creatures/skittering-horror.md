---
title: Skittering Horror
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Aberration
size: Huge
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Skittering Horror
size: Huge
type: aberration
alignment: Neutral Evil
ac: 17
ac_class: natural armour
hp: 228
hit_dice: 24d12 + 72
modifier: 3
speed: 40 ft., climb 40 ft.
stats: [ 22, 16, 17, 2, 14, 18 ]
skillsaves:
  - perception: 7
  - stealth: 8
damage_vulnerabilities: radiant
condition_immunities: frightened
senses: darkvision 120 ft., passive Perception 17
cr: "15"
traits:
  - name: Spider Climb
    desc: The horror can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the horror has disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: "The horror can use its Maddening Presence and make three attacks: one with its bite and two with its claws."
  - name: Bite
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 28 (4d10 + 6) piercing damage."
  - name: Claws
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 24 (4d8 + 6) slashing damage."
  - name: Maddening Presence
    desc: The horror targets one creature it can see within 30 feet of it. If the target can see or hear the horror, the target must make a DC 17 Wisdom saving throw. On a failed saving throw, the target becomes paralysed until the end of its next turn. If a creature's saving throw is successful, the creature is immune to the horror's Maddening Presence for the next 24 hours.
```
