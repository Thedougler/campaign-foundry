---
title: Boneclaw
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Undead
size: Large
habitat:
  - Arctic
  - Desert
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Boneclaw
size: Large
type: undead
alignment: Typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 150
hit_dice: 20d10 + 40
modifier: 3
speed: 40 ft.
stats: [ 19, 16, 15, 13, 15, 9 ]
saves:
  - dex: 7
  - con: 6
  - wis: 6
skillsaves:
  - perception: 6
  - stealth: 7
damage_resistances: cold, necrotic
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: darkvision 60 ft., passive Perception 16
languages: Common plus one language spoken by its master
cr: "12"
traits:
  - name: Rejuvenation
    desc: While its master lives, a destroyed boneclaw gains a new body in 1d10 hours, with all its hit points. The new body appears within 1 mile of the boneclaw's master.
  - name: Unusual Nature
    desc: The boneclaw doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The boneclaw makes two Piercing Claw attacks.
  - name: Piercing Claw
    desc: "*Melee Weapon Attack:* +8 to hit, reach 15 ft., one target. *Hit:* 20 (3d10 + 4) piercing damage plus 11 (2d10) necrotic damage. If the target is a creature, the boneclaw can pull the target up to 10 feet toward itself, and the target is grappled (escape DC 14). The boneclaw has two claws. While a claw grapples a target, the claw can attack only that target."
  - name: Shadow Jump (Recharge 5–6)
    desc: |-
      If the boneclaw is in dim light or darkness, each creature of the boneclaw's choice within 15 feet of it must succeed on a DC 14 Constitution saving throw or take 34 (5d12 + 2) necrotic damage.

      The boneclaw then teleports up to 60 feet to an unoccupied space it can see. It can bring one creature it's grappling, teleporting that creature to an unoccupied space it can see within 5 feet of its destination. The destination spaces of this teleportation must be in dim light or darkness.
bonus_actions:
  - name: Shadow Stealth
    desc: While in dim light or darkness, the boneclaw takes the Hide action.
reactions:
  - name: Deadly Reach
    desc: In response to a creature entering a space within 15 feet of it, the boneclaw makes one Piercing Claw attack against that creature.
```
