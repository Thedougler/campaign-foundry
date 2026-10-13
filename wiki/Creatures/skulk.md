---
title: Skulk
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Monstrosity
size: Medium
habitat:
  - Coastal
  - Forest
  - Swamp
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Skulk
size: Medium
type: monstrosity
alignment: Typically Chaotic Neutral
ac: 14
hp: 18
hit_dice: 4d8
modifier: 4
speed: 30 ft.
stats: [ 6, 19, 10, 10, 7, 1 ]
saves:
  - con: 2
skillsaves:
  - stealth: 8
condition_immunities: blinded
senses: darkvision 120 ft., passive Perception 8
languages: understands Common but can't speak
cr: 1/2
traits:
  - name: Fallible Invisibility
    desc: |-
      The skulk is invisible. This invisibility can be circumvented by three things:

      - **Charnel Candles.** The skulk appears as a dim, translucent form in the light of a candle made of fat rendered from a corpse whose identity is unknown.  
      - **Children.** Humanoid children, aged 10 and under, can see through this invisibility.  
      - **Reflective Surfaces.** The skulk appears as a drab, smooth-skinned biped if its reflection can be seen in a mirror or on another surface.  
  - name: Trackless
    desc: The skulk leaves no tracks to indicate where it has been or where it's headed.
actions:
  - name: Claw
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 6 (1d4 + 4) slashing damage plus 3 (1d6) necrotic damage."
```
