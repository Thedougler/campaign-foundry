---
title: Nightwalker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 20
creature_type: Undead
size: Huge
habitat:
  - Arctic
  - Desert
  - Swamp
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Nightwalker
size: Huge
type: undead
alignment: Typically Chaotic Evil
ac: 14
hp: 337
hit_dice: 25d12 + 175
modifier: 4
speed: 40 ft., fly 40 ft.
stats: [ 22, 19, 24, 6, 9, 8 ]
saves:
  - con: 13
damage_resistances: acid; cold; fire; lightning; thunder; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: necrotic, poison
condition_immunities: exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained
senses: darkvision 120 ft., passive Perception 9
cr: "20"
traits:
  - name: Annihilating Aura
    desc: Any creature that starts its turn within 30 feet of the nightwalker must succeed on a DC 21 Constitution saving throw or take 21 (6d6) necrotic damage. Undead are immune to this aura.
  - name: Life Eater
    desc: A creature dies if reduced to 0 hit points by the nightwalker and can't be revived except by a *wish* spell.
  - name: Unusual Nature
    desc: The nightwalker doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The nightwalker makes two Enervating Focus attacks, one of which can be replaced by Finger of Doom, if available.
  - name: Enervating Focus
    desc: "*Melee Weapon Attack:* +12 to hit, reach 15 ft., one target. *Hit:* 28 (5d8 + 6) necrotic damage. The target must succeed on a DC 21 Constitution saving throw or its hit point maximum is reduced by an amount equal to the necrotic damage taken. This reduction lasts until the target finishes a long rest. The target dies if its hit point maximum is reduced to 0."
  - name: Finger of Doom (Recharge 6)
    desc: The nightwalker points at one creature it can see within 300 feet of it. The target must succeed on a DC 21 Wisdom saving throw or take 39 (6d12) necrotic damage and become frightened until the end of the nightwalker's next turn. While frightened in this way, the creature is also paralysed. If a target's saving throw is successful, the target is immune to the nightwalker's Finger of Doom for the next 24 hours.
```
