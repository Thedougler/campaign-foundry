---
title: Bael
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 19
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bael
size: Large
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 18
ac_class: plate
hp: 189
hit_dice: 18d10 + 90
modifier: 3
speed: 30 ft.
stats: [ 24, 17, 20, 21, 24, 24 ]
saves:
  - dex: 9
  - con: 11
  - int: 11
  - cha: 13
skillsaves:
  - intimidation: 13
  - perception: 13
  - persuasion: 13
damage_resistances: cold; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: fire, poison
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: truesight 120 ft., passive Perception 23
languages: all, telepathy 120 ft.
cr: "19"
traits:
  - name: Dread
    desc: Any creature, other than a devil, that starts its turn within 10 feet of Bael must succeed on a DC 22 Wisdom saving throw or be frightened of him until the start of its next turn. A creature succeeds on this saving throw automatically if Bael wishes it or if he is incapacitated.
  - name: Legendary Resistance (3/Day)
    desc: If Bael fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Bael has advantage on saving throws against spells and other magical effects.
  - name: Regeneration
    desc: Bael regains 20 hit points at the start of his turn. If he takes cold or radiant damage, this trait doesn't function at the start of his next turn. Bael dies only if he starts his turn with 0 hit points and doesn't regenerate.
actions:
  - name: Multiattack
    desc: Bael makes two Hellish Morningstar attacks.
  - name: Hellish Morningstar
    desc: "*Melee Weapon Attack:* +13 to hit, reach 20 ft., one target. *Hit:* 16 (2d8 + 7) force damage plus 9 (2d8) necrotic damage."
  - name: Infernal Command
    desc: Each of Bael's allies within 60 feet of him can't be charmed or frightened until the end of his next turn.
  - name: Teleport
    desc: Bael teleports, along with any equipment he is wearing or carrying, up to 120 feet to an unoccupied space he can see.
  - name: Spellcasting
    desc: |-
      Bael casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 21):

      **At will:** *alter self* (can become Medium), *charm person*, *detect magic*, *invisibility*, *major image*

      **3/day each:** *dispel magic*, *fly*, *suggestion*, *wall of fire*

      **1/day:** *dominate monster*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Bael can expend a use to take one of the following actions. Bael regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Fiendish Magic
    desc: Bael uses Spellcasting or Teleport.
  - name: Infernal Command
    desc: Bael uses Infernal Command.
  - name: Attack (Costs 2 Actions)
    desc: Bael makes one Hellish Morningstar attack.
```
