---
title: Speaker Devil
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Fiend
size: Large
habitat:
  - Planar (Nine Hells)
sourcebooks:
  - Astarion's Book of Hungers
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Speaker Devil
size: Large
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 17
hp: 189
hit_dice: 18d10 + 90
modifier: 4
speed: 30 ft., fly 30 ft.
stats: [ 21, 19, 20, 22, 18, 17 ]
saves:
  - con: 9
  - int: 10
  - wis: 8
  - cha: 7
skillsaves:
  - arcana: 10
  - history: 10
  - perception: 8
damage_resistances: cold
damage_immunities: fire, poison
condition_immunities: poisoned
senses: Darkvision 120 ft., passive Perception 18
languages: Infernal; telepathy 120 ft.
cr: "12"
traits:
  - name: Diabolical Restoration
    desc: If the devil dies outside the Nine Hells, its body disappears in sulphurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  - name: Magic Resistance
    desc: The devil has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The devil makes two Thundering Halberd attacks.
  - name: Thundering Halberd
    desc: "*Melee Attack Roll:* +9, reach 10 ft. *Hit:* 16 (2d10 + 5) Slashing damage plus 14 (4d6) Thunder damage."
  - name: Spellcasting
    desc: |-
      The devil casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 18):

      **At will:** *Detect Magic*, *Detect Thoughts*

      **2/day each:** *Dimension Door*, *Modify Memory*
bonus_actions:
  - name: Utterance of Pain
    desc: "*Wisdom Saving Throw:* DC 18, each creature in a 20-foot Emanation originating from the devil. *Failure:* The target has the Stunned condition until the end of the devil's next turn."
  - name: Utterance of Unmaking
    desc: "*Constitution Saving Throw:* DC 18, each creature in a 20-foot Emanation originating from the devil. *Failure:* 22 (4d10) Force damage. *Success:* Half damage."
```
