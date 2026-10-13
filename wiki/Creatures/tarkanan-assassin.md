---
title: Tarkanan Assassin
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Tarkanan Assassin
size: Medium
type: humanoid
subtype: any race
alignment: Any Non-Good alignment
ac: 15
ac_class: studded leather
hp: 45
hit_dice: 7d8 + 14
modifier: 3
speed: 30 ft.
stats: [ 12, 16, 14, 10, 14, 11 ]
skillsaves:
  - athletics: 3
  - deception: 2
  - perception: 4
  - sleight of hand: 5
  - stealth: 5
gear:
  - shortsword
senses: darkvision 60 ft., passive Perception 14
languages: Common, Thieves' cant
cr: "2"
traits:
  - name: Innate Spellcasting
    desc: |-
      The assassin's spellcasting ability is Constitution (+4 to hit with spell attacks). It can innately cast the following spells, requiring no material components:

      **At will:** *fire bolt*

      **1/day:** *chromatic orb*
  - name: Unstable Mark
    desc: When the assassin casts an innate spell, each creature within 10 feet of the assassin must make a DC 12 Constitution saving throw, taking 4 (1d8) force damage on a failed save, or half as much damage on a successful one.
actions:
  - name: Multiattack
    desc: The assassin makes two shortsword attacks.
  - name: Shortsword
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage plus 7 (2d6) poison damage."
  - name: Fire Bolt (Cantrip)
    desc: "*Ranged Spell Attack:* +4 to hit, range 120 ft., one target. *Hit:* 11 (2d10) fire damage. A flammable object hit by this spell ignites if it isn't being worn or carried."
  - name: Chromatic Orb (1/Day)
    desc: "*Ranged Spell Attack:* +4 to hit, range 90 ft., one creature. *Hit:* 18 (4d8) damage of a type chosen by the assassin: acid, cold, fire, lightning, poison, or thunder."
```
