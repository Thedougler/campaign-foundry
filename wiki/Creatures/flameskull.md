---
title: Flameskull
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Undead
size: Tiny
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Flameskull
size: Tiny
type: undead
alignment: Neutral Evil
ac: 13
hp: 40
hit_dice: 9d4 + 18
modifier: 3
speed: 5 ft., fly 40 ft. (hover)
stats: [ 1, 17, 14, 16, 10, 11 ]
skillsaves:
  - arcana: 5
  - perception: 2
damage_immunities: fire, necrotic, poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned, prone
senses: Darkvision 60 ft., passive Perception 12
languages: Common plus two other languages
cr: "4"
traits:
  - name: Illumination
    desc: The flameskull sheds Bright Light in a 15-foot radius and Dim Light for an additional 15 feet.
  - name: Magic Resistance
    desc: The flameskull has Advantage on saving throws against spells and other magical effects.
  - name: Undead Restoration
    desc: If the flameskull is destroyed, it regains all its Hit Points in 1 hour unless Holy Water is sprinkled on its remains or the *Dispel Evil and Good* spell is cast on them.
actions:
  - name: Multiattack
    desc: The flameskull makes two Fire Ray attacks.
  - name: Fire Ray
    desc: "*Melee or Ranged Attack Roll:* +5, reach 5 ft. or range 60 ft. *Hit:* 13 (3d6 + 3) Fire damage."
  - name: Spellcasting
    desc: |-
      The flameskull casts one of the following spells, requiring no Somatic or Material components and using Intelligence as the spellcasting ability (spell save DC 13):

      **At will:** *Mage Hand*

      **2/day:** *Magic Missile* (level 2 version)

      **1/day:** *Fireball*
```
