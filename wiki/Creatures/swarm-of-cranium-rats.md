---
title: Swarm of Cranium Rats
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Aberration
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Swarm of Cranium Rats
size: Medium
type: aberration
alignment: Typically Lawful Evil
ac: 12
hp: 76
hit_dice: 17d8
modifier: 2
speed: 30 ft.
stats: [ 9, 14, 10, 15, 11, 14 ]
damage_resistances: bludgeoning, piercing, slashing
condition_immunities: charmed, frightened, grappled, paralysed, petrified, prone, restrained, stunned
senses: darkvision 30 ft., passive Perception 10
languages: telepathy 30 ft.
cr: "5"
traits:
  - name: Swarm
    desc: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny rat. The swarm can't regain hit points or gain temporary hit points.
  - name: Telepathic Shroud
    desc: The swarm is immune to any effect that would sense its emotions or read its thoughts, as well as to all divination spells.
actions:
  - name: Bites
    desc: "*Melee Weapon Attack:* +5 to hit, reach 0 ft., one target in the swarm's space. *Hit:* 14 (4d6) piercing damage, or 7 (2d6) piercing damage if the swarm has half of its hit points or fewer, plus 22 (5d8) psychic damage."
  - name: Spellcasting (Psionics)
    desc: |-
      As long as it has more than half of its hit points remaining, the swarm casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 13):

      **At will:** *command*, *comprehend languages*, *detect thoughts*

      **1/day each:** *confusion*, *dominate monster*
bonus_actions:
  - name: Illumination
    desc: The swarm sheds dim light from its brains in a 5-foot radius, increases the illumination to bright light in a 5- to 20-foot radius (and dim light for an additional number of feet equal to the chosen radius), or extinguishes the light.
```
