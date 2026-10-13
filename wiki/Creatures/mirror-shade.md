---
title: Mirror Shade
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mirror Shade
size: Medium
type: undead
alignment: typically Chaotic Evil
ac: 13
hp: 91
hit_dice: 14d8 + 28
modifier: 3
speed: 40 ft.
stats: [ 8, 17, 14, 10, 13, 18 ]
saves:
  - dex: 7
  - wis: 5
skillsaves:
  - deception: 8
  - stealth: 7
damage_resistances: acid; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison, psychic, radiant
condition_immunities: blinded, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained
senses: darkvision 60 ft., passive Perception 11
cr: "10"
traits:
  - name: False Appearance
    desc: If the mirror shade is within 5 feet of a reflective surface, such as a mirror, glass pane, or still water, it has advantage on its initiative roll. If a creature hasn't observed the mirror shade move or act, that creature must succeed on a DC 18 Intelligence (Investigation) check to discern that the mirror shade isn't the creature's own reflection.
  - name: Mirror Movement
    desc: The mirror shade can move along the surface of reflective or translucent objects, such as mirrors, without provoking opportunity attacks. It can move through translucent objects as if they were difficult terrain.
actions:
  - name: Multiattack
    desc: The mirror shade makes two Phantasmal Strike attacks and uses Reflect Fear.
  - name: Phantasmal Strike
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) radiant damage plus 7 (2d6) psychic damage."
  - name: Reflect Fear
    desc: The mirror shade targets one creature it can see within 60 feet of itself and projects an illusion of that creature's greatest fear. The target must make a DC 16 Wisdom saving throw. On a failed save, the target takes 28 (8d6) psychic damage and has the frightened condition until the start of the mirror shade's next turn. On a successful save, the target takes half as much damage only.
bonus_actions:
  - name: Mirror Stealth
    desc: While within 5 feet of a reflective surface, such as a mirror, the mirror shade takes the Hide action.
```
