---
title: Elemental Cultist
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Elemental Cultist
size: Small or Medium
type: humanoid
alignment: Chaotic Evil
ac: 16
hp: 135
hit_dice: 18d8 + 54
modifier: 4
speed: 30 ft.
stats: [ 18, 12, 16, 14, 18, 12 ]
saves:
  - con: 6
  - wis: 7
skillsaves:
  - arcana: 5
  - perception: 7
  - religion: 5
gear:
  - chain mail
senses: passive Perception 17
languages: Common, Primordial
cr: "8"
actions:
  - name: Multiattack
    desc: The cultist makes three attacks, using Elemental Flail or Elemental Claw in any combination.
  - name: Elemental Flail
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 25 (6d6 + 4) damage of a type chosen by the cultist: Acid, Cold, Fire, Lightning, or Thunder."
  - name: Elemental Claw
    desc: "*Ranged Attack Roll:* +7, range 120 ft. *Hit:* 22 (4d10) damage of a type chosen by the cultist: Acid, Cold, Fire, Lightning, or Thunder. If the target is a Medium or smaller creature, the cultist moves the target up to 10 feet straight toward or away from itself."
  - name: Spellcasting
    desc: |-
      The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 15):

      **At will:** *Elementalism*, *Mage Hand*
reactions:
  - name: Elemental Absorption (1/Day)
    desc: "Trigger: The cultist takes Acid, Cold, Fire, Lightning, or Thunder damage. _Response:_ The cultist gives itself Resistance to that instance of damage and gains 10 Temporary Hit Points."
```
