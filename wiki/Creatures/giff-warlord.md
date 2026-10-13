---
title: Giff Warlord
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Giff Warlord
size: Medium
type: humanoid
alignment: Any alignment
ac: 17
ac_class: half plate
hp: 178
hit_dice: 21d8 + 84
modifier: 2
speed: 30 ft., swim 30 ft.
stats: [ 22, 15, 18, 14, 14, 18 ]
saves:
  - str: 10
  - dex: 6
  - con: 8
  - wis: 6
skillsaves:
  - athletics: 10
  - insight: 6
  - intimidation: 12
gear:
  - morningstar
senses: passive Perception 12
languages: Common
cr: "10"
traits:
  - name: Firearms Knowledge
    desc: The giff's mastery of its weapons enables it to ignore the loading property of any firearm.
  - name: Legendary Resistance (2/Day)
    desc: If the giff fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The giff makes two Morningstar attacks.
  - name: Morningstar
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 14 (2d8 + 5) piercing damage."
  - name: Double-Barreled Musket
    desc: "*Ranged Weapon Attack:* +6 to hit, range 40/120 ft., one target. *Hit:* 28 (4d12 + 2) piercing damage."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the giff warlord can expend a use to take one of the following actions. The giff warlord regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Move
    desc: The giff moves up to its speed without provoking opportunity attacks.
  - name: Rallying Cry
    desc: The giff ends the frightened condition on itself and each creature of its choice that it can see within 30 feet of it.
  - name: Weapon of Choice (2 Actions)
    desc: The giff makes two Morningstar attacks or one Double-Barreled Musket attack.
```
