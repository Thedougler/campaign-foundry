---
title: Elder Thing
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Aberration
size: Large
habitat:
  - Mountain
  - Underdark
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Elder Thing
size: Large
type: aberration
alignment: Chaotic Evil
ac: 16
hp: 209
hit_dice: 22d10 + 88
modifier: 0
speed: 20 ft., fly 90 ft. (hover)
stats: [ 21, 11, 18, 20, 17, 16 ]
saves:
  - con: 9
  - int: 10
damage_resistances: bludgeoning, piercing, psychic, slashing
damage_immunities: lightning
condition_immunities: charmed, frightened
senses: Truesight 120 ft., passive Perception 13
languages: Deep Speech; telepathy 120 ft.
cr: "14"
traits:
  - name: Magic Resistance
    desc: The elder thing has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The elder thing makes two Soothing Tentacle attacks and uses Psychic Skewer.
  - name: Soothing Tentacle
    desc: "*Melee Attack Roll:* +10, reach 10 ft. *Hit:* 14 (2d8 + 5) Psychic damage, and the target has the Charmed condition until the start of the elder thing's next turn."
  - name: Mind-Scouring Spores (Recharge 6)
    desc: "*Intelligence Saving Throw:* DC 18, each creature in a 20-foot Emanation originating from the elder thing. *Failure:* 55 (10d10) Psychic damage. For 1 minute, whenever the target takes the Magic action, it takes 10 (3d6) Psychic damage. *Success:* Half damage only."
  - name: Psychic Skewer
    desc: "*Wisdom Saving Throw:* DC 18, one creature within 60 feet. *Failure:* 22 (4d10) Psychic damage. If the target has the Charmed condition, it gains 1 Exhaustion level and has the Stunned condition while Charmed."
bonus_actions:
  - name: Eldritch Magic (3/Day)
    desc: |
      The elder thing casts *Command*, *Detect Thoughts*, *Gust of Wind*, or *Nondetection*, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 18).
```
