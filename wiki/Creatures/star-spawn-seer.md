---
title: Star Spawn Seer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Aberration
size: Medium
habitat:
  - Mountain
  - Swamp
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Star Spawn Seer
size: Medium
type: aberration
alignment: Typically Neutral Evil
ac: 17
ac_class: natural armour
hp: 153
hit_dice: 18d8 + 72
modifier: 1
speed: 30 ft.
stats: [ 14, 12, 18, 22, 19, 16 ]
saves:
  - dex: 6
  - int: 11
  - wis: 9
  - cha: 8
skillsaves:
  - perception: 9
damage_resistances: cold; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: psychic
condition_immunities: charmed, frightened
senses: darkvision 60 ft., passive Perception 19
languages: Common, Deep Speech, Undercommon
cr: "13"
traits:
  - name: Out-Of-Phase Movement
    desc: |-
      The seer can move through other creatures and objects as if they were difficult terrain, and its movement doesn't provoke opportunity attacks.

      Each creature it moves through takes 5 (1d10) psychic damage; no creature can take this damage more than once per turn.

      The seer takes 5 (1d10) force damage if it ends its turn inside an object.
actions:
  - name: Multiattack
    desc: The seer makes two Comet Staff or Psychic Orb attacks.
  - name: Comet Staff
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 10 (1d8 + 6) bludgeoning damage plus 18 (4d8) psychic damage, and if the target is a creature, it must succeed on a DC 19 Constitution saving throw or be incapacitated until the end of its next turn."
  - name: Psychic Orb
    desc: "*Ranged Spell Attack:* +11 to hit, range 120 feet, one creature. *Hit:* 27 (5d10) psychic damage."
  - name: Collapse Distance (Recharge 6)
    desc: The seer warps space around one creature it can see within 30 feet of it. That creature must make a DC 19 Wisdom saving throw. On a failed save, the target, along with any equipment it is wearing or carrying, is teleported up to 60 feet to an unoccupied space the seer can see, and then each creature within 10 feet of the target's original space takes 39 (6d12) psychic damage. On a successful save, the target takes 19 (3d12) psychic damage and isn't teleported.
reactions:
  - name: Bend Space
    desc: When the seer would be hit by an attack roll, it teleports, along with any equipment it is wearing or carrying, exchanging positions with another star spawn it can see within 60 feet of it. The other star spawn is hit by the attack instead.
```
