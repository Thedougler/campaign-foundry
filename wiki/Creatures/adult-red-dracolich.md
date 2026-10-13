---
title: Adult Red Dracolich
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Undead
size: Huge
habitat: []
sourcebooks:
  - Tasha's Cauldron of Everything
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Red Dracolich
size: Huge
type: dragon
alignment: Chaotic Evil
ac: 19
ac_class: natural armour
hp: 256
hit_dice: 19d12 + 133
modifier: 0
speed: 40 ft., climb 40 ft., fly 80 ft.
stats: [ 27, 10, 25, 16, 13, 21 ]
saves:
  - dex: 6
  - con: 13
  - wis: 7
  - cha: 11
skillsaves:
  - perception: 13
  - stealth: 6
damage_resistances: necrotic
damage_immunities: fire, poison
condition_immunities: charmed, frightened, paralysed, poisoned, exhaustion
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 23
languages: Common, Draconic
cr: "17"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the dracolich fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The dracolich has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: "The dracolich can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
  - name: Bite
    desc: "*Melee Weapon Attack:* +14 to hit, reach 10 ft., one target. *Hit:* 19 (2d10 + 8) piercing damage plus 7 (2d6) fire damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +14 to hit, reach 5 ft., one target. *Hit:* 15 (2d6 + 8) slashing damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +14 to hit, reach 15 ft., one target. *Hit:* 17 (2d8 + 8) bludgeoning damage."
  - name: Frightful Presence
    desc: Each creature of the dracolich's choice that is within 120 feet of the dracolich and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dracolich's Frightful Presence for the next 24 hours.
  - name: Fire Breath (Recharge 5–6)
    desc: The dracolich exhales fire in a 60-foot cone. Each creature in that area must make a DC 21 Dexterity saving throw, taking 63 (18d6) fire damage on a failed save, or half as much damage on a successful one.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the dracolich can expend a use to take one of the following actions. The dracolich regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Detect
    desc: The dracolich makes a Wisdom (Perception) check.
  - name: Tail Attack
    desc: The dracolich makes a tail attack.
  - name: Wing Attack (Costs 2 Actions)
    desc: The dracolich beats its wings. Each creature within 10 feet of the dracolich must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dracolich can then fly up to half its flying speed.
```
