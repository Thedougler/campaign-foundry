---
title: Vampiric Mist
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Undead
size: Medium
habitat:
  - Arctic
  - Coastal
  - Forest
  - Grassland
  - Mountain
  - Swamp
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vampiric Mist
size: Medium
type: undead
alignment: Typically Chaotic Evil
ac: 13
hp: 30
hit_dice: 4d8 + 12
modifier: 3
speed: 0 ft., fly 30 ft. (hover)
stats: [ 6, 16, 16, 6, 12, 7 ]
saves:
  - wis: 3
damage_resistances: acid; cold; lightning; necrotic; thunder; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: charmed, exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained
senses: darkvision 60 ft., passive Perception 11
cr: "3"
traits:
  - name: Life Sense
    desc: The mist can sense the location of any creature within 60 feet of it, unless that creature's type is Construct or Undead.
  - name: Forbiddance
    desc: The mist can't enter a residence without an invitation from one of the occupants.
  - name: Misty Form
    desc: The mist can occupy another creature's space and vice versa. In addition, if air can pass through a space, the mist can pass through it without squeezing. Each foot of movement in water costs it 2 extra feet, rather than 1 extra foot. The mist can't manipulate objects in any way that requires fingers or manual dexterity.
  - name: Sunlight Hypersensitivity
    desc: The mist takes 10 radiant damage whenever it starts its turn in sunlight. While in sunlight, the mist has disadvantage on attack rolls and ability checks.
  - name: Unusual Nature
    desc: The mist doesn't require air or sleep.
actions:
  - name: Life Drain
    desc: The mist touches one creature in its space. The target must succeed on a DC 13 Constitution saving throw (Undead and Constructs automatically succeed), or it takes 10 (2d6 + 3) necrotic damage, the mist regains 10 hit points, and the target's hit point maximum is reduced by an amount equal to the necrotic damage taken. This reduction lasts until the target finishes a long rest. The target dies if its hit point maximum is reduced to 0.
```
