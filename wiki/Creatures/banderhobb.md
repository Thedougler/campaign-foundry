---
title: Banderhobb
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Monstrosity
size: Large
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Banderhobb
size: Large
type: monstrosity
alignment: Typically Neutral Evil
ac: 15
ac_class: natural armour
hp: 84
hit_dice: 8d10 + 40
modifier: 1
speed: 30 ft.
stats: [ 20, 12, 20, 11, 14, 8 ]
skillsaves:
  - athletics: 8
  - stealth: 7
condition_immunities: charmed, frightened
senses: darkvision 120 ft., passive Perception 12
languages: understands Common and the languages of its creator but can't speak
cr: "5"
traits:
  - name: Resonant Connection
    desc: If the banderhobb has even a tiny piece of a creature or an object in its possession, such as a lock of hair or a splinter of wood, it knows the most direct route to that creature or object if it is within 1 mile of the banderhobb.
actions:
  - name: Multiattack
    desc: The banderhobb makes one Bite attack and one Tongue attack. It can replace one attack with a use of Shadow Step.
  - name: Bite
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 15 (3d6 + 5) piercing damage, and the target is grappled (escape DC 16) if it is a Large or smaller creature. Until this grapple ends, the target is restrained, and the banderhobb can't use its Bite attack or Tongue attack on another target."
  - name: Tongue
    desc: "*Melee Weapon Attack:* +8 to hit, reach 15 ft., one creature. *Hit:* 10 (3d6) necrotic damage, and the target must make a DC 16 Strength saving throw. On a failed save, the target is pulled to a space within 5 feet of the banderhobb."
  - name: Shadow Step
    desc: The banderhobb teleports up to 30 feet to an unoccupied space of dim light or darkness that it can see.
  - name: Swallow
    desc: |-
      *Melee Weapon Attack:* +8 to hit, reach 5 ft., one Medium or smaller creature grappled by the banderhobb. *Hit:* 15 (3d6 + 5) piercing damage. The creature is also swallowed, and the grapple ends. The swallowed creature is blinded and restrained, it has total cover against attacks and other effects outside the banderhobb, and it takes 10 (3d6) necrotic damage at the start of each of the banderhobb's turns. A creature reduced to 0 hit points in this way stops taking the necrotic damage and becomes stable.

      The banderhobb can have only one creature swallowed at a time. While the banderhobb isn't incapacitated, it can regurgitate the creature at any time (no action required) in a space within 5 feet of it. The creature exits prone. If the banderhobb dies, it likewise regurgitates a swallowed creature.
bonus_actions:
  - name: Shadow Stealth
    desc: While in dim light or darkness, the banderhobb takes the Hide action.
```
