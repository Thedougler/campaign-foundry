---
title: Shadar-kai Gloom Weaver
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Humanoid
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Shadar-kai Gloom Weaver
size: Medium
type: humanoid
subtype: elf
alignment: Typically Neutral Evil
ac: 14
hp: 104
hit_dice: 16d8 + 32
modifier: 4
speed: 30 ft.
stats: [ 11, 18, 14, 15, 12, 18 ]
saves:
  - dex: 8
  - con: 6
damage_immunities: necrotic
condition_immunities: charmed, exhaustion
senses: darkvision 60 ft., passive Perception 11
languages: Common, Elvish
cr: "9"
traits:
  - name: Burden of Time
    desc: Beasts and Humanoids (except elves) have disadvantage on saving throws while within 10 feet of the shadar-kai.
  - name: Fey Ancestry
    desc: The shadar-kai has advantage on saving throws against being charmed, and magic can't put it to sleep.
actions:
  - name: Multiattack
    desc: The shadar-kai makes three Shadow Spear attacks. It can replace one attack with a use of Spellcasting.
  - name: Shadow Spear
    desc: "*Melee or Ranged Weapon Attack:* +8 to hit, reach 5 ft. or range 30/120, one target. *Hit:* 7 (1d6 + 4) piercing damage plus 26 (4d12) necrotic damage. *Hit or Miss:* The spear magically returns to the shadar-kai's hand immediately after a ranged attack."
  - name: Spellcasting
    desc: |-
      The shadar-kai casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 16):

      **At will:** *arcane eye*, *mage armour*, *minor illusion*, *prestidigitation*, *speak with dead*

      **1/day each:** arcane gate, *bane*, *confusion*, *darkness*, *fear*, *major image*, *true seeing*
reactions:
  - name: Misty Escape (Recharge 6–6)
    desc: When the shadar-kai takes damage, it turns invisible and teleports, along with any equipment it is wearing or carrying, up to 60 feet to an unoccupied space it can see. It remains invisible until the start of its next turn or until it attacks or casts a spell.
```
