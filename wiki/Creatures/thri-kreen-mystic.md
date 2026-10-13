---
title: Thri-kreen Mystic
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Thri-kreen Mystic
size: Medium
type: monstrosity
alignment: Any alignment
ac: 15
ac_class: natural armour
hp: 99
hit_dice: 18d8 + 18
modifier: 2
speed: 30 ft.
stats: [ 12, 15, 13, 12, 16, 10 ]
skillsaves:
  - perception: 6
  - stealth: 5
  - survival: 6
senses: darkvision 60 ft., passive Perception 16
languages: telepathy 60 ft., Thri-kreen
cr: "5"
actions:
  - name: Multiattack
    desc: The thri-kreen makes two Gythka attacks or four Psychic Bolt attacks.
  - name: Gythka
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 10 (2d8 + 1) slashing damage."
  - name: Psychic Bolt
    desc: "*Ranged Spell Attack:* +6 to hit, range 60 ft., one creature. *Hit:* 6 (1d6 + 3) psychic damage."
  - name: Drain Vitality (Recharges after a Short or Long Rest)
    desc: The thri-kreen targets one creature it can see within 30 feet of itself. The target must make a DC 14 Constitution saving throw, taking 32 (5d12) necrotic damage on a failed save, or half as much damage on a successful one. The thri-kreen regains hit points equal to the damage dealt.
  - name: Spellcasting (Psionics)
    desc: |-
      The thri-kreen casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability:

      **At will:** *levitate* (self only), *mage hand* (the hand is invisible)

      **1/day each:** *freedom of movement* (self only), *invisibility* (self only)
bonus_actions:
  - name: Chameleon Carapace
    desc: The thri-kreen changes the colour of its carapace to match the colour and texture of its surroundings, gaining advantage on Dexterity (Stealth) checks it makes to hide in those surroundings.
```
