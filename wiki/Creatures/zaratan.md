---
title: Zaratan
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 22
creature_type: Elemental
size: Gargantuan
habitat:
  - Desert
  - Forest
  - Grassland
  - Hill
  - Mountain
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Zaratan
size: Gargantuan
type: elemental
alignment: Typically Neutral
ac: 21
ac_class: natural armour
hp: 307
hit_dice: 15d20 + 150
modifier: 0
speed: 40 ft., swim 40 ft.
stats: [ 30, 10, 30, 2, 21, 18 ]
saves:
  - wis: 12
  - cha: 11
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: exhaustion, paralysed, petrified, poisoned, stunned
senses: darkvision 60 ft., tremorsense 60 ft., passive Perception 15
cr: "22"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the zaratan fails a saving throw, it can choose to succeed instead.
  - name: Siege Monster
    desc: The elemental deals double damage to objects and structures (included in Earth-Shaking Movement).
actions:
  - name: Multiattack
    desc: The zaratan makes one Bite attack and one Stomp attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +17 to hit, reach 20 ft., one target. *Hit:* 28 (4d8 + 10) force damage."
  - name: Stomp
    desc: "*Melee Weapon Attack:* +17 to hit, reach 20 ft., one target. *Hit:* 26 (3d10 + 10) thunder damage."
  - name: Spit Rock
    desc: "*Ranged Weapon Attack:* +17 to hit, range 120 ft./240 ft., one target. *Hit:* 31 (6d8 + 10) force damage."
  - name: Spew Debris (Recharge 5–6)
    desc: The zaratan exhales rocky debris in a 90-foot cube. Each creature in that area must make a DC 25 Dexterity saving throw. A creature takes 33 (6d10) bludgeoning damage on a failed save, or half as much damage on a successful one. A creature that fails the save by 5 or more is knocked prone.
bonus_actions:
  - name: Earth-Shaking Movement
    desc: After moving at least 10 feet on the ground, the zaratan sends a shock wave through the ground in a 120-foot-radius circle centred on itself. That area becomes difficult terrain for 1 minute. Each creature on the ground that is concentrating must succeed on a DC 25 Constitution saving throw or the creature's concentration is broken. The shock wave deals 100 thunder damage to all structures in contact with the ground in the area. If a creature is near a structure that collapses, the creature might be buried; a creature within half the distance of the structure's height must make a DC 25 Dexterity saving throw. On a failed save, the creature takes 17 (5d6) bludgeoning damage, is knocked prone, and is trapped in the rubble. A trapped creature is restrained, requiring a successful DC 20 Strength (Athletics) check as an action to escape. Another creature within 5 feet of the buried creature can use its action to clear rubble and grant advantage on the check. If three creatures use their actions in this way, the check is an automatic success. On a successful save, the creature takes half as much damage and doesn't fall prone or become trapped.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the zaratan can expend a use to take one of the following actions. The zaratan regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Stomp
    desc: The zaratan makes one Stomp attack.
  - name: Move
    desc: The zaratan moves up to its speed.
  - name: Spit (Costs 2 Actions)
    desc: The zaratan makes one Spit Rock attack.
  - name: Retract (Costs 2 Actions)
    desc: The zaratan retracts into its shell. Until it takes its Emerge action, it has resistance to all damage, and it is restrained. The next time it takes a legendary action, it must take its Revitalize or Emerge action.
  - name: Revitalize (Costs 2 Actions)
    desc: The zaratan can use this option only if it is retracted in its shell. It regains 52 (5d20) hit points. The next time it takes a legendary action, it must take its Emerge action.
  - name: Emerge (Costs 2 Actions)
    desc: The zaratan emerges from its shell and makes one Spit Rock attack. It can use this option only if it is retracted in its shell.
```
