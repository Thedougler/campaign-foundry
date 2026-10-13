---
title: Young Spirit Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Dragon
size: Large
habitat:
  - Any
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Young Spirit Dragon
size: Large
type: dragon
alignment: Neutral
ac: 17
hp: 152
hit_dice: 16d10 + 64
modifier: 4
speed: 40 ft., burrow 30 ft., fly 80 ft.
stats: [ 19, 13, 19, 17, 14, 16 ]
saves:
  - dex: 4
  - con: 7
skillsaves:
  - insight: 5
  - perception: 5
  - stealth: 4
damage_resistances: necrotic
senses: Blindsight 30 ft., Darkvision 120 ft., passive Perception 15
languages: Common, Draconic; telepathy 120 ft.
cr: "8"
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks. It can replace one attack with a use of Time-Warping Breath.
  - name: Rend
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 14 (3d6 + 4) Slashing damage plus 7 (2d6) Necrotic damage."
  - name: Ruinous Breath (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 15, each creature in a 30-foot Cone. *Failure:* 36 (8d8) Necrotic damage. *Success:* Half damage."
  - name: Time-Warping Breath
    desc: "*Wisdom Saving Throw:* DC 15, each creature that isn't currently affected by this breath in a 30-foot Cone. *Failure:* The target's Speed is halved, it can't take Reactions, and it can take either an action or a Bonus Action on its turn, not both. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically."
```
