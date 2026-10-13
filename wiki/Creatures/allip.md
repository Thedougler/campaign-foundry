---
title: Allip
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Undead
size: Medium
habitat:
  - Swamp
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Allip
size: Medium
type: undead
alignment: Typically Neutral Evil
ac: 13
hp: 40
hit_dice: 9d8
modifier: 3
speed: 0 ft., fly 40 ft. (hover)
stats: [ 6, 17, 10, 17, 15, 16 ]
saves:
  - int: 6
  - wis: 5
skillsaves:
  - perception: 5
  - stealth: 6
damage_resistances: acid; fire; lightning; thunder; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: cold, necrotic, poison
condition_immunities: charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained
senses: darkvision 60 ft., passive Perception 15
languages: the languages it knew in life
cr: "5"
traits:
  - name: Incorporeal Movement
    desc: The allip can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
  - name: Unusual Nature
    desc: The allip doesn't require air, food, drink, or sleep.
actions:
  - name: Maddening Touch
    desc: "*Melee Spell Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 17 (4d6 + 3) psychic damage."
  - name: Howling Babble (Recharge 6)
    desc: Each creature within 30 feet of the allip that can hear it must make a DC 14 Wisdom saving throw. On a failed save, a target takes 12 (2d8 + 3) psychic damage, and it is stunned until the end of its next turn. On a successful save, it takes half as much damage and isn't stunned. Constructs and Undead are immune to this effect.
  - name: Whispers of Compulsion
    desc: The allip chooses up to three creatures it can see within 60 feet of it. Each target must succeed on a DC 14 Wisdom saving throw, or it takes 12 (2d8 + 3) psychic damage and must use its reaction to make a melee weapon attack against one creature of the allip's choice that the allip can see. Constructs and Undead are immune to this effect.
```
