---
title: Tortle
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Humanoid
size: Medium
habitat:
  - Coastal
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Tortle
size: Medium
type: humanoid
alignment: Any alignment
ac: 17
ac_class: natural armour
hp: 22
hit_dice: 4d8 + 4
modifier: 0
speed: 30 ft.
stats: [ 15, 10, 12, 11, 13, 12 ]
skillsaves:
  - athletics: 4
  - survival: 3
gear:
  - light crossbow
  - spear
senses: passive Perception 11
languages: Aquan, Common
cr: 1/4
traits:
  - name: Hold Breath
    desc: The tortle can hold its breath for 1 hour.
actions:
  - name: Claw
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) slashing damage."
  - name: Spear
    desc: "*Melee or Ranged Weapon Attack:* +4 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used with two hands in melee."
  - name: Light Crossbow
    desc: "*Ranged Weapon Attack:* +2 to hit, range 80/320 ft., one target. *Hit:* 4 (1d8) piercing damage."
  - name: Shell Defense
    desc: The tortle withdraws into its shell. Until it emerges, it gains a +4 bonus to AC and has advantage on Strength and Constitution saving throws. While in its shell, the tortle is prone, its speed is 0 and can't increase, it has disadvantage on Dexterity saving throws, it can't take reactions, and the only action it can take is a bonus action to emerge.
```
