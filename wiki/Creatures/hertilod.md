---
title: Hertilod
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Monstrosity
size: Huge
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hertilod
size: Huge
type: monstrosity
alignment: Unaligned
ac: 14
hp: 241
hit_dice: 21d12 + 105
modifier: 4
speed: 50 ft., climb 50 ft.
stats: [ 23, 18, 20, 3, 15, 10 ]
saves:
  - str: 12
  - dex: 10
skillsaves:
  - perception: 8
damage_resistances: necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: poisoned
senses: blindsight 30 ft., tremorsense 60 ft., passive Perception 18
cr: "17"
traits:
  - name: Legendary Resistances (3/Day)
    desc: If the hertilod fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The hertilod has advantage on saving throws against spells and other magical effects.
  - name: Shock Susceptibility
    desc: If the hertilod takes lightning damage, its speed is halved until the end of its next turn, and it must succeed on a DC 15 Constitution saving throw or immediately regurgitate all swallowed creatures, each of which lands in a space within 10 feet of the hertilod and has the prone condition.
  - name: Spider Climb
    desc: The hertilod can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Multiattack
    desc: The hertilod makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: |-
      *Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 15 (2d8 + 6) piercing damage plus 13 (2d12) poison damage. If the target is a Large or smaller creature, it must succeed on a DC 20 Strength saving throw or be swallowed by the hertilod. A swallowed creature has the blinded and restrained conditions, and it has total cover against attacks and other effects outside the hertilod. At the start of each of the hertilod's turns, each swallowed creature takes 13 (2d12) poison damage from the poisonous secretion in the hertilod's gullet.

      The hertilod's gullet can hold up to two creatures at a time. If the hertilod takes 40 damage or more on a single turn from a swallowed creature, the hertilod must succeed on a DC 15 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which lands in a space within 10 feet of the hertilod and has the prone condition. If the hertilod dies, a swallowed creature is no longer restrained and can escape from the corpse by using 10 feet of movement, exiting with the prone condition.
  - name: Claw
    desc: "*Melee Weapon Attack:* +12 to hit, reach 5 ft., one target. *Hit:* 17 (2d10 + 6) slashing damage."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the hertilod can expend a use to take one of the following actions. The hertilod regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Sprint
    desc: The hertilod moves up to its speed. This movement doesn't provoke opportunity attacks.
  - name: Feed (Costs 2 Actions)
    desc: The hertilod drains life from the creatures in its gullet to bolster itself. Each creature in the hertilod's gullet takes 10 (3d6) necrotic damage, and the hertilod regains a number of hit points equal to the damage.
```
