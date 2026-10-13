---
title: Aurumach Rilmani
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Celestial
size: Large
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Aurumach Rilmani
size: Large
type: celestial
alignment: typically Neutral
ac: 18
ac_class: natural armour
hp: 285
hit_dice: 30d10 + 120
modifier: 5
speed: 0 ft., fly 40 ft. (hover)
stats: [ 20, 21, 18, 21, 18, 16 ]
saves:
  - dex: 11
  - int: 11
skillsaves:
  - arcana: 11
  - history: 11
  - perception: 10
damage_resistances: psychic; bludgeoning, piercing, slashing from nonmagical attacks
senses: truesight 120 ft., passive Perception 20
languages: all, telepathy 120 ft.
cr: "17"
actions:
  - name: Multiattack
    desc: The aurumach makes three Manifested Blade or Gleaming Ray attacks.
  - name: Manifested Blade
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 23 (4d8 + 5) force damage."
  - name: Gleaming Ray
    desc: "*Ranged Spell Attack:* +11 to hit, range 120 ft., one target. *Hit:* 24 (3d12 + 5) force damage."
  - name: Spellcasting
    desc: |-
      The aurumach casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 19):

      **At will:** *detect magic*, *detect thoughts*

      **1/day each:** *fly*, *geas* (as an action), *slow*, *suggestion*
bonus_actions:
  - name: Aura of Blades
    desc: The aurumach manifests a spectral, golden aura of blades around itself. While this aura is manifested, each creature that starts its turn within 10 feet of the aurumach must make a DC 19 Dexterity saving throw, taking 16 (3d10) force damage on a failed save, or half as much damage on a successful one. The aura disappears after 1 minute, when the aurumach has the incapacitated condition or dies, or when the aurumach uses a bonus action to end it.
  - name: Invoke Weakness (Recharge 5–6)
    desc: The aurumach attempts to use its magic to weaken the defences of a creature it can see within 120 feet of itself. The target must succeed on a DC 19 Wisdom saving throw or become cursed until the end of the aurumach's next turn. The next time the aurumach hits the cursed target with a Manifested Blade or Gleaming Ray attack, the target takes an extra 27 (6d8) force damage.
```
