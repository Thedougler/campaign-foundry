---
title: Phaerimm Elder
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Aberration
size: Huge
habitat:
  - Underdark
  - Urban
sourcebooks:
  - Netheril's Fall
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Phaerimm Elder
size: Huge
type: aberration
alignment: Neutral Evil
ac: 17
hp: 218
hit_dice: 23d12 + 69
modifier: 8
speed: 30 ft., fly 60 ft. (hover)
stats: [ 18, 16, 17, 17, 16, 18 ]
saves:
  - con: 8
  - int: 8
  - wis: 8
  - cha: 9
skillsaves:
  - arcana: 13
  - insight: 8
  - perception: 8
condition_immunities: charmed, frightened
gear:
  - mind lash
senses: Truesight 120 ft., passive Perception 18
languages: telepathy 120 ft. understands Common and Deep Speech but can't speak
cr: "14"
traits:
  - name: Magic Resistance
    desc: The phaerimm has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The phaerimm makes three Mind Lash attacks. It can replace one attack with either (A) a Vicious Stinger attack or (B) a use of Spellcasting to cast *Command* (level 3 version).
  - name: Mind Lash
    desc: "*Melee or Ranged Attack Roll:* +9, reach 10 ft. or range 120 ft. *Hit:* 32 (6d8 + 4) Psychic damage."
  - name: Vicious Stinger
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 11 (2d6 + 4) Piercing damage plus 26 (4d12) Poison damage, and the target's Speed is reduced to 0 feet until the start of the phaerimm's next turn."
  - name: Siphon Magic (Recharge 5–6)
    desc: The phaerimm focuses on a magic item it can see within 10 feet. When it does, the phaerimm drains the magic item of any charges. Regardless of whether charges are drained, the phaerimm can cast *Clairvoyance*, *Geas*, *Major Image*, and *Mirage Arcane* one additional time that day.
  - name: Spellcasting
    desc: |-
      The phaerimm casts one of the following spells, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17):

      **At will:** *Command* (level 3 version), *Detect Magic*, *Detect Thoughts*, *Mage Hand*

      **1/day each:** *Clairvoyance*, *Geas*, *Major Image*, *Mirage Arcane*
bonus_actions:
  - name: Teleport
    desc: The phaerimm teleports up to 30 feet to an unoccupied space it can see.
reactions:
  - name: Protective Magic (3/Day)
    desc: |
      The phaerimm casts *Counterspell* or *Shield* in response to the spell's trigger, using the same spellcasting ability as Spellcasting.
```
