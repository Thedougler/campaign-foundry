---
title: Gloamwing
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Undead
size: Large
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gloamwing
size: Large
type: undead
alignment: Neutral Evil
ac: 16
ac_class: natural armour
hp: 136
hit_dice: 16d10 + 48
modifier: 3
speed: 30 ft., fly 60 ft.
stats: [ 20, 16, 17, 2, 11, 6 ]
saves:
  - str: 8
  - dex: 6
skillsaves:
  - perception: 3
  - stealth: 6
damage_resistances: necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: darkvision 120 ft., passive Perception 13
languages: understands Common
cr: "8"
traits:
  - name: Death Link
    desc: If its spectre rider is reduced to 0 hit points, the gloamwing is destroyed.
  - name: Flyby
    desc: The gloamwing doesn't provoke an opportunity attack when it flies out of an enemy's reach.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the gloamwing has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: "The gloamwing makes two attacks: one with its bite and one with its claws."
  - name: Bite
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 18 (3d8 + 5) piercing damage."
  - name: Claws
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 15 (3d6 + 5) slashing damage."
```
