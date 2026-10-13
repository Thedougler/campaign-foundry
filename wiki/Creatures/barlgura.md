---
title: Barlgura
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
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
name: Barlgura
size: Large
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 15
hp: 85
hit_dice: 10d10 + 30
modifier: 2
speed: 40 ft., climb 40 ft.
stats: [ 18, 15, 16, 7, 14, 9 ]
saves:
  - dex: 5
  - con: 6
skillsaves:
  - perception: 5
  - stealth: 5
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: poisoned
senses: Blindsight 30 ft., Darkvision 120 ft., passive Perception 15
languages: Abyssal; telepathy 120 ft.
cr: "5"
traits:
  - name: Demonic Restoration
    desc: If the barlgura dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss.
actions:
  - name: Multiattack
    desc: The barlgura makes one Tormenting Bite attack and two Thrash attacks.
  - name: Tormenting Bite
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 11 (2d6 + 4) Piercing damage plus 13 (2d12) Psychic damage."
  - name: Thrash
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 9 (1d10 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition."
  - name: Spellcasting
    desc: |-
      The barlgura casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13):

      **2/day each:** *Disguise Self*, *Invisibility* (self only)

      **1/day each:** *Entangle*, *Phantasmal Killer* (level 6 version)
bonus_actions:
  - name: Leap
    desc: The barlgura jumps up to 40 feet by spending 10 feet of movement.
```
