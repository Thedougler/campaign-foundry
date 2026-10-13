---
title: Deathlock
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Undead
size: Medium
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Deathlock
size: Medium
type: undead
subtype: warlock
alignment: Typically Neutral Evil
ac: 12
hp: 36
hit_dice: 8d8
modifier: 2
speed: 30 ft.
stats: [ 11, 15, 10, 14, 12, 16 ]
saves:
  - int: 4
  - cha: 5
skillsaves:
  - arcana: 4
  - history: 4
damage_resistances: necrotic; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: darkvision 60 ft., passive Perception 11
languages: the languages it knew in life
cr: "4"
traits:
  - name: Turn Resistance
    desc: The deathlock has advantage on saving throws against any effect that turns Undead.
  - name: Unusual Nature
    desc: The deathlock doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The deathlock makes two Deathly Claw or Grave Bolt attacks.
  - name: Deathly Claw
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 9 (2d6 + 2) necrotic damage."
  - name: Grave Bolt
    desc: "*Ranged Spell Attack:* +5 to hit, range 120 ft., one target. *Hit:* 14 (2d10 + 3) necrotic damage."
  - name: Spellcasting
    desc: |-
      The deathlock casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 13):

      **At will:** *detect magic*, *disguise self*, *mage armour*, *mage hand*

      **1/day each:** *dispel magic*, hunger of Hadar, *invisibility*, *spider climb*
```
