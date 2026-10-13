---
title: Thri-kreen Hunter
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Thri-kreen Hunter
size: Medium
type: monstrosity
alignment: Any alignment
ac: 16
ac_class: natural armour
hp: 60
hit_dice: 11d8 + 11
modifier: 3
speed: 30 ft.
stats: [ 15, 16, 13, 10, 14, 9 ]
skillsaves:
  - perception: 4
  - stealth: 5
  - survival: 6
senses: darkvision 60 ft., passive Perception 14
languages: telepathy 60 ft., Thri-kreen
cr: "2"
actions:
  - name: Multiattack
    desc: The thri-kreen makes two Gythka or Chatkcha attacks.
  - name: Gythka
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 6 (1d8 + 2) slashing damage."
  - name: Chatkcha
    desc: "*Ranged Weapon Attack:* +5 to hit, range 30/120 ft., one target. *Hit:* 6 (1d6 + 3) slashing damage."
bonus_actions:
  - name: Chameleon Carapace
    desc: The thri-kreen changes the colour of its carapace to match the colour and texture of its surroundings, gaining advantage on Dexterity (Stealth) checks it makes to hide in those surroundings.
  - name: Leap
    desc: The thri-kreen leaps up to 20 feet in any direction, provided its speed isn't 0.
reactions:
  - name: Parry
    desc: The thri-kreen adds 2 to its AC against one melee attack that would hit it. To do so, the thri-kreen must see the attacker and be wielding a melee weapon.
```
