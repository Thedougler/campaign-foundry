---
title: Baphomet
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 23
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
name: Baphomet
size: Huge
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 22
ac_class: natural armour
hp: 319
hit_dice: 22d12 + 176
modifier: 2
speed: 40 ft.
stats: [ 30, 14, 26, 18, 24, 16 ]
saves:
  - dex: 9
  - con: 15
  - wis: 14
skillsaves:
  - intimidation: 17
  - perception: 14
damage_resistances: cold, fire, lightning
damage_immunities: poison; bludgeoning, piercing, slashing that is nonmagical
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: truesight 120 ft., passive Perception 24
languages: all, telepathy 120 ft.
cr: "23"
traits:
  - name: Labyrinthine Recall
    desc: Baphomet can perfectly recall any path he has travelled, and he is immune to the *maze* spell.
  - name: Legendary Resistance (3/Day)
    desc: If Baphomet fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Baphomet has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: Baphomet makes one Bite attack, one Gore attack, and one Heartcleaver attack. He also uses Frightful Presence.
  - name: Bite
    desc: "*Melee Weapon Attack:* +17 to hit, reach 10 ft., one target. *Hit:* 19 (2d8 + 10) piercing damage."
  - name: Gore
    desc: "*Melee Weapon Attack:* +17 to hit, reach 10 ft., one target. *Hit:* 17 (2d6 + 10) piercing damage. If Baphomet moved at least 10 feet straight toward the target immediately before the hit, the target takes an extra 16 (3d10) piercing damage. If the target is a creature, it must succeed on a DC 25 Strength saving throw or be pushed up to 10 feet away and knocked prone."
  - name: Heartcleaver
    desc: "*Melee Weapon Attack:* +17 to hit, reach 15 ft., one target. *Hit:* 21 (2d10 + 10) force damage."
  - name: Frightful Presence
    desc: |-
      Each creature of Baphomet's choice within 120 feet of him and aware of him must succeed on a DC 18 Wisdom saving throw or become frightened for 1 minute. A frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. These later saves have disadvantage if Baphomet is within line of sight of the creature.

      If a creature succeeds on any of these saves or the effect ends on it, the creature is immune to Baphomet's Frightful Presence for the next 24 hours.
  - name: Spellcasting
    desc: |-
      Baphomet casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 18):

      **3/day each:** *dispel magic*, *dominate beast*, *maze*, *wall of stone*

      **1/day:** *teleport*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Baphomet can expend a use to take one of the following actions. Baphomet regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Heartcleaver Attack
    desc: Baphomet makes one Heartcleaver attack.
  - name: Charge (Costs 2 Actions)
    desc: Baphomet moves up to his speed without provoking opportunity attacks, then makes a Gore attack.
```
