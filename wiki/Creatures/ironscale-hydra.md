---
title: Ironscale Hydra
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Monstrosity
size: Gargantuan
habitat: []
sourcebooks:
  - Mythic Odysseys of Theros
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ironscale Hydra
size: Gargantuan
type: monstrosity
alignment: Unaligned
ac: 17
ac_class: natural armour
hp: 181
hit_dice: 11d20 + 66
modifier: 0
speed: 40 ft., swim 40 ft.
stats: [ 22, 10, 22, 2, 10, 7 ]
skillsaves:
  - perception: 8
damage_immunities: acid
senses: darkvision 60 ft., passive Perception 18
cr: "12"
traits:
  - name: Acidic Blood
    desc: When the hydra takes piercing or slashing damage, each creature within 5 feet of the hydra takes 9 (2d8) acid damage.
  - name: Hold Breath
    desc: The hydra can hold its breath for 1 hour.
  - name: Multiple Heads
    desc: The hydra has five heads. While it has more than one head, the hydra has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, or knocked unconscious. Whenever the hydra takes 35 or more damage in a single turn, one of its heads dies. If all its heads die, the hydra dies. At the end of its turn, it grows two heads for each of its heads that died since its last turn, unless it has taken fire damage since its last turn. The hydra regains 10 hit points for each head regrown in this way.
  - name: Reactive Heads
    desc: For each head the hydra has beyond one, it gets an extra reaction that can be used only for opportunity attacks.
  - name: Wakeful
    desc: While the hydra sleeps, at least one of its heads is awake.
actions:
  - name: Multiattack
    desc: The hydra makes as many bite attacks as it has heads.
  - name: Bite
    desc: "*Melee Weapon Attack:* +10 to hit, reach 15 ft., one target. *Hit:* 17 (2d10 + 6) piercing damage."
```
