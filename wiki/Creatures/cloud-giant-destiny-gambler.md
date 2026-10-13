---
title: Cloud Giant Destiny Gambler
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 19
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cloud Giant Destiny Gambler
size: Huge
type: giant
subtype: bard
alignment: Any alignment
ac: 15
ac_class: natural armour
hp: 337
hit_dice: 27d12 + 162
modifier: 1
speed: 40 ft., fly 40 ft. (hover)
stats: [ 27, 12, 22, 19, 16, 22 ]
saves:
  - con: 12
  - int: 10
  - wis: 9
  - cha: 12
skillsaves:
  - deception: 18
  - insight: 9
  - perception: 9
damage_immunities: thunder
senses: truesight 30 ft. (requires cloud rune), passive Perception 19
languages: Common, Giant
cr: "19"
traits:
  - name: Cloud Rune
    desc: |-
      The giant has a cloud rune inscribed on a mask in its possession. While holding or wearing the mask bearing the rune, the giant has truesight within a range of 30 feet and can use its Thunderous Clap action and Negate Spell reaction.

      The mask bearing the cloud rune has AC 15; 45 hit points; and immunity to necrotic, poison, and psychic damage. The mask regains all its hit points at the end of every turn, but it turns to dust if reduced to 0 hit points or when the giant dies. If the rune is destroyed, the giant can inscribe a cloud rune on a mask in its possession when it finishes a short or long rest.
actions:
  - name: Multiattack
    desc: The giant makes three Flying Staff attacks.
  - name: Flying Staff
    desc: "*Melee or Ranged Weapon Attack:* +14 to hit, reach 10 ft. or range 30/90 ft., one target. *Hit:* 18 (3d6 + 8) bludgeoning damage plus 16 (3d10) thunder damage. *Hit or Miss:* The staff magically returns to the giant's hand immediately after a ranged attack."
  - name: Thunderous Clap (Requires Cloud Rune)
    desc: |-
      The giant magically summons a thundercloud that fills a 30-foot-radius sphere centred on a point the giant can see within 60 feet of itself. The cloud spreads around corners. Each creature in that area must make a DC 20 Constitution saving throw as the cloud emits a thunderous boom. On a failed save, a creature takes 52 (8d12) thunder damage and has the prone condition. On a successful save, a creature takes half as much damage only. The thunderclap is audible within 300 feet of the cloud's center point.

      The cloud's area is heavily obscured. The cloud lingers until the start of the giant's next turn or until a strong wind disperses it.
  - name: Spellcasting
    desc: |-
      The giant casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 20):

      **At will:** *detect magic*, *fog cloud*, *light*, *minor illusion*

      **1/day each:** *dream* (as an action), *gaseous form*, *major image*
reactions:
  - name: Negate Spell (Requires Cloud Rune)
    desc: When the giant sees a creature within 60 feet of itself casting a spell, the giant tries to interrupt it. If the creature is casting a spell using a spell slot of 3rd level or lower, the spell fails and has no effect. If the creature is casting a spell of 4th level or higher, it must succeed on a DC 18 Intelligence saving throw, or the spell fails and has no effect.
```
