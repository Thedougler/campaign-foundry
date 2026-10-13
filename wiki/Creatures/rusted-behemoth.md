---
title: Rusted Behemoth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Construct
size: Huge
habitat:
  - Coastal
  - Forest
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Rusted Behemoth
size: Huge
type: construct
alignment: Neutral
ac: 18
hp: 157
hit_dice: 15d12 + 60
modifier: 0
speed: 40 ft.
stats: [ 22, 10, 19, 6, 12, 6 ]
damage_immunities: poison
condition_immunities: exhaustion, petrified, poisoned
senses: Darkvision 120 ft., passive Perception 11
languages: Common, Giant
cr: "9"
actions:
  - name: Multiattack
    desc: The Rusted makes three attacks, using Slam or Rusted Shot Put in any combination.
  - name: Slam
    desc: "*Melee Attack Roll:* +10, reach 10 ft. *Hit:* 20 (4d6 + 6) Bludgeoning damage."
  - name: Rusted Shot Put
    desc: "*Ranged Attack Roll:* +10, range 60/240 ft. *Hit:* 15 (2d8 + 6) Bludgeoning damage, and the target has the Poisoned condition until the end of its next turn."
reactions:
  - name: Rust-Riddled Hide
    desc: "Trigger: The Rusted is hit by an attack roll that deals Bludgeoning, Piercing, or Slashing damage. _Response, _*Constitution Saving Throw:* DC 16, each creature of the Rusted's choice in a 5-foot Emanation originating from the Rusted. *Failure:* the target has the Poisoned condition until the end of the target's next turn."
```
