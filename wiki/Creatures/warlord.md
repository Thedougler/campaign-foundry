---
title: Warlord
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Humanoid
size: Medium
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Warlord
size: Medium
type: humanoid
alignment: Any alignment
ac: 18
ac_class: plate
hp: 229
hit_dice: 27d8 + 108
modifier: 3
speed: 30 ft.
stats: [ 20, 16, 18, 12, 12, 18 ]
saves:
  - str: 9
  - dex: 7
  - con: 8
skillsaves:
  - athletics: 9
  - intimidation: 8
  - perception: 5
  - persuasion: 8
gear:
  - greatsword
  - shortbow
senses: passive Perception 15
languages: any two languages
cr: "12"
traits:
  - name: Indomitable (3/Day)
    desc: The warlord can reroll a saving throw it fails. It must use the new roll.
  - name: Survivor
    desc: The warlord regains 10 hit points at the start of its turn if it has fewer than half its hit points but at least 1 hit point.
actions:
  - name: Multiattack
    desc: The warlord makes two Greatsword or Short bow attacks.
  - name: Greatsword
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 12 (2d6 + 5) slashing damage."
  - name: Shortbow
    desc: "*Ranged Weapon Attack:* +7 to hit, range 80/320 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the warlord can expend a use to take one of the following actions. The warlord regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Command Ally
    desc: The warlord targets one ally it can see within 30 feet of it. If the target can see and hear the warlord, the target can make one weapon attack as a reaction and gains advantage on the attack roll.
  - name: Weapon Attack
    desc: The warlord makes one Greatsword or Shortbow attack.
  - name: Frighten Foe (Costs 2 Actions)
    desc: The warlord targets one creature it can see within 30 feet of it. If the target can see and hear it, the target must succeed on a DC 16 Wisdom saving throw or be frightened until the end of warlord's next turn.
```
