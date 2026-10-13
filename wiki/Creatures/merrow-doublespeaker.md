---
title: Merrow Doublespeaker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Monstrosity
size: Medium
habitat:
  - Planar (Feywild)
sourcebooks:
  - "Lorwyn: First Light"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Merrow Doublespeaker
size: Medium
type: monstrosity
alignment: Lawful Evil
ac: 14
hp: 67
hit_dice: 9d8 + 27
modifier: 3
speed: 20 ft., swim 40 ft.
stats: [ 18, 17, 16, 12, 13, 16 ]
saves:
  - dex: 5
  - cha: 5
skillsaves:
  - deception: 5
  - stealth: 5
senses: Darkvision 120 ft., passive Perception 11
languages: Common, Primordial (Aquan)
cr: "4"
traits:
  - name: Amphibious
    desc: The merrow can breathe air and water.
  - name: Mimicry
    desc: The merrow can mimic voices and animal sounds. A creature that hears the mimicries can tell they are imitations with a successful DC 15 Wisdom (Insight) check.
actions:
  - name: Multiattack
    desc: The merrow makes three Spined Tail attacks. It can replace one of these attacks with a use of Spellcasting to cast *Command*.
  - name: Spined Tail
    desc: "*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 20/60 ft. *Hit:* 14 (3d6 + 4) Piercing damage."
  - name: Spellcasting
    desc: |-
      The merrow casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 13):

      **At will:** *Command*, *Mage Hand*, *Minor Illusion*
```
