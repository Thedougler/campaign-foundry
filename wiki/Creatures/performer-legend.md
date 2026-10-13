---
title: Performer Legend
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Performer Legend
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 20
hp: 162
hit_dice: 25d8 + 50
modifier: 9
speed: 30 ft.
stats: [ 12, 20, 14, 15, 16, 20 ]
saves:
  - dex: 9
  - int: 6
  - wis: 7
  - cha: 9
skillsaves:
  - acrobatics: 13
  - athletics: 5
  - perception: 7
  - performance: 13
  - stealth: 9
senses: passive Perception 17
languages: Common plus two other languages
cr: "10"
actions:
  - name: Multiattack
    desc: The performer makes three Bejewelled Baton attacks.
  - name: Bejewelled Baton
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 10 (2d4 + 5) Bludgeoning damage plus 10 (3d6) Psychic damage."
  - name: Majestic Song
    desc: "*Wisdom Saving Throw:* DC 17, each creature in a 20-foot-radius Sphere centred on a point within 120 feet. *Failure:* 22 (4d8 + 4) Psychic damage, and the target has the Charmed or Frightened condition (performer's choice) until the end of the performer's next turn. *Success:* Half damage only."
  - name: Spellcasting
    desc: |-
      The performer casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):

      **At will:** *Mage Hand*, *Minor Illusion*, *Prestidigitation*

      **1/day each:** *Major Image*, *Project Image*
reactions:
  - name: Warding Charm
    desc: "Trigger: A creature hits the performer with an attack roll. _Response, _*Wisdom Saving Throw:* DC 17, the triggering creature. *Failure:* The attack roll misses the performer, and the target has the Charmed condition until the end of the performer's next turn."
```
