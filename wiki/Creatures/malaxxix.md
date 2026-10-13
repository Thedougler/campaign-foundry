---
title: Malaxxix
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
creature_type: Fiend
size: Huge
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Malaxxix
size: Huge
type: fiend
subtype: yugoloth
alignment: Neutral Evil
ac: 17
ac_class: natural armour
hp: 312
hit_dice: 25d12 + 150
modifier: 3
speed: 40 ft., fly 60 ft.
stats: [ 23, 16, 22, 22, 20, 18 ]
saves:
  - str: 12
  - con: 12
skillsaves:
  - arcana: 12
  - athletics: 12
  - perception: 11
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: acid, poison
condition_immunities: charmed, exhaustion, frightened, poisoned
gear:
  - whip
senses: truesight 120 ft., passive Perception 21
languages: Abyssal, Infernal, telepathy 120 ft.
cr: "18"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If Malaxxix fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: Malaxxix has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: Malaxxix makes two Forge Hammer or Whip attacks in any combination.
  - name: Forge Hammer
    desc: "*Melee or Ranged Weapon Attack:* +12 to hit, reach 10 ft. or range 60/180 ft., one target. *Hit:* 28 (4d10 + 6) bludgeoning damage, and the target can't take reactions until the end of Malaxxix's next turn. *Hit or Miss:* The hammer then magically returns to Malaxxix's hand."
  - name: Whip
    desc: "*Melee Weapon Attack:* +12 to hit, reach 30 ft., one creature. *Hit:* 15 (2d8 + 6) slashing damage, and the target has the restrained condition for 1 minute. The restrained target can make a DC 20 Strength saving throw at the end of each of its turns, ending the effect on itself on a success. Only one creature can be restrained by the whip at a time."
  - name: Mezzoloth Vortex (Recharge 5–6)
    desc: Malaxxix summons a vortex of whirling mezzoloths at a point it can see within 90 feet of itself. The vortex is a 30-foot-radius, 100-foot-high cylinder centred on that point. Each creature other than Malaxxix in that area must make a DC 20 Dexterity saving throw. On a failed save, a creature takes 35 (10d6) force damage and has the restrained condition while within the cylinder. On a successful save, a creature takes half as much damage and is pushed to the nearest unoccupied space outside the cylinder. The vortex lasts until the start of Malaxxix's next turn.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Malaxxix can expend a use to take one of the following actions. Malaxxix regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Fiendish Stride
    desc: Malaxxix moves up to its speed. This movement doesn't provoke opportunity attacks. When Malaxxix moves within 5 feet of a creature during this movement, that creature takes 5 (1d10) lightning damage. A creature can take this damage only once per turn.
  - name: Attack (Costs 2 Actions)
    desc: Malaxxix makes one Forge Hammer or Whip attack.
```
