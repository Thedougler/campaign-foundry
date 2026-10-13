---
title: Brain in a Jar
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Undead
size: Small
habitat:
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Brain in a Jar
size: Small
type: undead
alignment: Lawful Evil
ac: 11
hp: 55
hit_dice: 10d6 + 20
modifier: -4
speed: 5 ft., fly 20 ft. (hover)
stats: [ 1, 3, 15, 19, 10, 15 ]
saves:
  - int: 6
  - cha: 4
condition_immunities: exhaustion, paralysed
senses: Blindsight 120 ft., passive Perception 10
languages: telepathy 60 ft. understands Common plus three other languages but can't speak; telepathy 60 ft.
cr: "3"
traits:
  - name: Detect Intelligence
    desc: The brain magically senses the location of any creature within 300 feet of itself that has an Intelligence score of 3 or higher, regardless of interposing barriers.
  - name: Magic Resistance
    desc: The brain has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The brain makes two Disrupting Burst attacks.
  - name: Disrupting Burst
    desc: "*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 120 ft. *Hit:* 11 (2d6 + 4) Psychic damage. The target can't take Reactions until the end of its next turn, and it has Disadvantage on saving throws to maintain Concentration until the end of its next turn."
  - name: Mind Blast (Recharge 5–6)
    desc: "*Intelligence Saving Throw:* DC 14, each creature in a 60-foot Cone. *Failure:* 14 (4d6) Psychic damage, and the target has the Incapacitated condition until the end of the brain's next turn. *Success:* Half damage only."
  - name: Spellcasting
    desc: |-
      The brain casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 14):

      **At will:** *Charm Person*, *Detect Thoughts*, *Mage Hand*

      **1/day each:** *Compulsion*, *Hold Person* (level 3 version)
```
