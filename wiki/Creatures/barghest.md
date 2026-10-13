---
title: Barghest
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Fiend
size: Large
habitat:
  - Forest
  - Grassland
  - Hill
  - Mountain
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Barghest
size: Large
type: fiend
alignment: Typically Neutral Evil
ac: 17
ac_class: natural armour
hp: 60
hit_dice: 8d10 + 16
modifier: 2
speed: 60 ft. (30 ft. in goblin form)
stats: [ 19, 15, 14, 13, 12, 14 ]
skillsaves:
  - deception: 4
  - intimidation: 4
  - perception: 5
  - stealth: 4
damage_resistances: cold; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: acid, poison
condition_immunities: poisoned
senses: blindsight 60 ft., darkvision 60 ft., passive Perception 15
languages: Abyssal, Common, Goblin, Infernal, telepathy 60 ft.
cr: "4"
traits:
  - name: Fire Banishment
    desc: When the barghest starts its turn engulfed in flames that are at least 10 feet high or wide, it must succeed on a DC 15 Charisma saving throw or be instantly banished to Gehenna
  - name: Soul Feeding
    desc: The barghest can feed on the corpse of a Fey or Humanoid it killed within the past 10 minutes. This feeding takes at least 1 minute, and it destroys the corpse. The victim's soul is trapped in the barghest for 24 hours, after which time it is digested and the person is incapable of being revived. If the barghest dies before the soul is digested, the soul is released. While a soul is trapped in the barghest, any magic that tries to restore the soul to life has a 50 percent chance of failing and being wasted.
actions:
  - name: Multiattack
    desc: The barghest makes one Bite attack and one Claw attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 13 (2d8 + 4) piercing damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) slashing damage."
  - name: Spellcasting
    desc: |-
      The barghest casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 12):

      **At will:** *levitate*, *minor illusion*, *pass without trace*

      **1/day each:** *charm person*, *dimension door*, *suggestion*
bonus_actions:
  - name: Change Shape
    desc: The barghest transforms into a Small goblin or back into its true form. Other than its size and speed, its statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed. The barghest reverts to its true form if it dies.
```
