---
title: Kraken Priest
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Monstrosity
size: Medium
habitat:
  - Coastal
  - Underwater
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Kraken Priest
size: Medium
type: monstrosity
alignment: Typically Chaotic Evil
ac: 15
ac_class: natural armour
hp: 75
hit_dice: 10d8 + 30
modifier: 0
speed: 30 ft., swim 30 ft.
stats: [ 12, 10, 16, 10, 15, 14 ]
skillsaves:
  - perception: 5
senses: passive Perception 15
languages: any two languages
cr: "5"
traits:
  - name: Amphibious
    desc: The priest can breathe air and water.
actions:
  - name: Multiattack
    desc: The priest makes two Thunderous Touch or Thunderbolt attacks.
  - name: Thunderous Touch
    desc: "*Melee Spell Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 27 (5d10) thunder damage."
  - name: Thunderbolt
    desc: "*Ranged Spell Attack:* +5 to hit, range 60 ft., one target. *Hit:* 11 (2d10) lightning damage plus 11 (2d10) thunder damage, and the target is knocked prone."
  - name: Voice of the Kraken (Recharges after a Short or Long Rest)
    desc: A kraken speaks through the priest with a thunderous voice audible within 300 feet. Creatures of the priest's choice that can hear the kraken's words (which are spoken in Abyssal, Infernal, or Primordial) must succeed on a DC 14 Wisdom saving throw or be frightened of the priest for 1 minute. A frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Spellcasting
    desc: |-
      The priest casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 13):

      **At will:** *command*, *create or destroy water*

      **3/day each:** *control water*, *darkness*, *water breathing*, *water walk*

      **1/day:** *Evard's black tentacles*
```
