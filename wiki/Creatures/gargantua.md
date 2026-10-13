---
title: Gargantua
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 21
creature_type: Aberration
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gargantua
size: Gargantuan
type: aberration
alignment: typically Chaotic Neutral
ac: 17
ac_class: natural armour
hp: 388
hit_dice: 21d20 + 168
modifier: 0
speed: 60 ft.
stats: [ 27, 10, 26, 9, 16, 18 ]
saves:
  - dex: 7
  - int: 6
  - wis: 10
damage_resistances: force, psychic
condition_immunities: frightened
senses: darkvision 120 ft., passive Perception 13
languages: Giant
cr: "21"
traits:
  - name: Weird Aura
    desc: At the start of each of the gargantua's turns, each creature of the gargantua's choice within 30 feet of it must make a DC 19 Wisdom saving throw. On a failed save, a target sees the gargantua as a manifestation of the target's worst fears; it takes 17 (5d6) psychic damage and has the frightened condition until the start of the target's next turn. On a successful save, a target is immune to this gargantua's Weird Aura for 24 hours.
actions:
  - name: Multiattack
    desc: The gargantua makes two Slam or Rock attacks.
  - name: Slam
    desc: "*Melee Weapon Attack:* +15 to hit, reach 20 ft., one target. *Hit:* 27 (3d12 + 8) bludgeoning damage."
  - name: Rock
    desc: "*Ranged Weapon Attack:* +15 to hit, range 120/480 ft., one target. *Hit:* 24 (3d10 + 8) bludgeoning damage."
bonus_actions:
  - name: Baleful Hex
    desc: The gargantua curses one creature it can see within 120 feet of itself. The target must succeed on a DC 19 Wisdom saving throw or have the incapacitated condition until the end of its next turn.
  - name: Teleport
    desc: The gargantua teleports, along with any equipment it is wearing or carrying, to an unoccupied space that it can see within 120 feet of itself.
reactions:
  - name: Flick
    desc: Immediately after the gargantua takes damage from a Large or smaller creature it can see within 20 feet of itself, it attempts to flick the creature away. The target must succeed on a DC 23 Strength saving throw, or the target takes 18 (3d6 + 8) bludgeoning damage, is pushed horizontally up to 100 feet away from the gargantua, and has the prone condition.
  - name: Spell Mimicry (1/Day)
    desc: Immediately after a creature the gargantua can see casts a spell of 5th level or lower, the gargantua tries to copy the spell. That creature must succeed on a DC 19 Charisma saving throw, or the gargantua immediately casts the same spell at the same level (+11 to hit with spell attacks, spell save DC 19), requiring no material components and choosing the spell's targets.
```
