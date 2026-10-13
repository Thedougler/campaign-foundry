---
title: Faerie Dragon Youth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Dragon
size: Tiny
habitat:
  - Forest
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Faerie Dragon Youth
size: Tiny
type: dragon
alignment: Chaotic Good
ac: 13
hp: 21
hit_dice: 6d4 + 6
modifier: 3
speed: 10 ft., fly 60 ft.
stats: [ 3, 16, 12, 12, 12, 14 ]
skillsaves:
  - arcana: 3
  - perception: 3
  - stealth: 5
senses: Darkvision 60 ft., passive Perception 13
languages: Draconic, Sylvan; telepathy 60 ft. (faerie dragons only)
cr: "1"
traits:
  - name: Magic Resistance
    desc: The dragon has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Bite
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 5 (1d4 + 3) Piercing damage plus 2 (1d4) Psychic damage."
  - name: Euphoria Breath (Recharge 5–6)
    desc: "*Wisdom Saving Throw:* DC 12, each creature in a 15-foot Cone. *Failure:* The target has the Incapacitated condition until the end of its next turn and uses all its movement on its turn to move in a random direction."
  - name: Spellcasting
    desc: |-
      The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 12):

      **At will:** *Dancing Lights*, *Mage Hand*, *Minor Illusion*
bonus_actions:
  - name: Superior Invisibility
    desc: |
      The dragon casts *Greater Invisibility* on itself, requiring no spell components and using the same spellcasting ability as Spellcasting.
```
