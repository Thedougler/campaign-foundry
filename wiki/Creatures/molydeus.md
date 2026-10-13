---
title: Molydeus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 21
creature_type: Fiend
size: Huge
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Molydeus
size: Huge
type: fiend
subtype: demon
alignment: Typically Chaotic Evil
ac: 19
ac_class: natural armour
hp: 216
hit_dice: 16d12 + 112
modifier: 6
speed: 40 ft.
stats: [ 28, 22, 25, 21, 24, 24 ]
saves:
  - str: 16
  - con: 14
  - wis: 14
  - cha: 14
skillsaves:
  - perception: 21
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: blinded, charmed, deafened, frightened, poisoned, stunned
senses: truesight 120 ft., passive Perception 31
languages: Abyssal, telepathy 120 ft.
cr: "21"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the molydeus fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The molydeus has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The molydeus makes one Demonic Weapon attack, one Snakebite attack, and one Wolf Bite attack.
  - name: Demonic Weapon
    desc: "*Melee Weapon Attack:* +16 to hit, reach 15 ft., one target. *Hit:* 35 (4d12 + 9) force damage. If the target has at least one head and the molydeus rolled a 20 on the attack roll, the target is decapitated and dies if it can't survive without that head. A target is immune to this effect if it takes none of the damage, has legendary actions, or is Huge or larger. Such a creature takes an extra 27 (6d8) force damage from the hit."
  - name: Snakebite
    desc: "*Melee Weapon Attack:* +16 to hit, reach 15 ft., one creature. *Hit:* 16 (2d6 + 9) poison damage. The target must succeed on a DC 22 Constitution saving throw, or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target transforms into a manes if this reduces its hit point maximum to 0. This transformation can be ended only by a *wish* spell."
  - name: Wolf Bite
    desc: "*Melee Weapon Attack:* +16 to hit, reach 10 ft., one target. *Hit:* 25 (3d10 + 9) necrotic damage."
  - name: Spellcasting
    desc: |-
      The molydeus casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 22):

      **At will:** *dispel magic*, *polymorph*, *telekinesis*, *teleport*

      **3/day:** *lightning bolt*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the molydeus can expend a use to take one of the following actions. The molydeus regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Attack
    desc: The molydeus makes one Demonic Weapon or Snakebite attack.
  - name: Move
    desc: The molydeus moves without provoking opportunity attacks.
  - name: Cast a Spell (Costs 2 Actions)
    desc: The molydeus uses Spellcasting.
```
