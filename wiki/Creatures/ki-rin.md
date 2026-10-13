---
title: Ki-rin
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Celestial
size: Large
habitat:
  - Coastal
  - Desert
  - Grassland
  - Mountain
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ki-rin
size: Large
type: celestial
alignment: Typically Lawful Good
ac: 20
ac_class: natural armour
hp: 153
hit_dice: 18d10 + 54
modifier: 3
speed: 60 ft., fly 120 ft. (hover)
stats: [ 21, 16, 16, 19, 20, 20 ]
skillsaves:
  - perception: 9
  - insight: 9
  - religion: 8
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 120 ft., truesight 30 ft., passive Perception 19
languages: all, telepathy 120 ft.
cr: "12"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the ki-rin fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The ki-rin has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The ki-rin makes two Hoof attacks and one Horn attack, or it makes two Sacred Fire attacks.
  - name: Hoof
    desc: "*Melee Weapon Attack:* +9 to hit, reach 15 ft., one target. *Hit:* 10 (2d4 + 5) force damage."
  - name: Horn
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 14 (2d8 + 5) radiant damage."
  - name: Sacred Fire
    desc: "*Ranged Spell Attack:* +9 to hit, range 120 ft., one target. *Hit:* 18 (3d8 + 5) radiant damage."
  - name: Spellcasting
    desc: |-
      The ki-rin casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 17):

      **At will:** *light*, *major image* (6th-level version), *thaumaturgy*

      **3/day each:** *cure wounds*, *dispel magic*, *lesser restoration*, *sending*

      **1/day each:** *banishment*, *calm emotions*, *create food and water*, *greater restoration*, *plane shift*, *protection from evil and good*, *revivify*, *wind walk*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the ki-rin can expend a use to take one of the following actions. The ki-rin regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Move
    desc: The ki-rin moves up to half its speed without provoking opportunity attacks.
  - name: Smite
    desc: The ki-rin makes one Hoof, Horn, or Sacred Fire attack.
```
