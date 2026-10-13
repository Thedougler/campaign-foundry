---
title: Broken King Antigonos
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Large
habitat: []
sourcebooks:
  - Mythic Odysseys of Theros
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Broken King Antigonos
size: Large
type: monstrosity
alignment: Chaotic Evil
ac: 14
ac_class: natural armour
hp: 38
hit_dice: 9d10 + 27
modifier: 0
speed: 40 ft.
stats: [ 18, 11, 16, 6, 16, 9 ]
skillsaves:
  - perception: 7
gear:
  - greataxe
senses: darkvision 60 ft., passive Perception 17
languages: Abyssal
cr: "3"
traits:
  - name: Charge
    desc: If Antigonos moves at least 10 feet straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d8) piercing damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be pushed up to 10 feet away and knocked prone.
  - name: Labyrinthine Recall
    desc: Antigonos can perfectly recall any path he has travelled.
  - name: Reckless
    desc: At the start of his turn, Antigonos can gain advantage on all melee weapon attack rolls he makes during that turn, but attack rolls against him have advantage until the start of his next turn.
  - name: Decrepit State
    desc: Antigonos has disadvantage on his attack rolls.
actions:
  - name: Greataxe
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 17 (2d12 + 4) slashing damage."
  - name: Gore
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 13 (2d8 + 4) piercing damage."
  - name: Amphora
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one Medium or smaller creature. *Hit:* 8 (1d8 + 4) bludgeoning damage. If there is not already a creature inside the amphora, the target is restrained inside. As an action, the restrained creature can make a DC 14 Dexterity (Acrobatics) check, escaping from the amphora on a success. The effect also ends if the amphora is destroyed. The amphora has AC 8, 20 hit points, and immunity to poison and psychic damage."
```
