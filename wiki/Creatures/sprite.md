---
title: Sprite
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Fey
size: Tiny
habitat:
  - Forest
  - Planar (Feywild)
sourcebooks:
  - Monster Manual (2025)
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sprite
size: Tiny
type: fey
alignment: Neutral Good
ac: 15
hp: 10
hit_dice: 4d4
modifier: 4
speed: 10 ft., fly 40 ft.
stats: [ 3, 18, 10, 14, 13, 11 ]
skillsaves:
  - perception: 3
  - stealth: 8
senses: passive Perception 13
languages: Common, Elvish, Sylvan
cr: 1/4
actions:
  - name: Needle Sword
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 6 (1d4 + 4) Piercing damage."
  - name: Enchanting Bow
    desc: "*Ranged Attack Roll:* +6, range 40/160 ft. *Hit:* 1 Piercing damage, and the target has the Charmed condition until the start of the sprite's next turn."
  - name: Heart Sight
    desc: "*Charisma Saving Throw:* DC 10, one creature within 5 feet the sprite can see (Celestials, Fiends, and Undead automatically fail the save). *Failure:* The sprite knows the target's emotions and alignment."
  - name: Invisibility
    desc: |
      The sprite casts *Invisibility* on itself, requiring no spell components and using Charisma as the spellcasting ability.
```
