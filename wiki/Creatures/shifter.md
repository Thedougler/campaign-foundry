---
title: Shifter
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Shifter
size: Medium
type: humanoid
subtype: shifter
alignment: Any alignment
ac: 14
ac_class: leather armour
hp: 19
hit_dice: 3d8 + 6
modifier: 3
speed: 30 ft.
stats: [ 12, 16, 14, 11, 15, 10 ]
skillsaves:
  - acrobatics: 5
  - insight: 4
  - nature: 2
  - perception: 4
gear:
  - shortsword
senses: darkvision 60 ft., passive Perception 14
languages: Common
cr: 1/2
traits:
  - name: Shifting (Recharges after a Short or Long Rest)
    desc: As a bonus action, the shifter takes on a more bestial form for 1 minute or until it dies. The shifter gains 5 temporary hit points. It can make a bite attack when it activates this trait and also as a bonus action on each of its turns while in its bestial form.
actions:
  - name: Shortsword
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage."
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one creature. *Hit:* 5 (1d4 + 3) piercing damage."
```
