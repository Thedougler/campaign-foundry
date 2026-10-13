---
title: Maurezhi
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Fiend
size: Medium
habitat:
  - Swamp
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Maurezhi
size: Medium
type: fiend
subtype: demon
alignment: Typically Chaotic Evil
ac: 15
ac_class: natural armour
hp: 88
hit_dice: 16d8 + 16
modifier: 3
speed: 30 ft.
stats: [ 14, 17, 12, 11, 12, 15 ]
skillsaves:
  - deception: 5
damage_resistances: cold; fire; lightning; necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: charmed, exhaustion, poisoned
senses: darkvision 120 ft., passive Perception 11
languages: Abyssal, Elvish, telepathy 120 ft.
cr: "7"
traits:
  - name: Assume Form
    desc: The maurezhi can assume the appearance of any Medium Humanoid it eats. It remains in this form for 1d6 days, during which time the form gradually decays until, when the effect ends, the form sloughs from the demon's body.
  - name: Magic Resistance
    desc: The maurezhi has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The maurezhi makes one Bite attack and one Claw attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 14 (2d10 + 3) piercing damage. If the target is a Humanoid, its Charisma score is reduced by 1d4. This reduction lasts until the target finishes a short or long rest. The target dies if this reduces its Charisma to 0. It rises 24 hours later as a ghoul unless it has been revived or its corpse has been destroyed."
  - name: Claw
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 12 (2d8 + 3) slashing damage. If the target is a creature other than an Undead, it must succeed on a DC 12 Constitution saving throw or be paralysed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Raise Ghoul (Recharge 5–6)
    desc: The maurezhi targets one dead ghoul or ghast it can see within 30 feet of it. The target is revived with all its hit points.
```
