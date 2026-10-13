---
title: Aberrant Cultist
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
name: Aberrant Cultist
size: Small or Medium
type: humanoid
alignment: Neutral Evil
ac: 14
hp: 137
hit_dice: 25d8 + 25
modifier: 7
speed: 30 ft.
stats: [ 10, 19, 12, 16, 18, 15 ]
saves:
  - int: 6
  - wis: 7
skillsaves:
  - arcana: 6
  - perception: 7
  - religion: 6
senses: Darkvision 90 ft., passive Perception 17
languages: Common, Deep Speech; telepathy 30 ft.
cr: "8"
actions:
  - name: Multiattack
    desc: The cultist makes two Tentacle Lash attacks. It can replace any attack with a use of Mind Rot.
  - name: Tentacle Lash
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 7 (1d6 + 4) Slashing damage plus 14 (4d6) Psychic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14) from one of two tentacles, and it has the Restrained condition until the grapple ends."
  - name: Mind Rot
    desc: "*Wisdom Saving Throw:* DC 15, one creature the cultist can see within 90 feet. *Failure:* 27 (6d8) Psychic damage, and the target has the Poisoned condition until the start of the cultist's next turn. *Success:* Half damage only."
  - name: Spellcasting
    desc: |-
      The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 15):

      **At will:** *Detect Thoughts*, *Minor Illusion*
reactions:
  - name: Counterspell (2/Day)
    desc: |
      The cultist casts *Counterspell* in response to that spell's trigger, using the same spellcasting ability as Spellcasting.
```
