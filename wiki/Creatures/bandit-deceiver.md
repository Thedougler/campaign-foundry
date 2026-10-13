---
title: Bandit Deceiver
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
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
name: Bandit Deceiver
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 16
hp: 130
hit_dice: 20d8 + 40
modifier: 6
speed: 30 ft.
stats: [ 8, 16, 14, 17, 12, 16 ]
saves:
  - dex: 6
  - int: 6
skillsaves:
  - acrobatics: 6
  - perception: 4
  - stealth: 9
gear:
  - six daggers
  - wand
senses: passive Perception 14
languages: Common, Thieves' cant
cr: "7"
actions:
  - name: Multiattack
    desc: The bandit makes three Dagger attacks.
  - name: Dagger
    desc: "*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 20/60 ft. *Hit:* 8 (2d4 + 3) Piercing damage plus 10 (3d6) Poison damage."
  - name: Blinding Flash (Recharge 4–6)
    desc: "*Constitution Saving Throw:* DC 14, each creature in a 10-foot-radius Sphere centred on a point the bandit can see within 120 feet. *Failure:* 13 (3d6 + 3) Radiant damage, and the target has the Blinded condition until the start of the bandit's next turn. *Success:* Half damage only."
  - name: Spellcasting
    desc: |-
      The bandit casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

      **At will:** *Disguise Self*, *Mage Hand*, *Minor Illusion*

      **1/day each:** *Hold Person* (level 4 version), *Mage Armour* (included in AC), *Major Image*
```
