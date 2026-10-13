---
title: Firefist
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Firefist
size: Medium
type: humanoid
subtype: any race
alignment: Lawful Good
ac: 18
ac_class: plate armour
hp: 117
hit_dice: 18d8 + 36
modifier: 0
speed: 30 ft.
stats: [ 16, 10, 14, 11, 17, 13 ]
saves:
  - con: 5
  - wis: 6
skillsaves:
  - intimidation: 4
  - religion: 3
gear:
  - greatsword
senses: passive Perception 13
languages: any one language (usually Common)
cr: "7"
traits:
  - name: Spellcasting
    desc: |-
      The firefist is a 9th-level Boros spellcaster. Its spellcasting ability is Wisdom (spell save DC 14, +6 to hit with spell attacks). It has the following cleric spells prepared:

      **Cantrips (at will):** *fire bolt*, *light*, *sacred flame*, *spare the dying*

      **1st level (4 slots):** *guiding bolt*, *healing word*, *heroism*, *shield of faith*

      **2nd level (3 slots):** *lesser restoration*, *scorching ray*

      **3rd level (3 slots):** blinding smite, crusader's mantle, *revivify*

      **4th level (3 slots):** *banishment*, *wall of fire*

      **5th level (1 slots):** *flame strike*
actions:
  - name: Multiattack
    desc: The firefist makes two greatsword attacks.
  - name: Greatsword
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) slashing damage."
reactions:
  - name: Guided Attack (Recharges after a Short or Long Rest)
    desc: When the firefist or one creature it can see within 30 feet of it makes an attack roll, the firefist grants a +10 bonus to that roll.
```
