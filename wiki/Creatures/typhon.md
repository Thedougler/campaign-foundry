---
title: Typhon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Monstrosity
size: Huge
habitat: []
sourcebooks:
  - Mythic Odysseys of Theros
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Typhon
size: Huge
type: monstrosity
alignment: Chaotic Evil
ac: 17
ac_class: natural armour
hp: 195
hit_dice: 17d12 + 85
modifier: 0
speed: 40 ft.
stats: [ 24, 10, 20, 7, 12, 13 ]
saves:
  - con: 10
damage_immunities: acid, necrotic
senses: darkvision 60 ft., passive Perception 11
languages: Common
cr: "15"
traits:
  - name: Keen Smell
    desc: The typhon has advantage on Wisdom (Perception) checks that rely on smell.
  - name: Regeneration
    desc: The typhon regains 20 hit points at the start of its turn. If it takes radiant damage, this trait doesn't function at the start of its next turn. The typhon dies only if it starts its turn with 0 hit points and doesn't regenerate.
actions:
  - name: Multiattack
    desc: "The typhon makes three attacks: one with its Flurry of Bites, one to constrict, and one with its maw."
  - name: Flurry of Bites
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 35 (8d6 + 7) piercing damage."
  - name: Constrict
    desc: "*Melee Weapon Attack:* +12 to hit, reach 15 ft., one Large or smaller creature. *Hit:* 17 (3d6 + 7) bludgeoning damage, and the target is grappled (escape DC 19). Until this grapple ends, the target is restrained and takes 17 (3d6 + 7) bludgeoning damage at the start of each of its turns. The typhon can have up to two creatures constricted."
  - name: Maw
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 26 (3d12 + 7) piercing damage plus 19 (3d12) acid damage."
```
