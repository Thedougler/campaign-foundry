---
title: Frostmourn
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Undead
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Frostmourn
size: Huge
type: undead
alignment: typically Neutral Evil
ac: 13
ac_class: natural armour
hp: 195
hit_dice: 17d12 + 85
modifier: -1
speed: 40 ft.
stats: [ 23, 9, 21, 9, 11, 18 ]
saves:
  - con: 9
  - wis: 4
skillsaves:
  - athletics: 10
  - perception: 4
damage_vulnerabilities: fire
damage_immunities: cold, poison
condition_immunities: charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained
senses: passive Perception 14
languages: Giant
cr: "10"
actions:
  - name: Multiattack
    desc: The frostmourn makes one Freezing Touch attack and one Icy Axe attack. It can replace one of these attacks with a Polar Ray attack.
  - name: Freezing Touch
    desc: |-
      *Melee Weapon Attack:* +10 to hit, reach 5 ft., one creature. *Hit:* 18 (4d8) cold damage plus 18 (4d8) necrotic damage. If this damage would reduce the target to 0 hit points, the target drops to 1 hit point instead and has the petrified condition, turning into a frozen statue.

      If the statue takes bludgeoning damage, it shatters, killing the frozen creature. If the statue would take fire damage, it instead takes no damage and thaws, ending the petrification.
  - name: Icy Axe
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one target. *Hit:* 19 (3d8 + 6) slashing damage plus 7 (2d6) cold damage."
  - name: Polar Ray
    desc: "*Ranged Spell Attack:* +8 to hit, range 120 ft., one target. *Hit:* 31 (5d10 + 4) cold damage, and the target's speed is reduced by 10 feet until the end of its next turn."
reactions:
  - name: Blizzard Escape
    desc: Immediately after a creature the frostmourn can see hits it with an attack roll, the frostmourn momentarily dissolves into a blizzard, reducing the damage to itself by half. The frostmourn can then magically teleport to an unoccupied space it can see within 30 feet of itself.
```
