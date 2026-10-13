---
title: Fire Giant Forgecaller
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fire Giant Forgecaller
size: Huge
type: giant
subtype: cleric
alignment: Any alignment
ac: 18
ac_class: plate
hp: 312
hit_dice: 25d12 + 150
modifier: 0
speed: 30 ft., fly 30 ft. (hover)
stats: [ 25, 11, 23, 16, 21, 18 ]
saves:
  - dex: 6
  - int: 9
  - wis: 11
skillsaves:
  - athletics: 13
  - perception: 11
damage_immunities: fire
senses: passive Perception 21
languages: Common, Giant
cr: "18"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the giant fails a saving throw, it can choose to succeed instead.
  - name: Fire Rune
    desc: |-
      The giant has a fire rune inscribed on a medallion or some other object in its possession. While holding or wearing the object bearing the rune, the giant can use its Magma Wave action and Furnace Armour bonus action.

      The object bearing the rune has AC 15; 40 hit points; and immunity to necrotic, poison, and psychic damage. The object regains all its hit points at the end of every turn, but it turns to dust if reduced to 0 hit points or when the giant dies. If the rune is destroyed, the giant can inscribe a fire rune on an object in its possession when it finishes a short or long rest.
actions:
  - name: Multiattack
    desc: The giant makes three Forge Hammer attacks or two Heated Rock attacks.
  - name: Forge Hammer
    desc: "*Melee Weapon Attack:* +13 to hit, reach 10 ft., one target. *Hit:* 24 (5d6 + 7) bludgeoning damage. *Hit or Miss:* The giant can cause the hammer to emit a burst of heat in a 30-foot-radius sphere centred on the target. Metal objects in that area glow red-hot until the start of the giant's next turn. Any creature in physical contact with a heated object at the start of its turn must make a DC 19 Constitution saving throw. On a failed save, the creature takes 10 (3d6) fire damage and has disadvantage on attack rolls until the start of its next turn unless it has immunity to fire damage. The hammer can emit heat in this way only once per turn."
  - name: Heated Rock
    desc: "*Ranged Weapon Attack:* +13 to hit, range 60/240 ft., one target. *Hit:* 23 (3d10 + 7) bludgeoning damage plus 19 (3d12) fire damage. If the target is a Large or smaller creature, it must succeed on a DC 21 Strength saving throw or have the prone condition. After the giant throws the rock, roll a d6; on a roll of 3 or lower, the giant has no more rocks to throw."
  - name: Magma Wave (Requires Fire Rune)
    desc: The giant emits a wave of magma from its fire rune in a 30-foot cone. Each creature in that area must make a DC 19 Dexterity saving throw. On a failed save, a creature takes 36 (8d8) fire damage and has the restrained condition. As an action, a creature can make a DC 19 Strength (Athletics) check, freeing itself or a creature within its reach from the rock on a success. The rock restraining each creature has AC 17; 20 hit points; and immunity to fire, poison, and psychic damage. On a successful save, a creature takes half as much damage only.
bonus_actions:
  - name: Furnace Armour (Requires Fire Rune)
    desc: The giant causes smoke and cinders to billow from its armour, filling a 30-foot-radius sphere centred on the giant. While the armour is billowing smoke, the giant has half cover. The armour stops billowing smoke after 1 minute, when the giant dies, when the giant uses a bonus action to end the effect, or when the giant's fire rune is destroyed.
```
