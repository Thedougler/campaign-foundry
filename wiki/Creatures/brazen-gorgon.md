---
title: Brazen Gorgon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Construct
size: Large
habitat:
  - Forest
  - Grassland
  - Hill
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Brazen Gorgon
size: Large
type: construct
alignment: Unaligned
ac: 19
hp: 161
hit_dice: 17d10 + 68
modifier: 2
speed: 40 ft.
stats: [ 18, 14, 19, 2, 14, 7 ]
skillsaves:
  - perception: 10
damage_immunities: fire
condition_immunities: exhaustion, petrified
senses: Darkvision 60 ft., passive Perception 20
cr: "9"
traits:
  - name: Flame Aura
    desc: At the end of each of the gorgon's turns, each creature in a 5-foot Emanation originating from the gorgon takes 13 (3d8) Fire damage.
  - name: Illumination
    desc: The gorgon sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.
actions:
  - name: Multiattack
    desc: The gorgon makes two Gore attacks.
  - name: Gore
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 11 (2d6 + 4) Piercing damage plus 10 (3d6) Fire damage."
  - name: Smelting Charge (Recharge 5–6)
    desc: The gorgon moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each time the gorgon enters a creature's space for the first time during this move, that target is subjected to the following effect. *Dexterity Saving Throw:* DC 16. *Failure:* 13 (2d8 + 4) Piercing damage plus 13 (3d8) Fire damage, and the target is pulled into the gorgon's space and has the Grappled condition (escape DC 14); if the gorgon already has a creature Grappled, the target has the Prone condition instead. Until the grapple ends, the target has the Restrained condition. When the gorgon moves, the Grappled target moves with it, costing no extra movement.
```
