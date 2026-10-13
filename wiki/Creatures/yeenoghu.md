---
title: Yeenoghu
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 24
creature_type: Fiend
size: Huge
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Yeenoghu
size: Huge
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 20
ac_class: natural armour
hp: 333
hit_dice: 23d12 + 184
modifier: 3
speed: 50 ft.
stats: [ 29, 16, 26, 16, 24, 15 ]
saves:
  - dex: 10
  - con: 15
  - wis: 14
skillsaves:
  - intimidation: 9
  - perception: 14
damage_resistances: cold, fire, lightning
damage_immunities: poison; bludgeoning, piercing, slashing that is nonmagical
condition_immunities: charmed, exhaustion, frightened, poisoned
gear:
  - flail
senses: truesight 120 ft., passive Perception 24
languages: all, telepathy 120 ft.
cr: "24"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If Yeenoghu fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Yeenoghu has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: Yeenoghu makes three Flail attacks.
  - name: Flail
    desc: |-
      *Melee Weapon Attack:* +16 to hit, reach 15 ft., one target. *Hit:* 22 (2d12 + 9) force damage. If it's his turn, Yeenoghu can cause the target to suffer one of the following additional effects, each of which he can apply only once per turn

      - **Confusion.** The target must succeed on a DC 17 Wisdom saving throw or be affected by the confusion spell until the start of Yeenoghu's next turn.  
      - **Force.** The target takes an extra 13 (2d12) force damage.  
      - **Paralysis.** The target must succeed on a DC 17 Constitution saving throw or be paralysed until the start of Yeenoghu's next turn.  
  - name: Bite
    desc: "*Melee Weapon Attack:* +16 to hit, reach 10 ft., one target. *Hit:* 20 (2d10 + 9) acid damage."
  - name: Spellcasting
    desc: |-
      Yeenoghu casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 17):

      **At will:** *detect magic*

      **3/day each:** *dispel magic*, *fear*, *invisibility*

      **1/day:** *teleport*
bonus_actions:
  - name: Rampage
    desc: When Yeenoghu reduces a creature to 0 hit points with a melee attack, he moves up to half his speed and makes one Bite attack.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Yeenoghu can expend a use to take one of the following actions. Yeenoghu regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Charge
    desc: Yeenoghu moves up to his speed.
  - name: Swat Away
    desc: Yeenoghu makes one Flail attack. If the attack hits, the target must succeed on a DC 24 Strength saving throw or be pushed up to 15 feet in a straight line away from Yeenoghu. If the saving throw fails by 5 or more, the target is also knocked prone.
  - name: Savage (Costs 2 Actions)
    desc: Yeenoghu makes a separate Bite attack against each creature within 10 feet of him.
```
