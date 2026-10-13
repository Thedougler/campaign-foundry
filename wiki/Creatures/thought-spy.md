---
title: Thought Spy
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Thought Spy
size: Medium
type: humanoid
subtype: any race
alignment: Neutral Evil
ac: 13
ac_class: leather armour
hp: 27
hit_dice: 6d8
modifier: 2
speed: 30 ft.
stats: [ 11, 14, 10, 16, 13, 14 ]
skillsaves:
  - deception: 6
  - insight: 3
  - investigation: 5
  - perception: 3
  - sleight of hand: 4
  - stealth: 4
gear:
  - dagger
  - rapier
senses: darkvision 30 ft., passive Perception 13
languages: Common plus any one language
cr: "1"
traits:
  - name: Innate Spellcasting (Psionics)
    desc: |-
      The thought spy's innate spellcasting ability is Intelligence (spell save DC 13). The thought spy can innately cast the following spells, requiring no components:

      **At will:** *charm person*, *disguise self*, encode thoughts (see chapter 2)

      **1/day each:** *blur*, *detect thoughts*, *gaseous form*
  - name: Cunning Action
    desc: On each of its turns, the thought spy can use a bonus action to take the Dash, Disengage, or Hide action.
actions:
  - name: Multiattack
    desc: The thought spy makes two melee attacks, or it makes three ranged attacks with its daggers.
  - name: Dagger
    desc: "*Melee or Ranged Weapon Attack:* +4 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 4 (1d4 + 2) piercing damage."
  - name: Rapier
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 6 (1d8 + 2) piercing damage."
```
