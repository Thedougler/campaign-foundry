---
title: Raklupis Spyder-Fiend
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 19
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Raklupis Spyder-Fiend
size: Large
type: fiend
subtype: demon
alignment: typically Chaotic Evil
ac: 19
ac_class: natural armour
hp: 210
hit_dice: 28d10 + 56
modifier: 5
speed: 40 ft., climb 40 ft.
stats: [ 17, 20, 14, 18, 16, 23 ]
saves:
  - dex: 11
  - con: 8
  - wis: 9
skillsaves:
  - perception: 9
  - stealth: 11
damage_immunities: cold, fire, lightning, poison
condition_immunities: poisoned
senses: truesight 120 ft., passive Perception 19
languages: Abyssal, Common, telepathy 120 ft.
cr: "19"
traits:
  - name: Magic Resistance
    desc: The raklupis has advantage on saving throws against spells and other magical effects.
  - name: Spider Climb
    desc: The raklupis can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Web Sense
    desc: When in contact with a web, the raklupis knows the exact location of any other creature in contact with the same web.
  - name: Web Walker
    desc: The raklupis ignores movement restrictions caused by webbing.
actions:
  - name: Multiattack
    desc: The raklupis makes a Bite attack and two Serrated Sword attacks. It can use Venom Globe in place of one of these attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 16 (2d10 + 5) piercing damage plus 18 (4d8) poison damage. If the target is a creature, it must succeed on a DC 20 Constitution saving throw or have the poisoned condition for 1 minute. While poisoned in this way, a creature has the incapacitated condition and can't regain hit points. A poisoned creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Serrated Sword
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 19 (4d6 + 5) slashing damage plus 18 (4d8) poison damage."
  - name: Venom Globe
    desc: "*Ranged Weapon Attack:* +11 to hit, range 60/180 ft., one target. *Hit:* 45 (10d8) poison damage."
  - name: Spellcasting
    desc: |-
      The raklupis casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 20).

      **At will:** *Disguise Self*, *Invisibility* (self only), *Mage Hand*, *Minor Illusion*

      **2/day each:** *Darkness*, *Dominate Monster*, *Mass Suggestion*, *Telekinesis*, *Teleport*
bonus_actions:
  - name: Demand Loyalty
    desc: The raklupis magically ends the charmed and frightened conditions on itself and on any number of allies within 60 feet of itself.
```
