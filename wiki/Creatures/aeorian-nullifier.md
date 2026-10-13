---
title: Aeorian Nullifier
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Monstrosity
size: Large
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Aeorian Nullifier
size: Large
type: monstrosity
alignment: Neutral Evil
ac: 17
ac_class: natural armour
hp: 180
hit_dice: 19d10 + 76
modifier: 2
speed: 40 ft.
stats: [ 19, 14, 18, 7, 14, 18 ]
saves:
  - wis: 6
  - cha: 8
skillsaves:
  - perception: 6
  - survival: 6
damage_immunities: necrotic, radiant
senses: darkvision 120 ft., passive Perception 16
languages: understands Draconic but can't speak
cr: "12"
traits:
  - name: Innate Spellcasting
    desc: |-
      The nullifier's innate spellcasting ability is Charisma (spell save DC 16). It can innately cast the following spells, requiring no material components:

      **At will:** *counterspell* (see "Reactions" below), *detect magic*, *dispel magic*, *see invisibility*

      **1/day:** *antimagic field*
  - name: Horrid Gnashing
    desc: |-
      The nullifier's mouths gnash incoherently while it can see any enemies. Each creature that starts its turn within 20 feet of the nullifier and can hear it must make a DC 16 Wisdom saving throw. Unless the save succeeds, the creature rolls a d8 to determine what it does during the current turn:

      - **1–4.** The creature is stunned until the end of the turn.  
      - **5–6.** The creature is frightened until the end of the turn and uses its movement to get as far as possible from the nullifier.  
      - **7–8.** The creature doesn't move, and it uses its action to make one melee attack against a random creature (other than itself) if one is within reach. It otherwise does nothing  
  - name: Magic Resistance
    desc: The nullifier has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: "The nullifier makes three attacks: one with its bites and two with its claws."
  - name: Bites
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one creature. *Hit:* 17 (2d12 + 4) piercing damage plus 11 (2d10) force damage."
  - name: Claws
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 11 (2d6 + 4) slashing damage plus 11 (2d10) force damage, and the target is grappled (escape DC 16) if it's a creature. The nullifier has two claws, each of which can grapple one creature."
reactions:
  - name: Counterspell
    desc: The nullifier attempts to interrupt a creature that it can see within 60 feet in the process of casting a spell. If the creature is casting a spell of 3rd level or lower, its spell fails and has no effect. If it is casting a spell of 4th level or higher, the nullifier makes a Charisma check with a DC equal to 10 + the spell's level. On a success, the creature's spell fails and has no effect.
```
