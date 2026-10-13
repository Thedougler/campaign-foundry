---
title: Solar Dragon Wyrmling
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Dragon
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Solar Dragon Wyrmling
size: Medium
type: dragon
alignment: typically Neutral
ac: 15
ac_class: natural armour
hp: 51
hit_dice: 6d8 + 24
modifier: 2
speed: 20 ft., fly 40 ft. (hover)
stats: [ 16, 15, 18, 11, 12, 10 ]
saves:
  - dex: 4
  - con: 6
  - wis: 3
  - cha: 2
skillsaves:
  - perception: 5
  - stealth: 4
damage_immunities: radiant
condition_immunities: blinded
senses: darkvision 120 ft., passive Perception 15
languages: Draconic
cr: "3"
traits:
  - name: Flyby
    desc: The dragon doesn't provoke opportunity attacks when it flies out of an enemy's reach.
  - name: Unusual Nature
    desc: The dragon doesn't require air.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and one Tail attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage plus 3 (1d6) radiant damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +5 to hit, reach 10 ft., one target. *Hit:* 5 (1d4 + 3) bludgeoning damage."
  - name: Photonic Breath (Recharge 5–6)
    desc: The dragon exhales a flashing mote of radiant energy that travels to a point the dragon can see within 120 feet of itself, then blossoms into a 10-foot-radius sphere centred on that point. Each creature in the sphere must make a DC 14 Constitution saving throw, taking 22 (4d10) radiant damage on a failed save, or half as much damage on a successful one.
```
