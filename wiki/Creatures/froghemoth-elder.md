---
title: Froghemoth Elder
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Monstrosity
size: Huge
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Froghemoth Elder
size: Huge
type: monstrosity
alignment: Unaligned
ac: 14
ac_class: natural armour
hp: 207
hit_dice: 18d12 + 90
modifier: 1
speed: 30 ft., swim 30 ft.
stats: [ 25, 13, 20, 2, 14, 8 ]
saves:
  - str: 12
  - con: 10
  - wis: 7
skillsaves:
  - perception: 12
  - stealth: 6
damage_resistances: fire, lightning
senses: darkvision 60 ft., passive Perception 22
cr: "15"
traits:
  - name: Amphibious
    desc: The froghemoth can breathe air and water.
  - name: Legendary Resistance (3/Day)
    desc: If the froghemoth fails a saving throw, it can choose to succeed instead.
  - name: Shock Susceptibility
    desc: "If the froghemoth takes lightning damage, it suffers two effects until the end of its next turn: its speed is halved, and it has disadvantage on Dexterity saving throws."
actions:
  - name: Multiattack
    desc: The froghemoth makes one Bite attack and two Tentacle attacks, and it can use Tongue.
  - name: Bite
    desc: |-
      *Melee Weapon Attack:* +12 to hit, reach 5 ft., one target. *Hit:* 23 (3d10 + 7) piercing damage, and the target is swallowed if it is a Medium or smaller creature. A swallowed creature has the blinded and restrained conditions, has total cover against attacks and other effects outside the froghemoth, and takes 10 (3d6) acid damage at the start of each of the froghemoth's turns.

      The froghemoth's gullet can hold up to three creatures at a time. If the froghemoth takes 25 damage or more on a single turn from a creature inside it, the froghemoth must succeed on a DC 20 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which lands in a space within 10 feet of the froghemoth and has the prone condition. If the froghemoth dies, any swallowed creatures are no longer restrained by it and can escape from the corpse using 10 feet of movement, exiting with the prone condition.
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +12 to hit, reach 20 ft., one target. *Hit:* 20 (3d8 + 7) bludgeoning damage, and the target has the grappled condition (escape DC 20). Until this grapple ends, the froghemoth can't use this tentacle on another target. The froghemoth has four tentacles."
  - name: Tongue
    desc: The froghemoth targets one Large or smaller creature that it can see within 25 feet of it. The target must make a DC 20 Strength saving throw. On a failed save, the target is pulled into an unoccupied space within 5 feet of the froghemoth.
reactions:
  - name: Alien Gaze
    desc: When a creature the froghemoth can see damages the froghemoth, the froghemoth swivels its eyestalk toward the creature and pierces the creature's mind with its otherworldly gaze. That creature must make a DC 18 Intelligence saving throw, taking 7 (2d6) psychic damage on a failed save or half as much damage on a successful one.
  - name: Leap
    desc: Immediately after a creature the froghemoth can see ends its turn, the froghemoth jumps up to half its speed. Each creature within 5 feet of the froghemoth when it lands must succeed on a DC 20 Strength saving throw or have the prone condition.
```
