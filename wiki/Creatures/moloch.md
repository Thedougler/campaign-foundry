---
title: Moloch
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 21
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
name: Moloch
size: Large
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 19
ac_class: natural armour
hp: 253
hit_dice: 22d10 + 132
modifier: 4
speed: 30 ft.
stats: [ 26, 19, 22, 21, 18, 23 ]
saves:
  - dex: 11
  - con: 13
  - wis: 11
  - cha: 13
skillsaves:
  - deception: 13
  - intimidation: 13
  - perception: 11
damage_resistances: cold; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: fire, poison
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: darkvision 120 ft., passive Perception 21
languages: all, telepathy 120 ft.
cr: "21"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If Moloch fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Moloch has advantage on saving throws against spells and other magical effects.
  - name: Regeneration
    desc: Moloch regains 20 hit points at the start of his turn. If he takes radiant damage, this trait doesn't function at the start of his next turn. Moloch dies only if he starts his turn with 0 hit points and doesn't regenerate.
actions:
  - name: Multiattack
    desc: Moloch makes one Bite attack, one Claw attack, and one Many-Tailed Whip attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +15 to hit, reach 5 ft., one target. *Hit:* 26 (4d8 + 8) fire damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +15 to hit, reach 10 ft., one target. *Hit:* 17 (2d8 + 8) force damage."
  - name: Many-Tailed Whip
    desc: "*Melee Weapon Attack:* +15 to hit, reach 30 ft., one target. *Hit:* 13 (2d4 + 8) lightning damage plus 11 (2d10) thunder damage. If the target is a creature, it must succeed on a DC 24 Strength saving throw or be pulled up to 30 feet in a straight line toward Moloch."
  - name: Breath of Despair (Recharge 5–6)
    desc: Moloch exhales in a 30-foot cube. Each creature in that area must succeed on a DC 21 Wisdom saving throw or take 27 (5d10) psychic damage, drop whatever it is holding, and become frightened of Moloch for 1 minute. While frightened in this way, a creature must take the Dash action and move away from Moloch by the safest available route on each of its turns, unless there is nowhere to move, in which case it needn't take the Dash action. If the creature ends its turn in a location where it doesn't have line of sight to Moloch, the creature can repeat the saving throw, ending the effect on itself on a success.
  - name: Teleport
    desc: Moloch teleports, along with any equipment he is wearing or carrying, up to 120 feet to an unoccupied space he can see.
  - name: Spellcasting
    desc: |-
      Moloch casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 21):

      **At will:** *alter self* (can become Medium when changing his appearance), *confusion*, *detect magic*, *fly*, *major image*, *stinking cloud*, *suggestion*, *wall of fire*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Moloch can expend a use to take one of the following actions. Moloch regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Attack
    desc: Moloch makes one Bite, Claw, or Many-Tailed Whip attack.
  - name: Teleport
    desc: Moloch uses Teleport.
  - name: Cast a Spell (Costs 2 Actions)
    desc: Moloch uses Spellcasting.
```
