---
title: Obzedat Ghost
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Obzedat Ghost
size: Medium
type: undead
alignment: Lawful Evil
ac: 14
ac_class: natural armour
hp: 110
hit_dice: 20d8 + 20
modifier: 0
speed: 0 ft., fly 30 ft. (hover)
stats: [ 10, 10, 13, 18, 20, 17 ]
saves:
  - int: 7
  - wis: 8
skillsaves:
  - insight: 8
  - perception: 8
damage_resistances: acid; cold; fire; lightning; thunder; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained
senses: darkvision 60 ft., passive Perception 18
languages: Common
cr: "8"
traits:
  - name: Innate Spellcasting
    desc: |-
      The ghost's innate spellcasting ability is Wisdom (spell save DC 16, +8 to hit with spell attacks). It can innately cast the following spells, requiring no components:

      **At will:** *chill touch* (at 5th level, and the ghost regains hit points equal to half the amount of damage the target takes)

      **1/day each:** *sanctuary*, *spirit guardians* (at 4th level)
  - name: Council of Five
    desc: |-
      The ghost has a trait based on who it is, as shown below:

      - **Enezesku Enfeebling Ray.** Enezesku's Innate Spellcasting trait includes *ray of enfeeblement*, which he can cast at will.  
      - **Fautomni Undead Fortitude.** If damage reduces Fautomni to 0 hit points, he must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, Fautomni drops to 1 hit point instead.  
      - **Karlov Unnatural Vigour.** When Karlov regains hit points, he has advantage on attack rolls he makes on his next turn.  
      - **Vuliev Teleportation.** Vuliev's Innate Spellcasting trait includes *misty step*, which he can cast at will.  
      - **Xil Xaxosz Lingering Spite.** When Xil Xaxosz is reduced to 0 hit points, his incorporeal form explodes in a burst of necrotic energy. Each creature within 5 feet of him must make a DC 16 Constitution saving throw, taking 14 (4d6) necrotic damage on a failed save, or half as much damage on a successful one.  
  - name: Ethereal Sight
    desc: The ghost can see 60 feet into the Ethereal Plane when it is on the Material Plane, and vice versa.
  - name: Incorporeal Movement
    desc: The ghost can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
  - name: Legendary Resistance (1/Day)
    desc: If the ghost fails a saving throw, it can choose to succeed instead.
actions:
  - name: Life Drain
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one creature. *Hit:* 18 (4d8) necrotic damage, and the ghost regains hit points equal to half the amount of damage the target takes. The target must succeed on a DC 13 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. The target dies if its hit point maximum is reduced to 0. This reduction to the target's hit point maximum lasts until the target finishes a long rest."
  - name: Convene the Ghost Council
    desc: The ghost summons the other four members of the Obzedat. At the start of the ghost's next turn, the other members appear in unoccupied spaces within 30 feet of the summoner. The ghosts each roll initiative when they appear.
legendary_description: If five Obzedat ghosts are all within 30 feet of each other, they can collectively take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time, and only at the end of another creature's turn. Obzedat ghosts regain spent legendary actions at the start of the turn of the ghost with the highest initiative.
legendary_actions:
  - name: Forced Obedience
    desc: A target that all of the Obzedat ghosts can see must succeed on a DC 16 Wisdom saving throw or bow until the end of its next turn. Until this bow ends, the target can't take actions or reactions, and its speed is 0 and can't be increased.
  - name: Indentured Spirits (Costs 3 Actions)
    desc: The Obzedat ghosts conjure 1d6 indentured spirits (described in this chapter) within 60 feet of one of them.
```
