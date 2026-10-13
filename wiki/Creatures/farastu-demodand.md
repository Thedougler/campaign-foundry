---
title: Farastu Demodand
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Farastu Demodand
size: Medium
type: fiend
alignment: typically Neutral Evil
ac: 17
ac_class: natural armour
hp: 195
hit_dice: 26d8 + 78
modifier: 1
speed: 40 ft., climb 40 ft.
stats: [ 20, 13, 16, 8, 12, 16 ]
saves:
  - dex: 5
  - wis: 5
skillsaves:
  - perception: 9
  - stealth: 5
  - survival: 5
damage_resistances: cold, fire
damage_immunities: acid, poison
condition_immunities: paralysed, poisoned, restrained
senses: darkvision 120 ft., passive Perception 19
languages: Abyssal, Demodand, telepathy 120 ft.
cr: "11"
traits:
  - name: Boundless Movement
    desc: The farastu ignores difficult terrain, and magical effects can't reduce its speed. It can spend 5 feet of movement to automatically remove the grappled condition from itself.
  - name: Magic Resistance
    desc: The farastu has advantage on saving throws against spells and other magical effects.
  - name: Spider Climb
    desc: The farastu can climb difficult surfaces, including upside down on ceilings, without an ability check.
actions:
  - name: Multiattack
    desc: The farastu makes two Claw attacks and one Bite attack.
  - name: Claw
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 16 (2d10 + 5) slashing damage. If the target is a Large or smaller creature, it has the grappled condition (escape DC 15, with disadvantage). The farastu has two claws, each of which can grapple one creature."
  - name: Bite
    desc: "*Melee Weapon Attack:* +9 to hit (with advantage against a creature the farastu is grappling), reach 5 ft., one target. *Hit:* 12 (2d6 + 5) piercing damage plus 24 (7d6) acid damage."
  - name: Summon Demodand (1/Day)
    desc: The farastu has a 40 percent chance of summoning 1 farastu demodand. A summoned demodand appears in an unoccupied space within 60 feet of the farastu, acts as an ally of the farastu, and can't summon other demodands. It remains for 1 minute, until it or the farastu dies, or until the farastu dismisses it as an action.
  - name: Spellcasting
    desc: |-
      The farastu casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability:

      **At will:** *invisibility* (self only)

      **1/day each:** *dispel magic*, *fog cloud*
```
