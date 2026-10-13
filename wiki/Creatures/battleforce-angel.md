---
title: Battleforce Angel
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Celestial
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Battleforce Angel
size: Medium
type: celestial
alignment: Lawful Good
ac: 18
ac_class: plate armour
hp: 66
hit_dice: 12d8 + 12
modifier: 1
speed: 30 ft., fly 90 ft.
stats: [ 16, 12, 13, 11, 17, 18 ]
saves:
  - wis: 6
  - cha: 7
skillsaves:
  - investigation: 3
  - perception: 6
damage_resistances: fire, radiant
condition_immunities: charmed, exhaustion, frightened
gear:
  - longsword
senses: darkvision 120 ft., truesight 120 ft., passive Perception 16
languages: all
cr: "5"
traits:
  - name: Flyby
    desc: The angel doesn't provoke an opportunity attack when it flies out of an enemy's reach.
  - name: Magic Resistance
    desc: The angel has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The angel makes two melee attacks. It also uses Battlefield Inspiration.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands, plus 18 (4d8) radiant damage. If the target is within 5 feet of any of the angel's allies, the target takes an extra 2 (1d4) radiant damage."
  - name: Battlefield Inspiration
    desc: The angel chooses up to three creatures it can see within 30 feet of it. Until the end of the angel's next turn, each target can add a d4 to its attack rolls and saving throws.
```
