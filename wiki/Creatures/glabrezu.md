---
title: Glabrezu
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Fiend
size: Large
habitat:
  - Planar (Abyss)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Glabrezu
size: Large
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 17
hp: 189
hit_dice: 18d10 + 90
modifier: 6
speed: 40 ft.
stats: [ 20, 15, 21, 19, 17, 16 ]
saves:
  - str: 9
  - con: 9
  - wis: 7
  - cha: 7
skillsaves:
  - deception: 7
  - perception: 7
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: poisoned
senses: Truesight 120 ft., passive Perception 17
languages: Abyssal; telepathy 120 ft.
cr: "9"
traits:
  - name: Demonic Restoration
    desc: If the glabrezu dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss.
  - name: Magic Resistance
    desc: The glabrezu has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The glabrezu makes two Pincer attacks and uses Pummel or Spellcasting.
  - name: Pincer
    desc: "*Melee Attack Roll:* +9, reach 10 ft. *Hit:* 16 (2d10 + 5) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 15) from one of two pincers."
  - name: Pummel
    desc: "*Dexterity Saving Throw:* DC 17, one creature Grappled by the glabrezu. *Failure:* 15 (3d6 + 5) Bludgeoning damage. *Success:* Half damage."
  - name: Spellcasting
    desc: |-
      The glabrezu casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 16):

      **At will:** *Darkness*, *Detect Magic*, *Dispel Magic*

      **1/day each:** *Confusion*, *Fly*, *Power Word Stun*
```
