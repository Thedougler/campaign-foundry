---
title: Arcanaloth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Fiend
size: Medium
habitat:
  - Planar (Lower)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Arcanaloth
size: Medium
type: fiend
subtype: yugoloth
alignment: Neutral Evil
ac: 18
hp: 175
hit_dice: 27d8 + 54
modifier: 5
speed: 30 ft., fly 30 ft. (hover)
stats: [ 17, 12, 14, 20, 16, 17 ]
saves:
  - dex: 5
  - con: 6
  - int: 9
  - wis: 7
skillsaves:
  - arcana: 9
  - deception: 7
  - insight: 7
  - perception: 7
damage_resistances: cold, fire, lightning
damage_immunities: acid, poison
condition_immunities: charmed, poisoned
senses: Truesight 120 ft., passive Perception 17
languages: all; telepathy 120 ft.
cr: "12"
traits:
  - name: Fiendish Restoration
    desc: If the arcanaloth dies outside Gehenna, its body dissolves into ichor, and it gains a new body instantly and revives with all its Hit Points in Gehenna.
  - name: Magic Resistance
    desc: The arcanaloth has Advantage on saving throws against spells and other magical effects.
  - name: Soul Tome
    desc: |-
      The arcanaloth has a magic tome. While holding or carrying the tome, the arcanaloth can use its Banishing Claw action.

      The tome has AC 17; HP 35; and Immunity to Necrotic, Poison, and Psychic damage. The tome regains all its Hit Points at the end of every turn, but it turns to dust if reduced to 0 Hit Points or when the arcanaloth dies. If the tome is destroyed, the arcanaloth can create a new one when it finishes a Short or Long Rest.
actions:
  - name: Multiattack
    desc: The arcanaloth makes three Fiendish Burst attacks. It can replace one attack with a Banishing Claw attack.
  - name: Fiendish Burst
    desc: "*Melee or Ranged Attack Roll:* +9, reach 5 ft. or range 120 ft. *Hit:* 31 (4d12 + 5) Necrotic damage."
  - name: Banishing Claw (Requires Soul Tome)
    desc: |-
      *Melee Attack Roll:* +9, reach 5 ft. *Hit:* 10 (2d4 + 5) Slashing damage plus 19 (3d12) Psychic damage. If the target is a creature, it is subjected to the following effect. *Charisma Saving Throw:* DC 17. *Failure:* The target is trapped in a demiplane inside the Soul Tome. While trapped there, the target has the Incapacitated condition. At the end of each of its turns, the target repeats the save, escaping the tome on a success. When the target escapes, it appears in the space it left or, if that space is occupied, the nearest unoccupied space.

      If the target fails three of these saves while in the demiplane, it becomes bound to the tome and can escape only if the tome is reduced to 0 Hit Points.
  - name: Spellcasting
    desc: |-
      The arcanaloth casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 17):

      **At will:** *Alter Self*, *Detect Magic*, *Identify*, *Mage Hand*, *Prestidigitation*

      **1/day each:** *Contact Other Plane*, *Detect Thoughts*, *Dimension Door*, *Mind Blank*
bonus_actions:
  - name: Teleport
    desc: The arcanaloth teleports up to 30 feet to an unoccupied space it can see.
reactions:
  - name: Counterspell
    desc: |
      The arcanaloth casts *Counterspell* in response to that spell's trigger, using the same spellcasting ability as Spellcasting.
```
