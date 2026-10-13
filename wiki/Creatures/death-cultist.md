---
title: Death Cultist
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Death Cultist
size: Small or Medium
type: humanoid
alignment: Neutral Evil
ac: 17
hp: 127
hit_dice: 15d8 + 60
modifier: 4
speed: 30 ft.
stats: [ 19, 12, 18, 12, 16, 14 ]
saves:
  - con: 7
  - wis: 6
skillsaves:
  - insight: 6
  - perception: 6
  - religion: 4
gear:
  - splint armour
senses: passive Perception 16
languages: Common
cr: "8"
actions:
  - name: Multiattack
    desc: The cultist makes three attacks, using Dread Scythe or Deathly Ray in any combination.
  - name: Dread Scythe
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 9 (1d10 + 4) Slashing damage plus 11 (2d10) Necrotic damage, and the target can't regain Hit Points until the end of its next turn."
  - name: Deathly Ray
    desc: "*Ranged Attack Roll:* +6, range 120 ft. *Hit:* 22 (4d10) Necrotic damage."
  - name: Spellcasting
    desc: |-
      The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

      **At will:** *Speak with Dead*, *Thaumaturgy*
bonus_actions:
  - name: Spirit Wail (Recharge 5–6)
    desc: "*Wisdom Saving Throw:* DC 14, each creature in a 20-foot Emanation originating from the cultist. *Failure:* 14 (4d6) Psychic damage, and the target has the Frightened condition until the end of its next turn. *Success:* Half damage only."
```
