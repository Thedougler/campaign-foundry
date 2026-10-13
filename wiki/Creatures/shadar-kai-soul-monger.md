---
title: Shadar-kai Soul Monger
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Humanoid
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Shadar-kai Soul Monger
size: Medium
type: humanoid
subtype: elf
alignment: Typically Neutral Evil
ac: 15
ac_class: studded leather
hp: 136
hit_dice: 21d8 + 42
modifier: 3
speed: 30 ft.
stats: [ 8, 17, 14, 19, 16, 13 ]
saves:
  - dex: 7
  - wis: 7
  - cha: 5
skillsaves:
  - perception: 7
damage_immunities: necrotic, psychic
condition_immunities: charmed, exhaustion, frightened
senses: darkvision 60 ft., passive Perception 17
languages: Common, Elvish
cr: "11"
traits:
  - name: Fey Ancestry
    desc: The shadar-kai has advantage on saving throws against being charmed, and magic can't put it to sleep.
  - name: Magic Resistance
    desc: The shadar-kai has advantage on saving throws against spells and other magical effects.
  - name: Soul Thirst
    desc: When it reduces a creature to 0 hit points, the shadar-kai can gain temporary hit points equal to half the creature's hit point maximum. While the shadar-kai has temporary hit points from this trait, it has advantage on attack rolls.
  - name: Weight of Ages
    desc: Any Beast or Humanoid (except an elf) that starts its turn within 5 feet of the shadar-kai has its speed reduced by 20 feet until the start of that creature's next turn.
actions:
  - name: Multiattack
    desc: The shadar-kai makes two Shadow Dagger attacks.
  - name: Shadow Dagger
    desc: "*Melee or Ranged Weapon Attack:* +7 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 13 (4d4 + 3) piercing damage plus 19 (3d12) necrotic damage, and the target has disadvantage on saving throws until the end of the shadar-kai's next turn. *Hit or Miss:* The dagger magically returns to the shadar-kai's hand immediately after a ranged attack."
  - name: Wave of Weariness (Recharge 4–6)
    desc: The shadar-kai emits weariness in a 60-foot cube. Each creature in that area must make a DC 16 Constitution saving throw. On a failed save, a creature takes 45 (10d8) psychic damage and suffers 1 level of exhaustion. On a successful save, it takes half as much damage and doesn't gain a level of exhaustion.
  - name: Spellcasting
    desc: |-
      The shadar-kai casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 16):

      **1/day each:** *bestow curse*, *finger of death*, *gaseous form*, *seeming*
```
