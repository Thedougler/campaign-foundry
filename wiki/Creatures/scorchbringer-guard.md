---
title: Scorchbringer Guard
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Scorchbringer Guard
size: Medium
type: humanoid
subtype: any race
alignment: Chaotic Neutral
ac: 16
ac_class: breastplate
hp: 11
hit_dice: 2d8 + 2
modifier: 2
speed: 30 ft.
stats: [ 13, 14, 12, 10, 9, 10 ]
gear:
  - light hammer
senses: passive Perception 9
languages: any one language (usually Common)
cr: 1/2
traits:
  - name: Explosive Tank
    desc: When the guard dies, or if it rolls a 1 when checking whether its Scorchbringer action recharges, the tank on its back explodes in a 10-foot radius sphere. Each creature in that area must make a DC 12 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much damage on a successful one. The explosion ignites flammable objects that aren't being worn or carried, and it destroys the scorchbringer.
actions:
  - name: Light Hammer
    desc: "*Melee or Ranged Weapon Attack:* +4 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 4 (1d4 + 2) bludgeoning damage."
  - name: Scorchbringer (Recharge 4–6)
    desc: The guard's scorchbringer spouts a stream of flame in a line that is 30 feet long and 5 feet wide. Each creature in the line must make a DC 12 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much damage on a successful one.
```
