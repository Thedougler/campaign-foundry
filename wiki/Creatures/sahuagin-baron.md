---
title: Sahuagin Baron
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Fiend
size: Large
habitat:
  - Coastal
  - Underwater
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sahuagin Baron
size: Large
type: fiend
alignment: Lawful Evil
ac: 16
hp: 76
hit_dice: 9d10 + 27
modifier: 5
speed: 30 ft., swim 50 ft.
stats: [ 19, 15, 16, 14, 13, 17 ]
saves:
  - dex: 5
  - con: 6
  - wis: 4
skillsaves:
  - perception: 7
damage_resistances: acid, cold
gear:
  - breastplate
  - trident
senses: Darkvision 120 ft., passive Perception 17
languages: Sahuagin
cr: "5"
traits:
  - name: Blood Frenzy
    desc: The sahuagin has Advantage on attack rolls against any creature that doesn't have all its Hit Points.
  - name: Limited Amphibiousness
    desc: The sahuagin can breathe air and water, but it must be submerged at least once every 4 hours to avoid suffocating outside water.
  - name: Shark Telepathy
    desc: The sahuagin can magically control sharks within 120 feet of itself, using a special telepathy.
actions:
  - name: Multiattack
    desc: The sahuagin makes three Trident attacks.
  - name: Trident
    desc: "*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 20/60 ft. *Hit:* 13 (2d8 + 4) Piercing damage."
reactions:
  - name: Fiendish Blood
    desc: "Trigger: The sahuagin takes Piercing or Slashing damage. _Response, _*Constitution Saving Throw:* DC 14, each creature of the sahuagin's choice in a 5-foot Emanation originating from the sahuagin. *Failure:* 10 (3d6) Acid damage, and the target is cursed until it finishes a Short or Long Rest. While cursed, the target can't benefit from the Invisible condition, its Speed decreases by 10 feet, and all Fiends within 120 feet of the target can sense its location regardless of interposing obstacles."
```
