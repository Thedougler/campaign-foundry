---
title: Virvos Magen
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Construct
size: Medium
habitat:
  - Any
sourcebooks:
  - Netheril's Fall
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Virvos Magen
size: Medium
type: construct
alignment: Unaligned
ac: 21
hp: 110
hit_dice: 17d8 + 34
modifier: 3
speed: 30 ft., fly 20 ft. (hover)
stats: [ 12, 10, 14, 10, 10, 16 ]
skillsaves:
  - perception: 6
damage_immunities: poison, psychic
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, paralysed, petrified, poisoned
senses: passive Perception 16
languages: understands Common plus two other languages but can't speak
cr: "6"
traits:
  - name: Disintegration
    desc: If the magen dies, it disintegrates into dust, leaving behind anything it was wearing or carrying.
  - name: Magic Resistance
    desc: The magen has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The magen makes two Psychic Blast attacks.
  - name: Psychic Blast
    desc: "*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 60 ft. *Hit:* 21 (6d6) Psychic damage."
  - name: Spellcasting
    desc: |-
      The magen casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 14):

      **At will:** *Dancing Lights*, *Minor Illusion*

      **1/day each:** *Hypnotic Pattern*, *Major Image*
```
