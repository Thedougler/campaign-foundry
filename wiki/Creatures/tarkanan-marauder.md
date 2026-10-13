---
title: Tarkanan Marauder
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
name: Tarkanan Marauder
size: Small or Medium
type: humanoid
alignment: Chaotic Evil
ac: 16
hp: 247
hit_dice: 26d8 + 130
modifier: 7
speed: 40 ft.
stats: [ 15, 17, 20, 16, 15, 13 ]
saves:
  - dex: 7
  - con: 9
  - wis: 6
skillsaves:
  - deception: 5
  - perception: 6
  - stealth: 7
gear:
  - breastplate
  - shortsword
senses: passive Perception 16
languages: Common, Thieves' cant
cr: "11"
traits:
  - name: Evasion
    desc: If the marauder is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the marauder instead takes no damage if it succeeds on the save and only half as much damage if it fails. It can't use this trait if it has the Incapacitated condition.
actions:
  - name: Multiattack
    desc: The marauder makes three Aberrant Strike attacks.
  - name: Aberrant Strike
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 13 (3d6 + 3) Piercing damage, plus 21 (6d6) Force damage if the marauder had Advantage on the attack roll."
  - name: Spellcasting
    desc: |-
      The marauder casts one of the following spells, requiring no Material components and using Constitution as the spellcasting ability (spell save DC 17):

      **At will:** *Message*

      **1/day:** *Disintegrate*
bonus_actions:
  - name: Tear Through Space
    desc: The marauder teleports to a space it can see within 30 feet, appearing in a dazzling flash. *Constitution Saving Throw:* DC 17, each creature in a 5-foot Emanation originating from the marauder when it appears. *Failure:* The target has the Blinded condition until the end of the marauder's next turn.
```
