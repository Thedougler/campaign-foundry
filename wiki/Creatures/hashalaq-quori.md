---
title: Hashalaq Quori
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hashalaq Quori
size: Medium
type: aberration
alignment: Lawful Evil
ac: 17
ac_class: natural armour
hp: 99
hit_dice: 18d8 + 18
modifier: 2
speed: 40 ft.
stats: [ 12, 14, 13, 18, 16, 18 ]
saves:
  - wis: 7
  - cha: 8
skillsaves:
  - arcana: 12
  - history: 12
  - insight: 11
  - persuasion: 8
damage_resistances: psychic
condition_immunities: charmed, frightened
senses: darkvision 60 ft., passive Perception 13
languages: Common, Quori
cr: "9"
traits:
  - name: Innate Spellcasting (Psionics)
    desc: |-
      The quori's spellcasting ability is Intelligence (spell save DC 16). It can innately cast the following spells, requiring no components:

      **At will:** *charm person*

      **3/day each:** *detect thoughts*, *disguise self*, *suggestion*

      **1/day:** *dominate person*, *dream*
actions:
  - name: Multiattack
    desc: The quori uses its Mind Thrust twice.
  - name: Idyllic Touch
    desc: "*Melee Spell Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 9 (1d10 + 4) force damage. If the target is a creature, it must succeed on a DC 16 Wisdom saving throw or fall prone in a fit of laughter."
  - name: Mind Thrust
    desc: The quori targets a creature it can see within 60 feet of it. The target must make a DC 16 Wisdom saving throw, taking 18 (4d8) psychic damage on a failed save, or half as much damage on a successful one.
  - name: Possession (Recharge 6)
    desc: |-
      One humanoid that the quori can see within 5 feet of it must succeed on a DC 16 Charisma saving throw or be possessed by the quori; the quori then disappears, and the target is incapacitated and loses control of its body. The quori now controls the body but doesn't deprive the target of awareness. The quori can't be targeted by any attack, spell, or other effect, and it retains its alignment, Intelligence, Wisdom, Charisma, and immunity to being charmed and frightened. It otherwise uses the possessed target's statistics, but doesn't gain access to the target's knowledge, class features, or proficiencies.

      The possession lasts until the body drops to 0 hit points, the quori ends it as a bonus action, or the quori is forced out by an effect like the *dispel evil and good* spell. When the possession ends, the quori reappears in an unoccupied space within 5 feet of the body. The target is immune to this quori's Possession for 24 hours after succeeding on the saving throw or after the possession ends.
reactions:
  - name: Empathic Feedback
    desc: When the quori takes damage from a creature it can see within 60 feet of it, the quori can force that creature to succeed on a DC 16 Intelligence saving throw or take 11 (2d10) psychic damage.
```
