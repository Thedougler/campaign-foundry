---
title: Dreaming Dark Mindkiller
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dreaming Dark Mindkiller
size: Small or Medium
type: humanoid
alignment: Lawful Evil
ac: 19
hp: 180
hit_dice: 24d8 + 72
modifier: 4
speed: 30 ft.
stats: [ 15, 19, 16, 21, 18, 17 ]
saves:
  - dex: 8
  - int: 9
  - wis: 8
  - cha: 7
skillsaves:
  - deception: 7
  - insight: 8
  - perception: 8
  - stealth: 8
damage_resistances: psychic
condition_immunities: charmed, frightened
senses: Truesight 30 ft., passive Perception 18
languages: Common, Quori; telepathy 120 ft.
cr: "11"
actions:
  - name: Multiattack
    desc: The mindkiller makes two Nightmare Whisper attacks.
  - name: Nightmare Whisper
    desc: "*Melee or Ranged Attack Roll:* +9, reach 5 ft. or range 30 ft. *Hit:* 27 (5d8 + 5) Psychic damage, and the target has the Frightened condition until the start of the mindkiller's next turn. If the target is already Frightened, it instead takes an extra 10 (3d6) Psychic damage."
  - name: Primal Fear (1/Day)
    desc: "*Wisdom Saving Throw:* DC 17, each creature in a 30-foot-radius Sphere centred on a point the mindkiller can see within 120 feet. *Failure:* 35 (10d6) Psychic damage, and the target has the Frightened condition until the start of the mindkiller's next turn. While Frightened in this way, the target can do only one of the following on each of its turns: move, take an action, or take a Bonus Action. *Success:* Half damage only."
bonus_actions:
  - name: Slayer's Puppet (1/Day)
    desc: |
      The mindkiller casts *Dominate Person*, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 17).
```
