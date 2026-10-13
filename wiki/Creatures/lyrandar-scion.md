---
title: Lyrandar Scion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Lyrandar Scion
size: Small or Medium
type: humanoid
subtype: khoravar
alignment: Neutral
ac: 13
hp: 60
hit_dice: 11d8 + 11
modifier: 3
speed: 30 ft.
stats: [ 12, 16, 13, 12, 15, 18 ]
saves:
  - str: 3
  - dex: 5
skillsaves:
  - acrobatics: 5
  - perception: 4
damage_resistances: lightning, thunder
gear:
  - wand
senses: Darkvision 60 ft., passive Perception 14
languages: Common, Elvish
cr: "4"
actions:
  - name: Multiattack
    desc: The scion makes two Thunderbolt attacks and uses Spellcasting.
  - name: Thunderbolt
    desc: "*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 30 ft. *Hit:* 11 (2d6 + 4) Lightning damage plus 9 (2d8) Thunder damage. Critical *Hit:* The creature also has the Deafened condition for 1 minute."
  - name: Spellcasting
    desc: |-
      The scion casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 14):

      **At will:** *Elementalism*, *Gust of Wind*, *Thunderwave*
bonus_actions:
  - name: Jump (2/Day)
    desc: |
      The scion casts *Jump*, requiring no spell components and using the same spellcasting ability as Spellcasting.
reactions:
  - name: Feather Fall (2/Day)
    desc: |
      The scion casts *Feather Fall* in response to that spell's trigger, using the same spellcasting ability as Spellcasting.
```
