---
title: Maschin-i-Bozorg
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Construct
size: Large
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Maschin-i-Bozorg
size: Large
type: construct
alignment: Unaligned
ac: 17
ac_class: natural armour
hp: 94
hit_dice: 9d10 + 45
modifier: 3
speed: 20 ft.
stats: [ 18, 16, 20, 2, 10, 1 ]
damage_immunities: poison, psychic
condition_immunities: charmed, deafened, exhaustion, frightened, paralysed, poisoned, unconscious
senses: darkvision 120 ft., passive Perception 10
languages: understands Gnomish but can't speak
cr: "8"
traits:
  - name: Overheat
    desc: When the maschin-i-bozorg is reduced to 0 hit points, its power source overloads, briefly superheating its outer shell. Each creature within 10 feet of the maschin-i-bozorg must make a DC 16 Constitution saving throw, taking 7 (2d6) fire damage on a failed save or half as much damage on a successful one.
actions:
  - name: Multiattack
    desc: The maschin-i-bozorg makes two Poison Jab attacks.
  - name: Poison Jab
    desc: "*Melee or Ranged Weapon Attack:* +6 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 13 (4d4 + 3) piercing damage, and the target must succeed on a DC 16 Constitution saving throw or have the poisoned condition for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Steam Jet (Recharge 5–6)
    desc: The maschin-i-bozorg emits scalding steam in a 30-foot cone. Each creature in that area must make a DC 16 Constitution saving throw, taking 28 (8d6) fire damage on a failed save or half as much damage on a successful one.
bonus_actions:
  - name: Crushing Stride
    desc: |-
      The maschin-i-bozorg moves up to its speed in a straight line. During this movement, it can enter Medium and smaller creatures' spaces. A creature whose space the maschin-i-bozorg enters must make a DC 15 Dexterity saving throw. On a successful save, the creature is pushed to the nearest unoccupied space out of the maschin-i-bozorg's path. On a failed save, the creature takes 10 (3d6) bludgeoning damage and has the prone condition.

      If the maschin-i-bozorg remains in the prone creature's space, the creature also has the restrained condition until it's no longer in the same space as the maschin-i-bozorg. While restrained in this way, the creature, or another creature within 5 feet of it, can use its action to make a DC 15 Strength (Athletics) check. On a successful check, the creature is shunted to an unoccupied space of its choice within 5 feet of the maschin-i-bozorg.
```
