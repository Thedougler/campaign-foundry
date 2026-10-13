---
title: Duergar Mind Master
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Humanoid
size: Medium
habitat:
  - Mountain
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Duergar Mind Master
size: Medium
type: humanoid
subtype: dwarf
alignment: Any alignment
ac: 14
ac_class: leather armour
hp: 39
hit_dice: 6d8 + 12
modifier: 3
speed: 25 ft.
stats: [ 11, 17, 14, 15, 10, 12 ]
saves:
  - wis: 2
skillsaves:
  - perception: 2
  - stealth: 5
damage_resistances: poison
senses: darkvision 120 ft., truesight 30 ft., passive Perception 12
languages: Dwarvish, Undercommon
cr: "2"
traits:
  - name: Duergar Resilience
    desc: The duergar has advantage on saving throws against spells and the charmed, paralysed, and poisoned conditions.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the duergar has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: The duergar makes two Mind-Poison Dagger attacks. It can replace one attack with a use of Mind Mastery.
  - name: Mind-Poison Dagger
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage plus 10 (3d6) psychic damage, or 1 piercing damage plus 10 (3d6) psychic damage while under the effect of Reduce."
  - name: Invisibility (Recharge 4–6)
    desc: The duergar magically turns invisible for up to 1 hour or until it attacks, it forces a creature to make a saving throw, or its concentration is broken (as if concentrating on a spell). Any equipment the duergar wears or carries is invisible with it.
  - name: Mind Mastery
    desc: The duergar targets one creature it can see within 60 feet of it. The target must succeed on a DC 12 Intelligence saving throw, or the duergar causes it to use its reaction, if available, either to make one weapon attack against another creature the duergar can see or to move up to 10 feet in a direction of the duergar's choice. Creatures that can't be charmed are immune to this effect.
bonus_actions:
  - name: Reduce (Recharges after a Short or Long Rest)
    desc: For 1 minute, the duergar magically decreases in size, along with anything it is wearing or carrying. While reduced, the duergar is Tiny, reduces its weapon damage to 1, and makes attack rolls, ability checks, and saving throws with disadvantage if they use Strength. It gains a +5 bonus to all Dexterity (Stealth) checks and a +5 bonus to its AC. It can also take a bonus action on each of its turns to take the Hide action.
```
