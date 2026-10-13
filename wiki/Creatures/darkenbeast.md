---
title: Darkenbeast
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Monstrosity
size: Medium
habitat:
  - Grassland
  - Hill
  - Urban
sourcebooks:
  - Arcana Unleashed
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Darkenbeast
size: Medium
type: monstrosity
alignment: Neutral Evil
ac: 15
hp: 60
hit_dice: 8d8 + 24
modifier: 4
speed: 20 ft., fly 40 ft.
stats: [ 17, 14, 16, 5, 10, 13 ]
skillsaves:
  - perception: 2
  - stealth: 4
condition_immunities: frightened
senses: passive Perception 12
cr: "4"
traits:
  - name: Spell Imprint
    desc: As part of the darkenbeast's creation, its creator can cast one spell of level 5 or lower with a casting time of an action. The spell has no effect but is stored within the darkenbeast. While within 30 feet of the darkenbeast, the darkenbeast's creator can cast the stored spell, requiring no spell components and using the caster's spellcasting ability. When the spell is cast this way, its effects originate from the darkenbeast (as if the darkenbeast were the spellcaster), and immediately after the spell is cast, the darkenbeast dies in a flash of purple flame.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the darkenbeast has Disadvantage on ability checks and attack rolls.
actions:
  - name: Multiattack
    desc: The darkenbeast makes three Rend attacks.
  - name: Rend
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 12 (2d8 + 3) Slashing damage."
bonus_actions:
  - name: Shadow Stalker
    desc: While in Dim Light or Darkness, the darkenbeast takes the Disengage or Hide action.
```
