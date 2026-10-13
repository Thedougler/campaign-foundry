---
title: Nergaliid
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Nergaliid
size: Large
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 12
ac_class: natural armour
hp: 42
hit_dice: 4d10 + 20
modifier: 1
speed: 30 ft.
stats: [ 18, 12, 20, 12, 10, 12 ]
skillsaves:
  - deception: 5
  - perception: 2
  - stealth: 5
damage_resistances: cold; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: fire, poison
condition_immunities: poisoned
senses: darkvision 120 ft., passive Perception 12
languages: Common, Infernal
cr: "3"
traits:
  - name: Shadow Stealth
    desc: While in dim light or darkness, the nergaliid can take the Hide action as a bonus action.
  - name: Standing Leap
    desc: The nergaliid's long jump is up to 30 feet and its high jump is up to 20 feet, with or without a running start.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one creature. *Hit:* 13 (2d8 + 4) piercing damage, and the target must succeed on a DC 15 Constitution saving throw or become poisoned for 1 minute. The poisoned creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Tongue Lash
    desc: "*Melee Weapon Attack:* +6 to hit, reach 20 ft., one target. *Hit:* 10 (1d12 + 4) bludgeoning damage."
  - name: Siphon Life (Recharge 4–6)
    desc: The nergaliid magically draws the life from a humanoid it can see within 40 feet of it. The target must make a DC 15 Wisdom saving throw. An incapacitated target fails the save automatically. On a failed save, the creature takes 10 (3d6) psychic damage, and the nergaliid gains temporary hit points equal to the damage taken. On a successful save, the target takes half as much damage, and the nergaliid doesn't gain temporary hit points. If this damage kills the target, its body rises at the end of the nergaliid's current turn as a husk zombie (see earlier in this chapter).
```
