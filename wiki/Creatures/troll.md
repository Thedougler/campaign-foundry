---
title: Troll
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Giant
size: Large
habitat:
  - Arctic
  - Forest
  - Hill
  - Mountain
  - Swamp
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Troll
size: Large
type: giant
alignment: Chaotic Evil
ac: 15
hp: 94
hit_dice: 9d10 + 45
modifier: 1
speed: 30 ft.
stats: [ 18, 13, 20, 7, 9, 7 ]
skillsaves:
  - perception: 5
senses: Darkvision 60 ft., passive Perception 15
languages: Giant
cr: "5"
traits:
  - name: Loathsome Limbs (4/Day)
    desc: If the troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the troll's limbs is severed, falls into the troll's space, and becomes a Troll Limb. The limb acts immediately after the troll's turn. The troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.
  - name: Regeneration
    desc: The troll regains 15 Hit Points at the start of each of its turns. If the troll takes Acid or Fire damage, this trait doesn't function on the troll's next turn. The troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.
actions:
  - name: Multiattack
    desc: The troll makes three Rend attacks.
  - name: Rend
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 11 (2d6 + 4) Slashing damage."
bonus_actions:
  - name: Charge
    desc: The troll moves up to half its Speed straight toward an enemy it can see.
```
