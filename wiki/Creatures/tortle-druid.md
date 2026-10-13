---
title: Tortle Druid
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
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
name: Tortle Druid
size: Medium
type: humanoid
alignment: Any alignment
ac: 17
ac_class: natural armour
hp: 33
hit_dice: 6d8 + 6
modifier: 0
speed: 30 ft.
stats: [ 14, 10, 12, 11, 15, 12 ]
skillsaves:
  - animal handling: 4
  - nature: 2
  - survival: 4
senses: passive Perception 12
languages: Aquan, Common
cr: "2"
traits:
  - name: Hold Breath
    desc: The tortle can hold its breath for 1 hour.
actions:
  - name: Multiattack
    desc: The tortle makes four Claw attacks or two Nature's Wrath attacks.
  - name: Claw
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) slashing damage."
  - name: Nature's Wrath
    desc: "*Ranged Spell Attack:* +4 to hit, range 90 ft., one target. *Hit:* 9 (2d6 + 2) damage of a type chosen by the tortle: cold, fire, lightning, or thunder."
  - name: Shell Defense
    desc: The tortle withdraws into its shell. Until it emerges, it gains a +4 bonus to AC and has advantage on Strength and Constitution saving throws. While in its shell, the tortle is prone, its speed is 0 and can't increase, it has disadvantage on Dexterity saving throws, it can't take reactions, and the only action it can take is a bonus action to emerge.
  - name: Spellcasting
    desc: |-
      The tortle casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 12):

      **At will:** *druidcraft*, *guidance*

      **2/day each:** *cure wounds*, *hold person*, *speak with animals*, *thunderwave*
```
