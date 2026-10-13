---
title: Scion of Grolantor
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 22
creature_type: Giant
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Scion of Grolantor
size: Gargantuan
type: giant
subtype: titan
alignment: typically Chaotic Evil
ac: 18
ac_class: natural armour
hp: 402
hit_dice: 23d20 + 161
modifier: 2
speed: 60 ft.
stats: [ 27, 14, 25, 15, 21, 18 ]
saves:
  - wis: 12
  - cha: 11
skillsaves:
  - perception: 12
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: exhaustion, paralysed, poisoned
senses: passive Perception 22
languages: Giant, Primordial
cr: "22"
traits:
  - name: Legendary Resistance (6/Day)
    desc: If the scion fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The scion has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The scion deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The scion makes one Great Tree Club attack and two Slam attacks, or it makes three Boulder attacks.
  - name: Great Tree Club
    desc: "*Melee Weapon Attack:* +15 to hit, reach 30 ft., one target. *Hit:* 30 (4d10 + 8) bludgeoning damage. If the target is a creature, it must succeed on a DC 23 Strength saving throw or be pushed horizontally up to 100 feet straight away from the scion and have the prone condition."
  - name: Slam
    desc: "*Melee Weapon Attack:* +15 to hit, reach 20 ft., one target. *Hit:* 26 (4d8 + 8) force damage."
  - name: Boulder
    desc: "*Ranged Weapon Attack:* +15 to hit, range 120/480 ft., one target. *Hit:* 27 (3d12 + 8) bludgeoning damage."
  - name: Inhale (Recharge 5–6)
    desc: |-
      The scion inhales a vortex of air in a 120-foot line that is 15 feet wide. Each creature in that area that is Huge or smaller must succeed on a DC 23 Strength saving throw or be pulled up to 120 feet straight toward the scion and be swallowed. A swallowed creature has the restrained condition, has total cover against attacks and other effects outside the scion, and takes 24 (7d6) force damage at the start of each of the scion's turns.

      The scion's stomach can hold up to two creatures at a time. If the scion takes 60 damage or more on a single turn from a creature inside it, the scion must succeed on a DC 17 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the scion and has the prone condition. If the scion dies, any swallowed creature no longer has the restrained condition and can escape from the corpse using 15 feet of movement, exiting with the prone condition.
bonus_actions:
  - name: Earth-Shaking Movement
    desc: The scion moves up to its speed and then sends a shock wave through the ground in a 60-foot-radius circle centred on itself. Each creature on the ground in that area that is concentrating must succeed on a DC 23 Constitution saving throw or lose concentration.
reactions:
  - name: Feed
    desc: Immediately after taking damage, if it has at least one creature swallowed, the scion deals 10 (3d6) force damage to each swallowed creature and regains 10 hit points.
```
