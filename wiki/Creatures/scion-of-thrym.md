---
title: Scion of Thrym
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 24
creature_type: Giant
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Scion of Thrym
size: Gargantuan
type: giant
subtype: titan
alignment: typically Neutral Evil
ac: 19
ac_class: natural armour
hp: 499
hit_dice: 27d20 + 216
modifier: 3
speed: 60 ft.
stats: [ 30, 16, 27, 17, 20, 21 ]
saves:
  - wis: 12
  - cha: 12
skillsaves:
  - athletics: 17
  - perception: 12
damage_resistances: fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: cold
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified
senses: truesight 120 ft., passive Perception 22
languages: Giant, Primordial
cr: "24"
traits:
  - name: Legendary Resistance (6/Day)
    desc: If the scion fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The scion has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The scion deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The scion makes one Ice Axe and two Slam attacks, or it makes two Glacier Throw attacks.
  - name: Ice Axe
    desc: "*Melee Weapon Attack:* +17 to hit, reach 30 ft., one target. *Hit:* 36 (4d12 + 10) force damage plus 18 (4d8) cold damage."
  - name: Slam
    desc: "*Melee Weapon Attack:* +17 to hit, reach 20 ft., one target. *Hit:* 32 (4d10 + 10) force damage."
  - name: Glacier Throw
    desc: "*Ranged Weapon Attack:* +17 to hit, range 120/480 ft., one target. *Hit:* 36 (4d12 + 10) bludgeoning damage plus 14 (4d6) cold damage, and the target must succeed on a DC 25 Strength saving throw or have the prone condition."
  - name: Glacial Upheaval (Recharge 5–6)
    desc: |-
      The scion digs its hands into the ground at a point it can see within 30 feet of itself and launches a magically conjured mass of ice into the air. Each creature other than the scion in a 30-foot-radius, 100-foot-high cylinder centred on that point must make a DC 25 Dexterity saving throw. On a failed save, a creature takes 36 (8d8) bludgeoning damage plus 19 (3d12) cold damage and is pushed vertically to the top of the cylinder, at which point the creature falls. On a successful save, a creature takes half as much damage and is pushed to the nearest unoccupied space outside the cylinder with no additional effects.

      At the start of the scion's next turn, a mass of ice plummets to the ground on a point the scion can see within 60 feet of the point the scion dug its hands into. Each creature in a 30-foot-radius, 100-foot-high cylinder centred on that point must succeed on a DC 25 Dexterity saving throw or take 18 (4d8) bludgeoning damage plus 18 (4d8) cold damage.
bonus_actions:
  - name: Earth-Shaking Movement
    desc: The scion moves up to its speed and sends a shock wave through the ground in a 60-foot-radius circle centred on itself. Each creature on the ground in that area that is concentrating must succeed on a DC 25 Constitution saving throw or lose concentration.
```
