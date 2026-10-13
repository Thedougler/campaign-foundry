---
title: Ancient Lunar Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 19
creature_type: Dragon
size: Gargantuan
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ancient Lunar Dragon
size: Gargantuan
type: dragon
alignment: typically Neutral Evil
ac: 18
ac_class: natural armour
hp: 297
hit_dice: 17d20 + 119
modifier: 1
speed: 40 ft., burrow 20 ft., fly 80 ft.
stats: [ 27, 12, 24, 12, 15, 17 ]
saves:
  - con: 13
  - wis: 8
skillsaves:
  - perception: 14
  - stealth: 13
damage_immunities: cold
senses: darkvision 240 ft., passive Perception 24
languages: Draconic
cr: "19"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
  - name: Tunneler
    desc: The dragon can burrow through solid rock at half its burrowing speed and leaves a 20-foot-diameter tunnel in its wake.
  - name: Unusual Nature
    desc: The dragon doesn't require air.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +14 to hit, reach 15 ft., one target. *Hit:* 15 (2d6 + 8) piercing damage plus 7 (2d6) cold damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +14 to hit, reach 10 ft., one target. *Hit:* 15 (2d6 + 8) slashing damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +14 to hit, reach 20 ft., one target. *Hit:* 15 (2d6 + 8) bludgeoning damage."
  - name: Cold Breath (Recharge 5–6)
    desc: The dragon exhales a blast of frost in a 90-foot cone. Each creature in the cone must make a DC 21 Constitution saving throw. On a failed save, the creature takes 36 (8d8) cold damage, and its speed is reduced to 0 until the end of its next turn. On a successful save, the creature takes half as much damage, and its speed isn't reduced.
bonus_actions:
  - name: Phase (3/Day)
    desc: The dragon becomes partially incorporeal for as long as it maintains concentration on the effect (as if concentrating on a spell). While partially incorporeal, the dragon has resistance to bludgeoning, piercing, and slashing damage.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Tail Attack
    desc: The dragon makes one Tail attack.
  - name: Treacherous Ice
    desc: Magical ice covers the ground in a 20-foot radius centred on a point the dragon can see within 120 feet of itself. The ice, which is difficult terrain for all creatures except lunar dragons, lasts for 10 minutes or until the dragon uses this legendary action again.
  - name: Wing Attack (Costs 2 Actions)
    desc: The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 21 Dexterity saving throw or take 12 (1d8 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its speed without provoking opportunity attacks.
```
