---
title: Umbragen Shadow Walker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Umbragen Shadow Walker
size: Medium
type: humanoid
subtype: elf
alignment: Neutral
ac: 14
hp: 162
hit_dice: 25d8 + 50
modifier: 4
speed: 30 ft.
stats: [ 12, 19, 14, 13, 15, 20 ]
saves:
  - dex: 8
  - wis: 6
skillsaves:
  - arcana: 5
  - perception: 6
  - stealth: 8
damage_vulnerabilities: radiant
senses: Darkvision 120 ft., passive Perception 16
languages: Common, Elvish, Undercommon
cr: "9"
traits:
  - name: Fey Ancestry
    desc: Magic can't put the shadow walker to sleep.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the shadow walker has Disadvantage on ability checks and attack rolls.
actions:
  - name: Multiattack
    desc: The shadow walker makes three Gloom Burst attacks and uses Shadow Cowl.
  - name: Gloom Burst
    desc: "*Melee or Ranged Attack Roll:* +9, reach 5 ft. or range 120 ft. *Hit:* 14 (2d8 + 5) Psychic damage."
  - name: Shadow Cowl
    desc: "*Wisdom Saving Throw:* DC 17, one creature the shadow walker can see within 120 feet. *Failure:* 14 (4d6) Necrotic damage, and the target has the Blinded condition until the start of the shadow walker's next turn."
  - name: Spellcasting
    desc: |-
      The shadow walker casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):

      **At will:** *Dancing Lights*, *Darkness*, *Minor Illusion*
```
