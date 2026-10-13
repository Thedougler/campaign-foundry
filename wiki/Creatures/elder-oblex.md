---
title: Elder Oblex
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Ooze
size: Huge
habitat:
  - Swamp
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Elder Oblex
size: Huge
type: ooze
alignment: Typically Lawful Evil
ac: 16
hp: 115
hit_dice: 10d12 + 50
modifier: 3
speed: 20 ft.
stats: [ 15, 16, 21, 22, 13, 18 ]
saves:
  - int: 10
  - cha: 8
skillsaves:
  - arcana: 10
  - deception: 8
  - history: 10
  - nature: 10
  - perception: 5
  - religion: 10
condition_immunities: blinded, charmed, deafened, exhaustion, prone
senses: blindsight 60 ft. (blind beyond this distance), passive Perception 15
languages: Common plus six more languages
cr: "10"
traits:
  - name: Amorphous
    desc: The oblex can move through a space as narrow as 1 inch wide without squeezing.
  - name: Aversion to Fire
    desc: If the oblex takes fire damage, it has disadvantage on attack rolls and ability checks until the end of its next turn.
  - name: Unusual Nature
    desc: The oblex doesn't require sleep.
actions:
  - name: Multiattack
    desc: The elder oblex makes two Pseudopod attacks, and it uses Eat Memories.
  - name: Pseudopod
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 17 (4d6 + 3) bludgeoning damage plus 14 (4d6) psychic damage."
  - name: Eat Memories
    desc: |-
      The oblex targets one creature it can see within 5 feet of it. The target must succeed on a DC 18 Wisdom saving throw or take 44 (8d10) psychic damage and become memory drained until it finishes a short or long rest or until it benefits from the *greater restoration* or *heal* spell. Constructs, Oozes, Plants, and Undead succeed on the save automatically.

      While memory drained, the target must roll a d4 and subtract the number rolled from any ability check or attack roll it makes. Each time the target is memory drained beyond the first, the die size increases by one: the d4 becomes a d6, the d6 becomes a d8, and so on until the die becomes a d20, at which point the target becomes unconscious for 1 hour. The effect then ends.

      The oblex learns all the languages a memory-drained target knows and gains all its skill proficiencies.
  - name: Spellcasting (Psionics)
    desc: |-
      The oblex casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 18):

      **At will:** *charm person* (as 5th-level spell), *detect thoughts*

      **3/day each:** *dimension door*, *dominate person*, *hypnotic pattern*, *telekinesis*
bonus_actions:
  - name: Sulphurous Impersonation
    desc: The oblex extrudes a piece of itself that assumes the appearance of one Medium or smaller creature whose memories it has stolen. This simulacrum appears, feels, and sounds exactly like the creature it impersonates, though it smells faintly of sulphur. The oblex can impersonate 2d6 + 1 different creatures, each one tethered to its body by a strand of slime that can extend up to 120 feet away. The simulacrum is an extension of the oblex, meaning that the oblex occupies its space and the simulacrum's space simultaneously. The tether is immune to damage, but it is severed if there is no opening at least 1 inch wide between the oblex and the simulacrum. The simulacrum disappears if the tether is severed.
```
