---
title: Hydra
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Monstrosity
size: Huge
habitat:
  - Coastal
  - Swamp
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hydra
size: Huge
type: monstrosity
alignment: Unaligned
ac: 15
hp: 184
hit_dice: 16d12 + 80
modifier: 4
speed: 40 ft., swim 40 ft.
stats: [ 20, 12, 20, 2, 10, 7 ]
skillsaves:
  - perception: 6
condition_immunities: blinded, charmed, deafened, frightened, stunned, unconscious
senses: Darkvision 60 ft., passive Perception 16
cr: "8"
traits:
  - name: Hold Breath
    desc: The hydra can hold its breath for 1 hour.
  - name: Multiple Heads
    desc: The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead. At the end of each of its turns when it has at least one living head, the hydra grows two heads for each of its heads that died since its last turn, unless it has taken Fire damage since its last turn. The hydra regains 20 Hit Points when it grows new heads.
  - name: Reactive Heads
    desc: For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.
actions:
  - name: Multiattack
    desc: The hydra makes as many Bite attacks as it has heads.
  - name: Bite
    desc: "*Melee Attack Roll:* +8, reach 10 ft. *Hit:* 10 (1d10 + 5) Piercing damage."
```
