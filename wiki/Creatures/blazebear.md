---
title: Blazebear
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Monstrosity
size: Large
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Blazebear
size: Large
type: monstrosity
alignment: Unaligned
ac: 14
ac_class: natural armour
hp: 189
hit_dice: 18d10 + 90
modifier: 3
speed: 30 ft.
stats: [ 24, 17, 21, 3, 13, 16 ]
saves:
  - str: 11
  - cha: 7
skillsaves:
  - perception: 5
senses: darkvision 120 ft., passive Perception 15
cr: "12"
traits:
  - name: Magic Resistance
    desc: The blazebear has advantage on saving throws against spells and other magical effects.
  - name: Mist Sight
    desc: The blazebear can see normally through heavily obscured areas created by mist or fog, including areas created by spells such as Fog Cloud.
actions:
  - name: Multiattack
    desc: The blazebear makes two Bite attacks. It can replace one attack with Stunning Gaze if available.
  - name: Bite
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 20 (2d12 + 7) piercing damage plus 11 (2d10) force damage."
  - name: Stunning Gaze (Recharge 5–6)
    desc: The blazebear targets two creatures it can see within 120 feet of itself. Each target must succeed on a DC 15 Wisdom saving throw or have the stunned condition until the start of the blazebear's next turn.
reactions:
  - name: Antimagic Swipe
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one creature casting a spell of 3rd level or lower. *Hit:* 22 (4d10) force damage, and the target must succeed on a DC 15 Intelligence saving throw or the spell fails and has no effect."
```
