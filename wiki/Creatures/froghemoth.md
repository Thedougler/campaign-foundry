---
title: Froghemoth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Monstrosity
size: Huge
habitat:
  - Swamp
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Froghemoth
size: Huge
type: monstrosity
alignment: Unaligned
ac: 14
ac_class: natural armour
hp: 161
hit_dice: 14d12 + 70
modifier: 1
speed: 30 ft., swim 30 ft.
stats: [ 23, 13, 20, 2, 12, 5 ]
saves:
  - con: 9
  - wis: 5
skillsaves:
  - perception: 9
  - stealth: 5
damage_resistances: fire, lightning
senses: darkvision 60 ft., passive Perception 19
cr: "10"
traits:
  - name: Amphibious
    desc: The froghemoth can breathe air and water.
  - name: Shock Susceptibility
    desc: "If the froghemoth takes lightning damage, it suffers two effects until the end of its next turn: its speed is halved, and it has disadvantage on Dexterity saving throws."
actions:
  - name: Multiattack
    desc: The froghemoth makes one Bite attack and two Tentacle attacks, and it can use Tongue.
  - name: Bite
    desc: |-
      *Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 22 (3d10 + 6) piercing damage, and the target is swallowed if it is a Medium or smaller creature. A swallowed creature is blinded and restrained, has total cover against attacks and other effects outside the froghemoth, and takes 10 (3d6) acid damage at the start of each of the froghemoth's turns.

      The froghemoth's gullet can hold up to two creatures at a time. If the froghemoth takes 20 damage or more on a single turn from a creature inside it, the froghemoth must succeed on a DC 20 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls prone in a space within 10 feet of the froghemoth. If the froghemoth dies, any swallowed creature is no longer restrained by it and can escape from the corpse using 10 feet of movement, exiting prone.
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +10 to hit, reach 20 ft., one target. *Hit:* 19 (3d8 + 6) bludgeoning damage, and the target is grappled (escape DC 16) if it is a Huge or smaller creature. Until the grapple ends, the froghemoth can't use this tentacle on another target. The froghemoth has four tentacles."
  - name: Tongue
    desc: The froghemoth targets one Medium or smaller creature that it can see within 20 feet of it. The target must make a DC 18 Strength saving throw. On a failed save, the target is pulled into an unoccupied space within 5 feet of the froghemoth.
```
