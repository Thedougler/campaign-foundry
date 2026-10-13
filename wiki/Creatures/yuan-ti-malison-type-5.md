---
title: Yuan-ti Malison (Type 5)
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Medium
habitat:
  - Forest
  - Swamp
  - Desert
sourcebooks:
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Yuan-ti Malison (Type 5)
size: Medium
type: monstrosity
subtype: shapechanger, yuan-ti
alignment: Neutral Evil
ac: 12
hp: 66
hit_dice: 12d8 + 12
modifier: 2
speed: 30 ft.
stats: [ 16, 14, 13, 14, 12, 16 ]
skillsaves:
  - deception: 5
  - stealth: 4
damage_immunities: poison
condition_immunities: poisoned
gear:
  - longbow
  - scimitar
senses: darkvision 60 ft., passive Perception 11
languages: Abyssal, Common, Draconic
cr: "3"
traits:
  - name: Innate Spellcasting (Yuan-ti Form Only)
    desc: |-
      The yuan-ti's innate spellcasting ability is Charisma (spell save DC 13). The yuan-ti can innately cast the following spells, requiring no material components:

      **At will:** *animal friendship* (snakes only)

      **3/day:** *suggestion*
  - name: Shapechanger
    desc: The yuan-ti can use its action to polymorph into a Medium snake, or back into its true form. Its statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed. It doesn't change form if it dies.
  - name: Magic Resistance
    desc: The yuan-ti has advantage on saving throws against spells and other magical effects.
  - name: Malison Type
    desc: |-
      The yuan-ti has one of the following types:

      - **Type 4.** Human form with one or more serpentine tails  
      - **Type 5.** Human form covered in scales  
actions:
  - name: Multiattack (Yuan-ti Form Only)
    desc: The yuan-ti makes two ranged attacks or two melee attacks.
  - name: Bite (Snake Form Only)
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one creature. *Hit:* 5 (1d4 + 3) piercing damage plus 7 (2d6) poison damage."
  - name: Scimitar (Yuan-ti Form Only)
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) slashing damage."
  - name: Longbow (Yuan-ti Form Only)
    desc: "*Ranged Weapon Attack:* +4 to hit, range 150/600 ft., one target. *Hit:* 6 (1d8 + 2) piercing damage."
```
