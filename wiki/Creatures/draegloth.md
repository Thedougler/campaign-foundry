---
title: Draegloth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Fiend
size: Large
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Draegloth
size: Large
type: fiend
subtype: demon
alignment: Typically Chaotic Evil
ac: 15
ac_class: natural armour
hp: 123
hit_dice: 13d10 + 52
modifier: 2
speed: 30 ft.
stats: [ 20, 15, 18, 13, 11, 11 ]
skillsaves:
  - perception: 3
  - stealth: 5
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 120 ft., passive Perception 13
languages: Abyssal, Elvish, Undercommon
cr: "7"
traits:
  - name: Fey Ancestry
    desc: The draegloth has advantage on saving throws against being charmed, and magic can't put it to sleep.
actions:
  - name: Multiattack
    desc: The draegloth makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one creature. *Hit:* 16 (2d10 + 5) piercing damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 16 (2d10 + 5) slashing damage."
  - name: Spellcasting
    desc: |-
      The draegloth casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 11):

      **At will:** *dancing lights*, *darkness*

      **1/day each:** *confusion*, *faerie fire*
```
