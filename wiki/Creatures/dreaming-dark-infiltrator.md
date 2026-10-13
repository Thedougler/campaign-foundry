---
title: Dreaming Dark Infiltrator
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dreaming Dark Infiltrator
size: Small or Medium
type: humanoid
alignment: Lawful Evil
ac: 15
hp: 104
hit_dice: 16d8 + 32
modifier: 3
speed: 30 ft.
stats: [ 14, 17, 15, 18, 16, 17 ]
saves:
  - int: 7
  - wis: 6
  - cha: 6
skillsaves:
  - deception: 6
  - insight: 6
  - stealth: 6
damage_resistances: psychic
gear:
  - chain shirt
senses: Truesight 30 ft., passive Perception 13
languages: Common, Quori; telepathy 120 ft.
cr: "7"
actions:
  - name: Multiattack
    desc: The infiltrator makes three Mind Blade attacks.
  - name: Mind Blade
    desc: "*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 30 ft. *Hit:* 14 (3d6 + 4) Psychic damage."
  - name: Spellcasting
    desc: |-
      The infiltrator casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 15):

      **3/day:** *Detect Thoughts*

      **1/day:** Synaptic Static
bonus_actions:
  - name: Mind Curse
    desc: "*Wisdom Saving Throw:* DC 15, one creature hit by the infiltrator's Mind Blade attack this turn. *Failure:* The target takes 14 (4d6) Psychic damage and is cursed. While cursed in this way, it has Disadvantage on attack rolls against the infiltrator, and the infiltrator always knows its location while it and the infiltrator are on the same plane of existence. A cursed creature repeats the save whenever it finishes a Short or Long Rest, ending the effect on itself on a success. *Success:* Half damage only."
```
