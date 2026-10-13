---
title: Darkling Elder
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Fey
size: Medium
habitat:
  - Forest
  - Swamp
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Darkling Elder
size: Medium
type: fey
alignment: Typically Chaotic Neutral
ac: 15
ac_class: studded leather armour
hp: 27
hit_dice: 5d8 + 5
modifier: 3
speed: 30 ft.
stats: [ 13, 17, 12, 10, 14, 13 ]
skillsaves:
  - acrobatics: 5
  - deception: 3
  - perception: 6
  - stealth: 7
gear:
  - scimitar
senses: blindsight 30 ft., darkvision 120 ft., passive Perception 16
languages: Elvish, Sylvan
cr: "2"
traits:
  - name: Death Burn
    desc: When the darkling elder dies, magical light flashes out from it in a 10-foot radius as its body and possessions, other than metal or magic objects, burn to ash. Any creature in that area must make a DC 11 Constitution saving throw. On a failed save, the creature takes 7 (2d6) radiant damage and is blinded until the end of its next turn. On a successful save, the creature takes half as much damage and isn't blinded.
actions:
  - name: Multiattack
    desc: The darkling elder makes two Scimitar attacks.
  - name: Scimitar
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) slashing damage plus 7 (2d6) necrotic damage."
  - name: Darkness (Recharges after a Short or Long Rest)
    desc: |
      The darkling elder casts *darkness*, requiring no spell components and using Wisdom as the spellcasting ability.
```
