---
title: Wastrilith
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Fiend
size: Large
habitat:
  - Coastal
  - Swamp
  - Underdark
  - Underwater
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Wastrilith
size: Large
type: fiend
subtype: demon
alignment: Typically Chaotic Evil
ac: 18
ac_class: natural armour
hp: 157
hit_dice: 15d10 + 75
modifier: 4
speed: 30 ft., swim 80 ft.
stats: [ 19, 18, 21, 19, 12, 14 ]
saves:
  - str: 9
  - con: 10
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 120 ft., passive Perception 11
languages: Abyssal, telepathy 120 ft.
cr: "13"
traits:
  - name: Amphibious
    desc: The wastrilith can breathe air and water.
  - name: Corrupt Water
    desc: |-
      At the start of each of the wastrilith's turns, exposed water within 30 feet of it is befouled. Underwater, this effect lightly obscures the area until a current clears it away. Water in containers remains corrupted until it evaporates.

      A creature that consumes this foul water or swims in it must make a DC 18 Constitution saving throw. On a successful save, the creature is immune to the foul water for 24 hours. On a failed save, the creature takes 14 (4d6) poison damage and is poisoned for 1 minute. At the end of this time, the poisoned creature must repeat the saving throw. On a failure, the creature takes 18 (4d8) poison damage and is poisoned until it finishes a long rest.

      If another demon drinks the foul water as an action, it gains 11 (2d10) temporary hit points.
  - name: Magic Resistance
    desc: The wastrilith has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The wastrilith makes one Bite attack and two Claw attacks, and it uses Grasping Spout.
  - name: Bite
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 30 (4d12 + 4) piercing damage."
  - name: Claws
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 18 (4d6 + 4) slashing damage."
  - name: Grasping Spout
    desc: The wastrilith magically launches a spout of water at one creature it can see within 60 feet of it. The target must make a DC 17 Strength saving throw, and it has disadvantage if it's underwater. On a failed save, it takes 22 (4d8 + 4) acid damage and is pulled up to 60 feet toward the wastrilith. On a successful save, it takes half as much damage and isn't pulled.
bonus_actions:
  - name: Undertow
    desc: If the wastrilith is underwater, it causes all water within 60 feet of it to be difficult terrain for other creatures until the start of its next turn.
```
