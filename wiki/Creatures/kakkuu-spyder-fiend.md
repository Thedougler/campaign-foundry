---
title: Kakkuu Spyder-Fiend
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Kakkuu Spyder-Fiend
size: Medium
type: fiend
subtype: demon
alignment: typically Chaotic Evil
ac: 15
ac_class: natural armour
hp: 91
hit_dice: 14d8 + 28
modifier: 2
speed: 30 ft., climb 30 ft.
stats: [ 17, 15, 14, 6, 10, 10 ]
saves:
  - dex: 5
  - con: 5
  - wis: 3
skillsaves:
  - perception: 3
  - stealth: 5
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 60 ft., passive Perception 13
languages: understands Abyssal but can't speak
cr: "5"
traits:
  - name: Magic Resistance
    desc: The kakkuu has advantage on saving throws against spells and other magical effects.
  - name: Spider Climb
    desc: The kakkuu can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Web Sense
    desc: When in contact with a web, the kakkuu knows the exact location of any other creature in contact with the same web.
  - name: Web Walker
    desc: The kakkuu ignores movement restrictions caused by webbing.
actions:
  - name: Multiattack
    desc: The kakkuu makes a Web Snare attack, uses Reel, and makes a Bite attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 14 (2d10 + 3) piercing damage plus 10 (3d6) poison damage."
  - name: Reel
    desc: The kakkuu pulls each creature within 60 feet of itself that is grappled by its Web Snare up to 30 feet straight toward itself.
  - name: Web Snare
    desc: "*Ranged Weapon Attack:* +6 to hit, reach 30/60 ft., one Large or smaller creature. *Hit:* The target has the grappled condition (escape DC 13). While grappled, the target also has the restrained condition. A web snare grappling a creature can be attacked and destroyed (AC 10; 10 hit points; immunity to bludgeoning, poison, and psychic damage)."
```
