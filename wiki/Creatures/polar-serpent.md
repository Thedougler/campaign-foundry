---
title: Polar Serpent
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Elemental
size: Large
habitat:
  - Arctic
  - Underdark
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Polar Serpent
size: Large
type: elemental
alignment: Neutral
ac: 14
hp: 58
hit_dice: 9d10 + 9
modifier: 4
speed: 40 ft., fly 40 ft.
stats: [ 18, 19, 12, 4, 12, 6 ]
skillsaves:
  - perception: 3
  - stealth: 6
damage_vulnerabilities: fire
damage_immunities: cold
senses: Darkvision 60 ft., passive Perception 13
languages: understands Primordial but can't speak
cr: "3"
traits:
  - name: Misty Slithering
    desc: The serpent can move through a space as narrow as 1 inch without expending extra movement to do so.
actions:
  - name: Multiattack
    desc: The serpent makes one Bite attack and uses Constrict.
  - name: Bite
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 8 (1d8 + 4) Piercing damage plus 3 (1d6) Cold damage."
  - name: Constrict
    desc: "*Strength Saving Throw:* DC 14, one Medium or smaller creature the snake can see within 10 feet. *Failure:* 3 (1d6) Bludgeoning damage plus 7 (2d6) Cold damage. The target has the Grappled condition (escape DC 14), and it has the Restrained condition until the grapple ends."
```
