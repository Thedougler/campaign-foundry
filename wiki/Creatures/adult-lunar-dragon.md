---
title: Adult Lunar Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Dragon
size: Huge
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Lunar Dragon
size: Huge
type: dragon
alignment: typically Neutral Evil
ac: 17
ac_class: natural armour
hp: 172
hit_dice: 15d12 + 75
modifier: 1
speed: 40 ft., burrow 20 ft., fly 80 ft.
stats: [ 23, 12, 20, 10, 13, 15 ]
saves:
  - con: 10
  - wis: 6
skillsaves:
  - perception: 11
  - stealth: 11
damage_immunities: cold
senses: darkvision 240 ft., passive Perception 21
languages: Draconic
cr: "13"
traits:
  - name: Legendary Resistance (2/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
  - name: Tunneler
    desc: The dragon can burrow through solid rock at half its burrowing speed and leaves a 15-foot-diameter tunnel in its wake.
  - name: Unusual Nature
    desc: The dragon doesn't require air.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 13 (2d6 + 6) piercing damage plus 3 (1d6) cold damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 13 (2d6 + 6) slashing damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +11 to hit, reach 15 ft., one target. *Hit:* 13 (2d6 + 6) bludgeoning damage."
  - name: Cold Breath (Recharge 5–6)
    desc: The dragon exhales a blast of frost in a 60-foot cone. Each creature in the cone must make a DC 18 Constitution saving throw. On a failed save, the creature takes 36 (8d8) cold damage, and its speed is reduced to 0 until the end of its next turn. On a successful save, the creature takes half as much damage, and its speed isn't reduced.
bonus_actions:
  - name: Phase (3/Day)
    desc: The dragon becomes partially incorporeal for as long as it maintains concentration on the effect (as if concentrating on a spell). While partially incorporeal, the dragon has resistance to bludgeoning, piercing, and slashing damage.
legendary_description: "Legendary Action Uses: 2. Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Tail Attack
    desc: The dragon makes one Tail attack.
  - name: Treacherous Ice
    desc: Magical ice covers the ground in a 20-foot radius centred on a point the dragon can see within 120 feet of itself. The ice, which is difficult terrain for all creatures except lunar dragons, lasts for 10 minutes or until the dragon uses this legendary action again.
```
