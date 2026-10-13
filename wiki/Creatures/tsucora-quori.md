---
title: Tsucora Quori
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Tsucora Quori
size: Medium
type: aberration
alignment: Lawful Evil
ac: 16
ac_class: natural armour
hp: 68
hit_dice: 8d8 + 32
modifier: 2
speed: 40 ft.
stats: [ 17, 14, 18, 14, 14, 16 ]
saves:
  - wis: 5
  - cha: 6
skillsaves:
  - insight: 5
  - perception: 5
damage_resistances: psychic
condition_immunities: charmed, frightened
senses: darkvision 60 ft., passive Perception 15
languages: Common, Quori
cr: "7"
traits:
  - name: Innate Spellcasting (Psionics)
    desc: |-
      The quori's spellcasting ability is Charisma (spell save DC 14). It can innately cast the following spells, requiring no components:

      **At will:** *charm person*

      **1/day:** *fear*
actions:
  - name: Multiattack
    desc: "The quori makes three attacks: one pincer attack, one attack with its claws, and one stinger attack."
  - name: Pincer
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d10 + 3) bludgeoning damage. The target is grappled (escape DC 14) if it is a Large or smaller creature. The quori has two pincers, each of which can grapple one target."
  - name: Claws
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 13 (4d4 + 3) slashing damage."
  - name: Stinger
    desc: "*Melee Weapon Attack:* +6 to hit, reach 10 ft., one creature. *Hit:* 8 (1d10 + 3) piercing damage plus 10 (3d6) psychic damage, and the target must succeed on a DC 14 Wisdom saving throw or be frightened of the quori for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Possession (Recharge 6)
    desc: |-
      One humanoid that the quori can see within 5 feet of it must succeed on a DC 14 Charisma saving throw or be possessed by the quori; the quori then disappears, and the target is incapacitated and loses control of its body. The quori now controls the body but doesn't deprive the target of awareness. The quori can't be targeted by any attack, spell, or other effect, and it retains its alignment, Intelligence, Wisdom, Charisma, and immunity to being charmed and frightened. It otherwise uses the possessed target's statistics, but doesn't gain access to the target's knowledge, class features, or proficiencies.

      The possession lasts until the body drops to 0 hit points, the quori ends it as a bonus action, or the quori is forced out by an effect like the *dispel evil and good* spell. When the possession ends, the quori reappears in an unoccupied space within 5 feet of the body. The target is immune to this quori's Possession for 24 hours after succeeding on the saving throw or after the possession ends.
```
