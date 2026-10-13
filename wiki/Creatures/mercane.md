---
title: Mercane
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Celestial
size: Large
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mercane
size: Large
type: celestial
alignment: typically Lawful Neutral
ac: 13
ac_class: "*mage armour*"
hp: 75
hit_dice: 10d10 + 20
modifier: 0
speed: 30 ft.
stats: [ 16, 10, 15, 18, 16, 15 ]
saves:
  - int: 7
  - wis: 6
  - cha: 5
skillsaves:
  - insight: 9
  - perception: 6
  - persuasion: 5
senses: passive Perception 16
languages: Common, Giant, telepathy 60 ft. (see also Mercane telepathy)
cr: "5"
traits:
  - name: Mercane Telepathy
    desc: The mercane can communicate telepathically with any other mercane it knows, regardless of the distance between them.
actions:
  - name: Multiattack
    desc: The mercane makes three Psi-Imbued Blade attacks.
  - name: Psi-Imbued Blade
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) slashing damage, and if the target is a creature, it must succeed on a DC 15 Wisdom saving throw or be frightened of the mercane until the end of the target's next turn."
  - name: Spellcasting (Psionics)
    desc: |-
      The mercane casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 15):

      **At will:** *detect magic*, *light*

      **1/day each:** *dimension door*, *invisibility*, *mage armour* (self only)
```
