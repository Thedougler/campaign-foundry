---
title: Iron Defender
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Construct
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Iron Defender
size: Medium
type: construct
alignment: Neutral
ac: 17
ac_class: natural armour
hp: 30
hit_dice: 4d8 + 12
modifier: 2
speed: 40 ft.
stats: [ 16, 14, 16, 8, 11, 7 ]
skillsaves:
  - perception: 4
  - stealth: 4
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: darkvision 60 ft., passive Perception 13
languages: understands the languages of its creator but can't speak
cr: "1"
traits:
  - name: Keen Senses
    desc: The defender has advantage on Wisdom (Perception) checks.
  - name: Telepathic Bond
    desc: While the defender is on the same plane of existence as its master, it can magically convey what it senses to its master, and the two can communicate telepathically.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or take an extra 3 (1d6) piercing damage and be grappled (escape DC 13). The defender can have only one creature grappled in this way at a time."
```
