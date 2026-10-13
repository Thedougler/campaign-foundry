---
title: Mist Wanderer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mist Wanderer
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 13
hp: 52
hit_dice: 8d8 + 16
modifier: 2
speed: 30 ft.
stats: [ 10, 14, 14, 12, 16, 13 ]
skillsaves:
  - arcana: 3
  - insight: 5
  - medicine: 5
gear:
  - orb
  - leather armour
senses: passive Perception 13
languages: Common plus one other language
cr: "3"
traits:
  - name: Death Curse
    desc: "*Charisma Saving Throw:* DC 13, each creature in a 5-foot Emanation originating from the wanderer when it dies. *Failure:* The target is cursed. While cursed, the target has the Blinded and Deafened conditions."
  - name: Mist Walker
    desc: The wanderer can travel safely through the Mists to reach a specific domain it knows by name. The wanderer still can't bypass domain borders closed by a Darklord's will.
actions:
  - name: Multiattack
    desc: The wanderer makes two Radiant Burst attacks. It can replace one attack with a use of Spellcasting to cast *Mind Spike* if available.
  - name: Radiant Burst
    desc: "*Melee or Ranged Attack Roll:* +5, reach 5 ft. or range 60 ft. *Hit:* 14 (2d10 + 3) Radiant damage."
  - name: Spellcasting
    desc: |-
      The wanderer casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

      **At will:** *Light*, *Mage Hand*

      **1/day each:** *Augury*, *Detect Magic*, *Mind Spike*
bonus_actions:
  - name: Evil Eye (1/Day)
    desc: |
      The wanderer casts *Hold Person*, using the same spellcasting ability as Spellcasting.
```
