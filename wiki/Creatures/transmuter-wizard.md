---
title: Transmuter Wizard
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Transmuter Wizard
size: Medium
type: humanoid
alignment: Any alignment
ac: 12
ac_class: 15 with *mage armour*
hp: 49
hit_dice: 11d8
modifier: 2
speed: 30 ft.
stats: [ 9, 14, 11, 17, 12, 11 ]
saves:
  - int: 6
  - wis: 4
skillsaves:
  - arcana: 6
  - history: 6
senses: passive Perception 11
languages: any four languages
cr: "5"
traits:
  - name: Transmuter's Stone
    desc: |-
      The transmuter carries a magic stone it crafted. The stone grants it one of the following benefits while bearing the stone; the transmuter chooses the benefit at the end of each long rest:

      - **Darkvision.** The transmuter has darkvision out to a range of 60 feet.  
      - **Resilience.** The transmuter has proficiency in Constitution saving throws.   
      - **Resistance.** The transmuter has resistance to acid, cold, fire, lightning, or thunder damage (transmuter's choice whenever choosing this benefit).  
      - **Speed.** The transmuter's walking speed is increased by 10 feet.  
actions:
  - name: Multiattack
    desc: The transmuter makes three Arcane Burst attacks.
  - name: Arcane Burst
    desc: "*Melee or Ranged Spell Attack:* +6 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 19 (3d10 + 3) acid damage."
  - name: Spellcasting
    desc: |-
      The transmuter casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

      **At will:** *light*, *message*, *prestidigitation*

      **2/day each:** *fireball*, *hold person*, *knock*, *mage armour*, *polymorph*, *slow*

      **1/day each:** *telekinesis*
bonus_actions:
  - name: Transmute (Recharge 4–6)
    desc: The transmuter casts *alter self* or changes the benefit of Transmuter's Stone if bearing the stone.
```
