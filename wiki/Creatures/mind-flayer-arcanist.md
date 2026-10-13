---
title: Mind Flayer Arcanist
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Aberration
size: Medium
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mind Flayer Arcanist
size: Medium
type: aberration
alignment: Lawful Evil
ac: 16
hp: 143
hit_dice: 26d8 + 26
modifier: 6
speed: 30 ft., fly 30 ft. (hover)
stats: [ 11, 14, 13, 20, 17, 17 ]
saves:
  - dex: 6
  - int: 9
  - wis: 7
  - cha: 7
skillsaves:
  - arcana: 13
  - insight: 7
  - perception: 7
  - stealth: 6
damage_immunities: psychic
condition_immunities: charmed, frightened
gear:
  - breastplate
senses: Darkvision 120 ft., passive Perception 17
languages: Deep Speech, Undercommon; telepathy 120 ft.
cr: "11"
traits:
  - name: Magic Resistance
    desc: The mind flayer has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The mind flayer makes three Arcane Tentacles attacks.
  - name: Arcane Tentacles
    desc: "*Melee or Ranged Attack Roll:* +9, reach 5 ft. or range 120 ft. *Hit:* 27 (4d10 + 5) Psychic damage, and the mind flayer can teleport the target up to 30 feet to an unoccupied space the mind flayer can see on a surface or liquid large enough to support the target. If this damage reduces the target to 0 Hit Points, the mind flayer kills it and magically devours its brain."
  - name: Mind Burst (Recharge 5–6)
    desc: "*Intelligence Saving Throw:* DC 17, each creature in a 40-foot Emanation originating from the mind flayer. *Failure:* 41 (8d8 + 5) Psychic damage, and the target has the Stunned condition until the end of the mind flayer's next turn. *Success:* Half damage only."
  - name: Spellcasting
    desc: |-
      The mind flayer casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 17):

      **At will:** *Detect Magic*, *Detect Thoughts*, *Disguise Self*, *Mage Hand* (the hand is Invisible)

      **1/day each:** *Clairvoyance*, *Dimension Door*, *Fireball* (level 5 version), *Lightning Bolt* (level 5 version), *Plane Shift* (self only), *Sending*
reactions:
  - name: Shield (2/Day)
    desc: |
      The mind flayer casts *Shield* in response to that spell's trigger, using the same spellcasting ability as Spellcasting.
```
