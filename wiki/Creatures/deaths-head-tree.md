---
title: Death's Head Tree
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Plant
size: Huge
habitat:
  - Forest
  - Swamp
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Death's Head Tree
size: Huge
type: plant
alignment: Chaotic Evil
ac: 15
hp: 95
hit_dice: 10d12 + 30
modifier: -1
speed: 20 ft.
stats: [ 18, 8, 16, 5, 10, 13 ]
saves:
  - str: 6
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: Blindsight 120 ft., passive Perception 10
cr: "4"
traits:
  - name: Overhanging Branches
    desc: The tree's allies can willingly end their moves in the tree's space. Allies in the tree's space have Half Cover.
  - name: Unholy Regrowth
    desc: If the tree dies, 2d6 Death's Head Trees regrow around the same place in 365 days unless the tree is killed by a creature under the effect of a *Bless* spell using a weapon that deals Slashing damage.
actions:
  - name: Multiattack
    desc: The tree makes two Slam attacks.
  - name: Slam
    desc: "*Melee Attack Roll:* +6, reach 10 ft. *Hit:* 15 (2d10 + 4) Bludgeoning damage."
  - name: Exploding Head
    desc: "*Dexterity Saving Throw:* DC 14, each creature in a 10-foot-radius Sphere centred on a point the tree can see within 120 feet. *Failure:* 10 (3d6) Necrotic damage, and the creature has the Poisoned condition until the start of the tree's next turn. *Success:* Half damage only."
bonus_actions:
  - name: Head Fruits
    desc: Each Undead ally in the tree's space can immediately take a Reaction to gain 5 Temporary Hit Points.
```
