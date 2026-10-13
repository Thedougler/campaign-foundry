---
title: Sword Wraith Warrior
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Undead
size: Medium
habitat:
  - Grassland
  - Swamp
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sword Wraith Warrior
size: Medium
type: undead
alignment: Typically Lawful Evil
ac: 16
ac_class: chain shirt, shield
hp: 45
hit_dice: 6d8 + 18
modifier: 1
speed: 30 ft.
stats: [ 18, 12, 17, 6, 9, 10 ]
damage_resistances: necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: exhaustion, frightened, poisoned, unconscious
gear:
  - battleaxe
  - longbow
senses: darkvision 60 ft., passive Perception 9
languages: the languages it knew in life
cr: "3"
traits:
  - name: Unusual Nature
    desc: The warrior doesn't require air, food, drink, or sleep.
actions:
  - name: Battleaxe
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands."
  - name: Longbow
    desc: "*Ranged Weapon Attack:* +3 to hit, range 150/600 ft., one target. *Hit:* 5 (1d8 + 1) piercing damage."
bonus_actions:
  - name: Martial Fury
    desc: The warrior makes one Battleaxe or Longbow attack, and attack rolls against it have advantage until the start of its next turn.
```
