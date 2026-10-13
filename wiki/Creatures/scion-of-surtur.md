---
title: Scion of Surtur
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 25
creature_type: Giant
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Scion of Surtur
size: Gargantuan
type: giant
subtype: titan
alignment: typically Lawful Evil
ac: 20
ac_class: natural armour
hp: 546
hit_dice: 28d20 + 252
modifier: 3
speed: 60 ft.
stats: [ 30, 17, 28, 21, 24, 20 ]
saves:
  - dex: 11
  - cha: 13
skillsaves:
  - athletics: 18
  - perception: 15
damage_resistances: cold; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: fire
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified
senses: truesight 120 ft., passive Perception 25
languages: Giant, Primordial
cr: "25"
traits:
  - name: Legendary Resistance (6/Day)
    desc: If the scion fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The scion has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The scion deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The scion makes one attack using Lava Blade or Lava Ball, as well as two Slam attacks.
  - name: Lava Blade
    desc: "*Melee Weapon Attack:* +18 to hit, reach 30 ft., one target. *Hit:* 32 (4d10 + 10) slashing damage plus 18 (4d8) fire damage."
  - name: Lava Ball
    desc: "*Ranged Weapon Attack:* +18 to hit, range 120/480 ft., one target. *Hit:* 29 (3d12 + 10) bludgeoning damage plus 10 (3d6) fire damage, and the target must succeed on a DC 26 Strength saving throw or have the prone condition."
  - name: Slam
    desc: "*Melee Weapon Attack:* +18 to hit, reach 20 ft., one target. *Hit:* 28 (4d8 + 10) force damage."
  - name: Lava Wave (Recharge 5–6)
    desc: The scion emits a wave of lava from its blade, hands, or mouth in a 90-foot cone. Each creature in that area must make a DC 25 Dexterity saving throw. On a failed save, a creature takes 60 (11d10) fire damage and has the restrained condition from being embedded in hardening rock. A creature can make a DC 25 Strength (Athletics) check as an action, freeing itself or a creature within reach from the rock on a success. The rock has AC 17 and 40 hit points, and it is immune to fire, poison, and psychic damage. On a successful save, a creature takes half as much damage only.
bonus_actions:
  - name: Earth-Shaking Movement
    desc: The scion moves up to its speed and then sends a shock wave through the ground in a 60-foot-radius circle centred on itself. Each creature on the ground in that area that is concentrating must succeed on a DC 26 Constitution saving throw or lose concentration.
  - name: Incendiary Smoke
    desc: The scion causes smoke and white-hot embers to billow from its skin, filling a 30-foot-radius sphere centred on itself that moves with it. While the scion's skin billows smoke, ranged attacks against the scion are made with disadvantage. A creature that moves into the smoke for the first time on a turn or starts its turn there must succeed on a DC 25 Constitution saving throw or take 14 (4d6) fire damage. The scion's skin stops billowing smoke after 1 minute, when the scion dies, or when the scion uses this bonus action to stop the smoke.
```
