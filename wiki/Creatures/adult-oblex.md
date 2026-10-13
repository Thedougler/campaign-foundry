---
title: Adult Oblex
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Ooze
size: Medium
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
name: Adult Oblex
size: Medium
type: ooze
alignment: Typically Lawful Evil
ac: 14
hp: 75
hit_dice: 10d8 + 30
modifier: 4
speed: 20 ft.
stats: [ 8, 19, 16, 19, 12, 15 ]
saves:
  - int: 7
  - cha: 5
skillsaves:
  - deception: 5
  - perception: 4
  - desc: |-
      

      One of Arcana +7, History +7, Nature +7, or Religion +7
condition_immunities: blinded, charmed, deafened, exhaustion, prone
senses: blindsight 60 ft. (blind beyond this distance), passive Perception 14
languages: Common plus two more languages
cr: "5"
traits:
  - name: Amorphous
    desc: The oblex can move through a space as narrow as 1 inch wide without squeezing.
  - name: Aversion to Fire
    desc: If the oblex takes fire damage, it has disadvantage on attack rolls and ability checks until the end of its next turn.
  - name: Unusual Nature
    desc: The oblex doesn't require sleep.
actions:
  - name: Multiattack
    desc: The oblex makes two pseudopod attacks, and it uses Eat Memories.
  - name: Pseudopod
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) bludgeoning damage plus 7 (2d6) psychic damage."
  - name: Eat Memories
    desc: |-
      The oblex targets one creature it can see within 5 feet of it. The target must succeed on a DC 15 Wisdom saving throw or take 18 (4d8) psychic damage and become memory drained until it finishes a short or long rest or until it benefits from the *greater restoration* or *heal* spell. Constructs, Oozes, Plants, and Undead succeed on the save automatically.

      While memory drained, the target must roll a d4 and subtract the number rolled from its ability checks and attack rolls. Each time the target is memory drained beyond the first, the die size increases by one: the d4 becomes a d6, the d6 becomes a d8, and so on until the die becomes a d20, at which point the target becomes unconscious for 1 hour. The effect then ends.

      The oblex learns all the languages a memory-drained target knows and gains all its skill proficiencies.
  - name: Spellcasting (Psionics)
    desc: |-
      The oblex casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 15):

      **3/day each:** *charm person* (as 5th-level spell), *detect thoughts*, *hypnotic pattern*
bonus_actions:
  - name: Sulphurous Impersonation
    desc: The oblex extrudes a piece of itself that assumes the appearance of one Medium or smaller creature whose memories it has stolen. This simulacrum appears, feels, and sounds exactly like the creature it impersonates, though it smells faintly of sulphur. The oblex can impersonate 1d4 + 1 different creatures, each one tethered to its body by a strand of slime that can extend up to 120 feet away. The simulacrum is an extension of the oblex, meaning that the oblex occupies its space and the simulacrum's space simultaneously. The tether is immune to damage, but it is severed if there is no opening at least 1 inch wide between the oblex and the simulacrum. The simulacrum disappears if the tether is severed.
```
