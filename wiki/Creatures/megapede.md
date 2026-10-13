---
title: Megapede
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Monstrosity
size: Gargantuan
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Megapede
size: Gargantuan
type: monstrosity
alignment: Unaligned
ac: 15
ac_class: natural armour
hp: 175
hit_dice: 13d20 + 39
modifier: 0
speed: 40 ft., climb 40 ft.
stats: [ 22, 10, 17, 1, 10, 3 ]
saves:
  - con: 7
  - wis: 4
skillsaves:
  - perception: 8
  - stealth: 4
senses: darkvision 120 ft., passive Perception 18
cr: "11"
actions:
  - name: Multiattack
    desc: The megapede makes one Bite attack and uses either Life Drain or Psychic Bomb.
  - name: Bite
    desc: "*Melee Weapon Attack:* +10 to hit, reach 20 ft., one target. *Hit:* 22 (3d10 + 6) piercing damage plus 22 (5d8) poison damage."
  - name: Life Drain
    desc: The megapede magically drains life energy from other creatures nearby. Each creature within 15 feet of the megapede must make a DC 15 Constitution saving throw, taking 16 (3d10) necrotic damage on a failed save, or half as much damage on a successful one.
  - name: Psychic Bomb
    desc: The megapede targets one creature it can see within 60 feet of itself. The target must make a DC 15 Wisdom saving throw. On a failed save, the target takes 22 (5d8) psychic damage and is incapacitated until the end of its next turn. On a successful save, the target takes half as much damage and isn't incapacitated.
```
