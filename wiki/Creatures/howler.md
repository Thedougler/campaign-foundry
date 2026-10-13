---
title: Howler
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Fiend
size: Large
habitat:
  - Desert
  - Grassland
  - Hill
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Howler
size: Large
type: fiend
alignment: Typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 90
hit_dice: 12d10 + 24
modifier: 3
speed: 40 ft.
stats: [ 17, 16, 15, 5, 14, 6 ]
skillsaves:
  - perception: 5
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: frightened
senses: darkvision 60 ft., passive Perception 15
languages: understands Abyssal but can't speak
cr: "8"
traits:
  - name: Pack Tactics
    desc: A howler has advantage on attack rolls against a creature if at least one of the howler's allies is within 5 feet of the creature and the ally isn't incapacitated.
actions:
  - name: Multiattack
    desc: The howler makes two Rending Bite attacks.
  - name: Rending Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) piercing damage, plus 22 (4d10) psychic damage if the target is frightened. This attack ignores damage resistance."
  - name: Mind-Breaking Howl (Recharge 4–6)
    desc: The howler emits a keening howl in a 60-foot cone. Each creature in that area must succeed on a DC 13 Wisdom saving throw or take 16 (3d10) psychic damage and be frightened until the end of the howler's next turn. While a creature is frightened in this way, its speed is halved, and it is incapacitated. A target that successfully saves is immune to the Mind-Breaking Howl of all howlers for the next 24 hours.
```
