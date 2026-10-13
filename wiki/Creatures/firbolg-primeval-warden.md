---
title: Firbolg Primeval Warden
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Firbolg Primeval Warden
size: Medium
type: humanoid
subtype: druid
alignment: Any alignment
ac: 16
ac_class: hide armour, shield
hp: 65
hit_dice: 10d8 + 20
modifier: 2
speed: 30 ft.
stats: [ 16, 14, 14, 12, 16, 11 ]
saves:
  - int: 3
  - wis: 5
skillsaves:
  - medicine: 5
  - nature: 3
  - perception: 7
gear:
  - spear
senses: passive Perception 17
languages: Common, Druidic, Giant
cr: "4"
actions:
  - name: Multiattack
    desc: The firbolg makes two Spear or Fire Lance attacks.
  - name: Spear
    desc: "*Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage plus 9 (2d8) fire damage."
  - name: Fire Lance
    desc: "*Ranged Spell Attack:* +5 to hit, range 120 ft., one target. *Hit:* 14 (2d10 + 3) fire damage."
  - name: Spellcasting
    desc: |-
      The firbolg casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

      **At will:** *entangle*, *speak with animals*, *speak with plants*

      **1/day each:** *commune with nature* (as an action), *detect magic*, *disguise self*
bonus_actions:
  - name: Hidden Step (2/Day)
    desc: The firbolg magically turns invisible until the start of its next turn, until it makes an attack roll, or until it forces someone to make a saving throw.
```
