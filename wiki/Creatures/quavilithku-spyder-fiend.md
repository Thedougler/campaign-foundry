---
title: Quavilithku Spyder-Fiend
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Quavilithku Spyder-Fiend
size: Large
type: fiend
subtype: demon
alignment: typically Chaotic Evil
ac: 19
ac_class: natural armour
hp: 256
hit_dice: 27d10 + 108
modifier: 3
speed: 40 ft., climb 40 ft.
stats: [ 18, 16, 19, 17, 14, 12 ]
saves:
  - dex: 9
  - con: 10
  - wis: 8
skillsaves:
  - investigation: 9
  - perception: 8
  - stealth: 9
damage_resistances: cold, fire, lightning
damage_immunities: acid, poison
condition_immunities: poisoned
senses: truesight 60 ft., passive Perception 18
languages: Abyssal, Common, telepathy 120 ft.
cr: "17"
traits:
  - name: Magic Resistance
    desc: The quavilithku has advantage on saving throws against spells and other magical effects.
  - name: Spider Climb
    desc: The quavilithku can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Web Sense
    desc: When in contact with a web, the quavilithku knows the exact location of any other creature in contact with the same web.
  - name: Web Walker
    desc: The quavilithku ignores movement restrictions caused by webbing.
actions:
  - name: Multiattack
    desc: The quavilithku makes two Bite attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 15 (2d10 + 4) piercing damage plus 17 (5d6) poison damage. If the target is a creature, it must succeed on a DC 18 Constitution saving throw or have the poisoned condition for 1 minute. While poisoned in this way, a creature can't regain hit points. A poisoned creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Dissolving Web (Recharge 5–6)
    desc: The quavilithku expels acid-drenched webs in a 90-foot cone. Each creature in that area must make a DC 18 Constitution saving throw, taking 44 (8d10) acid damage on a failed save or half as much damage on a successful one. Nonmagical objects in the area that aren't being worn or carried take 44 (8d10) acid damage.
bonus_actions:
  - name: Assess Weakness
    desc: The quavilithku sizes up a creature it can see within 40 feet of itself. Until the start of the quavilithku's next turn, it has advantage on attack rolls against the creature.
```
