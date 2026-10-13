---
title: Murder Comet
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Elemental
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Murder Comet
size: Medium
type: elemental
alignment: typically Neutral Evil
ac: 19
ac_class: natural armour
hp: 66
hit_dice: 7d8 + 35
modifier: 2
speed: 0 ft., fly 120 ft.
stats: [ 15, 15, 20, 6, 10, 6 ]
damage_immunities: fire, poison
condition_immunities: exhaustion, paralysed, petrified, poisoned, prone, unconscious
senses: darkvision 240 ft., passive Perception 10
languages: Ignan, Terran
cr: "5"
traits:
  - name: Explode
    desc: When the comet drops to 0 hit points, it explodes in a 20-foot-radius sphere centred on itself. Each creature in the sphere must make a DC 16 Dexterity saving throw, taking 28 (8d6) fire damage on a failed save, or half as much damage on a successful one.
  - name: Flyby
    desc: The comet doesn't provoke opportunity attacks when it flies out of an enemy's reach.
  - name: Illumination
    desc: The comet sheds bright light in a 30-foot radius and dim light for an additional 30 feet.
  - name: Siege Monster
    desc: The comet deals double damage to objects and structures.
  - name: Unusual Nature
    desc: The comet doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The comet makes one Slam attack and one Spit Fire attack.
  - name: Slam
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d8 + 2) bludgeoning damage plus 7 (2d6) fire damage."
  - name: Spit Fire
    desc: "*Ranged Weapon Attack:* +5 to hit, range 60 ft., one target. *Hit:* 13 (2d10 + 2) fire damage."
```
