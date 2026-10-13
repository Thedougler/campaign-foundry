---
title: Dybbuk
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Fiend
size: Medium
habitat:
  - Desert
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dybbuk
size: Medium
type: fiend
subtype: demon
alignment: Typically Chaotic Evil
ac: 14
hp: 37
hit_dice: 5d8 + 15
modifier: 4
speed: 40 ft. (hover)
stats: [ 6, 19, 16, 16, 15, 14 ]
skillsaves:
  - deception: 6
  - intimidation: 4
  - perception: 4
damage_resistances: acid; cold; fire; lightning; thunder; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained
senses: darkvision 120 ft., passive Perception 14
languages: Abyssal, Common, telepathy 120 ft.
cr: "4"
traits:
  - name: Incorporeal Movement
    desc: The dybbuk can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
  - name: Magic Resistance
    desc: The dybbuk has advantage on saving throws against spells and other magical effects.
actions:
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 13 (2d8 + 4) necrotic damage. If the target is a creature, its hit point maximum is also reduced by 3 (1d6). This reduction lasts until the target finishes a short or long rest. The target dies if its hit point maximum is reduced to 0."
  - name: Possess Corpse (Recharge 6)
    desc: The dybbuk disappears into an intact corpse within 5 feet of it that belonged to a Large or smaller Beast or Humanoid. The dybbuk gains 20 temporary hit points. While possessing the corpse, the dybbuk adopts the corpse's size and can't use Incorporeal Movement. Its game statistics otherwise remain the same. The possession lasts until the temporary hit points are lost or the dybbuk ends it as a bonus action. When the possession ends, the dybbuk appears in an unoccupied space within 5 feet of the corpse.
  - name: Spellcasting
    desc: |-
      The dybbuk casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 12):

      **At will:** *dimension door*

      **3/day:** *phantasmal force*
bonus_actions:
  - name: Control Corpse
    desc: While Possess Corpse is active, the dybbuk makes the corpse do something unnatural, such as vomit blood, twist its head all the way around, or cause a quadruped to move as a biped. Any Beast or Humanoid that sees this behaviour must succeed on a DC 12 Wisdom saving throw or become frightened of the dybbuk for 1 minute. The frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. A creature that succeeds on a saving throw against this ability is immune to Control Corpse for 24 hours.
```
