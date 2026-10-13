---
title: Reckoner
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Reckoner
size: Medium
type: humanoid
subtype: any race
alignment: Lawful Neutral
ac: 18
ac_class: plate armour
hp: 52
hit_dice: 8d8 + 16
modifier: 1
speed: 30 ft.
stats: [ 16, 12, 15, 15, 12, 10 ]
skillsaves:
  - arcana: 4
  - intimidation: 2
  - perception: 3
gear:
  - longsword
senses: passive Perception 13
languages: Common plus any one language
cr: "4"
traits:
  - name: Spellcasting
    desc: |-
      The reckoner is a 5th-level Boros spellcaster. Its spellcasting ability is Intelligence (spell save DC 12, +4 to hit with spell attacks). The reckoner has the following wizard spells prepared:

      **Cantrips (at will):** blade ward, *light*, *message*, *shocking grasp*

      **1st level (4 slots):** *guiding bolt*, *shield*, *thunderwave*, witch bolt

      **2nd level (3 slots):** *blur*, *levitate*

      **3rd level (2 slots):** *lightning bolt*
  - name: First Strike
    desc: The reckoner has advantage on initiative rolls.
actions:
  - name: Longsword
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands."
reactions:
  - name: Lightning Backlash (Recharge 5–6)
    desc: When a creature hits the reckoner with an attack, the attacker takes lightning damage equal to half the damage dealt by the attack.
```
