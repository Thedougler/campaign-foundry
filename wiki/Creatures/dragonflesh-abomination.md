---
title: Dragonflesh Abomination
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Monstrosity
size: Huge
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dragonflesh Abomination
size: Huge
type: monstrosity
alignment: typically Neutral Evil
ac: 15
ac_class: natural armour
hp: 66
hit_dice: 7d12 + 21
modifier: 2
speed: 30 ft., fly 40 ft.
stats: [ 18, 14, 17, 5, 12, 6 ]
saves:
  - str: 7
  - con: 6
condition_immunities: charmed, frightened, poisoned
senses: passive Perception 11
languages: understands Common and Draconic but can't speak
cr: "6"
traits:
  - name: Cloying Miasma
    desc: The abomination is surrounded by a noxious stench. At the start of the abomination's turn, any creature within 5 feet of it must succeed on a DC 14 Constitution saving throw or be poisoned until the start of the abomination's next turn.
  - name: Regeneration
    desc: The abomination regains 10 hit points at the start of its turns if it has at least 1 hit point.
actions:
  - name: Multiattack
    desc: The abomination makes three attacks using Claw, Acidic Spit, or a combination of them. It can replace one of the attacks with a Tail attack.
  - name: Claw
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 8 (1d8 + 4) slashing damage plus 5 (1d10) poison damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +7 to hit, reach 15 ft., one target. *Hit:* 10 (1d12 + 4) bludgeoning damage. If the target is a creature, it must succeed on a DC 15 Strength saving throw or be knocked prone."
  - name: Acidic Spit
    desc: "*Ranged Weapon Attack:* +5 to hit, range 60 ft., one target. *Hit:* 10 (3d6) acid damage."
  - name: Acid Belch (Recharge 5–6)
    desc: The abomination belches forth a cloud of acidic gas in a 30-foot cone. Each creature in that area must make a DC 14 Constitution saving throw, taking 28 (8d6) acid damage on a failed save, or half as much damage on a successful one.
```
