---
title: Kelubar Demodand
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Kelubar Demodand
size: Medium
type: fiend
alignment: typically Neutral Evil
ac: 18
ac_class: natural armour
hp: 187
hit_dice: 22d8 + 88
modifier: 1
speed: 30 ft., fly 60 ft.
stats: [ 22, 13, 18, 14, 15, 18 ]
saves:
  - dex: 6
  - wis: 7
skillsaves:
  - insight: 7
damage_resistances: cold, fire
damage_immunities: acid, poison
condition_immunities: paralysed, poisoned, restrained
senses: darkvision 120 ft., passive Perception 12
languages: Abyssal, Demodand, telepathy 120 ft.
cr: "13"
traits:
  - name: Acidic Secretions
    desc: A creature that touches the kelubar or hits it with a melee attack while within 5 feet of it takes 5 (2d4) acid damage.
  - name: Boundless Movement
    desc: The kelubar ignores difficult terrain, and magical effects can't reduce its speed. It can spend 5 feet of movement to automatically remove the grappled condition from itself.
  - name: Magic Resistance
    desc: The kelubar has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The kelubar makes two Bite attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 11 (1d10 + 6) piercing damage plus 18 (4d8) acid damage."
  - name: Spit Acid
    desc: The kelubar spits acid in a line 60 feet long and 5 feet wide. Each creature in that area must make a DC 17 Dexterity saving throw, taking 27 (6d8) acid damage on a failed save, or half as much damage on a successful one.
  - name: Summon Demodand (1/Day)
    desc: The kelubar has a 40 percent chance of summoning its choice of 1d2 farastu demodands or 1 kelubar demodand. A summoned demodand appears in an unoccupied space within 60 feet of the kelubar, acts as an ally of the kelubar, and can't summon other demodands. It remains for 1 minute, until it or the kelubar dies, or until the kelubar dismisses it as an action.
  - name: Spellcasting
    desc: |-
      The kelubar casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 17):

      **At will:** *invisibility* (self only)

      **1/day each:** *dispel magic*, *scrying* (as an action)
bonus_actions:
  - name: Nauseating Fog (Recharge 6)
    desc: The kelubar magically creates a cloud of greenish fog that fills a 20-foot-radius sphere centred on a point within 120 feet of itself. The cloud remains for 1 minute or until the kelubar uses this bonus action again. The cloud is heavily obscured and difficult terrain. Any creature that starts its turn in the cloud or enters the cloud for the first time on a turn must succeed on a DC 17 Constitution saving throw or have the poisoned condition until the end of its next turn.
```
