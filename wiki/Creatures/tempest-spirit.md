---
title: Tempest Spirit
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Undead
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Tempest Spirit
size: Huge
type: undead
alignment: typically Chaotic Evil
ac: 12
hp: 195
hit_dice: 17d12 + 85
modifier: 2
speed: 0 ft., fly 60 ft. (hover)
stats: [ 24, 14, 20, 16, 18, 19 ]
saves:
  - con: 10
  - int: 8
  - wis: 9
  - cha: 9
skillsaves:
  - arcana: 8
  - perception: 9
damage_resistances: cold; necrotic; poison; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: lightning, thunder
condition_immunities: charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained
senses: passive Perception 19
languages: Common, Giant
cr: "15"
traits:
  - name: Incorporeal Movement
    desc: The spirit can move through other creatures and objects as if they were difficult terrain. The spirit takes 5 (1d10) force damage if it ends its turn inside an object.
  - name: Legendary Resistance (3/Day)
    desc: If the spirit fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The spirit makes two Lightning Fist or Hailstone attacks in any combination.
  - name: Lightning Fist
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 25 (4d8 + 7) lightning damage."
  - name: Hailstone
    desc: "*Ranged Weapon Attack:* +12 to hit, range 90/180 ft., one target. *Hit:* 17 (3d6 + 7) bludgeoning damage plus 7 (2d6) cold damage."
  - name: Death Bolt (Recharge 5–6)
    desc: The spirit hurls a magical lightning bolt in a 120-foot line that is 10 feet wide. Each creature in that area must make a DC 18 Dexterity saving throw, taking 27 (6d8) lightning damage plus 16 (3d10) necrotic damage on a failed save, or half as much damage on a successful one. On a success or failure, an affected creature's hit point maximum is reduced by an amount equal to the necrotic damage taken. This reduction lasts until the creature finishes a long rest. The creature dies if its hit point maximum is reduced to 0.
bonus_actions:
  - name: Hailstorm (Recharge 4–6)
    desc: The spirit conjures a hailstorm in a 20-foot-radius, 40-foot-high cylinder centred on a point it can see within 120 feet of itself. Each creature in that area must make a DC 17 Dexterity saving throw. On a failed save, a creature takes 10 (3d6) bludgeoning damage plus 10 (3d6) cold damage and has the prone condition. On a successful save, a creature takes half as much damage only.
```
