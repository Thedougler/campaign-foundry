---
title: Hutijin
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
name: Hutijin
size: Large
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 19
ac_class: natural armour
hp: 200
hit_dice: 16d10 + 112
modifier: 2
speed: 30 ft., fly 60 ft.
stats: [ 27, 15, 25, 23, 19, 25 ]
saves:
  - dex: 9
  - con: 14
  - wis: 11
skillsaves:
  - intimidation: 14
  - perception: 11
damage_resistances: cold; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: fire, poison
condition_immunities: charmed, exhaustion, frightened, poisoned
gear:
  - mace
senses: truesight 120 ft., passive Perception 21
languages: all, telepathy 120 ft.
cr: "21"
traits:
  - name: Infernal Despair
    desc: Each creature within 30 feet of Hutijin that isn't a devil makes saving throws with disadvantage.
  - name: Legendary Resistance (3/Day)
    desc: If Hutijin fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Hutijin has advantage on saving throws against spells and other magical effects.
  - name: Regeneration
    desc: Hutijin regains 20 hit points at the start of his turn. If he takes radiant damage, this trait doesn't function at the start of his next turn. Hutijin dies only if he starts his turn with 0 hit points and doesn't regenerate.
actions:
  - name: Multiattack
    desc: Hutijin makes one Bite attack, one Claw attack, one Mace attack, and one Tail attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +15 to hit, reach 5 ft., one target. *Hit:* 15 (2d6 + 8) fire damage. The target must succeed on a DC 22 Constitution saving throw or become poisoned. While poisoned in this way, the target can't regain hit points, and it takes 10 (3d6) poison damage at the start of each of its turns. The poisoned target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Claw
    desc: "*Melee Weapon Attack:* +15 to hit, reach 10 ft., one target. *Hit:* 17 (2d8 + 8) cold damage."
  - name: Mace
    desc: "*Melee Weapon Attack:* +15 to hit, reach 5 ft., one target. *Hit:* 15 (2d6 + 8) force damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +15 to hit, reach 10 ft., one target. *Hit:* 19 (2d10 + 8) thunder damage."
  - name: Teleport
    desc: Hutijin teleports, along with any equipment he is wearing and carrying, up to 120 feet to an unoccupied space he can see.
  - name: Spellcasting
    desc: |-
      Hutijin casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 22):

      **At will:** *alter self* (can become Medium when changing his appearance), *detect magic*, *hold monster*, *invisibility* (self only), *lightning bolt*, *suggestion*, *wall of fire*

      **3/day:** *dispel magic*
reactions:
  - name: Fearful Voice (Recharge 5–6)
    desc: In response to taking damage, Hutijin utters a dreadful word of power. Each creature within 30 feet of him that isn't a devil must succeed on a DC 22 Wisdom saving throw or become frightened of him for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. A creature that saves against this effect is immune to his Fearful Voice for 24 hours.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Hutijin can expend a use to take one of the following actions. Hutijin regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Attack
    desc: Hutijin makes one Claw, Mace, or Tail attack.
  - name: Teleport
    desc: Hutijin uses Teleport.
  - name: Lightning Storm (Costs 2 Actions)
    desc: Hutijin releases lightning in a 30-foot radius, blocked only by total cover. All other creatures in that area must each make a DC 22 Dexterity saving throw, taking 18 (4d8) lightning damage on a failed save, or half as much damage on a successful one.
```
