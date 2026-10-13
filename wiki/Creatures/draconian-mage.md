---
title: Draconian Mage
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Draconian Mage
size: Medium
type: monstrosity
alignment: Any alignment
ac: 15
ac_class: natural armour
hp: 40
hit_dice: 9d8
modifier: 0
speed: 30 ft.
stats: [ 14, 10, 11, 11, 10, 14 ]
saves:
  - int: 2
  - wis: 2
  - cha: 4
gear:
  - trident
senses: darkvision 60 ft., passive Perception 10
languages: Common, Draconic
cr: "2"
traits:
  - name: Death Throes
    desc: When the draconian is reduced to 0 hit points, its scales and flesh immediately shrivel away and its bones explode. Each creature within 10 feet of it must succeed on a DC 10 Dexterity saving throw or take 9 (2d8) force damage.
  - name: Glide
    desc: When the draconian falls and isn't incapacitated, it subtracts up to 100 feet from the fall when calculating the fall's damage, and it can move up to 2 feet horizontally for every 1 foot it descends.
actions:
  - name: Multiattack
    desc: The draconian makes two Trident or Necrotic Ray attacks.
  - name: Trident
    desc: "*Melee or Ranged Weapon Attack:* +4 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used with two hands to make a melee attack."
  - name: Necrotic Ray
    desc: "*Ranged Spell Attack:* +4 to hit, range 60 ft., one target. *Hit:* 10 (3d6) necrotic damage."
  - name: Spellcasting
    desc: |-
      The draconian casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 12):

      **1/day each:** *enlarge/reduce*, *invisibility*, *stinking cloud*
```
