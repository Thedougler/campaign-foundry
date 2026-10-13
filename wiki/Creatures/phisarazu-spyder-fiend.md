---
title: Phisarazu Spyder-Fiend
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Phisarazu Spyder-Fiend
size: Large
type: fiend
subtype: demon
alignment: typically Chaotic Evil
ac: 17
ac_class: natural armour
hp: 170
hit_dice: 20d10 + 60
modifier: 2
speed: 40 ft., climb 40 ft.
stats: [ 19, 14, 17, 11, 14, 13 ]
saves:
  - dex: 7
  - con: 8
  - wis: 7
skillsaves:
  - perception: 7
  - stealth: 7
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: poisoned
senses: truesight 120 ft., passive Perception 17
languages: Abyssal, Common, telepathy 120 ft.
cr: "13"
traits:
  - name: Magic Resistance
    desc: The phisarazu has advantage on saving throws against spells and other magical effects.
  - name: Spider Climb
    desc: The phisarazu can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Web Sense
    desc: When in contact with a web, the phisarazu knows the exact location of any other creature in contact with the same web.
  - name: Web Walker
    desc: The phisarazu ignores movement restrictions caused by webbing.
actions:
  - name: Multiattack
    desc: The phisarazu makes one Bite attack and two Claw attacks. It can replace one of these attacks with Scintillating Spray if available.
  - name: Bite
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 15 (2d10 + 4) piercing damage plus 9 (2d8) poison damage, and the target has the poisoned condition until the start of the phisarazu's next turn."
  - name: Claw
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 22 (4d8 + 4) slashing damage."
  - name: Scintillating Spray (Recharge 5–6)
    desc: The phisarazu expels shimmering webs in a 60-foot cone. Creatures and objects in that area are outlined by the glittering webs for 1 minute, during which time they emit dim light for 10 feet and can't benefit from the invisible condition. Additionally, creatures in that area must succeed on a DC 16 Wisdom saving throw or have the stunned condition for 1 minute. A stunned creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
bonus_actions:
  - name: Change Shape
    desc: The phisarazu transforms into a crab, drider, or giant crab, or returns to its true form. Its game statistics, except for its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.
```
