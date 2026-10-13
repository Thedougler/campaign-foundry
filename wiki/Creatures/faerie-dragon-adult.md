---
title: Faerie Dragon Adult
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Dragon
size: Tiny
habitat:
  - Forest
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Faerie Dragon Adult
size: Tiny
type: dragon
alignment: Chaotic Good
ac: 15
hp: 35
hit_dice: 10d4 + 10
modifier: 5
speed: 10 ft., fly 60 ft.
stats: [ 3, 20, 13, 14, 12, 16 ]
skillsaves:
  - arcana: 4
  - perception: 3
  - stealth: 7
senses: Darkvision 60 ft., passive Perception 13
languages: Draconic, Sylvan; telepathy 60 ft. (faerie dragons only)
cr: "2"
traits:
  - name: Magic Resistance
    desc: The dragon has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Bite
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 7 (1d4 + 5) Piercing damage plus 3 (1d6) Psychic damage."
  - name: Euphoria Breath (Recharge 5–6)
    desc: "*Wisdom Saving Throw:* DC 13, each creature in a 15-foot Cone. *Failure:* The target has the Incapacitated condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. While Incapacitated, the target uses all its movement on each of its turns to move in a random direction."
  - name: Spellcasting
    desc: |-
      The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 13):

      **At will:** *Dancing Lights*, *Mage Hand*, *Minor Illusion*

      **1/day each:** *Hallucinatory Terrain*, *Polymorph*
bonus_actions:
  - name: Superior Invisibility
    desc: |
      The dragon casts *Greater Invisibility* on itself, requiring no spell components and using the same spellcasting ability as Spellcasting.
```
