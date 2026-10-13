---
title: Society of Sensation Muse
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Society of Sensation Muse
size: Small or Medium
type: humanoid
alignment: Any alignment
ac: 14
ac_class: leather armour
hp: 44
hit_dice: 8d8 + 8
modifier: 3
speed: 30 ft.
stats: [ 8, 16, 12, 15, 14, 17 ]
saves:
  - dex: 5
  - cha: 5
skillsaves:
  - insight: 4
  - perception: 4
  - performance: 7
  - stealth: 5
senses: passive Perception 14
languages: Common plus two more languages
cr: "3"
actions:
  - name: Multiattack
    desc: The muse makes two Beguiling Resonance attacks.
  - name: Beguiling Resonance
    desc: "*Melee or Ranged Spell Attack:* +5 to hit, reach 5 ft. or range 90 ft., one target. *Hit:* 9 (2d8) psychic damage. If the target is a creature, it must succeed on a DC 13 Charisma saving throw or have disadvantage on the next attack roll it makes until the end of its next turn."
  - name: Spellcasting
    desc: |-
      The muse casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 13):

      **At will:** *dancing lights*

      **1/day each:** *comprehend languages*, *hypnotic pattern*
bonus_actions:
  - name: Enchanting Presence
    desc: |-
      Each creature within 30 feet of the muse must make a DC 13 Wisdom saving throw. On a failed save, the creature has the charmed condition for 1 minute. On a successful save, the creature becomes immune to any muse's Enchanting Presence for 24 hours.

      Whenever the muse deals damage to the charmed creature, the charmed creature can repeat the saving throw, ending the effect on itself on a success.
```
