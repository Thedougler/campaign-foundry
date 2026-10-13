---
title: Scion of Skoraeus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 23
creature_type: Giant
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Scion of Skoraeus
size: Gargantuan
type: giant
subtype: titan
alignment: typically Neutral
ac: 19
ac_class: natural armour
hp: 444
hit_dice: 24d20 + 192
modifier: 5
speed: 60 ft.
stats: [ 29, 20, 26, 19, 24, 14 ]
saves:
  - dex: 12
  - wis: 14
skillsaves:
  - acrobatics: 12
  - perception: 14
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: acid
condition_immunities: charmed, frightened, paralysed, petrified
senses: truesight 120 ft., passive Perception 24
languages: Giant, Primordial
cr: "23"
traits:
  - name: Legendary Resistance (6/Day)
    desc: If the scion fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The scion has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The scion deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The scion makes one Crystal Club attack and two Slam attacks, then uses Entombing Grasp if available. Alternatively, the scion makes two Runic Boulder attacks.
  - name: Crystal Club
    desc: "*Melee Weapon Attack:* +16 to hit, reach 30 ft., one target. *Hit:* 35 (4d12 + 9) bludgeoning damage. *Hit or Miss:* The scion can cause the club to flare with bright light, and the target must succeed on a DC 22 Constitution saving throw or take 18 (4d8) radiant damage and have the blinded condition until the start of the scion's next turn."
  - name: Slam
    desc: "*Melee Weapon Attack:* +16 to hit, reach 20 ft., one target. *Hit:* 31 (4d10 + 9) force damage."
  - name: Runic Boulder
    desc: "*Ranged Weapon Attack:* +16 to hit, range 120/480 ft., one target. *Hit:* 27 (4d8 + 9) bludgeoning damage. *Hit or Miss:* The boulder explodes. The target and each creature within 30 feet of it must make a DC 22 Dexterity saving throw. On a failed save, a creature takes 19 (3d12) force damage and has the prone condition. On a successful save, a creature takes half as much damage only."
  - name: Entombing Grasp (Recharge 6)
    desc: The scion wreathes its hand in petrifying magic and touches one Huge or smaller creature it can see within 20 feet of itself. The target must succeed on a DC 24 Dexterity saving throw or take 28 (8d6) force damage and have the grappled condition (escape DC 19). At the start of the scion's next turn, if the target is still grappled, the target has the petrified condition.
bonus_actions:
  - name: Earth-Shaking Movement
    desc: The scion moves up to its speed and then sends a shock wave through the ground in a 60-foot radius circle centred on itself. Each creature on the ground in that area that is concentrating must succeed on a DC 24 Constitution saving throw or lose concentration.
```
