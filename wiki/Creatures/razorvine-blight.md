---
title: Razorvine Blight
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Plant
size: Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Razorvine Blight
size: Medium
type: plant
alignment: typically Neutral Evil
ac: 12
hp: 27
hit_dice: 5d8 + 5
modifier: 2
speed: 30 ft., climb 30 ft.
stats: [ 10, 15, 13, 5, 10, 3 ]
skillsaves:
  - stealth: 4
condition_immunities: blinded, deafened
senses: blindsight 60 ft. (can't see beyond this radius), passive Perception 10
languages: understands Common but can't speak
cr: "1"
traits:
  - name: False Appearance
    desc: If the blight is motionless at the start of combat, it has advantage on its initiative roll. If a creature hasn't observed the blight move or act, that creature must succeed on a DC 18 Intelligence (Investigation) check to discern that the blight is animate.
  - name: Spider Climb
    desc: The blight can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Multiattack
    desc: The blight makes two Claw attacks.
  - name: Claw
    desc: "*Melee Weapon Attack:* +4 to hit (with advantage if the target is missing any of its hit points), reach 10 ft., one target. *Hit:* 5 (1d6 + 2) slashing damage."
  - name: Life-Draining Vines (Recharge 6)
    desc: Snaking vines erupt from the blight. Each creature within 10 feet of it must make a DC 12 Dexterity saving throw, taking 9 (2d8) slashing damage on failed save, or half as much damage on a successful one. If at least one of the creatures that failed this save isn't a Construct or an Undead, the blight regains 9 hit points.
```
