---
title: Aurnozci
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 22
creature_type: Fiend
size: Gargantuan
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Aurnozci
size: Gargantuan
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 16
ac_class: natural armour
hp: 370
hit_dice: 20d20 + 160
modifier: 5
speed: 50 ft., burrow 30 ft.
stats: [ 27, 20, 26, 6, 21, 19 ]
saves:
  - str: 15
  - con: 15
damage_resistances: cold, lightning
damage_immunities: acid; fire; poison; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: truesight 120 ft., passive Perception 15
languages: Abyssal, telepathy 120 ft.
cr: "22"
traits:
  - name: Heat Regeneration
    desc: If the temperature around it is 100 degrees Fahrenheit or higher, Aurnozci regains 15 hit points at the start of its turn. If it takes cold or radiant damage, this trait doesn't function at the start of its next turn. Aurnozci dies only if it starts its turn with 0 hit points and doesn't regenerate.
  - name: Legendary Resistance (3/Day)
    desc: If Aurnozci fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: Aurnozci has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: Aurnozci makes one Bite attack and two Tail attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +15 to hit, reach 10 ft., one target. *Hit:* 21 (2d12 + 8) slashing damage plus 9 (2d8) fire damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +15 to hit, reach 10 ft., one target. *Hit:* 17 (2d8 + 8) bludgeoning damage."
  - name: Mucus Spray (Recharge 5–6)
    desc: Aurnozci sprays mucus in a 60-foot cone. Each creature in that cone must make a DC 20 Dexterity saving throw, taking 42 (12d6) acid damage on a failed save, or half as much damage on a successful one.
  - name: Spellcasting
    desc: |-
      Aurnozci casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 20):

      **At will:** *Detect Magic*, *Heat Metal* (7th-level version)

      **2/day each:** *Darkness*, *Dispel Magic*, *Hold Person*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Aurnozci can expend a use to take one of the following actions. Aurnozci regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Move
    desc: Aurnozci moves up to its speed.
  - name: Tail
    desc: Aurnozci makes one Tail attack.
  - name: Cast a Spell (Costs 2 Actions)
    desc: Aurnozci uses Spellcasting.
  - name: Conflagration (Costs 2 Actions)
    desc: Flames momentarily surround Aurnozci. Each creature within 15 feet of Aurnozci must make a DC 20 Dexterity saving throw, taking 18 (4d8) fire damage on a failed save, or half as much damage on a successful one.
```
