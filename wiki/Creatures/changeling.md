---
title: Changeling
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
name: Changeling
size: Medium
type: humanoid
subtype: changeling, shapechanger
alignment: Any alignment
ac: 13
ac_class: leather armour
hp: 22
hit_dice: 4d8 + 4
modifier: 2
speed: 30 ft.
stats: [ 8, 15, 12, 14, 10, 16 ]
skillsaves:
  - acrobatics: 4
  - deception: 5
  - insight: 2
  - perception: 2
  - persuasion: 5
gear:
  - dagger
senses: passive Perception 12
languages: Common, Dwarvish, Elvish, Halfling, Thieves' cant
cr: 1/2
traits:
  - name: Change Appearance
    desc: The changeling can use its action to polymorph into a Medium humanoid it has seen, or back into its true form. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies.
actions:
  - name: Multiattack
    desc: The changeling makes two attacks with its dagger.
  - name: Dagger
    desc: "*Melee or Ranged Weapon Attack:* +4 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 4 (1d4 + 2) piercing damage."
  - name: Unsettling Visage (Recharges after a Short or Long Rest)
    desc: Each creature within 30 feet of the changeling must succeed on a DC 13 Wisdom saving throw or be frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
```
