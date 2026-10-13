---
title: Fleecemane Lion
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
name: Fleecemane Lion
size: Large
type: monstrosity
alignment: Unaligned
ac: 15
ac_class: natural armour
hp: 45
hit_dice: 6d10 + 12
modifier: 3
speed: 50 ft.
stats: [ 19, 16, 14, 6, 14, 10 ]
saves:
  - str: 6
  - con: 4
skillsaves:
  - perception: 4
  - stealth: 5
senses: passive Perception 14
cr: "3"
traits:
  - name: Keen Smell
    desc: The lion has advantage on Wisdom (Perception) checks that rely on smell.
  - name: Pounce
    desc: If the lion moves at least 20 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the lion can make one bite attack against it as a bonus action.
  - name: Running Leap
    desc: With a 10-foot running start, the lion can long jump up to 25 feet.
  - name: Spell Turning
    desc: The lion has advantage on saving throws against any spell that targets only the lion (not an area). If the lion's saving throw succeeds and the spell is of 4th level or lower, the spell has no effect on the lion and instead targets the caster.
actions:
  - name: Multiattack
    desc: "The lion makes two attacks: one with its bite and one with its claw."
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) piercing damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) slashing damage."
legendary_description: "Legendary Action Uses: 2. Immediately after another creature's turn, the fleecemane lion can expend a use to take one of the following actions. The fleecemane lion regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Claw
    desc: The lion makes one claw attack.
  - name: Roar (Costs 2 Actions)
    desc: The lion emits a magical roar. Each creature within 60 feet of the lion that can hear the roar must succeed on a DC 12 Wisdom saving throw or be frightened of the lion until the end of the lion's next turn.
```
