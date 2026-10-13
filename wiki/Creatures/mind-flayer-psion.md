---
title: Mind Flayer Psion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Aberration
size: Medium
habitat:
  - Underdark
sourcebooks:
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mind Flayer Psion
size: Medium
type: aberration
alignment: Lawful Evil
ac: 15
ac_class: breastplate
hp: 71
hit_dice: 13d8 + 13
modifier: 1
speed: 30 ft.
stats: [ 11, 12, 12, 19, 17, 17 ]
saves:
  - int: 7
  - wis: 6
  - cha: 6
skillsaves:
  - arcana: 7
  - deception: 6
  - insight: 6
  - perception: 6
  - persuasion: 6
  - stealth: 4
senses: darkvision 120 ft., passive Perception 16
languages: Deep Speech, Undercommon, telepathy 120 ft.
cr: "8"
traits:
  - name: Innate Spellcasting (Psionics)
    desc: |-
      The mind flayer is a 10th-level spellcaster. Its innate spellcasting ability is Intelligence (spell save DC 15; +7 to hit with spell attacks). It can innately cast the following spells, requiring no components:

      **At will:** *guidance*, *mage hand*, *vicious mockery*, *true strike*, *detect thoughts*, *levitate*

      **1/day each:** *dominate monster*, *plane shift* (self only)

      **1st level (4 slots):** *charm person*, *command*, *comprehend languages*, *sanctuary*

      **2nd level (3 slots):** crown of madness, *phantasmal force*, *see invisibility*

      **3rd level (3 slots):** *clairvoyance*, *fear*, *meld into stone*

      **4th level (3 slots):** *confusion*, *stone shape*

      **5th level (2 slots):** *scrying*, *telekinesis*
  - name: Magic Resistance
    desc: The mind flayer has advantage on saving throws against spells and other magical effects.
actions:
  - name: Tentacles
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one creature. *Hit:* 15 (2d10 + 4) psychic damage. If the target is Medium or smaller, it is grappled (escape DC 15) and must succeed on a DC 15 Intelligence saving throw or be stunned until this grapple ends."
  - name: Extract Brain
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one incapacitated humanoid grappled by the mind flayer. *Hit:* The target takes 55 (10d10) piercing damage. If this damage reduces the target to 0 hit points, the mind flayer kills the target by extracting and devouring its brain."
  - name: Mind Blast (Recharge 5–6)
    desc: The mind flayer magically emits psychic energy in a 60-foot cone. Each creature in that area must succeed on a DC 15 Intelligence saving throw or take 22 (4d8 + 4) psychic damage and be stunned for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
```
