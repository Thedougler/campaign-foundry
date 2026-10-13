---
title: Spellcaster
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - ESK
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Spellcaster
size: Medium
type: humanoid
alignment: Unaligned
ac: 12
ac_class: leather armour
hp: 9
hit_dice: 2d8
modifier: 1
speed: 30 ft.
stats: [ 10, 12, 10, 15, 14, 13 ]
saves:
  - wis: 4
skillsaves:
  - arcana: 4
  - investigation: 4
  - religion: 4
gear:
  - quarterstaff
senses: passive Perception 12
languages: Common, plus one of your choice
traits:
  - name: Spellcasting (Mage)
    desc: |-
      The spellcaster's spellcasting ability is Intelligence (spell save DC 12, +4 to hit with spell attacks). The spellcaster has following wizard spells prepared:

      **Cantrips (at will):** *fire bolt*, *light*

      **1st level (2 slots):** *sleep*
  - name: Spellcasting (Healer)
    desc: |-
      The spellcaster's spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). The spellcaster has following cleric spells prepared:

      **Cantrips (at will):** *guidance*, *sacred flame*

      **1st level (2 slots):** *cure wounds*
  - name: Magical Role
    desc: "Choose a role for the spellcaster: healer or mage. Your choice determines which Spellcasting trait to use below."
actions:
  - name: Quarterstaff
    desc: "*Melee Weapon Attack:* +2 to hit, reach 5 ft., one target. *Hit:* 3 (1d6) bludgeoning damage, or 4 (1d8) bludgeoning damage if used with two hands."
```
