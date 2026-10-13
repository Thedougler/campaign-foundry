---
title: Kuo-toa
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Aberration
size: Medium
habitat:
  - Coastal
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Kuo-toa
size: Medium
type: aberration
alignment: Neutral Evil
ac: 13
hp: 18
hit_dice: 4d8
modifier: 0
speed: 30 ft., swim 30 ft.
stats: [ 13, 10, 11, 11, 10, 8 ]
skillsaves:
  - perception: 4
gear:
  - spear
senses: Darkvision 120 ft., Truesight 30 ft., passive Perception 14
languages: Undercommon
cr: 1/4
traits:
  - name: Amphibious
    desc: The kuo-toa can breathe air and water.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the kuo-toa has Disadvantage on ability checks and attack rolls.
actions:
  - name: Spear
    desc: "*Melee or Ranged Attack Roll:* +3, reach 5 ft. or range 20/60 ft. *Hit:* 5 (1d8 + 1) Piercing damage."
  - name: Sticky Net (1/Day)
    desc: "*Dexterity Saving Throw:* DC 10, one Large or smaller creature the kuo-toa can see within 15 feet. *Failure:* The target has the Restrained condition until the net is destroyed (AC 10; HP 5; Immunity to Bludgeoning, Poison, and Psychic damage). A creature can take an action to make a DC 10 Strength (Athletics) check to free itself or another creature in a net within 5 feet, destroying the net on a success."
reactions:
  - name: Sticky Shield
    desc: "Trigger: A creature misses the kuo-toa with a melee attack roll using a weapon. _Response, _*Strength Saving Throw:* DC 11, the triggering creature. *Failure:* The attack's weapon sticks to the kuo-toa's shield. If the target doesn't let go of the weapon, the target has the Grappled condition while the weapon is stuck (escape DC 11). While stuck, the weapon can't be used. The target can take an action to make a DC 11 Strength (Athletics) check, freeing the weapon on a success."
```
