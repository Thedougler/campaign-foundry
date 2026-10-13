---
title: Orc Claw of Luthic
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Humanoid
size: Medium
habitat:
  - Underdark
  - Mountain
sourcebooks:
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Orc Claw of Luthic
size: Medium
type: humanoid
subtype: orc
alignment: Chaotic Evil
ac: 14
ac_class: hide armour
hp: 45
hit_dice: 6d8 + 18
modifier: 2
speed: 30 ft.
stats: [ 14, 15, 16, 10, 15, 11 ]
skillsaves:
  - intimidation: 2
  - medicine: 4
  - survival: 4
senses: darkvision 60 ft., passive Perception 12
languages: Common, Orc
cr: "2"
traits:
  - name: Spellcasting
    desc: |-
      The orc is a 5th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). The orc has the following cleric spells prepared:

      **Cantrips (at will):** *guidance*, *mending*, *resistance*, *thaumaturgy*

      **1st level (4 slots):** *bane*, *cure wounds*, *guiding bolt*

      **2nd level (3 slots):** *augury*, *warding bond*

      **3rd level (2 slots):** *bestow curse*, *create food and water*
  - name: Aggressive
    desc: As a bonus action, the orc can move up to its speed toward a hostile creature that it can see.
actions:
  - name: Multiattack
    desc: The orc makes two claw attacks, or four claw attacks if it has fewer than half of its hit points remaining.
  - name: Claw
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 6 (1d8 + 2) slashing damage."
```
