---
title: Firemane Angel
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Celestial
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Firemane Angel
size: Medium
type: celestial
alignment: Chaotic Good
ac: 18
ac_class: plate armour
hp: 135
hit_dice: 18d8 + 54
modifier: 2
speed: 40 ft., fly 120 ft.
stats: [ 22, 15, 17, 12, 14, 23 ]
saves:
  - str: 10
  - wis: 6
  - cha: 10
skillsaves:
  - insight: 6
  - perception: 6
damage_resistances: fire; radiant; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened
gear:
  - longsword
senses: truesight 120 ft., passive Perception 16
languages: all
cr: "12"
traits:
  - name: Innate Spellcasting
    desc: |-
      The angel's innate spellcasting ability is Charisma (spell save DC 18, +10 to hit with spell attacks). The angel can innately cast the following spells, requiring no material components:

      **3/day each:** compelled duel, *guiding bolt* (as a 5th-level spell)

      **1/day each:** *daylight*, *fireball* (as a 6th-level spell)
  - name: Flyby
    desc: The angel doesn't provoke an opportunity attack when it flies out of an enemy's reach.
  - name: Magic Resistance
    desc: The angel has advantage on saving throws against spells and other magical effects.
  - name: Relentless (Recharges after a Short or Long Rest)
    desc: If the angel takes 21 damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead.
actions:
  - name: Multiattack
    desc: The angel makes two melee attacks.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 10 (1d8 + 6) slashing damage, or 11 (1d10 + 6) slashing damage if used with two hands, plus 22 (5d8) fire or radiant damage (angel's choice)."
```
