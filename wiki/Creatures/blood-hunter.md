---
title: Blood Hunter
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Blood Hunter
size: Medium
type: humanoid
subtype: any race
alignment: Any alignment
ac: 16
ac_class: half plate
hp: 65
hit_dice: 10d8 + 20
modifier: 1
speed: 30 ft.
stats: [ 18, 12, 15, 9, 16, 11 ]
saves:
  - str: 7
  - wis: 6
skillsaves:
  - acrobatics: 4
  - insight: 6
  - perception: 6
gear:
  - greatsword
  - heavy crossbow
senses: darkvision 60 ft., passive Perception 16
languages: any one language (usually Common)
cr: "5"
traits:
  - name: Innate Spellcasting (1/Day)
    desc: |
      The blood hunter can innately cast *hex*. Its innate spellcasting ability is Intelligence.
  - name: Blood Curse of Binding (1/Day)
    desc: As a bonus action, the blood hunter targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Strength saving throw or have its speed reduced to 0 and be unable to take reactions. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Blood Frenzy
    desc: The blood hunter has advantage on melee attack rolls against any creature that doesn't have all its hit points.
  - name: Magic Resistance
    desc: The blood hunter has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The blood hunter attacks twice with a weapon.
  - name: Greatsword
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) slashing damage plus 3 (1d6) fire damage."
  - name: Heavy Crossbow
    desc: "*Ranged Weapon Attack:* +4 to hit, range 100/400 ft., one target. *Hit:* 6 (1d10 + 1) piercing damage."
```
