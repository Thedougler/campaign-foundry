---
title: Dire Worg
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Fey
size: Huge
habitat:
  - Forest
  - Grassland
  - Hill
  - Planar (Feywild)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dire Worg
size: Huge
type: fey
alignment: Neutral Evil
ac: 16
hp: 147
hit_dice: 14d12 + 56
modifier: 2
speed: 50 ft.
stats: [ 22, 14, 18, 7, 16, 8 ]
saves:
  - dex: 6
  - wis: 7
skillsaves:
  - perception: 11
senses: Darkvision 120 ft., passive Perception 21
languages: Goblin, Sylvan, Worg
cr: "10"
traits:
  - name: Magic Resistance
    desc: The worg has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The worg makes three Bite attacks.
  - name: Bite
    desc: "*Melee Attack Roll:* +10, reach 5 ft. *Hit:* 15 (2d8 + 6) Piercing damage plus 7 (2d6) Poison damage, and the target has the Poisoned condition until the start of the worg's next turn. While Poisoned, the target can't regain Hit Points."
  - name: Dreadful Howl (Recharge 5–6)
    desc: "*Wisdom Saving Throw:* DC 16, each creature within 30 feet that isn't a worg. *Failure:* 36 (8d8) Psychic damage, and the target has the Frightened condition until the start of the worg's next turn. *Success:* Half damage only."
bonus_actions:
  - name: Warp Step
    desc: The worg teleports, along with a willing creature of its choice within 5 feet of it, up to 30 feet to an unoccupied space it can see.
```
