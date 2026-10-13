---
title: Eater of Knowledge
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Aberration
size: Large
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Eater of Knowledge
size: Large
type: aberration
alignment: typically Neutral Evil
ac: 15
ac_class: natural armour
hp: 102
hit_dice: 12d10 + 36
modifier: 0
speed: 40 ft.
stats: [ 18, 10, 17, 18, 16, 15 ]
saves:
  - str: 7
  - int: 7
skillsaves:
  - arcana: 7
  - perception: 6
damage_immunities: psychic
condition_immunities: charmed, frightened
senses: passive Perception 16
languages: telepathy 120 ft.
cr: "6"
traits:
  - name: Brains Devoured
    desc: When the eater of knowledge is first encountered, roll 1d10 to determine the number of brains it has already consumed.
  - name: Magic Resistance
    desc: The eater of knowledge has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The eater of knowledge makes two Slam attacks. If both attacks hit the same creature and the target is Large or smaller, it has the grappled condition (escape DC 14) and must succeed on a DC 15 Intelligence saving throw or have the stunned condition until the grapple ends.
  - name: Slam
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) bludgeoning damage."
  - name: Extract Brain
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one Humanoid with the incapacitated condition. *Hit:* 45 (10d8) piercing damage. If this damage reduces the target to 0 hit points, the eater of knowledge kills the target by extracting and consuming its brain."
  - name: Spellcasting (Psionics)
    desc: |-
      The eater of knowledge casts one of the following spells, requiring no spell components and using Intelligence as its spellcasting ability (spell save DC 15). It must have consumed the requisite number of brains to cast the spell, as indicated:

      **1/day each:** *plane shift* (self only, 0 brains), *detect magic* (1 brain), *silent image* (2 brains), *invisibility* (3 brains), *hypnotic pattern* (4 brains), *major image* (5 brains), *telekinesis* (6 brains), *arcane eye* (7 brains), *mislead* (8 brains), *greater invisibility* (9 brains), *mass suggestion* (10 or more brains)
```
