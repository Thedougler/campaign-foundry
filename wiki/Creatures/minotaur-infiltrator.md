---
title: Minotaur Infiltrator
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Minotaur Infiltrator
size: Medium
type: humanoid
alignment: typically Chaotic Evil
ac: 13
ac_class: natural armour
hp: 52
hit_dice: 8d8 + 16
modifier: 0
speed: 40 ft.
stats: [ 18, 11, 14, 8, 16, 10 ]
skillsaves:
  - deception: 2
  - perception: 7
  - religion: 1
senses: darkvision 60 ft., passive Perception 17
languages: Abyssal, Common
cr: "2"
traits:
  - name: Labyrinthine Recall
    desc: The minotaur can perfectly recall any path it has travelled.
actions:
  - name: Gore
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) piercing damage, or 13 (2d8 + 4) piercing damage while enlarged. If the minotaur moved at least 10 feet straight toward the target immediately before it hit, the target takes an extra 4 (1d8) piercing damage, or 9 (2d8) piercing damage if the minotaur is enlarged. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be pushed up to 10 feet from the minotaur and have the prone condition."
  - name: Mattock
    desc: "*Melee Weapon Attack:* +6 to hit, reach 10 ft., one target. *Hit:* 10 (1d12 + 4) bludgeoning damage, or 17 (2d12 + 4) bludgeoning damage while enlarged. If the target is a creature and the minotaur is enlarged, the target must succeed on a DC 14 Strength saving throw or have the prone condition."
  - name: Enlarge (Recharges after a Short or Long Rest)
    desc: For 1 minute, the minotaur magically increases in size, along with anything it is wearing or carrying. While enlarged, the minotaur is Large, doubles its damage dice on Strength-based weapon attacks (included in the attacks), and makes Strength checks and Strength saving throws with advantage. If the minotaur lacks the room to become Large, the minotaur doesn't change size.
bonus_actions:
  - name: Unerring Tracker
    desc: The minotaur magically creates a psychic link with one creature it can see. For the next hour, the minotaur knows the current distance and direction to the target if it is on the same plane of existence. The link ends if the minotaur has the incapacitated condition or uses this ability on a different target.
```
