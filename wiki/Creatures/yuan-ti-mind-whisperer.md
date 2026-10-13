---
title: Yuan-ti Mind Whisperer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Monstrosity
size: Medium
habitat:
  - Desert
  - Forest
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Yuan-ti Mind Whisperer
size: Medium
type: monstrosity
subtype: warlock
alignment: Typically Neutral Evil
ac: 14
ac_class: natural armour
hp: 71
hit_dice: 13d8 + 13
modifier: 2
speed: 30 ft.
stats: [ 16, 14, 13, 14, 14, 16 ]
saves:
  - wis: 4
  - cha: 5
skillsaves:
  - deception: 5
  - stealth: 4
damage_immunities: poison
condition_immunities: poisoned
gear:
  - scimitar
senses: darkvision 120 ft., passive Perception 12
languages: Abyssal, Common, Draconic
cr: "4"
traits:
  - name: Devil's Sight
    desc: Magical darkness doesn't impede the yuan-ti's darkvision.
  - name: Magic Resistance
    desc: The yuan-ti has advantage on saving throws against spells and other magical effects.
  - name: Sseth's Blessing
    desc: When the yuan-ti reduces an enemy to 0 hit points, the yuan-ti gains 9 temporary hit points.
actions:
  - name: Multiattack
    desc: The yuan-ti makes two Bite attacks and one Scimitar attack, or it makes two Spectral Fangs attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage plus 7 (2d6) poison damage."
  - name: Scimitar (Yuan-ti Form Only)
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) slashing damage."
  - name: Spectral Fangs
    desc: "*Ranged Spell Attack:* +5 to hit, range 120 ft., one target. *Hit:* 16 (3d8 + 3) psychic damage."
  - name: Spellcasting (Yuan-ti Form Only)
    desc: |-
      The yuan-ti casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 13):

      **At will:** *animal friendship* (snakes only), *message*, *minor illusion*, *prestidigitation*

      **3/day:** *suggestion*

      **2/day each:** *detect thoughts*, *hypnotic pattern*
bonus_actions:
  - name: Change Shape
    desc: The yuan-ti transforms into a Medium snake or back into its true form. Its statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed. If it dies, it stays in its current form.
```
