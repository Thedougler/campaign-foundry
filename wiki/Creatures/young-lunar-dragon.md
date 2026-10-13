---
title: Young Lunar Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Dragon
size: Large
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Young Lunar Dragon
size: Large
type: dragon
alignment: typically Lawful Evil
ac: 16
ac_class: natural armour
hp: 123
hit_dice: 13d10 + 52
modifier: 1
speed: 40 ft., burrow 20 ft., fly 80 ft.
stats: [ 19, 12, 18, 8, 10, 13 ]
saves:
  - con: 7
  - wis: 3
skillsaves:
  - perception: 6
  - stealth: 7
damage_immunities: cold
senses: darkvision 240 ft., passive Perception 16
languages: Draconic
cr: "7"
traits:
  - name: Tunneler
    desc: The dragon can burrow through solid rock at half its burrowing speed and leaves a 10-foot-diameter tunnel in its wake.
  - name: Unusual Nature
    desc: The dragon doesn't require air.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage plus 3 (1d6) cold damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) slashing damage."
  - name: Cold Breath (Recharge 5–6)
    desc: The dragon exhales a blast of frost in a 30-foot cone. Each creature in the cone must make a DC 15 Constitution saving throw. On a failed save, the creature takes 27 (6d8) cold damage, and its speed is halved until the end of its next turn. On a successful save, the creature takes half as much damage, and its speed isn't reduced.
bonus_actions:
  - name: Phase (2/Day)
    desc: The dragon becomes partially incorporeal for as long as it maintains concentration on the effect (as if concentrating on a spell). While partially incorporeal, the dragon has resistance to bludgeoning, piercing, and slashing damage.
```
