---
title: Galvanic Blastseeker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Galvanic Blastseeker
size: Medium
type: humanoid
subtype: any race
alignment: Chaotic Neutral
ac: 13
hp: 52
hit_dice: 8d8 + 16
modifier: 3
speed: 30 ft.
stats: [ 10, 17, 14, 19, 10, 13 ]
saves:
  - dex: 6
skillsaves:
  - acrobatics: 6
  - arcana: 7
  - perception: 3
damage_resistances: lightning, thunder
gear:
  - spear
senses: passive Perception 13
languages: Common and Primordial, plus any one language
cr: "5"
traits:
  - name: Innate Spellcasting
    desc: |-
      The blastseeker's innate spellcasting ability is Intelligence (spell save DC 15, +7 to hit with spell attacks). The blastseeker can innately cast the following spells, requiring no components other than its Izzet gear, which doesn't function for others:

      **3/day each:** *levitate*, *lightning bolt*, *thunderwave*

      **1/day:** *stoneskin*
  - name: Galvanic Overcast (Recharge 5–6)
    desc: When the blastseeker casts *lightning bolt* or thunderwave, it can roll a die. On an odd number, the blastseeker takes 9 (2d8) force damage. On an even number, the spell also deals 9 (2d8) lightning damage to each target that fails its saving throw.
  - name: Heart of the Storm
    desc: When the blastseeker casts *lightning bolt* or thunderwave, all other creatures within 10 feet of the blastseeker each take 3 lightning damage.
  - name: Gust-Propelled Leap
    desc: The blastseeker can use a bonus action to fly up to 10 feet without provoking opportunity attacks.
actions:
  - name: Spear
    desc: "*Melee or Ranged Weapon Attack:* +3 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 3 (1d6) piercing damage, or 4 (1d8) piercing damage if used with two hands to make a melee attack."
```
