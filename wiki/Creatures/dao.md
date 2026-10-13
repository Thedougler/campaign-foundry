---
title: Dao
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Elemental
size: Large
habitat:
  - Planar (Earth)
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dao
size: Large
type: elemental
subtype: genie
alignment: Neutral
ac: 18
hp: 200
hit_dice: 16d10 + 112
modifier: 1
speed: 30 ft., burrow 30 ft., fly 30 ft. (hover)
stats: [ 23, 12, 24, 12, 13, 18 ]
saves:
  - dex: 5
  - wis: 5
condition_immunities: petrified
senses: Darkvision 120 ft., passive Perception 11
languages: Primordial (Terran)
cr: "11"
traits:
  - name: Earth Glide
    desc: The dao can burrow through nonmagical, unworked earth and stone. While doing so, the dao doesn't disturb the material it moves through.
  - name: Elemental Restoration
    desc: If the dao dies outside the Elemental Plane of Earth, its body dissolves into dirt, and it gains a new body in 1d4 days, reviving with all its Hit Points somewhere on the Plane of Earth.
  - name: Magic Resistance
    desc: The dao has Advantage on saving throws against spells and other magical effects.
  - name: Wishes
    desc: The dao has a 30 percent chance of knowing the *Wish* spell. If the dao knows it, the dao can cast it only on behalf of a non-genie creature who communicates a wish in a way the dao can understand. If the dao casts the spell for the creature, the dao suffers none of the spell's stress. Once the dao has cast it three times, the dao can't do so again for 365 days.
actions:
  - name: Multiattack
    desc: The dao makes three Earthen Maul attacks or two Earth Burst attacks.
  - name: Earthen Maul
    desc: "*Melee Attack Roll:* +10, reach 5 ft. *Hit:* 20 (4d6 + 6) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition."
  - name: Earth Burst
    desc: "*Ranged Attack Roll:* +10, range 120 ft. *Hit:* 15 (2d8 + 6) Bludgeoning damage. *Hit or Miss:* Earth explodes from the target's space, creating the following effect. *Dexterity Saving Throw:* DC 16, each creature in a 10-foot Emanation originating from and including the target. *Failure:* 10 (3d6) Thunder damage."
  - name: Spellcasting
    desc: |-
      The dao casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16):

      **At will:** *Detect Evil and Good*, *Detect Magic*, *Stone Shape*

      **1/day each:** *Gaseous Form*, *Invisibility*, *Move Earth*, *Passwall*, *Plane Shift*, *Tongues*, *Wall of Stone*
```
