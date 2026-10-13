---
title: Veiled Presence
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 21
creature_type: Celestial
size: Small or Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Veiled Presence
size: Small or Medium
type: celestial
alignment: typically Lawful Evil
ac: 20
ac_class: natural armour
hp: 300
hit_dice: 40d8 + 120
modifier: 7
speed: 40 ft., fly 80 ft. (hover)
stats: [ 14, 24, 16, 24, 20, 22 ]
saves:
  - dex: 14
  - int: 14
skillsaves:
  - perception: 12
  - stealth: 21
damage_resistances: necrotic, radiant
condition_immunities: charmed, frightened
senses: truesight 30 ft., passive Perception 22
languages: all
cr: "21"
traits:
  - name: Inviolate Presence
    desc: The veiled presence can't be targeted by divination magic or by features that would read its mind or determine its creature type.
  - name: Legendary Resistance (3/Day)
    desc: If the veiled presence fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The veiled presence makes two Blade of Judgement attacks and can use Revelation.
  - name: Blade of Judgement
    desc: "*Melee or Ranged Weapon Attack:* +14 to hit, reach 5 ft. or range 60 ft., one target. *Hit:* 10 (1d6 + 7) piercing damage plus 27 (6d8) radiant damage. If the target is a creature, it must succeed on a DC 22 Charisma saving throw, or on its next turn, it can either move or take an action, but not both."
  - name: Revelation
    desc: The veiled presence reveals a glimpse of its otherworldly nature to a creature it can see within 30 feet of itself. The target must succeed on a DC 22 Wisdom saving throw or have the paralysed condition until the end of its next turn, after which the target is immune to this Revelation for 24 hours.
reactions:
  - name: Uncanny Dodge
    desc: When an attacker the veiled presence can see hits the veiled presence with an attack, the veiled presence halves the attack's damage against it.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the veiled presence can expend a use to take one of the following actions. The veiled presence regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Flash Step
    desc: The veiled presence magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space that it can see.
  - name: Stab (Costs 2 Actions)
    desc: The veiled presence makes one Blade of Judgement attack.
  - name: Searing Radiance (Costs 3 Actions)
    desc: The veiled presence magically emanates dazzling light in a 10-foot-radius sphere centred on itself until the end of its next turn, during which time attack rolls against it have disadvantage and it has advantage on attack rolls. The sphere moves with the veiled presence. When another creature starts its turn in the light or enters the light for the first time on its turn, that creature must make a DC 22 Constitution saving throw, taking 18 (4d8) radiant damage on a failed save, or half as much damage on a successful one.
```
