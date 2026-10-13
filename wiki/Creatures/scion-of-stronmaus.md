---
title: Scion of Stronmaus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 27
creature_type: Giant
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Scion of Stronmaus
size: Gargantuan
type: giant
subtype: titan
alignment: typically Chaotic Good
ac: 20
ac_class: natural armour
hp: 656
hit_dice: 32d20 + 320
modifier: 5
speed: 60 ft., fly 80 ft. (hover), swim 80 ft.
stats: [ 30, 20, 30, 26, 28, 24 ]
saves:
  - dex: 13
  - int: 16
skillsaves:
  - arcana: 16
  - history: 16
  - perception: 17
damage_resistances: cold; fire; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: lightning, thunder
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, prone
senses: truesight 120 ft., passive Perception 27
languages: Giant, Primordial
cr: "27"
traits:
  - name: Flyby
    desc: The scion doesn't provoke opportunity attacks when it flies out of an enemy's reach.
  - name: Legendary Resistance (6/Day)
    desc: If the scion fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The scion has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The scion deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The scion makes one attack using Lightning Sword or Hailstone, as well as two Slam attacks.
  - name: Lightning Sword
    desc: "*Melee Weapon Attack:* +18 to hit, reach 30 ft., one target. *Hit:* 36 (4d12 + 10) force damage plus 22 (4d10) lightning damage."
  - name: Hailstone
    desc: "*Ranged Weapon Attack:* +18 to hit, range 120/480 ft., one target. *Hit:* 32 (4d10 + 10) bludgeoning damage plus 18 (4d8) cold damage, and the target must succeed on a DC 26 Strength saving throw or have the prone condition."
  - name: Slam
    desc: "*Melee Weapon Attack:* +18 to hit, reach 20 ft., one target. *Hit:* 36 (4d12 + 10) force damage."
bonus_actions:
  - name: Vengeful Storm (Recharge 6)
    desc: |-
      The scion conjures a churning storm cloud in a 30-foot-radius, 10-foot-tall cylinder centred on a point within 120 feet of itself. The cloud's area is heavily obscured. The cloud lasts for 1 minute, until the scion dies, or when the scion uses this bonus action again.

      When the cloud appears, and as a bonus action on later turns, the scion can move the cloud up to 30 feet and cause one of the following effects in a 30-foot-radius, 120-foot-high cylinder directly below it; the scion can't choose the same effect two rounds in a row:
  - name: Acid Rain
    desc: The cloud rains acid. Each creature in the cylinder must succeed on a DC 25 Constitution saving throw or be covered in acid for 1 minute or until a creature uses its action to remove the acid from itself or another creature. A creature covered in the acid takes 26 (4d12) acid damage at the start of each of its turns.
  - name: Freezing Storm
    desc: Shards of ice pelt down, and freezing wind fills the area. Each creature in the cylinder must succeed on a DC 25 Dexterity saving throw or take 28 (8d6) cold damage and be hindered by ice formations for 1 minute or until it or another creature within reach of it uses an action to break away the ice. A creature hindered by ice has its speed reduced to 0.
  - name: Lightning Bolts
    desc: Bolts of lightning strike down. Each creature in the cylinder must succeed on DC 25 Dexterity saving throw or take 18 (4d8) lightning damage and have the stunned condition until the end of its next turn.
```
